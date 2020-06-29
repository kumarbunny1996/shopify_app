require('../../css/login.css');

const loginForm = () => {
    document.title = "@shopify Login";
    document.body.innerHTML = `
        <div class="logo2" id="logo2">
            <a href="#home"><span class="logo-title">@</span>shopify</a>
        </div>
        <form class="form" id"form">
            <div class="login-title">
               <h1><span class="login-logo"><i></i></span>Login</h1> 
            </div>
            <div class="form-content">
                <input type="text" class="user-input" id="user-input" name="email/phone number" autocomplete="off" required>
                <label for="user-input" class="label-content"><span class="content2">Email/Mobile Number</span></label>
            </div>
            <div class="errorMsg" style="display:none">
                <p>invalid user</p>
            </div>
            <div class="form-content">
                <input type="password" class="user-input" id="password" name="password" autocomplete="off" required>
                <label for="password" class="label-content"><span class="content2">Password</span></label>
            </div>
            <div class="errorMsg" style="display:none">
               <p>invalid password</p>
            </div>
            <div class="check">
                <input type="checkbox" id="toggle">
                <label>Show password</label>
            </div>
            <div class="button">
                <a href="#" class="login-btn" id="login-btn" data-id="">Sign in</a>
            </div>
            <h3 class="option-login">or</h3>
            <div class="google-sign">
                <div class="google-logo"></div>
                <a href="#" class="google-btn">Login with Google</a>
            </div>
            <h5>New customer</h5>
            <div class="button" style="margin-top:10px">
                <a href="#register" class="login-btn" id="create-btn" data-id="">Create an account</a>
            </div>
        </form>
        <div class="login-footer">
            <span class="footer-rights2"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @shopify.com, Inc. or its affiliates</span>
        </div>
    `;
}


module.exports = loginForm;