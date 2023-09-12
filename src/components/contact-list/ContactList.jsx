import UsersIcon from '../icons/UsersIcon';
import ContactListFilters from './ContactListFilters';
import ContactListRows from './ContactListRows';
import { useFilters } from '../../hooks/useFilters';
import './ContactList.scss';
import ContactListPagination from './ContactListPagination';
import { useContacts } from '../../hooks/useContacts';
import { getContactsToDisplay } from '../../lib/filterContacts';
import ContactFormContainer from '../contact-forms/ContactFormContainer';
import Modal from '../modal/Modal';
import ContactFormsProvider from '../providers/ContactFormsProvider';
import ContactListViewSelector from './ContactListViewSelector';
import { useState } from 'react';

const ContactList = () => {
    const [view, setView] = useState(true);
    const {
        filters,
        pagination,
        filterSetters,
        paginationSetters,
        resetFilters
    } = useFilters();
    const { contacts, contactHasError, contactIsLoading, reloadContacts } =
        useContacts();
    const { paginatedContacts, totalPages } = getContactsToDisplay(
        contacts,
        filters,
        pagination
    );

    return (
        <div className='ContactList'>
            <div className='ContactList-header'>
                <h1 className='ContactList-title'>
                    <UsersIcon className='ContactList-icon' />
                    <span>Contact List</span>
                </h1>
                <ContactListViewSelector view={view} setView={setView} />
            </div>
            <ContactFormsProvider
                reloadContacts={reloadContacts}
                resetFilters={resetFilters}
            >
                <ContactListFilters {...filters} {...filterSetters} />
                <Modal>
                    <ContactFormContainer />
                </Modal>

                <ContactListRows
                    contacts={paginatedContacts}
                    hasError={contactHasError}
                    isLoading={contactIsLoading}
                    view={view}
                />
            </ContactFormsProvider>

            <ContactListPagination
                {...pagination}
                {...paginationSetters}
                totalPages={totalPages}
            />
        </div>
    );
};

export default ContactList;
