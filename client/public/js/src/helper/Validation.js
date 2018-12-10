
/**
 * @class Validation
 *
 * @description Validates Input fields
 */
class Validation {
  /**
      * @description -This method validates an email from the email field
      *
      * @param {string} fieldValue - The email recieved
      * @param {string} fieldName - The email recieved
      *
      * @returns {integer} - returns 1 on valid email or 0 otherwise
      *
      * @memberOf Validation class
      * @static
      */
  static isValid(fieldValue, fieldName) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^((?=.*[a-z])|(?=.*[A-Z]))((?=.*[0-9])|(?=.*[!@#\$%\^&\*]))(?=.{5,})/;
    const nameRegex = /^(?=.*[a-zA-Z]+$)(?=.{3,})/;
    let firstName, lastName;
    switch (fieldName) {
      case 'email':
        if (emailRegex.test(fieldValue)) return 1;
        return 0;
      case 'password':
        if (passwordRegex.test(fieldValue)) return 1;
        return 0;
      default:
        [firstName, ...lastName] = fieldValue.split(' ');
        if (nameRegex.test(firstName) && nameRegex.test(lastName.join(''))) return 1;
        return 0;
    }
  }

  /**
      * @description -This method validates an email from the email field
      *
      * @param {string} password - The original password value
      * @param {string} confirmPassword - The confirm password value
      *
      * @returns {integer} - returns 1 on valid email or 0 otherwise
      *
      * @memberOf Validation class
      * @static
      */
  static validateConfirmPassword(password, confirmPassword) {
    if (password !== confirmPassword) return 1;
    return 0;
  }
}

export default Validation;
