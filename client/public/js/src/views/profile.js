const profile = `  

<div id ="profileDisplay"> 
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
            <div class = "mt-1" > <img id ="imageHolder" class ="profilePhoto" src ="http://donkeys.com"></div>
            <input type ="file" name =" file"  id= "imageUpload" style ="width:100%; display:none" accept ="images/*">
            </div>
              
            <div class = "col-5"> 
              <div class = "container mt-7 ml-3">
                <div class = "row mt-2">
                    <div class = "col-3"><div class = "name">Name:</div></div>
                    <div class = "col-5"><div class = "name">---- -----</div></div>
                </div>
              
                <div class = "row mt-2">
                    <div class = "col-3"><div class = "name">Job role:</div></div>
                    <div class = "col-5"><div id="jobRoleDisplay" class = "name">---- --- ---</div><div><input style ="display:none" id ="jobRoleEdit" type ="text"></div></div>
                </div>

                <div class = "row mt-2">
                    <div class = "col-3"><div class = "name">Company:</div></div>
                    <div class = "col-5"><div id = "companyDisplay"class = "name">----</div><div><input style ="display:none" id ="companyEdit" type ="text"></div></div>
                </div>


              
                <div class = "row mt-7">
                    <div class = "col-3"><div class = "name"><button id ="updateProfileButton">Update</button></div></div>
                    <div class = "col-5"><div class = "name"></div></div>
                </div>

             

              </div>

            </div>
          </div>
          
          <div class = "col mt-7" style = "font-weight:bold; font-size: 18pt;">Stats</div>
          <div class = "row mt-2" style = "margin-left: 1%">
              <div class = "col-2"><div class = "name">You asked:</div></div>
              <div class = "col-5"><div class = "name">- Questions</div></div>
          </div>

          <div class = "row mt-2" style = "margin-left: 1%">
              <div class = "col-2"><div class = "name">You answered:</div></div>
              <div class = "col-5"><div class = "name">- Questions</div></div>
          </div>
          

          <div class = "row mt-2" style = "margin-left: 1%">
              <div class = "col-2"><div class = "name">You earned:</div></div>
              <div class = "col-5"><div class = "name">- Upvotes</div></div>
          </div>

        </div>
  </div>
            </div>
</div>


</div>
</div>

<div class = "container profiledashboardfooter" ><h3>Your Questions with Most Answers</h3></div>


<div id= "mostAnsweredQuestionsDisplay">
<div class = "container" >
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
                <div class = "question" >No Questions yet!  &nbsp Refresh page  </div>

              </div>
            </div>
           
              <div class = "col" style="text-align:right"><span></span><span></span><a href ="/"><button id ="refreshTwo"type= "answer">Refresh</button></a></div>
           
          </div>
        </div>
  </div>
  
</div>
</div>

</div>

<div class = "container profiledashboardfooter mt-1" ><h3>Your Recent Questions</h3></div>

<div id= "recentQuestionsDisplay">
<div class = "container" >
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
                <div class = "question" >No Questions yet!  &nbsp Refresh page  </div>

              </div>
            </div>
           
              <div class = "col" style="text-align:right"><span></span><span></span><a href ="/"><button id ="refresh"type= "answer">Refresh</button></a></div>
           
          </div>
        </div>
  </div>
  
</div>
</div>

</div>`;

export default profile;
