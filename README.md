# Portfolio Website - Hammad Mehmood

A modern, fully-featured portfolio website built with React, TypeScript, and Framer Motion.

## 🚀 Features

### Pages
- **Home** - Animated hero section with scroll-based interactions, tech stack badges, and stats card
- **Projects** - Showcase of 5 major projects with technologies and highlights
- **Experience** - Professional timeline with 3 positions, education, and certifications
- **Contact** - Working contact form with social links and contact information

### Components
- **Header** - Fixed navigation with smooth scroll effects
- **Footer** - Social links, quick navigation, and contact info
- **Layout** - Reusable layout wrapper for consistent structure

### Design Features
- ✨ Smooth scroll-based animations
- 🎨 Glassmorphism effects
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ 60fps optimized animations
- 🎯 Clean, modern UI with Tailwind CSS

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Header.tsx       # Navigation header
│   │       ├── Footer.tsx       # Footer with links
│   │       └── Layout.tsx       # Layout wrapper
│   ├── data/
│   │   ├── projects.ts          # Projects data
│   │   └── experience.ts        # Experience data
│   ├── pages/
│   │   ├── Home.tsx             # Animated homepage
│   │   ├── Projects.tsx         # Projects showcase
│   │   ├── Experience.tsx       # Experience timeline
│   │   └── Contact.tsx          # Contact form
│   ├── App.tsx                  # Main app with routing
│   ├── main.tsx                 # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router

**Backend (Ready):**
- Node.js
- TypeScript
- Express
- MongoDB

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
npm run preview
```

## 📊 Content Overview

### Stats
- 2+ Years Experience
- 10+ Projects Delivered
- 20+ Technologies

### Tech Stack Badges
- React
- Next.js
- TypeScript
- Node.js
- MongoDB
- AWS
- Stripe
- Docker

### Projects
1. **Friska** - AI Chatbot SaaS Platform
2. **AlkinaRealty** - Real Estate Platform
3. **Create Anything** - AI Agent Platform
4. **DonnaFitness** - AI Fitness SaaS
5. **NFT-Fusion** - Blockchain Marketplace

### Experience
1. **Dafinitiq AI** - Full-Stack Developer (Sep 2024 – Feb 2026)
2. **Jazba Innovations** - Software Developer Intern (May 2024 – Jul 2024)
3. **NFT-Fusion** - Full-Stack Developer (Jan 2024 – Jul 2024)

## 🎨 Customization

### Update Personal Info
Edit `frontend/src/data/`:
- `projects.ts` - Add/edit projects
- `experience.ts` - Add/edit work experience

### Update Stats
Edit `frontend/src/pages/Home.tsx` (line ~130):
```typescript
const stats = [
  { label: 'Years Experience', value: '2+' },
  { label: 'Projects Delivered', value: '10+' },
  { label: 'Technologies', value: '20+' },
];
```

### Update Tech Badges
Edit `frontend/src/pages/Home.tsx` (lines ~40-60):
```typescript
const desktopBadges: BadgePosition[] = [
  { id: 'react', label: 'React', initialX: 274, initialY: 214 },
  // ... add your tech stack
];
```

## 🔗 Links

- **GitHub**: https://github.com/hammadmehmood0
- **LinkedIn**: https://www.linkedin.com/in/hammad-mehmood-b82b24229/
- **Email**: hammad.mehmood898@gmail.com
- **Phone**: +92 337 5733918
- **Location**: Islamabad, Pakistan

## 📝 Development Best Practices

- ✅ TypeScript for type safety
- ✅ Component-based architecture
- ✅ Reusable data structures
- ✅ Responsive design
- ✅ Performance optimized
- ✅ Clean code structure
- ✅ Proper file organization

## 🚧 Future Enhancements

- [ ] Backend API integration for contact form
- [ ] Blog section
- [ ] Dark mode toggle
- [ ] Project detail pages
- [ ] RAG chatbot integration
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Performance monitoring

## 📄 License

© 2025 Hammad Mehmood. All rights reserved.

---

Built with ❤️ using React, TypeScript, and Framer Motion
