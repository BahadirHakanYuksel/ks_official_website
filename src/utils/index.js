import stores from "../stores";
import {
  leftSlider,
  rigtSlider,
  updateMainContent,
  updateService,
} from "../stores/app";
import { updateLng } from "../stores/lng";
import { closeModalBox, openModalBox } from "../stores/modal";
import { updateTheme } from "../stores/theme";

export const updateLngHandle = (lng) => {
  stores.dispatch(updateLng(lng));
};

export const updateThemeHandle = (theme) => {
  stores.dispatch(updateTheme(theme));
};

// Homepage Slider

export const rightSliderHandle = () => {
  stores.dispatch(rigtSlider());
};

export const leftSliderHandle = () => {
  stores.dispatch(leftSlider());
};

//service

export const updateServiceHandle = (serviceInfos) => {
  stores.dispatch(updateService(serviceInfos));
};

export const updateMainContentHandle = (mainContent) => {
  stores.dispatch(updateMainContent(mainContent));
};

export const openModalBoxHandle = (infos) => {
  stores.dispatch(openModalBox(infos));
};

export const closeModalBoxHandle = () => {
  stores.dispatch(closeModalBox());
};
