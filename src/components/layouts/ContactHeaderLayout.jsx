import './ContactHeaderLayout.scss';
import logo from '../../assets/logo.png';

const ContactHeaderLayout = () => (
    <header className='ContactHeader'>
        <div className='ContactHeader-logo'>
            <img src={logo} alt='logo contact manager' />
        </div>
    </header>
);

export default ContactHeaderLayout;
