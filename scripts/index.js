// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

//Account deatils
const accountDetails = document.querySelector('.account-details');

// LogIn and LogOut
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
  if(user) {
    // account information
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div>Name : <strong>${doc.data().name}</strong></div>
      <div>Logged in as : <strong>${user.email}</strong></div>
      <div>Bio : <strong>${doc.data().bio}</strong></div>
      `;
      accountDetails.innerHTML = html;
    })
    
    //toogle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //hide account information
    accountDetails.innerHTML = '';
    // toogle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// setup task
const taskList = document.querySelector('.tasks');
const setupTask= (data) => {

  if(data.length) {
    let html = '';
    data.forEach(doc => {
        const task = doc.data();
        const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${task.title}</div>
          <div class ="collapsible-body white">${task.content}</div>
        </li>
        `;
        html += li
    })

    taskList.innerHTML = html;
  } else {
    taskList.innerHTML = '<h5 class="center-align">Login to view tasks</h5>'
  }
}
