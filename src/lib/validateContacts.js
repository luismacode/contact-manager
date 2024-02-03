const REGEX = {
    NAME: /^[a-z\s]+$/i,
    START_WITH_NUMBER: /^[0-9]/,
    EMAIL: /^[a-z0-9._]+@(gmail|hotmail|yahoo).com$/,
    START_PREFIX_VALID: /^(\+51)/,
    PHONE: /^\+51\s\d{3}\s\d{3}\s\d{3}$/
};

export const validateName = name => {
    if (!REGEX.NAME.test(name)) return 'Only minuscule or uppercase letters';
    if (name.includes('  ')) return `Cannot have space double`;
    if (name.length < 4 || name.length > 30) {
        return 'Length between 4 and 30 characters';
    }
};
export const validateEmail = email => {
    if (!REGEX.EMAIL.test(email)) return 'Email not valid';
    if (REGEX.START_WITH_NUMBER.test(email)) return 'Cannot start with numbers';
    if (email.length < 12 || email.length > 32) {
        return 'Length between 12 and 32 characters';
    }
};
export const validatePhone = phone => {
    if (!REGEX.START_PREFIX_VALID.test(phone))
        return 'phone number format start with (+51)';
    if (!REGEX.PHONE.test(phone)) return 'phone not valid';
    if (phone.length !== 15) {
        return 'Length not valid ';
    }
};
