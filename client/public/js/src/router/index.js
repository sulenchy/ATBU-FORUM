import routeTable from './routeTable.js';


const pageDisplay = document.getElementById('pageDisplay');

const renderPage = () => {
  if (!routeTable[window.location.hash]) routeTable[window.location.hash] = pageDisplay.innerHTML;
  pageDisplay.innerHTML = routeTable[window.location.hash] || routeTable[''];
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);
