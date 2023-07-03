import './InputText.scss';
const InputText = ({ label, error, ...props }) => (
    <div className='InputText'>
        <label htmlFor='inputText' className='InputText-label'>
            {label}
        </label>
        <input
            {...props}
            className={`InputText-field ${
                error ? 'InputText--borderError' : ''
            }`}
            type='text'
            id='inputText'
        />
        {error && <span className='InputText-error'>{error}</span>}
    </div>
);

export default InputText;
