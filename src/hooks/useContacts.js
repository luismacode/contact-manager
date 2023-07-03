import { useState, useEffect } from 'react';
import { findAllContacts } from '../services/contactsApi';

export const useContacts = () => {
    const [contacts, setContacts] = useState({
        data: [],
        hasError: false,
        isLoading: true
    });
    const setData = newData =>
        setContacts({ data: newData, isLoading: false, hasError: false });
    const setHasError = () =>
        setContacts({ data: [], isLoading: false, hasError: true });
    const reloadContacts = () =>
        setContacts({ data: [], isLoading: true, hasError: false });

    useEffect(() => {
        if (!contacts.isLoading) return;
        const controller = new AbortController();
        loadContacts(setData, setHasError, controller.signal);
        return () => {
            controller.abort();
        };
    }, [contacts.isLoading]);

    return {
        contacts: contacts.data,
        contactHasError: contacts.hasError,
        ContactIsLoading: contacts.isLoading,
        reloadContacts
    };
};

const loadContacts = async (setData, setHasError, signal) => {
    const { contacts, isAborted } = await findAllContacts(signal);
    if (isAborted) return;
    if (contacts) return setData(contacts);
    setHasError();
};
