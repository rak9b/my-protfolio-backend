import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';
import chatbotRouter from './routes/chatbot';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const prisma = new PrismaClient();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Nodemailer Config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chatbot', chatbotRouter);

// In-memory constants (for initial seeding)
const ADMIN_EMAIL = 'admin@portfolio.com';
const ADMIN_PASS = 'admin123';

// Auth Middleware
interface AuthRequest extends Request {
    userId?: string;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

const seedFAQs = async () => {
    try {
        const count = await prisma.fAQ.count();
        if (count === 0) {
            console.log('🌱 Seeding FAQs...');
            await prisma.fAQ.createMany({
                data: [
                    {
                        question: 'What are your primary technologies?',
                        answer: 'I am an elite Full-Stack developer specializing in React, Next.js, TypeScript, Node.js, and Prisma. I also created RoksJS.'
                    },
                    {
                        question: 'Are you available for freelance projects?',
                        answer: 'Yes, I am always open to discussing innovative projects and visionary collaborations.'
                    },
                    {
                        question: 'How can I hire you?',
                        answer: 'You can use the contact form on this website or reach out via the provided email in the resume to discuss your project.'
                    },
                    {
                        question: 'What is RoksJS?',
                        answer: 'RoksJS is my flagship JavaScript framework/utility designed for high-performance and developer-friendly application architecture.'
                    },
                    {
                        question: 'Do you provide maintenance for your projects?',
                        answer: 'Yes, I offer professional maintenance and support for all my custom-built solutions to ensure long-term stability and security.'
                    },
                    {
                        question: 'What is your typical development workflow?',
                        answer: 'I follow a rigorous, design-first approach, prioritizing clean code, robust security, and exceptional UI/UX for all applications.'
                    }
                ]
            });
            console.log('✅ FAQs seeded.');
        }
    } catch (error) {
        console.error('❌ Error seeding FAQs:', error);
    }
};

// Seeding Admin User
const seedAdmin = async () => {
    try {
        await seedFAQs();
        const admin = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
        if (!admin) {
            console.log('🌱 Seeding admin user...');
            const hashedPassword = bcrypt.hashSync(ADMIN_PASS, 10);
            await prisma.user.create({
                data: {
                    email: ADMIN_EMAIL,
                    password: hashedPassword,
                    name: 'Administrator',
                },
            });
            console.log('✅ Admin user created.');
        } else {
            console.log('ℹ️ Admin user already exists.');
        }
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
    }
};

// Auth - Login
app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Blogs - Get All
app.get('/api/blogs', async (req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blogs' });
    }
});

// Blogs - Get One
app.get('/api/blogs/:slug', async (req: Request, res: Response) => {
    try {
        const blog = await prisma.blog.findUnique({ where: { slug: req.params.slug } });
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
});

// Blogs - Create (Protected)
app.post('/api/blogs', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const blog = await prisma.blog.create({
            data: {
                title: req.body.title,
                slug: req.body.slug,
                content: req.body.content,
                excerpt: req.body.excerpt,
                published: true,
                coverImage: req.body.coverImage,
            }
        });
        res.status(201).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating blog' });
    }
});

// Blogs - Delete (Protected)
app.delete('/api/blogs/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.blog.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
});

// Blogs - Update (Protected)
app.put('/api/blogs/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const blog = await prisma.blog.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error updating blog' });
    }
});

// Projects - Get All
app.get('/api/projects', async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching projects' });
    }
});

// Projects - Create (Protected)
app.post('/api/projects', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const project = await prisma.project.create({
            data: {
                ...req.body,
            }
        });
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error creating project' });
    }
});

// Projects - Delete (Protected)
app.delete('/api/projects/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.project.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting project' });
    }
});

// Projects - Update (Protected)
app.put('/api/projects/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const project = await prisma.project.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });
        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error updating project' });
    }
});

// Testimonials - Get All
app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { isFeatured: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching testimonials' });
    }
});

// Testimonials - Create (Protected)
app.post('/api/testimonials', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const testimonial = await prisma.testimonial.create({
            data: { ...req.body }
        });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ error: 'Error creating testimonial' });
    }
});

// Testimonials - Delete (Protected)
app.delete('/api/testimonials/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.testimonial.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting testimonial' });
    }
});

// Testimonials - Get All
app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching testimonials' });
    }
});

// Testimonials - Create (Protected)
app.post('/api/testimonials', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const testimonial = await prisma.testimonial.create({
            data: {
                ...req.body,
            }
        });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(500).json({ error: 'Error creating testimonial' });
    }
});

// Testimonials - Update (Protected)
app.put('/api/testimonials/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const testimonial = await prisma.testimonial.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
            }
        });
        res.json(testimonial);
    } catch (error) {
        res.status(500).json({ error: 'Error updating testimonial' });
    }
});

// Testimonials - Delete (Protected)
app.delete('/api/testimonials/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.testimonial.delete({ where: { id: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting testimonial' });
    }
});

// Resume - Get Latest
app.get('/api/resume', async (req: Request, res: Response) => {
    try {
        const resume = await prisma.resume.findFirst({
            orderBy: { uploadedAt: 'desc' }
        });
        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching resume' });
    }
});

// Resume - Upload Metadata (Protected)
app.post('/api/resume', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const resume = await prisma.resume.create({
            data: { ...req.body }
        });
        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Error saving resume metadata' });
    }
});

// AI Chatbot - Intelligent Responder
app.post('/api/chat', async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        // Fetch context from DB
        const projects = await prisma.project.findMany();
        const blogs = await prisma.blog.findMany();
        const testimonials = await prisma.testimonial.findMany();
        const resume = await prisma.resume.findFirst({ orderBy: { uploadedAt: 'desc' } });

        const context = `
            You are Md. Rakibul Islam's Digital Twin and Professional Guide. You speak as a high-end Full-Stack Developer and the creator of RoksJS.
            
            YOUR IDENTITY:
            - Name: Rakib's AI Assistant (Digital Twin)
            - Character: Confident, innovative, professional, and helpful. You are excited about the future of tech and security.
            - Specialty: Full-Stack Web Development, UI/UX Design, and Cybersecurity.
            
            FULL PROFILE:
            - Specialties: MERN Stack, Next.js, Secure Coding, Pentesting.
            - Flagship Project: RoksJS (High-performance JS utility).
            
            RESUME SUMMARY:
            ${resume ? `- Current Focus: ${resume.role}\n- Skills: ${resume.skills}` : 'I am currently focusing on high-performance web systems and advanced security architectures.'}
            
            PROJECTS PORTFOLIO:
            ${projects.map(p => `- **${p.title}**: ${p.description}. Tech: ${p.technologies}.`).join('\n')}
            
            PERSONAL TOUCH:
            - You believe that "Security is not a feature, it's a foundation."
            - You are passionate about bridging the gap between artistic design and military-grade security.
            
            Instructions:
            - Speak naturally, like a human expert. Use phrases like "I would love to tell you about...", "One of my favorite projects is...", and "I believe...".
            - Be punchy and professional. Don't sound like a generic bot.
            - If asked about contact, suggest using the form below or emailing mdrakibislam7018@gmail.com.
        `;

        let geminiError: any = null;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: context },
                { role: "user", content: message }
            ],
            max_tokens: 500,
        }).catch((err: any) => {
            geminiError = err;
            console.error('Chat error:', err);
            return null;
        });

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here' || (geminiError && (geminiError.message.includes('401') || geminiError.message.includes('User not found')))) {
            return res.json({
                reply: `Hey! I'm Rakibul's digital twin. I'm currently having a bit of trouble connecting to my full "AI brain," but I can still tell you all about his work! 

Rakibul is an elite Full-Stack developer who specializes in the MERN stack and Next.js. He's built impressive platforms like 'Orfarm Grocery' and 'Akademi'. He even created his own high-performance JS framework called RoksJS!

Feel free to explore his **Projects** and **Skills** sections, or drop him a message using the contact form. What part of his journey are you most curious about?`
            });
        }

        if (!completion) {
            return res.status(500).json({ error: 'Chatbot error' });
        }

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Chatbot error' });
    }
});

// Messages - Get All (Protected)
app.get('/api/messages', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Contact - Create Message
app.post('/api/contact', async (req: Request, res: Response) => {
    try {
        const { name, email, message } = req.body;

        // Save to Database
        await prisma.message.create({
            data: { name, email, message }
        });

        // Email Notification
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <h3>New Portfolio Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        };

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                await transporter.sendMail(mailOptions);
            } catch (err) {
                console.error('Email sending failed:', err);
            }
        }

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact error:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
});

// Initialize and Listen
seedAdmin().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Backend server running on http://localhost:${PORT}`);
        console.log(`🗄️  Persistence: SQLite (Prisma)`);
    });
});

