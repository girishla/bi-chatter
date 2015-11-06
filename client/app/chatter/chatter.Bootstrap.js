var requirejs = {"baseUrl":"http://localhost:3000","paths":{"angular":"bower_components/angular/angular","angular-animate":"bower_components/angular-animate/angular-animate","angular-cookies":"bower_components/angular-cookies/angular-cookies","angular-sanitize":"bower_components/angular-sanitize/angular-sanitize","jquery":"bower_components/jquery/dist/jquery","angular-ui-router":"bower_components/angular-ui-router/release/angular-ui-router","angular-bootstrap":"bower_components/angular-bootstrap/ui-bootstrap-tpls","malarkey":"bower_components/malarkey/dist/malarkey.min","toastr":"bower_components/toastr/toastr","angular-elastic":"bower_components/angular-elastic/elastic","ng-tags-input":"bower_components/ng-tags-input/ng-tags-input.min","angular-ui-tree":"bower_components/angular-ui-tree/dist/angular-ui-tree","firebase":"bower_components/firebase/firebase","angularfire":"bower_components/angularfire/dist/angularfire","cryptojslib":"bower_components/cryptojslib/rollups/sha1","moment":"bower_components/moment/moment","angular-moment":"bower_components/angular-moment/angular-moment",/*BEGIN_APPDEPS*/ "index.config":  "app/index.config", "index.constants":  "app/index.constants", "index.module":  "app/index.module", "index.route":  "app/index.route", "index.run":  "app/index.run", "chatter.Bootstrap":  "app/chatter/chatter.Bootstrap", "chatter.controller.comments":  "app/chatter/chatter.controller.comments", "chatter.controller.maincontroller":  "app/chatter/chatter.controller.maincontroller", "chatter.controller.modalinstance":  "app/chatter/chatter.controller.modalinstance", "chatter.controller.tablecell":  "app/chatter/chatter.controller.tablecell", "chatter.directives":  "app/chatter/chatter.directives", "chatter.filters":  "app/chatter/chatter.filters", "chatter.services":  "app/chatter/chatter.services", "main.controller":  "app/main/main.controller", "main.controller.spec":  "app/main/main.controller.spec", "sha1":  "app/components/cryptojs/sha1", "githubContributor.service":  "app/components/githubContributor/githubContributor.service", "malarkey.directive":  "app/components/malarkey/malarkey.directive", "navbar.directive":  "app/components/navbar/navbar.directive", "webDevTec.service":  "app/components/webDevTec/webDevTec.service", "css":  "app/components/CSSLoader/dist/css" /*END_APPDEPS*/},"shim":{"angular":{"deps":["jquery"],"exports":"angular"},"angular-animate":{"deps":["angular"]},"angular-cookies":{"deps":["angular"]},"angular-sanitize":{"deps":["angular"]},"jquery":{"deps":[]},"angular-ui-router":{"deps":["angular"]},"bootstrap-sass-official":{"deps":["jquery"]},"angular-bootstrap":{"deps":["angular"]},"malarkey":{"deps":[]},"toastr":{"deps":["jquery"]},"animate.css":{"deps":[]},"angular-elastic":{"deps":["angular"]},"ng-tags-input":{"deps":["angular"]},"angular-ui-tree":{"deps":["angular"]},"firebase":{"deps":[]},"angularfire":{"deps":["angular","firebase"]},"components-font-awesome":{"deps":[]},"bootstrap":{"deps":["jquery"]},"cryptojslib":{"deps":[]},"moment":{"deps":[]},"angular-moment":{"deps":["angular","moment"]},/*BEGIN_APPSHIM*/ "index.config": {"deps": ["angular"]}, "index.constants": {"deps": ["angular"]}, "index.module": {"deps": ["angular"]}, "index.route": {"deps": ["angular"]}, "index.run": {"deps": ["angular"]}, "chatter.Bootstrap": {"deps": ["angular"]}, "chatter.controller.comments": {"deps": ["angular"]}, "chatter.controller.maincontroller": {"deps": ["angular"]}, "chatter.controller.modalinstance": {"deps": ["angular"]}, "chatter.controller.tablecell": {"deps": ["angular"]}, "chatter.directives": {"deps": ["angular"]}, "chatter.filters": {"deps": ["angular"]}, "chatter.services": {"deps": ["angular"]}, "main.controller": {"deps": ["angular"]}, "main.controller.spec": {"deps": ["angular"]}, "sha1": {"deps": ["angular"]}, "githubContributor.service": {"deps": ["angular"]}, "malarkey.directive": {"deps": ["angular"]}, "navbar.directive": {"deps": ["angular"]}, "webDevTec.service": {"deps": ["angular"]}, "css": {"deps": ["angular"]} /*END_APPSHIM*/}}

if ((typeof angular == 'undefined')) { //biChatter Loaded for the first time - Load JS and CSS files



  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added Requirejs to head');


  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['angular','angular-animate','angular-cookies','angular-sanitize','jquery','angular-ui-router','angular-bootstrap','malarkey','toastr','css!bower_components/animate.css/animate.css','angular-elastic','ng-tags-input','css!bower_components/ng-tags-input/ng-tags-input.min.css','angular-ui-tree','firebase','angularfire','css!bower_components/components-font-awesome/css/font-awesome.css','css!bower_components/bootstrap/dist/css/bootstrap.css','cryptojslib','moment','angular-moment' ,/*BEGIN_APPARRDEPS*/ "index.config", "index.constants", "index.module", "index.route", "index.run", "chatter.controller.comments", "chatter.controller.maincontroller", "chatter.controller.modalinstance", "chatter.controller.tablecell", "chatter.directives", "chatter.filters", "chatter.services", "main.controller", "main.controller.spec", "sha1", "githubContributor.service", "malarkey.directive", "navbar.directive", "webDevTec.service", "css", "css!app/app.css" /*END_APPARRDEPS*/], function (ang) {
        if ((typeof obips != 'undefined')) {
          console.log('Context inside OBI - Manually bootstrapping angular')
          boostrapChatterApp();
          observeChatterSensitiveDOMChanges();
        } else {

          console.log('Context outside OBI - Manually bootstrapping angular')
          angular.bootstrap(document, ['biChatter']);
        }

      }
    );
  }
}
else {
  console.log('Everything already loaded...just Rebootstrapping');
  if ((typeof obips != 'undefined')) {
    boostrapChatterApp();
    observeChatterSensitiveDOMChanges();
  } else {
    angular.bootstrap(document, ['biChatter']);
  }

}


function boostrapChatterApp() {

  var tableParentElement = $('.PTChildPivotTable');

  //Bootstrap if not already
  if (!(tableParentElement.attr('bi-chatter-table'))) {

    console.log('New - Attempt to attach angular to View');
    var tableParentElement = $('.PTChildPivotTable');
    tableParentElement.attr('ng-controller', 'MainController as chatter');
    //attach chatter directive - this will make angular loop through table child elements and attach further directives before compile
    tableParentElement.attr('bi-chatter-table', 'true');
    angular.bootstrap($('.PTChildPivotTable')[0], ['biChatter']);
    console.log('Angular Bootstraped!!!');


  }


  document.onload = function () {
    console.log("Document Loaded!!!");
  };

}


function observeChatterSensitiveDOMChanges() {


  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
  var targetElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
  if (targetElementArray.length < 1) {
    targetElementArray = $(document).find('td[id*=tableView]');
  }

  if (targetElementArray.length < 1) {
    targetElementArray = $('.ViewContainer');
  }

//TODO Fix this to handle all tables
  var list = targetElementArray[0];

  console.log(list);

  var observer = new MutationObserver(function (mutations) {
    //mutations.forEach(function(mutation) {
    //  console.log(mutation.type);
    //});

    //TODO Finetune performance - to handle only specific DOM mutations
    if (!(angular.element($('.PTChildPivotTable')).scope())) {
      boostrapChatterApp();

    }

  });

  observer.observe(list, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });

}


//Todo Wrap it in a function to avoid polluting global namespace

