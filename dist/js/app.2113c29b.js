(function(e){function t(t){for(var n,o,l=t[0],a=t[1],h=t[2],u=0,c=[];u<l.length;u++)o=l[u],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&c.push(i[o][0]),i[o]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);p&&p(t);while(c.length)c.shift()();return s.push.apply(s,h||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,l=1;l<r.length;l++){var a=r[l];0!==i[a]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},i={app:0},s=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var h=0;h<l.length;h++)t(l[h]);var p=a;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"2bb1":function(e,t,r){"use strict";var n=r("7393"),i=r.n(n);i.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("Game")],1)},s=[],o=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"0px",top:"0px","background-color":"aliceblue","text-align":"center"}},[r("span",[e._v(" "+e._s(e.player2Str[0])+" "),r("br"),e._v(" "+e._s(e.player2Str[1])+" "),r("br"),r("br"),e._v(" "+e._s(e.player2Str[2])+" ")])]),r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"600px",top:"0px","background-color":"aliceblue","text-align":"center"}},[r("span",[e._v(" "+e._s(e.player1Str[0])+" "),r("br"),e._v(" "+e._s(e.player1Str[1])+" "),r("br"),r("br"),e._v(" "+e._s(e.player1Str[2])+" ")])]),r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"300px",top:"300px","background-color":"aliceblue","text-align":"center"}},[r("span",[e._v(" "+e._s(e.player0Str[0])+" "),r("br"),e._v(" "+e._s(e.player0Str[1])+" "),r("br"),r("br"),e._v(" "+e._s(e.player0Str[2])+" ")]),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.playerStr,expression:"playerStr"}],attrs:{type:"text"},domProps:{value:e.playerStr},on:{input:function(t){t.target.composing||(e.playerStr=t.target.value)}}}),r("button",{on:{click:e.sendPoker}},[e._v("send")]),r("button",{on:{click:e.pass}},[e._v("pass")])])]),r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"300px",top:"0px","background-color":"aliceblue","text-align":"center"}},[r("div",{staticStyle:{width:"300px","word-wrap":"break-word"}},[e._v(" "+e._s(e.deskStr[0])+" "),r("br"),e._v(" "+e._s(e.deskStr[1])+" ")])]),r("div",{staticStyle:{position:"fixed",left:"300px",top:"600px"}},[r("button",{on:{click:e.reStart}},[e._v("reStart")])])])},l=[],a=(r("b0c0"),r("a434"),r("d4ec")),h=r("bee2"),p=(r("99af"),r("0481"),r("d81d"),r("fb6a"),r("4069"),r("d3b7"),r("25f0"),function(){function e(t){Object(a["a"])(this,e),t.text?(this.text=t.text,this.number=e.textToNumber(t.text)):(this.number=t.number,this.text=e.numberToText(t.number)),this.type=t.type,this.selected=t.selected}return Object(h["a"])(e,[{key:"toString",value:function(){return this.text}}],[{key:"textToNumber",value:function(e){switch(e){case"3":return 3;case"4":return 4;case"5":return 5;case"6":return 6;case"7":return 7;case"8":return 8;case"9":return 9;case"10":case"0":case"T":case"t":return 10;case"11":case"j":case"J":return 11;case"12":case"q":case"Q":return 12;case"13":case"k":case"K":return 13;case"1":case"a":case"A":return 14;case"2":return 15;case"s":case"S":return 16;case"x":case"X":return 17}}},{key:"numberToText",value:function(e){switch(e){case 3:return"3";case 4:return"4";case 5:return"5";case 6:return"6";case 7:return"7";case 8:return"8";case 9:return"9";case 10:return"10";case 11:return"J";case 12:return"Q";case 13:return"K";case 14:return"A";case 15:return"2";case 16:return"S";case 17:return"X"}}},{key:"sortFunction",value:function(e,t){return e.number-t.number}},{key:"getObjByPokerList",value:function(t){if("pass"===t[0])return{type:"pass",poker:t};t.sort(e.sortFunction);for(var r=t[0],n=[r],i=[],s=1;s<t.length;s++)t[s].number!==r.number?(i.push(n),n=[t[s]]):n.push(t[s]),r=t[s];i.push(n);for(var o=[],l=[],a=[],h=[],p=0;p<i.length;p++)3===i[p].length?a.push(i[p]):2===i[p].length?l.push(i[p]):1===i[p].length?o.push(i[p]):4===i[p].length&&h.push(i[p]);if(1===t.length)return{type:"one",poker:t,one:t};if(2===t.length){if(1===l.length)return{type:"two",poker:t,two:t};if(16===t[0].number&&17===t[1].number)return{type:"sx",poker:t,sx:t}}else if(4===t.length){if(1===a.length)return{type:"threeWithOne",poker:t,three:a[0],one:o[0]};if(1===h.length)return{type:"four",poker:t,four:t}}else if(5===t.length){if(1===a.length&&1===l.length)return{type:"threeWithTwo",poker:t,three:a[0],two:l[0]}}else if(8===t.length){if(2===a.length&&a[0][0].number+1===a[1][0].number)return 1===l.length&&(o.push(l[0].splice(0,1)),o.push(l[0].splice(0,1))),{type:"threeWithOneList",poker:t,list:[{three:a[0],one:o[0]},{three:a[1],one:o[1]}]}}else if(10===t.length&&2===a.length&&a[0][0].number+1===a[1][0].number&&2===l.length)return{type:"threeWithTwoList",poker:t,list:[{three:a[0],two:l[0]},{three:a[1],two:l[1]}]};return t.length>=5&&o.length===t.length&&t[0].number+t.length-1===t[t.length-1].number?{type:"oneList",poker:t,list:o.map((function(e){return{one:e}}))}:t.length>=6&&t.length%2===0&&l.length===t.length/2&&t[0].number+t.length/2-1===t[t.length-1].number&&{type:"twoList",poker:t,list:l.map((function(e){return{two:e}}))}}},{key:"pokerListToString",value:function(e){for(var t="",r=0;r<e.length;r++){var n=e[r].toString();t+=n}return t}}]),e}()),u=p,c=function(){function e(t){Object(a["a"])(this,e),t=t||{},this.pokerList=[],this.name=t.name||"noName"+Math.random(),this.type=t.type||"nongmin",this.last=null,this.next=null,this.isRobot=t.isRobot,this.game=t.game,this.lastSendObj=null}return Object(h["a"])(e,[{key:"addPoker",value:function(e){this.pokerList.push(e)}},{key:"sortPoker",value:function(){this.pokerList.sort(this.sortFunction)}},{key:"sortFunction",value:function(e,t){return e.number-t.number}},{key:"getLastObj",value:function(){var e=this.last.lastSendObj;return!!(e&&"pass"!==e.type||(e=this.next.lastSendObj,e&&"pass"!==e.type))&&e}},{key:"playByAI",value:function(){var e=this;setTimeout((function(){var t=e.getLastObj();t?e.playByObj(t):e.playByAllType()}),1e3)}},{key:"sendPoker",value:function(e){this.game.clearDesk(),this.lastSendObj=e,this.game.deskPokerObj=e,this.game.next()}},{key:"playByAllType",value:function(){for(var e=["threeWithTwoList","threeWithOneList","twoList","threeWithTwo","oneList","threeWithOne","two","one","four","sx","pass"],t=0;t<e.length;t++){var r=this.getSmallestObjByType(e[t]);if(r){var n=this.deleteFromPokerListAndSendByObj(r);return void(n||alert("error!"))}}}},{key:"deleteFromPokerListAndSendByObj",value:function(e){var t=[];if("pass"===e.type)return this.sendPoker(e),!0;for(var r=e.poker,n=0;n<r.length;n++){var i=this.getAndDeleteOnePokerByNumber(r[n].number);if(!i)return this.listBackToPokerList(t),!1;t.push(i)}return this.sendPoker(e),!0}},{key:"getSmallestObjByType",value:function(e){for(var t=this.pokerList,r=t[0],n=[r],i=[],s=1;s<t.length;s++)t[s].number!==r.number?(i.push(n),n=[t[s]]):n.push(t[s]),r=t[s];i.push(n);for(var o=[],l=[],a=[],h=[],p=0;p<i.length;p++)3===i[p].length?a.push(i[p]):2===i[p].length?l.push(i[p]):1===i[p].length?o.push(i[p]):4===i[p].length&&h.push(i[p]);var u=null;if("one"===e){if(o.length>0)u={type:e,poker:o[0],one:o[0]};else if(l.length>0){var c=l[0].slice(0,1);u={type:e,poker:c,one:c}}else if(a.length>0){var f=a[0].slice(0,1);u={type:e,poker:f,one:f}}}else if("two"===e){if(l.length>0)u={type:e,poker:l[0],two:l[0]};else if(a.length>0){var g=a[0].slice(0,2);u={type:e,poker:g,one:g}}}else if("threeWithOne"===e){if(a.length>0){var y;if(o.length>0)y=o[0];else if(l.length>0)y=l[0].slice(0,1);else if(a.length>0)for(var k=0;k<a.length;k++)0!==k&&(y=a[k].slice(0,1));y&&(u={type:e,poker:a[0].concat(y),three:a[0],one:y})}}else if("four"===e)h.length>0&&(u={type:e,poker:h[0],four:h[0]});else if("threeWithTwo"===e){if(a.length>0){var b;if(l.length>0)b=l[0];else if(a.length>0)for(var v=0;v<a.length;v++)0!==v&&(b=a[v].slice(0,2));b&&(u={type:e,poker:a[0].concat(b),three:a[0],two:b})}}else if("threeWithOneList"===e){if(a.length>1)for(var d=0;d<a.length-1;d++)if(a[d][0].number+1===a[d+1][0].number+1){var m=void 0,L=void 0;if(o.length>0){if(m=o[0],o.length>1)L=o[1];else if(l.length>0)L=l[0].slice(0,1);else if(a.length>0)for(var S=0;S<a.length;S++)S!==d&&(L=a[S].slice(0,1))}else if(l.length>0)m=l[0].slice(0,1),L=l[0].slice(1,2);else if(a.length>0)for(var x=0;x<a.length;x++)x!==d&&(m=a[x].slice(0,1),L=a[x].slice(1,2));m&&L&&(u={type:e,poker:a[d].concat(m).concat(a[d+1]).concat(L),list:[{three:a[d],one:m},{three:a[d+1],one:L}]});break}}else if("threeWithTwoList"===e){if(a.length>1)for(var w=0;w<a.length-1;w++)if(a[w][0].number+1===a[w+1][0].number+1){var P=void 0,O=void 0;if(l.length>0)if(P=l[0],l.length>1)O=l[1];else for(var _=0;_<a.length;_++)_!==w&&(O=a[_].slice(0,2));P&&O&&(u={type:e,poker:a[w].concat(P).concat(a[w+1]).concat(O),list:[{three:a[w],two:P},{three:a[w+1],two:O}]});break}}else if("oneList"===e){if(o.length>=5)for(var j=0;j<o.length-5+1;j++)if(o[j][0].number+5-1===o[j+5-1][0].number){var T=o.slice(j,j+5);u={type:e,poker:T.flat(1),list:T.map((function(e){return{one:e}}))};break}}else if("twoList"===e){if(l.length>=3)for(var B=0;B<l.length-3+1;B++)if(l[B][0].number+3-1===l[B+3-1][0].number){var W=l.slice(B,B+3);u={type:e,poker:W.flat(1),list:W.map((function(e){return{two:e}}))};break}}else if("sx"===e){if(o.length>=2)for(var A=0;A<o.length-1;A++)if(16===o[A][0].number){var M=l.slice(A,A+2),N=M.flat(1);u={type:e,poker:N,sx:N};break}}else"pass"===e&&(u={type:e,poker:["pass"]});return u}},{key:"getObjByObj",value:function(e){for(var t=this.pokerList,r=t[0],n=[r],i=[],s=1;s<t.length;s++)t[s].number!==r.number?(i.push(n),n=[t[s]]):n.push(t[s]),r=t[s];i.push(n);for(var o=[],l=[],a=[],h=[],p=0;p<i.length;p++)3===i[p].length?a.push(i[p]):2===i[p].length?l.push(i[p]):1===i[p].length?o.push(i[p]):4===i[p].length&&h.push(i[p]);var u=e.type,c=null;if("one"===u){if(o.length>0){for(var f=0;f<o.length;f++)if(o[f][0].number>e.one[0].number){c={type:u,poker:o[f],one:o[f]};break}}else if(l.length>0){for(var g=0;g<l.length;g++)if(l[g][0].number>e.one[0].number){var y=l[g].slice(0,1);c={type:u,poker:y,one:y};break}}else if(a.length>0)for(var k=0;k<a.length;k++)if(a[k][0].number>e.one[0].number){var b=a[k].slice(0,1);c={type:u,poker:b,one:b};break}}else if("two"===u){if(l.length>0){for(var v=0;v<l.length;v++)if(l[v][0].number>e.two[0].number){c={type:u,poker:l[v],two:l[v]};break}}else if(a.length>0)for(var d=0;d<a.length;d++)if(a[d][0].number>e.two[0].number){var m=a[d].slice(0,2);c={type:u,poker:m,one:m};break}}else if("threeWithOne"===u){if(a.length>0)for(var L=0;L<a.length;L++)if(a[L][0].number>e.three[0].number){var S=void 0;if(o.length>0)S=o[0];else if(l.length>0)S=l[0].slice(0,1);else if(a.length>0)for(var x=0;x<a.length;x++)x!==L&&(S=a[x].slice(0,1));S&&(c={type:u,poker:a[L].concat(S),three:a[L],one:S});break}}else if("threeWithTwo"===u){if(a.length>0)for(var w=0;w<a.length;w++)if(a[w][0].number>e.three[0].number){var P=void 0;if(l.length>0)P=l[0];else if(a.length>0)for(var O=0;O<a.length;O++)O!==w&&(P=a[O].slice(0,2));P&&(c={type:u,poker:a[w].concat(P),three:a[w],two:P});break}}else if("threeWithOneList"===u){if(a.length>1)for(var _=0;_<a.length-1;_++)if(a[_][0].number>e.list[0].three[0].number&&a[_][0].number+1===a[_+1][0].number+1){var j=void 0,T=void 0;if(o.length>0){if(j=o[0],o.length>1)T=o[1];else if(l.length>0)T=l[0].slice(0,1);else if(a.length>0)for(var B=0;B<a.length;B++)B!==_&&(T=a[B].slice(0,1))}else if(l.length>0)j=l[0].slice(0,1),T=l[0].slice(1,2);else if(a.length>0)for(var W=0;W<a.length;W++)W!==_&&(j=a[W].slice(0,1),T=a[W].slice(1,2));j&&T&&(c={type:u,poker:a[_].concat(j).concat(a[_+1]).concat(T),list:[{three:a[_],one:j},{three:a[_+1],one:T}]});break}}else if("threeWithTwoList"===u){if(a.length>1)for(var A=0;A<a.length-1;A++)if(a[A][0].number>e.list[0].three[0].number&&a[A][0].number+1===a[A+1][0].number+1){var M=void 0,N=void 0;if(l.length>0)if(M=l[0],l.length>1)N=l[1];else for(var R=0;R<a.length;R++)R!==A&&(N=a[R].slice(0,2));M&&N&&(c={type:u,poker:a[A].concat(M).concat(a[A+1]).concat(N),list:[{three:a[A],two:M},{three:a[A+1],two:N}]});break}}else if("oneList"===u){if(o.length>=e.list.length)for(var I=0;I<o.length-e.list.length+1;I++)if(o[I][0].number>e.list[0].one[0].number&&o[I][0].number+e.list.length-1===o[I+e.list.length-1][0].number){var D=o.slice(I,I+e.list.length);c={type:u,poker:D.flat(1),list:D.map((function(e){return{one:e}}))};break}}else if("twoList"===u){if(l.length>=e.list.length)for(var F=0;F<l.length-e.list.length+1;F++)if(l[F][0].number>e.list[0].two[0].number&&l[F][0].number+e.list.length-1===l[F+e.list.length-1][0].number){var z=l.slice(F,F+e.list.length);c={type:u,poker:z.flat(1),list:z.map((function(e){return{two:e}}))};break}}else if("four"===u&&h.length>0)for(var G=0;G<h.length;G++)if(h[G][0].number>e.four[0].number){c={type:u,poker:h[G],four:h[G]};break}if(c||"four"===u||h.length>0&&(c={type:u,poker:h[0],four:h[0]}),!c&&"sx"!==u&&o.length>1&&16===o[o.length-2]){var J=o[o.length-2].concat(o[o.length-1]);c={type:u,poker:J,sx:J}}return c||(c={type:"pass",poker:["pass"]}),c}},{key:"playByObj",value:function(e){var t=this.getObjByObj(e),r=this.deleteFromPokerListAndSendByObj(t);r||alert("error!")}},{key:"getListByList",value:function(e){var t=[];if("pass"===e[0])return["pass"];for(var r=0;r<e.length;r++){var n=e[r],i=this.getAndDeleteOnePokerByNumber(n.number);if(!i)return this.listBackToPokerList(t),!1;t.push(i)}return t}},{key:"getListByString",value:function(e){var t=[];if("pass"===e)return["pass"];for(var r=0;r<e.length;r++){var n=e[r],i=u.textToNumber(n),s=this.getAndDeleteOnePokerByNumber(i);if(!s)return this.listBackToPokerList(t),!1;t.push(s)}return t}},{key:"listBackToPokerList",value:function(e){while(e.length>0){var t=e.splice(0,1)[0];this.pokerList.push(t)}this.sortPoker()}},{key:"handleList",value:function(e){if(e){var t=u.getObjByPokerList(e);if(t){if("pass"===t.type)return this.sendPoker(t),!0;var r=this.getLastObj();if(r){if(r.type===t.type){var n=this.compareTwoObj(t,r);return n?(this.sendPoker(t),!0):(this.listBackToPokerList(e),alert("have to bigger than "+u.pokerListToString(r.poker)),!1)}return this.listBackToPokerList(e),alert("type is not "+r.type+"!"),!1}return this.sendPoker(t),!0}return this.listBackToPokerList(e),alert("type error!"),!1}return alert("poker error!"),!1}},{key:"playByPokerList",value:function(e){if(this.game.currentPlayer!==this)return alert("请等待 "+this.game.currentPlayer.name+" 出牌"),!1;var t=this.getListByList(e);return this.handleList(t)}},{key:"playByString",value:function(e){if(this.game.currentPlayer!==this)return alert("请等待 "+this.game.currentPlayer.name+" 出牌"),!1;var t=this.getListByString(e);return this.handleList(t)}},{key:"compareTwoObj",value:function(e,t){return"one"===e.type?e.one[0].number>t.one[0].number:"two"===e.type?e.two[0].number>t.two[0].number:"threeWithOne"===e.type||"threeWithTwo"===e.type?e.three[0].number>t.three[0].number:"threeWithOneList"===e.type||"threeWithTwoList"===e.type?e.list[0].three[0].number>t.list[0].three[0].number:"oneList"===e.type?e.list[0].one[0].number>t.list[0].one[0].number:"twoList"===e.type?e.list[0].two[0].number>t.list[0].two[0].number:"four"===e.type?e.four[0].number>t.four[0].number:void 0}},{key:"getAndDeleteOnePokerByNumber",value:function(e){for(var t=0;t<this.pokerList.length;t++)if(this.pokerList[t].number===e)return this.pokerList.splice(t,1)[0];return!1}},{key:"pokerListToString",value:function(){var e=u.pokerListToString(this.pokerList);return e}},{key:"lastSendObjToString",value:function(){if(!this.lastSendObj)return"";var e=u.pokerListToString(this.lastSendObj.poker);return e}}]),e}(),f=c,g=function(){function e(){Object(a["a"])(this,e),this.playerList=[],this.pokerList=[],this.deskPokerObj=null,this.oldPokerList=[],this.currentPlayer=[],this.dizhu=null,this.init()}return Object(h["a"])(e,[{key:"init",value:function(){this.initPokerList(),this.initPlayerList(),this.sendPoker(),this.start()}},{key:"start",value:function(){this.currentPlayer=this.dizhu,this.currentPlayer.isRobot&&this.currentPlayer.playByAI()}},{key:"next",value:function(){var e=this.checkGameOver();e?this.gameOver():(this.currentPlayer=this.currentPlayer.next,this.currentPlayer.isRobot&&this.currentPlayer.playByAI())}},{key:"gameOver",value:function(){alert("gameOver! "+this.currentPlayer.name+" ["+this.currentPlayer.type+"] win!")}},{key:"checkGameOver",value:function(){if(0===this.currentPlayer.pokerList.length)return!0}},{key:"clearDesk",value:function(){this.deskPokerObj&&(this.oldPokerList.push(this.deskPokerObj),this.deskPokerObj=null)}},{key:"sendPoker",value:function(){var e=this.playerList[0];do{var t=this.getRandomIntInclusive(0,this.pokerList.length-1),r=this.pokerList.splice(t,1)[0];e.addPoker(r),e=e.next}while(this.pokerList.length>3);do{var n=this.pokerList.splice(0,1)[0];this.dizhu.addPoker(n)}while(this.pokerList.length>0);for(var i=0;i<this.playerList.length;i++)this.playerList[i].sortPoker()}},{key:"initPlayerList",value:function(){this.playerList=[];var e=new f({name:"player",isRobot:!1,game:this}),t=new f({name:"robot1",isRobot:!0,game:this}),r=new f({name:"robot2",isRobot:!0,game:this});this.playerList=[e,t,r],this.playerList[0].next=this.playerList[1],this.playerList[1].next=this.playerList[2],this.playerList[2].next=this.playerList[0],this.playerList[0].last=this.playerList[2],this.playerList[1].last=this.playerList[0],this.playerList[2].last=this.playerList[1];var n=this.getRandomIntInclusive(0,2);this.playerList[n].type="dizhu",this.dizhu=this.playerList[n]}},{key:"initPokerList",value:function(){this.pokerList=[];for(var e=3;e<=15;e++)for(var t=0;t<4;t++){var r=new u({number:e,type:t});this.pokerList.push(r)}for(var n=16;n<=17;n++){var i=new u({number:n});this.pokerList.push(i)}}},{key:"pokerListToString",value:function(){var e="";e+=u.pokerListToString(this.pokerList),e+="\n";for(var t=0;t<this.oldPokerList.length;t++)e+=u.pokerListToString(this.oldPokerList[t].poker),t<this.oldPokerList.length-1&&(e+=",");return e+="\n",e+=this.deskPokerObj?u.pokerListToString(this.deskPokerObj.poker):"",e}},{key:"getRandomIntInclusive",value:function(e,t){return Math.floor(Math.random()*(t-e+1))+e}}]),e}(),y=g,k={name:"HelloWorld",data:function(){return{data:"fuck1",game:new y,playerStr:""}},computed:{player2Str:function(){var e=this.game,t=2;return[e.playerList[t].name+" : "+e.playerList[t].type+" : "+e.playerList[t].pokerList.length,e.playerList[t].pokerListToString(),"last : "+e.playerList[t].lastSendObjToString()]},player1Str:function(){var e=this.game,t=1;return[e.playerList[t].name+" : "+e.playerList[t].type+" : "+e.playerList[t].pokerList.length,e.playerList[t].pokerListToString(),"last : "+e.playerList[t].lastSendObjToString()]},player0Str:function(){var e=this.game,t=0;return[e.playerList[t].name+" : "+e.playerList[t].type+" : "+e.playerList[t].pokerList.length,e.playerList[t].pokerListToString(),"last : "+e.playerList[t].lastSendObjToString()]},deskStr:function(){var e=this.game;return["desk",e.pokerListToString()]}},mounted:function(){this.data=this.game.playerList[1].name},methods:{reDraw:function(){},sendPoker:function(){var e=this.game,t=e.playerList[0].playByString(this.playerStr);t&&(this.playerStr="")},pass:function(){this.game.playerList[0].playByString("pass")},reStart:function(){this.game=new y,this.playerStr=""}}},b=k,v=r("2877"),d=Object(v["a"])(b,o,l,!1,null,"62298b0c",null),m=d.exports,L=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticStyle:{"user-select":"none"}},[r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"0px",top:"0px","background-color":"aliceblue","text-align":"center"}},[r("span",[e._v(" "+e._s(e.player2Str[0])+" "),r("br"),e._v(" "+e._s(e.player2Str[1])+" "),r("br"),r("br"),e._v(" "+e._s(e.player2Str[2])+" ")])]),r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"600px",top:"0px","background-color":"aliceblue","text-align":"center"}},[r("span",[e._v(" "+e._s(e.player1Str[0])+" "),r("br"),e._v(" "+e._s(e.player1Str[1])+" "),r("br"),r("br"),e._v(" "+e._s(e.player1Str[2])+" ")])]),r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"300px",top:"300px","background-color":"aliceblue","text-align":"center"}},[r("span",[e._v(" "+e._s(e.player0Str[0])+" "),r("br"),e._v(" "+e._s(e.player0Str[1])+" "),r("br"),r("br"),e._v(" "+e._s(e.player0Str[2])+" ")]),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.playerStr,expression:"playerStr"}],attrs:{type:"text"},domProps:{value:e.playerStr},on:{input:function(t){t.target.composing||(e.playerStr=t.target.value)}}}),r("button",{on:{click:e.sendPoker}},[e._v("send")]),r("button",{on:{click:e.pass}},[e._v("pass")])])]),r("div",{staticStyle:{width:"300px",height:"300px",float:"left",position:"fixed",left:"300px",top:"0px","background-color":"aliceblue","text-align":"center"}},[r("div",{staticStyle:{width:"300px","word-wrap":"break-word"}},[e._v(" "+e._s(e.deskStr[0])+" "),r("br"),e._v(" "+e._s(e.deskStr[1])+" ")])]),r("div",{staticStyle:{position:"fixed",left:"300px",top:"600px"}},[r("button",{on:{click:e.reStart}},[e._v("reStart")])]),r("div",{staticStyle:{position:"fixed",bottom:"0",width:"100%",height:"200px"},style:{marginLeft:e.playerMarginLeft+"px"}},e._l(e.game.playerList[0].pokerList,(function(t){return r("div",{staticClass:"poker",class:{selected:t.selected},on:{mouseenter:function(r){return e.enter(r,t)},mousedown:function(r){return e.pickPoker(t)}}},[e._v(" "+e._s(t.text)+" ")])})),0),r("div",{staticStyle:{position:"fixed",bottom:"200px",width:"100%",height:"100px","text-align":"left"}},[r("div",{staticStyle:{width:"200px",height:"30px"},style:{marginLeft:e.buttonMarginLeft+"px"}},[r("button",{staticStyle:{height:"30px","border-radius":"4px",float:"left"},on:{click:e.sendPoker2}},[e._v("出牌")]),r("button",{staticStyle:{height:"30px","border-radius":"4px","margin-left":"20px",float:"right"},on:{click:e.pass}},[e._v("不出")])])]),r("div",{staticStyle:{position:"fixed",bottom:"400px",width:"100%",height:"200px"},style:{marginLeft:e.deskPokerMarginLeft+"px"}},e._l(e.deskPoker,(function(t){return r("div",{staticStyle:{height:"100%",width:"100px",border:"solid 1px","border-radius":"8px",float:"left","margin-left":"-50px","background-color":"azure"}},[e._v(" "+e._s(t.text)+" ")])})),0)])},S=[],x={name:"HelloWorld",data:function(){return{data:"fuck1",game:new y,playerStr:"",pokerList:[]}},computed:{playerMarginLeft:function(){return(window.innerWidth-50*this.game.playerList[0].pokerList.length)/2},deskPokerMarginLeft:function(){return(window.innerWidth-50*this.deskPoker.length)/2},buttonMarginLeft:function(){return(window.innerWidth-200)/2},deskPoker:function(){return this.game.deskPokerObj&&this.game.deskPokerObj.poker&&this.game.deskPokerObj.poker[0]&&this.game.deskPokerObj.poker[0].text?this.game.deskPokerObj.poker:[]},player2Str:function(){var e=this.game,t=2;return[e.playerList[t].name+" : "+e.playerList[t].type+" : "+e.playerList[t].pokerList.length,e.playerList[t].pokerListToString(),"last : "+e.playerList[t].lastSendObjToString()]},player1Str:function(){var e=this.game,t=1;return[e.playerList[t].name+" : "+e.playerList[t].type+" : "+e.playerList[t].pokerList.length,e.playerList[t].pokerListToString(),"last : "+e.playerList[t].lastSendObjToString()]},player0Str:function(){var e=this.game,t=0;return[e.playerList[t].name+" : "+e.playerList[t].type+" : "+e.playerList[t].pokerList.length,e.playerList[t].pokerListToString(),"last : "+e.playerList[t].lastSendObjToString()]},deskStr:function(){var e=this.game;return["desk",e.pokerListToString()]}},mounted:function(){this.data=this.game.playerList[1].name},methods:{enter:function(e,t){1===e.buttons&&this.pickPoker(t)},pickPoker:function(e){if(e.selected){e.selected=!1;for(var t=0;t<this.pokerList.length;t++)this.pokerList[t]===e&&this.pokerList.splice(t,1)}else e.selected=!0,this.pokerList.push(e)},sendPoker2:function(){var e=this.game,t=e.playerList[0].playByPokerList(this.pokerList);t&&(this.pokerList=[])},sendPoker:function(){var e=this.game,t=e.playerList[0].playByString(this.playerStr);t&&(this.playerStr="")},pass:function(){this.game.playerList[0].playByString("pass")},reStart:function(){this.game=new y,this.playerStr=""}}},w=x,P=(r("2bb1"),Object(v["a"])(w,L,S,!1,null,"b556cf7e",null)),O=P.exports,_={name:"App",components:{HelloWorld:m,Game:O}},j=_,T=Object(v["a"])(j,i,s,!1,null,null,null),B=T.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(B)}}).$mount("#app")},7393:function(e,t,r){}});
//# sourceMappingURL=app.2113c29b.js.map