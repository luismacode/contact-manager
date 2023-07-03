import { useState } from 'react';
import { CONTACT_FORMS } from '../constants/contactForms';

export const useSelectedForm = () => {
    const [currentForm, setCurrentForm] = useState({
        form: CONTACT_FORMS.CLOSED
    });
    const setCloseForm = () => setCurrentForm({ form: CONTACT_FORMS.CLOSED });
    const setCreateForm = () => setCurrentForm({ form: CONTACT_FORMS.CREATE });
    const setEditForm = contact =>
        setCurrentForm({ form: CONTACT_FORMS.EDIT, contact });
    const setDeleteForm = contact =>
        setCurrentForm({ form: CONTACT_FORMS.DELETE, contact });

    return {
        currentForm: currentForm.form,
        currentContact: currentForm.contact,
        setCloseForm,
        setCreateForm,
        setEditForm,
        setDeleteForm
    };
};
