import { useContext } from 'react';
import IconButton from '../buttons/IconButton';
import ContactRole from '../contact/ContactRole';
import ContactStatus from '../contact/ContactStatus';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import './ContactRow.scss';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';

const ContactRow = ({ id, name, isAvailable, role, email, phone }) => {
    const { setEditForm, setDeleteForm } = useContext(ContactFormsContext);
    return (
        <div className='ContactRow'>
            <div className='ContactRow-name'>
                <span>{name}</span>
            </div>
            <div className='ContactRow-status'>
                <ContactStatus isAvailable={isAvailable} />
            </div>
            <div className='ContactRow-role'>
                <ContactRole role={role} />
            </div>
            <div className='ContactRow-email'>
                <span>{email}</span>
            </div>
            <div className='ContactRow-phone'>
                <p>
                    {`( ${phone.substring(0, 3)} )`}
                    {phone.substring(4)}
                </p>
            </div>
            <div className='ContactRow-action'>
                <IconButton
                    icon={PencilIcon}
                    color='purple'
                    filled
                    title='Edit Contact'
                    onClick={() =>
                        setEditForm({
                            id,
                            name,
                            isAvailable,
                            role,
                            email,
                            phone
                        })
                    }
                />
                <IconButton
                    icon={TrashIcon}
                    color='red'
                    filled
                    title='Delete Contact'
                    onClick={() => setDeleteForm({ id, name })}
                />
            </div>
        </div>
    );
};

export default ContactRow;
