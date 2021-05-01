initApp = function () {
  firebase.auth().onAuthStateChanged(
    function (user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then((accessToken) => {
          document.getElementById("Uname").innerHTML = displayName;
          document.getElementById("Photo").src = photoURL;
          document.getElementById("account-details").value = JSON.stringify(
            {
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              photoURL: photoURL,
            },
            null,
            " "
          );
          document.getElementById("loader").style.display = "none";
          document.getElementById("content").style.display = "block";
        });
      } else {
        // User is signed out.
        document.getElementById("Uname").innerHTML = "Username";
        document.getElementById("Photo").src = defPhoto;
        document.getElementById("account-details").value = "null";
      }
    },
    function (error) {
      console.error(error);
    }
  );
};

window.addEventListener("load", function () {
  initApp();
});
