import './ContactListRows.scss';
import ContactRow from './ContactRow';
import ContactCard from './ContactCard';
import UpdateIcon from '../icons/UpdateIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';
const ContactListRows = ({ contacts, hasError, isLoading, view }) => {
    if (hasError)
        return (
            <p className='ContactListAlert'>
                <CrossCircleIcon className='ContactListAlert-icon' />
                Error loading contacts
            </p>
        );
    if (isLoading)
        return (
            <p className='ContactListAlert'>
                <UpdateIcon className='ContactListAlert-icon' /> Loading
            </p>
        );
    if (!contacts.length)
        return (
            <p className='ContactListAlert'>
                <UpdateIcon className='ContactListAlert-icon' />
                Loading
            </p>
        );
    const ContactComponent = view ? ContactRow : ContactCard;
    return (
        <div className='ContactListRows'>
            {contacts.map(contact => (
                <ContactComponent key={contact.id} {...contact} />
            ))}
        </div>
    );
};

export default ContactListRows;
