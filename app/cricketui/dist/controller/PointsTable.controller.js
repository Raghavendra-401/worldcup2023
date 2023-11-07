sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageBox","sap/ui/model/Sorter"],function(t,e,s,i,n,r,a){"use strict";return t.extend("wc.india.cricketui.controller.PointsTable",{onInit:function(){this.resourceBundle=this.getOwnerComponent().getModel("i18n").getResourceBundle()},onNavToResultPage:function(t){var i=t.getSource().getBindingContext().sPath.split("'")[1];let n=this.getOwnerComponent().getModel();n.read("/TeamsData('"+i+"')",{urlParameters:{$expand:"Results"},success:function(t){var s=new e(t.Results);this.getView().setModel(s,"oResultModel")}.bind(this),error:function(t){r.information(this.resourceBundle.getText("errorGettingInfo"))}.bind(this)});if(!this._pDialog){this._pDialog=s.load({id:this.getView().getId(),name:"wc.india.cricketui.fragments.Results",controller:this}).then(function(t){this.getView().addDependent(t);return t}.bind(this))}this._pDialog.then(function(t){t.open()}.bind(this))},onSearchResults:function(t){var e=t.getParameter("value");var s=new i("Opponent",n.Contains,e);var r=t.getSource().getBinding("items");r.filter([s])},onPressBattingStats:function(t){let e=t.getSource().getProperty("title");switch(e){case"Most Runs":{if(!this.mostRunsFragment){this.mostRunsFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.mostruns",this);this.getView().addDependent(this.mostRunsFragment)}this.mostRunsFragment.open();break};case"Highest Scores":{if(!this.highestScoreFragment){this.highestScoreFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.highestScore",this);this.getView().addDependent(this.highestScoreFragment)}this.highestScoreFragment.open();break};case"Most Hundreds":{if(!this.mostHundredsFragment){this.mostHundredsFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.mostHundreds",this);this.getView().addDependent(this.mostHundredsFragment)}this.mostHundredsFragment.open();break};case"Most Fifties":{if(!this.mostFiftiesFragment){this.mostFiftiesFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.mostFifties",this);this.getView().addDependent(this.mostFiftiesFragment)}this.mostFiftiesFragment.open();break}}},onPressBowlingStats:function(t){let e=t.getSource().getProperty("title");var s;var i;if(!this.bowlingStatsFragment){this.bowlingStatsFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.bowlingstats",this);this.getView().addDependent(this.bowlingStatsFragment);sap.ui.getCore().byId("_IDBowlingStatsDialog").setTitle(e)}this.bowlingStatsFragment.open();switch(e){case"Most Wickets":{s=new sap.m.ObjectListItem({title:"{Player}",number:"{Wickets}",attributes:[new sap.m.ObjectAttribute({text:"{Country}"})]});i=new a({path:"Wickets",descending:true});break};case"Best Bowling":{s=new sap.m.ObjectListItem({title:"{Player}",number:"{BestBowling}",attributes:[new sap.m.ObjectAttribute({text:"{Country}"})]});i=new a({path:"BestBowling",descending:true});break};case"Best Economy":{s=new sap.m.ObjectListItem({title:"{Player}",number:"{Economy}",attributes:[new sap.m.ObjectAttribute({text:"{Country}"})]});i=new a({path:"Economy"});break}}sap.ui.getCore().byId("_IDBestBowlingList").bindAggregation("items",{path:"/BowlingStats",template:s,templateShareable:false,sorter:i})},onCloseHighestScore:function(){this.highestScoreFragment.close()},onCloseMostFifties:function(){this.mostFiftiesFragment.close()},onCloseMostHundreds:function(){this.mostHundredsFragment.close()},onCloseMostRuns:function(){this.mostRunsFragment.close()},onPressTeamSquad:function(t){var s=t.getSource().getProperty("title");var a=[];var o=new i("Country_Name",n.EQ,s);a.push(o);let g=this.getOwnerComponent().getModel();g.read("/Players",{filters:a,success:function(t){var s=new e(t.results);this.getView().setModel(s,"oPlayersModel")}.bind(this),error:function(){r.information(this.resourceBundle.getText("errorGettingInfo"))}.bind(this)});if(!this.squadFragment){this.squadFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.squads",this);this.getView().addDependent(this.squadFragment)}this.squadFragment.open()},onPressSquadFragment:function(){this.squadFragment.close()},onCloseBowlingStats:function(){this.bowlingStatsFragment.close()}})});