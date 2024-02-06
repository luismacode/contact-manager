import { CONTACT_ROLES } from '../../constants/contactRoles';
import Button from '../buttons/Button';
import InputCheckbox from '../forms/InputCheckbox';
import InputText from '../forms/InputText';
import InputTextAsync from '../forms/InputTextAsync';
import Select from '../forms/Select';
import './ContactEditingForm.scss';
import { useEditForm } from '../../hooks/useEditForm';
import { useState, useContext } from 'react';
import { updateContact } from '../../services/contactsApi';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';
import {
    availableChanged,
    emailChanged,
    nameChanged,
    phoneChanged,
    roleChanged
} from '../../actions/editFormAction';

const ContactEditingForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { currentContact, onSuccess } = useContext(ContactFormsContext);
    const {
        name,
        email,
        phone,
        role,
        isAvailable,
        dispatchFormData,
        isFormInvalid
    } = useEditForm(currentContact);
    return (
        <form
            className='Form'
            onSubmit={e =>
                handleSubmit(
                    e,
                    {
                        id: currentContact.id,
                        name: name.value,
                        email: email.value,
                        phone: phone.value,
                        role,
                        isAvailable
                    },
                    setIsSubmitting,
                    onSuccess
                )
            }
        >
            <InputText
                label='fullname'
                placeholder='John Doe'
                title='type your fullname'
                value={name.value}
                error={name.error}
                onChange={e => dispatchFormData(nameChanged(e.target.value))}
                className='Form-input'
            />
            <InputTextAsync
                label='email'
                placeholder='example@example.com'
                title='type your email'
                value={email.value}
                error={email.error}
                isSuccess={
                    email.value !== currentContact.email &&
                    !email.loading &&
                    !email.error
                }
                isLoading={email.loading}
                onChange={e =>
                    dispatchFormData(
                        emailChanged(e.target.value, currentContact.email)
                    )
                }
                className='Form-input'
            />
            <InputTextAsync
                label='phone'
                placeholder='+51 xxx xxx xxx'
                title='type your phone number'
                value={phone.value}
                error={phone.error}
                isSuccess={
                    phone.value !== currentContact.phone &&
                    !phone.loading &&
                    !phone.error
                }
                isLoading={phone.loading}
                onChange={e =>
                    dispatchFormData(
                        phoneChanged(e.target.value, currentContact.phone)
                    )
                }
                className='Form-input'
            />
            <div className='Form-row'>
                <Select
                    title='Select Role'
                    value={role}
                    onChange={e =>
                        dispatchFormData(roleChanged(e.target.value))
                    }
                    className='Form-select'
                >
                    <option value={CONTACT_ROLES.CUSTOMER}>customer</option>
                    <option value={CONTACT_ROLES.SPONSOR}>sponsor</option>
                    <option value={CONTACT_ROLES.SUPPLIER}>supplier</option>
                    <option value={CONTACT_ROLES.OTHER}>other</option>
                </Select>
                <div className='Form-status'>
                    <InputCheckbox
                        title='Set Available'
                        checked={isAvailable}
                        onChange={e =>
                            dispatchFormData(availableChanged(e.target.checked))
                        }
                    />
                    <span>Available?</span>
                </div>
                <Button
                    type='submit'
                    title='Edit Contact'
                    disabled={isFormInvalid || isSubmitting}
                >
                    {isSubmitting ? 'loading' : 'Edit Contact'}
                </Button>
            </div>
        </form>
    );
};

const handleSubmit = async (e, contact, setIsSubmitting, onSuccess) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = await updateContact(contact);
    if (success) {
        onSuccess();
    } else {
        setIsSubmitting(false);
    }
};

export default ContactEditingForm;
