import userAuthData from '../../models/userData.js';
import UserViewController from '../viewControllers/UserViewController.js';
import ResourceHelper from '../../helper/ResourceHelper.js';

const {
  storeData, encrypt, decrypt, destroyData
} = ResourceHelper;
const {
  connectSignUpUserOperationToDataCenter,
  connectloginUserOperationToDataCenter,
  connectfetchUserProfileOperationToDataCenter,
  connectUpdateUserProfileOperationToDataCenter,
  connectUpdateProfilePhotoOperationToDataCenter
} = UserViewController;
/**
  * @class UserViewController
  *
  * @description this class manages fetch operations concerning the user
  */
class UserApiController {
  /**
    * @static
    *
    *@param {string} firstName - the first name of the user
    *@param {string} lastName - the last name of the user
    *@param {string} email - the email of the user
    *@param {string} password - the password of the user
    *@param {string} confirmPassword - the password of the user
    * @returns {object} - signups user
    *
    * @description This method signs up in the application
    * @memberOf UserApiController
    */
  static signUpUser(firstName, lastName, email, password, confirmPassword) {
    userAuthData.errors.length = 0;
    userAuthData.data.loginStatus = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectSignUpUserOperationToDataCenter();
    window.fetch('https://atbu-forum.herokuapp.com/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          userAuthData.data.loginStatus = 1;
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.message = data.message;
          userAuthData.data.token = encrypt('blowfish.io', data.data.token);
          userAuthData.data.id = data.data.id;
          connectSignUpUserOperationToDataCenter();
        } else {
          userAuthData.errors.push(data);
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          connectSignUpUserOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectSignUpUserOperationToDataCenter();
      });
  }

  /**
    * @static
    *
    * @param {string} email - the email of the user
    * @param {string} password - the password of the user
    *
    * @returns {object} - logins user
    *
    * @description This method signs up in the application
    * @memberOf UserApiController
    */
  static loginUser(email, password) {
    userAuthData.errors.length = 0;
    userAuthData.data.loginStatus = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectloginUserOperationToDataCenter();
    window.fetch('https://atbu-forum.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify({
        email,
        password
      })
    }).then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          userAuthData.data.loginStatus = 1;
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.message = data.message;
          userAuthData.data.token = encrypt('blowfish.io', data.data.token);
          userAuthData.data.id = data.data.id;
          connectloginUserOperationToDataCenter();
        } else {
          userAuthData.errors.push(data);
          console.log(userAuthData);
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          connectloginUserOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectloginUserOperationToDataCenter();
      });
  }

  /**
    * @static
    *
    *
    * @returns {object} - fetches user profile.
    *
    * @description This method fetches user profile
    * @memberOf UserApiController
    */
  static fetchUserProfile() {
    userAuthData.errors.length = 0;
    userAuthData.data.profile.length = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectfetchUserProfileOperationToDataCenter();
    window.fetch('https://atbu-forum.herokuapp.com/api/v1/users/profile', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)
      }
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.profile.push(data.data.users);
          console.log(userAuthData);
          return UserApiController.fetchUserQuestions();
        }
        userAuthData.errors.push(data);
        console.log(userAuthData);
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectfetchUserProfileOperationToDataCenter();
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectfetchUserProfileOperationToDataCenter();
      });
  }


  /**
    * @static
    *
    * @param {string} email - the email of the user
    * @param {string} password - the password of the user
    *
    * @returns {object} - logins user
    *
    * @description This method signs up in the application
    * @memberOf UserApiController
    */
  static fetchUserQuestions() {
    userAuthData.errors.length = 0;
    userAuthData.data.questions.length = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectfetchUserProfileOperationToDataCenter();
    window.fetch('https://atbu-forum.herokuapp.com/api/v1/users/questions', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)

      }
    }).then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 'success') {
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.questions = data.data.questions;
          console.log(userAuthData);
          connectfetchUserProfileOperationToDataCenter();
        } else {
          userAuthData.errors.push(data);
          console.log(userAuthData);
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          connectfetchUserProfileOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectfetchUserProfileOperationToDataCenter();
      });
  }

  /**
    * @static
    *
    * @param {string} photoUrl - The url of the photo that is stored on the cloud
    * @param {string} company - The new company value to be update
    * @param {string} jobRole - The new job role to be update.
    *
    * @returns {object} - updates data center
    *
    * @description This method binds the update user profile.
    * @memberOf UserApiController
    */
  static updateUserProfile(photoUrl, company, jobRole) {
    userAuthData.errors.length = 0;
    userAuthData.data.updateStatus = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectUpdateUserProfileOperationToDataCenter();
    window.fetch('https://atbu-forum.herokuapp.com/api/v1/users', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        authorization: decrypt('blowfish.io', userAuthData.data.token)
      },
      body: JSON.stringify({
        jobRole,
        company,
        photo: photoUrl
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          userAuthData.data.updateStatus = 1;
          userAuthData.errors.length = 0;
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          userAuthData.data.message = data.message;
          connectUpdateUserProfileOperationToDataCenter();
        } else {
          userAuthData.errors.push(data);
          console.log(userAuthData);
          userAuthData.ready = 1;
          userAuthData.fetch = 0;
          connectUpdateUserProfileOperationToDataCenter();
        }
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectUpdateUserProfileOperationToDataCenter();
      });
  }

  /**
    * @static
    *
    * @param {string} photoUrl - The generated url/file of the photo
    * @param {string} company - The new company value to be updated
    * @param {string} jobRole - The new job role to be updated.
    *
    * @returns {object} - updates data center
    *
    * @description This method uploads photo to the cloud
    * @memberOf UserApiController
    */
  static updatePhotoToCloud(photoUrl, company, jobRole) {
    userAuthData.errors.length = 0;
    userAuthData.data.updateStatus = 0;
    userAuthData.data.updatePhotoStatus = 0;
    userAuthData.ready = 0;
    userAuthData.fail = 0;
    userAuthData.fetch = 1;
    connectUpdateProfilePhotoOperationToDataCenter();
    window.fetch('http://api.cloudinary.com/v1_1/shttps://atbu-forum.herokuapp.com/image/upload', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        file: photoUrl,
        upload_preset: 'veralqd6'
      })
    }).then(response => response.json())
      .then((data) => {
        if (data.url) {
          console.log(data);
          userAuthData.data.updatePhotoStatus = 1;
          userAuthData.data.photo = data.secure_url;
          userAuthData.errors.length = 0;
          userAuthData.ready = 0;
          userAuthData.fetch = 0;
          userAuthData.data.message = data.message;
          return UserApiController.updateUserProfile(data.secure_url, company, jobRole);
        }
        userAuthData.errors.push(data);
        console.log(userAuthData);
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectUpdateProfilePhotoOperationToDataCenter();
      })
      .catch((error) => {
        console.log(`${error}`);
        userAuthData.errors.push(error);
        userAuthData.fail = 1;
        userAuthData.ready = 1;
        userAuthData.fetch = 0;
        connectUpdateProfilePhotoOperationToDataCenter();
      });
  }
}

export default UserApiController;
