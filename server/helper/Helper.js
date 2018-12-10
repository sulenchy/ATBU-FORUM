/**
  * @class Helper
  *
  * @description Validates input fields
  */
class Helper {
  /**
        * @static
        *
        * @param {string} fieldName - The field name to be validated
        * @param {string} fieldValue - The field value to be validated
        * @param {object} res - The response payload sent back from the middleware
        * @param {callback} next - The call back function to resume the next middleware
        *
        * @returns {object} - status message and response
        *
        * @description This method validates the field.
        * @memberOf Helper
        */
  static validateField(fieldName, fieldValue, res, next) {
    if (!fieldValue || !/.*\S.*./.test(fieldValue.toString())) {
      return res.status(400).json({
        status: 'fail',
        message: `${fieldName} cant be empty or invalid`
      });
    }
    if (fieldValue.toString().length < 3) {
      return res.status(422).json({
        status: 'fail',
        message: `${fieldName} cant be too short`
      });
    }
    if (/^\d+$/.test(fieldValue.toString()) || fieldValue.toString().includes('$$$')
        || fieldValue.toString().includes('%%') || fieldValue.toString().includes('///')
         || fieldValue.toString().includes('&&&') || fieldValue.toString().includes('%^&/@')
        || fieldValue.toString().includes('##') || fieldValue.toString().includes('   ')) {
      return res.status(400).json({
        status: 'fail',
        message: `${fieldName} contains invalid syntax or spaces`
      });
    }
    return next();
  }
}

export default Helper;
