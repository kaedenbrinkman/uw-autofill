console.log("Autofill.js Started .. ");
var script = `
function autoFill(usr, psw, submit) {
  var loginField = document.getElementById("weblogin_netid");
  var passwordField = document.getElementById("weblogin_password");
  var submitBtn = document.getElementById("submit_button");
  console.log(submit);

  if (loginField && passwordField) {
    loginField.value = usr;
    passwordField.value = psw;
    if (submit) {
      window.addEventListener("load", function (event) {
        submitBtn.click();
      });
    }
  } else {
    console.log("Error: Could not find login fields");
  }
}

// REPLACE EXTENSION ID HERE
var editorExtensionId = "alcbpiinmgagjoipchmmdppiolamgagp";

// Make a simple request:
chrome.runtime.sendMessage(editorExtensionId, { action: "get_creds" }, function (response) {
  if (response && response.success && response.usr && response.psw) {
      autoFill(response.usr, response.psw, response.submit);
  } else {
    console.log("Error: Could not find credentials");
    console.log(response);
  }
});
`;
// Add the script to the page:
var scriptElement = document.createElement("script");
scriptElement.innerHTML = script;
document.body.appendChild(scriptElement);
