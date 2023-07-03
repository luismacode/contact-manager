import { CONTACT_ROLES } from '../../constants/contactRoles';
import './ContactRole.scss';
const ROLE_STYLES = {
    [CONTACT_ROLES.CUSTOMER]: ['Customer', 'Role-customer'],
    [CONTACT_ROLES.SPONSOR]: ['Sponsor', 'Role-sponsor'],
    [CONTACT_ROLES.SUPPLIER]: ['Supplier', 'Role-supplier'],
    [CONTACT_ROLES.OTHER]: ['Other', 'Role-other']
};
const ContactRole = ({ role }) => {
    const [roleName, roleClassName] = ROLE_STYLES[role] || ROLE_STYLES.other;
    return <span className={`Role ${roleClassName}`}>{roleName}</span>;
};

export default ContactRole;
