import CheckIcon from '../icons/checkIcon';
import './InputCheckbox.scss';
const InputCheckbox = ({ className, ...props }) => (
    <label className={`InputCheckbox ${className || ''}`}>
        <input {...props} className='InputCheckbox-field' type='checkbox' />
        <span className='InputCheckbox-icon'>
            <CheckIcon />
        </span>
    </label>
);
export default InputCheckbox;
