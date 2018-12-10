const ask = `    <div class = "container image-background ask-bg">
    
<div class = "row">
    
    <div class = "col adjust">
      <h1 class ="header">Welcome to FMS ATBU FORUM</h1>
    </div>
    <div class = "col">
        <div class = "login-box">
        <h2>Ask A Question</h2>
        <form class = "" method = "POST">
            <label for="title"><b>Enter Question Title</b></label>
            <input type="text" id = "questionTitle" >

            <label for="password"><b>Describe your Question</b></label>
            <textarea  class ="mt-2 txtarea" id = "questionDescription" ></textarea>

            <button type="submit" id = "askButton"> <span id ="askNotification">Ask</span></button>
        </form>
    </div>
            </div>
</div>
  
</div>`;

export default ask;
