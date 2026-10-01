export interface Project {
  id: string;
  title: string;
  company: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  link?: string;
  github?: string;
  image?: string;
  period: string;
}

export const projects: Project[] = [
  {
    id: 'swagprint',
    title: 'SwagPrint',
    company: 'Rev9 Solutions',
    description: 'Multi-Brand Ecommerce Platform Migration',
    longDescription:
      'Solo-led full-stack migration of legacy PHP ecommerce platform to modern Next.js/NestJS architecture with Apollo GraphQL gateway.',
    technologies: [
      'Next.js',
      'NestJS',
      'Apollo GraphQL',
      'TypeScript',
      'Prisma',
      'MySQL',
      'Redis',
      'TailwindCSS',
    ],
    highlights: [
      'Architected three-tier system with GraphQL gateway as sole API boundary',
      'Implemented zero-downtime strangler pattern migration strategy',
      'Built live pricing engines for 4 product configurators with cache bypass',
      'Redis caching strategy improved catalog performance while maintaining pricing accuracy',
    ],
    period: '2026',
  },
  {
    id: 'friska',
    title: 'Friska',
    company: 'Dafinitiq AI',
    description: 'AI Chatbot SaaS Platform',
    longDescription:
      'Engineered scalable full-stack architecture for an AI-powered chatbot platform using TypeScript, Node.js, and MongoDB.',
    technologies: [
      'TypeScript',
      'Node.js',
      'MongoDB',
      'Stripe',
      'RAG',
      'OpenAI',
    ],
    highlights: [
      'Implemented RAG-based content retrieval system',
      'Integrated Stripe subscription billing with webhook lifecycle management',
      'Built embeddable chatbot widget system for external client integration',
      'Designed scalable microservices architecture',
    ],
    period: '2025',
  },
  {
    id: 'alkinarealty',
    title: 'AlkinaRealty',
    company: 'Dafinitiq AI',
    description: 'Real Estate Platform',
    longDescription:
      'Developed full-stack real estate platform with geospatial search and dynamic property filtering.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'WhatsApp API',
      'Google Maps',
    ],
    highlights: [
      'Integrated bidirectional WhatsApp communication system',
      'Built document management workflows',
      'Implemented geospatial search with MongoDB',
      'Real-time updates and optimized database queries',
    ],
    period: '2025',
  },
  {
    id: 'create-anything',
    title: 'Create Anything',
    company: 'Dafinitiq AI',
    description: 'AI Agent Platform Marketing Site',
    longDescription:
      'Built high-performance marketing homepage using Next.js, TypeScript, and Framer Motion.',
    technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'TailwindCSS'],
    highlights: [
      'Engineered complex scroll-driven animation systems',
      'Optimized for 60fps rendering performance',
      'Designed reusable component architecture',
      'Implemented RAF-based animation handling',
    ],
    period: '2025',
  },
  {
    id: 'donnafitness',
    title: 'DonnaFitness',
    company: 'Dafinitiq AI',
    description: 'AI Fitness SaaS Platform',
    longDescription:
      'Developed scalable SaaS platform with TypeScript, Node.js, MongoDB, and AWS infrastructure.',
    technologies: [
      'TypeScript',
      'Node.js',
      'MongoDB',
      'AWS',
      'OpenAI',
      'WhatsApp API',
    ],
    highlights: [
      'Built modular CMS system with dynamic content management',
      'Implemented cron-based automated program delivery',
      'Enhanced RAG-based chatbot with metadata-driven classification',
      'Integrated WhatsApp automation for coaching workflows',
    ],
    period: '2024-2025',
  },
  {
    id: 'nft-fusion',
    title: 'NFT-Fusion',
    company: 'Independent',
    description: 'Blockchain Marketplace',
    longDescription:
      'Developed a blockchain-based marketplace for code and digital assets using the MERN stack, Hardhat, and IPFS.',
    technologies: [
      'React',
      'Node.js',
      'MongoDB',
      'Solidity',
      'Hardhat',
      'IPFS',
      'Web3',
    ],
    highlights: [
      'Implemented MetaMask Web3 authentication',
      'Created ERC-721 smart contracts',
      'Managed 100+ NFTs including specialized code NFTs',
      'HBL P@SHA ICT Awards participant',
    ],
    period: '2024-2025',
  },
];
