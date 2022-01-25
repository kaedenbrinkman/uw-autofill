function update() {
  var username = document.getElementById("usr").value;
  var password = document.getElementById("psw").value;
  var submit = document.getElementById("submit").checked;
  document.write("Saved");
  chrome.storage.local.set({ username: username }, function () {});
  chrome.storage.local.set({ password: password }, function () {});
  chrome.storage.local.set({ submit: submit }, function () {});
}
function load() {
  chrome.storage.local.get(["username", "password", "submit"], function (data) {
    if (data && data.username && data.password) {
      document.getElementById("usr").value = data.username;
      document.getElementById("psw").value = data.password;
      document.getElementById("submit").checked = data.submit;
    }
  });
}

window.addEventListener("load", function (event) {
  load();
  document.getElementById("save").onclick = update;
});
