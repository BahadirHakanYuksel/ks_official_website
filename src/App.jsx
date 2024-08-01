import { useRoutes } from "react-router-dom";
import { useDynamicRoutes } from "./routes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { updateThemeHandle } from "./utils";

function App() {
  const routes = useDynamicRoutes();
  const act_theme = useSelector((state) => state.theme);
  // useEffect(() => {
  //   const path_name = location.pathname;
  //   console.log("pathname : ", path_name);
  //   if (i18n.language === "tr") {
  //     url_tr_data.forEach((url) => {
  //       url.first === path_name && navigate(url.second);
  //     });
  //   } else {
  //     url_en_data.forEach((url) => {
  //       url.first === path_name && navigate(url.second);
  //     });
  //   }
  // }, [i18n.language]);

  useEffect(() => {
    if (localStorage.getItem("ks_theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("ks_theme")
      );
    }
  }, [act_theme]);

  return useRoutes(routes);
}

export default App;
