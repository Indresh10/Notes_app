// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: url,
  signInFlow: "redirect",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId:
        "872499042379-1oflek2nmr0j5khn55d3m17ho9e5o0mv.apps.googleusercontent.com",
      customParameters: {
        // Forces account selection even when one account is available.
        prompt: "select_account",
      },
    },
  ],
  tosUrl: "<your-tos-url>",
  privacyPolicyUrl: () => {
    window.location.assign("<your-privacy-policy-url>");
  },
  //One Tap Signin
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.disableAutoSignIn();
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
