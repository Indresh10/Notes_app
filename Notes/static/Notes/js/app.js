// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: url,
  signInFlow: "redirect",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId:
        "<your-google-client-id>",
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
