sap.ui.define([
    "sap/ui/core/mvc/Controller",

], (Controller) => {
    "use strict";

    return Controller.extend("com.app.project4.controller.TableView", {
        doAjax: function (sUrl, sMethod, oData, rSuccess, rError) {
            // sUrl = sap.ui.require.toUrl() + sUrl;
           
            if (oData) {
                oData = JSON.stringify(oData);
            }
           
            var tempJsonModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(tempJsonModel, "tempJsonModel");
            tempJsonModel.loadData(sUrl, oData, true, sMethod, false, false);
            tempJsonModel.attachRequestCompleted(function (oEvent) {
                rSuccess(oEvent.getSource().getData());
            }.bind(rSuccess));
            tempJsonModel.attachRequestFailed(function (oEvent) {
                rError(oEvent);
            }.bind(rError));
        },
 
        newFunction: function(sUrl){
            var controller = this;
            this.doAjax(sUrl, 'GET', null,
                function(data) {
                    console.log(data);
                    let m = new sap.ui.model.json.JSONModel();
                    m.setData({expenses:data});
 
                    console.log(m);
                    controller.getView().setModel(m,"expense");
                },
                function(error) {
                    BusyIndicator.hide()
                });
        },
 
        onSearchEmployee: function (oEvent) {
            var emp = oEvent.getSource().getValue().trim();
 
            if (!emp) {
                var sUrl = "imo/expenses";
                this.newFunction(sUrl);
            }
            var sUrl = "imo/expenses/" + emp;
            console.log(sUrl);
           
            this.newFunction(sUrl);
        },
        onInit() {  
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("TableView").attachPatternMatched( this);
 
            var sUrl = "imo/expenses";
            this.newFunction(sUrl);
        },
 
        
        goToMainView: function () {
            // Navigate to the "table" route
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView1");
        },



    });
});