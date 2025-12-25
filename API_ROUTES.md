# 🚀 Backend API Routes

**Base URL**: `http://localhost:5000`  
**Production**: `https://your-backend.onrender.com`

> **IMPORTANT**: The methods (GET, POST, PUT, DELETE) are HTTP methods, NOT part of the URL!  
> Use tools like Postman, Thunder Client, or your browser's console to test.

---

## 📋 Quick Reference

### 🔐 Authentication
| Method | URL | Auth Required |
|--------|-----|---------------|
| POST | `/api/auth/login` | ❌ |

### 📝 Blogs
| Method | URL | Auth Required |
|--------|-----|---------------|
| GET | `/api/blogs` | ❌ |
| GET | `/api/blogs/:slug` | ❌ |
| POST | `/api/blogs` | ✅ |
| PUT | `/api/blogs/:id` | ✅ |
| DELETE | `/api/blogs/:id` | ✅ |

### 📂 Projects
| Method | URL | Auth Required |
|--------|-----|---------------|
| GET | `/api/projects` | ❌ |
| POST | `/api/projects` | ✅ |
| PUT | `/api/projects/:id` | ✅ |
| DELETE | `/api/projects/:id` | ✅ |

### ⭐ Testimonials
| Method | URL | Auth Required |
|--------|-----|---------------|
| GET | `/api/testimonials` | ❌ |
| POST | `/api/testimonials` | ✅ |
| PUT | `/api/testimonials/:id` | ✅ |
| DELETE | `/api/testimonials/:id` | ✅ |

### 📄 Resume
| Method | URL | Auth Required |
|--------|-----|---------------|
| GET | `/api/resume` | ❌ |
| POST | `/api/resume` | ✅ |

### 🤖 AI Chatbot
| Method | URL | Auth Required |
|--------|-----|---------------|
| POST | `/api/chatbot/chat` | ❌ |
| GET | `/api/chatbot/suggested-questions` | ❌ |
| GET | `/api/chatbot/faq` | ❌ |
| POST | `/api/chat` | ❌ |

### 📞 Contact & Messages
| Method | URL | Auth Required |
|--------|-----|---------------|
| POST | `/api/contact` | ❌ |
| GET | `/api/messages` | ✅ |

---

## 🧪 How to Test Routes

### ✅ Routes You Can Test in Browser

These routes work with **GET** method, so you can type them directly in your browser:

```
✅ http://localhost:5000/api/blogs
✅ http://localhost:5000/api/projects
✅ http://localhost:5000/api/testimonials
✅ http://localhost:5000/api/resume
✅ http://localhost:5000/api/chatbot/suggested-questions
✅ http://localhost:5000/api/chatbot/faq
```

### ⚠️ Routes That Need a Tool (Postman/Thunder Client)

These routes use **POST/PUT/DELETE**, so you need an API testing tool:

**Login Example (POST)**:
```
Method: POST
URL: http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "admin@portfolio.com",
  "password": "Admin@123"
}
```

**Chat Example (POST)**:
```
Method: POST
URL: http://localhost:5000/api/chatbot/chat
Body (JSON):
{
  "message": "What are your skills?"
}
```

**Contact Example (POST)**:
```
Method: POST
URL: http://localhost:5000/api/contact
Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

### 🔑 Protected Routes (Need Token)

For routes marked with ✅, you need to:
1. Login first to get a token
2. Add the token to the Authorization header:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

**Example: Get All Messages (Protected)**:
```
Method: GET
URL: http://localhost:5000/api/messages
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 👨‍💻 Using VSCode Thunder Client Extension

1. Install "Thunder Client" extension
2. Click the Thunder Client icon in sidebar
3. Click "New Request"
4. Set Method (GET, POST, etc.)
5. Enter URL: `http://localhost:5000/api/blogs`
6. Click "Send"

---

**Built with Express.js, Prisma, and Gemini 2.0 AI** 🚀
