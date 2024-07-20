import stores from "../stores";
import { leftSlider, rigtSlider, updateService } from "../stores/app";
import { updateLng } from "../stores/lng";
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
