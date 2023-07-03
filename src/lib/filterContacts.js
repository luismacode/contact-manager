import { CONTACT_ROLES } from '../constants/contactRoles';
import { SORTOPTIONS } from '../constants/sortOptions';

const filterContactsByName = (contacts, search) => {
    if (!search) return [...contacts];
    const lowerCasedSearch = search.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(lowerCasedSearch)
    );
};
const filterAvailableContacts = (contacts, available) => {
    if (!available) return [...contacts];
    return contacts.filter(contact => contact.isAvailable);
};

const sortContacts = (contacts, sortBy) => {
    const sortedContacts = [...contacts];
    switch (sortBy) {
        case SORTOPTIONS.NAME:
            return sortedContacts.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });
        case SORTOPTIONS.ROLE:
            return sortedContacts.sort((a, b) => {
                if (a.role === b.role) return 0;
                if (a.role === CONTACT_ROLES.CUSTOMER) return -1;
                if (
                    a.role === CONTACT_ROLES.SPONSOR &&
                    b.role === CONTACT_ROLES.SUPPLIER
                )
                    return -1;
                if (
                    a.role === CONTACT_ROLES.SUPPLIER &&
                    b.role === CONTACT_ROLES.OTHER
                )
                    return -1;
                return 1;
            });
        case SORTOPTIONS.AVAILABLE:
            return sortedContacts.sort((a, b) => {
                if (a.isAvailable === b.isAvailable) return 0;
                if (a.isAvailable && !b.isAvailable) return -1;
                return 1;
            });
        default:
            return sortedContacts;
    }
};

const paginateContacts = (contacts, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(contacts.length / itemsPerPage) || 1;
    const paginatedContacts = contacts.slice(startIndex, endIndex);
    return {
        totalPages,
        paginatedContacts
    };
};

export const getContactsToDisplay = (
    contacts,
    { search, onlyAvailable, sortBy },
    { page, itemsPerPage }
) => {
    let filteredContacts = filterAvailableContacts(contacts, onlyAvailable);
    filteredContacts = filterContactsByName(filteredContacts, search);
    filteredContacts = sortContacts(filteredContacts, sortBy);
    const { paginatedContacts, totalPages } = paginateContacts(
        filteredContacts,
        page,
        itemsPerPage
    );
    return {
        paginatedContacts,
        totalPages
    };
};
