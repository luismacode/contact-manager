import { SORTOPTIONS } from '../constants/sortOptions';

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

const SORT_MAPPER = {
    [SORTOPTIONS.NAME]: ['name', 'asc'],
    [SORTOPTIONS.ROLE]: ['role', 'asc'],
    [SORTOPTIONS.AVAILABLE]: ['isAvailable', 'desc']
};
const getFindAllUrl = ({
    page,
    itemsPerPage,
    search,
    onlyAvailable,
    sortBy
}) => {
    const url = new URL(`${import.meta.env.VITE_BASE_URL}`);
    url.searchParams.append('_page', page);
    url.searchParams.append('_limit', itemsPerPage);
    if (search) url.searchParams.append('name_like', search);
    if (onlyAvailable) url.searchParams.append('isAvailable', true);
    const sortProps = SORT_MAPPER[sortBy];
    if (sortProps) {
        const [sort, order] = sortProps;
        url.searchParams.append('_sort', sort);
        url.searchParams.append('_order', order);
    }
    return url.href;
};
export const findAllContacts = async (signal, filters) => {
    const url = getFindAllUrl(filters);
    try {
        const res = await fetch(url, {
            signal
        });
        let contacts;
        if (res.ok) contacts = await res.json();
        return {
            contacts,
            count: res.ok ? res.headers.get('x-total-count') : 0,
            hasError: !res.ok,
            isAborted: false
        };
    } catch (err) {
        const isAborted = err.name === 'AbortError';
        return {
            contacts: undefined,
            count: 0,
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
