import SearchIcon from '../icons/SearchIcon';
import './InputSearch.scss';
const InputSearch = ({ className, ...props }) => (
    <div className={`InputSearch ${className || ''}`}>
        <SearchIcon className='InputSearch-icon' />
        <input {...props} className='InputSearch-field' type='text' />
    </div>
);

export default InputSearch;
