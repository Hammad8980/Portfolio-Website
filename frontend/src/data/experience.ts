export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'dafinitiq',
    title: 'Full-Stack Developer',
    company: 'Dafinitiq AI',
    location: 'Remote',
    period: 'Sep 2024 – Feb 2026',
    description:
      'Architected and delivered scalable full-stack systems for AI-powered SaaS products.',
    responsibilities: [
      'Architected and delivered scalable full-stack systems for AI-powered SaaS products using React.js, TypeScript, Next.js, Node.js, Express.js, and MongoDB',
      'Designed and implemented a modular CMS platform with live preview editing, theme customization, media management, and automated navigation generation',
      'Built timezone-aware cron-based automation for progressive program delivery, reminders, and hybrid coaching workflows integrated with WhatsApp (WATI)',
      'Integrated Stripe subscription billing, webhook lifecycle management, AWS S3 storage, and third-party AI APIs for intelligent content generation',
      'Enhanced RAG-based chatbot pipeline by introducing metadata-driven chunk classification, improving retrieval precision',
      'Optimized backend architecture through indexing strategies, modular service design, and cloud management on AWS ECS',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'AWS',
      'Stripe',
      'OpenAI',
      'Docker',
    ],
  },
  {
    id: 'jazba',
    title: 'Software Developer Intern',
    company: 'Jazba Innovations',
    location: 'Islamabad, Pakistan',
    period: 'May 2024 – Jul 2024',
    description:
      'Developed and maintained full-stack features with focus on testing and optimization.',
    responsibilities: [
      'Developed and maintained full-stack features using React.js, TypeScript, Node.js, Express.js, and MongoDB',
      'Optimized build times with custom Webpack configuration',
      'Performed unit and integration testing with Jest and React Testing Library',
      'Achieved 95%+ code coverage across the application',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Jest',
      'Webpack',
    ],
  },
  {
    id: 'nft-fusion-dev',
    title: 'Full-Stack Developer',
    company: 'NFT-Fusion',
    location: 'Remote',
    period: 'Jan 2024 – Jul 2024',
    description:
      'Developed blockchain-based marketplace for code and digital assets.',
    responsibilities: [
      'Developed a blockchain-based marketplace using the MERN stack, Hardhat, and IPFS',
      'Implemented MetaMask Web3 authentication and ERC-721 smart contracts',
      'Created and managed 100+ NFTs, including specialized code NFTs',
      'Designed scalable backend APIs and integrated decentralized storage',
      'Optimized database queries for improved performance',
      'Received recognition as HBL P@SHA ICT Awards participant for innovation',
    ],
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'Solidity',
      'Hardhat',
      'IPFS',
      'Web3.js',
      'MetaMask',
    ],
  },
];
