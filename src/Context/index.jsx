import { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const context = createContext();

const MyProvider = ({ children }) => {
  const isLaptop = useMediaQuery({ query: "(max-width: 1025px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 769px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const data = { isLaptop, isTablet, isMobile };

  return <context.Provider value={data}>{children}</context.Provider>;
};

export default MyProvider;
export const useResponsiveData = () => useContext(context);
