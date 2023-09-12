import { useContext } from 'react';
import IconButton from '../buttons/IconButton';
import ContactRole from '../contact/ContactRole';
import ContactStatus from '../contact/ContactStatus';
import PencilIcon from '../icons/PencilIcon';
import TrashIcon from '../icons/TrashIcon';
import './ContactCard.scss';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';

const ContactCard = ({ id, name, isAvailable, role, email, phone }) => {
    const { setEditForm, setDeleteForm } = useContext(ContactFormsContext);
    return (
        <div className='ContactCard'>
            <div className='ContactCard-inner'>
                <div className='ContactCard-flex'>
                    <div className='ContactCard-name'>
                        <span>{name}</span>
                    </div>
                    <div className='ContactCard-info'>
                        <div className='ContactCard-email'>
                            <span>{email}</span>
                        </div>
                        <div className='ContactCard-phone'>
                            <p>
                                {`( ${phone.substring(0, 3)} )`}
                                {phone.substring(4)}
                            </p>
                        </div>
                        <div className='ContactCard-status'>
                            <ContactStatus isAvailable={isAvailable} />
                        </div>
                    </div>
                </div>
                <div className='ContactCard-action'>
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
                <div className='ContactCard-role'>
                    <ContactRole role={role} />
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
