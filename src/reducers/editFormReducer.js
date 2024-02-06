import { EDIT_FORM_ACTION } from '../constants/editFormAction';
import {
    validateEmail,
    validateName,
    validatePhone
} from '../lib/validateContacts';

export const getEditFormInitialState = contact => ({
    name: {
        value: contact.name,
        error: undefined
    },
    email: {
        value: contact.email,
        loading: false,
        error: undefined
    },
    phone: {
        value: contact.phone,
        loading: false,
        error: undefined
    },
    role: contact.role,
    isAvailable: contact.isAvailable
});

export const editFormReducer = (state, { type, payload }) => {
    switch (type) {
        case EDIT_FORM_ACTION.NAME: {
            const error = validateName(payload);
            return {
                ...state,
                name: { value: payload, error }
            };
        }
        case EDIT_FORM_ACTION.EMAIL: {
            const error = validateEmail(payload.email);
            return {
                ...state,
                email: {
                    value: payload.email,
                    loading: !error && !payload.isInitial,
                    error
                }
            };
        }
        case EDIT_FORM_ACTION.PHONE: {
            const error = validatePhone(payload.phone);
            return {
                ...state,
                phone: {
                    value: payload.phone,
                    loading: !error && !payload.isInitial,
                    error
                }
            };
        }
        case EDIT_FORM_ACTION.ROLE:
            return {
                ...state,
                role: payload
            };
        case EDIT_FORM_ACTION.AVAILABLE:
            return {
                ...state,
                isAvailable: payload
            };
        case EDIT_FORM_ACTION.EMAIL_ERROR:
            return {
                ...state,
                email: {
                    value: state.email.value,
                    error: payload,
                    loading: false
                }
            };
        case EDIT_FORM_ACTION.PHONE_ERROR:
            return {
                ...state,
                phone: {
                    value: state.phone.value,
                    error: payload,
                    loading: false
                }
            };
        case EDIT_FORM_ACTION.REPLACE:
            return payload;
        default:
            throw new Error('Invalid action type');
    }
};
