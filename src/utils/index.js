import stores from "../stores";
import { updateLng } from "../stores/lng";
import { updateTheme } from "../stores/theme";

export const updateLngHandle = (lng) => {
  stores.dispatch(updateLng(lng));
};

export const updateThemeHandle = (theme) => {
  stores.dispatch(updateTheme(theme));
};
