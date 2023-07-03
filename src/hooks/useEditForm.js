import { useState, useEffect } from 'react';
import {
    formatPhone,
    validateEmail,
    validateName,
    validatePhone
} from '../lib/validateContacts';
import {
    findContactByEmail,
    findContactByPhone
} from '../services/contactsApi';

export const useEditForm = contact => {
    const [formData, setFormData] = useState(() => getInitialState(contact));
    const setName = newName => {
        const error = validateName(newName);
        setFormData({
            ...formData,
            name: { value: newName, error }
        });
    };
    const setEmail = newEmail => {
        const error = validateEmail(newEmail);
        const isInitial = newEmail === contact.email;
        setFormData({
            ...formData,
            email: { value: newEmail, loading: !error && !isInitial, error }
        });
    };
    const setPhone = newPhone => {
        const formatedPhone = formatPhone(newPhone);
        const error = validatePhone(formatedPhone);
        const isInitial = newPhone === contact.phone;
        setFormData({
            ...formData,
            phone: { value: formatedPhone, loading: !error && isInitial, error }
        });
    };
    const setRole = newRole => {
        setFormData({
            ...formData,
            role: newRole
        });
    };
    const setIsAvailable = newIsAvailable => {
        setFormData({
            ...formData,
            isAvailable: newIsAvailable
        });
    };
    const setEmailError = error =>
        setFormData(prevFormData => ({
            ...prevFormData,
            email: {
                value: prevFormData.email.value,
                error,
                loading: false
            }
        }));
    const setPhoneError = error =>
        setFormData(prevFormData => ({
            ...prevFormData,
            phone: {
                value: prevFormData.phone.value,
                error,
                loading: false
            }
        }));

    useEffect(() => {
        setFormData(getInitialState(contact));
    }, [contact]);
    useEffect(() => {
        if (!formData.email.loading) return;
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () =>
                validateEmailIsAvailable(
                    formData.email.value,
                    setEmailError,
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
                    setPhoneError,
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
        setName,
        setEmail,
        setPhone,
        setRole,
        setIsAvailable,
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

const validateEmailIsAvailable = async (email, setEmailError, signal) => {
    const { contact, hasError, isAborted } = await findContactByEmail(
        email,
        signal
    );
    if (isAborted) return;
    if (hasError)
        return setEmailError(
            'An error occurred while the email was being validated'
        );
    setEmailError(contact ? 'Email is already in use' : undefined);
};
const validatePhoneIsAvailable = async (phone, setPhoneError, signal) => {
    const { contact, hasError, isAborted } = await findContactByPhone(
        phone,
        signal
    );
    if (isAborted) return;
    if (hasError)
        return setPhoneError(
            'An error occurred while the email was being validated'
        );
    setPhoneError(contact ? 'Email is already in use' : undefined);
};
