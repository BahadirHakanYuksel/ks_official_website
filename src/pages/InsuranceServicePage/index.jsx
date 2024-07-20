import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { turkishToEnglish } from "../../consts";
import PageTitle from "../../components/PageTitle";
import { updateServiceHandle } from "../../utils";
import { useTranslation } from "react-i18next";
import ErrorPage from "../ErrorPage";
import classNames from "classnames";

function InsuranceServicePage() {
  const { individual, corporate, activeService } = useSelector(
    (state) => state.app
  );
  const { pathServiceCategory, pathServiceName } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeServiceButtonIndex, setActiveServiceButtonIndex] = useState(1);

  const categories = [t("individual"), t("corporate")];

  const serviceControl = () => {
    if (pathServiceCategory === t("individual").toLowerCase()) {
      const thisMyService = individual.filter((service) => {
        return (
          encodeURIComponent(
            turkishToEnglish(service.title.replace(/ /g, "-"))
          ).toLowerCase() === pathServiceName
        );
      });
      updateServiceHandle(thisMyService[0]);
      setActiveCategoryIndex(0);
      setActiveServiceButtonIndex(1);
    }
    if (pathServiceCategory === t("corporate").toLowerCase()) {
      const thisMyService = corporate.filter((service) => {
        return (
          encodeURIComponent(
            turkishToEnglish(service.title.replace(/ /g, "-"))
          ).toLowerCase() === pathServiceName
        );
      });

      updateServiceHandle(thisMyService[0]);
      setActiveCategoryIndex(1);
      setActiveServiceButtonIndex(0);
    }

    console.log(activeService);
  };

  useEffect(() => {
    serviceControl();
  }, [pathServiceName, pathServiceCategory]);

  const changeCategory = () => {
    if (activeCategoryIndex === 0) {
      setActiveServiceButtonIndex(0);
      setActiveCategoryIndex(1);
    } else {
      setActiveServiceButtonIndex(1);
      setActiveCategoryIndex(0);
    }
  };

  const changeService = (title) => {
    navigate(
      `/${encodeURIComponent(
        turkishToEnglish(categories[activeCategoryIndex].replace(/ /g, "-"))
      ).toLowerCase()}/${encodeURIComponent(
        turkishToEnglish(title.replace(/ /g, "-"))
      ).toLowerCase()}`
    );
  };

  return (
    <>
      {activeService ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col gap-5"
        >
          <PageTitle>{activeService.title}</PageTitle>
          <div className="servicePageGrid grid gap-5">
            <div className="bg-serviceMenuBack shadow-md rounded-md p-3 flex flex-col gap-5">
              <div className=" flex justify-center items-center">
                <header className="text-xl h-8 font-medium relative">
                  {categories[activeCategoryIndex]}
                  <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-1/2 bg-ksGreen h-[3px] rounded-full"></div>
                </header>
              </div>
              <div className="flex flex-col w-full gap-1.5">
                {activeCategoryIndex === 0 &&
                  individual.map((service) => (
                    <button
                      onClick={() => changeService(service.title)}
                      className={classNames(
                        "flex items-center justify-start bg-serviceMenuBtnBack hover:text-ksGreen border-2 border-solid border-transparent hover:border-ksGreen duration-200 text-sm text-myText font-medium rounded-md px-4 h-10",
                        {
                          "!bg-ksGray !text-ksGreen hover:!border-transparent":
                            encodeURIComponent(
                              turkishToEnglish(service.title.replace(/ /g, "-"))
                            ).toLowerCase() === pathServiceName &&
                            encodeURIComponent(
                              turkishToEnglish(categories[activeCategoryIndex])
                            ).toLowerCase() === pathServiceCategory,
                        }
                      )}
                    >
                      {service.title}
                    </button>
                  ))}
                {activeCategoryIndex === 1 &&
                  corporate.map((service) => (
                    <button
                      onClick={() => changeService(service.title)}
                      className={classNames(
                        "flex items-center justify-start bg-serviceMenuBtnBack hover:text-ksGreen border-2 border-solid border-transparent hover:border-ksGreen duration-200 text-sm text-myText font-medium rounded-md px-4 h-10",
                        {
                          "!bg-ksGray !text-ksGreen hover:!border-transparent":
                            encodeURIComponent(
                              turkishToEnglish(service.title.replace(/ /g, "-"))
                            ).toLowerCase() === pathServiceName &&
                            encodeURIComponent(
                              turkishToEnglish(categories[activeCategoryIndex])
                            ).toLowerCase() === pathServiceCategory,
                        }
                      )}
                    >
                      {service.title}
                    </button>
                  ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-gray-500 bg-opacity-40 w-1/5 rounded-full h-1"></div>
              </div>
              <button
                onClick={changeCategory}
                className="h-8 text-base rounded-full hover:bg-green-700 duration-200 text-white flex items-center justify-center font-medium bg-ksGreen"
              >
                {categories[activeServiceButtonIndex]} Hizmetlere Git
              </button>
            </div>
            <div className="text-myText">asdasd</div>
          </div>
        </motion.div>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default InsuranceServicePage;
