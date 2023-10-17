export const generateUserErrorInfo = (user) =>{
    return `
    One or more properties are invalid or not complete.
    List of properties:
    * first_name: Needs to be a String and ${user.first_name} was received.
    * last_name: Needs to be a String and ${user.last_name} was received.
    * email: Needs to be a String and ${user.email} was received.
    `
}