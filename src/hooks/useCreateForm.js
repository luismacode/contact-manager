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
export const useCreateForm = () => {
    const [formData, dispatchFormData] = useReducer(formDataReducer, {
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
    });
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
        !formData.name.value ||
        !formData.email.value ||
        !formData.phone.value ||
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
            value: 'An error occurred while the phone was being validated'
        });
    dispatchFormData({
        type: 'phone_error_changed',
        value: contact ? 'Phone is already in use' : undefined
    });
};
