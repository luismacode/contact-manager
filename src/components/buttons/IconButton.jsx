import './IconButton.scss';
const CLASSNAMES = {
    darkGray: {
        normal: 'IconButton--darkGray',
        filled: 'IconButton--darkGrayFilled'
    },
    purple: {
        normal: 'IconButton--purple',
        filled: 'IconButton--purpleFilled'
    },
    red: {
        normal: 'IconButton--red',
        filled: 'IconButton--redFilled'
    }
};

const IconButton = ({
    color = 'darkGray',
    filled,
    icon: Icon,
    className,
    ...props
}) => {
    const classNames = CLASSNAMES[color];
    const kind = filled ? 'filled' : 'normal';
    const colorClassName = classNames[kind];
    return (
        <button
            type='button'
            className={`IconButton ${colorClassName} ${className || ''}`}
            {...props}
        >
            <Icon className='IconButton-icon' />
        </button>
    );
};

export default IconButton;
