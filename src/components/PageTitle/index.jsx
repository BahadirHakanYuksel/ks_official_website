import { motion } from "framer-motion";

function PageTitle({ children }) {
  return (
    <motion.header
      initial={{ height: 0 }}
      animate={{ height: "80px" }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r to-green-950 from-green-950 via-[#189245] text-white w-full text-4xl font-medium flex justify-center items-center mb-5 overflow-hidden"
    >
      {children}
      {/* <header className="w-full h-16 text-2xl font-medium flex items-center justify-center rounded-sm bg-gradient-to-r to-green-950 from-green-950 via-[#189245] text-white mb-5">
        {categories[activeAgendaCategoryId].title}
      </header> */}
    </motion.header>
  );
}

export default PageTitle;
