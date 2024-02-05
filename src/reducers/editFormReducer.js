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

export const editFormReducer = (state, action) => {
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
            const isInitial = action.value === action.currentEmail;
            return {
                ...state,
                email: {
                    value: action.value,
                    loading: !error && !isInitial,
                    error
                }
            };
        }
        case 'phone_changed': {
            const error = validatePhone(action.value);
            const isInitial = action.value === action.currentPhone;
            return {
                ...state,
                phone: {
                    value: action.value,
                    loading: !error && isInitial,
                    error
                }
            };
        }
        case 'role_changed':
            return {
                ...state,
                role: action.value
            };
        case 'is_available_changed':
            return {
                ...state,
                isAvailable: action.value
            };
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
        case 'replace':
            return action.value;
        default:
            throw new Error('Invalid action type');
    }
};
