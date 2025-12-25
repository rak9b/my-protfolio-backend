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
Authenticate to receive a JWT token.

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "admin@portfolio.com",
  "password": "Admin@123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "admin@portfolio.com",
    "name": "Administrator"
  }
}
```

**Error** (401 Unauthorized):
```json
{
  "error": "Invalid credentials"
}
```

---

## 📝 Blogs

### Get All Published Blogs
**Endpoint**: `GET /api/blogs`  
**Auth**: Not required

**Response** (200 OK):
```json
[
  {
    "id": "uuid",
    "title": "Blog Title",
    "slug": "blog-title",
    "excerpt": "Brief description",
    "content": "Full markdown content",
    "coverImage": "https://example.com/image.jpg",
    "published": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Single Blog by Slug
**Endpoint**: `GET /api/blogs/:slug`  
**Auth**: Not required

**Response** (200 OK): Single blog object  
**Error** (404): `{"error": "Blog not found"}`

### Create Blog
**Endpoint**: `POST /api/blogs`  
**Auth**: ✅ Required

**Request Body**:
```json
{
  "title": "My New Blog",
  "slug": "my-new-blog",
  "excerpt": "Brief description",
  "content": "Full markdown content",
  "coverImage": "https://example.com/image.jpg"
}
```

**Response** (201 Created): Created blog object

### Update Blog
**Endpoint**: `PUT /api/blogs/:id`  
**Auth**: ✅ Required

**Request Body**: Same as create (partial updates allowed)

**Response** (200 OK): Updated blog object

### Delete Blog
**Endpoint**: `DELETE /api/blogs/:id`  
**Auth**: ✅ Required

**Response** (204 No Content)

---

## 📂 Projects

### Get All Projects
**Endpoint**: `GET /api/projects`  
**Auth**: Not required

**Response** (200 OK):
```json
[
  {
    "id": "uuid",
    "title": "Project Name",
    "description": "Project description",
    "technologies": "React, Node.js, MongoDB",
    "liveUrl": "https://project.com",
    "githubUrl": "https://github.com/user/repo",
    "imageUrl": "https://example.com/image.jpg",
    "featured": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Project
**Endpoint**: `POST /api/projects`  
**Auth**: ✅ Required

**Request Body**:
```json
{
  "title": "New Project",
  "description": "Description",
  "technologies": "Tech stack",
  "liveUrl": "https://live.com",
  "githubUrl": "https://github.com/repo",
  "imageUrl": "https://image.jpg",
  "featured": false
}
```

**Response** (201 Created): Created project object

### Update Project
**Endpoint**: `PUT /api/projects/:id`  
**Auth**: ✅ Required

### Delete Project
**Endpoint**: `DELETE /api/projects/:id`  
**Auth**: ✅ Required

---

## ⭐ Testimonials

### Get Featured Testimonials
**Endpoint**: `GET /api/testimonials`  
**Auth**: Not required

**Response** (200 OK):
```json
[
  {
    "id": "uuid",
    "name": "Client Name",
    "position": "CEO at Company",
    "content": "Testimonial text",
    "rating": 5,
    "imageUrl": "https://avatar.jpg",
    "isFeatured": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Create Testimonial
**Endpoint**: `POST /api/testimonials`  
**Auth**: ✅ Required

### Update Testimonial
**Endpoint**: `PUT /api/testimonials/:id`  
**Auth**: ✅ Required

### Delete Testimonial
**Endpoint**: `DELETE /api/testimonials/:id`  
**Auth**: ✅ Required

---

## 📄 Resume

### Get Latest Resume
**Endpoint**: `GET /api/resume`  
**Auth**: Not required

**Response** (200 OK):
```json
{
  "id": "uuid",
  "fileUrl": "https://resume.pdf",
  "role": "Full-Stack Developer",
  "skills": "React, Node.js, TypeScript...",
  "uploadedAt": "2024-01-01T00:00:00.000Z"
}
```

### Upload Resume Metadata
**Endpoint**: `POST /api/resume`  
**Auth**: ✅ Required

---

## 🤖 AI Chatbot

### Chat with AI
**Endpoint**: `POST /api/chatbot/chat`  
**Auth**: Not required

**Request Body**:
```json
{
  "message": "What are your full-stack development skills?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous question"
    },
    {
      "role": "assistant",
      "content": "Previous answer"
    }
  ]
}
```

**Response** (200 OK):
```json
{
  "reply": "AI-generated response about skills and expertise",
  "model": "gemini-2.0-flash-exp",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Offline Mode** (503):
```json
{
  "reply": "(Offline Mode) I'm currently unable to connect...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Get Suggested Questions
**Endpoint**: `GET /api/chatbot/suggested-questions`  
**Auth**: Not required

**Response** (200 OK):
```json
{
  "questions": [
    "What are your full-stack development skills?",
    "Tell me about your cybersecurity expertise",
    "What is OWASP Top 10 and do you know it?",
    "Tell me about Orfarm Grocery project",
    "What penetration testing tools do you use?",
    "Are you available for freelance work?",
    "What is your experience with Next.js?",
    "How can I contact you?"
  ]
}
```

### Get FAQ
**Endpoint**: `GET /api/chatbot/faq`  
**Auth**: Not required

**Response** (200 OK):
```json
{
  "faq": [
    {
      "question": "What technologies do you work with?",
      "answer": "I specialize in modern web technologies..."
    }
  ]
}
```

### Legacy Chat Endpoint
**Endpoint**: `POST /api/chat`  
**Auth**: Not required  
*(Uses OpenAI instead of Gemini - fallback endpoint)*

---

## 📞 Contact & Messages

### Send Contact Message
**Endpoint**: `POST /api/contact`  
**Auth**: Not required

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to discuss a project..."
}
```

**Response** (201 Created):
```json
{
  "message": "Message sent successfully"
}
```

**Features**:
- Saves message to database
- Sends email notification to admin (if SMTP configured)

### Get All Messages
**Endpoint**: `GET /api/messages`  
**Auth**: ✅ Required

**Response** (200 OK):
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Message content",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

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
