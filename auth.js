// Lấy danh sách user đã đăng ký
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Lưu danh sách user
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Lưu user đang đăng nhập
function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

// Lấy user đang đăng nhập
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

// Đăng ký
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();
    const message = document.getElementById("registerMessage");

    if (!name || !email || !password) {
      message.innerText = "Vui lòng nhập đầy đủ thông tin";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    const users = getUsers();
    const existedUser = users.find(user => user.email === email);

    if (existedUser) {
      message.innerText = "Email này đã được đăng ký";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    saveUsers(users);

    message.innerText = "Đăng ký thành công! Chuyển sang đăng nhập...";
    message.className = "text-center mt-4 font-medium text-green-600";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
}

// Đăng nhập
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const message = document.getElementById("loginMessage");

    const users = getUsers();
    const foundUser = users.find(
      user => user.email === email && user.password === password
    );

    if (!foundUser) {
      message.innerText = "Sai email hoặc mật khẩu";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    setCurrentUser(foundUser);

    message.innerText = "Đăng nhập thành công!";
    message.className = "text-center mt-4 font-medium text-green-600";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}
// Quên mật khẩu
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// OTP giả lập
let generatedOtp = null;
let otpTarget = null;

const sendOtpBtn = document.getElementById("sendOtpBtn");
if (sendOtpBtn) {
  sendOtpBtn.addEventListener("click", function () {
    const contact = document.getElementById("forgotContact").value.trim();
    const message = document.getElementById("forgotMessage");
    const users = getUsers();

    if (!contact) {
      message.innerText = "Vui lòng nhập email hoặc số điện thoại";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    const foundUser = users.find(
      user => user.email === contact || user.phone === contact
    );

    if (!foundUser) {
      message.innerText = "Email hoặc số điện thoại chưa được đăng ký";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpTarget = contact;

    message.innerText = "Mã OTP đã gửi: " + generatedOtp + " (demo)";
    message.className = "text-center mt-4 font-medium text-green-600";
  });
}

const forgotPasswordForm = document.getElementById("forgotPasswordForm");
if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const contact = document.getElementById("forgotContact").value.trim();
    const otpCode = document.getElementById("otpCode").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const message = document.getElementById("forgotMessage");

    if (!contact || !otpCode || !newPassword || !confirmPassword) {
      message.innerText = "Vui lòng nhập đầy đủ thông tin";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    if (!generatedOtp || !otpTarget) {
      message.innerText = "Bạn chưa gửi mã OTP";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    if (contact !== otpTarget) {
      message.innerText = "Thông tin nhận mã không khớp";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    if (otpCode !== generatedOtp) {
      message.innerText = "Mã OTP không đúng";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    if (newPassword.length < 6) {
      message.innerText = "Mật khẩu mới phải có ít nhất 6 ký tự";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    if (newPassword !== confirmPassword) {
      message.innerText = "Mật khẩu nhập lại không khớp";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    const users = getUsers();
    const userIndex = users.findIndex(
      user => user.email === contact || user.phone === contact
    );

    if (userIndex === -1) {
      message.innerText = "Không tìm thấy tài khoản";
      message.className = "text-center mt-4 font-medium text-red-500";
      return;
    }

    users[userIndex].password = newPassword;
    saveUsers(users);

    generatedOtp = null;
    otpTarget = null;

    message.innerText = "Đổi mật khẩu thành công! Đang quay lại đăng nhập...";
    message.className = "text-center mt-4 font-medium text-green-600";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
}