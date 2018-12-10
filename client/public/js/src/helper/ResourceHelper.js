/**
  * @class ResourceHelper
  *
  * @description this class helps with fetching resources from datacenter
  */
class ResourceHelper {
  /**
    * @static
    *
    * @param {string} dataResource - the resource
    * @param {string} resourceField - the attribute of the resource
    * @param {string} resourceId - The id of the resource
    * @param {string} neededData - The actual data needed
    * @returns {object} - binds view to datacenter
    *
    * @description This method checks for a question in history;
    * @memberOf ResourceHelper
    */
  static getInformationFromDataCenter(dataResource, resourceField, resourceId, neededData) {
    const result = dataResource.find(x => +x[resourceField] === +resourceId);
    return result[neededData];
  }

  /**
    * @static
    *
    * @param {string} key - the encryptionkey
    * @param {string} data - the data
    *
    * @returns {object} - encrypted data
    *
    * @description This mehthod encrypts data;
    * @memberOf ResourceHelper
    */
  static encrypt(key, data) {
    const newData = data.split('').reverse().join('') + key;
    return newData;
  }

  /**
    * @static
    *
    * @param {string} key - the encryptionkey
    * @param {string} data - the data
    *
    * @returns {object} - encrypted data
    *
    * @description This mehthod encrypts data;
    * @memberOf ResourceHelper
    */
  static decrypt(key, data) {
    const newData = data.substring(0, data.length - key.length).split('').reverse().join('');
    return newData;
  }

  /**
    * @static
    *
    * @param {string} dataSite - the site you want to store the token
    * @param {string} data - the data
    *
    * @returns {object} - encrypted data
    *
    * @description This mehthod stores token data on browser;
    * @memberOf ResourceHelper
    */
  static storeData(dataSite, data) {
    localStorage.setItem(dataSite, JSON.stringify(data));
  }

  /**
    * @static
    *
    * @param {string} dataSite - the site you want to retrieve the token
    * @param {string} data - the data
    *
    * @returns {object} - stores the data
    *
    * @description This mehthod encrypts data;
    * @memberOf ResourceHelper
    */
  static retrieveData(dataSite) {
    let data;
    const token = localStorage.getItem(dataSite);
    if (token) {
      data = JSON.parse(token);
      return data;
    }
    return '';
  }

  /**
    * @static
    *
    * @param {string} dataSite - the site where you store the data you want to destroy.
    * @param {string} data - the data
    *
    * @returns {object} - destroys the data
    *
    * @description This mehthod destroys token data
    * @memberOf ResourceHelper
    */
  static destroyData(dataSite) {
    const token = localStorage.getItem(dataSite);
    if (token) localStorage.removeItem(dataSite);
  }
}

export default ResourceHelper;
