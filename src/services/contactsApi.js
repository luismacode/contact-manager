export const createContact = async contact => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        return res.ok;
    } catch {
        return false;
    }
};

export const updateContact = async contact => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/${contact.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            }
        );
        return res.ok;
    } catch {
        return false;
    }
};

export const deleteByContact = async contactId => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}/${contactId}`,
            {
                method: 'DELETE'
            }
        );
        return res.ok;
    } catch {
        return false;
    }
};
export const findAllContacts = async signal => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
            signal
        });
        let contacts;
        if (res.ok) contacts = await res.json();
        return {
            contacts,
            hasError: !res.ok,
            isAborted: false
        };
    } catch (err) {
        const isAborted = err.name === 'AbortError';
        return {
            contacts: undefined,
            hasError: !isAborted,
            isAborted
        };
    }
};

export const findContactByEmail = async (email, signal) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}?email=${email}`,
            {
                signal
            }
        );
        let contact;
        if (res.ok) {
            const contacts = await res.json();
            contact = contacts[0];
        }
        return {
            contact,
            hasError: !res.ok,
            isAborted: false
        };
    } catch (err) {
        const isAborted = err.name === 'AbortError';
        return {
            contact: undefined,
            hasError: !isAborted,
            isAborted
        };
    }
};

export const findContactByPhone = async (phone, signal) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}?phone=${encodeURIComponent(
                phone
            )}`,
            { signal }
        );
        let contact;
        if (res.ok) {
            const contacts = await res.json();
            contact = contacts[0];
        }
        return {
            contact,
            hasError: !res.ok,
            isAborted: false
        };
    } catch (err) {
        const isAborted = err.name === 'AbortError';
        return {
            contact: undefined,
            hasError: !isAborted,
            isAborted
        };
    }
};
