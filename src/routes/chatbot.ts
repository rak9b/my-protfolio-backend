import { Router, Request, Response } from 'express';

const router = Router();

// OpenRouter API endpoint for Gemini
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Comprehensive knowledge base about the portfolio owner
const PORTFOLIO_CONTEXT = `
You are an AI assistant for Md. Rakibul Islam's professional portfolio website. You help visitors learn about his skills, experience, and projects.

ABOUT:
- Elite Full-Stack Developer & Cybersecurity Professional
- Creator of RoksJS, a custom JavaScript library
- Passionate about building scalable, secure, user-friendly applications
- Focus on clean code, best practices, continuous learning, and security-first development
- Located in Chittagong, Bangladesh
- Available for remote work, freelance projects, and full-time opportunities

🖥️ FRONTEND DEVELOPMENT SKILLS:
- HTML5, CSS3, Responsive Design, Bootstrap, Tailwind CSS
- JavaScript (ES6+), DOM Manipulation, TypeScript
- React.js, Next.js 16 (App Router), Server-side Rendering
- SEO Optimization, Fast-loading Web Apps
- Framer Motion, State Management (Redux, Zustand, Context API)
- Modern CSS: Flexbox, Grid, Animations

⚙️ BACKEND DEVELOPMENT SKILLS:
- Node.js, Express.js, RESTful APIs
- JWT Authentication, Cookies, Sessions, Middleware
- Error Handling, API Design & Documentation
- Prisma ORM, PostgreSQL, MongoDB, SQLite
- GraphQL, Firebase Auth, OAuth
- Query Optimization, Data Modeling

🧠 ADVANCED PROGRAMMING:
- TypeScript for type-safe, production-ready code
- Asynchronous JavaScript (Promise, async/await, fetch API)
- Error & Exception Handling
- Data Structures & Algorithms (Basics)
- Design Patterns & Best Practices

🐳 DEVOPS & DEPLOYMENT:
- Git & GitHub, GitHub Actions
- Docker for containerization
- Netlify, Vercel, Render, Railway
- Environment Variables & Configuration Management
- CI/CD Pipelines, Nginx, Cloudflare

🔒 CYBERSECURITY FUNDAMENTALS:
- Information Security Principles, CIA Triad
- Threat Modeling, Attack Surface Identification
- Risk Assessment, Vulnerability Management
- Security Controls & Best Practices

🎯 PENETRATION TESTING:
- Penetration Testing Lifecycle
- Black Box / Grey Box / White Box Testing
- Reconnaissance, Exploitation, Reporting
- Scoping & Rules of Engagement

🔍 RECONNAISSANCE & OSINT:
- Passive & Active Reconnaissance
- DNS Enumeration, WHOIS Analysis
- Subdomain Enumeration, Technology Fingerprinting
- Information Gathering Techniques

🌐 NETWORK SECURITY:
- TCP/IP Model, OSI Model
- IP Addressing, Subnetting, Routing Basics
- Port Scanning, Service Enumeration
- Network Misconfigurations, VPN Concepts

⚠️ OWASP TOP 10:
- Broken Access Control, Cryptographic Failures
- Injection Attacks (SQL, Command, LDAP, XPath)
- Cross-Site Scripting (XSS: Stored, Reflected, DOM)
- Insecure Design, Security Misconfiguration
- Vulnerable Components, Authentication Failures
- IDOR, Privilege Escalation, CSRF
- Business Logic Flaws, Session Security

🛠️ SECURITY TESTING TOOLS:
- Kali Linux, Burp Suite, Metasploit, Nmap
- OWASP ZAP, Splunk, Hashcat, Shodan
- Netcat, Wireshark, Network Scanning Tools

💻 OPERATING SYSTEMS:
- Linux (File System, Permissions, Bash Commands)
- Windows (Architecture, Security Concepts)
- Process Management, Privilege Escalation

🔐 CRYPTOGRAPHY & AUTHENTICATION:
- Hashing vs Encryption
- Symmetric & Asymmetric Encryption
- SSL/TLS Concepts, Password Security
- OAuth, JWT, Secure Authentication

📜 COMPLIANCE & STANDARDS:
- ISO/IEC 27001 Awareness
- PCI DSS Basics, Data Protection Principles
- CVSS Risk Rating, Vulnerability Reporting
- Ethical Hacking Principles, Responsible Disclosure

FEATURED PROJECTS:
1. **Orfarm Grocery** 🌱
   - Modern online grocery shopping center
   - Tech: MERN Stack (MongoDB, Express, React, Node.js)
   - Features: Product browsing, cart management, secure checkout
   - Live: https://orfarm-grocery.vercel.app/
   - GitHub: https://github.com/rak9b/-Orfarm-Grocery-Online-Grocery-Shopping-Center

2. **Akademi - Scholarship Management** 
   - Web-based platform to streamline scholarship applications
   - Tech: MERN Stack, Firebase Auth, Vercel hosting
   - Features: Efficient application management, role-based access
   - Live: https://akademi-uni.web.app/
   - GitHub: https://github.com/rak9b/Akademi---Scholarship-Management-System

3. **E-Tutor Booking** 📘
   - Online tutor booking platform
   - Features: Search by subject, schedule sessions, review system
   - Live: https://tutor-booking-43ee8.web.app/
   - GitHub: https://github.com/rak9b/-E-Tutor-Booking

4. **Food Khazana** 🍲
   - Recipe book app with dynamic top recipes
   - Features: Recipe management, wishlist functionality
   - Live: https://food-khazana.netlify.app/
   - GitHub: https://github.com/rak9b/-Food-Khazana---Recipe-Book-App

5. **LeafyWorld** 🌿
   - Gardening enthusiasts community platform
   - Features: Connect plant lovers, share tips, event participation
   - Live: https://leafyworld-b841c.web.app
   - GitHub: https://github.com/rak9b/-LeafyWorld---Gardening-Community-Platform

6. **TheCrate** 🔐
   - Subscription-based web application
   - Tech: React, Firebase Auth, Vite
   - Live: https://subscription-box-website.vercel.app/
   - GitHub: https://github.com/rak9b/-subscription-service-website-

EXPERIENCE:
- Extensive experience building full-stack applications from scratch
- Implemented secure authentication systems with JWT and Firebase
- Built responsive, mobile-first interfaces with premium UI/UX
- Specializes in MERN stack development and Next.js applications
- Security testing and penetration testing expertise
- Compliance and ethical hacking knowledge

CONTACT & LINKS:
- Email: mdrakibislam7018@gmail.com
- Phone: +8801580673809
- Location: Chittagong, Bangladesh
- GitHub: https://github.com/rak9b
- LinkedIn: https://linkedin.com/in/md-rakibul-islam007

AVAILABILITY:
- Currently available for freelance projects and full-time opportunities
- Open to remote work globally
- Specializing in Full-Stack Development and Cybersecurity roles

SOFT SKILLS:
- Leadership & Mentoring, Agile/Scrum Methodology
- Remote Collaboration & Communication
- Problem Solving & Strategic Planning
- Analytical Thinking, Attention to Detail
- Time Management, Teamwork, Adaptability
- Continuous Learning, English Tech Terminology

TOOLS & PLATFORMS:
- VS Code, Git, GitHub/GitLab
- Postman, Figma, Docker
- Vercel, Netlify, Firebase, Railway
- Notion, Trello, Slack, Discord
- Webpack, Vite, Redux

📜 UPCOMING FEATURE PREVIEWS (Q&A):
- **Q**: What's next on your learning roadmap?
- **A**: I'm currently mastering AI integration and diving deeper into AWS cloud security, Serverless computing, and advanced penetration testing methodologies.
- **Q**: Do you plan to add more 3D graphics? 
- **A**: Yes, I'm exploring more complex Three.js scenes and GSAP animations to create even more immersive user experiences while maintaining accessibility.
- **Q**: Are you planning any new major projects?
- **A**: I'm conceptualizing an AI-powered security scanner that can automatically audit MERN stack applications for common vulnerabilities—combining both my development and security passions.
- **Q**: Will you be adding multi-language support to the portfolio?
- **A**: Definitely! I plan to implement i18n support to make my portfolio accessible to a global audience, starting with English and Bengali.
- **Q**: How do you plan to handle larger data sets in your projects?
- **A**: I'm studying advanced indexing strategies in PostgreSQL and MongoDB, as well as implementing Redis for efficient caching in high-traffic scenarios.

Always respond professionally, accurately, and enthusiastically. If asked about contact, suggest using the form or the email provided. Highlight both his development AND security expertise!
`;

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatRequest extends Request {
    body: {
        message: string;
        conversationHistory?: ChatMessage[];
    };
}

// Chat endpoint
router.post('/chat', async (req: ChatRequest, res: Response) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Check if API key is configured
        if (!process.env.GEMINI_API_KEY) {
            return res.status(503).json({
                error: 'AI service not configured',
                message: 'Please add GEMINI_API_KEY to environment variables'
            });
        }

        // Build messages array for OpenRouter
        const messages: ChatMessage[] = [
            { role: 'system', content: PORTFOLIO_CONTEXT },
            ...conversationHistory.slice(-10),
            { role: 'user', content: message }
        ];

        // Call OpenRouter API with Gemini model
        try {
            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3002',
                    'X-Title': 'Portfolio Chatbot'
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-exp:free',
                    messages: messages,
                    temperature: 0.7,
                    max_tokens: 500,
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`OpenRouter API Error: ${response.status} - ${JSON.stringify(errorData)}`);
            }

            const data: any = await response.json();
            const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

            res.json({
                reply,
                model: 'gemini-2.0-flash-exp',
                timestamp: new Date().toISOString(),
            });
        } catch (geminiError: any) {
            console.error('Gemini API Error:', geminiError.message);
            // Fallback for invalid key or quota exceeded
            return res.json({
                reply: `(Offline Mode) I'm currently unable to connect to the AI brain (likely due to a missing or invalid API Key). But I can tell you that Rakibul has amazing projects like Orfarm Grocery, Akademi, and more. Check out his resume for details!`,
                timestamp: new Date().toISOString(),
            });
        }

    } catch (error: any) {
        console.error('Chatbot Error:', error);

        if (error?.response?.status === 401) {
            return res.status(401).json({ error: 'Invalid API key' });
        }

        if (error?.response?.status === 429) {
            return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        }

        res.status(500).json({
            error: 'Failed to get AI response',
            message: error.message
        });
    }
});

// Get suggested questions
router.get('/suggested-questions', (req: Request, res: Response) => {
    const questions = [
        "What are your full-stack development skills?",
        "Tell me about your cybersecurity expertise",
        "What is OWASP Top 10 and do you know it?",
        "Tell me about Orfarm Grocery project",
        "What penetration testing tools do you use?",
        "Are you available for freelance work?",
        "What is your experience with Next.js?",
        "Do you provide after-support for projects?",
        "What is your development process?",
        "How can I contact you?",
    ];

    res.json({ questions });
});

// Get FAQ (for fallback when AI is not available)
router.get('/faq', (req: Request, res: Response) => {
    const faq = [
        {
            question: "What technologies do you work with?",
            answer: "I specialize in modern web technologies including React, Next.js, TypeScript, Node.js, Express, Prisma, PostgreSQL, and Tailwind CSS. I build full-stack applications with a focus on performance and user experience."
        },
        {
            question: "Are you available for work?",
            answer: "Yes! I'm available for both freelance projects and full-time opportunities. I can work remotely and adapt to different time zones."
        },
        {
            question: "How can I contact you?",
            answer: "You can reach me through the contact form on this website. I typically respond within 24 hours."
        },
        {
            question: "What's your experience level?",
            answer: "I have hands-on experience building multiple full-stack applications, implementing secure authentication, creating admin dashboards, and optimizing web performance. Check out my projects section for examples of my work."
        },
    ];

    res.json({ faq });
});

export default router;
