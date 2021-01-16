(this["webpackJsonpsoccer-simulator-react"]=this["webpackJsonpsoccer-simulator-react"]||[]).push([[0],{14:function(e,t,a){},15:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a(1),r=a.n(o),c=a(8),i=a.n(c),s=(a(14),a(3)),l=a(4),h=a(6),u=a(5),d=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleInputChange=function(e){if(n.state.isPlayed){var t=parseInt(e.target.value),a={homeGoal:n.state.homeGoal,awayGoal:n.state.awayGoal,matchId:e.target.attributes.matchid.value};t>=0&&("home"===e.target.id?(n.setState({homeGoal:t}),a.homeGoal=t):(n.setState({awayGoal:t}),a.awayGoal=t)),n.props.onInputChange(a)}},n.handleUpdateScores=function(){return n.props.onUpdateClick(n.state)},n.state={homeGoal:0,awayGoal:0,matchId:"",isPlayed:!1},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("tr",{id:this.props.match.id,children:[Object(n.jsxs)("td",{name:"home",children:[this.props.match.home,Object(n.jsx)("input",{type:"number",id:"home",value:this.state.homeGoal,onChange:this.handleInputChange,team:this.props.match.home,matchid:this.props.match.id})]}),Object(n.jsxs)("td",{name:"away",children:[Object(n.jsx)("input",{type:"number",id:"away",value:this.state.awayGoal,onChange:this.handleInputChange,team:this.props.match.away,matchid:this.props.match.id}),this.props.match.away]}),Object(n.jsx)("td",{children:Object(n.jsx)("button",{onClick:this.handleUpdateScores,disabled:!this.state.isPlayed,children:"UPDATE"})})]},this.props.match.id)}}]),a}(r.a.Component);d.getDerivedStateFromProps=function(e,t){return t.homeGoal!==e.homeGoal||t.awayGoal!==e.awayGoal?{homeGoal:e.match.homeGoal,awayGoal:e.match.awayGoal,matchId:e.match.id,isPlayed:e.match.isPlayed}:null};var m=d,p=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).handleNextWeek=function(){return e.props.onNextWeekClick()},e.handlePastWeek=function(){return e.props.onPastWeekClick()},e}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsx)("tr",{children:Object(n.jsxs)("td",{children:[Object(n.jsx)("input",{type:"button",value:"PAST WEEK",onClick:this.handlePastWeek}),Object(n.jsx)("input",{type:"button",value:"NEXT WEEK",onClick:this.handleNextWeek})]})})}}]),a}(r.a.Component),f=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).handleNextWeekClick=function(){return e.props.onClickNext()},e.handlePastWeekClick=function(){return e.props.onClickPast()},e.handleUpdateClick=function(t){return e.props.onUpdateClick(t)},e.handleGoalChange=function(t){return e.props.onGoalInputChange(t)},e}return Object(l.a)(a,[{key:"render",value:function(){var e=this,t=this.props.viewedMatches.map((function(t){return Object(n.jsx)(m,{match:t,onInputChange:e.handleGoalChange,onUpdateClick:e.handleUpdateClick},t.id)}));return Object(n.jsxs)("table",{children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:"HOME"}),Object(n.jsx)("td",{}),Object(n.jsx)("td",{children:"AWAY"}),Object(n.jsx)("td",{})]})}),Object(n.jsx)("tbody",{children:t}),Object(n.jsx)("tfoot",{children:Object(n.jsx)(p,{onNextWeekClick:this.handleNextWeekClick,onPastWeekClick:this.handlePastWeekClick})})]})}}]),a}(r.a.Component),g=a(2);function j(e){return e.sort((function(e,t){return t.points-e.points||t.goalDifference-e.goalDifference||t.goalsAgainst-e.goalsAgainst}))}function y(e,t,a,n){if(n){0==(o=t.points-e.points)?t.championshipChance="high chance":o>a?t.championshipChance="champion":o<a?t.championshipChance="problably":o==a&&(t.championshipChance="high chance")}else{var o=Math.abs(e.points-t.points);a?0===o?t.championshipChance="high chance":o>a?t.championshipChance="impossible":o<a?e.points>t.points?t.championshipChance="problably":t.championshipChance="high chance":o===a&&(e.points>t.points?t.championshipChance="low chance":t.championshipChance="problably"):t.championshipChance="no chance"}return t}var w={createAndSetFixture:function(e){for(var t=[],a=g.length-1;a>0;a--){var n=Math.floor(Math.random()*(a+1)),o=[g[n],g[a]];g[a]=o[0],g[n]=o[1]}for(var r=0,c=0;c<e;c++)for(var i=0;i<2;i++){var s=(c+i)%(g.length-1),l=(g.length-1-i+c)%(g.length-1),h="",u="";0===i&&(l=g.length-1),c>2?(u=g[s].name,h=g[l].name):(u=g[l].name,h=g[s].name),r++,t.push({id:r.toString(),home:u,away:h,week:c+1,homeGoal:0,awayGoal:0,isPlayed:!1})}return localStorage.setItem("fixture",JSON.stringify(t)),t},setAndReturnTeams:function(){var e=[{id:"int",name:"Inter",playerQuality:8,tactics:"off",attack:8,defence:8,fanSupport:6,won:0,lost:0,drawn:0,points:0,played:0,goalsFor:0,goalsAgainst:0,goalDifference:0,morale:10,championshipChance:"soon"},{id:"fen",name:"Fenerbah\xe7e",playerQuality:7,tactics:"off",attack:6,defence:7,fanSupport:9,won:0,lost:0,drawn:0,points:0,played:0,goalsFor:0,goalsAgainst:0,goalDifference:0,morale:10,championshipChance:"soon"},{id:"psv",name:"PSV Eindhoven",playerQuality:6,tactics:"off",attack:6,defence:5,fanSupport:4,won:0,lost:0,drawn:0,points:0,played:0,goalsFor:0,goalsAgainst:0,goalDifference:0,morale:10,championshipChance:"soon"},{id:"cska",name:"CSKA Moskova",playerQuality:4,tactics:"def",attack:5,defence:4,fanSupport:5,won:0,lost:0,drawn:0,points:0,played:0,goalsFor:0,goalsAgainst:0,goalDifference:0,morale:10,championshipChance:"soon"}];return localStorage.setItem("teams",JSON.stringify(e)),e},sortTeams:j,playMatch:function(e,t){var a=0,n=0,o=0,r=0;"def"===e.tactics&&"def"===t.tactics&&(e.defence>t.defence?(a++,t.attack>e.attack?r++:a++):(o++,e.attack>t.attack?n++:o++)),"off"===e.tactics&&"off"===t.tactics&&(e.attack>t.attack?(a++,t.defence>e.defence?r++:a++):(o++,t.defence<e.defence?n++:o++)),"def"===e.tactics&&"off"===t.tactics&&(e.defence>t.attack?(a++,t.defence>e.defence?r++:a++):(o++,t.attack<e.attack?n++:o++)),"off"===e.tactics&&"def"===t.tactics&&(e.attack>t.defence?(a++,t.defence>e.defence?r++:a++):(o++,t.defence<e.defence?n++:o++)),a+=e.fanSupport/2,e.morale+=2,t.morale-=2,e.morale>t.morale?a+=2:o+=2;var c,i,s=e.playerQuality-t.playerQuality;function l(e,t){return Math.floor(Math.random()*(t+1-e)+e)}return e.playerQuality>t.playerQuality?(a+=2,s<4?r++:r--):(o+=2,s<4?n++:n--),e.attack>t.attack&&t.defence<e.defence&&(a+=2),e.attack<t.attack&&t.defence>e.defence&&(o+=2),e.attack>t.attack&&t.defence>e.defence&&(o+=2),a>o?n>r?(c=l(1,5),i=l(0,4)):n<r?(c=l(1,5),i=l(1,4)):(c=l(1,5),i=l(0,4)):a<o?n<r?(i=l(1,5),c=l(0,4)):n>r?(i=l(1,5),c=l(1,4)):(i=l(1,5),c=l(0,4)):(c=l(0,4),i=l(0,4)),{homeGoal:c,awayGoal:i}},getMatchesOfWeek:function(e,t){return e.filter((function(e){return e.week===t})).filter(Boolean)},setMatchStatistics:function(e,t,a){var n=a.homeGoal>a.awayGoal?"home":a.homeGoal===a.awayGoal?"drawn":"away";switch(e.played++,t.played++,e.goalDifference+=a.homeGoal-a.awayGoal,t.goalDifference+=a.awayGoal-a.homeGoal,e.goalsAgainst+=a.awayGoal,t.goalsAgainst+=a.homeGoal,e.goalsFor+=a.homeGoal,t.goalsFor+=a.awayGoal,n){case"home":e.points+=3,e.won++,t.lost++,e.morale+=2,t.morale-=2;break;case"away":t.points+=3,t.won++,e.lost++,e.morale-=2,t.morale+=2;break;case"drawn":e.drawn++,t.drawn++,e.points++,t.points++,e.morale+=1,t.morale+=1}return{homeTeam:e,awayTeam:t}},undoMatchStatistics:function(e,t,a){var n=a.homeGoal>a.awayGoal?"home":a.homeGoal===a.awayGoal?"drawn":"away";switch(e.played--,t.played--,e.goalDifference-=a.homeGoal-a.awayGoal,t.goalDifference-=a.awayGoal-a.homeGoal,e.goalsFor-=a.homeGoal,t.goalsFor-=a.awayGoal,e.goalsAgainst-=a.awayGoal,t.goalsAgainst-=a.homeGoal,n){case"home":e.points-=3,e.won--,t.lost--,e.morale-=2,t.morale+=2;break;case"away":t.points-=3,e.lost--,t.won--,e.morale+=2,t.morale-=2;break;case"drawn":e.drawn--,t.drawn--,e.points--,t.points--,e.morale-=1,t.morale-=1}return{homeTeam:e,awayTeam:t}},simulateAllMatches:function(e,t,a,n){var o,r,c,i,s=e,l=t;return e.filter((function(e){return!e.isPlayed})).forEach((function(e){l=l.filter((function(t){return t.name!==e.home&&t.name!==e.away})),s=s.filter((function(t){return t.id!==e.id})),o=t.filter((function(t){return t.name===e.home}))[0],r=t.filter((function(t){return t.name===e.away}))[0],c=a(o,r),e.homeGoal=c.homeGoal,e.awayGoal=c.awayGoal,e.isPlayed=!0,s.push(e),i=n(o,r,e),l.push(i.homeTeam),l.push(i.awayTeam)})),{newFixture:s,newTeams:l}},calculateChampionshipChanceAndSet:function(e,t){var a=3*e,n=(t=j(t))[0],o=t[1];a?n=y(o,n,a,!0):n.championshipChance="champion";var r=[n];return t.forEach((function(e){e.name!==n.name&&r.push(y(n,e,a))})),t},calculateDoubleAverage:function(e,t,a){var n=a.filter((function(a){return a.home===e.name&&a.away===t.name}))[0],o=a.filter((function(a){return a.home===t.name&&a.away===e.name}))[0],r=0,c=0,i=n.homeGoal+o.awayGoal,s=o.homeGoal+n.awayGoal;if(n.homeGoal>n.awayGoal?r+=3:n.homeGoal<n.awayGoal?c+=3:(r+=1,c+=1),o.homeGoal>o.awayGoal?c+=3:o.homeGoal<o.awayGoal?r+=3:(r+=1,c+=1),r>c)return e.name;if(r<c)return t.name;if(i!==s){var l=n.homeGoal+2*o.awayGoal,h=o.homeGoal+2*n.awayGoal;return l>h?e.name:l<h?t.name:e.goalsFor>t.goalsFor?e.name:e.goalsFor<t.goalsFor?t.name:"equal"}return e.goalDifference>t.goalDifference?e.name:e.goalDifference<t.goalDifference?t.name:e.goalsFor>t.goalsFor?e.name:e.goalsFor>t.goalsFor?t.name:"equal"}},k=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e=w.sortTeams(this.props.teams);return 0===this.props.currentWeek&&(e=e.sort((function(e,t){return e.name.localeCompare(t.name)}))),Object(n.jsxs)("table",{children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:"NAME"}),Object(n.jsx)("td",{children:"PLAYED"}),Object(n.jsx)("td",{children:"WON"}),Object(n.jsx)("td",{children:"DRAWN"}),Object(n.jsx)("td",{children:"LOST"}),Object(n.jsx)("td",{children:"GF"}),Object(n.jsx)("td",{children:"GA"}),Object(n.jsx)("td",{children:"GD"}),Object(n.jsx)("td",{children:"POINTS"})]})}),Object(n.jsx)("tbody",{children:e.map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:e.name}),Object(n.jsx)("td",{children:e.played}),Object(n.jsx)("td",{children:e.won}),Object(n.jsx)("td",{children:e.drawn}),Object(n.jsx)("td",{children:e.lost}),Object(n.jsx)("td",{children:e.goalsFor}),Object(n.jsx)("td",{children:e.goalsAgainst}),Object(n.jsx)("td",{children:e.goalDifference}),Object(n.jsx)("td",{children:e.points})]},e.name)}))})]})}}]),a}(r.a.Component),b=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t.call.apply(t,[this].concat(o))).handlePlayButton=function(){var t=JSON.parse(localStorage.getItem("fixture")||"[]")||[],a=e.props.currentWeek+1;a<=e.props.fixture.length/2&&e.props.fixture.filter((function(e){return e.week===a})).forEach((function(a){var n=e.props.teams.filter((function(e){return e.name===a.home}))[0],o=e.props.teams.filter((function(e){return e.name===a.away}))[0],r=w.playMatch(n,o),c=t.filter((function(e){return a.id===e.id}))[0],i=e.props.teams.filter((function(e){return e.name!==n.name&&e.name!==o.name}));c.homeGoal=r.homeGoal,c.awayGoal=r.awayGoal,c.isPlayed=!0;var s=w.setMatchStatistics(n,o,c);i.push(s.homeTeam),i.push(s.awayTeam),e.props.onPlayButtonClick(c,i)}))},e.handeSimulateAllButton=function(){var t=w.simulateAllMatches(e.props.fixture,e.props.teams,w.playMatch,w.setMatchStatistics);e.props.onSimulateAllMatches(t)},e.handleRestart=function(){e.props.onRestart()},e}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{name:"play-buttons",children:[this.props.currentWeek<6?Object(n.jsx)("button",{onClick:this.handlePlayButton,children:" PLAY NEXT WEEK "}):null,this.props.currentWeek>0?Object(n.jsx)("button",{onClick:this.handleRestart,children:" RESTART "}):null,this.props.currentWeek<5?Object(n.jsx)("button",{onClick:this.handeSimulateAllButton,children:" S\u0130MULATE ALL MATCH"}):null]})}}]),a}(r.a.Component),O=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("table",{children:[Object(n.jsx)("thead",{children:Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:"TEAM"}),Object(n.jsx)("td",{children:"CHANCE"})]})}),Object(n.jsx)("tbody",{children:w.sortTeams(this.props.teams).map((function(e){return Object(n.jsxs)("tr",{children:[Object(n.jsx)("td",{children:e.name}),Object(n.jsx)("td",{children:e.championshipChance})]},e.name)}))})]})}}]),a}(r.a.Component),x=function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(s.a)(this,a),(n=t.call(this,e)).handleUpdateClick=function(e){var t=JSON.parse(localStorage.getItem("fixture")),a=t.filter((function(t){return t.id===e.matchId}))[0];if(a.isPlayed){var o=t.filter((function(t){return t.id!==e.matchId})),r=n.state.teams.filter((function(e){return e.name===a.home}))[0],c=n.state.teams.filter((function(e){return e.name===a.away}))[0],i=n.state.teams.filter((function(e){return e.name!==a.home&&e.name!==a.away})),s=w.undoMatchStatistics(r,c,a);if(a.homeGoal=e.homeGoal,a.awayGoal=e.awayGoal,o.push(a),o.sort((function(e,t){return parseInt(e.id)-parseInt(t.id)})),s=w.setMatchStatistics(s.homeTeam,s.awayTeam,a),i.push(s.homeTeam),i.push(s.awayTeam),i=w.sortTeams(i),n.state.currentWeek>2){var l=o.length/2-n.state.currentWeek;i=w.calculateChampionshipChanceAndSet(l,i)}localStorage.setItem("fixture",JSON.stringify(o)),localStorage.setItem("teams",JSON.stringify(i)),n.setState({fixture:o,teams:i})}},n.handleGoalInputChange=function(e){var t=n.state.viewedMatches.filter((function(t){return t.id===e.matchId}))[0],a=n.state.viewedMatches.filter((function(t){return t.id!==e.matchId}));t.homeGoal=e.homeGoal,t.awayGoal=e.awayGoal,a.push(t),a.sort((function(e,t){return parseInt(e.id)-parseInt(t.id)})),n.setState({viewedMatches:a})},n.handePlayButtonClick=function(e,t){var a=JSON.parse(localStorage.getItem("fixture")||"[]").filter((function(t){return t.id!==e.id})),o=n.state.currentWeek+1;if(a.push(e),o>2){var r=a.length/2-o;t=w.calculateChampionshipChanceAndSet(r,t)}localStorage.setItem("fixture",JSON.stringify(a)),localStorage.setItem("currentWeek",o),localStorage.setItem("teams",JSON.stringify(t)),n.setState({fixture:a,teams:t,currentWeek:o,viewedWeek:o,viewedMatches:w.getMatchesOfWeek(a,o)})},n.handleClickNext=function(){if(n.state.viewedWeek<6){var e=JSON.parse(localStorage.getItem("fixture")||"[]")||[];n.setState({viewedWeek:n.state.viewedWeek+1,viewedMatches:w.getMatchesOfWeek(e,n.state.viewedWeek+1)})}},n.handleClickPast=function(){if(n.state.viewedWeek>1){var e=JSON.parse(localStorage.getItem("fixture")||"[]")||[];n.setState({viewedWeek:n.state.viewedWeek-1,viewedMatches:w.getMatchesOfWeek(e,n.state.viewedWeek-1)})}},n.handleSimulateAllMatches=function(e){var t=e.newFixture.length/2;localStorage.setItem("fixture",JSON.stringify(e.newFixture)),localStorage.setItem("currentWeek",t),localStorage.setItem("teams",JSON.stringify(e.newTeams)),w.calculateChampionshipChanceAndSet(0,e.newTeams),n.setState({fixture:e.newFixture,teams:e.newTeams,currentWeek:t,viewedWeek:t,viewedMatches:w.getMatchesOfWeek(e.newFixture,t)})},n.handleRestart=function(){localStorage.setItem("fixture",""),localStorage.setItem("currentWeek","0"),localStorage.setItem("teams","");var e=w.createAndSetFixture(6),t=w.setAndReturnTeams();n.setState({fixture:e,teams:t,currentWeek:0,viewedWeek:1,viewedMatches:w.getMatchesOfWeek(e,1)})};var o=JSON.parse(localStorage.getItem("fixture")||"[]")||[],r=JSON.parse(localStorage.getItem("teams")||"[]")||[],c=parseInt(localStorage.getItem("currentWeek"))||0,i=o.length>0?o:w.createAndSetFixture(6);return localStorage.setItem("currentWeek",c),n.state={fixture:i,teams:r.length>0?r:w.setAndReturnTeams(),viewedMatches:w.getMatchesOfWeek(i,1),currentWeek:c,viewedWeek:1},n}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"App",children:[Object(n.jsx)(f,{fixture:this.state.fixture,onUpdateClick:this.handleUpdateClick,onClickNext:this.handleClickNext,onGoalInputChange:this.handleGoalInputChange,onClickPast:this.handleClickPast,teams:this.state.teams,viewedMatches:this.state.viewedMatches}),Object(n.jsx)(k,{teams:this.state.teams,currentWeek:this.state.currentWeek,fixture:this.state.fixture}),Object(n.jsx)(b,{teams:this.state.teams,fixture:this.state.fixture,currentWeek:this.state.currentWeek,onPlayButtonClick:this.handePlayButtonClick,onSimulateAllMatches:this.handleSimulateAllMatches,onRestart:this.handleRestart}),Object(n.jsx)(O,{teams:this.state.teams})]})}}]),a}(r.a.Component),v=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,16)).then((function(t){var a=t.getCLS,n=t.getFID,o=t.getFCP,r=t.getLCP,c=t.getTTFB;a(e),n(e),o(e),r(e),c(e)}))};i.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(x,{})}),document.getElementById("root")),v()},2:function(e){e.exports=JSON.parse('[{"id":"int","name":"Inter","playerQuality":8,"tactics":"off","attack":8,"defence":8,"fanSupport":6,"won":0,"lost":0,"drawn":0,"points":0,"played":0,"goalsFor":0,"goalsAgainst":0,"goalDifference":0,"morale":10,"championshipChance":"soon"},{"id":"fen","name":"Fenerbah\xe7e","playerQuality":7,"tactics":"off","attack":6,"defence":7,"fanSupport":9,"won":0,"lost":0,"drawn":0,"points":0,"played":0,"goalsFor":0,"goalsAgainst":0,"goalDifference":0,"morale":10,"championshipChance":"soon"},{"id":"psv","name":"PSV Eindhoven","playerQuality":6,"tactics":"off","attack":6,"defence":5,"fanSupport":4,"won":0,"lost":0,"drawn":0,"points":0,"played":0,"goalsFor":0,"goalsAgainst":0,"goalDifference":0,"morale":10,"championshipChance":"soon"},{"id":"cska","name":"CSKA Moskova","playerQuality":4,"tactics":"def","attack":5,"defence":4,"fanSupport":5,"won":0,"lost":0,"drawn":0,"points":0,"played":0,"goalsFor":0,"goalsAgainst":0,"goalDifference":0,"morale":10,"championshipChance":"soon"}]')}},[[15,1,2]]]);
//# sourceMappingURL=main.6a6af0c1.chunk.js.map