// auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        //getting data
db.collection('task').onSnapshot(snapshot => {
    setupTask(snapshot.docs);
    setupUI(user);
}, err => {
    console.log(err.message);
})
    }else {
        setupUI();
        setupTask([]);
    }
})

// create task
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('task').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        //close the form and reset
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
    })


// SIGNUP
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // getting user information
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // user signup
    auth.createUserWithEmailAndPassword(email,password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['signup-name'].value,
            bio: signupForm['signup-bio'].value
        })
       
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
})

//LOGOUT
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
})

//LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //getting user information
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})