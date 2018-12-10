const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const askLink = document.getElementById('askLink');
const homeLink = document.getElementById('homeLink');
const profileLink = document.getElementById('profileLink');
const navcheck = document.getElementById('nav-check');

const collapseNavOnClick = () => {
  navcheck.checked = false;
};

signupLink.addEventListener('click', collapseNavOnClick);
loginLink.addEventListener('click', collapseNavOnClick);
askLink.addEventListener('click', collapseNavOnClick);
homeLink.addEventListener('click', collapseNavOnClick);
profileLink.addEventListener('click', collapseNavOnClick);
