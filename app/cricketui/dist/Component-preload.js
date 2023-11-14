//@ui5-bundle wc/india/cricketui/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"wc/india/cricketui/Component.js":function(){sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","wc/india/cricketui/model/models"],function(e,i,t){"use strict";return e.extend("wc.india.cricketui.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.getRouter().initialize();this.setModel(t.createDeviceModel(),"device")}})});
},
	"wc/india/cricketui/controller/App.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller"],function(e){"use strict";return e.extend("wc.india.cricketui.controller.App",{onInit(){}})});
},
	"wc/india/cricketui/controller/PointsTable.controller.js":function(){sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/m/MessageBox","sap/ui/model/Sorter"],function(t,e,s,i,n,r,a){"use strict";return t.extend("wc.india.cricketui.controller.PointsTable",{onInit:function(){this.resourceBundle=this.getOwnerComponent().getModel("i18n").getResourceBundle()},onNavToResultPage:function(t){var i=t.getSource().getBindingContext().sPath.split("'")[1];let n=this.getOwnerComponent().getModel();n.read("/TeamsData('"+i+"')",{urlParameters:{$expand:"Results"},success:function(t){var s=new e(t.Results);this.getView().setModel(s,"oResultModel")}.bind(this),error:function(t){r.information(this.resourceBundle.getText("errorGettingInfo"))}.bind(this)});if(!this._pDialog){this._pDialog=s.load({id:this.getView().getId(),name:"wc.india.cricketui.fragments.Results",controller:this}).then(function(t){this.getView().addDependent(t);return t}.bind(this))}this._pDialog.then(function(t){t.open()}.bind(this))},onSearchResults:function(t){var e=t.getParameter("value");var s=new i("Opponent",n.Contains,e);var r=t.getSource().getBinding("items");r.filter([s])},onPressBattingStats:function(t){let e=t.getSource().getProperty("title");switch(e){case"Most Runs":{if(!this.mostRunsFragment){this.mostRunsFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.mostruns",this);this.getView().addDependent(this.mostRunsFragment)}this.mostRunsFragment.open();break};case"Highest Scores":{if(!this.highestScoreFragment){this.highestScoreFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.highestScore",this);this.getView().addDependent(this.highestScoreFragment)}this.highestScoreFragment.open();break};case"Most Hundreds":{if(!this.mostHundredsFragment){this.mostHundredsFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.mostHundreds",this);this.getView().addDependent(this.mostHundredsFragment)}this.mostHundredsFragment.open();break};case"Most Fifties":{if(!this.mostFiftiesFragment){this.mostFiftiesFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.mostFifties",this);this.getView().addDependent(this.mostFiftiesFragment)}this.mostFiftiesFragment.open();break}}},onPressBowlingStats:function(t){let e=t.getSource().getProperty("title");var s;var i;if(!this.bowlingStatsFragment){this.bowlingStatsFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.bowlingstats",this);this.getView().addDependent(this.bowlingStatsFragment)}this.bowlingStatsFragment.open();sap.ui.getCore().byId("_IDBowlingStatsDialog").setTitle(e);switch(e){case"Most Wickets":{s=new sap.m.ObjectListItem({title:"{Player}",number:"{Wickets}",attributes:[new sap.m.ObjectAttribute({text:"{Country}"})]});i=new a({path:"Wickets",descending:true});break};case"Best Bowling":{s=new sap.m.ObjectListItem({title:"{Player}",number:"{BestBowling}",attributes:[new sap.m.ObjectAttribute({text:"{Country}"})]});i=new a({path:"BestBowling",descending:true});break};case"Best Economy":{s=new sap.m.ObjectListItem({title:"{Player}",number:"{Economy}",attributes:[new sap.m.ObjectAttribute({text:"{Country}"})]});i=new a({path:"Economy"});break}}sap.ui.getCore().byId("_IDBestBowlingList").bindAggregation("items",{path:"/BowlingStats",template:s,templateShareable:false,sorter:i})},onCloseHighestScore:function(){this.highestScoreFragment.close()},onCloseMostFifties:function(){this.mostFiftiesFragment.close()},onCloseMostHundreds:function(){this.mostHundredsFragment.close()},onCloseMostRuns:function(){this.mostRunsFragment.close()},onPressTeamSquad:function(t){var s=t.getSource().getProperty("title");var a=[];var o=new i("Country_Name",n.EQ,s);a.push(o);let g=this.getOwnerComponent().getModel();g.read("/Players",{filters:a,success:function(t){var s=new e(t.results);this.getView().setModel(s,"oPlayersModel")}.bind(this),error:function(){r.information(this.resourceBundle.getText("errorGettingInfo"))}.bind(this)});if(!this.squadFragment){this.squadFragment=sap.ui.xmlfragment("wc.india.cricketui.fragments.squads",this);this.getView().addDependent(this.squadFragment)}this.squadFragment.open()},onPressSquadFragment:function(){this.squadFragment.close()},onCloseBowlingStats:function(){this.bowlingStatsFragment.close()}})});
},
	"wc/india/cricketui/fragments/Results.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><TableSelectDialog id="_IDResultTable" items="{path :\'oResultModel>/results\',\n    sorter:{\n        path : \'oResultModel>MatchDate\'\n    }}" title="{oResultModel>/results/0/Team_Name} {i18n>Results}" contentHeight="42%" contentWidth="50%" titleAlignment="Center" search=".onSearchResults" searchPlaceholder="{i18n>searchPlaceHolder}"><columns><Column ><Text text="{i18n>Opponent}"></Text></Column><Column ><Text text="{i18n>MatchDate}"></Text></Column><Column ><Text text="{i18n>Results}"></Text></Column></columns><items><ColumnListItem ><cells><Text text="{oResultModel>Opponent}"/><Text text="{path:\'oResultModel>MatchDate\',\n                        type:\'sap.ui.model.type.Date\',\n                        formatOptions:{\n                            style: \'medium\'\n                        }}"/><ObjectIdentifier title="{oResultModel>Result}"/></cells></ColumnListItem></items></TableSelectDialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/bestbowling.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDBestBowling" contentHeight="45%" contentWidth="45%" title="{i18n>BestBowling}"><content><List id="_IDBestBowlingList" items="{path : \'/BowlingStats\',\n        sorter: {\n            path : \'BestBowling\',descending:true\n        }}"><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                                  parts:[{path:\'BestBowling\'}] }"><ObjectAttribute text="{i18n>TotalWickets}{Wickets}" /><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseBestBowling"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/besteconomy.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDBestEconomy" contentHeight="45%" contentWidth="45%" title="{i18n>BestEconomy}"><content><List items="{path : \'/BowlingStats\',\n        sorter: {\n            path : \'Economy\'\n        }}" ><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                                  parts:[{path:\'Economy\'}] }"><ObjectAttribute text="{i18n>TotalWickets}{Wickets}" /><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseBestEconomy"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/bowlingstats.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDBowlingStatsDialog" contentHeight="45%" contentWidth="45%"><content><List id="_IDBestBowlingList"></List></content><beginButton><Button text="{i18n>OK}" press="onCloseBowlingStats"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/highestScore.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDHighestScore" contentHeight="45%" contentWidth="45%" title="{i18n>HighestScore}"><content><List items="{path : \'/BattingStats\',\n        sorter: {\n            path : \'HighestScore\',descending: true\n        }}" ><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                                  parts:[{path:\'HighestScore\'}] }"><ObjectAttribute text="{i18n>TotalRunsScored}{Runs}" /><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseHighestScore"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/mostFifties.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDMostFifties" contentHeight="45%" contentWidth="45%" title="{i18n>MostFifties}"><content><List items="{path : \'/BattingStats\',\n        sorter: {\n            path : \'Fifties\',descending : true\n        }}"><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                                    parts:[{path:\'Fifties\'}] }"><ObjectAttribute text="{i18n>TotalRunsScored}{Runs}" /><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseMostFifties"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/mostHundreds.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDMostHundreds" contentHeight="45%" contentWidth="45%" title="{i18n>MostHundred}"><content><List items="{path : \'/BattingStats\',\n        sorter: {\n            path : \'Hundreds\',descending : true\n        }}"><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                        parts:[{path:\'Hundreds\'}] }"><ObjectAttribute text="{i18n>TotalRunsScored}{Runs}" /><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseMostHundreds"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/mostruns.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDMostRuns" contentHeight="45%" contentWidth="45%" title="{i18n>MostRuns}"><content><List items="{path : \'/BattingStats\',\n                         sorter: {\n                              path : \'Runs\' ,descending : true\n        }}"><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                                  parts:[{path:\'Runs\'}] }"><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseMostRuns"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/mostwickets.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDMostWickets" contentHeight="45%" contentWidth="45%" title="{i18n>MostWickets}"><content><List items="{path : \'/BowlingStats\',\n        sorter: {\n            path : \'Wickets\',descending: true\n        }}" ><ObjectListItem title="{Player}" type="Active" number="{\n\t\t\t\t                                                  parts:[{path:\'Wickets\'}] }"><ObjectAttribute text="{Country}" /></ObjectListItem></List></content><beginButton><Button text="{i18n>OK}" press="onCloseMostWickets"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/pointsTable.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Table items="{path:\'/TeamsData\',\n                                       sorter:{ path:\'Points\' ,descending :true}}" headerText="{i18n>pointsTable}"><columns><Column width="12em"><header><Text text="{i18n>Team}" /></header></Column><Column width="10em" minScreenWidth="phone" demandPopin="false"><header><Text text="{i18n>MatchesPlayed}" /></header></Column><Column width="10em" demandPopin="false"><header><Text text="{i18n>Won}" /></header></Column><Column width="10em" minScreenWidth="Tablet" demandPopin="true"><header><Text text="{i18n>Lost}" /></header></Column><Column width="10em" minScreenWidth="Tablet" demandPopin="false"><header><Text text="{i18n>NoResult}" /></header></Column><Column width="5em" minScreenWidth="Tablet" demandPopin="true"><header><Text text="{i18n>Points}" /></header></Column><Column width="5em"></Column></columns><items><ColumnListItem vAlign="Middle"><cells><ObjectIdentifier title="{Name}" /><Text text="{MatchesPlayed}" /><Text text="{MatchesWon}" /><Text text="{MatchesLost}" /><Text text="{MatchesTied}" /><ObjectIdentifier title="{Points}" /><Button icon="sap-icon://dropdown" type="Transparent" press="onNavToResultPage"></Button></cells></ColumnListItem></items></Table></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/squads.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><Dialog id="_IDSquadDialog" title="{oPlayersModel>/0/Country_Name}" contentHeight="65%" contentWidth="33%"><content><List id="_IDSquadList" items="{path:\'oPlayersModel>/\',\n                                            sorter : {\n                                                path : \'Role\',\n                                                group : true\n                                            }}"><items><StandardListItem title="{oPlayersModel>Name}"/></items></List></content><beginButton ><Button text="{i18n>OK}" press="onPressSquadFragment"></Button></beginButton></Dialog></core:FragmentDefinition>',
	"wc/india/cricketui/fragments/stats.fragment.xml":'<core:FragmentDefinition xmlns:core="sap.ui.core"\n    xmlns="sap.m"><HBox><VBox class="classStatsVbox"><List id="_IDBattingStats" items="{oStatModel>/battingStatsHeaderData}" headerText="{i18n>BattingStats}"><items><ObjectListItem type="Navigation" title="{oStatModel>Header}" press="onPressBattingStats"></ObjectListItem></items></List></VBox><VBox class="classStatsVbox"><List id="_IDBowlingStats" items="{oStatModel>/bowlingStatsHeaderData}" headerText="{i18n>BowlingStats}"><items><ObjectListItem title="{oStatModel>Header}" press="onPressBowlingStats" type="Navigation"></ObjectListItem></items></List></VBox></HBox></core:FragmentDefinition>',
	"wc/india/cricketui/i18n/i18n.properties":'# This is the resource bundle for wc.india.cricketui\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=ICC World Cup India 2023\n\n#YDES: Application description\nappDescription=ICC World Cup India 2023\n#XTIT: Main view title\ntitle=ICC World Cup India 2023\n\n# Points Table View\npointsTable=Points Table\nTeam=Team\nMatchesPlayed=Matches Played\nWon=Won\nLost=Lost\nNoResult=No Result\nPoints=Points\nstats=Stats\nerrorGettingInfo=Error Getting Information\n\n\n# Results Fragment\nsearchPlaceHolder=Search with Opponent Team Name\nOpponent=Opponent\nMatchDate= Match Date\nResults=Results\n\n# Batting Stats Fragments\nBattingStats=Batting Stats\nHighestScore=Highest Score\nTotalRunsScored=Total Runs Scored:\nOK=OK\nMostFifties=Most Fifties\nMostHundred=Most Hundreds\nMostRuns=Most Runs Scored\nHundreds=Hundreds:\n\n# Bowling Stats Fragments\nBowlingStats=Bowling Stats\nBestEconomy=Best Economy\nTotalWickets=Total Wickets:\nMostWickets=Most Wickets\nBestBowling=Best Bowling\n\n# Squad \nsquads=Squads',
	"wc/india/cricketui/manifest.json":'{"_version":"1.58.0","sap.app":{"id":"wc.india.cricketui","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.11.2","toolsId":"2c4d9320-ee32-4109-ad24-c85510951d6c"},"dataSources":{"mainService":{"uri":"odata/v2/world-cup/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"2.0"}}},"crossNavigation":{"inbounds":{"worldcup2k23":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"WorldCup2k23","action":"display","title":"{{appTitle}}","subTitle":"","icon":""}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.119.2","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{},"sap.suite.ui.generic.template":{},"sap.ui.comp":{},"sap.ui.generic.app":{},"sap.ui.table":{},"sap.ushell":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"wc.india.cricketui.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"oStatModel":{"type":"sap.ui.model.json.JSONModel","uri":"model/stats.json"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.m.routing.Router","viewType":"XML","async":true,"viewPath":"wc.india.cricketui.view","controlAggregation":"pages","controlId":"app","clearControlAggregation":false},"routes":[{"name":"RoutePointsTable","pattern":":?query:","target":["TargetPointsTable"]}],"targets":{"TargetPointsTable":{"viewType":"XML","transition":"slide","clearControlAggregation":false,"viewId":"PointsTable","viewName":"PointsTable"}}},"rootView":{"viewName":"wc.india.cricketui.view.App","type":"XML","async":true,"id":"App"}},"sap.cloud":{"public":true,"service":"worldcup_2k23_approuter"}}',
	"wc/india/cricketui/model/models.js":function(){sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"wc/india/cricketui/view/App.view.xml":'<mvc:View controllerName="wc.india.cricketui.controller.App"\n    xmlns:html="http://www.w3.org/1999/xhtml"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"><App id="app"></App></mvc:View>\n',
	"wc/india/cricketui/view/PointsTable.view.xml":'<mvc:View controllerName="wc.india.cricketui.controller.PointsTable"\n    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"\n    xmlns="sap.m"\n    xmlns:core="sap.ui.core"\n    xmlns:smartTable="sap.ui.comp.smarttable"\n    xmlns:smartFilterBar="sap.ui.comp.smartfilterbar"\n    xmlns:uxap="sap.uxap"><Page id="page" title="{i18n>title}"><content><uxap:ObjectPageLayout id="_IDObjecctPageLayout"><uxap:sections><uxap:ObjectPageSection title="{i18n>pointsTable}"><uxap:subSections><uxap:ObjectPageSubSection ><uxap:blocks><core:Fragment fragmentName="wc.india.cricketui.fragments.pointsTable"/></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection><uxap:ObjectPageSection title="{i18n>stats}"><uxap:subSections><uxap:ObjectPageSubSection ><uxap:blocks><core:Fragment fragmentName="wc.india.cricketui.fragments.stats"/></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection><uxap:ObjectPageSection title="{i18n>squads}"><uxap:subSections><uxap:ObjectPageSubSection ><uxap:blocks><List id="_IDSquads" items="{/Team}"><items><StandardListItem title="{Name}" type="Navigation" press="onPressTeamSquad"/></items></List></uxap:blocks></uxap:ObjectPageSubSection></uxap:subSections></uxap:ObjectPageSection></uxap:sections></uxap:ObjectPageLayout></content></Page></mvc:View>'
}});
