require('../../css/register.css');

const registerForm = () => {
    document.title = "@Shopify-Register";
    const registerArea = document.getElementById('content');
    registerArea.innerHTML = `
        <section id="registerArea">
            <div class="logo3" id="logo3">
                <a href="#home"><span class="logo-title2">@</span>shopify</a>
            </div>
            <div class="form-wrapper" id"form-wrapper">
                <div class="register-title">
                <h2><span class="register-logo"><i></i></span>Create an account</h2> 
                </div>
                <div class="input-container">
                    <input type="text" class="input" id="username" name="username" autocomplete="off" required>
                    <label for="username" class="label-content2"><span class="content-name">Username *</span></label>
                </div>
                <div class="error-content" id="error-content">
                <p>Minimum 5 characters</p>
                </div>
                <div class="error-content" id="nameMsg"></div>
                <div class="input-container">
                    <input type="text" class="input" id="number" name="number" autocomplete="off" required>
                    <label for="number" class="label-content2"><span class="content-name"> Mobile Number *</span></label>
                </div>
                <div class="error-content" id="error-content1">
                <p>Please enter valid  mobile number</p>
                </div>
                <div class="input-container">
                    <input type="text" class="input" id="email" name="email" autocomplete="off" required>
                    <label for="email" class="label-content2"><span class="content-name">Email *</span></label>
                </div>
                <div class="error-content" id="error-content2">
                    <p>Please enter valid email address</p>
                </div>
                <form class="input-container">
                    <input type="password" class="input" id="password" name="password" autocomplete="off" required>
                    <label for="password" class="label-content2"><span class="content-name">Password *</span></label>
                    <div id="eye-toggle" class="eye-toggle"></div>
                </form>
                <div class="error-content" id="error2">
                    <p>Password is invalid</p>
                </div>
                <div class="correct-content" id="correct-content2">
                    <p>Password is valid</p>
                </div>
                <div id="messages">
                    <h4>Password should be</h4>
                    <p id="letter">A <b>lowercase</b> letter</p>
                    <p id="capital">A <b>capital (uppercase)</b> letter</p>
                    <p id="number">A <b>number</b></p>
                    <p id="length">Minimum <b>8 characters</b></p>
                </div>
                <form class="input-container">
                    <input type="password" class="input" id="confirm-password" name="password" autocomplete="off" required>
                    <label for="confirm-password" class="label-content2"><span class="content-name">Confirm password *</span></label>
                    <div id="eye-toggle2" class="eye-toggle"></div>
                </form>
                <div class="error-content" id="error">
                <p>Mismatching password</p>
                </div>
                <div class="correct-content" id="correct-content">
                <p>Password is Matching</p>
                </div>
                <div class="registerButton" id="registerButton">
                    <button class="register-btn" id="register-btn" data-id="">Register</button>
                </div>
                <p class="lead">Already a customer?<a href="#login"> Login</a></p>
                <div class="login-footer2">
                    <span class="copyrights"><i class="fa fa-copyright" aria-hidden="true"></i>2020, @shopify.com, Inc. or its affiliates</span>
                </div>
            </div>
        </section>
    `;
}

module.exports = registerForm;