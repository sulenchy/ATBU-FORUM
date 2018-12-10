const signup = `
<div class = "container image-background ask-bg "id="ask-bg" style = "margin: 0 auto;">

    <div class = "row ">
        
        <div class = "col "style ="margin-top: 18%">
          <h1 style = "color: white; text-align: center;z-index: 10">Welcome to FMS ATBU FORUM</h1>
        </div>
        <div class = "col">
            <div class = "login-box">
            <h2>Signup</h2>
            <form class = "" method = "POST">
                <label for="email"><b>Enter Full Name</b></label>
                <input type="text" name="fullName" id="fullName" ><span id ="goodFullName"><i class ="fa fa-check"></i></span>
                <div id = "nameNotificationError"></div>

                <label for="email"><b>Enter Email</b></label>
                <input type="text" name="email" id ="email"><span id ="goodEmail"><i class ="fa fa-check"></i></span>
                <div id = "emailNotificationError"></div>

                <label for="password"><b>Enter password</b></label>
                <input type="password" name="password" id ="password"><span id ="goodPassword"><i class ="fa fa-check"></i></span>
                <div id = "passwordNotificationError"></div>

                <label for="password"><b>Confirm password</b></label>
                <input type="password" name="password" id ="confirmPassword"><span id ="goodConfirmPassword"><i class ="fa fa-check"></i></span>
                <div id = "confirmPasswordNotificationError"></div>

                <button type="" id ="signupButton"> <span id ="signupNotification">Signup</span></button>
            </form>
        </div>
                </div>
    </div>
      
   </div>

<div class = "container " style = "background-color: #f1f1f1">


</div>

`;

export default signup;
