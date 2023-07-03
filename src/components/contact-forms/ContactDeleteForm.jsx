import Button from '../buttons/Button';
import './ContactDeleteForm.scss';
import { useState, useContext } from 'react';
import { deleteByContact } from '../../services/contactsApi';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';

const ContactDeleteForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        setCloseForm,
        currentContact: contact,
        onSuccess
    } = useContext(ContactFormsContext);
    return (
        <form
            className='Form'
            onSubmit={ev =>
                handleSubmit(ev, contact.id, setIsSubmitting, onSuccess)
            }
        >
            <p className='Form-question'>
                Are you sure you want to delete the user {'"'}
                {contact.name}
                {'"'}?
            </p>
            <div className='Form-buttons'>
                <Button
                    type='submit'
                    title='Edit Contact'
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'loading' : 'Delete'}
                </Button>
                <Button
                    kind='secondary'
                    title='Cancel'
                    disabled={isSubmitting}
                    onClick={setCloseForm}
                >
                    {isSubmitting ? 'loading' : 'Cancel'}
                </Button>
            </div>
        </form>
    );
};

const handleSubmit = async (ev, contactId, setIsSubmitting, onSuccess) => {
    ev.preventDefault();
    setIsSubmitting(true);
    const success = await deleteByContact(contactId);
    if (success) {
        onSuccess();
    } else {
        setIsSubmitting(false);
    }
};

export default ContactDeleteForm;
