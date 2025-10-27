<div align="center">

<!-- App Logo -->
<img src="./assets/swiftcv-logo.svg" alt="SwiftCV Logo" width="200" height="200">

# 🚀 SwiftCV
### AI-Powered Resume Builder

<p align="center">
  <em>Create stunning, professional resumes with the power of AI</em>
</p>

![SwiftCV Badge](https://img.shields.io/badge/SwiftCV-Resume%20Builder-blue?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-swift--cv--pi.vercel.app-green?style=for-the-badge&logo=vercel)](https://swift-cv-pi.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-swiftcv--hcog.onrender.com-orange?style=for-the-badge&logo=node.js)](https://swiftcv-hcog.onrender.com)

</div>

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🔧 Environment Setup](#-environment-setup)
- [🌐 Deployment](#-deployment)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🎨 **Multiple Professional Templates**
- **Classic Template** - Traditional and professional layout
- **Modern Template** - Clean and contemporary design
- **Minimal Template** - Simple and elegant appearance
- **Minimal Image Template** - Image-focused minimalist design

### 🤖 **AI-Powered Resume Enhancement**
- **Smart PDF Upload** - Extract data from existing resumes using Google Gemini AI
- **Intelligent Content Optimization** - AI-enhanced resume sections
- **Professional Summary Generation** - AI-crafted professional summaries
- **Job Description Matching** - Optimize content for specific roles

### 🖼️ **Advanced Image Processing**
- **Background Removal** - Automatic background removal with accent color replacement
- **Image Optimization** - Powered by ImageKit for fast loading
- **Professional Photo Enhancement** - Smart image transformations

### 🔐 **Secure User Management**
- **JWT Authentication** - Secure login and registration
- **Password Encryption** - bcrypt-secured user data
- **Session Management** - Persistent login with Redux state management

### 📱 **Modern User Experience**
- **Responsive Design** - Works seamlessly on all devices
- **Real-time Preview** - Live resume preview while editing
- **Hover Preview** - Quick resume preview on dashboard hover with intelligent caching
- **Drag & Drop** - Easy file uploads
- **Public Sharing** - Share resumes with unique URLs
- **Download Options** - Export as PDF or share online
- **Resume Duplication** - Smart copy with automatic naming
- **Performance Optimized** - Client-side caching reduces API calls and improves responsiveness

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 19** - Latest React with modern features
- 🔄 **Redux Toolkit** - State management
- 🎨 **Tailwind CSS 4** - Utility-first CSS framework
- 📱 **Vite** - Fast build tool and dev server
- 🧭 **React Router v7** - Client-side routing
- 🎯 **Lucide React** - Beautiful icons
- 📄 **react-pdftotext** - PDF text extraction
- 🔥 **react-hot-toast** - Elegant notifications

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- ⚡ **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database with Mongoose ODM
- 🔐 **JWT** - JSON Web Tokens for authentication
- 🛡️ **bcrypt** - Password hashing
- 📁 **Multer** - File upload handling
- 🌐 **CORS** - Cross-origin resource sharing

### **AI & Cloud Services**
- 🤖 **Google Gemini AI** - Advanced language model for resume processing
- 🖼️ **ImageKit** - Image optimization and transformation
- ☁️ **MongoDB Atlas** - Cloud database hosting

### **Deployment**
- 🚀 **Vercel** - Frontend hosting with automatic deployments
- 🎯 **Render** - Backend hosting with continuous deployment
- 📦 **GitHub** - Version control and CI/CD integration

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account
- ImageKit account
- Google Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/harshshukla07/SwiftCV.git
cd SwiftCV
```

### 2. Install dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Setup

Create `.env` files in both `server` and `client` directories:

#### Server `.env`
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
GEMINI_API_KEY=your_gemini_api_key
OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
OPENAI_MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:5173
```

#### Client `.env`
```env
VITE_BASE_URL=http://localhost:3000
```

### 4. Run the application

```bash
# Start backend server (in server directory)
npm start

# Start frontend development server (in client directory)
npm run dev
```

Visit `http://localhost:5173` to see the application in action!

## 📁 Project Structure

```
SwiftCV/
├── 📁 client/                 # React frontend application
│   ├── 📁 public/             # Static assets
│   ├── 📁 src/
│   │   ├── 📁 app/            # Redux store configuration
│   │   ├── 📁 assets/         # Application assets
│   │   ├── 📁 components/     # Reusable React components
│   │   │   ├── 📁 home/       # Homepage components
│   │   │   └── 📁 templates/  # Resume templates
│   │   ├── 📁 configs/        # API and app configuration
│   │   └── 📁 pages/          # Page components
│   ├── 📄 package.json
│   └── 📄 vercel.json         # Vercel deployment config
│
├── 📁 server/                 # Node.js backend application
│   ├── 📁 configs/            # Database and service configurations
│   ├── 📁 controllers/        # Route controllers
│   ├── 📁 middlewares/        # Custom middleware
│   ├── 📁 models/             # Mongoose data models
│   ├── 📁 routes/             # API route definitions
│   ├── 📄 server.js           # Application entry point
│   └── 📄 package.json
│
└── 📄 README.md               # Project documentation
```

## 🔧 Environment Setup

### Required API Keys and Services

1. **MongoDB Atlas**
   - Create a free cluster at [mongodb.com](https://www.mongodb.com/)
   - Get your connection string

2. **ImageKit**
   - Sign up at [imagekit.io](https://imagekit.io/)
   - Get your private key, public key, and URL endpoint

3. **Google Gemini AI**
   - Get API key from [Google AI Studio](https://aistudio.google.com/)
   - Enable Gemini API access

### Security Best Practices

- 🔒 Never commit `.env` files to version control
- 🔐 Use strong, unique JWT secrets
- 🛡️ Regularly rotate API keys
- 🌐 Configure CORS for production domains only

## 🌐 Deployment

### Frontend (Vercel)

1. Fork/clone the repository
2. Connect your GitHub account to Vercel
3. Import the project with these settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy!

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure with these settings:
   - **Root Directory**: `server`
   - **Build Command**: (leave empty)
   - **Start Command**: `npm start`
4. Add all environment variables
5. Deploy!

## 📸 Screenshots

### 🏠 Homepage
Beautiful landing page with modern design and clear call-to-action.

### 📝 Resume Builder
Intuitive form-based resume builder with real-time preview.

### 🎨 Template Gallery
Choose from multiple professional templates.

### 🤖 AI Integration
Smart PDF upload with AI-powered data extraction.

### 📱 Mobile Responsive
Seamless experience across all devices.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star!

**Built with ❤️ by [Harsh Shukla](https://github.com/harshshukla07)**

[![GitHub Stars](https://img.shields.io/github/stars/harshshukla07/SwiftCV?style=social)](https://github.com/harshshukla07/SwiftCV)
[![GitHub Forks](https://img.shields.io/github/forks/harshshukla07/SwiftCV?style=social)](https://github.com/harshshukla07/SwiftCV)

</div>