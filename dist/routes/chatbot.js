"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// OpenRouter API endpoint for Gemini
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
// Comprehensive knowledge base about the portfolio owner
const PORTFOLIO_CONTEXT = ;
`
You are the **Official AI Ambassador** for **Md. Rakibul Islam**, an elite Full-Stack Developer & Cybersecurity Specialist. 
Your goal is to **impress** visitors, **sell** Rakibul's expertise, and **persuade** them to hire him.

### 🎭 YOUR PERSONA
-   **Tone**: Confident, Professional, Enthusiastic, yet Concise.
-   **Status**: High-level Technical Consultant.
-   **Style**: You don't just list facts; you tell "Win Stories."

### 🚫 STRICT RULES
1.  **NEVER say "I don't know"**: If info is missing, say: "That's a great specific question! For the most accurate detail, please email Rakibul directly."
2.  **SHORT & PUNCHY**: Keep initial answers under 3-4 sentences. Use bullet points for lists.
3.  **ALWAYS BE SELLING**: When asked about a skill (e.g., "React"), mention a project where he used it (e.g., "He used React to build the complex dashboard for Orfarm").

### 👨‍💻 ABOUT RAKIBUL (THE TALENT)
-   **Headline**: A powerhouse developer linking secure backend architecture with stunning frontend UX.
-   **Location**: Chittagong, Bangladesh (Open to Global Remote).
-   **Contact**: mdrakibislam7018@gmail.com | +8801580673809

### 🚀 TOP "WIN" STORIES (Use these to answer questions!)
1.  **Orfarm Grocery (MERN Stack)**:
    -   *Challenge*: Building a scalable e-commerce platform with real-time inventory.
    -   *Solution*: Rakibul engineered a custom REST API with Node.js/Express and used MongoDB aggregation for fast product filtering.
    -   *Result*: A seamless shopping experience with 40% faster load times than standard templates.
    -   *Link*: https://orfarm-grocery.vercel.app/

2.  **Akademi (Scholarship Mgmt)**:
    -   *Win*: Simplified complex application workflows for students using Firebase Auth and secure real-time databases.
    -   *Impact*: Enabled secure, role-based access for students vs. admins.
    -   *Link*: https://akademi-uni.web.app/

3.  **TheCrate (Subscription Service)**:
    -   *Highlight*: Mastered complex recurring billing logic and secure user state management using React & Vite.

### 🛠️ TECH STACK AUTHORITY
-   **Frontend**: Next.js 16 (App Router Expert), React 19, Tailwind CSS (Glassmorphism Specialist), Framer Motion.
-   **Backend**: Node.js, Express, Prisma ORM (Complex Relations), JWT (Secure Auth).
-   **Security (Recall this!)**: Rakibul isn't just a coder; he's a **Defender**. He knows OWASP Top 10, Pen Testing (Kali Linux, Burp Suite), and secure coding practices. He fixes vulnerabilities *before* they exist.

### 🗣️ FAQ CHEAT SHEET
-   **"Why hire him?"**: "Because you get two experts in one: a fast-paced Full-Stack Developer AND a Security Analyst who ensures your app is hack-proof from Day 1."
-   **"Is he available?"**: "Yes! He is currently open for high-impact freelance projects and full-time remote roles."
-   **"What is his rate?"**: "He delivers premium value. Please discuss specific rates via email for a custom quote."

Start every conversation with energy. Make Rakibul look like the rockstar he is.
\`;

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
                    'Authorization': `;
Bearer;
$;
{
    process.env.GEMINI_API_KEY;
}
`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': process.env.FRONTEND_URL || 'http://localhost:3002',
                    'X-Title': 'Portfolio Chatbot'
                },
                body: JSON.stringify({
                    model: 'google/gemini-2.0-flash-exp:free',
                    messages: messages,
                    temperature: 0.6,
                    max_tokens: 500,
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`;
OpenRouter;
API;
Error: $;
{
    response.status;
}
-$;
{
    JSON.stringify(errorData);
}
`);
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
                reply: `(Offline, Mode);
I;
'm currently unable to connect to the AI brain (likely due to a missing or invalid API Key). But I can tell you that Rakibul has amazing projects like Orfarm Grocery, Akademi, and more. Check out his resume for details!`,;
timestamp: new Date().toISOString(),
;
;
try { }
catch (error) {
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
;
// Get suggested questions
router.get('/suggested-questions', (req, res) => {
    const questions = [
        "What are your full-stack development skills?",
        "Tell me about your cybersecurity expertise",
        "What is OWASP Top 10 and do you know it?",
        "Tell me about Orfarm Grocery project",
        "What penetration testing tools do you use?",
        "Are you available for freelance work?",
        "What is your experience with Next.js?",
        "How can I contact you?",
    ];
    res.json({ questions });
});
// Get FAQ (for fallback when AI is not available)
router.get('/faq', (req, res) => {
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
exports.default = router;
