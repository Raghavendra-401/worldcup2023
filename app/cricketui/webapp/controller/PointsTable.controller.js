sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    'sap/ui/core/Fragment',
    "sap/ui/model/Filter",
    'sap/ui/model/FilterOperator',
    "sap/m/MessageBox",
    "sap/ui/model/Sorter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Fragment, Filter, FilterOperator, MessageBox, Sorter) {
        "use strict";

        return Controller.extend("wc.india.cricketui.controller.PointsTable", {
            onInit: function () {
                this.resourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
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
                        MessageBox.information(this.resourceBundle.getText("errorGettingInfo"));
                    }.bind(this)
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
            /** using single fragment for each stat */
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
            /** using single fragment for each stat but changing the binding*/
            onPressBowlingStats: function (oEvent) {
                let sTitle = oEvent.getSource().getProperty("title");
                var oItemTemplate;
                var oSorter;
                if (!this.bowlingStatsFragment) {
                    this.bowlingStatsFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.bowlingstats", this);
                    this.getView().addDependent(this.bowlingStatsFragment);
                    sap.ui.getCore().byId("_IDBowlingStatsDialog").setTitle(sTitle);
                }
                this.bowlingStatsFragment.open();
                switch (sTitle) {
                    case "Most Wickets": {
                        // if (!this.mostWicketsFragment) {
                        //     this.mostWicketsFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.mostwickets", this);
                        //     this.getView().addDependent(this.mostWicketsFragment);
                        // }
                        // this.mostWicketsFragment.open();
                        oItemTemplate = new sap.m.ObjectListItem({ title: "{Player}", number: "{Wickets}", attributes: [new sap.m.ObjectAttribute({ text: "{Country}" })] });
                        oSorter = new Sorter({ path: "Wickets", descending: true });
                        break;
                    };
                    case "Best Bowling": {
                        // if (!this.bestBowlingFragment) {
                        //     this.bestBowlingFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.bestbowling", this);
                        //     this.getView().addDependent(this.bestBowlingFragment);
                        // }
                        // this.bestBowlingFragment.open();
                        oItemTemplate = new sap.m.ObjectListItem({ title: "{Player}", number: "{BestBowling}", attributes: [new sap.m.ObjectAttribute({ text: "{Country}" })] });
                        oSorter = new Sorter({ path: "BestBowling", descending: true });
                        break;
                    };
                    case "Best Economy": {
                        // if (!this.bestEconomyFragment) {
                        //     this.bestEconomyFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.besteconomy", this);
                        //     this.getView().addDependent(this.bestEconomyFragment);
                        // }
                        // this.bestEconomyFragment.open();
                        oItemTemplate = new sap.m.ObjectListItem({ title: "{Player}", number: "{Economy}", attributes: [new sap.m.ObjectAttribute({ text: "{Country}" })] });
                        oSorter = new Sorter({ path: "Economy" });
                        break;
                    }
                };
                sap.ui.getCore().byId("_IDBestBowlingList").bindAggregation("items", {
                    path: "/BowlingStats",
                    template: oItemTemplate,
                    templateShareable: false,
                    sorter: oSorter
                });
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
            },
            onCloseBestBowling: function () {
                this.bestBowlingFragment.close();
            },
            onCloseMostWickets: function () {
                this.mostWicketsFragment.close();
            },
            onCloseBestEconomy: function () {
                this.bestEconomyFragment.close();
            },
            onPressTeamSquad: function (oEvent) {
                var sTeamName = oEvent.getSource().getProperty("title");
                var aFilter = [];
                var oCountryFilter = new Filter("Country_Name", FilterOperator.EQ, sTeamName);
                aFilter.push(oCountryFilter);
                let oModel = this.getOwnerComponent().getModel();
                oModel.read("/Players", {
                    filters: aFilter,
                    success: function (oData) {
                        var oPlayersModel = new JSONModel(oData.results);
                        this.getView().setModel(oPlayersModel, "oPlayersModel");
                    }.bind(this),
                    error: function () {
                        MessageBox.information(this.resourceBundle.getText("errorGettingInfo"));
                    }.bind(this)
                });
                if (!this.squadFragment) {
                    this.squadFragment = sap.ui.xmlfragment("wc.india.cricketui.fragments.squads", this);
                    this.getView().addDependent(this.squadFragment);
                }
                this.squadFragment.open();
            },
            onPressSquadFragment: function () {
                this.squadFragment.close();
            },
            onCloseBowlingStats: function () {
                this.bowlingStatsFragment.close();
            }
        });
    });
