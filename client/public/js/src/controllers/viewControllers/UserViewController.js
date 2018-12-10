import Validation from '../../helper/Validation.js';
import RenderUi from '../../views/RenderUi.js';
import userAuthData from '../../models/userData.js';
import QuestionViewController from './QuestionViewController.js';
import ResourceHelper from '../../helper/ResourceHelper.js';

const { attachSwitchOffModalEvent, toggleAllByClassName, attachViewEvents } = QuestionViewController;
const { isValid, validateConfirmPassword } = Validation;
const {
  renderNotifications, renderNotification, renderNotificationInButton, renderModal, showErrors,
  toggleDiv, renderModalLoader, renderUserProfile, renderRecentQuestions,
  renderMostAnsweredQuestions, showErrorsOnProfileUpdateForm
} = RenderUi;
const { storeData, destroyData } = ResourceHelper;
/**
  * @class UserViewController
  *
  * @description this class manages events and views on the signup and login pages
  */
class UserViewController {
  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds users actions to datacenter;
    * @memberOf UserViewController
    */
  static connectSignUpUserOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      renderNotificationInButton('signupNotification', 'block', 'Signing up ...');
    }
    if (userAuthData.ready) renderNotificationInButton('signupNotification', 'block');
    if (userAuthData.ready && userAuthData.errors.length > 0) {
      showErrors();
    }
    if (userAuthData.data.loginStatus === 1) {
      storeData('token', userAuthData.data.token);
      storeData('loginStatus', 1);
      storeData('loginId', userAuthData.data.id);
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', userAuthData.data.message);
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
      window.location.hash = '';
      toggleDiv('loginLink');
      toggleDiv('signupLink');
      toggleDiv('profileLink', '');
      return window.location.reload();
    }
    if (userAuthData.fail && userAuthData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
  }

  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method binds users actions to datacenter;
    * @memberOf UserViewController
    */
  static connectloginUserOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      renderNotificationInButton('loginNotification', 'block', 'Logging in ...');
    }
    if (userAuthData.ready) renderNotificationInButton('loginNotification', 'block', '', 'Login');
    if (userAuthData.ready && userAuthData.errors.length > 0 && !userAuthData.fail) {
      console.log(userAuthData.errors);
      renderNotification('notificationDisplay', 'block', userAuthData.errors[0].message);
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
    }
    if (userAuthData.data.loginStatus === 1) {
      storeData('token', userAuthData.data.token);
      storeData('loginStatus', 1);
      storeData('loginId', userAuthData.data.id);
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', userAuthData.data.message);
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
      window.location.hash = '';
      toggleDiv('loginLink');
      toggleDiv('signupLink');
      toggleDiv('profileLink', '');
    }
    if (userAuthData.fail && userAuthData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
  }


  /**
    * @static
    *
    * @returns {object} - binds view to datacenter
    *
    * @description This method manipulates the views during profile fetch;
    * @memberOf UserViewController
    */
  static connectfetchUserProfileOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      renderModalLoader('modalDisplay', 'block', 'Loading Profile');
    }
    if (userAuthData.ready) renderModalLoader('modalDisplay', 'none', '');
    if (userAuthData.fail) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }

    if (userAuthData.ready && userAuthData.errors.length > 0 && !userAuthData.fail) {
      console.log(userAuthData.errors);
      if (userAuthData.errors[0].message.includes('Unauthorized')
      || userAuthData.errors[0].message.includes('signup')) {
        destroyData('token');
        destroyData('loginStatus');
        destroyData('loginId');
        userAuthData.data.loginStatus = 0;
        userAuthData.data.token = '';
        renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
        setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
        window.location.reload();
        window.location.hash = '#login';
        return;
      }
      if (userAuthData.data.profile.length > 0 && userAuthData.ready
        && userAuthData.errors[0].message.includes('found')
      ) {
        renderModalLoader('modalDisplay', 'none', '');
        renderUserProfile('profileDisplay', 'block', userAuthData.data.profile);
        QuestionViewController.attachrefreshEvent('refresh');
        QuestionViewController.attachrefreshEvent('refreshTwo');
      }

      if (userAuthData.data.profile.length === 0 && userAuthData.ready
      ) {
        renderModalLoader('modalDisplay', 'none', '');
        QuestionViewController.attachrefreshEvent('refresh');
        QuestionViewController.attachrefreshEvent('refreshTwo');
      }
    }


    if (userAuthData.ready && userAuthData.data.questions.length > 0 && userAuthData.data.profile.length > 0) {
      renderModalLoader('modalDisplay', 'none', '');
      renderUserProfile('profileDisplay', 'block', userAuthData.data.profile);
      renderMostAnsweredQuestions('mostAnsweredQuestionsDisplay', 'block',
        userAuthData.data.questions);
      renderRecentQuestions('recentQuestionsDisplay', 'block', userAuthData.data.questions);
      attachViewEvents('viewButton');
      toggleAllByClassName('load');
      QuestionViewController.attachrefreshEvent('refresh');
      QuestionViewController.attachrefreshEvent('refreshTwo');
    }
  }

  /**
    * @static
    *
    * @returns {object} - binds update profile views to datacenter
    *
    * @description This method binds update profile actions to datacenter;
    * @memberOf QuestionViewController
    */
  static connectUpdateUserProfileOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      console.log('I am here');
      renderNotificationInButton('updateProfileButton', 'block', 'Saving...', '');
    }
    if (userAuthData.ready) renderNotificationInButton('updateProfileButton', 'block', '', 'Update');
    if (userAuthData.ready && userAuthData.errors.length > 0 && !userAuthData.fail) {
      if (userAuthData.errors[0].message.includes('Unauthorized')
          || userAuthData.errors[0].message.includes('signup')) {
        destroyData('token');
        destroyData('loginStatus');
        destroyData('loginId');
        userAuthData.data.loginStatus = 0;
        userAuthData.data.token = '';
        renderNotification('notificationDisplay', 'block', 'Your session has expired, Please login');
        setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
        window.location.reload();
        window.location.hash = '#login';
        return;
      }
      showErrorsOnProfileUpdateForm();
    }
    if (userAuthData.data.updateStatus === 1) {
      userAuthData.data.token = '';
      renderNotification('notificationDisplay', 'block', 'Profile update was successful');
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 3500);
      window.location.reload();
    }
    if (userAuthData.fail && userAuthData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
  }

  /**
    * @static
    *
    * @returns {object} - binds update profile views to datacenter
    *
    * @description This method binds update profile actions to datacenter;
    * @memberOf QuestionViewController
    */
  static connectUpdateProfilePhotoOperationToDataCenter() {
    if (!userAuthData.ready && userAuthData.fetch) {
      console.log('I am here');
      renderNotificationInButton('updateProfileButton', 'block', 'Uploading Photo...', '');
    }
    if (userAuthData.ready) renderNotificationInButton('updateProfileButton', 'block', '', 'Update');
    if (userAuthData.ready && userAuthData.errors.length > 0 && !userAuthData.fail) {
      renderNotification('notificationDisplay', 'block', 'Error Occurred uploading profile photo');
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 4000);
    }
    if (userAuthData.data.updatePhotoStatus === 1) {
      renderNotification('notificationDisplay', 'block', 'Photo update was successful');
      setTimeout(() => renderNotification('notificationDisplay', 'none'), 3500);
    }
    if (userAuthData.fail && userAuthData.ready) {
      renderModal('modalDisplay', 'block', 'Internet Connection Error!');
      QuestionViewController.attachSwitchOffModalEvent('shutDownButton', 'modalDisplay');
    }
  }

  /**
  * @static
  *
  * @returns {object} - binds view to datacenter
  *
  * @description This method validates the signup page;
  * @memberOf UserViewController
  */
  static validateSignup() {
    const email = document.getElementById('email');
    const fullName = document.getElementById('fullName');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    email.addEventListener('keyup', () => UserViewController.validateField(email.value, 'email'));
    fullName.addEventListener('keyup', () => UserViewController.validateField(fullName.value, 'fullName'));
    password.addEventListener('keyup', () => UserViewController.validateField(password.value, 'password'));
    confirmPassword.addEventListener('keyup', () => {
      const elementId = 'confirmPasswordNotificationError';
      const indicator = 'goodConfirmPassword';
      const message = '* Password does not match';
      const fieldName = 'confirmPassword';
      if (validateConfirmPassword(password.value, confirmPassword.value) || !password.value) {
        renderNotifications(fieldName, elementId, message, indicator, 'none');
      } else { renderNotifications(fieldName, elementId, '', indicator, 'inline', '90%'); }
    });
  }

  /**
  * @static
  *
  * @param {string} fieldValue - the value of the field
  * @param {string} fieldName - The name of the field under validation
  * @returns {object} - ,manages views on validation
  *
  * @description This method validates each field on the signup page and renders notification to user;
  * @memberOf UserViewController
  */
  static validateField(fieldValue, fieldName) {
    let elementId, indicator, message = '';
    if (fieldName === 'fullName') {
      elementId = 'nameNotificationError'; indicator = 'goodFullName';
      message = '* Enter Full Name in this format <p>* [firstname lastname]  <= separated by space</p> ';
    }
    if (fieldName === 'email') {
      elementId = 'emailNotificationError'; indicator = 'goodEmail';
      message = '* Enter a valid email';
    }
    if (fieldName === 'password') {
      elementId = 'passwordNotificationError'; indicator = 'goodPassword';
      message = '* Password must be at least 5 characters and must contain a number or special characters like ^%$&#';
    }
    if (!isValid(fieldValue, fieldName)) renderNotifications(fieldName, elementId, message, indicator, 'none');
    else renderNotifications(fieldName, elementId, '', indicator, 'inline', '90%');
  }

  /**
  * @static
  *
  * @param {string} message
  * @returns {object} - binds view to datacenter
  *
  * @description This method demands login action from the user;
  * @memberOf UserViewController
  */
  static loginOnDemand(message) {
    renderModal('modalDisplay', 'block', `Please Login to post ${message}`);
    UserViewController.attachRedirectToLoginModalEvent('shutDownButton', 'modalDisplay');
  }


  /**
    * @static
    *
    * @param {string} elementId - the id of the element
    * @param {string} targetId - the id of the target element
    * @returns {object} - binds view to datacenter
    *
    * @description This method redirects the user to login page;
    * @memberOf UserViewController
    */
  static attachRedirectToLoginModalEvent(elementId, targetId) {
    const targetDiv = document.getElementById(elementId);
    if (targetDiv) {
      targetDiv.addEventListener('click', () => {
        renderModal(targetId, 'none');
        window.location.hash = '#login';
        return null;
      });
    }
  }
}
export default UserViewController;
