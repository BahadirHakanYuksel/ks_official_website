import { motion } from "framer-motion";

function PageTitle({ children }) {
  return (
    <motion.header
      initial={{ height: 0 }}
      animate={{ height: "80px" }}
      transition={{ duration: 0.3 }}
      className="bg-ksGreen text-white w-full text-4xl font-medium flex justify-center items-center mb-5 overflow-hidden"
    >
      {children}
    </motion.header>
  );
}

export default PageTitle;
