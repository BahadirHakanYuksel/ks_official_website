import stores from "../stores";
import { updateLng } from "../stores/lng";

export const updateLngHandle = (lng) => {
  stores.dispatch(updateLng(lng));
};
