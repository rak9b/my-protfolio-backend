import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create Admin User
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@portfolio.com' },
        update: {},
        create: {
            email: 'admin@portfolio.com',
            password: hashedPassword,
            name: 'Admin User',
        },
    });

    console.log('✅ Created admin user:', admin.email);

    // Create Sample Blog Post
    const sampleBlog = await prisma.blog.upsert({
        where: { slug: 'welcome-to-my-portfolio' },
        update: {},
        create: {
            title: 'Welcome to My Portfolio',
            slug: 'welcome-to-my-portfolio',
            content: `
        <h2>Welcome!</h2>
        <p>This is a sample blog post created during database seeding. You can edit or delete this post from the admin dashboard.</p>
        <p>Key features of this portfolio:</p>
        <ul>
          <li>Modern Next.js 16 with App Router</li>
          <li>TypeScript for type safety</li>
          <li>ISR (Incremental Static Regeneration)</li>
          <li>Rich text editor for blog posts</li>
          <li>Secure JWT authentication</li>
        </ul>
        <p>Feel free to explore the admin dashboard and create your own content!</p>
      `,
            excerpt: 'Welcome to my portfolio! Learn about the amazing features built into this application.',
            published: true,
        },
    });

    console.log('✅ Created sample blog post:', sampleBlog.title);

    // Create Sample Project
    const sampleProject = await prisma.project.create({
        data: {
            title: 'Portfolio Website',
            description: 'A modern, feature-rich portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include ISR, admin dashboard, and rich text editing.',
            technologies: 'Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            liveUrl: 'https://yourportfolio.com',
            githubUrl: 'https://github.com/yourusername/portfolio',
        },
    });

    console.log('✅ Created sample project:', sampleProject.title);

    // Create Sample Testimonial
    const sampleTestimonial = await prisma.testimonial.create({
        data: {
            name: 'John Doe',
            role: 'CEO',
            company: 'Tech Innovations Inc.',
            content: 'Exceptional work! The attention to detail and technical expertise demonstrated in this portfolio is outstanding.',
            rating: 5,
        },
    });

    console.log('✅ Created sample testimonial:', sampleTestimonial.name);

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📋 Admin Credentials:');
    console.log('   Email: admin@portfolio.com');
    console.log('   Password: Admin@123');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the admin password after first login!');
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
