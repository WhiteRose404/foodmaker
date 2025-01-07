export default function isValidInternationalPhone(phone: string) {
    const regex = /^\+?([0-9]{1,3})?[-. ]?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return regex.test(phone);
}