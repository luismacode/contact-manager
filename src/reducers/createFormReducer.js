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

export const createFormReducer = (state, action) => {
    switch (action.type) {
        case 'name_changed': {
            const error = validateName(action.value);
            return {
                ...state,
                name: { value: action.value, error }
            };
        }
        case 'email_changed': {
            const error = validateEmail(action.value);
            return {
                ...state,
                email: { value: action.value, loading: !error, error }
            };
        }
        case 'phone_changed': {
            const error = validatePhone(action.value);
            return {
                ...state,
                phone: { value: action.value, loading: !error, error }
            };
        }
        case 'email_error_changed':
            return {
                ...state,
                email: {
                    value: state.email.value,
                    error: action.value,
                    loading: false
                }
            };

        case 'phone_error_changed':
            return {
                ...state,
                phone: {
                    value: state.phone.value,
                    error: action.value,
                    loading: false
                }
            };
        default:
            throw new Error('Invalid action type');
    }
};
