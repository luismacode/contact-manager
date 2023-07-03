import ContactRow from './ContactRow';

const ContactListRows = ({ contacts, hasError, isLoading }) => {
    if (hasError) return <p>Error loading contacts</p>;
    if (isLoading) return <span>contacts Loading.....</span>;
    if (!contacts.length)
        return <p className='ContactList-none'>No contacts </p>;

    return contacts.map(contact => (
        <ContactRow key={contact.id} {...contact} />
    ));
};

export default ContactListRows;
