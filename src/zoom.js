/*
Automatically redirects you from the generic zoom page to the UW SSO page.
*/
var url = window.location.href;
// remove arguments
url = url.split("?")[0];
switch (url) {
  case "https://zoom.us/signin":
    window.location.href = window.location.href.replace(
      "/signin",
      "/web/sso/login"
    );
    break;
  case "https://zoom.us/web/sso/login":
    // autofill form
    var domain = document.getElementById("domain");
    if (domain) {
      domain.value = "washington";
      var script =
        '$(document).ready(function(){$("#sso-login-form .btn").click();});';
      var scriptElement = document.createElement("script");
      scriptElement.innerHTML = script;
      document.body.appendChild(scriptElement);
    }
    break;
}
