import './ContactListRows.scss';
import ContactRow from './ContactRow';
import ContactCard from './ContactCard';
const ContactListRows = ({ contacts, hasError, isLoading, view }) => {
    if (hasError) return <p>Error loading contacts</p>;
    if (isLoading) return <span> Loading.....</span>;
    if (!contacts.length) return <span> Loading.....</span>;
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
