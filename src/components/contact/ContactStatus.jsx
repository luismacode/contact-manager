import './ContactStatus.scss';
import CheckCircleIcon from '../icons/CheckCircleIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';
const ContactStatus = ({ isAvailable }) => {
    const activeClassName = isAvailable ? 'is-available' : 'is-unavailable';
    const Icon = isAvailable ? CheckCircleIcon : CrossCircleIcon;
    return (
        <div className={`ContactStatus ${activeClassName}`}>
            <Icon className='ContactStatus-icon' />
            <span>{isAvailable ? 'Available' : 'Unavailable'}</span>
        </div>
    );
};
export default ContactStatus;
