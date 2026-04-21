import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to My Portfolio
        </h1>
        <p className="text-xl text-gray-600">
          Full Stack Developer | Designer | Problem Solver
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
