import { useEffect, useReducer } from 'react';
import {
    validateEmail,
    validateName,
    validatePhone
} from '../lib/validateContacts';
import {
    findContactByEmail,
    findContactByPhone
} from '../services/contactsApi';

const formDataReducer = (state, action) => {
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

export const useEditForm = contact => {
    const [formData, dispatchFormData] = useReducer(
        formDataReducer,
        contact,
        getInitialState
    );

    useEffect(() => {
        dispatchFormData({ type: 'replace', value: getInitialState(contact) });
    }, [contact]);
    useEffect(() => {
        if (!formData.email.loading) return;
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () =>
                validateEmailIsAvailable(
                    formData.email.value,
                    dispatchFormData,
                    controller.signal
                ),
            500
        );
        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [formData.email.value, formData.email.loading]);

    useEffect(() => {
        if (!formData.phone.loading) return;

        const controller = new AbortController();
        const timeoutId = setTimeout(
            () =>
                validatePhoneIsAvailable(
                    formData.phone.value,
                    dispatchFormData,
                    controller.signal
                ),
            500
        );
        return () => {
            controller.abort();
            clearTimeout(timeoutId);
        };
    }, [formData.phone.value, formData.phone.loading]);

    const isFormInvalid =
        areInitialValues(formData, contact) ||
        formData.name.error ||
        formData.email.error ||
        formData.phone.error ||
        formData.phone.loading ||
        formData.email.loading;
    return {
        ...formData,
        dispatchFormData,
        isFormInvalid
    };
};

const getInitialState = contact => ({
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

const areInitialValues = (formData, contact) =>
    formData.name.value === contact.name &&
    formData.email.value === contact.email &&
    formData.phone.value === contact.phone &&
    formData.role === contact.role &&
    formData.isAvailable === contact.isAvailable;

const validateEmailIsAvailable = async (email, dispatchFormData, signal) => {
    const { contact, hasError, isAborted } = await findContactByEmail(
        email,
        signal
    );
    if (isAborted) return;
    if (hasError)
        return dispatchFormData({
            type: 'email_error_changed',
            value: 'An error occurred while the email was being validated'
        });
    dispatchFormData({
        type: 'email_error_changed',
        value: contact ? 'Email is already in use' : undefined
    });
};
const validatePhoneIsAvailable = async (phone, dispatchFormData, signal) => {
    const { contact, hasError, isAborted } = await findContactByPhone(
        phone,
        signal
    );
    if (isAborted) return;
    if (hasError)
        return dispatchFormData({
            type: 'phone_error_changed',
            value: 'An error occurred while the email was being validated'
        });
    dispatchFormData({
        type: 'phone_error_changed',
        value: contact ? 'Email is already in use' : undefined
    });
};
