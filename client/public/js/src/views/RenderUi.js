import questionData from '../models/dataCenter.js';
import userAuthData from '../models/userData.js';
import ResourceHelper from '../helper/ResourceHelper.js';
import routeTable from '../router/routeTable.js';

const { getInformationFromDataCenter } = ResourceHelper;

/**
  * @class RenderUi
  *
  * @description this class render all Ui components to the client
  */
class RenderUi {
  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to display the notification box
    * @param {string} setDisplay - This sets the display of the notifciation box
    * @param {string} message - This is the message to be displayed on the notification box
    * @returns {object} - renders the notification box
    *
    * @description This method renders a modal on the client
    * @memberOf RenderUi
    */
  static renderNotification(elementId, setDisplay = 'none', message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = message;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to display the notification
    * @param {string} setDisplay - This sets the display of the notifciation box
    * @param {string} message - This is the message to be displayed on the notification box
    * @param {string} defaultLabel - This is the fallback label on the button
    * @returns {object} - renders the notification box
    *
    * @description This method renders a modal on the client
    * @memberOf RenderUi
    */
  static renderNotificationInButton(elementId, setDisplay = 'none', message = '', defaultLabel = 'Signup') {
    const content = (message) ? `<span><i class ="fas fa-spinner fa-pulse"></i></span> &nbsp ${message}`
      : `${defaultLabel}`;
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = content;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} e - The event object passed in.
    * @param {string} elementId - This is the id of the element to display the notification star
    * @param {string} setDisplay - This sets the display of the notifciation star
    * @param {string} starColor - This sets the color of the star
    * @param {string} status - The status of the prefered star
    * @param {string} ready - The prefered status of the star
    * @returns {object} - renders the notification star
    *
    * @description This method renders notification on stars
    * @memberOf RenderUi
    */
  static renderNotificationInStar(e, elementId, setDisplay = 'none', starColor = '', status = 0, ready = '') {
    let newKey = e.target.attributes[0].value;
    if (!e.target.attributes[0].value.startsWith('prefer')) newKey = e.target.id;
    let animation = '';
    let star = 'far fa-star';
    if (ready) star = 'fas fa-star';
    if (!status) animation = 'fa-spin';
    const animatedStar = `<i key=${newKey} id = "star" class='${star} ${animation} stars' style ="color:${starColor}"></i>`;
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = animatedStar;
    targetDiv.style.display = setDisplay;
  }


  /**
    * @static
    *
    * @returns {object} - renders the notification box
    *
    * @description This method clears notification in stars
    * @memberOf RenderUi
    */
  static clearNotificationsInStar() {
    const stars = document.querySelectorAll('.stars');
    if (stars.length) {
      stars.forEach((x) => {
        x.style.color = '';
        x.classList.toggle('fas');
        x.classList.toggle('far');
      });
    }
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the button element
    * @param {string} setDisplay - This sets the display of the button;
    * @returns {object} - renders a button;
    *
    * @description This method renders a button
    * @memberOf RenderUi
    */
  static toggleButton(elementId, setDisplay = 'none') {
    const targetButton = document.getElementById(elementId);
    targetButton.style.display = setDisplay;
  }


  /**
    * @static
    *
    * @param {string} elementId - This is the id of the dashboardTitle
    * @param {string} newTitle - This is the new title of the dashboard
    * @param {string} data - This is the data to be attached to the title
    * @returns {object} - renders a button;
    *
    * @description This method renders a button
    * @memberOf RenderUi
    */
  static modifyTitle(elementId, newTitle, data = '') {
    const targetDiv = document.getElementById(elementId);
    const newData = data ? `: ${data}` : '';
    targetDiv.innerHTML = `<h3>${newTitle} ${newData}</h3>`;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the div element
    * @param {string} setDisplay - This sets the display of the div element;
    * @returns {object} - renders a div ;
    *
    * @description This method renders a div element
    * @memberOf RenderUi
    */
  static toggleDiv(elementId, setDisplay = 'none') {
    const targetButton = document.getElementById(elementId);
    targetButton.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the div element
    * @param {string} setDisplay - This sets the display of the div element;
    * @param {string} imageSrc - This sets the display of the div element;
    * @returns {object} - renders a div ;
    *
    * @description This method renders a div element
    * @memberOf RenderUi
    */
  static togglePhoto(elementId, setDisplay = 'none', imageSrc = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = `<div class ="modal container " id ="zoomedPhoto" style ="" >
    <div class = "row">
      <div class = "col-2"></div>
      <div class = "col-3">
        <div  class ="photoCloseButton"><span id = "cancelPhotoButton" class = "photoCollapseButton">x</span></div>
        <div>
          <img style ="" class ="zoomPhoto" src ="${imageSrc}">
  
  
        </div>
      </div>
     <div class = "col-2"></div>
    </div>
  </div>`;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the div element
    * @param {string} setDisplay - This sets the display of the div element;
    * @param {integer} answerId - This is the id of the answer to be updated;
    * @returns {object} - renders a div ;
    *
    * @description This method renders a div element
    * @memberOf RenderUi
    */
  static renderUpdateAnswerPopUp(elementId, setDisplay = 'none', answerId = '') {
    const targetDiv = document.getElementById(elementId);
    let answer = '';
    let questionId = '';
    if (answerId) {
      answer = getInformationFromDataCenter(questionData.data.questionWithAnswers.answers,
        'id', answerId, 'answer');
      questionId = getInformationFromDataCenter(questionData.data.questionWithAnswers.answers,
        'id', answerId, 'questionId');
    }

    targetDiv.innerHTML = `
    <div class ="modal container pd-2">
    <div class = "row">
      <div class = "col-2"></div>
      <div class = "col-3">
          <div class = "card">
              <div class = "row">
                  <div class = "col">
                    <div class= "turnOffUpdateAnswerModal" id ="turnOffUpdateAnswer">X</div>
                    <form class = "" method = "POST">
                    
                      <label for="password"><b>Update answer</b></label>
                      <textarea  class ="mt-4 txtarea pd-1" id = "answerForUpdate">${answer}</textarea>
                  
                      <button key="${questionId}/answers/${answerId}" id = "updateAnswerButton" > 
                      Update
                      </button>
                  </form>
                  </div>
                </div>
          </div>
      </div>
      <div class = "col-2"></div>
    </div>

 
  </div>
    `;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the div element
    * @param {string} setDisplay - This sets the display of the div element;
    * @param {integer} questionId - This is the id of the question in question;
    * @returns {object} - renders a div ;
    *
    * @description This method renders a div element
    * @memberOf RenderUi
    */
  static renderDeleteQuestionPopUpModal(elementId, setDisplay = 'none', questionId = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = `
    <div class ="modal container pd-2">
    <div class = "row mt-4">
      <div class = "col-2"></div>
      <div class = "col-3">
          <div class = "card">
              <div class = "row">
                  <div class = "col">
                    <div class= "turnOffUpdateAnswerModal" id ="turnOffDeleteQuestion">X</div>
                   <div class ="question">Are you sure you want to delete this question?</div>
                   <div class = "mt-4"><button key=${questionId} id ="confirmDeleteQuestion"type="answer">Yes</button></div>
                  </div>
                </div>
          </div>
      </div>
      <div class = "col-2"></div>
    </div>

 
  </div>
    `;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to display the modal
    * @param {string} setDisplay - This sets the display of the modal div
    * @param {string} message - This is the message to be displayed
    * @returns {object} - renders the modal element
    *
    * @description This method renders a modal on the client
    * @memberOf RenderUi
    */
  static renderModal(elementId, setDisplay, message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;
    targetDiv.innerHTML = `<div class = "container modal" >
    <div class = "row" >
      <div class = "col"></div>
      <div class = "col">
       <div class = "card">
         <div class = "container">
           <div class = "row mt-4 pd-1" >
             <div class = "col-2">
               <div class = "symbol-display">
                 <div class = "alignSymbol">!</div>
               </div>
               
             </div>
             <div class = "col-5">
               <div class = "question">${message || 'No message available!'}</div>
   
             </div>
           </div>
          
             <div class = "col" style = "text-align: right; padding:1%" ><span></span><span></span><a
             >
             <button type= "answer" id = "shutDownButton" >Ok</button></a></div>
          
         </div>
       </div>
      </div>
      <div class ="col"></div>
    </div>
       </div> `;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to display the modal
    * @param {string} setDisplay - This sets the display of the modal div
    * @param {string} message - This is the message to be displayed
    * @returns {object} - renders the modal element
    *
    * @description This method renders a loading modal during asynchronous activity
    * @memberOf RenderUi
    */
  static renderModalLoader(elementId, setDisplay, message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = `<div class = "container modal" >
    <div class = "row" >
      <div class = "col"></div>
      <div class = "col">
       <div class = "card">
         <div class = "container">
           <div class = "row mt-4 pd-1" >
             <div class = "col-2">
               <div class = "symbol-display">
                 <div class = "alignSymbol"><span><i class ="fas fa-spinner fa-pulse"></i></span></div>
               </div>
               
             </div>
             <div class = "col-5">
               <div class = "question">${message || 'No message available!'}</div>
   
             </div>
           </div>
          
         </div>
       </div>
      </div>
      <div class ="col"></div>
    </div>
       </div> `;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to display the notification box
    * @param {string} setDisplay - This sets the display of the notifciation box
    * @param {string} message - This is the message to be displayed on the notification box
    * @returns {object} - renders the notification box
    *
    * @description This method renders a notification div
    * @memberOf RenderUi
    */
  static notifyEmptyResult(elementId, setDisplay = 'none', message = '') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.innerHTML = `    <div class = "container" >
    <div class ="row no-questions" >
      
      <div class ="alignCardWidth" >
          <div class = "card" >
              <div class = "container">
                <div class = "row mt-4 pd-1" >
                  <div class = "col-2">
                    <div class = "symbol-display">
                      <div class = "alignSymbol" >!</div>
                    </div>
                    
                  </div>
                  <div class = "col-5">
                    <div class = "question" > ${message || 'No Questions Yet! refresh page'}  </div>
  
                  </div>
                </div>
               
                  <div class = "col" style="text-align:right"><span></span><span></span><a id ="refresh"><button  type= "answer">Refresh</button></a></div>
               
              </div>
            </div>
      </div>
      
    </div>
  </div>`;
    targetDiv.style.display = setDisplay;
  }

  /**
    * @static
    *
    * @param {string} commentId - This is the id of the comment to be displayed
    * @param {string} comment - The comment to be displayed
    * @returns {object} - renders the particularcomment
    *
    * @description This method renders a particular comment in a div
    * @memberOf RenderUi
    */
  static renderComment(commentId, comment) {
    return `<div class = "row">
    <div class = "col">${comment}
      <div class = "row mt-4">
        <div class = "col"><div class = "ft">
        Comment by 
        ${getInformationFromDataCenter(questionData.data.users, 'id',
    getInformationFromDataCenter(questionData.data.answerWithComments.comments, 'id', commentId, 'userId'), 'fullName')} 
        &nbsp on &nbsp <span class = "darkgray">
        ${
  getInformationFromDataCenter(questionData.data.answerWithComments.comments, 'id', commentId, 'date')}
            &nbsp at &nbsp
            ${
  getInformationFromDataCenter(questionData.data.answerWithComments.comments, 'id', commentId, 'time')}
        </span></div></div>
        <div class = "col ">
          </div>
         
      </div>
    </div>

  </div>

  <div>&nbsp</div>
  <div class = "underline">&nbsp</div>`;
  }


  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element that will display the question
    * @param {string} setDisplay - The sets the visibility of the div element
    * @returns {object} - renders a an answer with all its comments to the client side
    *
    * @description This method renders a particular question in a div.
    * @memberOf RenderUi
    */
  static renderAnswerWithComments(elementId, setDisplay = 'none') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;
    const answerId = questionData.data.answerWithComments.id;
    const questionId = questionData.data.answerWithComments.questionid;
    const { approved } = questionData.data.answerWithComments;
    let preferIndicator = 'far fa-star';
    let styleIndicator = '';
    if (approved) { preferIndicator = 'fas fa-star'; styleIndicator = 'hotpink'; }
    const header = '<div class =""> <h3> Comments </h3></div><div class = "underline">&nbsp</div>';
    let commentHeader = `<div class =""> <h4>${questionData.data.answerWithComments.comments.length} 
    Comment</h3></div><div class = "underline">&nbsp</div>`;
    if (questionData.data.answerWithComments.comments.length > 1) {
      commentHeader = `<div class =""> <h4>${questionData.data.answerWithComments.comments.length} 
      Comments</h3></div><div class = "underline">&nbsp</div>`;
    }
    const answer = `<div class = "row">
    <div class = "col-5 pr-1" >${questionData.data.answerWithComments.answer} 
      <div class = "mt-4 ft">Answered by 
      ${getInformationFromDataCenter(questionData.data.users, 'id', questionData.data.answerWithComments.userid, 'fullName')}  
      &nbsp <span class = "darkgray" >
      ${questionData.data.answerWithComments.date}
      &nbsp at &nbsp
      ${questionData.data.answerWithComments.time.substr(0, 15)}
      </span></div>
    </div>
    <div class = "col-2 ">
      <div class = "row ">
          <div class = "col-3">${questionData.data.answerWithComments.upvotes} upvotes</div>
          <div class = "col-2"><span key="${questionId}/answers/${answerId}" id ="prefer${answerId}" style ="padding:auto">
          <i key ="prefer${answerId}" class='${preferIndicator} stars' id ="star" style="color:${styleIndicator}; text-align:center"></i>
          </span></div>
          <div class = "col-3">${questionData.data.answerWithComments.downvotes} downvotes</div>
      </div>
    </div>
  </div>

  <div>&nbsp</div>
  <div class = "underline;">&nbsp</div>`;
    const formatComments = questionData.data
      .answerWithComments.comments.map(x => RenderUi.renderComment(x.id, x.comment));
    const refinedComments = formatComments.join(' ');
    const addComment = `<form class = "" method = "POST">
        
    <label for="password"><b>Add Comment</b></label>
    <textarea  class ="mt-2 txtarea pd-1" id = "boxComment"></textarea>

    <button key= "${questionId}/answers/${answerId}" id = "commenButton" > 
    Add
    </button>
</form>`;
    const formattedAnswerDisplay = `
<div id = "updateAnswerPopUpDisplay"></div>
<div class = "container question-background " >
<div class = "row ">
    <div class = "col">
        <div class = "question-card">
            ${header}
            ${answer}
            ${commentHeader}
            ${refinedComments}
            ${addComment}
        </div>
        </div>
        </div>
        
        </div>`;
    targetDiv.innerHTML = formattedAnswerDisplay;
  }

  /**
    * @static
    *
    * @param {string} answerId - This is the id of the answer to be displayed
    * @param {string} answer - The answer to be displayed
    * @param {string} upVotes - This is the total upvotes to this answer
    * @param {string} downVotes - This is the total downvotes to this answer
    * @param {string} approved - This is indicates if an answer is preffered or not
    * @param {string} numberOfComments - This is the number of comments to a particular answer
    * @returns {object} - renders the particular answer
    *
    * @description This method renders a particular answer in a div
    * @memberOf RenderUi
    */
  static renderAnswer(answerId, answer, upVotes, downVotes, approved = false, numberOfComments = 0) {
    let preferIndicator = 'far fa-star';
    let styleIndicator = '';
    if (approved) { preferIndicator = 'fas fa-star'; styleIndicator = 'hotpink'; }
    let numberOfCommentsDisplay = 'View all comments';
    if (numberOfComments > 2) numberOfCommentsDisplay = `View all ${numberOfComments} comments`;
    let updateAnswerButton = `<div class ="" style ="">
    <div> <span key="${answerId}" id ="updateAnswerPopUpButton" style ="padding:10px 20px; border: 1px solid lightgrey; float:right">
     <i key="${answerId}" id="updateAnswerPopUpButton" class ="far fa-edit blue resize"> </i></span></div>
    <div>&nbsp</div
    <div>&nbsp</div
   </div>
    `;
    const questionId = questionData.data.questionWithAnswers.id;
    const userId = getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'userId');
    if (userId !== userAuthData.data.id) updateAnswerButton = '';
    return `<div class = "row">
   <div class = "col-5">${answer} 
     <div class = "row mt-4">
       <div class = "col"><div class = "ft">Answered by 
       ${getInformationFromDataCenter(questionData.data.users, 'id',
    getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'userId'), 'fullName')}  
    &nbsp <span class = "darkgray" >
    ${
  getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'date')}
    &nbsp at &nbsp
    ${
  getInformationFromDataCenter(questionData.data.questionWithAnswers.answers, 'id', answerId, 'time')}
    </span></div></div>
       <div class = "col ">
         <div class = "row">
           <div class = "col"><button key="${questionId}/answers/${answerId}" id ="comment${answerId}"type =comment>Comment</button></div>
           
           <div class = "col " > <div key ="${questionId}/answers/${answerId}" class = "darkgray commentLink"  id ="viewComment${answerId}">
           ${numberOfCommentsDisplay}</div></div>
           
         </div>
         
         </div>
        

     </div>
   </div>
   <div class = "col-2">
     <div class = "row">
         <div class = "col" > <span id ="numUpvotes${answerId}">${upVotes}</span> upvotes</div>
         <div class = "col"><span  id ="numDownvotes${answerId}">${downVotes}</span> downvotes</div>
     </div>

     <div class = "row">
         <div class = "col"><span key= "${questionId}/answers/${answerId}" id ="upvote${answerId}" style ="padding:auto" >
         <i key="upvote${answerId}" class="fas fa-thumbs-up" id ="thumbUp"></i></span></div>
         
         <div class = "col"><span key="${questionId}/answers/${answerId}" id ="prefer${answerId}" style ="padding:auto">
          <i key ="prefer${answerId}" class='${preferIndicator} stars' id ="star" style="color:${styleIndicator}"></i>
          </span></div>

         <div class = "col"><span key= "${questionId}/answers/${answerId}"  id= "downvote${answerId}" style ="padding:auto">
          <i key ="downvote${answerId}" id= "thumbDownk" class="fas fa-thumbs-down" ></i></span></div>

     </div>
   </div>

 </div>

 ${updateAnswerButton}

 <div class = "underline">&nbsp</div>`;
  }


  /**
    * @static
    *
    * @param {string} questionId - This is the id of the question to be displayed
    * @param {string} questionTitle - The question Title of the question to be displayed
    * @param {string} answerNumber - This is the number of  answers  to this question
    * @param {string} totalUpVotes - This is the total upvotes to all answers to this question
    * @param {string} totalDownVotes - This is the total downvotes to to all answers to this question
    * @returns {object} - renders the particular question
    *
    * @description This method renders a particular question in a div
    * @memberOf RenderUi
    */
  static renderQuestion(questionId, questionTitle, answerNumber,
    totalUpVotes, totalDownVotes) {
    let newQuestionTitle;
    if (questionTitle.length > 55) {
      newQuestionTitle = `${questionTitle.substr(0, 88)} ...`;
    }
    let answerNumberDisplay = `${answerNumber} Answer`;
    if (answerNumber > 1) answerNumberDisplay = `${answerNumber} Answers`;
    return `<div class = "card">
      <div class = "container">
        <div class = "row mt-4 pd-1" >
          <div class = "col-2">
            <div class = "symbol-display">
              <div class = "alignSymbol">${questionTitle.substr(0, 1)}</div>
            </div>
            
          </div>
          <div class = "col-5">
            <div class = "question">${newQuestionTitle || questionTitle}</div>

          </div>
        </div>
        <div class = "row mt-2 pd-1">
          <div class = "col"> <span>${answerNumberDisplay}</span></div>
    <div class = "col"><span> <i class="fas fa-thumbs-up"></i></span>&nbsp ${totalUpVotes}<span></span></div>
          <div class = "col"><span> <i class="fas fa-thumbs-down "></i></span>&nbsp ${totalDownVotes}<span><span></span></div>
          <div class = "col"><span></span><span></span><a href =#question-${questionId} >
          <button class="viewButton" key=${questionId} type= "answer">View</button></a></div>
        </div>
      </div>
    </div>`;
  }


  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element that will display the question
    * @param {string} setDisplay - The sets the visibility of the div element
    * @returns {object} - renders a particular question to the client side
    *
    * @description This method renders a particular question in a div.
    * @memberOf RenderUi
    */
  static renderQuestionWithAnswers(elementId, setDisplay = 'none') {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;

    const formatAnswers = questionData.data
      .questionWithAnswers.answers.map(x => RenderUi.renderAnswer(x.id, x.answer, x.upvotes, x.downvotes,
        x.approved, x.numberOfComments));
    const refineAnswers = formatAnswers.join(' ');
    const calcVotes = (votes) => {
      let i = 0;
      questionData.data.questionWithAnswers.answers.forEach((x) => { i += x[votes]; });
      return i;
    };
    let deleteButton = `
    <div>&nbsp</div>
    <div>&nbsp</div>
    <div class ="underline"></div>
    <div class ="mt-2" style ="text-align:right;">
    <button type ="deleteButton" id="deleteQuestion"> Delete this question </button></div>`;
    const { userId } = questionData.data.questionWithAnswers;
    if (userId !== userAuthData.data.id) deleteButton = '';
    const totalUpVotes = calcVotes('upvotes');
    const totalDownVotes = calcVotes('downvotes');
    const numberOfAnswers = questionData.data.questionWithAnswers.answers.length;
    let answerNumberDisplay = `${numberOfAnswers} Answer`;
    if (numberOfAnswers > 1) answerNumberDisplay = `${numberOfAnswers} Answers`;
    const answerHeader = `<div class =""> <h3>${answerNumberDisplay}</h3></div><div class = "underline">&nbsp</div>`;
    const question = `<h2>${questionData.data.questionWithAnswers.questionTitle}</h2>
    <div class = "underline">&nbsp</div>
    <div class = "row">
      <div class = "col-5 pr-1" >${questionData.data.questionWithAnswers.questionDescription} 
        <div class = "mt-4 ft">Asked by 
        ${getInformationFromDataCenter(questionData.data.users, 'id', questionData.data.questionWithAnswers.userId, 'fullName')}  
        &nbsp <span class = "darkgray" >
        ${questionData.data.questionWithAnswers.date}
        &nbsp at &nbsp
        ${questionData.data.questionWithAnswers.time.substr(0, 15)}
        </span></div>
      </div>
      <div class = "col-2 ">
        <div class = "row ">
            <div class = "col">${totalUpVotes} upvotes</div>
            <div class = "col">${totalDownVotes} downvotes</div>
        </div>
      </div>
    </div>

    <div>&nbsp</div>
    <div class = "underline;">&nbsp</div>`;

    const addAnswer = `<form class = "" method = "POST">
        
    <label for="password"><b>Add an answer</b></label>
    <textarea  class ="mt-2 txtarea pd-1" id = "answer"></textarea>

    <button type="submit" key=${questionData.data.questionWithAnswers.id} id = "answerButton" > 
    Add
    </button>
</form>`;

    const formattedQuestionDisplay = `
    <div id = "updateAnswerPopUpDisplay"></div>
    <div class = "container question-background " >
    <div class = "row ">
        <div class = "col">
            <div class = "question-card">
                ${question}
                ${answerHeader}
                ${refineAnswers}
                ${addAnswer}
                ${deleteButton}
            </div>
            </div>
            </div>
            
            </div>`;
    targetDiv.innerHTML = formattedQuestionDisplay;
  }


  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to be displayed
    * @param {string} setDisplay - The sets the visibility of the div element
    * @param {integer} length - This is the number of  questions to be rendered
    * @param {string} questionsArray - This is the question array data to be passed in
    * @returns {object} - renders all questions to the home page
    *
    * @description This method renders a particular question in a div.
    * @memberOf RenderUi
    */
  static renderAllQuestions(elementId, setDisplay, length, questionsArray) {
    const targetDiv = document.getElementById(elementId);
    targetDiv.style.display = setDisplay;
    let questions = [];
    [...questions] = [...questionsArray];
    if (length > questionsArray.length) { length = questionsArray.length; }
    questions.length = length;
    questionData.loadMore = length;
    let formattedQuestionDispay;
    let i = 0;
    let counter = 0;
    const formatQuestions = questions.map(x => `<div class ="col">
      ${RenderUi.renderQuestion(x.id, x.questionTitle, x.numberOfAnswers, x.upvotes, x.downvotes)}</div>`);
    let setQuestionInRow = '';
    const formatQuestionsWithRows = formatQuestions.map((x) => {
      setQuestionInRow += x;
      i += 1;
      counter += 1;
      if (i === 3 || counter === formatQuestions.length) {
        i = 0;
        const formattedQuestions = setQuestionInRow;
        setQuestionInRow = '';
        return `<div class ="row">${formattedQuestions}</div>`;
      }
    });
    const refinedQuestions = formatQuestionsWithRows.filter(x => x !== undefined);
    formattedQuestionDispay = refinedQuestions.join(' ');

    if (length % 3 === 1) {
      const questionUnderReform = refinedQuestions.pop();
      let reformedQuestion = questionUnderReform.split(' ').join(' ');
      reformedQuestion = reformedQuestion.substring(0, reformedQuestion.length - 6);
      reformedQuestion += '<div class = "col"></div><div class = "col"></div></div>';

      formattedQuestionDispay = refinedQuestions.join(' ') + reformedQuestion;
    }
    if (length % 3 === 2) {
      const questionUnderReform = refinedQuestions.pop();

      let reformedQuestion = questionUnderReform.split(' ').join(' ');
      reformedQuestion = reformedQuestion.substring(0, reformedQuestion.length - 6);
      reformedQuestion += '<div class ="col"></div></div>';
      formattedQuestionDispay = refinedQuestions + reformedQuestion;
    }
    const loadMoreButton = `<div class ="mb-1 mt-1 load" style="text-align: center"><button id ="loadMore" type="answer">Load more</button></div>
    `;
    targetDiv.innerHTML = `<div class = "container " style = "background-color: #f1f1f1">
              ${formattedQuestionDispay} 
              
              </div>
              ${loadMoreButton}
              `;
  }

  /**
    * @static
    *
    * @param {string} fieldName - This is the name of the fieldname in question
    * @param {string} elementId - This is the id of the div element in question
    * @param {integer} message - This is the message that will be displayed to the user
    * @param {string} indicator - This is id of the element that will display a good sign
    * @param {string} display - This sets the display of the  indicator
    * @param {string} width - This is id of the element that will display a good sign
    *
    * @returns {object} - renders all questions to the home page
    *
    * @description This method renders a particular question in a div.
    * @memberOf RenderUi
    */
  static renderNotifications(fieldName, elementId, message = '', indicator, display = 'none', width = '') {
    const fieldDiv = document.getElementById(fieldName);
    const targetDiv = document.getElementById(elementId);
    const askbg = document.getElementById('ask-bg');
    const good = document.getElementById(indicator);
    targetDiv.style.display = 'block';
    good.style.display = display;
    good.style.marginLeft = '2%';
    good.style.color = 'hotpink';
    fieldDiv.style.width = width;
    targetDiv.innerHTML = message;
    targetDiv.style.color = 'red';
    targetDiv.style.fontSize = '15px';
    targetDiv.style.paddingBottom = '3%';
    askbg.style.height = '1000px';
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on signup form
    *
    * @description This method renders a modal on the client
    * @memberOf RenderUi
    */
  static showErrors() {
    const firstName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    firstName.style.borderColor = '';
    email.style.borderColor = '';
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', userAuthData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (userAuthData.errors[0].message.includes('name')) {
      firstName.style.borderColor = 'red';
    }
    if (userAuthData.errors[0].message.includes('email')) {
      email.style.borderColor = 'red';
    }
    if (!userAuthData.errors[0].message.includes('confirm')
      && userAuthData.errors[0].message.includes('password')) {
      password.style.borderColor = 'red';
    }
    if (userAuthData.errors[0].message.includes('confirm')) {
      confirmPassword.style.borderColor = 'red';
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on post question  form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnPostQuestionForm() {
    const questionTitle = document.getElementById('questionTitle');
    const questionDescription = document.getElementById('questionDescription');
    questionTitle.style.borderColor = '';
    questionDescription.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (questionData.errors[0].message.includes('Title')) {
      questionTitle.style.borderColor = 'red';
    }
    if (questionData.errors[0].message.includes('Description')) {
      questionDescription.style.borderColor = 'red';
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on post answer form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnPostAnswerForm() {
    const answer = document.getElementById('answer');
    answer.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (questionData.errors[0].message.includes('answer')) {
      answer.style.borderColor = 'red';
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on post comment form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnPostCommentForm() {
    const comment = document.getElementById('boxComment');
    comment.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (questionData.errors[0].message.includes('comment')) {
      comment.style.borderColor = 'red';
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on update answer form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnUpdateAnswerForm() {
    const answer = document.getElementById('answerForUpdate');
    answer.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (questionData.errors[0].message.includes('answer')) {
      answer.style.borderColor = 'red';
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on update answer form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnPreferAnswer() {
    if (questionData.errors[0].message.includes('answer')) {
      RenderUi.renderNotification('notificationDisplay', 'block', 'You cant prefer this answer');
      setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on update answer form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnVoteAnswer() {
    if (questionData.errors[0].message.includes('answer')) {
      RenderUi.renderNotification('notificationDisplay', 'block', questionData.errors[0].message);
      setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    }
  }

  /**
    * @static
    *
    * @returns {object} - shows errors on update profile form
    *
    * @description This method renders a validation messages and signs
    * @memberOf RenderUi
    */
  static showErrorsOnProfileUpdateForm() {
    const jobRole = document.getElementById('jobRoleEdit');
    const company = document.getElementById('companyEdit');
    jobRole.style.borderColor = '';
    company.style.borderColor = '';
    RenderUi.renderNotification('notificationDisplay', 'block', userAuthData.errors[0].message);
    setTimeout(() => RenderUi.renderNotification('notificationDisplay', 'none'), 3500);
    if (userAuthData.errors[0].message.includes('company')) {
      company.style.borderColor = 'red';
    }
    if (userAuthData.errors[0].message.includes('jobRole')) {
      jobRole.style.borderColor = 'red';
    }
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element that will display the profile
    * @param {string} setDisplay - The sets the visibility of the div element
    * @param {string} profileArray - This is the profileData of the currently logged in user
    * @param {string} userQuestionsArray - These are questions asked by this user
    * @returns {object} - renders user's data on the client side
    *
    * @description This method renders the user's profile.
    * @memberOf RenderUi
    */
  static renderUserProfile(elementId, setDisplay, profileArray) {
    const targetDiv = document.getElementById(elementId);
    const profileDisplay = `${RenderUi.renderProfileDetail(profileArray)}`;
    targetDiv.style.display = setDisplay;
    targetDiv.innerHTML = profileDisplay;
    if (profileArray[0].photo !== 'image-url') {
      RenderUi.toggleDiv('dummyImage');
      RenderUi.toggleDiv('imageHolder', 'block');
    }
  }


  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to be displayed
    * @param {string} setDisplay - The sets the visibility of the div element
    * @param {string} questionsArray - This is the question array data to be passed in
    * @returns {object} - renders recent questions to the profile page
    *
    * @description This method renders recents question in a div.
    * @memberOf RenderUi
    */
  static renderRecentQuestions(elementId, setDisplay, questionsArray) {
    const todaysDate = (new Date(Date.now())).toDateString();
    const recentQuestions = questionsArray.filter(x => x.date.includes(todaysDate.split(' ')[1])
  && x.date.includes(todaysDate.split(' ')[3]));
    if (recentQuestions.length > 0) {
      RenderUi.renderAllQuestions('recentQuestionsDisplay', 'block', recentQuestions.length, recentQuestions);
    }
  }

  /**
    * @static
    *
    * @param {string} elementId - This is the id of the element to be displayed
    * @param {string} setDisplay - The sets the visibility of the div element
    * @param {string} questionsArray - This is the question array data to be passed in
    * @returns {object} - renders recent questions to the profile page
    *
    * @description This method renders mostAnswered question in a div.
    * @memberOf RenderUi
    */
  static renderMostAnsweredQuestions(elementId, setDisplay, questionsArray) {
    let mostAnsweredQuestions = [...questionsArray];
    mostAnsweredQuestions = mostAnsweredQuestions.sort((x, y) => y.numberOfAnswers - x.numberOfAnswers);
    const refinedMostAnsweredQuestions = mostAnsweredQuestions.filter(x => x.numberOfAnswers > 0);
    if (refinedMostAnsweredQuestions.length > 0) {
      if (refinedMostAnsweredQuestions.length > 6) {
        RenderUi.renderAllQuestions('mostAnsweredQuestionsDisplay', 'block',
          6, refinedMostAnsweredQuestions);
      } else {
        RenderUi.renderAllQuestions('mostAnsweredQuestionsDisplay', 'block',
          refinedMostAnsweredQuestions.length, mostAnsweredQuestions);
      }
    }
  }

  /**
    * @static
    *
    * @param {string} profileArray - This is the profileData of the currently logged in user
    * @returns {object} - renders user's data on the client side
    *
    * @description This method renders the user's profile.
    * @memberOf RenderUi
    */
  static renderProfileDetail(profileArray) {
    const userProfileData = `
    <div id = "photoDisplay"></div>
    <div class = "container image-background profile-height" style = "margin: 0 auto;">
    
    <div class = "row ">
        
        <div class = "col mt-17" >
          <h1 style = "color: white; text-align: center">Welcome to FMS ATBU FORUM</h1>
        </div>
        <div class = "col">
          <div class = "profile-box" >
            <div class = "container">
              <div class = "col profile-header" >My Profile</div>
              <div class = "row">
                <div class = "col-2"> 
                  <div class = "user-icon-div" id ="dummyImage" style ="display:block"> <i class = "fa fa-user user-icon-profile"></i></div>
                  <div class = "mt-1" > <img id ="imageHolder" class ="profilePhoto" src ="${profileArray[0].photo}"></div>
                  <input type ="file" name =" file"  id= "imageUpload" style ="width:100%; display:none" accept ="images/*">
                  </div>
                  
                <div class = "col-5"> 
                  <div class = "container mt-7 ml-3">
                    <div class = "row mt-2">
                        <div class = "col-3"><div class = "name">Name:</div></div>
                        <div class = "col-5"><div class = "name">${profileArray[0].fullName}</div> </div>
                    </div>
                  
                    <div class = "row mt-2">
                        <div class = "col-3"><div class = "name">Job role:</div></div>
                        <div class = "col-5"><div id ="jobRoleDisplay" class = "name">${profileArray[0].jobRole}</div> <div><input style ="display:none"id ="jobRoleEdit" type ="text"></div></div>
                    </div>

                    <div class = "row mt-2">
                        <div class = "col-3"><div class = "name">Company:</div></div>
                        <div class = "col-5"><div id ="companyDisplay"class = "name">${profileArray[0].company}</div><div><input style ="display:none" id ="companyEdit" type ="text"></div></div>
                    </div>


                  
                    <div class = "row mt-7">
                        <div class = "col"><div class = "name"><button id ="updateProfileButton">Update</button></div></div>
                        
                    </div>

                 

                  </div>

                </div>
              </div>
              
              <div class = "col mt-7" style = "font-weight:bold; font-size: 18pt;">Stats</div>
              <div class = "row mt-2" style = "margin-left: 1%">
                  <div class = "col-2"><div class = "name">You asked:</div></div>
                  <div class = "col-5"><div class = "name">${profileArray[0].numberOfQuestions} Questions</div></div>
              </div>

              <div class = "row mt-2" style = "margin-left: 1%">
                  <div class = "col-2"><div class = "name">You answered:</div></div>
                  <div class = "col-5"><div class = "name">${profileArray[0].numberOfAnswers} Questions</div></div>
              </div>
              

              <div class = "row mt-2" style = "margin-left: 1%">
                  <div class = "col-2"><div class = "name">You earned:</div></div>
                  <div class = "col-5"><div class = "name">${profileArray[0].earnedUpvotes} Upvotes</div></div>
              </div>

            </div>
      </div>
                </div>
    </div>

   
   </div>`;
    return userProfileData;
  }
}

export default RenderUi;
