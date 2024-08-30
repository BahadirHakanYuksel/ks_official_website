import classNames from "classnames";
import { useResponsiveData } from "../../Context";
import { motion } from "framer-motion";

export default function GoUpButton({ clickFunc }) {
  const { isMobile } = useResponsiveData();
  return (
    <motion.button
      onClick={clickFunc}
      initial={{ right: "-40px", opacity: 0 }}
      animate={{ right: "10px", opacity: 1 }}
      exit={{ right: "-40px", opacity: 0 }}
      className={classNames(
        "w-10 h-10 rounded-full fixed right-2.5 bottom-2.5 text-lg border-2 border-solid border-ksGrayTp overflow-hidden flex items-center justify-center text-ksGreen bg-goUpmotion.ButtonBack hover:border-ksGreen duration-200",
        {
          "!w-8 !h-8 !text-base": isMobile,
        }
      )}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </motion.button>
  );
}
