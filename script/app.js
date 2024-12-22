const submitBtn = document.querySelector('.submit-btn');
const userCardsContainer = document.querySelector('.user-cards');

const usernameInput = document.querySelector('.username-input');
const firstnameInput = document.querySelector('.firstname-input');
const lastnameInput = document.querySelector('.lastname-input');
const genderInput = document.querySelector('.gender-input');
const ageInput = document.querySelector('.age-input');

const BASE_URL = 'http://localhost:3000/users';

const addUserToDOM = (user) => {
  const userCard = document.createElement('div');
  userCard.classList.add('user-card');

  userCard.innerHTML = `
    <h3>${user.username}</h3>
    <p><strong>First Name:</strong> ${user.firstName}</p>
    <p><strong>Last Name:</strong> ${user.lastName}</p>
    <p><strong>Gender:</strong> ${user.gender}</p>
    <p><strong>Age:</strong> ${user.age}</p>
  `;

  userCardsContainer.appendChild(userCard);
};

const createUser = async (user) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const newUser = await response.json();
      addUserToDOM(newUser); 
    }
  } catch (error) {
    console.error('Foydalanuvchini yaratishda xatolik:', error);
  }
};

submitBtn.addEventListener('click', () => {
  const user = {
    username: usernameInput.value.trim(),
    firstName: firstnameInput.value.trim(),
    lastName: lastnameInput.value.trim(),
    gender: genderInput.value.trim(),
    age: ageInput.value.trim(),
  };

  if (user.username && user.firstName && user.lastName && user.gender && user.age) {
    createUser(user);
    usernameInput.value = '';
    firstnameInput.value = '';
    lastnameInput.value = '';
    genderInput.value = '';
    ageInput.value = '';
  } else {
    alert('Iltimos, barcha maydonlarni to‘ldiring!');
  }
});

const fetchUsers = async () => {
  try {
    const response = await fetch(BASE_URL);
    const users = await response.json();
    userCardsContainer.innerHTML = '';
    users.forEach(addUserToDOM);
  } catch (error) {
    console.error('Foydalanuvchilarni olishda xatolik:', error);
  }
};

window.onload = fetchUsers;
