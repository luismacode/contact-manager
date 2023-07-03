import { CONTACT_ROLES } from '../../constants/contactRoles';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import './ContactCreationForm.scss';
import { useCreateForm } from '../../hooks/useCreateForm';
import { useState, useContext } from 'react';
import { createContact } from '../../services/contactsApi';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';

const ContactCreationForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { onSuccess } = useContext(ContactFormsContext);
    const { name, email, phone, setName, setEmail, setPhone, isFormInvalid } =
        useCreateForm();
    return (
        <form
            className='Form'
            onSubmit={ev =>
                handleSubmit(ev, name, email, phone, setIsSubmitting, onSuccess)
            }
        >
            <InputText
                label='fullname'
                placeholder='John Doe'
                title='type your fullname'
                value={name.value}
                error={name.error}
                onChange={e => setName(e.target.value)}
                className='Form-input'
            />
            <InputTextAsync
                label='email'
                placeholder='example@example.com'
                title='type your email'
                value={email.value}
                error={email.error}
                isSuccess={email.value && !email.loading && !email.error}
                isLoading={email.loading}
                onChange={e => setEmail(e.target.value)}
                className='Form-input'
            />
            <InputTextAsync
                label='phone'
                placeholder='+51 xxx xxx xxx'
                title='type your phone number'
                value={phone.value}
                error={phone.error}
                isSuccess={phone.value && !phone.loading && !phone.error}
                isLoading={phone.loading}
                onChange={e => setPhone(e.target.value)}
                className='Form-input'
            />
            <div className='Form-row'>
                <Select title='Select Role' name='role' className='Form-select'>
                    <option value={CONTACT_ROLES.CUSTOMER}>customer</option>
                    <option value={CONTACT_ROLES.SPONSOR}>sponsor</option>
                    <option value={CONTACT_ROLES.SUPPLIER}>supplier</option>
                    <option value={CONTACT_ROLES.OTHER}>other</option>
                </Select>
                <div className='Form-status'>
                    <InputCheckbox title='Set Available' name='available' />
                    <span>Available?</span>
                </div>
                <Button
                    type='submit'
                    title='Create Contact'
                    disabled={isFormInvalid || isSubmitting}
                    className='Form-button'
                >
                    {isSubmitting ? 'loading' : 'Create Contact'}
                </Button>
            </div>
        </form>
    );
};

const handleSubmit = async (
    ev,
    name,
    email,
    phone,
    setIsSubmitting,
    onSuccess
) => {
    ev.preventDefault();
    const contact = {
        id: crypto.randomUUID(),
        name: name.value,
        isAvailable: ev.target.available.checked,
        role: ev.target.role.value,
        email: email.value,
        phone: phone.value
    };
    setIsSubmitting(true);
    const success = await createContact(contact);
    if (success) {
        onSuccess();
    } else {
        setIsSubmitting(false);
    }
};

export default ContactCreationForm;
