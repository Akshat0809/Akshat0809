module.exports = function makeCustomfieldUseCase({
    
}){
    return async function Createcustomfield(obj) {
        console.info(`Inside custom field use-case`,obj['Product Name'])

        const customFields = Object.entries(obj)
        .filter(([key, value]) => key.startsWith('Attribute_') && value !== '')
        .map(([key, value]) => ({ name: key, value: value.toString() }));

return customFields;
}
}