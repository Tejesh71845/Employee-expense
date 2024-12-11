sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("com.app.project4.controller.View1", {
        onInit() {
            // Initialize or bind models here, if necessary
        },

        onSubmit: function () {
            // Notify form submission
            // alert("Submitting expense...");
            MessageToast.show("Submitting expense...")

            // Get form controls
            var view = this.getView();
            var costCent = view.byId("costCenterSelect").getSelectedKey();
            var amt = parseFloat(view.byId("amountInput").getValue());
            var desc = view.byId("descriptionInput").getValue();
            var date = view.byId("datePicker").getValue();
            var time = view.byId("timePicker").getValue();
            var emp = view.byId("employeeIdInput").getValue();
            // var status = view.byId("statusSelect").getSelectedKey();

            // Validate the inputs
            if (!costCent || !amt || amt <= 0 || !desc || !date || !emp || !time) {
                MessageToast.show("Please ensure all fields are filled correctly.");
                return;
            }

            // Prepare the data object
            var jsonData = {
                employeeId: emp,
                amount: amt,
                description: desc,
                costCenter: costCent,
                date: date,
                time: time
            };

            console.log("Payload:", JSON.stringify(jsonData));

            // API URL
            var sUrl = "imo/expenses";
 
            // Send POST request
            $.ajax({
                url: sUrl,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(jsonData),
                success: function () {
                    MessageToast.show("Expense submitted successfully!");
                },
                error: function (xhr) {
                    console.error("Error submitting expense:", xhr.responseText);
                    MessageToast.show("Error submitting expense. Please check the console for details.");
                }
            });
        },

        onFetchDetails: function () {
            // Navigate to the "table" route
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("TableView");
        }
    });
});
