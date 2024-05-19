export function validatePhone(phone){
    return String(phone)
        .toLowerCase()
        .match(
            /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/
        );
}