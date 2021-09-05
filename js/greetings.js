const loginform = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const HIDDEN_CLASSNAME = 'hidden';
const USERNAME_KEY = 'username';

function submitHandler(name) {
  name.preventDefault();
  loginform.classList.add(HIDDEN_CLASSNAME);
  const userName = loginInput.value;
  localStorage.setItem(USERNAME_KEY, userName);
  paintGreetings(userName);
}

function paintGreetings(username) {
  greeting.innerText = `Hello! ${username}!`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
  loginform.classList.remove(HIDDEN_CLASSNAME);
  loginform.addEventListener('submit', submitHandler);
} else {
  paintGreetings(savedUserName);
}
