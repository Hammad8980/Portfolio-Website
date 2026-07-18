import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experiences, type Experience as ExperienceType } from '../data/experience';

interface ExperienceItemProps {
  exp: ExperienceType;
  isLeft: boolean;
  isLast?: boolean;
}

const ExperienceItem = ({ exp, isLeft, isLast = false }: ExperienceItemProps) => {
  const checkpointRef = useRef<HTMLDivElement>(null);
  // Reveal when the hollow checkpoint reaches the viewport-centered traveler
  const isReached = useInView(checkpointRef, {
    once: true,
    margin: '-45% 0px -45% 0px',
  });

  return (
    <div
      className={`relative min-h-[4rem] ${
        isLast ? 'mb-0' : 'mb-16 md:mb-24'
      }`}
    >
      {/* Hollow checkpoint — anchored to the timeline line, not the card */}
      <div
        ref={checkpointRef}
        className="absolute left-4 top-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#2159E8] bg-white md:left-1/2"
        aria-hidden="true"
      />

      {/* Experience card — left/right of the line */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={
          isReached
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 48, scale: 0.98 }
        }
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`pl-10 md:w-[calc(50%-0.75rem)] md:pl-0 ${
          isLeft ? 'md:pr-6 lg:pr-8' : 'md:ml-auto md:pl-6 lg:pl-8'
        }`}
      >
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-6 text-left shadow-sm transition-shadow hover:shadow-md">
          <div className="mb-4">
            <h3 className="mb-1 text-2xl font-bold text-gray-900">{exp.title}</h3>
            <p className="mb-1 text-lg font-medium text-[#2159E8]">{exp.company}</p>
            <p className="text-sm text-gray-500">
              {exp.period} • {exp.location}
            </p>
          </div>

          <p className="mb-4 text-gray-600">{exp.description}</p>

          <div className="mb-4">
            <h4 className="mb-3 text-sm font-semibold text-gray-900">
              Key Responsibilities:
            </h4>
            <ul className="space-y-2.5">
              {exp.responsibilities.map((resp, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-gray-600"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2159E8]"
                  />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-[#2159E8]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Timeline line — starts at traveler, ends with the last experience */}
        <div className="absolute bottom-0 left-4 top-[50vh] w-0.5 -translate-x-1/2 bg-gray-200 md:left-1/2" />

        {/* Sticky viewport-centered traveler dot — stops when the timeline ends */}
        <div className="pointer-events-none sticky top-1/2 z-20 h-0 w-full">
          <div className="absolute left-4 top-0 -translate-x-1/2 -translate-y-1/2 md:left-1/2">
            <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-[#2159E8]/25" />
            <span className="relative block h-5 w-5 rounded-full border-4 border-white bg-[#2159E8] shadow-lg shadow-blue-500/30 ring-4 ring-[#2159E8]/15" />
          </div>
        </div>

        {/* Title vertically centered in the upper half of the viewport */}
        <div className="flex min-h-[50vh] items-center justify-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Experience
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              My professional journey in software development
            </p>
          </motion.div>
        </div>

        {/* Experiences — first hollow circle sits on the traveler at load */}
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.id}
            exp={exp}
            isLeft={index % 2 === 0}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-8 border-t border-gray-200 pt-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Education
          </h2>
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="mb-1 text-xl font-bold text-gray-900">
                Bachelor of Science in Computer Science
              </h3>
              <p className="mb-1 font-medium text-[#2159E8]">
                Air University, Islamabad
              </p>
              <p className="text-sm text-gray-500">Sep 2021 – Jul 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-16"
        >
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
              <p className="mb-1 font-semibold text-gray-900">
                Relational Database Designer
              </p>
              <p className="text-sm text-gray-600">Coursera • May 2023</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
              <p className="mb-1 font-semibold text-gray-900">
                GitHub Contributor 2023
              </p>
              <p className="text-sm text-gray-600">MLSA • Jun 2023</p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-center">
              <p className="mb-1 font-semibold text-gray-900">
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
