"use strict";(self.webpackChunkgithub_pages=self.webpackChunkgithub_pages||[]).push([[2240],{3905:(e,t,a)=>{a.d(t,{Zo:()=>c,kt:()=>m});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),u=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),h=u(a),m=r,d=h["".concat(s,".").concat(m)]||h[m]||p[m]||o;return a?n.createElement(d,i(i({ref:t},c),{},{components:a})):n.createElement(d,i({ref:t},c))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var u=2;u<o;u++)i[u]=a[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},3600:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=a(7462),r=(a(7294),a(3905));const o={slug:"what_is_websocket_part2",title:"What is WebSocket? (part 2/2)",authors:["JialinX","KevinG"],custom_edit_url:null},i=void 0,l={permalink:"/azure-webpubsub/blog/what_is_websocket_part2",source:"@site/blog/2022-11-25-what-is-websockets_part2/index.md",title:"What is WebSocket? (part 2/2)",description:"Summary",date:"2022-11-25T00:00:00.000Z",formattedDate:"November 25, 2022",tags:[],readingTime:2.51,hasTruncateMarker:!1,authors:[{name:"Jialin Xin",title:"Senior Software Engineer",url:"https://github.com/JialinXin",imageURL:"https://avatars.githubusercontent.com/u/15338714?v=4",key:"JialinX"},{name:"Kevin Guo",title:"Senior Product Manager",url:"https://github.com/kevinguo-ed",imageURL:"https://avatars.githubusercontent.com/u/105208143?s=400&u=9fed0cb6d3e64908d9b6b7ae9e12dcb96a0e3882&v=4",key:"KevinG"}],frontMatter:{slug:"what_is_websocket_part2",title:"What is WebSocket? (part 2/2)",authors:["JialinX","KevinG"],custom_edit_url:null},prevItem:{title:"Azure Web PubSub for Socket.IO is now generally available",permalink:"/azure-webpubsub/blog/azure-web-pubsub-for-socketio-generally-available"},nextItem:{title:"What is WebSocket? (part 1/2)",permalink:"/azure-webpubsub/blog/what_is_websocket_part1"}},s={authorsImageUrls:[void 0,void 0]},u=[{value:"<strong>Summary</strong>",id:"summary",level:2},{value:"<strong>Quick links</strong>",id:"quick-links",level:2},{value:"<strong>Full-duplex</strong>",id:"full-duplex",level:2},{value:"<strong>To conclude</strong>",id:"to-conclude",level:2}],c={toc:u};function p(e){let{components:t,...o}=e;return(0,r.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"summary"},(0,r.kt)("strong",{parentName:"h2"},"Summary")),(0,r.kt)("p",null,"This article is the second of a two-part series that describes the values of WebSocket on a high-level."),(0,r.kt)("h2",{id:"quick-links"},(0,r.kt)("strong",{parentName:"h2"},"Quick links")),(0,r.kt)("p",null,"Explore a few live apps built with ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("a",{parentName:"strong",href:"https://learn.microsoft.com/en-us/azure/azure-web-pubsub/overview"},"\ud83d\udd17 Web PubSub")),", a fully managed WebSocket service from Azure.  "),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://azure.github.io/azure-webpubsub/demos/chat"},"\ud83d\udd17 A simple chat app"),(0,r.kt)("br",{parentName:"p"}),"\n",(0,r.kt)("a",{parentName:"p",href:"https://azure.github.io/azure-webpubsub/demos/whiteboard"},"\ud83d\udd17 A collaborative whiteboard app")," "),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("strong",{parentName:"p"},"Definition")),(0,r.kt)("p",{parentName:"blockquote"},"WebSocket gives developers a ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"bidirectional")),", ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},"full-duplex"))," communication channels over HTTP through a single TCP connection ")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"})),(0,r.kt)("h2",{id:"full-duplex"},(0,r.kt)("strong",{parentName:"h2"},"Full-duplex")),(0,r.kt)("p",null,"To put it simply, \u201cfull-duplex\u201d means that data can be transmitted at the same time in both directions. Like \u201cbidirectional\u201d we just talked about, full-duplex is also about two things, two entities, but full-duplex is more about the ",(0,r.kt)("strong",{parentName:"p"},"TIMING")," of sending data. "),(0,r.kt)("p",null,"A phone call is considered full-duplex because both the caller and the receiver can send voice data to each other at the same time. "),(0,r.kt)("p",null,"A walkie-talkie is considered half-duplex because at one time only one person can send voice data. The participants take turns to speak. "),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Picture of a walkie-talkie",src:a(4326).Z,width:"500",height:"500"})),(0,r.kt)("p",null,"The web before WebSocket was largely half-duplex. The client opens a communication channel and requests a resource through this channel from a remote server. It waits for the server to return the requested resource. While the client waits, it cannot send data through the same channel. Also, while the server is sending data, the client cannot request resource through the same channel, much like how we communicate with a walkie-talkie. "),(0,r.kt)("p",null,"Imagine if you are talking with your grandma using a walkie-talkie and you ask \u201cGrandma, what\u2019s like when you were growing up in the countryside?\u201d Grandma presses the \u201cTalk button\u201d and she starts from the Great Depression, World War 1 and on with World War 2\u2026 While grandma paints the scene of her storied life, teasing grandma by completing the stories for her is not an option. Your only option? Listen on. (No grandmas were hurt in telling this joke.) "),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Picture of a grandma and her granddaughter",src:a(5066).Z,width:"703",height:"459"})),(0,r.kt)("p",null,"The walkie-talkie style of the early web was fine when communication was largely infrequent requests for resources from client to server. For web applications with interactive experience, like a collaborative document or a collaborative design application, users could be making changes at the same time and to have a smooth real-time editing experience, the changes need to be reflected on users\u2019 screens as soon as they are made. The trusty HTTP protocol, being an inherently half-duplex communication model, cannot meet the new requirements without resorting to some workarounds. Hacks no more! WebSocket brings native full-duplex communication to the web."),(0,r.kt)("h2",{id:"to-conclude"},(0,r.kt)("strong",{parentName:"h2"},"To conclude")),(0,r.kt)("p",null,"\u201cBidirectional\u201d and \u201cfull-duplex\u201d are the two value propositions WebSocket offers to developers and it has enabled a myriad of new interesting experience on the web, multi-player gaming, online auction, real-time collaborative apps and online chatting, to name a few. And the best of it all, it does not take much to add these real-time capabilities to your applications.\n",(0,r.kt)("img",{alt:"Some scenarios that can be enabled by WebSocket",src:a(5549).Z,width:"961",height:"557"})),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Credits:"),(0,r.kt)("br",{parentName:"p"}),"\n","The walkie-talkie and the grandma photographs were taken by ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("a",{parentName:"strong",href:"https://www.pexels.com/@cottonbro/"},"\ud83d\udd17 cottonbro studio")),"."))}p.isMDXComponent=!0},5066:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/grandma-4f69b67909e231a6b983953601b687c2.jpg"},5549:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/scenarios-eab60a0b5a645c27b355710a716872ad.jpg"},4326:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/walkie_talkie-86467d9c47386511657e759425999a3f.jpg"}}]);