var requirejs = {"baseUrl":"http://localhost:3000","paths":{"angular":"bower_components/angular/angular","angular-animate":"bower_components/angular-animate/angular-animate","angular-cookies":"bower_components/angular-cookies/angular-cookies","angular-sanitize":"bower_components/angular-sanitize/angular-sanitize","jquery":"bower_components/jquery/dist/jquery","angular-ui-router":"bower_components/angular-ui-router/release/angular-ui-router","angular-bootstrap":"bower_components/angular-bootstrap/ui-bootstrap-tpls","malarkey":"bower_components/malarkey/dist/malarkey.min","toastr":"bower_components/toastr/toastr","angular-elastic":"bower_components/angular-elastic/elastic","ng-tags-input":"bower_components/ng-tags-input/ng-tags-input.min","angular-ui-tree":"bower_components/angular-ui-tree/dist/angular-ui-tree","firebase":"bower_components/firebase/firebase","angularfire":"bower_components/angularfire/dist/angularfire","cryptojslib":"bower_components/cryptojslib/rollups/sha1","moment":"bower_components/moment/moment","angular-moment":"bower_components/angular-moment/angular-moment","angular-aria":"bower_components/angular-aria/angular-aria","angular-material":"bower_components/angular-material/angular-material","angular-material-icons":"bower_components/angular-material-icons/angular-material-icons.min",/*BEGIN_APPDEPS*/ "dynamic.modules":  "app/dynamic.modules", "index.config":  "app/index.config", "index.constants":  "app/index.constants", "index.module":  "app/index.module", "index.route":  "app/index.route", "index.run":  "app/index.run", "chatter.Bootstrap":  "app/chatter/chatter.Bootstrap", "chatter.controller.comments":  "app/chatter/chatter.controller.comments", "chatter.controller.consoleChatter":  "app/chatter/chatter.controller.consoleChatter", "chatter.controller.modalInstance":  "app/chatter/chatter.controller.modalInstance", "chatter.controller.tablecell":  "app/chatter/chatter.controller.tablecell", "chatter.directive.focusMe":  "app/chatter/chatter.directive.focusMe", "chatter.directive.morphInput":  "app/chatter/chatter.directive.morphInput", "chatter.directive.obiChatterEnable":  "app/chatter/chatter.directive.obiChatterEnable", "chatter.directive.obiFabMenu":  "app/chatter/chatter.directive.obiFabMenu", "chatter.directive.obiTable":  "app/chatter/chatter.directive.obiTable", "chatter.directive.obiTableCell":  "app/chatter/chatter.directive.obiTableCell", "chatter.directive.topic":  "app/chatter/chatter.directive.topic", "chatter.filters":  "app/chatter/chatter.filters", "chatter.module":  "app/chatter/chatter.module", "chatter.services":  "app/chatter/chatter.services", "main.controller":  "app/main/main.controller", "main.controller.spec":  "app/main/main.controller.spec", "sha1":  "app/components/cryptojs/sha1", "githubContributor.service":  "app/components/githubContributor/githubContributor.service", "malarkey.directive":  "app/components/malarkey/malarkey.directive", "navbar.directive":  "app/components/navbar/navbar.directive", "webDevTec.service":  "app/components/webDevTec/webDevTec.service", "css":  "app/components/CSSLoader/dist/css" /*END_APPDEPS*/},"shim":{"angular":{"deps":["jquery"],"exports":"angular"},"angular-animate":{"deps":["angular"]},"angular-cookies":{"deps":["angular"]},"angular-sanitize":{"deps":["angular"]},"jquery":{"deps":[]},"angular-ui-router":{"deps":["angular"]},"bootstrap-sass-official":{"deps":["jquery"]},"angular-bootstrap":{"deps":["angular"]},"malarkey":{"deps":[]},"toastr":{"deps":["jquery"]},"animate.css":{"deps":[]},"angular-elastic":{"deps":["angular"]},"ng-tags-input":{"deps":["angular"]},"angular-ui-tree":{"deps":["angular"]},"firebase":{"deps":[]},"angularfire":{"deps":["angular","firebase"]},"components-font-awesome":{"deps":[]},"bootstrap":{"deps":["jquery"]},"cryptojslib":{"deps":[]},"moment":{"deps":[]},"angular-moment":{"deps":["angular","moment"]},"angular-aria":{"deps":["angular"]},"angular-material":{"deps":["angular","angular-animate","angular-aria"]},"angular-material-icons":{"deps":["angular"]},/*BEGIN_APPSHIM*/ "dynamic.modules": {"deps": ["angular"]}, "index.config": {"deps": ["angular"]}, "index.constants": {"deps": ["angular"]}, "index.module": {"deps": ["angular"]}, "index.route": {"deps": ["angular"]}, "index.run": {"deps": ["angular"]}, "chatter.Bootstrap": {"deps": ["angular"]}, "chatter.controller.comments": {"deps": ["angular"]}, "chatter.controller.consoleChatter": {"deps": ["angular"]}, "chatter.controller.modalInstance": {"deps": ["angular"]}, "chatter.controller.tablecell": {"deps": ["angular"]}, "chatter.directive.focusMe": {"deps": ["angular"]}, "chatter.directive.morphInput": {"deps": ["angular"]}, "chatter.directive.obiChatterEnable": {"deps": ["angular"]}, "chatter.directive.obiFabMenu": {"deps": ["angular"]}, "chatter.directive.obiTable": {"deps": ["angular"]}, "chatter.directive.obiTableCell": {"deps": ["angular"]}, "chatter.directive.topic": {"deps": ["angular"]}, "chatter.filters": {"deps": ["angular"]}, "chatter.module": {"deps": ["angular"]}, "chatter.services": {"deps": ["angular"]}, "main.controller": {"deps": ["angular"]}, "main.controller.spec": {"deps": ["angular"]}, "sha1": {"deps": ["angular"]}, "githubContributor.service": {"deps": ["angular"]}, "malarkey.directive": {"deps": ["angular"]}, "navbar.directive": {"deps": ["angular"]}, "webDevTec.service": {"deps": ["angular"]}, "css": {"deps": ["angular"]} /*END_APPSHIM*/}}


//These variables are used as semaphores to ensure that only one view can load and bootstrap the app
var bmPlatformLoaded;
var bmPlatformLoading;

if ((typeof angular == 'undefined') && (!bmPlatformLoading)) { //bm.platform Loaded for the first time - Load JS and CSS files


  bmPlatformLoading = true;

  var requireJSScriptElement = document.createElement("script");

  requireJSScriptElement["src"] = "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.20/require.min.js";
  document.getElementsByTagName("head")[0].appendChild(requireJSScriptElement);
  console.log('added Requirejs to head');

  var materialIconsElement = document.createElement("link");

  materialIconsElement["href"] = "https://fonts.googleapis.com/icon?family=Material+Icons";
  materialIconsElement["rel"] = "stylesheet";

  document.getElementsByTagName("head")[0].appendChild(materialIconsElement);
  console.log('added material icons to head');

  requireJSScriptElement.onload = function () {

    console.log('calling requireJS Load...');
    require(['angular','angular-animate','angular-cookies','angular-sanitize','jquery','angular-ui-router','angular-bootstrap','malarkey','toastr','css!bower_components/animate.css/animate.css','angular-elastic','ng-tags-input','css!bower_components/ng-tags-input/ng-tags-input.min.css','angular-ui-tree','firebase','angularfire','css!bower_components/components-font-awesome/css/font-awesome.css','css!bower_components/bootstrap/dist/css/bootstrap.css','cryptojslib','moment','angular-moment','angular-aria','angular-material','css!bower_components/angular-material/angular-material.css','angular-material-icons','css!bower_components/angular-material-icons/angular-material-icons.css' ,/*BEGIN_APPARRDEPS*/ "dynamic.modules", "index.config", "index.constants", "index.module", "index.route", "index.run", "chatter.controller.comments", "chatter.controller.consoleChatter", "chatter.controller.modalInstance", "chatter.controller.tablecell", "chatter.directive.focusMe", "chatter.directive.morphInput", "chatter.directive.obiChatterEnable", "chatter.directive.obiFabMenu", "chatter.directive.obiTable", "chatter.directive.obiTableCell", "chatter.directive.topic", "chatter.filters", "chatter.module", "chatter.services", "main.controller", "main.controller.spec", "sha1", "githubContributor.service", "malarkey.directive", "navbar.directive", "webDevTec.service", "css", "css!app/app.css" /*END_APPARRDEPS*/], function (ang) {
        if ((typeof obips != 'undefined')) {
          console.log('Context inside OBI - Manually bootstrapping angular')


          var initInjector = angular.injector(["ng", "bm.platform"]);
          var BIGate = initInjector.get("BIGate");



          initOBIMetadata();

          function initOBIMetadata() {


            var AllReportsPromises = BIGate.getAllReportsXML();

            AllReportsPromises.then(function (responses) {

              var AllMetadataPromises = BIGate.getAllReportsMetadata(responses);
              AllMetadataPromises.then(function (metaDataResponses) {

                console.info('Report metadata loaded for ' + metaDataResponses.length + ' Reports.');
                console.log(metaDataResponses);


                //Load metadata into an app Constant so it is available as a service throughout
                angular
                  .module('bm.platform')
                  .constant('metaDataResponses', metaDataResponses);

                bmPlatformLoaded=true;
                bmPlatformLoading=false;
                bootstrapChatterApp();
                observeChatterSensitiveDOMChanges();

              })


            });


          }

        } else {

          console.log('Context outside OBI - Manually bootstrapping angular')
          angular.bootstrap(document, ['bm.platform']);
        }

      }
    );
  }
}
else {
  console.log('Everything already loaded...just Rebootstrapping');
  if ((typeof obips != 'undefined')) {
    bootstrapChatterApp();
    observeChatterSensitiveDOMChanges();
  } else {
    angular.bootstrap(document, ['bm.platform']);
  }

}


function bootstrapChatterApp() {


  if ((typeof bmPlatformLoaded == 'undefined') || (!bmPlatformLoaded) || bmPlatformLoading) return;


  bmPlatformLoading = true;
  console.log('In Bootstrap!');


  var pageContentDiv = $('#PageContentOuterDiv')[0];

  //Bootstrap if not already.
  //The First view to set this attribute will have to responsibility of bootstrapping the entire app into context
  if (!(pageContentDiv.getAttribute('obi-chatter-enable'))) {

    //attach chatter directive - this will make angular loop through table elements and attach further directives
    pageContentDiv.setAttribute('obi-chatter-enable', 'true');

    $('.DashboardPageContentDiv').append("<div obi-fab-menu='true'></div>");

    //  pageContentDiv.setAttribute('obi-fab-menu', 'true');

    console.log('New - Attempt to attach angular to page content DIV');

    angular.bootstrap(pageContentDiv, ['bm.platform']);
    console.log('Angular Bootstraped: ' + 'bm.platform');

  } else {

    //Angular is already bootstrapped but the views might have been re-rendered by OBI. This requires a re-compile of the views with the existing scope.
    //This is a more performant alternative to re-bootstrapping the entire App.
    var injector = angular.element($('#PageContentOuterDiv')[0]).injector()
    var compileService = injector.get('$compile');
    angular.forEach($('.PTChildPivotTable'), function (value, key) {

      //Return if the directive is already attached to the view
      if (value.getAttribute('obi-table') == 'true') return;

      value.setAttribute('obi-table', 'true')

      var scope = ((angular.element(value).scope()));
      var linkFn = compileService(value, scope);
      console.log('In bootstrapChatterApp(): linking mutated DOM with scope...');
      var content = linkFn(scope);


    });

  }

  bmPlatformLoading = false;

}


function observeChatterSensitiveDOMChanges() {

  if ((typeof bmPlatformLoaded == 'undefined') || (!bmPlatformLoaded) || bmPlatformLoading) return;

  bmPlatformLoading = true;

  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

//In Analysis Mode
  var targetViewElementArray = $(document).find('div[id^=tableView]');

//In Dashboard Mode
  if (targetViewElementArray.length < 1) {
    targetViewElementArray = $(document).find('td[id*=tableView]');
  }

  if (targetViewElementArray.length < 1) {
    targetViewElementArray = $('.ViewContainer');
  }

  $.each(targetViewElementArray, function (viewIdx, viewElement) {

    var newScope;

    var observer = new MutationObserver(function (mutations) {
      /*    mutations.forEach(function(mutation) {
       console.log(mutation.type);
       });*/

      console.log('mutated ' + viewElement.getAttribute('id'));


      var pivotTables = $(viewElement).find('.PTChildPivotTable');

      //TODO Fine-tune performance - to handle only specific DOM mutations
      if (!pivotTables.attr('obi-table')) {

        console.log('Re-linking from mutation observer')

        // bootstrapChatterApp();

        var injector = angular.element($('#PageContentOuterDiv')[0]).injector()
        var compileService = injector.get('$compile');

        pivotTables.attr('obi-table', 'true');

        if (newScope) {
          newScope.$destroy();
        }
        var scope = ((angular.element(pivotTables).scope()));
        newScope = scope.$new();
        var linkFn = compileService(pivotTables, newScope);
        console.log('linking mutated DOM with scope...');
        var content = linkFn(newScope);

      }

    });

    observer.observe(viewElement, {
      //attributes: true,
      childList: true
      //characterData: true,
      //subtree: true
    });


  })

  bmPlatformLoading = false;

}


//Todo Wrap it in a function to avoid polluting global namespace
