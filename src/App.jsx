import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { useDynamicRoutes } from "./routes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { url_en_data, url_tr_data } from "./consts";

function App() {
  const routes = useDynamicRoutes();
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    const path_name = location.pathname;
    console.log("pathname : ", path_name);
    if (i18n.language === "tr") {
      url_tr_data.forEach((url) => {
        console.log(url.first, " ", path_name);
        url.first === path_name && navigate(url.second);
      });
    } else {
      url_en_data.forEach((url) => {
        url.first === path_name && navigate(url.second);
      });
    }
  }, [i18n.language]);

  return useRoutes(routes);
}

export default App;
