define(["index.module"], function () {
  'use strict';


  angular
    .module('bm.platform')
    .factory('Users', function () {

      var userServiceInstance =
      {
        getUsers: function ($query) {
          return [
            'Girish Lakshmanan'
            , 'Nancy Seaton'
            , 'Darren Breiner'
            , 'Dominic Magner'
            , 'Marc Mcgurk'
          ];
        }
      }
      return userServiceInstance;
    })

    .factory('Topics', function ($firebaseArray, fbURL) {

      var topicsInstance = {
        getTopics: function (contextId) {
          return $firebaseArray(new Firebase(fbURL + contextId))
        },
        getTopicsRef: function (contextId) {
          return new Firebase(fbURL + contextId);
        }
      }
      return topicsInstance; // jshint ignore:line
    })

    .factory('BIGate', function ($http, $q) {


      var gateInstance = {

        sawSessionId: obips_scid,
        currentDashPath: saw.session.SessionInfos().portalPath,
        currentUser: saw.session.SessionInfos().user,
        currentStateXML: saw.getXmlIsland("idClientStateXml", null, null, true),
        baseURL: saw.getBaseURL(),


        //Gets a list of Reports and their catalogPaths and SearchIds. Note that the SearchIds are session tokens and are only valid for a presentation services session.
        getReportsFromStateXML: function () {


          var reports = [];

          $.each($(gateInstance.currentStateXML).find('[folder]'), function (reportIndex, reportItem) {

            reports.push({
              reportId: $(this).attr('cid'),
              analysisPath: $(this).attr('folder') + '/' + $(this).attr('itemName'),
              searchId: $(this).attr('searchId')
            })

          });

          return reports;


        },


        getReportDetailsFromSearchId:function(){

          var reports = [];

          $.each($(gateInstance.currentStateXML).find('[folder]'), function (reportIndex, reportItem) {

            reports.push({
              reportId: $(this).attr('cid'),
              analysisPath: $(this).attr('folder') + '/' + $(this).attr('itemName'),
              searchId: $(this).attr('searchId')
            })

          });

          return reports;


        },

        //Gets the catalog XML for a Report(Analysis). Requires the Search Id.
        //Returns a Promise object.
        getReportXml: function (report) {
          return $q(function (resolve, reject) {
            $http.get("http://pelobidev2.projected.ltd.uk:9704/analytics/saw.dll?getReportXmlFromSearchID&SearchID=" + report.searchId
            ).then(function (response) {
              resolve({report:report,xml:response})
            }, function (errResponse) {
              reject(errResponse)
            })
          });
        },


        getAllReportsXML:function(){

          var allReportXMLPromises=[];

          angular.forEach(gateInstance.getReportsFromStateXML(), function (value, key) {
            allReportXMLPromises.push(gateInstance.getReportXml(value));

          });

          return $q.all(allReportXMLPromises);

        },


        //Gets Report Data in a friendly JSON structure
        //Returns a Promise object.
        getReportMetadata: function (reportXML,reportDetails) {

          return $q(function (resolve, reject) {

            var inst = new obips.ReportMetadata();

            inst.loadReportMetadata(reportXML, function (response) {

              var colMap = [];


              angular.forEach(inst.columnIDToColumnInfo, function (value, key) {
                var colInfo = inst.getColumnInfoByID(key);
                this[key] = {
                  baseFormula: colInfo.getBaseFormula(),
                  businessModelAndDimensionID: colInfo.getBusinessModelAndDimensionID(),
                  columnFormulaExprType: colInfo.getColumnFormulaExprType(),
                  defaultDisplayTimeZone: colInfo.getDefaultDisplayTimeZone(),
                  defaultDisplayTimeZoneOffset: colInfo.getDefaultDisplayTimeZoneOffset(),
                  displayTimeZone: colInfo.getDisplayTimeZone(),
                  displayTimeZoneOffset: colInfo.getDisplayTimeZoneOffset(),
                  remarks: colInfo.getRemarks(),
                  resolvedFormula: colInfo.getResolvedFormula(),
                  type: colInfo.getType(),
                  isDoubleColumn: colInfo.isDoubleColumn(),
                  isMeasure: colInfo.isMeasure(),
                  isMultiValueEnabled: colInfo.isMultiValueEnabled(),
                  isPickListEnabled: colInfo.isPickListEnabled(),
                  isTime: colInfo.isTime()
                };
              }, colMap);





              var reportMetadata={
                colMap:colMap,
                primarySubjectArea:response.primarySubjectArea,
                analysisPath:reportDetails.analysisPath,
                reportId:reportDetails.reportId,
                searchId:reportDetails.searchId
              }

              resolve(reportMetadata);


            })




          });
        },



        //Returns an array of Promises resolving to all report Metadata
        getAllReportsMetadata:function(reportXMLs){


          var metadataPromisesArray=[];

          angular.forEach(reportXMLs, function (value, key) {


            var regEx = /<saw:report((.|\n)*)/;
            var responseXML = regEx.exec(value.xml.data)[0];

            //Get and Load Report Metadata
            var reportMetadataPromise = gateInstance.getReportMetadata(responseXML,value.report)
            metadataPromisesArray.push(reportMetadataPromise)

          });

          return $q.all(metadataPromisesArray);


        },

        getReportIdFromElement: function (element) {

          return $(element).closest("[vid*='tableView']").attr('vid');

        },
        getReportIdFromCell: function (elementId) {

          return $('#' + elementId).closest("[vid*='tableView']").attr('vid');

        },

        getContextHash: function (elementID) {

          //return default Context if not within OBI
          if (!(typeof obips)) {

            return {
              columnID: '',
              heading: '',
              currentRowColumns: '',
              value: '',
              SHA1: 'defaultSHA1'
            }

          }


          var contextHash = {};
          var edgeCoords = obips.EdgeCoords.findCoords($('#' + (elementID)).children()[0]);

          var sawViewModelID = edgeCoords.getId();

          var sawColumn = obips.ViewModel.getCurrentColumn(edgeCoords);

          var sawViewModel = obips.ViewModel.getViewModelById(sawViewModelID);
          var columnID = sawColumn.getAttribute('columnID');
          var stateInstance = obips.ReportMetadata.GetInstanceByStatePath(sawViewModel.reportStatePath);


          var numLayers = sawViewModel.getEdgeDefinition(sawViewModelID).getLayerCount(obips.JSDataLayout.ROW_EDGE);

          var currentRowColumns = [];
          var currentColumnElementId;


          //Loop through all columns in the same row as the current Element
          $.each($('#' + (elementID)).closest('td').siblings(), function (siblingIndex, sibling) {


            currentColumnElementId = sibling.getAttribute('id');

            var currentColEdgeCoords = obips.EdgeCoords.findCoords($('#' + currentColumnElementId).children()[0]);

            var currentCol = obips.ViewModel.getCurrentColumn(currentColEdgeCoords);

            var colFormulaSelector = $(currentCol).find('columnFormula').find('expr')[0];
            var colHeadingSelector = $(currentCol).find('columnHeading').find('caption').find('text')[0];

            currentRowColumns.push({
              //Get the Column Formula for the element
              //formula: currentCol.querySelector('columnFormula expr').innerHTML,
              formula: colFormulaSelector && colFormulaSelector.innerHTML,
              //Get the Heading of current element
              heading: ((colHeadingSelector && colHeadingSelector.innerHTML) || (colFormulaSelector && colFormulaSelector.innerHTML)),

              //Get the Column Value of the Current element
              value: currentColEdgeCoords.element.textContent

            })


          })

          contextHash = {

            //isMeasure: stateInstance.getColumnInfoByID(columnID).isMeasure(),
            columnID: columnID,
            //baseFormula: stateInstance.getColumnInfoByID(columnID).getBaseFormula(),
            heading: ((sawColumn.querySelector('columnHeading caption text') && sawColumn.querySelector('columnHeading caption text').innerHTML) || (sawColumn.querySelector('columnFormula expr').innerHTML)),
            currentRowColumns: currentRowColumns,
            value: edgeCoords.element.textContent

          }
          contextHash.SHA1 = CryptoJS.SHA1(JSON.stringify(contextHash)).toString();

          return contextHash
        }//End Function getcontextHash


      };


      return gateInstance;
    })


});
