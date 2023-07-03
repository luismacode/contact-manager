import './Modal.scss';
import { CONTACT_FORMS } from '../../constants/contactForms';
import { useContext } from 'react';
import { ContactFormsContext } from '../../Contexts/ContactFormsContext';
const Modal = ({ children }) => {
    const { currentForm } = useContext(ContactFormsContext);
    if (currentForm === CONTACT_FORMS.CLOSED) return null;
    return <div className='Modal'>{children}</div>;
};
export default Modal;
