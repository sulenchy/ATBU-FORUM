import login from '../views/login.js';
import home from '../views/home.js';
import signup from '../views/signup.js';
import ask from '../views/ask.js';
import profile from '../views/profile.js';
import questions from '../views/questions.js';

const routeTable = {
  '': home,
  '#login': login,
  '#signup': signup,
  '#ask': ask,
  '#profile': profile
};

export default routeTable;
