# 🚀 Backend API Documentation

**Base URL (Local)**: `http://localhost:5000/api`  
**Base URL (Production)**: `https://your-backend.onrender.com/api`  
**Authentication**: JWT Bearer Token (for protected routes)

---

## 📋 Table of Contents
- [Authentication](#authentication)
- [Blogs](#blogs)
- [Projects](#projects)
- [Testimonials](#testimonials)
- [Resume](#resume)
- [AI Chatbot](#ai-chatbot)
- [Contact & Messages](#contact--messages)
- [Response Formats](#response-formats)

---

## 🔐 Authentication

### Login
`http://localhost:5000/POST /api/auth/login`

**Request Body**:
```json
{
  "email": "admin@portfolio.com",
  "password": "Admin@123"
}
```

---

## 📝 Blogs

- `http://localhost:5000/GET /api/blogs` - Get all published blogs
- `http://localhost:5000/GET /api/blogs/:slug` - Get single blog by slug
- `http://localhost:5000/POST /api/blogs` - Create blog (Protected)
- `http://localhost:5000/PUT /api/blogs/:id` - Update blog (Protected)
- `http://localhost:5000/DELETE /api/blogs/:id` - Delete blog (Protected)

---

## 📂 Projects

- `http://localhost:5000/GET /api/projects` - Get all projects
- `http://localhost:5000/POST /api/projects` - Create project (Protected)
- `http://localhost:5000/PUT /api/projects/:id` - Update project (Protected)
- `http://localhost:5000/DELETE /api/projects/:id` - Delete project (Protected)

---

## ⭐ Testimonials

- `http://localhost:5000/GET /api/testimonials` - Get featured testimonials
- `http://localhost:5000/POST /api/testimonials` - Create testimonial (Protected)
- `http://localhost:5000/PUT /api/testimonials/:id` - Update testimonial (Protected)
- `http://localhost:5000/DELETE /api/testimonials/:id` - Delete testimonial (Protected)

---

## 📄 Resume

- `http://localhost:5000/GET /api/resume` - Get latest resume
- `http://localhost:5000/POST /api/resume` - Upload resume metadata (Protected)

---

## 🤖 AI Chatbot

- `http://localhost:5000/POST /api/chatbot/chat` - Chat with Gemini 2.0 AI
- `http://localhost:5000/GET /api/chatbot/suggested-questions` - Get suggested questions
- `http://localhost:5000/GET /api/chatbot/faq` - Get FAQ
- `http://localhost:5000/POST /api/chat` - Legacy chat endpoint (OpenAI)

---

## 📞 Contact & Messages

- `http://localhost:5000/POST /api/contact` - Send contact message (with email notification)
- `http://localhost:5000/GET /api/messages` - Get all messages (Protected)

---

## 📡 Response Formats

### Success Responses
- **200 OK**: Request successful, returns data
- **201 Created**: Resource created successfully
- **204 No Content**: Resource deleted successfully

### Error Responses
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid token
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

**Error Format**:
```json
{
  "error": "Error message description"
}
```

---

## 🔑 Authentication Header

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🌐 CORS

CORS is enabled for all origins in development. Configure `FRONTEND_URL` in production for security.

---

**Built with Express.js, Prisma ORM, and Gemini 2.0 AI** 🚀
