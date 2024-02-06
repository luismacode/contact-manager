import { CREATE_FORM_ACTION } from '../constants/createFormAction';
import {
    validateEmail,
    validateName,
    validatePhone
} from '../lib/validateContacts';

export const CREATE_FORM_INITIAL_STATE = {
    name: {
        value: '',
        error: undefined
    },
    email: {
        value: '',
        loading: false,
        error: undefined
    },
    phone: {
        value: '',
        loading: false,
        error: undefined
    }
};

export const createFormReducer = (state, { type, payload }) => {
    switch (type) {
        case CREATE_FORM_ACTION.NAME: {
            const error = validateName(payload);
            return {
                ...state,
                name: { value: payload, error }
            };
        }
        case CREATE_FORM_ACTION.EMAIL: {
            const error = validateEmail(payload);
            return {
                ...state,
                email: { value: payload, loading: !error, error }
            };
        }
        case CREATE_FORM_ACTION.PHONE: {
            const error = validatePhone(payload);
            return {
                ...state,
                phone: { value: payload, loading: !error, error }
            };
        }
        case CREATE_FORM_ACTION.EMAIL_ERROR:
            return {
                ...state,
                email: {
                    value: state.email.value,
                    error: payload,
                    loading: false
                }
            };

        case CREATE_FORM_ACTION.PHONE_ERROR:
            return {
                ...state,
                phone: {
                    value: state.phone.value,
                    error: payload,
                    loading: false
                }
            };
        default:
            throw new Error('Invalid action type');
    }
};
