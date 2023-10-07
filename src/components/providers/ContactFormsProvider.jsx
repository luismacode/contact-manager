import { ContactFormsContext } from '../../Contexts/ContactFormsContext';
import { useSelectedForm } from '../../hooks/useSelectedForm';
const ContactFormsProvider = ({ resetFilters, children }) => {
    const { setCloseForm, ...restSelectedForm } = useSelectedForm();
    const onSuccess = () => {
        resetFilters();
        setCloseForm();
    };
    return (
        <ContactFormsContext.Provider
            value={{
                setCloseForm,
                onSuccess,
                ...restSelectedForm
            }}
        >
            {children}
        </ContactFormsContext.Provider>
    );
};

export default ContactFormsProvider;
