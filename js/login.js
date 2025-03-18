const loginForm = document.querySelector('.LoginForm')
const RegisterForm = document.querySelector('.RegisterForm')
const registerLink = document.querySelector('.RegisterLink')
const loginLink = document.querySelector('.loginLink')
registerLink.onclick=()=>{
    RegisterForm.classList.add('active')
    loginForm.classList.add('active')
}
loginLink.onclick=()=>{
    RegisterForm.classList.remove('active')
    loginForm.classList.remove('active')
}