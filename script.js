
const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const positionInput = document.getElementById('position');
const statusInput = document.getElementById('status');
const submitBtn = document.getElementById('submitBtn');

let isEditMode = false;                  //false ---> ADD Mode, true ----> EDIT Mode 
let editUserId = null;            //temporarily holds the id of the user being edited--knowing which user to update




// ==================== Render Users on Page ====================

 
//async function because it uses await to handle asynchronous code like fetch

async function renderUsers() {
  const res = await fetch('http://localhost:3000/users');      //Get request to fetch all users from local json server at the users endpoint 
  const users = await res.json();                //Converts the response object into JS object/array using json()
  console.log(users);

  userList.innerHTML = '';                         // Clear old content

  //Loop over each user in the fetched users array
  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';

    userCard.innerHTML = `
      <p><strong>ID:</strong> ${user.id}</p>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Position:</strong> ${user.position}</p>
      <p><strong>Status:</strong> ${user.status}</p>
      
      <div class="actions">
        <button onclick="editUser('${user.id}')">Edit</button>
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </div>
    `;

    userList.appendChild(userCard);
  });
}



// ================== Add / Update User ===================


userForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const newUser = {
    id: idInput.value.trim(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    position: positionInput.value.trim(),
    status: statusInput.value.trim()
  };

  if (isEditMode) {
 
   //  Update user
    await fetch(`http://localhost:3000/users/${editUserId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },           //tells server we are sending json object
      body: JSON.stringify(newUser)                             //converts json object to string format 
    });

    resetForm();                                          //in case if put fails, then leave the edit mode-- Clears input and resets internal form logic (edit mode, label, etc.)
  } 
  else {
    //  Check if ID already exists
    const res = await fetch(`http://localhost:3000/users/${newUser.id}`);
    if (res.ok) {
      alert(' A user with this ID already exists.');
      return;
    }


    //  Create new user
    await fetch('http://localhost:3000/users', {
      method: 'POST',                                      //Post method tells the server to add a new record
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)                        
    });

    userForm.reset();                //clears only input fields
  }

  renderUsers();             //After the creation/updation it refreshes the user to represent latest data
});



// ======================= Edit User =====================

async function editUser(id) {
  const res = await fetch(`http://localhost:3000/users/${id}`);
  
  if (!res.ok) {
    alert('User not found for editing.');
    return;
  }

  const user = await res.json();

  idInput.value = user.id;
  nameInput.value = user.name;
  emailInput.value = user.email;
  positionInput.value = user.position;
  statusInput.value = user.status;

  isEditMode = true;
  editUserId = user.id;

  idInput.readOnly = true;
  submitBtn.textContent = 'Update';
}


// ==================== Delete User =================


async function deleteUser(id) {
  const confirmDelete = confirm('Are you sure you want to delete this user?');
  if (!confirmDelete) return;

  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    alert('Error deleting user.');
    return;
  }

  renderUsers();
}

// ==================== Reset Form State ==================

function resetForm() {
  userForm.reset();
  isEditMode = false;
  editUserId = null;
  idInput.readOnly = false;
  submitBtn.textContent = 'Add User';
}

// ============= Load on Start ============
window.addEventListener('DOMContentLoaded', renderUsers);



// // # To restart:
// // 1. cd into this folder

// // 2. Run: json-server --watch db.json --port 3000
