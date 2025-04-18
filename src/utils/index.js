import stores from "../stores";
import { updateKsAdmin } from "../stores/admin";
import {
  closeResNavMenu,
  leftSlider,
  rigtSlider,
  updateMainContent,
  updateResNavMenu,
  updateRightSidebarGetRequest,
  updateService,
} from "../stores/app";
import { updateLng } from "../stores/lng";
import {
  closeModalBox,
  closeTeamModal,
  openModalBox,
  openTeamModal,
} from "../stores/modal";
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

export const updateKsAdminHandle = (adminInfos) => {
  stores.dispatch(updateKsAdmin(adminInfos));
};

export const updateResNavMenuHandle = () => {
  stores.dispatch(updateResNavMenu());
};

export const closeResNavMenuHandle = () => {
  stores.dispatch(closeResNavMenu());
};

export const openTeamModalHandle = (id) => {
  stores.dispatch(openTeamModal(id));
};

export const closeTeamModalHandle = () => {
  stores.dispatch(closeTeamModal());
};

export const updateRightSidebarGetRequestHandle = (status) => {
  stores.dispatch(updateRightSidebarGetRequest(status));
};
