import './Button.scss';
const KIND_CLASSNAMES = {
    primary: 'Button--primary',
    secondary: 'Button--secondary'
};
const Button = ({ kind = 'primary', className, ...props }) => (
    <button
        type='button'
        className={`Button ${KIND_CLASSNAMES[kind]} ${className || ''}`}
        {...props}
    ></button>
);

export default Button;
