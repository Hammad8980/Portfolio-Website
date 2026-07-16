# 🚀 Quick Start Guide

## Get Your Portfolio Running in 3 Steps

### Step 1: Install Dependencies
```bash
cd Portfolio-Website/frontend
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Visit: **http://localhost:3000**

---

## 🎯 What You'll See

### Home Page (/)
- Animated hero with scroll effects
- Tech badges converging to center
- Stats card with your experience
- CTA buttons to GitHub and email

**Tip**: Scroll slowly to see all animations!

### Projects Page (/projects)
- 5 projects from your CV
- Technologies and highlights
- Responsive grid layout

### Experience Page (/experience)
- Timeline with 3 work positions
- Education and certifications
- Detailed responsibilities

### Contact Page (/contact)
- Working contact form
- Your contact information
- Social media links

---

## 📝 Quick Customization

### Update Your Stats
File: `frontend/src/pages/Home.tsx` (line ~130)
```typescript
const stats = [
  { label: 'Years Experience', value: '2+' },
  { label: 'Projects Delivered', value: '10+' },
  { label: 'Technologies', value: '20+' },
];
```

### Add/Edit Projects
File: `frontend/src/data/projects.ts`
```typescript
export const projects: Project[] = [
  {
    id: 'my-project',
    title: 'My Project',
    company: 'Company Name',
    description: 'Short description',
    // ... more fields
  },
];
```

### Add/Edit Experience
File: `frontend/src/data/experience.ts`
```typescript
export const experiences: Experience[] = [
  {
    id: 'my-job',
    title: 'Job Title',
    company: 'Company',
    // ... more fields
  },
];
```

---

## 🚀 Deploy to Production

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy Options
- **Vercel**: Connect GitHub repo, auto-deploy
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package

---

## 🔗 Your Links

All these are already configured:
- GitHub: https://github.com/hammadmehmood0
- LinkedIn: https://www.linkedin.com/in/hammad-mehmood-b82b24229/
- Email: hammad.mehmood898@gmail.com

---

## 🆘 Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

### Dependencies not installing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Animations not smooth?
- Check browser console for errors
- Try disabling browser extensions
- Test in Chrome/Firefox

---

## 📚 Learn More

- **Full Documentation**: See `README.md`
- **Complete Features**: See `COMPLETE.md`
- **Project Structure**: See `SETUP.md`

---

**Need Help?**
- Check the documentation files
- Review the code comments
- Test in different browsers

**Ready to Deploy?**
Your portfolio is production-ready! 🎉
