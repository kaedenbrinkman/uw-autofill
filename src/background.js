console.log("Background.js Started .. ");

var storedCreds = { usr: null, psw: null, submit: false };
setInterval(function () {
  chrome.storage.local.get(["username", "password", "submit"], function (data) {
    storedCreds.usr = data.username;
    storedCreds.psw = data.password;
    storedCreds.submit = data.submit;
  });
}, 5000);

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log("Background.js: Received message from " + sender.id);
  console.log(request);
  if (request.action == "get_creds") {
    sendResponse({ success: true, usr: storedCreds.usr, psw: storedCreds.psw, submit: storedCreds.submit });
  } else {
    sendResponse({ success: false, error: "Unknown action" });
  }
});
