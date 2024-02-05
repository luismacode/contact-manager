import { useEffect, useReducer } from 'react';
import {
    findContactByEmail,
    findContactByPhone
} from '../services/contactsApi';
import {
    editFormReducer,
    getEditFormInitialState
} from '../reducers/editFormReducer';

export const useEditForm = contact => {
    const [formData, dispatchFormData] = useReducer(
        editFormReducer,
        contact,
        getEditFormInitialState
    );

    useEffect(() => {
        dispatchFormData({
            type: 'replace',
            value: getEditFormInitialState(contact)
        });
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
