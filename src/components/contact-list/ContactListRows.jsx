import './ContactListRows.scss';
import ContactRow from './ContactRow';
import ContactCard from './ContactCard';
import UpdateIcon from '../icons/UpdateIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';
const ContactListRows = ({ contacts, hasError, isLoading, showRowsFormat }) => {
    if (hasError)
        return (
            <p className='ContactListAlert'>
                <span className='ContactListAlert-error'>
                    <CrossCircleIcon className='ContactListAlert-icon' /> Oops,
                    something went wrong
                </span>
            </p>
        );
    if (isLoading)
        return (
            <p className='ContactListAlert'>
                <span className='ContactListAlert-loading'>
                    <UpdateIcon className='ContactListAlert-icon ContactListAlert-icon--animate' />
                    Loading
                </span>
            </p>
        );
    if (!contacts.length)
        return (
            <p className='ContactListAlert'>
                <span className='ContactListAlert-empty'>
                    No contacts have been loaded
                </span>
            </p>
        );
    const ContactComponent = showRowsFormat ? ContactRow : ContactCard;
    return (
        <div className='ContactListRows'>
            {contacts.map(contact => (
                <ContactComponent key={contact.id} {...contact} />
            ))}
        </div>
    );
};

export default ContactListRows;
