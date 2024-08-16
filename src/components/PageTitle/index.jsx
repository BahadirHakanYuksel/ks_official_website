import classNames from "classnames";
import { motion } from "framer-motion";
import { useResponsiveData } from "../../Context";
import { useEffect, useState } from "react";

function PageTitle({ children }) {
  const { isLaptop, isTablet, isMobile } = useResponsiveData();

  return (
    <motion.header
      initial={{ height: 0 }}
      animate={{ height: "80px" }}
      transition={{ duration: 0.3 }}
      className={classNames(
        "bg-gradient-to-r to-green-950 from-green-950 via-[#189245] text-white w-full text-4xl font-medium flex justify-center items-center mb-5 overflow-hidden text-center",
        {
          "!text-3xl": isTablet,
        },
        {
          "!text-[26px]": isMobile,
        }
      )}
    >
      {children}
      {/* <header className="w-full h-16 text-2xl font-medium flex items-center justify-center rounded-sm bg-gradient-to-r to-green-950 from-green-950 via-[#189245] text-white mb-5">
        {categories[activeAgendaCategoryId].title}
      </header> */}
    </motion.header>
  );
}

export default PageTitle;
