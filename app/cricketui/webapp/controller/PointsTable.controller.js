sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "sap/ui/model/Filter",
    'sap/ui/model/FilterOperator'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("wc.india.cricketui.controller.PointsTable", {
            onInit: function () {
            },
            onNavToResultPage: function (oEvent) {
                var sPath = oEvent.getSource().getBindingContext().sPath.split("'")[1];
                let oModel = this.getOwnerComponent().getModel();
                oModel.read("/TeamsData('" + sPath + "')", {
                    urlParameters: {
                        "$expand": "Results"
                    },
                    success: function (oData) {
                        var oResultModel = new JSONModel(oData.Results);
                        this.getView().setModel(oResultModel, "oResultModel");
                    }.bind(this),
                    error: function (oError) {

                    }
                })
                // if (!this.resultFragment) {
                //     this.resultFragment = sap.ui.xmlfragment("wc.india.cricketui.view.Results", this);
                //     this.getView().addDependent(this.resultFragment);
                // }
                // this.resultFragment.open();
                if (!this._pDialog) {
                    this._pDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: "wc.india.cricketui.fragments.Results",
                        controller: this
                    }).then(function (oDialog) {
                        this.getView().addDependent(oDialog);
                        return oDialog;
                    }.bind(this));
                }

                this._pDialog.then(function (oDialog) {
                    // this._configDialog(oButton, oDialog);
                    oDialog.open();
                }.bind(this));
            },
            onSearchResults: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Opponent", FilterOperator.Contains, sValue);
                var oBinding = oEvent.getSource().getBinding("items");
                oBinding.filter([oFilter]);
            },
            onPressBattingStats: function (oEvent) {
                let sTitle = oEvent.getSource().getProperty("title");
                switch (sTitle) {
                    case "Most Runs": {
                        if (!this.mostRunsFragment) {
                            this.mostRunsFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.mostruns", this);
                            this.getView().addDependent(this.mostRunsFragment);
                        }
                        this.mostRunsFragment.open();
                        break;
                    };
                    case "Highest Scores": {
                        if (!this.highestScoreFragment) {
                            this.highestScoreFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.highestScore", this);
                            this.getView().addDependent(this.highestScoreFragment);
                        }
                        this.highestScoreFragment.open();
                        break;
                    };
                    case "Most Hundreds": {
                        if (!this.mostHundredsFragment) {
                            this.mostHundredsFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.mostHundreds", this);
                            this.getView().addDependent(this.mostHundredsFragment);
                        }
                        this.mostHundredsFragment.open();
                        break;
                    };
                    case "Most Fifties": {
                        if (!this.mostFiftiesFragment) {
                            this.mostFiftiesFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.mostFifties", this);
                            this.getView().addDependent(this.mostFiftiesFragment);
                        }
                        this.mostFiftiesFragment.open();
                        break;
                    }
                }
            },
            onPressBowlingStats: function (oEvent) {
                let sTitle = oEvent.getSource().getProperty("title");
                switch (sTitle) {
                    case "Most Wickets": {

                    };
                    case "Best Bowling": {

                    };
                    case "Best Economy": {

                    }
                }
            },
            onCloseHighestScore: function () {
                this.highestScoreFragment.close();
            },
            onCloseMostFifties: function () {
                this.mostFiftiesFragment.close();
            },
            onCloseMostHundreds: function () {
                this.mostHundredsFragment.close();
            },
            onCloseMostRuns: function () {
                this.mostRunsFragment.close();
            }
        });
    });
