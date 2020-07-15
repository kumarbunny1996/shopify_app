require('../../css/login.css');

const loginForm = () => {
    document.title = "@shopify Login";
    const loginArea = document.getElementById('content');
    loginArea.innerHTML = `
        <section class="loginArea" id="loginArea">
            <div class="logo2" id="logo2">
                <a href="#home"><span class="logo-title">@</span>shopify</a>
            </div>
            <div class="form" id"form">
                <div class="login-title">
                <h1><span class="login-logo"><i></i></span>Login</h1> 
                </div>
                <div class="form-content">
                    <input type="text" class="user-input" id="user-input" name="email/phone number" autocomplete="off" required>
                    <label for="user-input" class="label-content"><span class="content2">Email/Mobile Number *</span></label>
                </div>
                <div class="errorMsg" id="errorMsg"style="display:none">
                    <p>Invalid user email address or mobile number</p>
                </div>
                <form class="form-content">
                    <input type="password" class="user-input" id="password" name="password" autocomplete="off" required>
                    <label for="password" class="label-content"><span class="content2">Password *</span></label>
                </form>
                <div class="errorMsg" id="errorMsg2" style="display:none">
                <p>Invalid  user password</p>
                </div>
                <div class="check">
                    <input type="checkbox" id="toggle">
                    <label>Show password</label>
                </div>
                <div class="button">
                    <button class="btn" id="login-btn" data-id="">Sign in</button>
                </div>
                <h3 class="option-login">or</h3>
                <div class="google-sign">
                    <div class="google-logo"></div>
                    <button class="google-btn">Login with Google</button>
                </div>
                <h5 style="text-align:left;">New customer</h5>
                <div class="button">
                    <button class="btn" id="create-btn" data-id="">Create an account</button>
                </div>
                <div class="login-footer">
                <span class="footer-rights2"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @shopify.com, Inc. or its affiliates</span>
            </div>
            </div>
        </section>        
    `;

}


module.exports = loginForm;