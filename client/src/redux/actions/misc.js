import { TOGGLE_NAV_SLIDER, TOGGLE_MODAL } from '../actionTypes';

export const toggleNavSlider = () => ({
    type: TOGGLE_NAV_SLIDER
})

export const toggleModal = (status, message) => ({
    type: TOGGLE_MODAL,
    payload: {status, message}
})