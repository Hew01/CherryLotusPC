"use strict";

// logic for header, modal and form
window.addEventListener('DOMContentLoaded', () => {
  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

  const headerLoginBtnElements = $$(".header__login-btn");
  const headerSignUpBtnElements = $$(".header__signup-btn");
  const modalElement = $(".modal");
  const loginFormElement = $(".login-form");
  const signUpFormElement = $(".signup-form");
  const forgotPasswordFormElement = $(".forgot-password-form");
  const formCloseBtnElements = $$(".form__close-btn");
  const navigateForgotPasswordBtnElement = $(".form__forgot-password");
  const navigateSignUpBtnElement = $(".signup-navigate-button");
  const navigateLoginBtnElements = $$(".login-navigate-button");
  const loginSubmitBtnElement = $(".form__login-btn");
  const signUpSubmitBtnElement = $(".form__signup-btn");
  const formInputs = $$(".form__input");
  const forgotPasswordSubmitBtnElement = $(".form__forgot-password-submit-btn");
  const headerAccountBoxElement = $(".header__account-box");
  const headerAccountTextElement = $(".header__account-btn .header__text");
  const headerUsernameElement = $(".header__user-info p");
  const headerLogoutBtnElement = $(".header__logout-btn");
  const headerCartLinkElement = $(".header__cart a");
  const headerCartBadge = $('.header__cart-badge')

  // function check valid email
  const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const updateCartNumber = (currentUser) => {
    fetch(`http://localhost:3000/cart/number-product/${currentUser._id}`)
      .then(response => response.json())
      .then(data => headerCartBadge.innerText = data.numberOfProduct)
      .catch(err => console.log(err))
  }

  // check current user
  const checkCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      headerAccountBoxElement.classList.remove("logined");
      headerAccountTextElement.innerText = "Đăng nhập";
      headerCartLinkElement.setAttribute("href", `#`);
    } else {
      headerAccountBoxElement.classList.add("logined");
      headerAccountTextElement.innerText = currentUser.username;
      headerCartLinkElement.setAttribute("href", `/cart/${currentUser?._id}`);
      headerUsernameElement.innerText = `Xin chào ${currentUser.username}!`;
      updateCartNumber(currentUser)
    }
  };

  const clearInputFields = () => {
    formInputs.forEach((input) => {
      input.value = "";
      input.style.border = "1px solid #000";
    });
  };

  // handle events
  window.onload = () => {
    updateCartNumber(JSON.parse(localStorage.getItem('currentUser')))
  }

  headerLoginBtnElements.forEach(btn => {
    btn.onclick = function(e) {
      modalElement.classList.add("active");
      loginFormElement.classList.add("active");
    }
  })
 
  headerSignUpBtnElements.forEach(btn => {
      btn.onclick = function(e) {
        modalElement.classList.add("active");
        signUpFormElement.classList.add("active");
      }
  })

  formCloseBtnElements.forEach((btn) => {
    btn.onclick = function (e) {
      signUpFormElement.classList.remove("active");
      loginFormElement.classList.remove("active");
      forgotPasswordFormElement.classList.remove("active");
      modalElement.classList.remove("active");
      clearInputFields();
    };
  });

  navigateSignUpBtnElement.onclick = function (e) {
    clearInputFields()
    loginFormElement.classList.remove("active");
    signUpFormElement.classList.add("active");
  };

  navigateForgotPasswordBtnElement.onclick = function (e) {
    clearInputFields()
    loginFormElement.classList.remove("active");
    forgotPasswordFormElement.classList.add("active");
  };

  navigateLoginBtnElements.forEach((btn) => {
    btn.onclick = function (e) {
      clearInputFields()
      signUpFormElement.classList.remove("active");
      forgotPasswordFormElement.classList.remove("active");
      loginFormElement.classList.add("active");
    };
  });

  // ẩn thông báo lỗi cho các thẻ input(nếu có)
  formInputs.forEach((input) => {
    input.onfocus = function (e) {
      formInputs.forEach(
        (remainInput) => (remainInput.style.border = "1px solid #000")
      );
      e.target.parentElement
        .querySelector(".form__error-message")
        .classList.remove("active");
      e.target.style.border = "1px solid #4399fa";
    };
  });

  headerLogoutBtnElement.onclick = function (e) {
    localStorage.clear();
    headerAccountBoxElement.classList.remove("logined");
    headerCartLinkElement.setAttribute("href", `#`);
    headerAccountTextElement.innerText = "Đăng nhập";
    window.location.href = "/";
  };

  // logic for submit login form
  loginSubmitBtnElement.onclick = function (e) {
    e.preventDefault();
    const emailElement = e.target.parentElement.querySelector(
      "input[name|='email']"
    );
    const passwordElement = e.target.parentElement.querySelector(
      "input[name|='password']"
    );

    if (!isValidEmail(emailElement.value.trim())) {
      emailElement.parentElement.querySelector(
        ".form__error-message"
      ).innerText = "Email của bạn không hợp lệ!";
      emailElement.parentElement
        .querySelector(".form__error-message")
        .classList.add("active");
      emailElement.style.border = "1px solid red";
      return;
    }

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      cors: "cors",
      body: JSON.stringify({
        email: emailElement.value.trim(),
        password: passwordElement.value.trim(),
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 400) {
          window.alert("Email của bạn không tồn tại!");
          emailElement.value = "";
          emailElement.focus();
          return;
        }
        if (response.status === 404) {
          window.alert("Mật khẩu không chính xác!");
          return;
        }
        return response.json();
      })
      .then((data) => {
        const currentUser = data.currentUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        headerAccountTextElement.innerText = currentUser.username;
        headerAccountBoxElement.classList.add("logined");
        headerUsernameElement.innerText = `Xin chào ${currentUser.username}!`;
        headerCartLinkElement.setAttribute("href", `/cart/${currentUser?._id}`);
        window.alert("Đăng nhập thành công!");
        clearInputFields();
        modalElement.classList.remove("active");
        loginFormElement.classList.remove("active");

        updateCartNumber(currentUser)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // logic for signUp form
  signUpSubmitBtnElement.onclick = function (e) {
    e.preventDefault();
    const emailElement = e.target.parentElement.querySelector(
      "input[name|='email']"
    );
    const usernameElement = e.target.parentElement.querySelector(
      "input[name|='username']"
    );
    const passwordElement = e.target.parentElement.querySelector(
      "input[id|='password']"
    );
    const confirmationPasswordElement = e.target.parentElement.querySelector(
      "input[id|='confirmation']"
    );
    if (!isValidEmail(emailElement.value.trim())) {
      emailElement.parentElement.querySelector(
        ".form__error-message"
      ).innerText = "Email của bạn không hợp lệ!";
      emailElement.parentElement
        .querySelector(".form__error-message")
        .classList.add("active");
      emailElement.style.border = "1px solid red";
      return;
    }

    if (
      confirmationPasswordElement.value.trim() !== passwordElement.value.trim()
    ) {
      confirmationPasswordElement.parentElement.querySelector(
        ".form__error-message"
      ).innerText = "Xác nhận mật khẩu không chính xác!";
      confirmationPasswordElement.parentElement
        .querySelector(".form__error-message")
        .classList.add("active");
      confirmationPasswordElement.style.border = "1px solid red";
      return;
    }

    fetch("http://localhost:3000/users/register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        username: usernameElement.value.trim(),
        email: emailElement.value.trim(),
        password: passwordElement.value.trim(),
      }),
    })
      .then((response) => {
        if (response.status === 400) {
          window.alert("Email của bạn đã tồn tại!");
          formInputs.forEach((input) => {
            input.style.border = "1px solid #000";
            input.value = "";
          });
          return;
        }
        return response.json();
      })
      .then((data) => {
        const currentUser = data.currentUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        headerAccountTextElement.innerText = currentUser.username;
        headerAccountBoxElement.classList.add("logined");
        headerUsernameElement.innerText = `Xin chào ${currentUser.username}!`;
        headerCartLinkElement.setAttribute("href", `/cart/${currentUser?._id}`);
        window.alert("Đăng ký tài khoản mới thành công!");
        clearInputFields();
        signUpFormElement.classList.remove("active");
        modalElement.classList.remove("active");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // call functions
  checkCurrentUser();
});
