const validTextRegex = /^([a-zA-Z0-9 _-]+)$/;
const validPriceRegex = /^[1-9]\d*$/
const validImageRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/

const validateFormData = (name, value, errors) => {
    switch (name) {
        case 'name':
            if (value.length === 0) {
                errors.name = "Please provide product name!"
            } else if (!validTextRegex.test(value)) {
                errors.name = 'Product name is not valid!';
            }
            break;
        case 'description':
            if (value.length === 0) {
                errors.description = "Please provide product description!"
            } 
            break;
        case 'price':
            if (value.length === 0 || value === 0) {
                errors.price = "Please provide valid price"
            } else if (!validPriceRegex.test(value)) {
                errors.price = 'Price is not valid!';
            }
            break;
        case 'productImg':
            if (value.length === 0) {
                errors.productImg = "Please provide URL of product image !"
            } else if (!validImageRegex.test(value)) {
                errors.productImg = 'Product URL is not valid!';
            }
            break;
        default:
            break;
    }
    return errors
}

export const validateData = (data) => {
    let errors = {};
    for (const [key, value] of Object.entries(data)) {
        const formError = validateFormData(key, value, errors)
        errors = { ...errors, ...formError }
    }
    return errors
}