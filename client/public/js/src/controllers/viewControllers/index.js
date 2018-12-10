import QuestionViewController from './QuestionViewController.js';
import QuestionApiController from '../apiControllers/QuestionApiController.js';
import UserViewController from './UserViewController.js';
import UserApiController from '../apiControllers/UserApiController.js';
import questionData from '../../models/dataCenter.js';
import userAuthData from '../../models/userData.js';
import ResourceHelper from '../../helper/ResourceHelper.js';
import RenderUi from '../../views/RenderUi.js';


const { validateSignup, loginOnDemand, connectfetchUserProfileOperationToDataCenter } = UserViewController;
const {
  signUpUser, loginUser, fetchUserProfile, updateUserProfile, updatePhotoToCloud
} = UserApiController;
const {
  fetchQuestions, fetchSearchQuestions, fetchQuestion, postQuestion, postAnswer, updateAnswer, deleteQuestion,
  preferAnswer, upvoteAnswer, downvoteAnswer, fetchComment, postComment
} = QuestionApiController;
const {
  connectQuestionsDisplayToDataCenter, searchQuestionInHistory, renderQuestionInHistory,
  searchAnswerInHistory, renderAnswerInHistory
} = QuestionViewController;
const { retrieveData, destroyData } = ResourceHelper;
const {
  toggleDiv, renderNotification, renderNotificationInButton, togglePhoto, renderUpdateAnswerPopUp,
  renderDeleteQuestionPopUpModal
} = RenderUi;


const signupAction = () => {
  const signupButton = document.getElementById('signupButton');
  validateSignup();
  signupButton.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const [firstName, ...lastName] = fullName.split(' ');
    e.preventDefault();
    signUpUser(firstName, lastName.join(''), email, password, confirmPassword);
  });
};

const loginAction = () => {
  const loginButton = document.getElementById('loginButton');
  loginButton.addEventListener('click', (e) => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    e.preventDefault();
    loginUser(email, password);
  });
};

const askAction = () => {
  const askButton = document.getElementById('askButton');
  askButton.addEventListener('click', (e) => {
    e.preventDefault();
    const questionTitle = document.getElementById('questionTitle').value;
    const questionDescription = document.getElementById('questionDescription').value;

    if (!userAuthData.data.loginStatus) userAuthData.data.loginStatus = retrieveData('loginStatus');
    if (!userAuthData.data.loginStatus) {
      destroyData('loginStatus');
      return loginOnDemand('a question');
    }
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    postQuestion(questionTitle, questionDescription);
  });
};

const logoutAction = () => {
  const logoutButton = document.getElementById('logoutLink');
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    destroyData('loginStatus');
    destroyData('token');
    renderNotification('notificationDisplay', 'block', 'You have logged out');
    setTimeout(() => renderNotification('notificationDisplay', 'none'), 4500);
    window.location.reload();
    window.location.hash = '';
  });
};

const forceLogout = () => {
  if (!userAuthData.data.loginStatus) userAuthData.data.loginStatus = retrieveData('loginStatus');
  if (!userAuthData.data.loginStatus) {
    destroyData('loginStatus');
    window.location.reload();
    window.location.hash = '';
  }
};

const updateProfileAction = () => {
  const photo = document.getElementById('imageUpload');
  const imageHolder = document.getElementById('imageHolder');
  let photoUrl;
  try {
    photoUrl = window.URL.createObjectURL(photo.files[0]);
    imageHolder.src = photoUrl;
    imageHolder.onload = () => window.URL.revokeObjectURL(photo.files[0]);
    toggleDiv('imageHolder', 'block');
    toggleDiv('dummyImage');
  } catch (err) {
    if (userAuthData.data.profile[0].photo !== 'image-url') {
      toggleDiv('imageHolder', 'block');
      toggleDiv('dummyImage');
    } else {
      toggleDiv('dummyImage', 'block');
      toggleDiv('imageHolder');
      userAuthData.data.photo = 'image-url';
    }
  }
};

const uploadPhotoAction = () => {
  const photo = document.getElementById('imageUpload');
  photo.addEventListener('change', () => {
    const imageHolder = document.getElementById('imageHolder');
    const photoUrl = window.URL.createObjectURL(photo.files[0]);
    imageHolder.src = photoUrl;
    imageHolder.onload = () => window.URL.revokeObjectURL(photo.files[0]);
    const reader = new FileReader();
    reader.onload = (b) => {
      const newUrl = b.srcElement.result;
      userAuthData.data.photo = newUrl;
    };
    reader.readAsDataURL(photo.files[0]);
    toggleDiv('imageHolder', 'block');
    toggleDiv('dummyImage');
  });
};

const pageDisplay = document.getElementById('pageDisplay');
pageDisplay.addEventListener('click', (e) => {
  if (e.target.id === 'refresh') window.location.reload();
  if (e.target.id === 'answerButton') {
    const answer = document.getElementById('answer').value;
    e.preventDefault();
    if (!userAuthData.data.loginStatus) userAuthData.data.loginStatus = retrieveData('loginStatus');
    if (!userAuthData.data.loginStatus) {
      destroyData('loginStatus');
      return UserViewController.loginOnDemand('an answer');
    }
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    postAnswer(answer, +e.target.attributes[1].value);
  }
  if (e.target.innerText === 'Save') {
    const company = document.getElementById('companyEdit').value;
    const jobRole = document.getElementById('jobRoleEdit').value;
    const imageHolder = document.getElementById('imageHolder');
    updateProfileAction();

    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    if (userAuthData.data.photo === 'image-url') {
      updateUserProfile(userAuthData.data.photo, company, jobRole);
    } else if (imageHolder.src === userAuthData.data.profile[0].photo) {
      updateUserProfile(imageHolder.src, company, jobRole);
    } else {
      updatePhotoToCloud(userAuthData.data.photo, company, jobRole);
    }
  }

  if (e.target.id === 'updateProfileButton' && e.target.innerText === 'Update') {
    const company = document.getElementById('companyDisplay').innerText;
    const jobRole = document.getElementById('jobRoleDisplay').innerText;
    toggleDiv('jobRoleDisplay');
    toggleDiv('jobRoleEdit', 'block');
    toggleDiv('companyDisplay');
    toggleDiv('companyEdit', 'block');
    toggleDiv('imageUpload', 'block');
    document.getElementById('companyEdit').value = company;
    document.getElementById('jobRoleEdit').value = jobRole;
    renderNotificationInButton('updateProfileButton', 'block', '', 'Save');
  }

  if (e.target.id === 'imageUpload') {
    uploadPhotoAction();
  }

  if (e.target.id === 'imageHolder') {
    const imageHolder = document.getElementById('imageHolder');
    togglePhoto('photoDisplay', 'block', imageHolder.src);
  }

  if (e.target.id === 'cancelPhotoButton') {
    togglePhoto('photoDisplay');
  }

  if (e.target.id === 'updateAnswerPopUpButton') {
    renderUpdateAnswerPopUp('updateAnswerPopUpDisplay', 'block', +e.target.attributes[0].value);
  }
  if (e.target.id === 'turnOffUpdateAnswer') {
    renderUpdateAnswerPopUp('updateAnswerPopUpDisplay');
  }

  if (e.target.id === 'updateAnswerButton') {
    e.preventDefault();
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    const answer = document.getElementById('answerForUpdate').value;
    updateAnswer(answer, e.target.attributes[0].value);
  }

  if (e.target.id === 'deleteQuestion') {
    renderDeleteQuestionPopUpModal('updateAnswerPopUpDisplay', 'block',
      questionData.data.questionWithAnswers.id);
  }

  if (e.target.id === 'turnOffDeleteQuestion') {
    renderDeleteQuestionPopUpModal('updateAnswerPopUpDisplay');
  }

  if (e.target.id === 'confirmDeleteQuestion') {
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    deleteQuestion(e.target.attributes[0].value);
  }

  if (e.target.id.startsWith('prefer')) {
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    preferAnswer(e, e.target.attributes[0].value);
  }
  if (e.target.id.startsWith('star')) {
    const prefer = document.getElementById(e.target.attributes[0].value);
    prefer.click();
  }

  if (e.target.id.startsWith('upvote')) {
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    upvoteAnswer(e, e.target.attributes[0].value);
  }
  if (e.target.id.startsWith('thumbUp')) {
    const upvote = document.getElementById(e.target.attributes[0].value);
    upvote.click();
  }

  if (e.target.id.startsWith('downvote')) {
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    downvoteAnswer(e, e.target.attributes[0].value);
  }
  if (e.target.id.startsWith('thumbDown')) {
    const downvote = document.getElementById(e.target.attributes[0].value);
    downvote.click();
  }

  if (e.target.id.startsWith('comment') || e.target.id.startsWith('viewComment')) {
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    window.location.hash = `#comments/questions/${e.target.attributes[0].value}`;
    const answerId = window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1);
    if (!userAuthData.data.id) userAuthData.data.id = retrieveData('loginId');
    if (searchAnswerInHistory(answerId)) return renderAnswerInHistory(answerId);
    fetchComment(e.target.attributes[0].value);
  }

  if (e.target.id === 'commenButton') {
    e.preventDefault();
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    const comment = document.getElementById('boxComment').value;
    postComment(comment, e.target.attributes[0].value);
  }
});

window.addEventListener('load', () => {
  userAuthData.data.loginStatus = retrieveData('loginStatus');
  userAuthData.data.id = retrieveData('loginId');
  if (userAuthData.data.loginStatus) {
    toggleDiv('loginLink');
    toggleDiv('signupLink');
  } else {
    toggleDiv('profileLink');
  }
  if (window.location.hash === '') fetchQuestions();
  if (window.location.hash.startsWith('#questions')) {
    const url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    questionData.url = url;
    fetchQuestion(url);
  }

  if (window.location.hash.startsWith('#comments')) {
    const url = window.location.hash.substring(20);
    fetchComment(url);
  }
  if (window.location.hash === '#signup') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { signupAction(); }
  }

  if (window.location.hash === '#login') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { loginAction(); }
  }
  if (window.location.hash === '#ask') {
    askAction();
  }

  if (window.location.hash === '#profile') {
    toggleDiv('logoutLink', 'block');
    forceLogout();
    logoutAction();
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    fetchUserProfile();
  } else {
    toggleDiv('logoutLink');
  }
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '') {
    if (questionData.data.questions.length === 0 && !questionData.search) {
      fetchQuestions();
    }
    if (!questionData.search && questionData.data.questions.length > 0) connectQuestionsDisplayToDataCenter();
  }
  if (window.location.hash.startsWith('#questions')) {
    const url = window.location.hash.substring(window.location.hash.lastIndexOf('-') + 1);
    if (!userAuthData.data.id) userAuthData.data.id = retrieveData('loginId');
    if (searchQuestionInHistory(url)) return renderQuestionInHistory(url);

    questionData.url = url;
    fetchQuestion(url);
  }

  if (window.location.hash.startsWith('#comments')) {
    const url = window.location.hash.substring(20);
    const answerId = window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1);
    if (!userAuthData.data.id) userAuthData.data.id = retrieveData('loginId');
    if (searchAnswerInHistory(answerId)) return renderAnswerInHistory(answerId);
    fetchComment(url);
  }

  if (window.location.hash === '#signup') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { signupAction(); }
  }

  if (window.location.hash === '#login') {
    if (userAuthData.data.loginStatus) window.location.hash = ''; else { loginAction(); }
  }

  if (window.location.hash === '#ask') {
    askAction();
  }

  if (window.location.hash === '#profile' || window.location.hash === '#logout') {
    toggleDiv('logoutLink', 'block');
    forceLogout();
    logoutAction();
    if (!userAuthData.data.token) {
      userAuthData.data.token = retrieveData('token');
    }
    if (!userAuthData.data.profile.length) fetchUserProfile();
    else { connectfetchUserProfileOperationToDataCenter(); }
  } else {
    toggleDiv('logoutLink');
  }
});

const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
searchButton.addEventListener('click', () => fetchSearchQuestions());
searchBox.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13) searchButton.click();
});
