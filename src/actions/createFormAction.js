import { CREATE_FORM_ACTION } from '../constants/createFormAction';

export const nameChanged = name => ({
    type: CREATE_FORM_ACTION.NAME,
    payload: name
});
export const emailChanged = email => ({
    type: CREATE_FORM_ACTION.EMAIL,
    payload: email
});
export const phoneChanged = phone => ({
    type: CREATE_FORM_ACTION.PHONE,
    payload: phone
});
export const emailErrorChanged = error => ({
    type: CREATE_FORM_ACTION.EMAIL_ERROR,
    payload: error
});
export const phoneErrorChanged = error => ({
    type: CREATE_FORM_ACTION.PHONE_ERROR,
    payload: error
});
