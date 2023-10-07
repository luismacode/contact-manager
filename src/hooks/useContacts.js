import { useState, useEffect } from 'react';
import { findAllContacts } from '../services/contactsApi';

export const useContacts = filters => {
    const [contacts, setContacts] = useState({
        data: [],
        count: 0,
        hasError: false,
        isLoading: true
    });
    const setData = (newData, newCount) =>
        setContacts({
            data: newData,
            count: newCount,
            isLoading: false,
            hasError: false
        });
    const setHasError = () =>
        setContacts({ data: [], count: 0, isLoading: false, hasError: true });

    useEffect(() => {
        const controller = new AbortController();
        loadContacts(setData, setHasError, controller.signal, filters);
        return () => {
            controller.abort();
        };
    }, [filters]);
    return {
        contacts: contacts.data,
        totalContacts: contacts.count,
        contactHasError: contacts.hasError,
        ContactIsLoading: contacts.isLoading
    };
};

const loadContacts = async (setData, setHasError, signal, filters) => {
    const { contacts, count, isAborted } = await findAllContacts(
        signal,
        filters
    );
    if (isAborted) return;
    if (contacts) return setData(contacts, count);
    setHasError();
};
