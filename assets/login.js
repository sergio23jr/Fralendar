// Initialize Firebase
var config = {
    apiKey: "AIzaSyDO5T58hrlOuSJhKNvgOjeXnrvqWgT41MQ",
    authDomain: "fralendar.firebaseapp.com",
    databaseURL: "https://fralendar.firebaseio.com",
    projectId: "fralendar",
    storageBucket: "fralendar.appspot.com",
    messagingSenderId: "391251924818"
};
firebase.initializeApp(config);

//Create user object - Must be on global scope so it can be accessed by other script pages
var user = {};
var newUser = false;

//Login Event
$(".signin").on("click", e => {
    //Pulls the user input
    const email = $(".email").val();
    const pass = $(".password").val();
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    //If error, log it to the console
    promise.catch(e => console.log(e.message));
    //TODO: If error make it modolo instead of console logging it
    clearInputForms();
});

//Signup Event
$(".register").on("click", e => {
    //TODO - User Input validation
    //Pulls the user input
    const email = $(".email").val();
    const pass = $(".password").val();
    //Sign in
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
    //If error, log it to the console
    promise.catch(e => console.log(e.message));
    //TODO: If error make it modolo instead of console logging it
    newUser = true;
    clearInputForms();
});

$(".logout").on("click", e => {
    //Calls the signout function for firebase
    firebase.auth().signOut();
});

$(".submit-name-zip").on("click", e => {
    //TODO - Input Validation
    //Pulls the user input
    user.name = $(".name-input").val();
    user.zip = $(".zip-input").val();
    //Maybe not the best pratice having it set the whole user log again, but it's what I can think of now
    firebase.database().ref('users/' + user.ID).set({
        name: user.name,
        email: user.email,
        ID: user.ID,
        zip: user.zip
    });
    getNameAndZip();
});

//Add authentication listener
//onAuthStateChanged listens for login or logout
firebase.auth().onAuthStateChanged(firebaseUser => {
    //If there is a user logged in then firebaseUser is true.
    //Need this if statement because the onAuthStateChanged also runs when a user logs out.
    if (firebaseUser) {
        //Important to grab this before doing things below so it can knows where to search in firebase for the user info
        user.ID = firebaseUser.uid;
        getUserData();
        //Checks if the user has a name or zip in firebase
        //If they do not then likely new users and writes the data to firebase and asks for name and zip
        //Needs undefined if they are a new user
        if (newUser === true) {
            writeUserData(firebaseUser);
            getNameAndZip();
        }
        //Shows the div of the login success box
        $(".login-success").show();
        $(".login-form").hide();
        //Displays the username on screen
        displayUserName();
    } else {
        //This runs when no user is logged in
        console.log("Logged Out");
        $(".login-success").hide();
        $(".input-name-zip").hide();
        $(".login-form").show();
        //Clears the user object to show that they logged out
        user = {};
        //This updates the text fields so if the user logs out the registers again it shows null
        clearNameDisplay();
    };
});

function getNameAndZip() {
    if (user.name === null || user.zip === null || user.name === undefined) {
        $(".input-name-zip").show();
    } else {
        //This will run when there is both a user.name and a user.zip
        $(".input-name-zip").hide()
    }
};

function getUserData() {
    //Gets the user info from firebase using the user ID
    return firebase.database().ref(`users/${user.ID}`).once("value").then(function (snap) {
        user.email = snap.val().email;
        user.name = snap.val().name;
        user.zip = snap.val().zip;
        getNameAndZip();
    });
};

//Populates the user profile in the window & database when a new user registers
function writeUserData(firebaseUser) {
    //Updates the new user as they will be written into the database
    newUser = false;
    user.ID = firebaseUser.uid;
    user.email = firebaseUser.email;
    firebase.database().ref(`users/${user.ID}`).set({
        email: user.email,
        ID: user.ID
    });
};

function displayUserName() {
    firebase.database().ref(`users/${user.ID}`).on("value", function (snap) {
        $(".name-display").html(snap.val().name);
        $(".zip-display").html(snap.val().zip);
    })
};

function clearNameDisplay() {
    $(".name-display").html(``);
    $(".zip-display").html(``);
};

function clearInputForms() {
    //Clears the input forms
    $(".email").val(``);
    $(".password").val(``);
}

$(".login-success").hide();
$(".input-name-zip").hide();