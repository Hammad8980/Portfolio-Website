import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import AnimatedHero from '../components/AnimatedHero/AnimatedHero';
import { projects } from '../data/projects';
import { experiences } from '../data/experience';

const Home = () => {
  const [showContent, setShowContent] = useState(false);

  const techStack = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Stripe',
    'TailwindCSS',
    'Framer Motion',
  ];

  const stats = [
    { label: 'Years Experience', value: '2+' },
    { label: 'Projects Delivered', value: '10+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Happy Clients', value: '5+' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Hero Section - Plays First */}
      <AnimatedHero onAnimationComplete={() => setShowContent(true)} />

      {/* Main Content - Shows After Animation */}
      <div
        className={`transition-opacity duration-1000 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Header />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#2159E8] to-[#1a47c4] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  HM
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Hi, I'm{' '}
                <span className="text-[#2159E8]">Hammad Mehmood</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
                Full-Stack Developer | AI SaaS Specialist
              </p>

              <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                Building scalable SaaS platforms with React, Next.js,
                TypeScript, and Node.js. Specialized in AI integrations, payment
                systems, and cloud deployment.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <motion.a
                  href="https://github.com/hammadmehmood0"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[#2159E8] text-white rounded-lg font-medium hover:bg-[#1a47c4] transition-colors shadow-md"
                >
                  View My Work
                </motion.a>
                <motion.a
                  href="mailto:hammad.mehmood898@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-[#2159E8] text-[#2159E8] rounded-lg font-medium hover:bg-[#2159E8] hover:text-white transition-colors"
                >
                  Get In Touch
                </motion.a>
              </div>

              <div className="flex justify-center items-center gap-6 text-gray-500">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Islamabad, Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Available for opportunities</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#2159E8] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Technology Stack
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experienced in modern technologies and frameworks for building
                scalable applications
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-6 py-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-[#2159E8] hover:shadow-md transition-all cursor-default"
                >
                  <span className="text-gray-700 font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A selection of my recent work building scalable SaaS platforms
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#2159E8] font-medium mb-3">
                    {project.company}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white text-xs text-gray-700 rounded-full border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/projects"
                className="inline-block px-8 py-3 bg-[#2159E8] text-white rounded-lg font-medium hover:bg-[#1a47c4] transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Experience Preview Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Work Experience
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional journey in software development
              </p>
            </motion.div>

            <div className="space-y-8 mb-12">
              {experiences.slice(0, 2).map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-[#2159E8] font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 md:mt-0">
                      {exp.period}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-50 text-xs text-[#2159E8] rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/experience"
                className="inline-block px-8 py-3 bg-[#2159E8] text-white rounded-lg font-medium hover:bg-[#1a47c4] transition-colors"
              >
                View Full Experience
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2159E8] to-[#1a47c4] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Let's Work Together
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Have a project in mind? I'm available for freelance work and
                full-time opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-white text-[#2159E8] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Get In Touch
                </Link>
                <a
                  href="/Hammad_Mehmood_CV.pdf"
                  download
                  className="px-8 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-[#2159E8] transition-colors"
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
