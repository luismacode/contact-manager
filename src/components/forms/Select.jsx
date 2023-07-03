import ArrowDownIcon from '../icons/ArrowDownIcon';
import './Select.scss';

const Select = ({ className, ...props }) => (
    <div className={`Select ${className || ''}`}>
        <select {...props} className='Select-input'></select>
        <ArrowDownIcon className='Select-icon' />
    </div>
);

export default Select;
