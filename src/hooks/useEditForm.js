import { useEffect, useReducer } from 'react';
import {
    findContactByEmail,
    findContactByPhone
} from '../services/contactsApi';
import {
    editFormReducer,
    getEditFormInitialState
} from '../reducers/editFormReducer';
import {
    emailErrorChanged,
    phoneErrorChanged,
    replace
} from '../actions/editFormAction';

export const useEditForm = contact => {
    const [formData, dispatchFormData] = useReducer(
        editFormReducer,
        contact,
        getEditFormInitialState
    );

    useEffect(() => {
        dispatchFormData(replace(getEditFormInitialState(contact)));
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
    let errorMessage;
    if (hasError)
        errorMessage = 'An error occurred while the email was being validated';
    else if (contact) errorMessage = 'Email is already in use';
    dispatchFormData(emailErrorChanged(errorMessage));
};
const validatePhoneIsAvailable = async (phone, dispatchFormData, signal) => {
    const { contact, hasError, isAborted } = await findContactByPhone(
        phone,
        signal
    );
    if (isAborted) return;
    let errorMessage;
    if (hasError)
        errorMessage = 'An error occurred while the email was being validated';
    else if (contact) errorMessage = 'Email is already in use';
    dispatchFormData(phoneErrorChanged(errorMessage));
};
