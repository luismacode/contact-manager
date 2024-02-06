import { EDIT_FORM_ACTION } from '../constants/editFormAction';

export const nameChanged = name => ({
    type: EDIT_FORM_ACTION.NAME,
    payload: name
});
export const emailChanged = (email, currentEmail) => ({
    type: EDIT_FORM_ACTION.EMAIL,
    payload: { email, isInitial: currentEmail === email }
});
export const phoneChanged = (phone, currentPhone) => ({
    type: EDIT_FORM_ACTION.PHONE,
    payload: { phone, isInitial: currentPhone === phone }
});
export const roleChanged = role => ({
    type: EDIT_FORM_ACTION.ROLE,
    payload: role
});
export const availableChanged = available => ({
    type: EDIT_FORM_ACTION.AVAILABLE,
    payload: available
});
export const emailErrorChanged = error => ({
    type: EDIT_FORM_ACTION.EMAIL_ERROR,
    payload: error
});
export const phoneErrorChanged = error => ({
    type: EDIT_FORM_ACTION.PHONE_ERROR,
    payload: error
});
export const replace = newState => ({
    type: EDIT_FORM_ACTION.REPLACE,
    payload: newState
});
