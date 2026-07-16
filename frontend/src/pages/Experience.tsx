import { motion } from 'framer-motion';
import { experiences } from '../data/experience';

const Experience = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#2159E8] rounded-full border-4 border-white shadow" />

              <div
                className={`ml-8 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}
              >
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-[#2159E8] font-medium mb-1">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exp.period} • {exp.location}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-4">{exp.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Key Responsibilities:
                    </h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <span className="text-[#2159E8] mr-2 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white text-[#2159E8] text-xs font-medium rounded-full border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Education
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Bachelor of Science in Computer Science
              </h3>
              <p className="text-[#2159E8] font-medium mb-1">
                Air University, Islamabad
              </p>
              <p className="text-sm text-gray-500">Sep 2021 – Jul 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
              <p className="font-semibold text-gray-900 mb-1">
                Relational Database Designer
              </p>
              <p className="text-sm text-gray-600">Coursera • May 2023</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
              <p className="font-semibold text-gray-900 mb-1">
                GitHub Contributor 2023
              </p>
              <p className="text-sm text-gray-600">MLSA • Jun 2023</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 text-center">
              <p className="font-semibold text-gray-900 mb-1">
                Web Development Bootcamp
              </p>
              <p className="text-sm text-gray-600">Air University • Aug 2023</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
