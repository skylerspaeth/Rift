document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    console.log(app);
});


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(result => {
        const user = result.user;
        document.write(`Welcome ${user.displayName}`);
        console.log(user);
    })
    .catch(console.log("There was an error while logging in with google"));
}