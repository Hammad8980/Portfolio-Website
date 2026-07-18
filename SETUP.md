# Portfolio Website Setup

## What We've Built

A modern, animated portfolio homepage with scroll-based interactions.

## Structure

```
Portfolio-Website/
├── frontend/          # React + TypeScript + Vite
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx      # Main animated homepage ✨
│   │   │   ├── Projects.tsx
│   │   │   ├── Experience.tsx
│   │   │   └── Contact.tsx
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── backend/           # Node.js + Express + MongoDB
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   └── server.ts
    └── package.json
```

## Homepage Features

### Animated Elements
- **Scroll-based animations** - Smooth transitions triggered by scroll progress
- **Converging badges** - Tech stack badges (React, Node.js, TypeScript, etc.) that animate and converge to center
- **Particle effects** - Animated dots that create visual interest
- **Stats card** - Glassmorphism card showing:
  - 2+ Years Experience
  - 10+ Projects Delivered
  - 20+ Technologies

### Content
- **Hero Section**: "Full-Stack Developer | AI SaaS Specialist"
- **Main Title**: "Hi, I'm Hammad Mehmood"
- **Subtitle**: "Full-Stack Engineer from Islamabad, Pakistan. Architecting scalable SaaS platforms and AI-powered solutions."
- **CTA Buttons**: Links to GitHub and Email

### Tech Stack Badges
- React
- Next.js
- TypeScript
- Node.js
- MongoDB
- AWS
- Stripe
- Docker

## Next Steps

### 1. Install Dependencies
```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Run Development Servers
```bash
# Frontend (port 3000)
cd frontend
npm run dev

# Backend (port 5000)
cd backend
npm run dev
```

### 3. Customize Content
Update these values in `frontend/src/pages/Home.tsx`:

**Stats** (line ~130):
```typescript
const stats = [
  { label: 'Years Experience', value: '2+' },
  { label: 'Projects Delivered', value: '10+' },
  { label: 'Technologies', value: '20+' },
];
```

**Tech Badges** (lines ~40-60):
```typescript
const desktopBadges: BadgePosition[] = [
  { id: 'react', label: 'React', initialX: 274, initialY: 214 },
  { id: 'nextjs', label: 'Next.js', initialX: 188, initialY: 344 },
  { id: 'typescript', label: 'TypeScript', initialX: 398, initialY: 555 },
  { id: 'nodejs', label: 'Node.js', initialX: 1150, initialY: 575 },
  { id: 'mongodb', label: 'MongoDB', initialX: 483, initialY: 172 },
  { id: 'aws', label: 'AWS', initialX: 1286, initialY: 434 },
  { id: 'stripe', label: 'Stripe', initialX: 742, initialY: 164 },
  { id: 'docker', label: 'Docker', initialX: 1155, initialY: 254 },
];
```

**Text Content**:
- Hero title: "Full-Stack Developer | AI SaaS Specialist"
- Main title: "Hi, I'm Hammad Mehmood"
- Subtitle: "Full-Stack Engineer from Islamabad, Pakistan..."
- GitHub: https://github.com/Hammad8980
- Email: hammad.mehmood898@gmail.com

### 4. Add Your Content
- Replace placeholder stats with your actual numbers
- Update tech badges with your skills
- Add your projects to Projects.tsx
- Add your experience to Experience.tsx
- Build contact form in Contact.tsx

## Features to Add Later

- [ ] RAG Chatbot integration
- [ ] Projects showcase with filtering
- [ ] Experience timeline
- [ ] Contact form with backend
- [ ] Blog section (optional)
- [ ] Dark mode toggle
- [ ] Analytics integration

## Notes

- The homepage uses complex scroll animations - test on different devices
- Framer Motion is used for smooth animations
- The design is responsive (mobile, tablet, desktop)
- No external images required (uses CSS gradients and effects)
