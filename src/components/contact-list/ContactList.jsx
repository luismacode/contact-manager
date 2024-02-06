import UsersIcon from '../icons/UsersIcon';
import ContactListFilters from './ContactListFilters';
import ContactListRows from './ContactListRows';
import './ContactList.scss';
import ContactListPagination from './ContactListPagination';
import { useContacts } from '../../hooks/useContacts';
import ContactFormContainer from '../contact-forms/ContactFormContainer';
import Modal from '../modal/Modal';
import ContactFormsProvider from '../providers/ContactFormsProvider';
import ContactListViewSelector from './ContactListViewSelector';
import { useState, useReducer } from 'react';
import {
    FILTERS_INITIAL_STATE,
    filtersReducer
} from '../../reducers/filtersReducer';
import { reset } from '../../actions/filtersAction';

const ContactList = () => {
    const [showRowsFormat, setShowRowsFormat] = useState(true);
    const [filters, dispatchFilters] = useReducer(
        filtersReducer,
        FILTERS_INITIAL_STATE
    );
    const { contacts, totalContacts, contactHasError, contactIsLoading } =
        useContacts(filters);
    return (
        <div className='ContactList'>
            <div className='ContactList-header'>
                <h1 className='ContactList-title'>
                    <UsersIcon className='ContactList-icon' />
                    <span>Contact List</span>
                </h1>
                <ContactListViewSelector
                    showRowsFormat={showRowsFormat}
                    setShowRowsFormat={setShowRowsFormat}
                />
            </div>
            <ContactFormsProvider resetFilters={() => dispatchFilters(reset())}>
                <ContactListFilters
                    search={filters.search}
                    onlyAvailable={filters.onlyAvailable}
                    sortBy={filters.sortBy}
                    dispatchFilters={dispatchFilters}
                />
                <Modal>
                    <ContactFormContainer />
                </Modal>

                <ContactListRows
                    contacts={contacts}
                    hasError={contactHasError}
                    isLoading={contactIsLoading}
                    showRowsFormat={showRowsFormat}
                />
            </ContactFormsProvider>

            <ContactListPagination
                page={filters.page}
                itemsPerPage={filters.itemsPerPage}
                dispatchFilters={dispatchFilters}
                totalContacts={totalContacts}
            />
        </div>
    );
};

export default ContactList;
