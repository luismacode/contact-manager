import CheckCircleIcon from '../icons/CheckCircleIcon';
import CrossCircleIcon from '../icons/CrossCircleIcon';
import UpdateIcon from '../icons/UpdateIcon';
import './InputTextAsync.scss';
const InputTextAsync = ({
    className,
    isLoading,
    isSuccess,
    label,
    error,
    ...props
}) => {
    const icon = getIcon(isLoading, isSuccess, error);
    return (
        <div className={`InputText ${className || ''}`}>
            <label htmlFor='inputAsync' className='InputText-label'>
                {label}
            </label>
            <input
                {...props}
                className={`InputText-field ${
                    error ? 'InputText-field--borderError' : ''
                }`}
                type='text'
                id='inputAsync'
            />
            {icon}
            {error && <span className='InputText-error'>{error}</span>}
        </div>
    );
};

const getIcon = (isLoading, isSuccess, error) => {
    if (isLoading)
        return <UpdateIcon className='InputText-icon isLoadingIcon' />;
    if (isSuccess)
        return <CheckCircleIcon className='InputText-icon isSuccessIcon' />;
    if (error) return <CrossCircleIcon className='InputText-icon errorIcon' />;

    return null;
};
export default InputTextAsync;
