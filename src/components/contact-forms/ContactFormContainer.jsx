import { useContext } from 'react';
import IconButton from '../buttons/IconButton';
import CrossIcon from '../icons/CrossIcon';
import './ContactFormContainer.scss';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';
import { CONTACT_FORMS } from '../../constants/contactForms';
import ContactCreationForm from './ContactCreationForm';
import ContactEditingForm from './ContactEditingForm';
import ContactDeleteForm from './ContactDeleteForm';

const FORMS = {
    [CONTACT_FORMS.CREATE]: (
        <>
            <h2>Create Contact</h2>
            <ContactCreationForm />
        </>
    ),
    [CONTACT_FORMS.EDIT]: (
        <>
            <h2>Edit Contact</h2>
            <ContactEditingForm />
        </>
    ),
    [CONTACT_FORMS.DELETE]: (
        <>
            <h2>Delete Contact</h2>
            <ContactDeleteForm />
        </>
    )
};
const ContactFormContainer = () => {
    const { currentForm, setCloseForm } = useContext(ContactFormsContext);
    const form = FORMS[currentForm];
    return (
        <div className='FormContainer'>
            <IconButton
                className='FormContainer-close'
                icon={CrossIcon}
                filled
                onClick={setCloseForm}
                title='close contact creation Form'
            />
            {form}
        </div>
    );
};
export default ContactFormContainer;
