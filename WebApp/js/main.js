var orgList = [];
function defaultOrgList() {
    if (orgList.length == 0) {
        orgList = JSON.parse(localStorage.getItem("orgkey"));
        for (var i = 0 ; i< orgList.length ; i++) {
            document.getElementById("userOrg").innerHTML += "<option value="+i+">"+orgList[i]+"</option>";
            document.getElementById("orgTop").innerHTML += "<option value="+i+">"+orgList[i]+"</option>";
        }
    }
}
function showSignUpPage() {
    localStorage.removeItem("orgKey");
    orgList = JSON.parse(localStorage.getItem("orgkey"));
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display ="block";
    for (var i = 0 ; i< orgList.length ; i++) {
        document.getElementById("userOrg").innerHTML += "<option value="+i+">"+orgList[i]+"</option>";
        document.getElementById("orgTop").innerHTML += "<option value="+i+">"+orgList[i]+"</option>";
    }
}
function AddOrgIntoList() {
    var newOrg = document.getElementById("addOrg").value;
    if (newOrg.length >= 3) {
        orgList.push(newOrg);
        localStorage.setItem("orgkey", JSON.stringify(orgList));
        var i = orgList.indexOf(newOrg)
        document.getElementById("userOrg").innerHTML += "<option value=" + i + " selected>" + orgList[i] + "</option>";
        document.getElementById("orgTop").innerHTML += "<option value=" + i + " selected>" + orgList[i] + "</option>";
    }
    $('#addOrgModel').modal('hide');
}
function showForgotPassword() {
    console.log("Showing Forgot Password Page");
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display ="none";
    document.getElementById("reset-password").style.display ="block";
}
function validateLoginForm() {
    var x = document.forms["loginForm"]["email"].value;
    var y = document.forms["loginForm"]["pwd"].value;
    var userIsAdmin = false;
    var loginSuccess = false;
    var enhetArray = allStorage(),keys = Object.keys(enhetArray),
    i = keys.length;
    var welcomeName ;
    while ( i-- ) {
        if ((enhetArray[keys[i]].userEmail == x || enhetArray[keys[i]].userId == x) && enhetArray[keys[i]].userPwd == y) {
            loginSuccess = true;
            userIsAdmin = enhetArray[keys[i]].admin;
            welcomeName =  enhetArray[keys[i]].userName;
        }  
    }
    if (loginSuccess) {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("welcome-page").style.display ="block";
        document.getElementById("org-in-header").style.display = "block";
        document.getElementById("signout-menu").style.display ="block";
        document.getElementById("welcome-user").innerHTML = "Welcome "+welcomeName+" !";
        document.getElementById("mobileViewUserName").innerHTML = welcomeName;
        defaultOrgList();
        if (userIsAdmin) {
            adminUserDetails();
        } else {
            document.getElementById("add-user-button").style.display = "none";
            document.getElementById("editAdmin").style.display = "none";
            document.getElementById("deleteAdmin").style.display = "none";
            userDetails();
        }
        return false;
    } else {
        document.getElementById("login-error").innerHTML = "Invalid Login Credentials";
        return false;
    }
}
function AddOrgModel() {
    console.log("clicked");
    return false;
}
function changePassword() {
    var userIdOrEmail = document.getElementById("changeId").value;
    var newPassword = document.getElementById("newPwd").value;
    var confirmPassword = document.getElementById("newCPwd").value;
    if (!validatePassword(newPassword)) {
        document.getElementById("changePwd-error").innerHTML = "Password Not Valid"
        return false;
    } else {
        document.getElementById("changePwd-error").style.display = "none";
    }
    if (newPassword != confirmPassword) {
        document.getElementById("changePwd-error").innerHTML = "Two Password are not same";
        document.getElementById("changePwd-error").style.display = "block";
        return false;
    } else {
        document.getElementById("changePwd-error").style.display = "none";
    }
    var passwordChanged = false;
    var isAdmin = false;
    var enhetArray = allStorage(),keys = Object.keys(enhetArray),i = keys.length;
    var welcomeName;
    while (i--) {
        if (enhetArray[keys[i]].userEmail == userIdOrEmail || enhetArray[keys[i]].userId == userIdOrEmail){
            passwordChanged = true;
            enhetArray[keys[i]].userPwd = newPassword;
            isAdmin = enhetArray[keys[i]].admin;
            welcomeName =  enhetArray[keys[i]].userName;
            localStorage.setItem(enhetArray[keys[i]].userId,JSON.stringify(enhetArray[keys[i]]));
            document.getElementById("mobileViewUserName").innerHTML = enhetArray[keys[i]].userName;
        }  
    }
    if (passwordChanged) {
        document.getElementById("reset-password").style.display = "none";
        document.getElementById("login-form").style.display = "none";
        document.getElementById("welcome-page").style.display = "block";
        document.getElementById("org-in-header").style.display = "block";
        document.getElementById("signout-menu").style.display = "block";
        document.getElementById("welcome-user").innerHTML = "Welcome " + welcomeName + "!";
        document.getElementById("mobileViewUserName").innerHTML = welcomeName;
        defaultOrgList();
        if (isAdmin) {
            adminUserDetails();
        } else {
            document.getElementById("add-user-button").style.display = "none";
            document.getElementById("editAdmin").style.display = "none";
            document.getElementById("deleteAdmin").style.display = "none";
            userDetails();
        }
        return false;
    } else {
       return false;
    }
}
function validateRegForm() {
     var userId = document.getElementById("userId").value;
     var userName = document.getElementById("userName").value;
     var userEmail = document.getElementById("userEmail").value;
     var userPwd = document.getElementById("userPwd").value;
     var userDob = document.getElementById("userDob").value;
     var userOrg = document.getElementById("userOrg").value;
     var userIsAdmin = document.getElementById("userIsAdmin").checked;
     var validUserId = true, validUserName = true, validUserEmail = true, validPwd = true;
    if(!validateUserId(userId)){
        validUserId = false;
        document.getElementById("userId-error").innerHTML = "User Id is not valid"; 
    } else {
        document.getElementById("userId-error").style.display = "none";
    }
    if(!validateEmail(userEmail)){
        validUserEmail = false;
        document.getElementById("userEmail-error").innerHTML = "User Email is not valid";
    } else {
        document.getElementById("userEmail-error").style.display = "none";
    }
    if(!validatePassword(userPwd)){
        validPwd = false;
        document.getElementById("userPwd-error").innerHTML = "User Password is not valid";
    } else {
        document.getElementById("userPwd-error").style.display = "none";
    }
    if (userName.length < 4) {
        document.getElementById("userName-error").innerHTML = "User Name is not valid";
    } else {
        document.getElementById("userName-error").style.display = "none";
    }
    if (!userOrg) {
        document.getElementById("userOrg-error").innerHTML = "Please select an Org";
    } else {
        document.getElementById("userOrg-error").style.display = "none";
    }
    if (!validUserId || !validUserEmail || !validPwd || !validUserName) {
        return false;
    } else {
        var userModel = {"userId" : userId , "userName" : userName , "userEmail" : userEmail , "userPwd" : userPwd, "userDob" : userDob
        ,"userOrg" : userOrg , "admin" : userIsAdmin};
       localStorage.setItem(userId,JSON.stringify(userModel));
       document.getElementById("login-form").style.display = "none";
       document.getElementById("welcome-page").style.display ="block";
       document.getElementById("org-in-header").style.display = "block";
       document.getElementById("signout-menu").style.display ="block";
       document.getElementById("signup-form").style.display = "none";
       document.getElementById("welcome-user").innerHTML = "Welcome "+userName;
       document.getElementById("mobileViewUserName").innerHTML = userName;
       defaultOrgList();
       if (document.getElementById("userIsAdmin").checked) {
            adminUserDetails();
        } else {
            document.getElementById("add-user-button").style.display = "none";
            document.getElementById("editAdmin").style.display = "none";
            document.getElementById("deleteAdmin").style.display = "none";
            userDetails();
       }
       return false;
    }
}

function validateAddUserForm() {
    var userId = document.getElementById("uid").value;
     var userName = document.getElementById("uname").value;
     var userEmail = document.getElementById("uemail").value;
     var userPwd = document.getElementById("upwd").value;
     var userDob = document.getElementById("dob").value;
     var userOrg = document.getElementById("org").value;
     var validUserId = true, validUserName = true, validUserEmail = true, validPwd = true;
    if(!validateUserId(userId)){
        validUserId = false;
        document.getElementById("uid-error").innerHTML = "Id is not valid (valid ex :- S123)"; 
    } else {
        document.getElementById("uid-error").style.display = "none";
    }
    if(!validateEmail(userEmail)){
        validUserEmail = false;
        document.getElementById("uemail-error").innerHTML = "Email is not valid";
    } else {
        document.getElementById("uemail-error").style.display = "none";
    }
    if(!validatePassword(userPwd)){
        validPwd = false;
        document.getElementById("upwd-error").innerHTML = "Password is not valid valid:- Pasf@3134";
    } else {
        document.getElementById("upwd-error").style.display = "none";
    }
    if (userName.length < 4) {
        document.getElementById("uname-error").innerHTML = "Name is not valid";
    } else {
        document.getElementById("uname-error").style.display = "none";
    }
    if (!validUserId || !validUserEmail || !validPwd || !validUserName) {
        
    } else {
        var userModel = {"userId" : userId , "userName" : userName , "userEmail" : userEmail , "userPwd" : userPwd, "userDob": userDob
        ,"userOrg" : userOrg , "admin" : userIsAdmin};
        localStorage.setItem(userId,JSON.stringify(userModel));
       document.getElementById("myTB").innerHTML = '';
       adminUserDetails();
       $('#addUserModel').modal('hide');
    }
}


function checkLoginDetails() {
    for(i=0;i<a.length;i++){
        console.log(a[i].name);
    }
}

function validateSigInForm(){
    
}

function logoutUser() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("welcome-page").style.display ="none";
    document.getElementById("org-in-header").style.display = "none";
    document.getElementById("signout-menu").style.display ="none";
    document.getElementById("signup-form").style.display = "none";
}
function validateSignUpForm(){
   console.log(document.getElementById("Uid"));
   return false;
}

function validateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var re = new RegExp(mailformat);
    if (re.test(inputText)) {
        return true;
    } else {
        return false;
    }

}

function validateUserId(userId){
    var re = new RegExp("[A-Za-z]{1}[0-9]{3}");
    if (re.test(userId)) {
        return true;
    } else {
        return false;
    }
     
}

function validatePassword(password) {
    var re = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,10}$/);
    if (re.test(password)) {
        return true;
    } else {
        return false;
    }
}

function allStorage() {
    var archive = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        archive[keys[i]] = JSON.parse(localStorage.getItem( keys[i] ));

    }
    return archive;
}

function filterByOrg() {
    var orgName = document.getElementById("orgTop").value;
    document.getElementById("myTB").innerHTML = '';
    var enhetArray = allStorage(), keys = Object.keys(enhetArray),
    i = keys.length;
    while (i--) {
        if (enhetArray[keys[i]].userOrg == orgName) {
            var table = "<tr><td>" + enhetArray[keys[i]].userId + "</td><td>" + enhetArray[keys[i]].userName + "</td><td>" + enhetArray[keys[i]].userEmail + "</td><td>" + enhetArray[keys[i]].userDob + "</td><td data-toggle='modal' href='#addUserModel'><i class='fa fa-edit' onclick='editUser(this)'></i></td><td><i class='fa fa-trash' onclick='deleteRow(this)'></i></td>" + "</td></tr>";
            document.getElementById("myTB").innerHTML += table;
        }
    }
}

function SearchTableData() {
    var searchText = document.getElementById("search-bar").value;
    if (searchText.length > 0) {
        document.getElementById("myTB").innerHTML = '';
        var enhetArray = allStorage(),keys = Object.keys(enhetArray),
        i = keys.length;
        while ( i-- ) {
            if (enhetArray[keys[i]].userId == searchText || enhetArray[keys[i]].userName == searchText || enhetArray[keys[i]].userEmail == searchText ){
                var table ="<tr><td>"+enhetArray[keys[i]].userId+"</td><td>"+enhetArray[keys[i]].userName+"</td><td>"+enhetArray[keys[i]].userEmail+"</td><td>"+enhetArray[keys[i]].userDob+"</td><td data-toggle='modal' href='#addUserModel'><i class='fa fa-edit' onclick='editUser(this)'></i></td><td><i class='fa fa-trash' onclick='deleteRow(this)'></i></td>"+"</td></tr>";
                document.getElementById("myTB").innerHTML += table;  
            }
        }
    } else {
       adminUserDetails();
    }
}
function adminUserDetails(){
    var enhetArray = allStorage(),keys = Object.keys(enhetArray),
    i = keys.length;
    while ( i-- ) {
        var table ="<tr><td>"+enhetArray[keys[i]].userId+"</td><td>"+enhetArray[keys[i]].userName+"</td><td>"+enhetArray[keys[i]].userEmail+"</td><td>"+enhetArray[keys[i]].userDob+"</td><td data-toggle='modal' href='#addUserModel'><i class='fa fa-edit' onclick='editUser(this)'></i></td><td><i class='fa fa-trash' onclick='deleteRow(this)'></i></td>"+"</td></tr>";
        document.getElementById("myTB").innerHTML += table;   
      }
}
function userDetails() {
    var enhetArray = allStorage(),keys = Object.keys(enhetArray),
    i = keys.length;
    while ( i-- ) {
        var table ="<tr><td>"+enhetArray[keys[i]].userId+"</td><td>"+enhetArray[keys[i]].userName+"</td><td>"+enhetArray[keys[i]].userEmail+"</td><td>"+enhetArray[keys[i]].userDob+"</td></tr>";
        document.getElementById("myTB").innerHTML += table;   
      }
}
 
function editUser(r) {
    var i= r.parentNode.parentNode.rowIndex;
    keys = Object.keys(localStorage);
    var user = localStorage.getItem(keys[i-1]);
    console.log(user);
    user = JSON.parse(user);
    console.log(user);
    console.log(user.userId);
    document.getElementById("uid").value = user.userId;
    document.getElementById("uname").value = user.userName;
    document.getElementById("uemail").value = user.userEmail;
    document.getElementById("upwd").value = user.userPwd;
}
function deleteRow(r) {
    var i= r.parentNode.parentNode.rowIndex;
    keys = Object.keys(localStorage);
    var answer = window.confirm("Do you want to delete this user ?");
    if(answer){
        localStorage.removeItem(keys[i-1]);
        document.getElementById("myTB").innerHTML = '';
        adminUserDetails();
    }else{
        console.log("it worked");
    }
    
}
function openNav() {
    document.getElementById("mySidepanel").style.width = "200px";
    document.getElementById("user-icon-mobile").style.display = "none";
} 
function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("user-icon-mobile").style.display = "block";
}