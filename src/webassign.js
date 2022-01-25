/*
WebAssign features:
- Automatic SSO login: Will redirect to the UW login from the generic login or the root domain.
- Collapse questions: Click the header of a question to collapse it. Saves which questions are collapsed in localStorage.
- Auto-scroll: Better scroll to the relevant question after submit, if no question specified will scroll to the first non-collapsed question.
*/

var url = window.location.href;
if (
  url.indexOf("account.cengage.com/login") > -1 ||
  url.indexOf("account.cengage.com/logout") > -1 ||
  url == "https://www.webassign.net/"
) {
  // AUTOMATIC UW SSO LOGIN FOR WEBASSIGN
  window.location.href =
    "https://www.webassign.net/Shibboleth2.sso/Login?providerId=urn:mace:incommon:washington.edu&target=https://www.webassign.net/Shib2-bin/washington4.pl";
} else if (url.indexOf("webassign.net/web/Student") > -1) {
  // ENABLE CLICKING QUESTION HEADERS TO TOGGLE THEM
  // STORE HIDDEN QUESTIONS IN LOCAL STORAGE
  var scriptElement2 = document.createElement("script");
  var script2 = `
  setTimeout(function () {
    jQuery(".js-question-header").click(function (e) {
      if (e.target.tagName == "SECTION") {
        console.log(e.target.tagName);
        var id = jQuery(this).parent().attr("id");
        jQuery(this).parent().find(".qUtility").toggle();
        localStorage.setItem(id, jQuery(this).parent().find(".qUtility").is(":visible"));
      }
    });
    jQuery(".qUtility").hide();
    jQuery(".js-question-header").each(function () {
      var id = jQuery(this).parent().attr("id");
      if (
        localStorage.getItem(id) == "true" ||
        localStorage.getItem(id) == null
      ) {
        jQuery(this).parent().find(".qUtility").show();
      }
    });
    // Find # in url
    var itemID = window.location.href.split("#")[1];
    if (itemID) {
      // Scroll to the question
      setTimeout(function () {
      jQuery("html, body").animate(
        {
          scrollTop: jQuery("#" + itemID).offset().top - 55,
        },
        100
      );
      }, 500);
    } else {
      // Scroll to first .qUtility that is visible
      var firstVisible = jQuery(".qUtility:visible").first();
      if (firstVisible.length > 0) {
        jQuery("html, body").animate(
          {
            scrollTop: firstVisible.offset().top - 55,
          },
          100
        );
      }
    }
  }, 10);  
`;
  scriptElement2.innerHTML = script2;
  document.body.appendChild(scriptElement2);
}
