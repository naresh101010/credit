/**
 * core-js 3.1.4
 * https://github.com/zloirock/core-js
 * License: http://rock.mit-license.org
 * © 2019 Denis Pushkarev (zloirock.ru)
 */
!function(kt){"use strict";function __webpack_require__(t){if(e[t])return e[t].exports;var n=e[t]={i:t,l:!1,exports:{}};return r[t].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}var r,e;e={},__webpack_require__.m=r=[function(t,n,r){r(1),r(60),r(61),r(62),r(63),r(64),r(65),r(66),r(67),r(68),r(69),r(70),r(71),r(72),r(73),r(74),r(77),r(80),r(82),r(84),r(85),r(86),r(87),r(89),r(90),r(92),r(100),r(101),r(102),r(103),r(111),r(112),r(114),r(115),r(116),r(118),r(119),r(120),r(121),r(122),r(123),r(125),r(126),r(127),r(128),r(134),r(135),r(137),r(138),r(139),r(143),r(144),r(146),r(147),r(149),r(150),r(151),r(152),r(159),r(161),r(162),r(163),r(165),r(166),r(168),r(169),r(171),r(172),r(173),r(174),r(175),r(176),r(177),r(178),r(179),r(180),r(181),r(184),r(185),r(187),r(189),r(190),r(191),r(192),r(193),r(195),r(197),r(199),r(200),r(202),r(203),r(205),r(206),r(207),r(208),r(210),r(211),r(212),r(213),r(214),r(215),r(216),r(218),r(219),r(220),r(221),r(222),r(223),r(224),r(225),r(226),r(227),r(229),r(230),r(231),r(232),r(240),r(241),r(242),r(243),r(244),r(245),r(246),r(247),r(248),r(249),r(250),r(251),r(252),r(253),r(254),r(257),r(259),r(260),r(261),r(262),r(264),r(267),r(268),r(269),r(270),r(274),r(275),r(277),r(278),r(279),r(280),r(281),r(282),r(283),r(284),r(286),r(287),r(288),r(291),r(292),r(293),r(294),r(295),r(296),r(297),r(298),r(299),r(300),r(301),r(302),r(303),r(308),r(309),r(310),r(311),r(312),r(313),r(314),r(315),r(316),r(317),r(318),r(319),r(320),r(321),r(322),r(323),r(324),r(325),r(326),r(327),r(328),r(329),r(330),r(331),r(332),r(333),r(334),r(335),r(336),r(337),r(338),r(339),r(340),r(341),r(343),r(344),r(345),r(346),r(347),r(349),r(350),r(351),r(353),r(356),r(357),r(358),r(359),r(361),r(362),r(364),r(365),r(366),r(367),r(368),r(369),r(371),r(372),r(373),r(374),r(375),r(376),r(377),r(379),r(380),r(381),r(382),r(383),r(384),r(385),r(386),r(387),r(388),r(389),r(390),r(391),r(392),r(393),r(395),r(396),r(397),r(398),r(399),r(400),r(401),r(402),r(403),r(405),r(406),r(407),r(409),r(410),r(411),r(412),r(413),r(414),r(415),r(416),r(417),r(418),r(419),r(420),r(421),r(422),r(423),r(424),r(425),r(426),r(427),r(428),r(429),r(430),r(431),r(432),r(433),r(434),r(435),r(436),r(437),r(439),r(440),r(441),r(442),r(443),r(447),r(446),t.exports=r(448)},function(t,n,r){function Ba(t,n){var r=X[t]=y(z[D]);return K(r,{type:W,tag:t,description:n}),a||(r.description=n),r}function Ea(n,t){h(n);var r=g(t),e=m(r).concat(ct(r));return U(e,function(t){a&&!ut.call(r,t)||at(n,t,r[t])}),n}function Ha(t,n){var r=g(t),e=v(n,!0);if(r!==q||!f(X,e)||f(Q,e)){var o=Y(r,e);return!o||!f(X,e)||f(r,N)&&r[N][e]||(o.enumerable=!0),o}}function Ia(t){var n=$(g(t)),r=[];return U(n,function(t){f(X,t)||f(R,t)||r.push(t)}),r}var e=r(2),o=r(3),i=r(24),a=r(5),u=r(44),c=r(6),f=r(15),s=r(45),l=r(14),h=r(20),p=r(46),g=r(9),v=r(13),d=r(8),y=r(47),m=r(49),b=r(35),x=r(51),w=r(42),S=r(4),A=r(19),E=r(7),O=r(18),I=r(21),M=r(22),P=r(28),R=r(30),_=r(29),j=r(52),k=r(53),T=r(54),F=r(55),L=r(26),U=r(56).forEach,N=P("hidden"),W="Symbol",D="prototype",C=j("toPrimitive"),K=L.set,B=L.getterFor(W),q=Object[D],z=o.Symbol,G=o.JSON,V=G&&G.stringify,Y=S.f,J=A.f,$=x.f,H=E.f,X=M("symbols"),Q=M("op-symbols"),Z=M("string-to-symbol-registry"),tt=M("symbol-to-string-registry"),nt=M("wks"),rt=o.QObject,et=!rt||!rt[D]||!rt[D].findChild,ot=a&&c(function(){return 7!=y(J({},"a",{get:function(){return J(this,"a",{value:7}).a}})).a})?function(t,n,r){var e=Y(q,n);e&&delete q[n],J(t,n,r),e&&t!==q&&J(q,n,e)}:J,it=u&&"symbol"==typeof z.iterator?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof z},at=function defineProperty(t,n,r){t===q&&at(Q,n,r),h(t);var e=v(n,!0);return h(r),f(X,e)?(r.enumerable?(f(t,N)&&t[N][e]&&(t[N][e]=!1),r=y(r,{enumerable:d(0,!1)})):(f(t,N)||J(t,N,d(1,{})),t[N][e]=!0),ot(t,e,r)):J(t,e,r)},ut=(function create(t,n){return n===kt?y(t):Ea(y(t),n)},function propertyIsEnumerable(t){var n=v(t,!0),r=H.call(this,n);return!(this===q&&f(X,n)&&!f(Q,n))&&(!(r||!f(this,n)||!f(X,n)||f(this,N)&&this[N][n])||r)}),ct=function getOwnPropertySymbols(t){var n=t===q,r=$(n?Q:g(t)),e=[];return U(r,function(t){!f(X,t)||n&&!f(q,t)||e.push(X[t])}),e};u||(I((z=function Symbol(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var t=arguments.length&&arguments[0]!==kt?String(arguments[0]):kt,n=_(t),r=function(t){this===q&&r.call(Q,t),f(this,N)&&f(this[N],n)&&(this[N][n]=!1),ot(this,n,d(1,t))};return a&&et&&ot(q,n,{configurable:!0,set:r}),Ba(n,t)})[D],"toString",function toString(){return B(this).tag}),E.f=ut,A.f=at,S.f=Ha,b.f=x.f=Ia,w.f=ct,a&&(J(z[D],"description",{configurable:!0,get:function description(){return B(this).description}}),i||I(q,"propertyIsEnumerable",ut,{unsafe:!0})),k.f=function(t){return Ba(j(t),t)}),e({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:z}),U(m(nt),function(t){T(t)}),e({target:W,stat:!0,forced:!u},{"for":function(t){var n=String(t);if(f(Z,n))return Z[n];var r=z(n);return tt[Z[n]=r]=n,r},keyFor:function keyFor(t){if(!it(t))throw TypeError(t+" is not a symbol");if(f(tt,t))return tt[t]},useSetter:function(){et=!0},useSimple:function(){et=!1}}),e({target:"Object",stat:!0,forced:!u,sham:!a},{create:function create(t,n){return n===kt?y(t):Ea(y(t),n)},defineProperty:at,defineProperties:Ea,getOwnPropertyDescriptor:Ha}),e({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:Ia,getOwnPropertySymbols:ct}),e({target:"Object",stat:!0,forced:c(function(){w.f(1)})},{getOwnPropertySymbols:function getOwnPropertySymbols(t){return w.f(p(t))}}),G&&e({target:"JSON",stat:!0,forced:!u||c(function(){var t=z();return"[null]"!=V([t])||"{}"!=V({a:t})||"{}"!=V(Object(t))})},{stringify:function stringify(t){for(var n,r,e=[t],o=1;o<arguments.length;)e.push(arguments[o++]);if(r=n=e[1],(l(n)||t!==kt)&&!it(t))return s(n)||(n=function(t,n){if("function"==typeof r&&(n=r.call(this,t,n)),!it(n))return n}),e[1]=n,V.apply(G,e)}}),z[D][C]||O(z[D],C,z[D].valueOf),F(z,W),R[N]=!0},function(t,n,r){var s=r(3),l=r(4).f,h=r(18),p=r(21),g=r(23),v=r(31),d=r(43);t.exports=function(t,n){var r,e,o,i,a,u=t.target,c=t.global,f=t.stat;if(r=c?s:f?s[u]||g(u,{}):(s[u]||{}).prototype)for(e in n){if(i=n[e],o=t.noTargetGet?(a=l(r,e))&&a.value:r[e],!d(c?e:u+(f?".":"#")+e,t.forced)&&o!==kt){if(typeof i==typeof o)continue;v(i,o)}(t.sham||o&&o.sham)&&h(i,"sham",!0),p(r,e,i,t)}}},function(t,n){function ic(t){return t&&t.Math==Math&&t}var r="object";t.exports=ic(typeof globalThis==r&&globalThis)||ic(typeof window==r&&window)||ic(typeof self==r&&self)||ic(typeof global==r&&global)||Function("return this")()},function(t,n,r){var e=r(5),o=r(7),i=r(8),a=r(9),u=r(13),c=r(15),f=r(16),s=Object.getOwnPropertyDescriptor;n.f=e?s:function getOwnPropertyDescriptor(t,n){if(t=a(t),n=u(n,!0),f)try{return s(t,n)}catch(r){}if(c(t,n))return i(!o.f.call(t,n),t[n])}},function(t,n,r){var e=r(6);t.exports=!e(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t){try{return!!t()}catch(n){return!0}}},function(t,n,r){var e={}.propertyIsEnumerable,o=Object.getOwnPropertyDescriptor,i=o&&!e.call({1:2},1);n.f=i?function propertyIsEnumerable(t){var n=o(this,t);return!!n&&n.enumerable}:e},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n,r){var e=r(10),o=r(12);t.exports=function(t){return e(o(t))}},function(t,n,r){var e=r(6),o=r(11),i="".split;t.exports=e(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==o(t)?i.call(t,""):Object(t)}:Object},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n){t.exports=function(t){if(t==kt)throw TypeError("Can't call method on "+t);return t}},function(t,n,r){var o=r(14);t.exports=function(t,n){if(!o(t))return t;var r,e;if(n&&"function"==typeof(r=t.toString)&&!o(e=r.call(t)))return e;if("function"==typeof(r=t.valueOf)&&!o(e=r.call(t)))return e;if(!n&&"function"==typeof(r=t.toString)&&!o(e=r.call(t)))return e;throw TypeError("Can't convert object to primitive value")}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n,r){var e=r(5),o=r(6),i=r(17);t.exports=!e&&!o(function(){return 7!=Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a})},function(t,n,r){var e=r(3),o=r(14),i=e.document,a=o(i)&&o(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},function(t,n,r){var e=r(5),o=r(19),i=r(8);t.exports=e?function(t,n,r){return o.f(t,n,i(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n,r){var e=r(5),o=r(16),i=r(20),a=r(13),u=Object.defineProperty;n.f=e?u:function defineProperty(t,n,r){if(i(t),n=a(n,!0),i(r),o)try{return u(t,n,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(14);t.exports=function(t){if(!e(t))throw TypeError(String(t)+" is not an object");return t}},function(t,n,r){var u=r(3),e=r(22),c=r(18),f=r(15),s=r(23),o=r(25),i=r(26),a=i.get,l=i.enforce,h=String(o).split("toString");e("inspectSource",function(t){return o.call(t)}),(t.exports=function(t,n,r,e){var o=!!e&&!!e.unsafe,i=!!e&&!!e.enumerable,a=!!e&&!!e.noTargetGet;"function"==typeof r&&("string"!=typeof n||f(r,"name")||c(r,"name",n),l(r).source=h.join("string"==typeof n?n:"")),t!==u?(o?!a&&t[n]&&(i=!0):delete t[n],i?t[n]=r:c(t,n,r)):i?t[n]=r:s(n,r)})(Function.prototype,"toString",function toString(){return"function"==typeof this&&a(this).source||o.call(this)})},function(t,n,r){var e=r(3),o=r(23),i=r(24),a="__core-js_shared__",u=e[a]||o(a,{});(t.exports=function(t,n){return u[t]||(u[t]=n!==kt?n:{})})("versions",[]).push({version:"3.1.3",mode:i?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,n,r){var e=r(3),o=r(18);t.exports=function(t,n){try{o(e,t,n)}catch(r){e[t]=n}return n}},function(t,n){t.exports=!1},function(t,n,r){var e=r(22);t.exports=e("native-function-to-string",Function.toString)},function(t,n,r){var e,o,i,a=r(27),u=r(3),c=r(14),f=r(18),s=r(15),l=r(28),h=r(30);if(a){var p=new u.WeakMap,g=p.get,v=p.has,d=p.set;e=function(t,n){return d.call(p,t,n),n},o=function(t){return g.call(p,t)||{}},i=function(t){return v.call(p,t)}}else{var y=l("state");h[y]=!0,e=function(t,n){return f(t,y,n),n},o=function(t){return s(t,y)?t[y]:{}},i=function(t){return s(t,y)}}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(r){return function(t){var n;if(!c(t)||(n=o(t)).type!==r)throw TypeError("Incompatible receiver, "+r+" required");return n}}}},function(t,n,r){var e=r(3),o=r(25),i=e.WeakMap;t.exports="function"==typeof i&&/native code/.test(o.call(i))},function(t,n,r){var e=r(22),o=r(29),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol("+String(t===kt?"":t)+")_"+(++r+e).toString(36)}},function(t,n){t.exports={}},function(t,n,r){var u=r(15),c=r(32),f=r(4),s=r(19);t.exports=function(t,n){for(var r=c(n),e=s.f,o=f.f,i=0;i<r.length;i++){var a=r[i];u(t,a)||e(t,a,o(n,a))}}},function(t,n,r){var e=r(33),o=r(35),i=r(42),a=r(20);t.exports=e("Reflect","ownKeys")||function ownKeys(t){var n=o.f(a(t)),r=i.f;return r?n.concat(r(t)):n}},function(t,n,r){function Og(t){return"function"==typeof t?t:kt}var e=r(34),o=r(3);t.exports=function(t,n){return arguments.length<2?Og(e[t])||Og(o[t]):e[t]&&e[t][n]||o[t]&&o[t][n]}},function(t,n,r){t.exports=r(3)},function(t,n,r){var e=r(36),o=r(41).concat("length","prototype");n.f=Object.getOwnPropertyNames||function getOwnPropertyNames(t){return e(t,o)}},function(t,n,r){var a=r(15),u=r(9),c=r(37).indexOf,f=r(30);t.exports=function(t,n){var r,e=u(t),o=0,i=[];for(r in e)!a(f,r)&&a(e,r)&&i.push(r);for(;o<n.length;)a(e,r=n[o++])&&(~c(i,r)||i.push(r));return i}},function(t,n,r){function th(u){return function(t,n,r){var e,o=c(t),i=f(o.length),a=s(r,i);if(u&&n!=n){for(;a<i;)if((e=o[a++])!=e)return!0}else for(;a<i;a++)if((u||a in o)&&o[a]===n)return u||a||0;return!u&&-1}}var c=r(9),f=r(38),s=r(40);t.exports={includes:th(!0),indexOf:th(!1)}},function(t,n,r){var e=r(39),o=Math.min;t.exports=function(t){return 0<t?o(e(t),9007199254740991):0}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?e:r)(t)}},function(t,n,r){var e=r(39),o=Math.max,i=Math.min;t.exports=function(t,n){var r=e(t);return r<0?o(r+n,0):i(r,n)}},function(t,n){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,r){function di(t,n){var r=a[i(t)];return r==c||r!=u&&("function"==typeof n?e(n):!!n)}var e=r(6),o=/#|\.prototype\./,i=di.normalize=function(t){return String(t).replace(o,".").toLowerCase()},a=di.data={},u=di.NATIVE="N",c=di.POLYFILL="P";t.exports=di},function(t,n,r){var e=r(6);t.exports=!!Object.getOwnPropertySymbols&&!e(function(){return!String(Symbol())})},function(t,n,r){var e=r(11);t.exports=Array.isArray||function isArray(t){return"Array"==e(t)}},function(t,n,r){var e=r(12);t.exports=function(t){return Object(e(t))}},function(t,n,r){function Mi(){}var e=r(20),o=r(48),i=r(41),a=r(30),u=r(50),c=r(17),f=r(28)("IE_PROTO"),s="prototype",l=function(){var t,n=c("iframe"),r=i.length,e="script";for(n.style.display="none",u.appendChild(n),n.src=String("javascript:"),(t=n.contentWindow.document).open(),t.write("<script>document.F=Object</"+e+">"),t.close(),l=t.F;r--;)delete l[s][i[r]];return l()};t.exports=Object.create||function create(t,n){var r;return null!==t?(Mi[s]=e(t),r=new Mi,Mi[s]=null,r[f]=t):r=l(),n===kt?r:o(r,n)},a[f]=!0},function(t,n,r){var e=r(5),a=r(19),u=r(20),c=r(49);t.exports=e?Object.defineProperties:function defineProperties(t,n){u(t);for(var r,e=c(n),o=e.length,i=0;i<o;)a.f(t,r=e[i++],n[r]);return t}},function(t,n,r){var e=r(36),o=r(41);t.exports=Object.keys||function keys(t){return e(t,o)}},function(t,n,r){var e=r(33);t.exports=e("document","documentElement")},function(t,n,r){var e=r(9),o=r(35).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function getOwnPropertyNames(t){return a&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(n){return a.slice()}}(t):o(e(t))}},function(t,n,r){var e=r(3),o=r(22),i=r(29),a=r(44),u=e.Symbol,c=o("wks");t.exports=function(t){return c[t]||(c[t]=a&&u[t]||(a?u:i)("Symbol."+t))}},function(t,n,r){n.f=r(52)},function(t,n,r){var e=r(34),o=r(15),i=r(53),a=r(19).f;t.exports=function(t){var n=e.Symbol||(e.Symbol={});o(n,t)||a(n,t,{value:i.f(t)})}},function(t,n,r){var e=r(19).f,o=r(15),i=r(52)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},function(t,n,r){function sk(p){var g=1==p,v=2==p,d=3==p,y=4==p,m=6==p,b=5==p||m;return function(t,n,r,e){for(var o,i,a=S(t),u=w(a),c=x(n,r,3),f=A(u.length),s=0,l=e||E,h=g?l(t,f):v?l(t,0):kt;s<f;s++)if((b||s in u)&&(i=c(o=u[s],s,a),p))if(g)h[s]=i;else if(i)switch(p){case 3:return!0;case 5:return o;case 6:return s;case 2:O.call(h,o)}else if(y)return!1;return m?-1:d||y?y:h}}var x=r(57),w=r(10),S=r(46),A=r(38),E=r(59),O=[].push;t.exports={forEach:sk(0),map:sk(1),filter:sk(2),some:sk(3),every:sk(4),find:sk(5),findIndex:sk(6)}},function(t,n,r){var i=r(58);t.exports=function(e,o,t){if(i(e),o===kt)return e;switch(t){case 0:return function(){return e.call(o)};case 1:return function(t){return e.call(o,t)};case 2:return function(t,n){return e.call(o,t,n)};case 3:return function(t,n,r){return e.call(o,t,n,r)}}return function(){return e.apply(o,arguments)}}},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,n,r){var e=r(14),o=r(45),i=r(52)("species");t.exports=function(t,n){var r;return o(t)&&("function"!=typeof(r=t.constructor)||r!==Array&&!o(r.prototype)?e(r)&&null===(r=r[i])&&(r=kt):r=kt),new(r===kt?Array:r)(0===n?0:n)}},function(t,n,r){var e=r(2),o=r(5),i=r(3),a=r(15),u=r(14),c=r(19).f,f=r(31),s=i.Symbol;if(o&&"function"==typeof s&&(!("description"in s.prototype)||s().description!==kt)){var l={},h=function Symbol(){var t=arguments.length<1||arguments[0]===kt?kt:String(arguments[0]),n=this instanceof h?new s(t):t===kt?s():s(t);return""===t&&(l[n]=!0),n};f(h,s);var p=h.prototype=s.prototype;p.constructor=h;var g=p.toString,v="Symbol(test)"==String(s("test")),d=/^Symbol\((.*)\)[^)]+$/;c(p,"description",{configurable:!0,get:function description(){var t=u(this)?this.valueOf():this,n=g.call(t);if(a(l,t))return"";var r=v?n.slice(7,-1):n.replace(d,"$1");return""===r?kt:r}}),e({global:!0,forced:!0},{Symbol:h})}},function(t,n,r){r(54)("asyncIterator")},function(t,n,r){r(54)("hasInstance")},function(t,n,r){r(54)("isConcatSpreadable")},function(t,n,r){r(54)("iterator")},function(t,n,r){r(54)("match")},function(t,n,r){r(54)("matchAll")},function(t,n,r){r(54)("replace")},function(t,n,r){r(54)("search")},function(t,n,r){r(54)("species")},function(t,n,r){r(54)("split")},function(t,n,r){r(54)("toPrimitive")},function(t,n,r){r(54)("toStringTag")},function(t,n,r){r(54)("unscopables")},function(t,n,r){function Xm(t){if(!a(t))return!1;var n=t[c];return n!==kt?!!n:i(t)}var e=r(2),o=r(6),i=r(45),a=r(14),f=r(46),s=r(38),l=r(75),h=r(59),u=r(76),c=r(52)("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",v=!o(function(){var t=[];return t[c]=!1,t.concat()[0]!==t}),d=u("concat");e({target:"Array",proto:!0,forced:!v||!d},{concat:function concat(t){var n,r,e,o,i,a=f(this),u=h(a,0),c=0;for(n=-1,e=arguments.length;n<e;n++)if(Xm(i=-1===n?a:arguments[n])){if(o=s(i.length),p<c+o)throw TypeError(g);for(r=0;r<o;r++,c++)r in i&&l(u,c,i[r])}else{if(p<=c)throw TypeError(g);l(u,c++,i)}return u.length=c,u}})},function(t,n,r){var o=r(13),i=r(19),a=r(8);t.exports=function(t,n,r){var e=o(n);e in t?i.f(t,e,a(0,r)):t[e]=r}},function(t,n,r){var e=r(6),o=r(52)("species");t.exports=function(n){return!e(function(){var t=[];return(t.constructor={})[o]=function(){return{foo:1}},1!==t[n](Boolean).foo})}},function(t,n,r){var e=r(2),o=r(78),i=r(79);e({target:"Array",proto:!0},{copyWithin:o}),i("copyWithin")},function(t,n,r){var f=r(46),s=r(40),l=r(38),h=Math.min;t.exports=[].copyWithin||function copyWithin(t,n){var r=f(this),e=l(r.length),o=s(t,e),i=s(n,e),a=2<arguments.length?arguments[2]:kt,u=h((a===kt?e:s(a,e))-i,e-o),c=1;for(i<o&&o<i+u&&(c=-1,i+=u-1,o+=u-1);0<u--;)i in r?r[o]=r[i]:delete r[o],o+=c,i+=c;return r}},function(t,n,r){var e=r(52),o=r(47),i=r(18),a=e("unscopables"),u=Array.prototype;u[a]==kt&&i(u,a,o(null)),t.exports=function(t){u[a][t]=!0}},function(t,n,r){var e=r(2),o=r(56).every;e({target:"Array",proto:!0,forced:r(81)("every")},{every:function every(t){return o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(6);t.exports=function(t,n){var r=[][t];return!r||!e(function(){r.call(null,n||function(){throw 1},1)})}},function(t,n,r){var e=r(2),o=r(83),i=r(79);e({target:"Array",proto:!0},{fill:o}),i("fill")},function(t,n,r){var u=r(46),c=r(40),f=r(38);t.exports=function fill(t){for(var n=u(this),r=f(n.length),e=arguments.length,o=c(1<e?arguments[1]:kt,r),i=2<e?arguments[2]:kt,a=i===kt?r:c(i,r);o<a;)n[o++]=t;return n}},function(t,n,r){var e=r(2),o=r(56).filter;e({target:"Array",proto:!0,forced:!r(76)("filter")},{filter:function filter(t){return o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(2),o=r(56).find,i=r(79),a="find",u=!0;a in[]&&Array(1)[a](function(){u=!1}),e({target:"Array",proto:!0,forced:u},{find:function find(t){return o(this,t,1<arguments.length?arguments[1]:kt)}}),i(a)},function(t,n,r){var e=r(2),o=r(56).findIndex,i=r(79),a="findIndex",u=!0;a in[]&&Array(1)[a](function(){u=!1}),e({target:"Array",proto:!0,forced:u},{findIndex:function findIndex(t){return o(this,t,1<arguments.length?arguments[1]:kt)}}),i(a)},function(t,n,r){var e=r(2),o=r(88),i=r(46),a=r(38),u=r(39),c=r(59);e({target:"Array",proto:!0},{flat:function flat(){var t=arguments.length?arguments[0]:kt,n=i(this),r=a(n.length),e=c(n,0);return e.length=o(e,n,n,r,0,t===kt?1:u(t)),e}})},function(t,n,r){var h=r(45),p=r(38),g=r(57),v=function(t,n,r,e,o,i,a,u){for(var c,f=o,s=0,l=!!a&&g(a,u,3);s<e;){if(s in r){if(c=l?l(r[s],s,n):r[s],0<i&&h(c))f=v(t,n,c,p(c.length),f,i-1)-1;else{if(9007199254740991<=f)throw TypeError("Exceed the acceptable array length");t[f]=c}f++}s++}return f};t.exports=v},function(t,n,r){var e=r(2),o=r(88),i=r(46),a=r(38),u=r(58),c=r(59);e({target:"Array",proto:!0},{flatMap:function flatMap(t){var n,r=i(this),e=a(r.length);return u(t),(n=c(r,0)).length=o(n,r,r,e,0,1,t,1<arguments.length?arguments[1]:kt),n}})},function(t,n,r){var e=r(2),o=r(91);e({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},function(t,n,r){var e=r(56).forEach,o=r(81);t.exports=o("forEach")?function forEach(t){return e(this,t,1<arguments.length?arguments[1]:kt)}:[].forEach},function(t,n,r){var e=r(2),o=r(93);e({target:"Array",stat:!0,forced:!r(99)(function(t){Array.from(t)})},{from:o})},function(t,n,r){var h=r(57),p=r(46),g=r(94),v=r(95),d=r(38),y=r(75),m=r(97);t.exports=function from(t){var n,r,e,o,i=p(t),a="function"==typeof this?this:Array,u=arguments.length,c=1<u?arguments[1]:kt,f=c!==kt,s=0,l=m(i);if(f&&(c=h(c,2<u?arguments[2]:kt,2)),l==kt||a==Array&&v(l))for(r=new a(n=d(i.length));s<n;s++)y(r,s,f?c(i[s],s):i[s]);else for(o=l.call(i),r=new a;!(e=o.next()).done;s++)y(r,s,f?g(o,c,[e.value,s],!0):e.value);return r.length=s,r}},function(t,n,r){var a=r(20);t.exports=function(t,n,r,e){try{return e?n(a(r)[0],r[1]):n(r)}catch(i){var o=t["return"];throw o!==kt&&a(o.call(t)),i}}},function(t,n,r){var e=r(52),o=r(96),i=e("iterator"),a=Array.prototype;t.exports=function(t){return t!==kt&&(o.Array===t||a[i]===t)}},function(t,n){t.exports={}},function(t,n,r){var e=r(98),o=r(96),i=r(52)("iterator");t.exports=function(t){if(t!=kt)return t[i]||t["@@iterator"]||o[e(t)]}},function(t,n,r){var o=r(11),i=r(52)("toStringTag"),a="Arguments"==o(function(){return arguments}());t.exports=function(t){var n,r,e;return t===kt?"Undefined":null===t?"Null":"string"==typeof(r=function(t,n){try{return t[n]}catch(r){}}(n=Object(t),i))?r:a?o(n):"Object"==(e=o(n))&&"function"==typeof n.callee?"Arguments":e}},function(t,n,r){var o=r(52)("iterator"),i=!1;try{var e=0,a={next:function(){return{done:!!e++}},"return":function(){i=!0}};a[o]=function(){return this},Array.from(a,function(){throw 2})}catch(u){}t.exports=function(t,n){if(!n&&!i)return!1;var r=!1;try{var e={};e[o]=function(){return{next:function(){return{done:r=!0}}}},t(e)}catch(u){}return r}},function(t,n,r){var e=r(2),o=r(37).includes,i=r(79);e({target:"Array",proto:!0},{includes:function includes(t){return o(this,t,1<arguments.length?arguments[1]:kt)}}),i("includes")},function(t,n,r){var e=r(2),o=r(37).indexOf,i=r(81),a=[].indexOf,u=!!a&&1/[1].indexOf(1,-0)<0,c=i("indexOf");e({target:"Array",proto:!0,forced:u||c},{indexOf:function indexOf(t){return u?a.apply(this,arguments)||0:o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){r(2)({target:"Array",stat:!0},{isArray:r(45)})},function(t,n,r){var e=r(9),o=r(79),i=r(96),a=r(26),u=r(104),c="Array Iterator",f=a.set,s=a.getterFor(c);t.exports=u(Array,"Array",function(t,n){f(this,{type:c,target:e(t),index:0,kind:n})},function(){var t=s(this),n=t.target,r=t.kind,e=t.index++;return!n||n.length<=e?{value:t.target=kt,done:!0}:"keys"==r?{value:e,done:!1}:"values"==r?{value:n[e],done:!1}:{value:[e,n[e]],done:!1}},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},function(t,n,r){function ct(){return this}var d=r(2),y=r(105),m=r(107),b=r(109),x=r(55),w=r(18),S=r(21),e=r(52),A=r(24),E=r(96),o=r(106),O=o.IteratorPrototype,I=o.BUGGY_SAFARI_ITERATORS,M=e("iterator"),P="values",R="entries";t.exports=function(t,n,r,e,o,i,a){y(r,n,e);function kt(t){if(t===o&&g)return g;if(!I&&t in h)return h[t];switch(t){case"keys":return function keys(){return new r(this,t)};case P:return function values(){return new r(this,t)};case R:return function entries(){return new r(this,t)}}return function(){return new r(this)}}var u,c,f,s=n+" Iterator",l=!1,h=t.prototype,p=h[M]||h["@@iterator"]||o&&h[o],g=!I&&p||kt(o),v="Array"==n&&h.entries||p;if(v&&(u=m(v.call(new t)),O!==Object.prototype&&u.next&&(A||m(u)===O||(b?b(u,O):"function"!=typeof u[M]&&w(u,M,ct)),x(u,s,!0,!0),A&&(E[s]=ct))),o==P&&p&&p.name!==P&&(l=!0,g=function values(){return p.call(this)}),A&&!a||h[M]===g||w(h,M,g),E[n]=g,o)if(c={values:kt(P),keys:i?g:kt("keys"),entries:kt(R)},a)for(f in c)!I&&!l&&f in h||S(h,f,c[f]);else d({target:n,proto:!0,forced:I||l},c);return c}},function(t,n,r){function Dt(){return this}var o=r(106).IteratorPrototype,i=r(47),a=r(8),u=r(55),c=r(96);t.exports=function(t,n,r){var e=n+" Iterator";return t.prototype=i(o,{next:a(1,r)}),u(t,e,!1,!0),c[e]=Dt,t}},function(t,n,r){var e,o,i,a=r(107),u=r(18),c=r(15),f=r(52),s=r(24),l=f("iterator"),h=!1;[].keys&&("next"in(i=[].keys())?(o=a(a(i)))!==Object.prototype&&(e=o):h=!0),e==kt&&(e={}),s||c(e,l)||u(e,l,function(){return this}),t.exports={IteratorPrototype:e,BUGGY_SAFARI_ITERATORS:h}},function(t,n,r){var e=r(15),o=r(46),i=r(28),a=r(108),u=i("IE_PROTO"),c=Object.prototype;t.exports=a?Object.getPrototypeOf:function(t){return t=o(t),e(t,u)?t[u]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,n,r){var e=r(6);t.exports=!e(function(){function F(){}return F.prototype.constructor=null,Object.getPrototypeOf(new F)!==F.prototype})},function(t,n,r){var o=r(20),i=r(110);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var r,e=!1,t={};try{(r=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(t,[]),e=t instanceof Array}catch(n){}return function setPrototypeOf(t,n){return o(t),i(n),e?r.call(t,n):t.__proto__=n,t}}():kt)},function(t,n,r){var e=r(14);t.exports=function(t){if(!e(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,n,r){var e=r(2),o=r(10),i=r(9),a=r(81),u=[].join,c=o!=Object,f=a("join",",");e({target:"Array",proto:!0,forced:c||f},{join:function join(t){return u.call(i(this),t===kt?",":t)}})},function(t,n,r){var e=r(2),o=r(113);e({target:"Array",proto:!0,forced:o!==[].lastIndexOf},{lastIndexOf:o})},function(t,n,r){var o=r(9),i=r(39),a=r(38),e=r(81),u=Math.min,c=[].lastIndexOf,f=!!c&&1/[1].lastIndexOf(1,-0)<0,s=e("lastIndexOf");t.exports=f||s?function lastIndexOf(t){if(f)return c.apply(this,arguments)||0;var n=o(this),r=a(n.length),e=r-1;for(1<arguments.length&&(e=u(e,i(arguments[1]))),e<0&&(e=r+e);0<=e;e--)if(e in n&&n[e]===t)return e||0;return-1}:c},function(t,n,r){var e=r(2),o=r(56).map;e({target:"Array",proto:!0,forced:!r(76)("map")},{map:function map(t){return o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(2),o=r(6),i=r(75);e({target:"Array",stat:!0,forced:o(function(){function F(){}return!(Array.of.call(F)instanceof F)})},{of:function of(){for(var t=0,n=arguments.length,r=new("function"==typeof this?this:Array)(n);t<n;)i(r,t,arguments[t++]);return r.length=n,r}})},function(t,n,r){var e=r(2),o=r(117).left;e({target:"Array",proto:!0,forced:r(81)("reduce")},{reduce:function reduce(t){return o(this,t,arguments.length,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){function Hv(f){return function(t,n,r,e){s(n);var o=l(t),i=h(o),a=p(o.length),u=f?a-1:0,c=f?-1:1;if(r<2)for(;;){if(u in i){e=i[u],u+=c;break}if(u+=c,f?u<0:a<=u)throw TypeError("Reduce of empty array with no initial value")}for(;f?0<=u:u<a;u+=c)u in i&&(e=n(e,i[u],u,o));return e}}var s=r(58),l=r(46),h=r(10),p=r(38);t.exports={left:Hv(!1),right:Hv(!0)}},function(t,n,r){var e=r(2),o=r(117).right;e({target:"Array",proto:!0,forced:r(81)("reduceRight")},{reduceRight:function reduceRight(t){return o(this,t,arguments.length,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(2),o=r(45),i=[].reverse,a=[1,2];e({target:"Array",proto:!0,forced:String(a)===String(a.reverse())},{reverse:function reverse(){return o(this)&&(this.length=this.length),i.call(this)}})},function(t,n,r){var e=r(2),f=r(14),s=r(45),l=r(40),h=r(38),p=r(9),g=r(75),o=r(76),v=r(52)("species"),d=[].slice,y=Math.max;e({target:"Array",proto:!0,forced:!o("slice")},{slice:function slice(t,n){var r,e,o,i=p(this),a=h(i.length),u=l(t,a),c=l(n===kt?a:n,a);if(s(i)&&("function"!=typeof(r=i.constructor)||r!==Array&&!s(r.prototype)?f(r)&&null===(r=r[v])&&(r=kt):r=kt,r===Array||r===kt))return d.call(i,u,c);for(e=new(r===kt?Array:r)(y(c-u,0)),o=0;u<c;u++,o++)u in i&&g(e,o,i[u]);return e.length=o,e}})},function(t,n,r){var e=r(2),o=r(56).some;e({target:"Array",proto:!0,forced:r(81)("some")},{some:function some(t){return o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(2),o=r(58),i=r(46),a=r(6),u=r(81),c=[].sort,f=[1,2,3],s=a(function(){f.sort(kt)}),l=a(function(){f.sort(null)}),h=u("sort");e({target:"Array",proto:!0,forced:s||!l||h},{sort:function sort(t){return t===kt?c.call(i(this)):c.call(i(this),o(t))}})},function(t,n,r){r(124)("Array")},function(t,n,r){var e=r(33),o=r(19),i=r(52),a=r(5),u=i("species");t.exports=function(t){var n=e(t);a&&n&&!n[u]&&(0,o.f)(n,u,{configurable:!0,get:function(){return this}})}},function(t,n,r){var e=r(2),h=r(40),p=r(39),g=r(38),v=r(46),d=r(59),y=r(75),o=r(76),m=Math.max,b=Math.min;e({target:"Array",proto:!0,forced:!o("splice")},{splice:function splice(t,n){var r,e,o,i,a,u,c=v(this),f=g(c.length),s=h(t,f),l=arguments.length;if(0===l?r=e=0:e=1===l?(r=0,f-s):(r=l-2,b(m(p(n),0),f-s)),9007199254740991<f+r-e)throw TypeError("Maximum allowed length exceeded");for(o=d(c,e),i=0;i<e;i++)(a=s+i)in c&&y(o,i,c[a]);if(r<(o.length=e)){for(i=s;i<f-e;i++)u=i+r,(a=i+e)in c?c[u]=c[a]:delete c[u];for(i=f;f-e+r<i;i--)delete c[i-1]}else if(e<r)for(i=f-e;s<i;i--)u=i+r-1,(a=i+e-1)in c?c[u]=c[a]:delete c[u];for(i=0;i<r;i++)c[i+s]=arguments[i+2];return c.length=f-e+r,o}})},function(t,n,r){r(79)("flat")},function(t,n,r){r(79)("flatMap")},function(t,n,r){var e=r(2),o=r(3),i=r(129),a=r(124),u="ArrayBuffer",c=i[u];e({global:!0,forced:o[u]!==c},{ArrayBuffer:c}),a(u)},function(t,n,r){function My(t,n,r){var e,o,i,a=new Array(r),u=8*r-n-1,c=(1<<u)-1,f=c>>1,s=23===n?_(2,-24)-_(2,-77):0,l=t<0||0===t&&1/t<0?1:0,h=0;for((t=R(t))!=t||t===1/0?(o=t!=t?1:0,e=c):(e=j(k(t)/T),t*(i=_(2,-e))<1&&(e--,i*=2),2<=(t+=1<=e+f?s/i:s*_(2,1-f))*i&&(e++,i/=2),c<=e+f?(o=0,e=c):1<=e+f?(o=(t*i-1)*_(2,n),e+=f):(o=t*_(2,f-1)*_(2,n),e=0));8<=n;a[h++]=255&o,o/=256,n-=8);for(e=e<<n|o,u+=n;0<u;a[h++]=255&e,e/=256,u-=8);return a[--h]|=128*l,a}function Ny(t,n){var r,e=t.length,o=8*e-n-1,i=(1<<o)-1,a=i>>1,u=o-7,c=e-1,f=t[c--],s=127&f;for(f>>=7;0<u;s=256*s+t[c],c--,u-=8);for(r=s&(1<<-u)-1,s>>=-u,u+=n;0<u;r=256*r+t[c],c--,u-=8);if(0===s)s=1-a;else{if(s===i)return r?NaN:f?-1/0:1/0;r+=_(2,n),s-=a}return(f?-1:1)*r*_(2,s-n)}function Oy(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function Py(t){return[255&t]}function Qy(t){return[255&t,t>>8&255]}function Ry(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function Sy(t){return My(t,23,4)}function Ty(t){return My(t,52,8)}function Uy(t,n){g(t[S],n,{get:function(){return m(this)[n]}})}function Vy(t,n,r,e){var o=h(+r),i=m(t);if(i.byteLength<o+n)throw P(A);var a=m(i.buffer).bytes,u=o+i.byteOffset,c=a.slice(u,u+n);return e?c:c.reverse()}function Wy(t,n,r,e,o,i){var a=h(+r),u=m(t);if(u.byteLength<a+n)throw P(A);for(var c=m(u.buffer).bytes,f=a+u.byteOffset,s=e(+o),l=0;l<n;l++)c[f+l]=s[i?l:n-l-1]}var e=r(3),i=r(5),o=r(130).NATIVE_ARRAY_BUFFER,a=r(18),u=r(131),c=r(6),f=r(132),s=r(39),l=r(38),h=r(133),p=r(35).f,g=r(19).f,v=r(83),d=r(55),y=r(26),m=y.get,b=y.set,x="ArrayBuffer",w="DataView",S="prototype",A="Wrong index",E=e[x],O=E,I=e[w],M=e.Math,P=e.RangeError,R=M.abs,_=M.pow,j=M.floor,k=M.log,T=M.LN2;if(o){if(!c(function(){E(1)})||!c(function(){new E(-1)})||c(function(){return new E,new E(1.5),new E(NaN),E.name!=x})){for(var F,L=(
    O=function ArrayBuffer(t){return f(this,O),new E(h(t))})[S]=E[S],U=p(E),N=0;N<U.length;)(F=U[N++])in O||a(O,F,E[F]);L.constructor=O}var W=new I(new O(2)),D=I[S].setInt8;W.setInt8(0,2147483648),W.setInt8(1,2147483649),!W.getInt8(0)&&W.getInt8(1)||u(I[S],{setInt8:function setInt8(t,n){D.call(this,t,n<<24>>24)},setUint8:function setUint8(t,n){D.call(this,t,n<<24>>24)}},{unsafe:!0})}else O=function ArrayBuffer(t){f(this,O,x);var n=h(t);b(this,{bytes:v.call(new Array(n),0),byteLength:n}),i||(this.byteLength=n)},I=function DataView(t,n,r){f(this,I,w),f(t,O,w);var e=m(t).byteLength,o=s(n);if(o<0||e<o)throw P("Wrong offset");if(e<o+(r=r===kt?e-o:l(r)))throw P("Wrong length");b(this,{buffer:t,byteLength:r,byteOffset:o}),i||(this.buffer=t,this.byteLength=r,this.byteOffset=o)},i&&(Uy(O,"byteLength"),Uy(I,"buffer"),Uy(I,"byteLength"),Uy(I,"byteOffset")),u(I[S],{getInt8:function getInt8(t){return Vy(this,1,t)[0]<<24>>24},getUint8:function getUint8(t){return Vy(this,1,t)[0]},getInt16:function getInt16(t){var n=Vy(this,2,t,1<arguments.length?arguments[1]:kt);return(n[1]<<8|n[0])<<16>>16},getUint16:function getUint16(t){var n=Vy(this,2,t,1<arguments.length?arguments[1]:kt);return n[1]<<8|n[0]},getInt32:function getInt32(t){return Oy(Vy(this,4,t,1<arguments.length?arguments[1]:kt))},getUint32:function getUint32(t){return Oy(Vy(this,4,t,1<arguments.length?arguments[1]:kt))>>>0},getFloat32:function getFloat32(t){return Ny(Vy(this,4,t,1<arguments.length?arguments[1]:kt),23)},getFloat64:function getFloat64(t){return Ny(Vy(this,8,t,1<arguments.length?arguments[1]:kt),52)},setInt8:function setInt8(t,n){Wy(this,1,t,Py,n)},setUint8:function setUint8(t,n){Wy(this,1,t,Py,n)},setInt16:function setInt16(t,n){Wy(this,2,t,Qy,n,2<arguments.length?arguments[2]:kt)},setUint16:function setUint16(t,n){Wy(this,2,t,Qy,n,2<arguments.length?arguments[2]:kt)},setInt32:function setInt32(t,n){Wy(this,4,t,Ry,n,2<arguments.length?arguments[2]:kt)},setUint32:function setUint32(t,n){Wy(this,4,t,Ry,n,2<arguments.length?arguments[2]:kt)},setFloat32:function setFloat32(t,n){Wy(this,4,t,Sy,n,2<arguments.length?arguments[2]:kt)},setFloat64:function setFloat64(t,n){Wy(this,8,t,Ty,n,2<arguments.length?arguments[2]:kt)}});d(O,x),d(I,w),n[x]=O,n[w]=I},function(t,n,r){function tB(t){return o(t)&&c(j,i(t))}var e,a=r(5),u=r(3),o=r(14),c=r(15),i=r(98),f=r(18),s=r(21),l=r(19).f,h=r(107),p=r(109),g=r(52),v=r(29),d=u.DataView,y=d&&d.prototype,m=u.Int8Array,b=m&&m.prototype,x=u.Uint8ClampedArray,w=x&&x.prototype,S=m&&h(m),A=b&&h(b),E=Object.prototype,O=E.isPrototypeOf,I=g("toStringTag"),M=v("TYPED_ARRAY_TAG"),P=!(!u.ArrayBuffer||!d),R=P&&!!p,_=!1,j={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},k=function k(t){var n=i(t);return"DataView"===n||c(j,n)};for(e in j)u[e]||(R=!1);if((!R||"function"!=typeof S||S===Function.prototype)&&(S=function S(){throw TypeError("Incorrect invocation")},R))for(e in j)u[e]&&p(u[e],S);if((!R||!A||A===E)&&(A=S.prototype,R))for(e in j)u[e]&&p(u[e].prototype,A);if(R&&h(w)!==A&&p(w,A),a&&!c(A,I))for(e in _=!0,l(A,I,{get:function(){return o(this)?this[M]:kt}}),j)u[e]&&f(u[e],M,e);P&&p&&h(y)!==E&&p(y,E),t.exports={NATIVE_ARRAY_BUFFER:P,NATIVE_ARRAY_BUFFER_VIEWS:R,TYPED_ARRAY_TAG:_&&M,aTypedArray:function(t){if(tB(t))return t;throw TypeError("Target is not a typed array")},aTypedArrayConstructor:function(t){if(p){if(O.call(S,t))return t}else for(var n in j)if(c(j,e)){var r=u[n];if(r&&(t===r||O.call(r,t)))return t}throw TypeError("Target is not a typed array constructor")},exportProto:function(t,n,r){if(a){if(r)for(var e in j){var o=u[e];o&&c(o.prototype,t)&&delete o.prototype[t]}A[t]&&!r||s(A,t,r?n:R&&b[t]||n)}},exportStatic:function(t,n,r){var e,o;if(a){if(p){if(r)for(e in j)(o=u[e])&&c(o,t)&&delete o[t];if(S[t]&&!r)return;try{return s(S,t,r?n:R&&m[t]||n)}catch(i){}}for(e in j)!(o=u[e])||o[t]&&!r||s(o,t,n)}},isView:k,isTypedArray:tB,TypedArray:S,TypedArrayPrototype:A}},function(t,n,r){var o=r(21);t.exports=function(t,n,r){for(var e in n)o(t,e,n[e],r);return t}},function(t,n){t.exports=function(t,n,r){if(!(t instanceof n))throw TypeError("Incorrect "+(r?r+" ":"")+"invocation");return t}},function(t,n,r){var e=r(39),o=r(38);t.exports=function(t){if(t===kt)return 0;var n=e(t),r=o(n);if(n!==r)throw RangeError("Wrong length or index");return r}},function(t,n,r){var e=r(2),o=r(130);e({target:"ArrayBuffer",stat:!0,forced:!o.NATIVE_ARRAY_BUFFER_VIEWS},{isView:o.isView})},function(t,n,r){var e=r(2),o=r(6),i=r(129),f=r(20),s=r(40),l=r(38),h=r(136),p=i.ArrayBuffer,g=i.DataView,v=p.prototype.slice;e({target:"ArrayBuffer",proto:!0,unsafe:!0,forced:o(function(){return!new p(2).slice(1,kt).byteLength})},{slice:function slice(t,n){if(v!==kt&&n===kt)return v.call(f(this),t);for(var r=f(this).byteLength,e=s(t,r),o=s(n===kt?r:n,r),i=new(h(this,p))(l(o-e)),a=new g(this),u=new g(i),c=0;e<o;)u.setUint8(c++,a.getUint8(e++));return i}})},function(t,n,r){var o=r(20),i=r(58),a=r(52)("species");t.exports=function(t,n){var r,e=o(t).constructor;return e===kt||(r=o(e)[a])==kt?n:i(r)}},function(t,n,r){var e=r(2),o=r(129);e({global:!0,forced:!r(130).NATIVE_ARRAY_BUFFER},{DataView:o.DataView})},function(t,n,r){r(2)({target:"Date",stat:!0},{now:function now(){return(new Date).getTime()}})},function(t,n,r){var e=r(2),o=r(140);e({target:"Date",proto:!0,forced:Date.prototype.toISOString!==o},{toISOString:o})},function(t,n,r){var e=r(6),o=r(141).start,i=Math.abs,a=Date.prototype,u=a.getTime,c=a.toISOString;t.exports=e(function(){return"0385-07-25T07:06:39.999Z"!=c.call(new Date(-5e13-1))})||!e(function(){c.call(new Date(NaN))})?function toISOString(){if(!isFinite(u.call(this)))throw RangeError("Invalid time value");var t=this,n=t.getUTCFullYear(),r=t.getUTCMilliseconds(),e=n<0?"-":9999<n?"+":"";return e+o(i(n),e?6:4,0)+"-"+o(t.getUTCMonth()+1,2,0)+"-"+o(t.getUTCDate(),2,0)+"T"+o(t.getUTCHours(),2,0)+":"+o(t.getUTCMinutes(),2,0)+":"+o(t.getUTCSeconds(),2,0)+"."+o(r,3,0)+"Z"}:c},function(t,n,r){function FD(f){return function(t,n,r){var e,o,i=String(h(t)),a=i.length,u=r===kt?" ":String(r),c=s(n);return c<=a||""==u?i:((e=c-a)<(o=l.call(u,p(e/u.length))).length&&(o=o.slice(0,e)),f?i+o:o+i)}}var s=r(38),l=r(142),h=r(12),p=Math.ceil;t.exports={start:FD(!1),end:FD(!0)}},function(t,n,r){var o=r(39),i=r(12);t.exports="".repeat||function repeat(t){var n=String(i(this)),r="",e=o(t);if(e<0||e==Infinity)throw RangeError("Wrong number of repetitions");for(;0<e;(e>>>=1)&&(n+=n))1&e&&(r+=n);return r}},function(t,n,r){var e=r(2),o=r(6),i=r(46),a=r(13);e({target:"Date",proto:!0,forced:o(function(){return null!==new Date(NaN).toJSON()||1!==Date.prototype.toJSON.call({toISOString:function(){return 1}})})},{toJSON:function toJSON(t){var n=i(this),r=a(n);return"number"!=typeof r||isFinite(r)?n.toISOString():null}})},function(t,n,r){var e=r(18),o=r(145),i=r(52)("toPrimitive"),a=Date.prototype;i in a||e(a,i,o)},function(t,n,r){var e=r(20),o=r(13);t.exports=function(t){if("string"!==t&&"number"!==t&&"default"!==t)throw TypeError("Incorrect hint");return o(e(this),"number"!==t)}},function(t,n,r){var e=r(21),o=Date.prototype,i="Invalid Date",a="toString",u=o[a],c=o.getTime;new Date(NaN)+""!=i&&e(o,a,function toString(){var t=c.call(this);return t==t?u.call(this):i})},function(t,n,r){r(2)({target:"Function",proto:!0},{bind:r(148)})},function(t,n,r){var i=r(58),a=r(14),u=[].slice,c={};t.exports=Function.bind||function bind(n){var r=i(this),e=u.call(arguments,1),o=function bound(){var t=e.concat(u.call(arguments));return this instanceof o?function(t,n,r){if(!(n in c)){for(var e=[],o=0;o<n;o++)e[o]="a["+o+"]";c[n]=Function("C,a","return new C("+e.join(",")+")")}return c[n](t,r)}(r,t.length,t):r.apply(n,t)};return a(r.prototype)&&(o.prototype=r.prototype),o}},function(t,n,r){var e=r(14),o=r(19),i=r(107),a=r(52)("hasInstance"),u=Function.prototype;a in u||o.f(u,a,{value:function(t){if("function"!=typeof this||!e(t))return!1;if(!e(this.prototype))return t instanceof this;for(;t=i(t);)if(this.prototype===t)return!0;return!1}})},function(t,n,r){var e=r(5),o=r(19).f,i=Function.prototype,a=i.toString,u=/^\s*function ([^ (]*)/;!e||"name"in i||o(i,"name",{configurable:!0,get:function(){try{return a.call(this).match(u)[1]}catch(t){return""}}})},function(t,n,r){var e=r(3);r(55)(e.JSON,"JSON",!0)},function(t,n,r){var e=r(153),o=r(158);t.exports=e("Map",function(t){return function Map(){return t(this,arguments.length?arguments[0]:kt)}},o,!0)},function(t,n,r){var v=r(2),d=r(3),y=r(43),m=r(21),b=r(154),x=r(156),w=r(132),S=r(14),A=r(6),E=r(99),O=r(55),I=r(157);t.exports=function(e,t,n,o,i){function eG(t){var r=u[t];m(u,t,"add"==t?function add(t){return r.call(this,0===t?0:t),this}:"delete"==t?function(t){return!(i&&!S(t))&&r.call(this,0===t?0:t)}:"get"==t?function get(t){return i&&!S(t)?kt:r.call(this,0===t?0:t)}:"has"==t?function has(t){return!(i&&!S(t))&&r.call(this,0===t?0:t)}:function set(t,n){return r.call(this,0===t?0:t,n),this})}var a=d[e],u=a&&a.prototype,c=a,f=o?"set":"add",r={};if(y(e,"function"!=typeof a||!(i||u.forEach&&!A(function(){(new a).entries().next()}))))c=n.getConstructor(t,e,o,f),b.REQUIRED=!0;else if(y(e,!0)){var s=new c,l=s[f](i?{}:-0,1)!=s,h=A(function(){s.has(1)}),p=E(function(t){new a(t)}),g=!i&&A(function(){for(var t=new a,n=5;n--;)t[f](n,n);return!t.has(-0)});p||(((c=t(function(t,n){w(t,c,e);var r=I(new a,t,c);return n!=kt&&x(n,r[f],r,o),r})).prototype=u).constructor=c),(h||g)&&(eG("delete"),eG("has"),o&&eG("get")),(g||l)&&eG(f),i&&u.clear&&delete u.clear}return v({global:!0,forced:(r[e]=c)!=a},r),O(c,e),i||n.setStrong(c,e,o),c}},function(t,n,r){function KG(t){a(t,f,{value:{objectID:"O"+ ++s,weakData:{}}})}var e=r(30),o=r(14),i=r(15),a=r(19).f,u=r(29),c=r(155),f=u("meta"),s=0,l=Object.isExtensible||function(){return!0},h=t.exports={REQUIRED:!1,fastKey:function(t,n){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,f)){if(!l(t))return"F";if(!n)return"E";KG(t)}return t[f].objectID},getWeakData:function(t,n){if(!i(t,f)){if(!l(t))return!0;if(!n)return!1;KG(t)}return t[f].weakData},onFreeze:function(t){return c&&h.REQUIRED&&l(t)&&!i(t,f)&&KG(t),t}};e[f]=!0},function(t,n,r){var e=r(6);t.exports=!e(function(){return Object.isExtensible(Object.preventExtensions({}))})},function(t,n,r){function gH(t,n){this.stopped=t,this.result=n}var h=r(20),p=r(95),g=r(38),v=r(57),d=r(97),y=r(94);(t.exports=function(t,n,r,e,o){var i,a,u,c,f,s,l=v(n,r,e?2:1);if(o)i=t;else{if("function"!=typeof(a=d(t)))throw TypeError("Target is not iterable");if(p(a)){for(u=0,c=g(t.length);u<c;u++)if((f=e?l(h(s=t[u])[0],s[1]):l(t[u]))&&f instanceof gH)return f;return new gH(!1)}i=a.call(t)}for(;!(s=i.next()).done;)if((f=y(i,l,s.value,e))&&f instanceof gH)return f;return new gH(!1)}).stop=function(t){return new gH(!0,t)}},function(t,n,r){var i=r(14),a=r(109);t.exports=function(t,n,r){var e,o;return a&&"function"==typeof(e=n.constructor)&&e!==r&&i(o=e.prototype)&&o!==r.prototype&&a(t,o),t}},function(t,n,r){var a=r(19).f,f=r(47),s=r(131),l=r(57),h=r(132),p=r(156),u=r(104),c=r(124),g=r(5),v=r(154).fastKey,e=r(26),d=e.set,y=e.getterFor;t.exports={getConstructor:function(t,r,e,o){function bI(t,n,r){var e,o,i=u(t),a=c(t,n);return a?a.value=r:(i.last=a={index:o=v(n,!0),key:n,value:r,previous:e=i.last,next:kt,removed:!1},i.first||(i.first=a),e&&(e.next=a),g?i.size++:t.size++,"F"!==o&&(i.index[o]=a)),t}var i=t(function(t,n){h(t,i,r),d(t,{type:r,index:f(null),first:kt,last:kt,size:0}),g||(t.size=0),n!=kt&&p(n,t[o],t,e)}),u=y(r),c=function(t,n){var r,e=u(t),o=v(n);if("F"!==o)return e.index[o];for(r=e.first;r;r=r.next)if(r.key==n)return r};return s(i.prototype,{clear:function clear(){for(var t=u(this),n=t.index,r=t.first;r;)r.removed=!0,r.previous&&(r.previous=r.previous.next=kt),delete n[r.index],r=r.next;t.first=t.last=kt,g?t.size=0:this.size=0},"delete":function(t){var n=u(this),r=c(this,t);if(r){var e=r.next,o=r.previous;delete n.index[r.index],r.removed=!0,o&&(o.next=e),e&&(e.previous=o),n.first==r&&(n.first=e),n.last==r&&(n.last=o),g?n.size--:this.size--}return!!r},forEach:function forEach(t){for(var n,r=u(this),e=l(t,1<arguments.length?arguments[1]:kt,3);n=n?n.next:r.first;)for(e(n.value,n.key,this);n&&n.removed;)n=n.previous},has:function has(t){return!!c(this,t)}}),s(i.prototype,e?{get:function get(t){var n=c(this,t);return n&&n.value},set:function set(t,n){return bI(this,0===t?0:t,n)}}:{add:function add(t){return bI(this,t=0===t?0:t,t)}}),g&&a(i.prototype,"size",{get:function(){return u(this).size}}),i},setStrong:function(t,n,r){var e=n+" Iterator",o=y(n),i=y(e);u(t,n,function(t,n){d(this,{type:e,target:t,state:o(t),kind:n,last:kt})},function(){for(var t=i(this),n=t.kind,r=t.last;r&&r.removed;)r=r.previous;return t.target&&(t.last=r=r?r.next:t.state.first)?"keys"==n?{value:r.key,done:!1}:"values"==n?{value:r.value,done:!1}:{value:[r.key,r.value],done:!1}:{value:t.target=kt,done:!0}},r?"entries":"values",!r,!0),c(n)}}},function(t,n,r){var e=r(2),o=r(160),i=Math.acosh,a=Math.log,u=Math.sqrt,c=Math.LN2;e({target:"Math",stat:!0,forced:!i||710!=Math.floor(i(Number.MAX_VALUE))||i(Infinity)!=Infinity},{acosh:function acosh(t){return(t=+t)<1?NaN:94906265.62425156<t?a(t)+c:o(t-1+u(t-1)*u(t+1))}})},function(t,n){var r=Math.log;t.exports=Math.log1p||function log1p(t){return-1e-8<(t=+t)&&t<1e-8?t-t*t/2:r(1+t)}},function(t,n,r){var e=r(2),o=Math.asinh,i=Math.log,a=Math.sqrt;e({target:"Math",stat:!0,forced:!(o&&0<1/o(0))},{asinh:function asinh(t){return isFinite(t=+t)&&0!=t?t<0?-asinh(-t):i(t+a(t*t+1)):t}})},function(t,n,r){var e=r(2),o=Math.atanh,i=Math.log;e({target:"Math",stat:!0,forced:!(o&&1/o(-0)<0)},{atanh:function atanh(t){return 0==(t=+t)?t:i((1+t)/(1-t))/2}})},function(t,n,r){var e=r(2),o=r(164),i=Math.abs,a=Math.pow;e({target:"Math",stat:!0},{cbrt:function cbrt(t){return o(t=+t)*a(i(t),1/3)}})},function(t,n){t.exports=Math.sign||function sign(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},function(t,n,r){var e=r(2),o=Math.floor,i=Math.log,a=Math.LOG2E;e({target:"Math",stat:!0},{clz32:function clz32(t){return(t>>>=0)?31-o(i(t+.5)*a):32}})},function(t,n,r){var e=r(2),o=r(167),i=Math.cosh,a=Math.abs,u=Math.E;e({target:"Math",stat:!0,forced:!i||i(710)===Infinity},{cosh:function cosh(t){var n=o(a(t)-1)+1;return(n+1/(n*u*u))*(u/2)}})},function(t,n){var r=Math.expm1,e=Math.exp;t.exports=!r||22025.465794806718<r(10)||r(10)<22025.465794806718||-2e-17!=r(-2e-17)?function expm1(t){return 0==(t=+t)?t:-1e-6<t&&t<1e-6?t+t*t/2:e(t)-1}:r},function(t,n,r){var e=r(2),o=r(167);e({target:"Math",stat:!0,forced:o!=Math.expm1},{expm1:o})},function(t,n,r){r(2)({target:"Math",stat:!0},{fround:r(170)})},function(t,n,r){var i=r(164),a=Math.abs,e=Math.pow,u=e(2,-52),c=e(2,-23),f=e(2,127)*(2-c),s=e(2,-126);t.exports=Math.fround||function fround(t){var n,r,e=a(t),o=i(t);return e<s?o*function(t){return t+1/u-1/u}(e/s/c)*s*c:f<(r=(n=(1+c/u)*e)-(n-e))||r!=r?o*Infinity:o*r}},function(t,n,r){var e=r(2),c=Math.abs,f=Math.sqrt;e({target:"Math",stat:!0},{hypot:function hypot(t,n){for(var r,e,o=0,i=0,a=arguments.length,u=0;i<a;)u<(r=c(arguments[i++]))?(o=o*(e=u/r)*e+1,u=r):o+=0<r?(e=r/u)*e:r;return u===Infinity?Infinity:u*f(o)}})},function(t,n,r){var e=r(2),o=r(6),i=Math.imul;e({target:"Math",stat:!0,forced:o(function(){return-5!=i(4294967295,5)||2!=i.length})},{imul:function imul(t,n){var r=65535,e=+t,o=+n,i=r&e,a=r&o;return 0|i*a+((r&e>>>16)*a+i*(r&o>>>16)<<16>>>0)}})},function(t,n,r){var e=r(2),o=Math.log,i=Math.LOG10E;e({target:"Math",stat:!0},{log10:function log10(t){return o(t)*i}})},function(t,n,r){r(2)({target:"Math",stat:!0},{log1p:r(160)})},function(t,n,r){var e=r(2),o=Math.log,i=Math.LN2;e({target:"Math",stat:!0},{log2:function log2(t){return o(t)/i}})},function(t,n,r){r(2)({target:"Math",stat:!0},{sign:r(164)})},function(t,n,r){var e=r(2),o=r(6),i=r(167),a=Math.abs,u=Math.exp,c=Math.E;e({target:"Math",stat:!0,forced:o(function(){return-2e-17!=Math.sinh(-2e-17)})},{sinh:function sinh(t){return a(t=+t)<1?(i(t)-i(-t))/2:(u(t-1)-u(-t-1))*(c/2)}})},function(t,n,r){var e=r(2),o=r(167),i=Math.exp;e({target:"Math",stat:!0},{tanh:function tanh(t){var n=o(t=+t),r=o(-t);return n==Infinity?1:r==Infinity?-1:(n-r)/(i(t)+i(-t))}})},function(t,n,r){r(55)(Math,"Math",!0)},function(t,n,r){var e=r(2),o=Math.ceil,i=Math.floor;e({target:"Math",stat:!0},{trunc:function trunc(t){return(0<t?i:o)(t)}})},function(t,n,r){function BM(t){var n,r,e,o,i,a,u,c,f=s(t,!1);if("string"==typeof f&&2<f.length)if(43===(n=(f=d(f)).charCodeAt(0))||45===n){if(88===(r=f.charCodeAt(2))||120===r)return NaN}else if(48===n){switch(f.charCodeAt(1)){case 66:case 98:e=2,o=49;break;case 79:case 111:e=8,o=55;break;default:return+f}for(a=(i=f.slice(2)).length,u=0;u<a;u++)if((c=i.charCodeAt(u))<48||o<c)return NaN;return parseInt(i,e)}return+f}var e=r(5),o=r(3),i=r(43),a=r(21),u=r(15),c=r(11),f=r(157),s=r(13),l=r(6),h=r(47),p=r(35).f,g=r(4).f,v=r(19).f,d=r(182).trim,y="Number",m=o[y],b=m.prototype,x=c(h(b))==y;if(i(y,!m(" 0o1")||!m("0b1")||m("+0x1"))){for(var w,S=function Number(t){var n=arguments.length<1?0:t,r=this;return r instanceof S&&(x?l(function(){b.valueOf.call(r)}):c(r)!=y)?f(new m(BM(n)),r,S):BM(n)},A=e?p(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),E=0;E<A.length;E++)u(m,w=A[E])&&!u(S,w)&&v(S,w,g(m,w));a(o,y,(S.prototype=b).constructor=S)}},function(t,n,r){function _M(r){return function(t){var n=String(e(t));return 1&r&&(n=n.replace(i,"")),2&r&&(n=n.replace(a,"")),n}}var e=r(12),o="["+r(183)+"]",i=RegExp("^"+o+o+"*"),a=RegExp(o+o+"*$");t.exports={start:_M(1),end:_M(2),trim:_M(3)}},function(t,n){t.exports="\t\n\x0B\f\r                　\u2028\u2029\ufeff"},function(t,n,r){r(2)({target:"Number",stat:!0},{EPSILON:Math.pow(2,-52)})},function(t,n,r){r(2)({target:"Number",stat:!0},{isFinite:r(186)})},function(t,n,r){var e=r(3).isFinite;t.exports=Number.isFinite||function isFinite(t){return"number"==typeof t&&e(t)}},function(t,n,r){r(2)({target:"Number",stat:!0},{isInteger:r(188)})},function(t,n,r){var e=r(14),o=Math.floor;t.exports=function isInteger(t){return!e(t)&&isFinite(t)&&o(t)===t}},function(t,n,r){r(2)({target:"Number",stat:!0},{isNaN:function isNaN(t){return t!=t}})},function(t,n,r){var e=r(2),o=r(188),i=Math.abs;e({target:"Number",stat:!0},{isSafeInteger:function isSafeInteger(t){return o(t)&&i(t)<=9007199254740991}})},function(t,n,r){r(2)({target:"Number",stat:!0},{MAX_SAFE_INTEGER:9007199254740991})},function(t,n,r){r(2)({target:"Number",stat:!0},{MIN_SAFE_INTEGER:-9007199254740991})},function(t,n,r){var e=r(2),o=r(194);e({target:"Number",stat:!0,forced:Number.parseFloat!=o},{parseFloat:o})},function(t,n,r){var e=r(3),o=r(182).trim,i=r(183),a=e.parseFloat,u=1/a(i+"-0")!=-Infinity;t.exports=u?function parseFloat(t){var n=o(String(t)),r=a(n);return 0===r&&"-"==n.charAt(0)?-0:r}:a},function(t,n,r){var e=r(2),o=r(196);e({target:"Number",stat:!0,forced:Number.parseInt!=o},{parseInt:o})},function(t,n,r){var e=r(3),o=r(182).trim,i=r(183),a=e.parseInt,u=/^[+-]?0[Xx]/,c=8!==a(i+"08")||22!==a(i+"0x16");t.exports=c?function parseInt(t,n){var r=o(String(t));return a(r,n>>>0||(u.test(r)?16:10))}:a},function(t,n,r){var e=r(2),s=r(39),l=r(198),h=r(142),o=r(6),i=1..toFixed,p=Math.floor,g=function(t,n,r){return 0===n?r:n%2==1?g(t,n-1,r*t):g(t*t,n/2,r)};e({target:"Number",proto:!0,forced:i&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o(function(){i.call({})})},{toFixed:function toFixed(t){function fP(t,n){for(var r=-1,e=n;++r<6;)u[r]=(e+=t*u[r])%1e7,e=p(e/1e7)}function gP(t){for(var n=6,r=0;0<=--n;)u[n]=p((r+=u[n])/t),r=r%t*1e7}function hP(){for(var t=6,n="";0<=--t;)if(""!==n||0===t||0!==u[t]){var r=String(u[t]);n=""===n?r:n+h.call("0",7-r.length)+r}return n}var n,r,e,o,i=l(this),a=s(t),u=[0,0,0,0,0,0],c="",f="0";if(a<0||20<a)throw RangeError("Incorrect fraction digits");if(i!=i)return"NaN";if(i<=-1e21||1e21<=i)return String(i);if(i<0&&(c="-",i=-i),1e-21<i)if(r=(n=function(t){for(var n=0,r=t;4096<=r;)n+=12,r/=4096;for(;2<=r;)n+=1,r/=2;return n}(i*g(2,69,1))-69)<0?i*g(2,-n,1):i/g(2,n,1),r*=4503599627370496,0<(n=52-n)){for(fP(0,r),e=a;7<=e;)fP(1e7,0),e-=7;for(fP(g(10,e,1),0),e=n-1;23<=e;)gP(1<<23),e-=23;gP(1<<e),fP(1,1),gP(2),f=hP()}else fP(0,r),fP(1<<-n,0),f=hP()+h.call("0",a);return f=0<a?c+((o=f.length)<=a?"0."+h.call("0",a-o)+f:f.slice(0,o-a)+"."+f.slice(o-a)):c+f}})},function(t,n,r){var e=r(11);t.exports=function(t){if("number"!=typeof t&&"Number"!=e(t))throw TypeError("Incorrect invocation");return+t}},function(t,n,r){var e=r(2),o=r(6),i=r(198),a=1..toPrecision;e({target:"Number",proto:!0,forced:o(function(){return"1"!==a.call(1,kt)})||!o(function(){a.call({})})},{toPrecision:function toPrecision(t){return t===kt?a.call(i(this)):a.call(i(this),t)}})},function(t,n,r){var e=r(2),o=r(201);e({target:"Object",stat:!0,forced:Object.assign!==o},{assign:o})},function(t,n,r){var h=r(5),e=r(6),p=r(49),g=r(42),v=r(7),d=r(46),y=r(10),o=Object.assign;t.exports=!o||e(function(){var t={},n={},r=Symbol(),e="abcdefghijklmnopqrst";return t[r]=7,e.split("").forEach(function(t){n[t]=t}),7!=o({},t)[r]||p(o({},n)).join("")!=e})?function assign(t,n){for(var r=d(t),e=arguments.length,o=1,i=g.f,a=v.f;o<e;)for(var u,c=y(arguments[o++]),f=i?p(c).concat(i(c)):p(c),s=f.length,l=0;l<s;)u=f[l++],h&&!a.call(c,u)||(r[u]=c[u]);return r}:o},function(t,n,r){r(2)({target:"Object",stat:!0,sham:!r(5)},{create:r(47)})},function(t,n,r){var e=r(2),o=r(5),i=r(204),a=r(46),u=r(58),c=r(19);o&&e({target:"Object",proto:!0,forced:i},{__defineGetter__:function __defineGetter__(t,n){c.f(a(this),t,{get:u(n),enumerable:!0,configurable:!0})}})},function(t,n,r){var e=r(24),o=r(3),i=r(6);t.exports=e||!i(function(){var t=Math.random();__defineSetter__.call(null,t,function(){}),delete o[t]})},function(t,n,r){var e=r(2),o=r(5);e({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperties:r(48)})},function(t,n,r){var e=r(2),o=r(5);e({target:"Object",stat:!0,forced:!o,sham:!o},{defineProperty:r(19).f})},function(t,n,r){var e=r(2),o=r(5),i=r(204),a=r(46),u=r(58),c=r(19);o&&e({target:"Object",proto:!0,forced:i},{__defineSetter__:function __defineSetter__(t,n){c.f(a(this),t,{set:u(n),enumerable:!0,configurable:!0})}})},function(t,n,r){var e=r(2),o=r(209).entries;e({target:"Object",stat:!0},{entries:function entries(t){return o(t)}})},function(t,n,r){function rR(u){return function(t){for(var n,r=s(t),e=f(r),o=e.length,i=0,a=[];i<o;)n=e[i++],c&&!l.call(r,n)||a.push(u?[n,r[n]]:r[n]);return a}}var c=r(5),f=r(49),s=r(9),l=r(7).f;t.exports={entries:rR(!0),values:rR(!1)}},function(t,n,r){var e=r(2),o=r(155),i=r(6),a=r(14),u=r(154).onFreeze,c=Object.freeze;e({target:"Object",stat:!0,forced:i(function(){c(1)}),sham:!o},{freeze:function freeze(t){return c&&a(t)?c(u(t)):t}})},function(t,n,r){var e=r(2),o=r(156),i=r(75);e({target:"Object",stat:!0},{fromEntries:function fromEntries(t){var r={};return o(t,function(t,n){i(r,t,n)},kt,!0),r}})},function(t,n,r){var e=r(2),o=r(6),i=r(9),a=r(4).f,u=r(5),c=o(function(){a(1)});e({target:"Object",stat:!0,forced:!u||c,sham:!u},{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(t,n){return a(i(t),n)}})},function(t,n,r){var e=r(2),o=r(5),c=r(32),f=r(9),s=r(4),l=r(75);e({target:"Object",stat:!0,sham:!o},{getOwnPropertyDescriptors:function getOwnPropertyDescriptors(t){for(var n,r,e=f(t),o=s.f,i=c(e),a={},u=0;u<i.length;)(r=o(e,n=i[u++]))!==kt&&l(a,n,r);return a}})},function(t,n,r){var e=r(2),o=r(6),i=r(51).f;e({target:"Object",stat:!0,forced:o(function(){return!Object.getOwnPropertyNames(1)})},{getOwnPropertyNames:i})},function(t,n,r){var e=r(2),o=r(6),i=r(46),a=r(107),u=r(108);e({target:"Object",stat:!0,forced:o(function(){a(1)}),sham:!u},{getPrototypeOf:function getPrototypeOf(t){return a(i(t))}})},function(t,n,r){r(2)({target:"Object",stat:!0},{is:r(217)})},function(t,n){t.exports=Object.is||function is(t,n){return t===n?0!==t||1/t==1/n:t!=t&&n!=n}},function(t,n,r){var e=r(2),o=r(6),i=r(14),a=Object.isExtensible;e({target:"Object",stat:!0,forced:o(function(){a(1)})},{isExtensible:function isExtensible(t){return!!i(t)&&(!a||a(t))}})},function(t,n,r){var e=r(2),o=r(6),i=r(14),a=Object.isFrozen;e({target:"Object",stat:!0,forced:o(function(){a(1)})},{isFrozen:function isFrozen(t){return!i(t)||!!a&&a(t)}})},function(t,n,r){var e=r(2),o=r(6),i=r(14),a=Object.isSealed;e({target:"Object",stat:!0,forced:o(function(){a(1)})},{isSealed:function isSealed(t){return!i(t)||!!a&&a(t)}})},function(t,n,r){var e=r(2),o=r(46),i=r(49);e({target:"Object",stat:!0,forced:r(6)(function(){i(1)})},{keys:function keys(t){return i(o(t))}})},function(t,n,r){var e=r(2),o=r(5),i=r(204),a=r(46),u=r(13),c=r(107),f=r(4).f;o&&e({target:"Object",proto:!0,forced:i},{__lookupGetter__:function __lookupGetter__(t){var n,r=a(this),e=u(t,!0);do{if(n=f(r,e))return n.get}while(r=c(r))}})},function(t,n,r){var e=r(2),o=r(5),i=r(204),a=r(46),u=r(13),c=r(107),f=r(4).f;o&&e({target:"Object",proto:!0,forced:i},{__lookupSetter__:function __lookupSetter__(t){var n,r=a(this),e=u(t,!0);do{if(n=f(r,e))return n.set}while(r=c(r))}})},function(t,n,r){var e=r(2),o=r(14),i=r(154).onFreeze,a=r(155),u=r(6),c=Object.preventExtensions;e({target:"Object",stat:!0,forced:u(function(){c(1)}),sham:!a},{preventExtensions:function preventExtensions(t){return c&&o(t)?c(i(t)):t}})},function(t,n,r){var e=r(2),o=r(14),i=r(154).onFreeze,a=r(155),u=r(6),c=Object.seal;e({target:"Object",stat:!0,forced:u(function(){c(1)}),sham:!a},{seal:function seal(t){return c&&o(t)?c(i(t)):t}})},function(t,n,r){r(2)({target:"Object",stat:!0},{setPrototypeOf:r(109)})},function(t,n,r){var e=r(21),o=r(228),i=Object.prototype;o!==i.toString&&e(i,"toString",o,{unsafe:!0})},function(t,n,r){var e=r(98),o={};o[r(52)("toStringTag")]="z",t.exports="[object z]"!==String(o)?function toString(){return"[object "+e(this)+"]"}:o.toString},function(t,n,r){var e=r(2),o=r(209).values;e({target:"Object",stat:!0},{values:function values(t){return o(t)}})},function(t,n,r){var e=r(2),o=r(194);e({global:!0,forced:parseFloat!=o},{parseFloat:o})},function(t,n,r){var e=r(2),o=r(196);e({global:!0,forced:parseInt!=o},{parseInt:o})},function(t,n,r){function hW(t){var n;return!(!p(t)||"function"!=typeof(n=t.then))&&n}function iW(h,p,g){if(!p.notified){p.notified=!0;var v=p.reactions;w(function(){for(var t=p.value,n=1==p.state,r=0;r<v.length;){var e,o,i,a=v[r++],u=n?a.ok:a.fail,c=a.resolve,f=a.reject,s=a.domain;try{u?(n||(2===p.rejection&&H(h,p),p.rejection=1),!0===u?e=t:(s&&s.enter(),e=u(t),s&&(s.exit(),i=!0)),e===a.promise?f(L("Promise-chain cycle")):(o=hW(e))?o.call(e,c,f):c(e)):f(t)}catch(l){s&&!i&&s.exit(),f(l)}}p.reactions=[],p.notified=!1,g&&!p.rejection&&J(h,p)})}}function jW(t,n,r){var e,o;z?((e=U.createEvent("Event")).promise=n,e.reason=r,e.initEvent(t,!1,!0),c.dispatchEvent(e)):e={promise:n,reason:r},(o=c["on"+t])?o(e):t===G&&A("Unhandled promise rejection",r)}function nW(n,r,e,o){return function(t){n(r,e,t,o)}}function oW(t,n,r,e){n.done||(n.done=!0,e&&(n=e),n.value=r,n.state=2,iW(t,n,!0))}var e,o,i,a=r(2),u=r(24),c=r(3),f=r(34),s=r(131),l=r(55),h=r(124),p=r(14),g=r(58),v=r(132),d=r(11),y=r(156),m=r(99),b=r(136),x=r(233).set,w=r(234),S=r(236),A=r(238),E=r(237),O=r(239),I=r(235),M=r(26),P=r(43),R=r(52)("species"),_="Promise",j=M.get,k=M.set,T=M.getterFor(_),F=c[_],L=c.TypeError,U=c.document,N=c.process,W=c.fetch,D=N&&N.versions,C=D&&D.v8||"",K=E.f,B=K,q="process"==d(N),z=!!(U&&U.createEvent&&c.dispatchEvent),G="unhandledrejection",V=P(_,function(){function rW(){}var t=F.resolve(1),n=(t.constructor={})[R]=function(t){t(rW,rW)};return!((q||"function"==typeof PromiseRejectionEvent)&&(!u||t["finally"])&&t.then(rW)instanceof n&&0!==C.indexOf("6.6")&&-1===I.indexOf("Chrome/66"))}),Y=V||!m(function(t){F.all(t)["catch"](function(){})}),J=function(r,e){x.call(c,function(){var t,n=e.value;if($(e)&&(t=O(function(){q?N.emit("unhandledRejection",n,r):jW(G,r,n)}),e.rejection=q||$(e)?2:1,t.error))throw t.value})},$=function(t){return 1!==t.rejection&&!t.parent},H=function(t,n){x.call(c,function(){q?N.emit("rejectionHandled",t):jW("rejectionhandled",t,n.value)})},X=function(r,e,o,t){if(!e.done){e.done=!0,t&&(e=t);try{if(r===o)throw L("Promise can't be resolved itself");var i=hW(o);i?w(function(){var t={done:!1};try{i.call(o,nW(X,r,t,e),nW(oW,r,t,e))}catch(n){oW(r,t,n,e)}}):(e.value=o,e.state=1,iW(r,e,!1))}catch(n){oW(r,{done:!1},n,e)}}};V&&(F=function Promise(t){v(this,F,_),g(t),e.call(this);var n=j(this);try{t(nW(X,this,n),nW(oW,this,n))}catch(r){oW(this,n,r)}},(e=function Promise(t){k(this,{type:_,done:!1,notified:!1,parent:!1,reactions:[],rejection:!1,state:0,value:kt})}).prototype=s(F.prototype,{then:function then(t,n){var r=T(this),e=K(b(this,F));return e.ok="function"!=typeof t||t,e.fail="function"==typeof n&&n,e.domain=q?N.domain:kt,r.parent=!0,r.reactions.push(e),0!=r.state&&iW(this,r,!1),e.promise},"catch":function(t){return this.then(kt,t)}}),o=function(){var t=new e,n=j(t);this.promise=t,this.resolve=nW(X,t,n),this.reject=nW(oW,t,n)},E.f=K=function(t){return t===F||t===i?new o(t):B(t)},u||"function"!=typeof W||a({global:!0,enumerable:!0,forced:!0},{fetch:function fetch(t){return S(F,W.apply(c,arguments))}})),a({global:!0,wrap:!0,forced:V},{Promise:F}),l(F,_,!1,!0),h(_),i=f[_],a({target:_,stat:!0,forced:V},{reject:function reject(t){var n=K(this);return n.reject.call(kt,t),n.promise}}),a({target:_,stat:!0,forced:u||V},{resolve:function resolve(t){return S(u&&this===i?F:this,t)}}),a({target:_,stat:!0,forced:Y},{all:function all(t){var u=this,n=K(u),c=n.resolve,f=n.reject,r=O(function(){var e=g(u.resolve),o=[],i=0,a=1;y(t,function(t){var n=i++,r=!1;o.push(kt),a++,e.call(u,t).then(function(t){r||(r=!0,o[n]=t,--a||c(o))},f)}),--a||c(o)});return r.error&&f(r.value),n.promise},race:function race(t){var r=this,e=K(r),o=e.reject,n=O(function(){var n=g(r.resolve);y(t,function(t){n.call(r,t).then(e.resolve,o)})});return n.error&&o(n.value),e.promise}})},function(t,n,r){function xY(t){if(b.hasOwnProperty(t)){var n=b[t];delete b[t],n()}}function yY(t){return function(){xY(t)}}function zY(t){xY(t.data)}function AY(t){a.postMessage(t+"",h.protocol+"//"+h.host)}var e,o,i,a=r(3),u=r(6),c=r(11),f=r(57),s=r(50),l=r(17),h=a.location,p=a.setImmediate,g=a.clearImmediate,v=a.process,d=a.MessageChannel,y=a.Dispatch,m=0,b={},x="onreadystatechange";p&&g||(p=function setImmediate(t){for(var n=[],r=1;r<arguments.length;)n.push(arguments[r++]);return b[++m]=function(){("function"==typeof t?t:Function(t)).apply(kt,n)},e(m),m},g=function clearImmediate(t){delete b[t]},"process"==c(v)?e=function(t){v.nextTick(yY(t))}:y&&y.now?e=function(t){y.now(yY(t))}:d?(i=(o=new d).port2,o.port1.onmessage=zY,e=f(i.postMessage,i,1)):!a.addEventListener||"function"!=typeof postMessage||a.importScripts||u(AY)?e=x in l("script")?function(t){s.appendChild(l("script"))[x]=function(){s.removeChild(this),xY(t)}}:function(t){setTimeout(yY(t),0)}:(e=AY,a.addEventListener("message",zY,!1))),t.exports={set:p,clear:g}},function(t,n,r){var e,o,i,a,u,c,f,s=r(3),l=r(4).f,h=r(11),p=r(233).set,g=r(235),v=s.MutationObserver||s.WebKitMutationObserver,d=s.process,y=s.Promise,m="process"==h(d),b=l(s,"queueMicrotask"),x=b&&b.value;x||(e=function(){var t,n;for(m&&(t=d.domain)&&t.exit();o;){n=o.fn,o=o.next;try{n()}catch(r){throw o?a():i=kt,r}}i=kt,t&&t.enter()},a=m?function(){d.nextTick(e)}:v&&!/(iphone|ipod|ipad).*applewebkit/i.test(g)?(u=!0,c=document.createTextNode(""),new v(e).observe(c,{characterData:!0}),function(){c.data=u=!u}):y&&y.resolve?(f=y.resolve(kt),function(){f.then(e)}):function(){p.call(s,e)}),t.exports=x||function(t){var n={fn:t,next:kt};i&&(i.next=n),o||(o=n,a()),i=n}},function(t,n,r){var e=r(33);t.exports=e("navigator","userAgent")||""},function(t,n,r){var e=r(20),o=r(14),i=r(237);t.exports=function(t,n){if(e(t),o(n)&&n.constructor===t)return n;var r=i.f(t);return(0,r.resolve)(n),r.promise}},function(t,n,r){function FZ(t){var r,e;this.promise=new t(function(t,n){
    if(r!==kt||e!==kt)throw TypeError("Bad Promise constructor");r=t,e=n}),this.resolve=o(r),this.reject=o(e)}var o=r(58);t.exports.f=function(t){return new FZ(t)}},function(t,n,r){var e=r(3);t.exports=function(t,n){var r=e.console;r&&r.error&&(1===arguments.length?r.error(t):r.error(t,n))}},function(t,n){t.exports=function(t){try{return{error:!1,value:t()}}catch(n){return{error:!0,value:n}}}},function(t,n,r){var e=r(2),o=r(33),i=r(136),a=r(236);e({target:"Promise",proto:!0,real:!0},{"finally":function(n){var r=i(this,o("Promise")),t="function"==typeof n;return this.then(t?function(t){return a(r,n()).then(function(){return t})}:n,t?function(t){return a(r,n()).then(function(){throw t})}:n)}})},function(t,n,r){var e=r(2),o=r(33),i=r(58),a=r(20),u=r(6),c=o("Reflect","apply"),f=Function.apply;e({target:"Reflect",stat:!0,forced:!u(function(){c(function(){})})},{apply:function apply(t,n,r){return i(t),a(r),c?c(t,n,r):f.call(t,n,r)}})},function(t,n,r){var e=r(2),o=r(33),u=r(58),c=r(20),f=r(14),s=r(47),l=r(148),i=r(6),h=o("Reflect","construct"),p=i(function(){function F(){}return!(h(function(){},[],F)instanceof F)}),g=!i(function(){h(function(){})}),a=p||g;e({target:"Reflect",stat:!0,forced:a,sham:a},{construct:function construct(t,n){u(t),c(n);var r=arguments.length<3?t:u(arguments[2]);if(g&&!p)return h(t,n,r);if(t==r){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var e=[null];return e.push.apply(e,n),new(l.apply(t,e))}var o=r.prototype,i=s(f(o)?o:Object.prototype),a=Function.apply.call(t,i,n);return f(a)?a:i}})},function(t,n,r){var e=r(2),o=r(5),i=r(20),a=r(13),u=r(19);e({target:"Reflect",stat:!0,forced:r(6)(function(){Reflect.defineProperty(u.f({},1,{value:1}),1,{value:2})}),sham:!o},{defineProperty:function defineProperty(t,n,r){i(t);var e=a(n,!0);i(r);try{return u.f(t,e,r),!0}catch(o){return!1}}})},function(t,n,r){var e=r(2),o=r(20),i=r(4).f;e({target:"Reflect",stat:!0},{deleteProperty:function deleteProperty(t,n){var r=i(o(t),n);return!(r&&!r.configurable)&&delete t[n]}})},function(t,n,r){var e=r(2),i=r(14),a=r(20),u=r(15),c=r(4),f=r(107);e({target:"Reflect",stat:!0},{get:function get(t,n){var r,e,o=arguments.length<3?t:arguments[2];return a(t)===o?t[n]:(r=c.f(t,n))?u(r,"value")?r.value:r.get===kt?kt:r.get.call(o):i(e=f(t))?get(e,n,o):void 0}})},function(t,n,r){var e=r(2),o=r(5),i=r(20),a=r(4);e({target:"Reflect",stat:!0,sham:!o},{getOwnPropertyDescriptor:function getOwnPropertyDescriptor(t,n){return a.f(i(t),n)}})},function(t,n,r){var e=r(2),o=r(20),i=r(107);e({target:"Reflect",stat:!0,sham:!r(108)},{getPrototypeOf:function getPrototypeOf(t){return i(o(t))}})},function(t,n,r){r(2)({target:"Reflect",stat:!0},{has:function has(t,n){return n in t}})},function(t,n,r){var e=r(2),o=r(20),i=Object.isExtensible;e({target:"Reflect",stat:!0},{isExtensible:function isExtensible(t){return o(t),!i||i(t)}})},function(t,n,r){r(2)({target:"Reflect",stat:!0},{ownKeys:r(32)})},function(t,n,r){var e=r(2),o=r(33),i=r(20);e({target:"Reflect",stat:!0,sham:!r(155)},{preventExtensions:function preventExtensions(t){i(t);try{var n=o("Object","preventExtensions");return n&&n(t),!0}catch(r){return!1}}})},function(t,n,r){var e=r(2),u=r(20),c=r(14),f=r(15),s=r(19),l=r(4),h=r(107),p=r(8);e({target:"Reflect",stat:!0},{set:function set(t,n,r){var e,o,i=arguments.length<4?t:arguments[3],a=l.f(u(t),n);if(!a){if(c(o=h(t)))return set(o,n,r,i);a=p(0)}if(f(a,"value")){if(!1===a.writable||!c(i))return!1;if(e=l.f(i,n)){if(e.get||e.set||!1===e.writable)return!1;e.value=r,s.f(i,n,e)}else s.f(i,n,p(0,r));return!0}return a.set!==kt&&(a.set.call(i,r),!0)}})},function(t,n,r){var e=r(2),o=r(20),i=r(110),a=r(109);a&&e({target:"Reflect",stat:!0},{setPrototypeOf:function setPrototypeOf(t,n){o(t),i(n);try{return a(t,n),!0}catch(r){return!1}}})},function(t,n,r){var e=r(5),o=r(3),i=r(43),a=r(157),u=r(19).f,c=r(35).f,f=r(255),s=r(256),l=r(21),h=r(6),p=r(124),g=r(52)("match"),v=o.RegExp,d=v.prototype,y=/a/g,m=/a/g,b=new v(y)!==y;if(e&&i("RegExp",!b||h(function(){return m[g]=!1,v(y)!=y||v(m)==m||"/a/i"!=v(y,"i")}))){for(var x=function RegExp(t,n){var r=this instanceof x,e=f(t),o=n===kt;return!r&&e&&t.constructor===x&&o?t:a(b?new v(e&&!o?t.source:t,n):v((e=t instanceof x)?t.source:t,e&&o?s.call(t):n),r?this:d,x)},w=function(n){n in x||u(x,n,{configurable:!0,get:function(){return v[n]},set:function(t){v[n]=t}})},S=c(v),A=0;A<S.length;)w(S[A++]);(d.constructor=x).prototype=d,l(o,"RegExp",x)}p("RegExp")},function(t,n,r){var e=r(14),o=r(11),i=r(52)("match");t.exports=function(t){var n;return e(t)&&((n=t[i])!==kt?!!n:"RegExp"==o(t))}},function(t,n,r){var e=r(20);t.exports=function(){var t=e(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.dotAll&&(n+="s"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},function(t,n,r){var e=r(2),o=r(258);e({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},function(t,n,r){var e,o,a=r(256),u=RegExp.prototype.exec,c=String.prototype.replace,i=u,f=(o=/b*/g,u.call(e=/a/,"a"),u.call(o,"a"),0!==e.lastIndex||0!==o.lastIndex),s=/()??/.exec("")[1]!==kt;(f||s)&&(i=function exec(t){var n,r,e,o,i=this;return s&&(r=new RegExp("^"+i.source+"$(?!\\s)",a.call(i))),f&&(n=i.lastIndex),e=u.call(i,t),f&&e&&(i.lastIndex=i.global?e.index+e[0].length:n),s&&e&&1<e.length&&c.call(e[0],r,function(){for(o=1;o<arguments.length-2;o++)arguments[o]===kt&&(e[o]=kt)}),e}),t.exports=i},function(t,n,r){var e=r(5),o=r(19),i=r(256);e&&"g"!=/./g.flags&&o.f(RegExp.prototype,"flags",{configurable:!0,get:i})},function(t,n,r){var e=r(21),o=r(20),i=r(6),a=r(256),u="toString",c=RegExp.prototype,f=c[u];!i(function(){return"/a/b"!=f.call({source:"a",flags:"b"})})&&f.name==u||e(RegExp.prototype,u,function toString(){var t=o(this),n=String(t.source),r=t.flags;return"/"+n+"/"+String(r===kt&&t instanceof RegExp&&!("flags"in c)?a.call(t):r)},{unsafe:!0})},function(t,n,r){var e=r(153),o=r(158);t.exports=e("Set",function(t){return function Set(){return t(this,arguments.length?arguments[0]:kt)}},o)},function(t,n,r){var e=r(2),o=r(263).codeAt;e({target:"String",proto:!0},{codePointAt:function codePointAt(t){return o(this,t)}})},function(t,n,r){function $2(u){return function(t,n){var r,e,o=String(f(t)),i=c(n),a=o.length;return i<0||a<=i?u?"":kt:(r=o.charCodeAt(i))<55296||56319<r||i+1===a||(e=o.charCodeAt(i+1))<56320||57343<e?u?o.charAt(i):r:u?o.slice(i,i+2):e-56320+(r-55296<<10)+65536}}var c=r(39),f=r(12);t.exports={codeAt:$2(!1),charAt:$2(!0)}},function(t,n,r){var e=r(2),a=r(38),u=r(265),c=r(12),o=r(266),f="".endsWith,s=Math.min;e({target:"String",proto:!0,forced:!o("endsWith")},{endsWith:function endsWith(t){var n=String(c(this));u(t);var r=1<arguments.length?arguments[1]:kt,e=a(n.length),o=r===kt?e:s(a(r),e),i=String(t);return f?f.call(n,i,o):n.slice(o-i.length,o)===i}})},function(t,n,r){var e=r(255);t.exports=function(t){if(e(t))throw TypeError("The method doesn't accept regular expressions");return t}},function(t,n,r){var o=r(52)("match");t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(r){try{return n[o]=!1,"/./"[t](n)}catch(e){}}return!1}},function(t,n,r){var e=r(2),i=r(40),a=String.fromCharCode,o=String.fromCodePoint;e({target:"String",stat:!0,forced:!!o&&1!=o.length},{fromCodePoint:function fromCodePoint(t){for(var n,r=[],e=arguments.length,o=0;o<e;){if(n=+arguments[o++],i(n,1114111)!==n)throw RangeError(n+" is not a valid code point");r.push(n<65536?a(n):a(55296+((n-=65536)>>10),n%1024+56320))}return r.join("")}})},function(t,n,r){var e=r(2),o=r(265),i=r(12);e({target:"String",proto:!0,forced:!r(266)("includes")},{includes:function includes(t){return!!~String(i(this)).indexOf(o(t),1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var o=r(263).charAt,e=r(26),i=r(104),a="String Iterator",u=e.set,c=e.getterFor(a);i(String,"String",function(t){u(this,{type:a,string:String(t),index:0})},function next(){var t,n=c(this),r=n.string,e=n.index;return r.length<=e?{value:kt,done:!0}:(t=o(r,e),n.index+=t.length,{value:t,done:!1})})},function(t,n,r){var e=r(271),l=r(20),h=r(38),o=r(12),p=r(272),g=r(273);e("match",1,function(e,f,s){return[function match(t){var n=o(this),r=t==kt?kt:t[e];return r!==kt?r.call(t,n):new RegExp(t)[e](String(n))},function(t){var n=s(f,t,this);if(n.done)return n.value;var r=l(t),e=String(this);if(!r.global)return g(r,e);for(var o,i=r.unicode,a=[],u=r.lastIndex=0;null!==(o=g(r,e));){var c=String(o[0]);""===(a[u]=c)&&(r.lastIndex=p(e,h(r.lastIndex),i)),u++}return 0===u?null:a}]})},function(t,n,r){var s=r(18),l=r(21),h=r(6),p=r(52),g=r(258),v=p("species"),d=!h(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),y=!h(function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var r="ab".split(t);return 2!==r.length||"a"!==r[0]||"b"!==r[1]});t.exports=function(r,t,n,e){var o=p(r),i=!h(function(){var t={};return t[o]=function(){return 7},7!=""[r](t)}),a=i&&!h(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===r&&(n.constructor={},n.constructor[v]=function(){return n}),n[o](""),!t});if(!i||!a||"replace"===r&&!d||"split"===r&&!y){var u=/./[o],c=n(o,""[r],function(t,n,r,e,o){return n.exec===g?i&&!o?{done:!0,value:u.call(n,r,e)}:{done:!0,value:t.call(r,n,e)}:{done:!1}}),f=c[1];l(String.prototype,r,c[0]),l(RegExp.prototype,o,2==t?function(t,n){return f.call(t,this,n)}:function(t){return f.call(t,this)}),e&&s(RegExp.prototype[o],"sham",!0)}}},function(t,n,r){var e=r(263).charAt;t.exports=function(t,n,r){return n+(r?e(t,n).length:1)}},function(t,n,r){var o=r(11),i=r(258);t.exports=function(t,n){var r=t.exec;if("function"==typeof r){var e=r.call(t,n);if("object"!=typeof e)throw TypeError("RegExp exec method returned something other than an Object or null");return e}if("RegExp"!==o(t))throw TypeError("RegExp#exec called on incompatible receiver");return i.call(t,n)}},function(t,n,r){function q6(t){var n,r,e,o,i,a,u=s(this),c=String(t);return n=p(u,RegExp),(r=u.flags)===kt&&u instanceof RegExp&&!("flags"in S)&&(r=l.call(u)),e=r===kt?"":String(r),o=new n(n===RegExp?u.source:u,e),i=!!~e.indexOf("g"),a=!!~e.indexOf("u"),o.lastIndex=f(u.lastIndex),new E(o,c,i,a)}var e=r(2),o=r(105),i=r(12),f=r(38),a=r(58),s=r(20),u=r(98),l=r(256),c=r(18),h=r(52),p=r(136),g=r(272),v=r(26),d=r(24),y=h("matchAll"),m="RegExp String",b=m+" Iterator",x=v.set,w=v.getterFor(b),S=RegExp.prototype,A=S.exec,E=o(function RegExpStringIterator(t,n,r,e){x(this,{type:b,regexp:t,string:n,global:r,unicode:e,done:!1})},m,function next(){var t=w(this);if(t.done)return{value:kt,done:!0};var n=t.regexp,r=t.string,e=function(t,n){var r,e=t.exec;if("function"!=typeof e)return A.call(t,n);if("object"!=typeof(r=e.call(t,n)))throw TypeError("Incorrect exec result");return r}(n,r);return null===e?{value:kt,done:t.done=!0}:t.global?(""==String(e[0])&&(n.lastIndex=g(r,f(n.lastIndex),t.unicode)),{value:e,done:!1}):{value:e,done:!(t.done=!0)}});e({target:"String",proto:!0},{matchAll:function matchAll(t){var n,r,e,o=i(this);return null!=t&&((r=t[y])===kt&&d&&"RegExp"==u(t)&&(r=q6),null!=r)?a(r).call(t,o):(n=String(o),e=new RegExp(t,"g"),d?q6.call(e,n):e[y](n))}}),d||y in S||c(S,y,q6)},function(t,n,r){var e=r(2),o=r(141).end;e({target:"String",proto:!0,forced:r(276)},{padEnd:function padEnd(t){return o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(235);t.exports=/Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(e)},function(t,n,r){var e=r(2),o=r(141).start;e({target:"String",proto:!0,forced:r(276)},{padStart:function padStart(t){return o(this,t,1<arguments.length?arguments[1]:kt)}})},function(t,n,r){var e=r(2),a=r(9),u=r(38);e({target:"String",stat:!0},{raw:function raw(t){for(var n=a(t.raw),r=u(n.length),e=arguments.length,o=[],i=0;i<r;)o.push(String(n[i++])),i<e&&o.push(String(arguments[i]));return o.join("")}})},function(t,n,r){r(2)({target:"String",proto:!0},{repeat:r(142)})},function(t,n,r){var e=r(271),A=r(20),h=r(46),E=r(38),O=r(39),i=r(12),I=r(272),M=r(273),P=Math.max,R=Math.min,p=Math.floor,g=/\$([$&'`]|\d\d?|<[^>]*>)/g,v=/\$([$&'`]|\d\d?)/g;e("replace",2,function(o,w,S){return[function replace(t,n){var r=i(this),e=t==kt?kt:t[o];return e!==kt?e.call(t,r,n):w.call(String(r),t,n)},function(t,n){var r=S(w,t,this,n);if(r.done)return r.value;var e=A(t),o=String(this),i="function"==typeof n;i||(n=String(n));var a=e.global;if(a){var u=e.unicode;e.lastIndex=0}for(var c=[];;){var f=M(e,o);if(null===f)break;if(c.push(f),!a)break;""===String(f[0])&&(e.lastIndex=I(o,E(e.lastIndex),u))}for(var s,l="",h=0,p=0;p<c.length;p++){f=c[p];for(var g=String(f[0]),v=P(R(O(f.index),o.length),0),d=[],y=1;y<f.length;y++)d.push((s=f[y])===kt?s:String(s));var m=f.groups;if(i){var b=[g].concat(d,v,o);m!==kt&&b.push(m);var x=String(n.apply(kt,b))}else x=getSubstitution(g,o,v,d,m,n);h<=v&&(l+=o.slice(h,v)+x,h=v+g.length)}return l+o.slice(h)}];function getSubstitution(i,a,u,c,f,t){var s=u+i.length,l=c.length,n=v;return f!==kt&&(f=h(f),n=g),w.call(t,n,function(t,n){var r;switch(n.charAt(0)){case"$":return"$";case"&":return i;case"`":return a.slice(0,u);case"'":return a.slice(s);case"<":r=f[n.slice(1,-1)];break;default:var e=+n;if(0==e)return t;if(l<e){var o=p(e/10);return 0===o?t:o<=l?c[o-1]===kt?n.charAt(1):c[o-1]+n.charAt(1):t}r=c[e-1]}return r===kt?"":r})}})},function(t,n,r){var e=r(271),c=r(20),o=r(12),f=r(217),s=r(273);e("search",1,function(e,a,u){return[function search(t){var n=o(this),r=t==kt?kt:t[e];return r!==kt?r.call(t,n):new RegExp(t)[e](String(n))},function(t){var n=u(a,t,this);if(n.done)return n.value;var r=c(t),e=String(this),o=r.lastIndex;f(o,0)||(r.lastIndex=0);var i=s(r,e);return f(r.lastIndex,o)||(r.lastIndex=o),null===i?-1:i.index}]})},function(t,n,r){var e=r(271),s=r(255),m=r(20),l=r(12),b=r(136),x=r(272),w=r(38),S=r(273),h=r(258),o=r(6),p=[].push,A=Math.min,E=4294967295,O=!o(function(){return!RegExp(E,"y")});e("split",2,function(o,v,d){var y;return y="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||1<".".split(/()()/).length||"".split(/.?/).length?function(t,n){var r=String(l(this)),e=n===kt?E:n>>>0;if(0==e)return[];if(t===kt)return[r];if(!s(t))return v.call(r,t,e);for(var o,i,a,u=[],c=0,f=new RegExp(t.source,(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":"")+"g");(o=h.call(f,r))&&!(c<(i=f.lastIndex)&&(u.push(r.slice(c,o.index)),1<o.length&&o.index<r.length&&p.apply(u,o.slice(1)),a=o[0].length,c=i,e<=u.length));)f.lastIndex===o.index&&f.lastIndex++;return c===r.length?!a&&f.test("")||u.push(""):u.push(r.slice(c)),e<u.length?u.slice(0,e):u}:"0".split(kt,0).length?function(t,n){return t===kt&&0===n?[]:v.call(this,t,n)}:v,[function split(t,n){var r=l(this),e=t==kt?kt:t[o];return e!==kt?e.call(t,r,n):y.call(String(r),t,n)},function(t,n){var r=d(y,t,this,n,y!==v);if(r.done)return r.value;var e=m(t),o=String(this),i=b(e,RegExp),a=e.unicode,u=new i(O?e:"^(?:"+e.source+")",(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(O?"y":"g")),c=n===kt?E:n>>>0;if(0==c)return[];if(0===o.length)return null===S(u,o)?[o]:[];for(var f=0,s=0,l=[];s<o.length;){u.lastIndex=O?s:0;var h,p=S(u,O?o:o.slice(s));if(null===p||(h=A(w(u.lastIndex+(O?0:s)),o.length))===f)s=x(o,s,a);else{if(l.push(o.slice(f,s)),l.length===c)return l;for(var g=1;g<=p.length-1;g++)if(l.push(p[g]),l.length===c)return l;s=f=h}}return l.push(o.slice(f)),l}]},!O)},function(t,n,r){var e=r(2),o=r(38),i=r(265),a=r(12),u=r(266),c="".startsWith,f=Math.min;e({target:"String",proto:!0,forced:!u("startsWith")},{startsWith:function startsWith(t){var n=String(a(this));i(t);var r=o(f(1<arguments.length?arguments[1]:kt,n.length)),e=String(t);return c?c.call(n,e,r):n.slice(r,r+e.length)===e}})},function(t,n,r){var e=r(2),o=r(182).trim;e({target:"String",proto:!0,forced:r(285)("trim")},{trim:function trim(){return o(this)}})},function(t,n,r){var e=r(6),o=r(183);t.exports=function(t){return e(function(){return!!o[t]()||"​᠎"!="​᠎"[t]()||o[t].name!==t})}},function(t,n,r){var e=r(2),o=r(182).end,i=r(285)("trimEnd"),a=i?function a(){return o(this)}:"".trimEnd;e({target:"String",proto:!0,forced:i},{trimEnd:a,trimRight:a})},function(t,n,r){var e=r(2),o=r(182).start,i=r(285)("trimStart"),a=i?function a(){return o(this)}:"".trimStart;e({target:"String",proto:!0,forced:i},{trimStart:a,trimLeft:a})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("anchor")},{anchor:function anchor(t){return o(this,"a","name",t)}})},function(t,n,r){var a=r(12),u=/"/g;t.exports=function(t,n,r,e){var o=String(a(t)),i="<"+n;return""!==r&&(i+=" "+r+'="'+String(e).replace(u,"&quot;")+'"'),i+">"+o+"</"+n+">"}},function(t,n,r){var e=r(6);t.exports=function(n){return e(function(){var t=""[n]('"');return t!==t.toLowerCase()||3<t.split('"').length})}},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("big")},{big:function big(){return o(this,"big","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("blink")},{blink:function blink(){return o(this,"blink","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("bold")},{bold:function bold(){return o(this,"b","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("fixed")},{fixed:function fixed(){return o(this,"tt","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("fontcolor")},{fontcolor:function fontcolor(t){return o(this,"font","color",t)}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("fontsize")},{fontsize:function fontsize(t){return o(this,"font","size",t)}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("italics")},{italics:function italics(){return o(this,"i","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("link")},{link:function link(t){return o(this,"a","href",t)}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("small")},{small:function small(){return o(this,"small","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("strike")},{strike:function strike(){return o(this,"strike","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("sub")},{sub:function sub(){return o(this,"sub","","")}})},function(t,n,r){var e=r(2),o=r(289);e({target:"String",proto:!0,forced:r(290)("sup")},{sup:function sup(){return o(this,"sup","","")}})},function(t,n,r){r(304)("Float32",4,function(e){return function Float32Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){function Cda(t,n){for(var r=0,e=n.length,o=new(C(t))(e);r<e;)o[r]=n[r++];return o}function Dda(t,n){_(t,n,{get:function(){return P(this)[n]}})}function Eda(t){var n;return t instanceof F||"ArrayBuffer"==(n=l(t))||"SharedArrayBuffer"==n}function Fda(t,n){return K(t)&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)}function Gda(t,n){return Fda(t,n=u(n,!0))?a(2,t[n]):j(t,n)}function Hda(t,n,r){return!(Fda(t,n=u(n,!0))&&b(r)&&s(r,"value"))||s(r,"get")||s(r,"set")||r.configurable||s(r,"writable")&&!r.writable||s(r,"enumerable")&&!r.enumerable?_(t,n,r):(t[n]=r.value,t)}var c=r(2),f=r(3),e=r(5),p=r(305),o=r(130),i=r(129),g=r(132),a=r(8),v=r(18),d=r(38),y=r(133),m=r(306),u=r(13),s=r(15),l=r(98),b=r(14),x=r(47),w=r(109),S=r(35).f,A=r(307),E=r(56).forEach,O=r(124),h=r(19),I=r(4),M=r(26),P=M.get,R=M.set,_=h.f,j=I.f,k=Math.round,T=f.RangeError,F=i.ArrayBuffer,L=i.DataView,U=o.NATIVE_ARRAY_BUFFER_VIEWS,N=o.TYPED_ARRAY_TAG,W=o.TypedArray,D=o.TypedArrayPrototype,C=o.aTypedArrayConstructor,K=o.isTypedArray,B="BYTES_PER_ELEMENT",q="Wrong length";t.exports=e?(U||(I.f=Gda,h.f=Hda,Dda(D,"buffer"),Dda(D,"byteOffset"),Dda(D,"byteLength"),Dda(D,"length")),c({target:"Object",stat:!0,forced:!U},{getOwnPropertyDescriptor:Gda,defineProperty:Hda}),function(t,s,n,o){function jea(t,n){_(t,n,{get:function(){return function(t,n){var r=P(t);return r.view[e](n*s+r.byteOffset,!0)}(this,n)},set:function(t){return function(t,n,r){var e=P(t);o&&(r=(r=k(r))<0?0:255<r?255:255&r),e.view[i](n*s+e.byteOffset,r,!0)}(this,n,t)},enumerable:!0})}var l=t+(o?"Clamped":"")+"Array",e="get"+t,i="set"+t,a=f[l],h=a,r=h&&h.prototype,u={};U?p&&(h=n(function(t,n,r,e){return g(t,h,l),b(n)?Eda(n)?e!==kt?new a(n,m(r,s),e):r!==kt?new a(n,m(r,s)):new a(n):K(n)?Cda(h,n):A.call(h,n):new a(y(n))}),w&&w(h,W),E(S(a),function(t){t in h||v(h,t,a[t])}),h.prototype=r):(h=n(function(t,n,r,e){g(t,h,l);var o,i,a,u=0,c=0;if(b(n)){if(!Eda(n))return K(n)?Cda(h,n):A.call(h,n);o=n,c=m(r,s);var f=n.byteLength;if(e===kt){if(f%s)throw T(q);if((i=f-c)<0)throw T(q)}else if(f<(i=d(e)*s)+c)throw T(q);a=i/s}else a=y(n),o=new F(i=a*s);for(R(t,{buffer:o,byteOffset:c,byteLength:i,length:a,view:new L(o)});u<a;)jea(t,u++)}),w&&w(h,W),r=h.prototype=x(D)),r.constructor!==h&&v(r,"constructor",h),N&&v(r,N,l),c({global:!0,forced:(u[l]=h)!=a,sham:!U},u),B in h||v(h,B,s),B in r||v(r,B,s),O(l)}):function(){}},function(t,n,r){var e=r(3),o=r(6),i=r(99),a=r(130).NATIVE_ARRAY_BUFFER_VIEWS,u=e.ArrayBuffer,c=e.Int8Array;t.exports=!a||!o(function(){c(1)})||!o(function(){new c(-1)})||!i(function(t){new c,new c(null),new c(1.5),new c(t)},!0)||o(function(){return 1!==new c(new u(2),1,kt).length})},function(t,n,r){var e=r(39);t.exports=function(t,n){var r=e(t);if(r<0||r%n)throw RangeError("Wrong offset");return r}},function(t,n,r){var l=r(46),h=r(38),p=r(97),g=r(95),v=r(57),d=r(130).aTypedArrayConstructor;t.exports=function from(t){var n,r,e,o,i,a=l(t),u=arguments.length,c=1<u?arguments[1]:kt,f=c!==kt,s=p(a);if(s!=kt&&!g(s))for(i=s.call(a),a=[];!(o=i.next()).done;)a.push(o.value);for(f&&2<u&&(c=v(c,arguments[2],2)),r=h(a.length),e=new(d(this))(r),n=0;n<r;n++)e[n]=f?c(a[n],n):a[n];return e}},function(t,n,r){r(304)("Float64",8,function(e){return function Float64Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){r(304)("Int8",1,function(e){return function Int8Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){r(304)("Int16",2,function(e){return function Int16Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){r(304)("Int32",4,function(e){return function Int32Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){r(304)("Uint8",1,function(e){return function Uint8Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){r(304)("Uint8",1,function(e){return function Uint8ClampedArray(t,n,r){return e(this,t,n,r)}},!0)},function(t,n,r){r(304)("Uint16",2,function(e){return function Uint16Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){r(304)("Uint32",4,function(e){return function Uint32Array(t,n,r){return e(this,t,n,r)}})},function(t,n,r){var e=r(130),o=r(78),i=e.aTypedArray;e.exportProto("copyWithin",function copyWithin(t,n){return o.call(i(this),t,n,2<arguments.length?arguments[2]:kt)})},function(t,n,r){var e=r(130),o=r(56).every,i=e.aTypedArray;e.exportProto("every",function every(t){return o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=r(83),i=e.aTypedArray;e.exportProto("fill",function fill(t){return o.apply(i(this),arguments)})},function(t,n,r){var e=r(130),a=r(56).filter,u=r(136),c=e.aTypedArray,f=e.aTypedArrayConstructor;e.exportProto("filter",function filter(t){for(var n=a(c(this),t,1<arguments.length?arguments[1]:kt),r=u(this,this.constructor),e=0,o=n.length,i=new(f(r))(o);e<o;)i[e]=n[e++];return i})},function(t,n,r){var e=r(130),o=r(56).find,i=e.aTypedArray;e.exportProto("find",function find(t){return o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=r(56).findIndex,i=e.aTypedArray;e.exportProto("findIndex",function findIndex(t){return o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=r(56).forEach,i=e.aTypedArray;e.exportProto("forEach",function forEach(t){o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(305),o=r(130),i=r(307);o.exportStatic("from",i,e)},function(t,n,r){var e=r(130),o=r(37).includes,i=e.aTypedArray;e.exportProto("includes",function includes(t){return o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=r(37).indexOf,i=e.aTypedArray;e.exportProto("indexOf",function indexOf(t){return o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){function nia(){return c.call(l(this))}var e=r(3),o=r(130),i=r(103),a=r(52)("iterator"),u=e.Uint8Array,c=i.values,f=i.keys,s=i.entries,l=o.aTypedArray,h=o.exportProto,p=u&&u.prototype[a],g=!!p&&("values"==p.name||p.name==kt);h("entries",function entries(){return s.call(l(this))}),h("keys",function keys(){return f.call(l(this))}),h("values",nia,!g),h(a,nia,!g)},function(t,n,r){var e=r(130),o=e.aTypedArray,i=[].join;e.exportProto("join",function join(t){return i.apply(o(this),arguments)})},function(t,n,r){var e=r(130),o=r(113),i=e.aTypedArray;e.exportProto("lastIndexOf",function lastIndexOf(t){return o.apply(i(this),arguments)})},function(t,n,r){var e=r(130),o=r(56).map,i=r(136),a=e.aTypedArray,u=e.aTypedArrayConstructor;e.exportProto("map",function map(t){return o(a(this),t,1<arguments.length?arguments[1]:kt,function(t,n){return new(u(i(t,t.constructor)))(n)})})},function(t,n,r){var e=r(130),o=r(305),i=e.aTypedArrayConstructor;e.exportStatic("of",function of(){for(var t=0,n=arguments.length,r=new(i(this))(n);t<n;)r[t]=arguments[t++];return r},o)},function(t,n,r){var e=r(130),o=r(117).left,i=e.aTypedArray;e.exportProto("reduce",function reduce(t){return o(i(this),t,arguments.length,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=r(117).right,i=e.aTypedArray;e.exportProto("reduceRight",function reduceRight(t){return o(i(this),t,arguments.length,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=e.aTypedArray,i=Math.floor;e.exportProto("reverse",function reverse(){for(var t,n=o(this).length,r=i(n/2),e=0;e<r;)t=this[e],this[e++]=this[--n],this[n]=t;return this})},function(t,n,r){var e=r(130),a=r(38),u=r(306),c=r(46),o=r(6),f=e.aTypedArray,i=o(function(){new Int8Array(1).set({})});e.exportProto("set",function set(t){f(this);var n=u(1<arguments.length?arguments[1]:kt,1),r=this.length,e=c(t),o=a(e.length),i=0;if(r<o+n)throw RangeError("Wrong length");for(;i<o;)this[n+i]=e[i++]},i)},function(t,n,r){var e=r(130),u=r(136),o=r(6),c=e.aTypedArray,f=e.aTypedArrayConstructor,s=[].slice,i=o(function(){new Int8Array(1).slice()});e.exportProto("slice",function slice(t,n){for(var r=s.call(c(this),t,n),e=u(this,this.constructor),o=0,i=r.length,a=new(f(e))(i);o<i;)a[o]=r[o++];return a},i)},function(t,n,r){var e=r(130),o=r(56).some,i=e.aTypedArray;e.exportProto("some",function some(t){return o(i(this),t,1<arguments.length?arguments[1]:kt)})},function(t,n,r){var e=r(130),o=e.aTypedArray,i=[].sort;e.exportProto("sort",function sort(t){return i.call(o(this),t)})},function(t,n,r){var e=r(130),i=r(38),a=r(40),u=r(136),c=e.aTypedArray;e.exportProto("subarray",function subarray(t,n){var r=c(this),e=r.length,o=a(t,e);return new(u(r,r.constructor))(r.buffer,r.byteOffset+o*r.BYTES_PER_ELEMENT,i((n===kt?e:a(n,e))-o))})},function(t,n,r){var e=r(3),o=r(130),i=r(6),a=e.Int8Array,u=o.aTypedArray,c=[].toLocaleString,f=[].slice,s=!!a&&i(function(){c.call(new a(1))}),l=i(function(){return[1,2].toLocaleString()!=new a([1,2]).toLocaleString()})||!i(function(){a.prototype.toLocaleString.call([1,2])});o.exportProto("toLocaleString",function toLocaleString(){return c.apply(s?f.call(u(this)):u(this),arguments)},l)},function(t,n,r){var e=r(3),o=r(130),i=r(6),a=e.Uint8Array,u=a&&a.prototype,c=[].toString,f=[].join;i(function(){c.call({})})&&(c=function toString(){return f.call(this)}),o.exportProto("toString",c,(u||{}).toString!=c)},function(t,n,r){function hla(t){return function WeakMap(){return t(this,arguments.length?arguments[0]:kt)}}var e,o=r(3),i=r(131),a=r(154),u=r(153),c=r(342),f=r(14),s=r(26).enforce,l=r(27),h=!o.ActiveXObject&&"ActiveXObject"in o,p=Object.isExtensible,g=t.exports=u("WeakMap",hla,c,!0,!0);if(l&&h){e=c.getConstructor(hla,"WeakMap",!0),a.REQUIRED=!0;var v=g.prototype,d=v["delete"],y=v.has,m=v.get,b=v.set;i(v,{"delete":function(t){if(!f(t)||p(t))return d.call(this,t);var n=s(this);return n.frozen||(n.frozen=new e),d.call(this,t)||n.frozen["delete"](t)},has:function has(t){if(!f(t)||p(t))return y.call(this,t);var n=s(this);return n.frozen||(n.frozen=new e),y.call(this,t)||n.frozen.has(t)},get:function get(t){if(!f(t)||p(t))return m.call(this,t);var n=s(this);return n.frozen||(n.frozen=new e),y.call(this,t)?m.call(this,t):n.frozen.get(t)},set:function set(t,n){if(f(t)&&!p(t)){var r=s(this);r.frozen||(r.frozen=new e),y.call(this,t)?b.call(this,t,n):r.frozen.set(t,n)}else b.call(this,t,n);return this}})}},function(t,n,r){function Pla(t){return t.frozen||(t.frozen=new y)}function Rla(t,n){return i(t.entries,function(t){return t[0]===n})}var u=r(131),c=r(154).getWeakData,f=r(20),s=r(14),l=r(132),h=r(156),e=r(56),p=r(15),o=r(26),g=o.set,v=o.getterFor,i=e.find,a=e.findIndex,d=0,y=function(){this.entries=[]};y.prototype={get:function(t){var n=Rla(this,t);if(n)return n[1]},has:function(t){return!!Rla(this,t)},set:function(t,n){var r=Rla(this,t);r?r[1]=n:this.entries.push([t,n])},"delete":function(n){var t=a(this.entries,function(t){return t[0]===n});return~t&&this.entries.splice(t,1),!!~t}},t.exports={getConstructor:function(t,r,e,o){function jma(t,n,r){var e=a(t),o=c(f(n),!0);return!0===o?Pla(e).set(n,r):o[e.id]=r,t}var i=t(function(t,n){l(t,i,r),g(t,{type:r,id:d++,frozen:kt}),n!=kt&&h(n,t[o],t,e)}),a=v(r);return u(i.prototype,{"delete":function(t){var n=a(this);if(!s(t))return!1;var r=c(t);return!0===r?Pla(n)["delete"](t):r&&p(r,n.id)&&delete r[n.id]},has:function has(t){var n=a(this);if(!s(t))return!1;var r=c(t);return!0===r?Pla(n).has(t):r&&p(r,n.id)}}),u(i.prototype,e?{get:function get(t){var n=a(this);if(s(t)){var r=c(t);return!0===r?Pla(n).get(t):r?r[n.id]:kt}},set:function set(t,n){return jma(this,t,n)}}:{add:function add(t){return jma(this,t,!0)}}),i}}},function(t,n,r){r(153)("WeakSet",function(t){return function WeakSet(){return t(this,arguments.length?arguments[0]:kt)}},r(342),!1,!0)},function(t,n,r){var e=r(2),o=r(107),i=r(109),a=r(47),u=r(8),c=r(156),f=r(18),s=function AggregateError(t,n){var r=this;if(!(r instanceof s))return new s(t,n);i&&(r=i(new Error(n),o(r)));var e=[];return c(t,e.push,e),r.errors=e,n!==kt&&f(r,"message",String(n)),r};s.prototype=a(Error.prototype,{constructor:u(5,s),name:u(5,"AggregateError")}),e({global:!0},{AggregateError:s})},function(t,n,r){var e=r(5),o=r(79),i=r(46),a=r(38),u=r(19).f;!e||"lastIndex"in[]||(u(Array.prototype,"lastIndex",{configurable:!0,get:function lastIndex(){var t=i(this),n=a(t.length);return 0==n?0:n-1}}),o("lastIndex"))},function(t,n,r){var e=r(5),o=r(79),i=r(46),a=r(38),u=r(19).f;!e||"lastItem"in[]||(u(Array.prototype,"lastItem",{configurable:!0,get:function lastItem(){var t=i(this),n=a(t.length);return 0==n?kt:t[n-1]},set:function lastItem(t){var n=i(this),r=a(n.length);return n[0==r?0:r-1]=t}}),o("lastItem"))},function(t,n,r){function Ana(){var t=i("Object","freeze");return t?t(a(null)):a(null)}var e=r(2),o=r(348),i=r(33),a=r(47);e({global:!0},{compositeKey:function compositeKey(){return o.apply(Object,arguments).get("object",Ana)}})},function(t,n,r){function Jna(){this.object=null,this.symbol=null,this.primitives=null,this.objectsByIndex=e(null)}var i=r(152),a=r(341),e=r(47),o=r(14);Jna.prototype.get=function(t,n){return this[t]||(this[t]=n())},Jna.prototype.next=function(t,n,r){var e=r?this.objectsByIndex[t]||(this.objectsByIndex[t]=new a):this.primitives||(this.primitives=new i),o=e.get(n);return o||e.set(n,o=new Jna),o};var u=new Jna;t.exports=function(){var t,n,r=u,e=arguments.length;for(t=0;t<e;t++)o(n=arguments[t])&&(r=r.next(t,n,!0));if(this===Object&&r===u)throw TypeError("Composite keys must contain a non-primitive component");for(t=0;t<e;t++)o(n=arguments[t])||(r=r.next(t,n,!1));return r}},function(t,n
    ,r){var e=r(2),o=r(348),i=r(33);e({global:!0},{compositeSymbol:function compositeSymbol(){return 1===arguments.length&&"string"==typeof arguments[0]?i("Symbol")["for"](arguments[0]):o.apply(null,arguments).get("symbol",i("Symbol"))}})},function(t,n,r){r(2)({global:!0},{globalThis:r(3)})},function(t,n,r){var e=r(2),o=r(24),i=r(352);e({target:"Map",proto:!0,real:!0,forced:o},{deleteAll:function deleteAll(){return i.apply(this,arguments)}})},function(t,n,r){var i=r(20),a=r(58);t.exports=function(){for(var t=i(this),n=a(t["delete"]),r=!0,e=0,o=arguments.length;e<o;e++)r=r&&n.call(t,arguments[e]);return!!r}},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(354),c=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{every:function every(t){var r=i(this),n=u(r),e=a(t,1<arguments.length?arguments[1]:kt,3);return!c(n,function(t,n){if(!e(n,t,r))return c.stop()},kt,!0,!0).stopped}})},function(t,n,r){var e=r(24),o=r(355);t.exports=e?o:function(t){return Map.prototype.entries.call(t)}},function(t,n,r){var e=r(20),o=r(97);t.exports=function(t){var n=o(t);if("function"!=typeof n)throw TypeError(String(t)+" is not iterable");return e(n.call(t))}},function(t,n,r){var e=r(2),o=r(24),a=r(33),u=r(20),c=r(58),f=r(57),s=r(136),l=r(354),h=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{filter:function filter(t){var r=u(this),n=l(r),e=f(t,1<arguments.length?arguments[1]:kt,3),o=new(s(r,a("Map"))),i=c(o.set);return h(n,function(t,n){e(n,t,r)&&i.call(o,t,n)},kt,!0,!0),o}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(354),c=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{find:function find(t){var r=i(this),n=u(r),e=a(t,1<arguments.length?arguments[1]:kt,3);return c(n,function(t,n){if(e(n,t,r))return c.stop(n)},kt,!0,!0).result}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(354),c=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{findKey:function findKey(t){var r=i(this),n=u(r),e=a(t,1<arguments.length?arguments[1]:kt,3);return c(n,function(t,n){if(e(n,t,r))return c.stop(t)},kt,!0,!0).result}})},function(t,n,r){r(2)({target:"Map",stat:!0},{from:r(360)})},function(t,n,r){var u=r(58),c=r(57),f=r(156);t.exports=function from(t){var n,r,e,o,i=arguments.length,a=1<i?arguments[1]:kt;return u(this),(n=a!==kt)&&u(a),t==kt?new this:(r=[],n?(e=0,o=c(a,2<i?arguments[2]:kt,2),f(t,function(t){r.push(o(t,e++))})):f(t,r.push,r),new this(r))}},function(t,n,r){var e=r(2),u=r(156),c=r(58);e({target:"Map",stat:!0},{groupBy:function groupBy(t,r){var e=new this;c(r);var o=c(e.has),i=c(e.get),a=c(e.set);return u(t,function(t){var n=r(t);o.call(e,n)?i.call(e,n).push(t):a.call(e,n,[t])}),e}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(354),u=r(363),c=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{includes:function includes(r){return c(a(i(this)),function(t,n){if(u(n,r))return c.stop()},kt,!0,!0).stopped}})},function(t,n){t.exports=function(t,n){return t===n||t!=t&&n!=n}},function(t,n,r){var e=r(2),o=r(156),i=r(58);e({target:"Map",stat:!0},{keyBy:function keyBy(t,n){var r=new this;i(n);var e=i(r.set);return o(t,function(t){e.call(r,n(t),t)}),r}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(354),u=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{keyOf:function keyOf(r){return u(a(i(this)),function(t,n){if(n===r)return u.stop(t)},kt,!0,!0).result}})},function(t,n,r){var e=r(2),o=r(24),a=r(33),u=r(20),c=r(58),f=r(57),s=r(136),l=r(354),h=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{mapKeys:function mapKeys(t){var r=u(this),n=l(r),e=f(t,1<arguments.length?arguments[1]:kt,3),o=new(s(r,a("Map"))),i=c(o.set);return h(n,function(t,n){i.call(o,e(n,t,r),n)},kt,!0,!0),o}})},function(t,n,r){var e=r(2),o=r(24),a=r(33),u=r(20),c=r(58),f=r(57),s=r(136),l=r(354),h=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{mapValues:function mapValues(t){var r=u(this),n=l(r),e=f(t,1<arguments.length?arguments[1]:kt,3),o=new(s(r,a("Map"))),i=c(o.set);return h(n,function(t,n){i.call(o,t,e(n,t,r))},kt,!0,!0),o}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(58),u=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{merge:function merge(t){for(var n=i(this),r=a(n.set),e=0;e<arguments.length;)u(arguments[e++],r,n,!0);return n}})},function(t,n,r){r(2)({target:"Map",stat:!0},{of:r(370)})},function(t,n,r){t.exports=function of(){for(var t=arguments.length,n=new Array(t);t--;)n[t]=arguments[t];return new this(n)}},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(58),u=r(354),c=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{reduce:function reduce(r){var e,t,o=i(this),n=u(o);if(a(r),1<arguments.length)e=arguments[1];else{if((t=n.next()).done)throw TypeError("Reduce of empty map with no initial value");e=t.value[1]}return c(n,function(t,n){e=r(e,n,t,o)},kt,!0,!0),e}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(354),c=r(156);e({target:"Map",proto:!0,real:!0,forced:o},{some:function some(t){var r=i(this),n=u(r),e=a(t,1<arguments.length?arguments[1]:kt,3);return c(n,function(t,n){if(e(n,t,r))return c.stop()},kt,!0,!0).stopped}})},function(t,n,r){var e=r(2),o=r(24),a=r(20),u=r(58);e({target:"Map",proto:!0,real:!0,forced:o},{update:function update(t,n){var r=a(this),e=arguments.length;u(n);var o=r.has(t);if(!o&&e<3)throw TypeError("Updating absent value");var i=o?r.get(t):u(2<e?arguments[2]:kt)(t,r);return r.set(t,n(i,t,r)),r}})},function(t,n,r){var e=r(2),o=Math.min,i=Math.max;e({target:"Math",stat:!0},{clamp:function clamp(t,n,r){return o(r,i(n,t))}})},function(t,n,r){r(2)({target:"Math",stat:!0},{DEG_PER_RAD:Math.PI/180})},function(t,n,r){var e=r(2),o=180/Math.PI;e({target:"Math",stat:!0},{degrees:function degrees(t){return t*o}})},function(t,n,r){var e=r(2),i=r(378),a=r(170);e({target:"Math",stat:!0},{fscale:function fscale(t,n,r,e,o){return a(i(t,n,r,e,o))}})},function(t,n){t.exports=Math.scale||function scale(t,n,r,e,o){return 0===arguments.length||t!=t||n!=n||r!=r||e!=e||o!=o?NaN:t===Infinity||t===-Infinity?t:(t-n)*(o-e)/(r-n)+e}},function(t,n,r){r(2)({target:"Math",stat:!0},{iaddh:function iaddh(t,n,r,e){var o=t>>>0,i=r>>>0;return(n>>>0)+(e>>>0)+((o&i|(o|i)&~(o+i>>>0))>>>31)|0}})},function(t,n,r){r(2)({target:"Math",stat:!0},{imulh:function imulh(t,n){var r=+t,e=+n,o=65535&r,i=65535&e,a=r>>16,u=e>>16,c=(a*i>>>0)+(o*i>>>16);return a*u+(c>>16)+((o*u>>>0)+(65535&c)>>16)}})},function(t,n,r){r(2)({target:"Math",stat:!0},{isubh:function isubh(t,n,r,e){var o=t>>>0,i=r>>>0;return(n>>>0)-(e>>>0)-((~o&i|~(o^i)&o-i>>>0)>>>31)|0}})},function(t,n,r){r(2)({target:"Math",stat:!0},{RAD_PER_DEG:180/Math.PI})},function(t,n,r){var e=r(2),o=Math.PI/180;e({target:"Math",stat:!0},{radians:function radians(t){return t*o}})},function(t,n,r){r(2)({target:"Math",stat:!0},{scale:r(378)})},function(t,n,r){var e=r(2),o=r(20),i=r(186),a=r(105),u=r(26),c="Seeded Random",f=c+" Generator",s=u.set,l=u.getterFor(f),h=a(function SeededRandomGenerator(t){s(this,{type:f,seed:t%2147483647})},c,function next(){var t=l(this);return{value:(1073741823&(t.seed=(1103515245*t.seed+12345)%2147483647))/1073741823,done:!1}});e({target:"Math",stat:!0,forced:!0},{seededPRNG:function seededPRNG(t){var n=o(t).seed;if(!i(n))throw TypeError('Math.seededPRNG() argument should have a "seed" field with a finite value.');return new h(n)}})},function(t,n,r){r(2)({target:"Math",stat:!0},{signbit:function signbit(t){return(t=+t)!=t?t:0==t?1/t==Infinity:0<t}})},function(t,n,r){r(2)({target:"Math",stat:!0},{umulh:function umulh(t,n){var r=+t,e=+n,o=65535&r,i=65535&e,a=r>>>16,u=e>>>16,c=(a*i>>>0)+(o*i>>>16);return a*u+(c>>>16)+((o*u>>>0)+(65535&c)>>>16)}})},function(t,n,r){var e=r(2),i=r(39),a=r(196),u="Invalid number representation",c=/^[\da-z]+$/;e({target:"Number",stat:!0},{fromString:function fromString(t,n){var r,e,o=1;if("string"!=typeof t)throw TypeError(u);if(!t.length)throw SyntaxError(u);if("-"==t.charAt(0)&&(o=-1,!(t=t.slice(1)).length))throw SyntaxError(u);if((r=n===kt?10:i(n))<2||36<r)throw RangeError("Invalid radix");if(!c.test(t)||(e=a(t,r)).toString(r)!==t)throw SyntaxError(u);return o*e}})},function(t,n,r){function fwa(t){return null==t?kt:f(t)}function gwa(t){var n=t.cleanup;if(n){t.cleanup=kt;try{n()}catch(r){v(r)}}}function hwa(t){return t.observer===kt}function iwa(t,n){if(!c){t.closed=!0;var r=n.subscriptionObserver;r&&(r.closed=!0)}n.observer=kt}function jwa(t,n){var r,e=x(this,{cleanup:kt,observer:s(t),subscriptionObserver:kt});c||(this.closed=!1);try{(r=fwa(t.start))&&r.call(t,this)}catch(u){v(u)}if(!hwa(e)){var o=e.subscriptionObserver=new w(this);try{var i=n(o),a=i;null!=i&&(e.cleanup="function"==typeof i.unsubscribe?function(){a.unsubscribe()}:f(i))}catch(u){return void o.error(u)}hwa(e)&&gwa(e)}}var e=r(2),c=r(5),o=r(124),f=r(58),s=r(20),i=r(14),a=r(132),u=r(19).f,l=r(18),h=r(131),p=r(355),g=r(156),v=r(238),d=r(52),y=r(26),m=d("observable"),b=y.get,x=y.set;jwa.prototype=h({},{unsubscribe:function unsubscribe(){var t=b(this);hwa(t)||(iwa(this,t),gwa(t))}}),c&&u(jwa.prototype,"closed",{configurable:!0,get:function(){return hwa(b(this))}});var w=function(t){x(this,{subscription:t}),c||(this.closed=!1)};w.prototype=h({},{next:function next(t){var n=b(b(this).subscription);if(!hwa(n)){var r=n.observer;try{var e=fwa(r.next);e&&e.call(r,t)}catch(o){v(o)}}},error:function error(t){var n=b(this).subscription,r=b(n);if(!hwa(r)){var e=r.observer;iwa(n,r);try{var o=fwa(e.error);o?o.call(e,t):v(t)}catch(i){v(i)}gwa(r)}},complete:function complete(){var t=b(this).subscription,n=b(t);if(!hwa(n)){var r=n.observer;iwa(t,n);try{var e=fwa(r.complete);e&&e.call(r)}catch(error){v(error)}gwa(n)}}}),c&&u(w.prototype,"closed",{configurable:!0,get:function(){return hwa(b(b(this).subscription))}});var S=function Observable(t){a(this,S,"Observable"),x(this,{subscriber:f(t)})};h(S.prototype,{subscribe:function subscribe(t){var n=arguments.length;return new jwa("function"==typeof t?{next:t,error:1<n?arguments[1]:kt,complete:2<n?arguments[2]:kt}:i(t)?t:{},b(this).subscriber)}}),h(S,{from:function from(t){var n="function"==typeof this?this:S,r=fwa(s(t)[m]);if(r){var e=s(r.call(t));return e.constructor===n?e:new n(function(t){return e.subscribe(t)})}var o=p(t);return new n(function(n){g(o,function(t){if(n.next(t),n.closed)return g.stop()},kt,!1,!0),n.complete()})},of:function of(){for(var t="function"==typeof this?this:S,r=arguments.length,e=new Array(r),n=0;n<r;)e[n]=arguments[n++];return new t(function(t){for(var n=0;n<r;n++)if(t.next(e[n]),t.closed)return;t.complete()})}}),l(S.prototype,m,function(){return this}),e({global:!0},{Observable:S}),o("Observable")},function(t,n,r){var e=r(2),f=r(58),o=r(237),i=r(239),s=r(156);e({target:"Promise",stat:!0},{allSettled:function allSettled(t){var u=this,n=o.f(u),c=n.resolve,r=n.reject,e=i(function(){var e=f(u.resolve),o=[],i=0,a=1;s(t,function(t){var n=i++,r=!1;o.push(kt),a++,e.call(u,t).then(function(t){r||(r=!0,o[n]={status:"fulfilled",value:t},--a||c(o))},function(t){r||(r=!0,o[n]={status:"rejected",reason:t},--a||c(o))})}),--a||c(o)});return e.error&&r(e.value),n.promise}})},function(t,n,r){var e=r(2),l=r(58),h=r(33),o=r(237),i=r(239),p=r(156),g="No one promise resolved";e({target:"Promise",stat:!0},{any:function any(t){var c=this,n=o.f(c),f=n.resolve,s=n.reject,r=i(function(){var e=l(c.resolve),o=[],i=0,a=1,u=!1;p(t,function(t){var n=i++,r=!1;o.push(kt),a++,e.call(c,t).then(function(t){r||u||(u=!0,f(t))},function(t){r||u||(r=!0,o[n]=t,--a||s(new(h("AggregateError"))(o,g)))})}),--a||s(new(h("AggregateError"))(o,g))});return r.error&&s(r.value),n.promise}})},function(t,n,r){var e=r(2),o=r(237),i=r(239);e({target:"Promise",stat:!0},{"try":function(t){var n=o.f(this),r=i(t);return(r.error?n.reject:n.resolve)(r.value),n.promise}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=o.toKey,u=o.set;e({target:"Reflect",stat:!0},{defineMetadata:function defineMetadata(t,n,r){var e=arguments.length<4?kt:a(arguments[3]);u(t,n,i(r),e)}})},function(t,n,r){function Lya(t,n,r){var e=a.get(t);if(!e){if(!r)return;a.set(t,e=new i)}var o=e.get(n);if(!o){if(!r)return;e.set(n,o=new i)}return o}var i=r(152),e=r(341),o=r(22)("metadata"),a=o.store||(o.store=new e);t.exports={store:a,getMap:Lya,has:function(t,n,r){var e=Lya(n,r,!1);return e!==kt&&e.has(t)},get:function(t,n,r){var e=Lya(n,r,!1);return e===kt?kt:e.get(t)},set:function(t,n,r,e){Lya(r,e,!0).set(t,n)},keys:function(t,n){var r=Lya(t,n,!1),e=[];return r&&r.forEach(function(t,n){e.push(n)}),e},toKey:function(t){return t===kt||"symbol"==typeof t?t:String(t)}}},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=o.toKey,u=o.getMap,c=o.store;e({target:"Reflect",stat:!0},{deleteMetadata:function deleteMetadata(t,n){var r=arguments.length<3?kt:a(arguments[2]),e=u(i(n),r,!1);if(e===kt||!e["delete"](t))return!1;if(e.size)return!0;var o=c.get(n);return o["delete"](r),!!o.size||c["delete"](n)}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=r(107),u=o.has,c=o.get,f=o.toKey,s=function(t,n,r){if(u(t,n,r))return c(t,n,r);var e=a(n);return null!==e?s(t,e,r):kt};e({target:"Reflect",stat:!0},{getMetadata:function getMetadata(t,n){var r=arguments.length<3?kt:f(arguments[2]);return s(t,i(n),r)}})},function(t,n,r){var e=r(2),i=r(261),o=r(394),a=r(20),u=r(107),c=r(156),f=o.keys,s=o.toKey,l=function(t,n){var r=f(t,n),e=u(t);if(null===e)return r;var o=l(e,n);return o.length?r.length?function(t){var n=[];return c(t,n.push,n),n}(new i(r.concat(o))):o:r};e({target:"Reflect",stat:!0},{getMetadataKeys:function getMetadataKeys(t){var n=arguments.length<2?kt:s(arguments[1]);return l(a(t),n)}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=o.get,u=o.toKey;e({target:"Reflect",stat:!0},{getOwnMetadata:function getOwnMetadata(t,n){var r=arguments.length<3?kt:u(arguments[2]);return a(t,i(n),r)}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=o.keys,u=o.toKey;e({target:"Reflect",stat:!0},{getOwnMetadataKeys:function getOwnMetadataKeys(t){var n=arguments.length<2?kt:u(arguments[1]);return a(i(t),n)}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=r(107),u=o.has,c=o.toKey,f=function(t,n,r){if(u(t,n,r))return!0;var e=a(n);return null!==e&&f(t,e,r)};e({target:"Reflect",stat:!0},{hasMetadata:function hasMetadata(t,n){var r=arguments.length<3?kt:c(arguments[2]);return f(t,i(n),r)}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=o.has,u=o.toKey;e({target:"Reflect",stat:!0},{hasOwnMetadata:function hasOwnMetadata(t,n){var r=arguments.length<3?kt:u(arguments[2]);return a(t,i(n),r)}})},function(t,n,r){var e=r(2),o=r(394),i=r(20),a=o.toKey,u=o.set;e({target:"Reflect",stat:!0},{metadata:function metadata(r,e){return function decorator(t,n){u(r,e,i(t),a(n))}}})},function(t,n,r){var e=r(2),o=r(24),i=r(404);e({target:"Set",proto:!0,real:!0,forced:o},{addAll:function addAll(){return i.apply(this,arguments)}})},function(t,n,r){var o=r(20),i=r(58);t.exports=function(){for(var t=o(this),n=i(t.add),r=0,e=arguments.length;r<e;r++)n.call(t,arguments[r]);return t}},function(t,n,r){var e=r(2),o=r(24),i=r(352);e({target:"Set",proto:!0,real:!0,forced:o},{deleteAll:function deleteAll(){return i.apply(this,arguments)}})},function(t,n,r){var e=r(2),o=r(24),i=r(33),a=r(20),u=r(58),c=r(136),f=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{difference:function difference(t){var n=a(this),r=new(c(n,i("Set")))(n),e=u(r["delete"]);return f(t,function(t){e.call(r,t)}),r}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(408),c=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{every:function every(t){var n=i(this),r=u(n),e=a(t,1<arguments.length?arguments[1]:kt,3);return!c(r,function(t){if(!e(t,t,n))return c.stop()},kt,!1,!0).stopped}})},function(t,n,r){var e=r(24),o=r(355);t.exports=e?o:function(t){return Set.prototype.values.call(t)}},function(t,n,r){var e=r(2),o=r(24),a=r(33),u=r(20),c=r(58),f=r(57),s=r(136),l=r(408),h=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{filter:function filter(t){var n=u(this),r=l(n),e=f(t,1<arguments.length?arguments[1]:kt,3),o=new(s(n,a("Set"))),i=c(o.add);return h(r,function(t){e(t,t,n)&&i.call(o,t)},kt,!1,!0),o}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(408),c=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{find:function find(t){var n=i(this),r=u(n),e=a(t,1<arguments.length?arguments[1]:kt,3);return c(r,function(t){if(e(t,t,n))return c.stop(t)},kt,!1,!0).result}})},function(t,n,r){r(2)({target:"Set",stat:!0},{from:r(360)})},function(t,n,r){var e=r(2),o=r(24),i=r(33),a=r(20),u=r(58),c=r(136),f=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{intersection:function intersection(t){var n=a(this),r=new(c(n,i("Set"))),e=u(n.has),o=u(r.add);return f(t,function(t){e.call(n,t)&&o.call(r,t)}),r}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(58),u=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{isDisjointFrom:function isDisjointFrom(t){var n=i(this),r=a(n.has);return!u(t,function(t){if(!0===r.call(n,t))return u.stop()}).stopped}})},function(t,n,r){var e=r(2),o=r(24),i=r(33),a=r(20),u=r(58),c=r(355),f=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{isSubsetOf:function isSubsetOf(t){var n=c(this),r=a(t),e=r.has;return"function"!=typeof e&&(r=new(i("Set"))(t),e=u(r.has)),!f(n,function(t){if(!1===e.call(r,t))return f.stop()},kt,!1,!0).stopped}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(58),u=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{isSupersetOf:function isSupersetOf(t){var n=i(this),r=a(n.has);return!u(t,function(t){if(!1===r.call(n,t))return u.stop()}).stopped}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(408),u=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{join:function join(t){var n=i(this),r=a(n),e=t===kt?",":String(t),o=[];return u(r,o.push,o,!1,!0),o.join(e)}})},function(t,n,r){var e=r(2),o=r(24),a=r(33),u=r(20),c=r(58),f=r(57),s=r(136),l=r(408),h=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{map:function map(t){var n=u(this),r=l(n),e=f(t,1<arguments.length?arguments[1]:kt,3),o=new(s(n,a("Set"))),i=c(o.add);return h(r,function(t){i.call(o,e(t,t,n))},kt,!1,!0),o}})},function(t,n,r){r(2)({target:"Set",stat:!0},{of:r(370)})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(58),u=r(408),c=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{reduce:function reduce(n){var r,t,e=i(this),o=u(e);if(a(n),1<arguments.length)r=arguments[1];else{if((t=o.next()).done)throw TypeError("Reduce of empty set with no initial value");r=t.value}return c(o,function(t){r=n(r,t,t,e)},kt,!1,!0),r}})},function(t,n,r){var e=r(2),o=r(24),i=r(20),a=r(57),u=r(408),c=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{some:function some(t){var n=i(this),r=u(n),e=a(t,1<arguments.length?arguments[1]:kt,3);return c(r,function(t){if(e(t,t,n))return c.stop()},kt,!1,!0).stopped}})},function(t,n,r){var e=r(2),o=r(24),i=r(33),a=r(20),u=r(58),c=r(136),f=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{symmetricDifference:function symmetricDifference(t){var n=a(this),r=new(c(n,i("Set")))(n),e=u(r["delete"]),o=u(r.add);return f(t,function(t){e.call(r,t)||o.call(r,t)}),r}})},function(t,n,r){var e=r(2),o=r(24),i=r(33),a=r(20),u=r(58),c=r(136),f=r(156);e({target:"Set",proto:!0,real:!0,forced:o},{union:function union(t){var n=a(this),r=new(c(n,i("Set")))(n);return f(t,u(r.add),r),r}})},function(t,n,r){var e=r(2),o=r(263).charAt;e({target:"String",proto:!0},{at:function at(t){return o(this,t)}})},function(t,n,r){var e=r(2),o=r(105),i=r(12),a=r(26),u=r(263),c=u.codeAt,f=u.charAt,s="String Iterator",l=a.set,h=a.getterFor(s),p=o(function StringIterator(t){l(this,{type:s,string:t,index:0})},"String",function next(){var t,n=h(this),r=n.string,e=n.index;return r.length<=e?{value:kt,done:!0}:(t=f(r,e),n.index+=t.length,{value:{codePoint:c(t,0),position:e},done:!1})});e({target:"String",proto:!0},{codePoints:function codePoints(){return new p(String(i(this)))}})},function(t,n,r){function JGa(t,n){var r=i(this),e=String("flags"in p?r.flags:a.call(r));return~e.indexOf("g")||(r=new(u(r,RegExp))(r.source,e+"g")),String(t).replace(r,n)}var e=r(2),o=r(18),f=r(12),i=r(20),s=r(255),a=r(256),u=r(136),c=r(52),l=r(24),h=c("replaceAll"),p=RegExp.prototype;e({target:"String",proto:!0},{replaceAll:function replaceAll(t,n){var r,e,o,i,a,u,c=f(this);if(null!=t){if((r=t[h])!==kt)return r.call(t,c,n);if(l&&s(t))return JGa.call(t,c,n)}if(e=String(c),o=String(t),i=e.split(o),"function"!=typeof n)return i.join(String(n));for(a=i[0],u=1;u<i.length;u++)a+=String(n(o,u-1,e)),a+=i[u];return a}}),l||h in p||o(p,h,JGa)},function(t,n,r){r(54)("dispose")},function(t,n,r){r(54)("observable")},function(t,n,r){r(54)("patternMatch")},function(t,n,r){r(54)("replaceAll")},function(t,n,r){var e=r(2),o=r(24),i=r(352);e({target:"WeakMap",proto:!0,real:!0,forced:o},{deleteAll:function deleteAll(){return i.apply(this,arguments)}})},function(t,n,r){r(2)({target:"WeakMap",stat:!0},{from:r(360)})},function(t,n,r){r(2)({target:"WeakMap",stat:!0},{of:r(370)})},function(t,n,r){var e=r(2),o=r(24),i=r(404);e({target:"WeakSet",proto:!0,real:!0,forced:o},{addAll:function addAll(){return i.apply(this,arguments)}})},function(t,n,r){var e=r(2),o=r(24),i=r(352);e({target:"WeakSet",proto:!0,real:!0,forced:o},{deleteAll:function deleteAll(){return i.apply(this,arguments)}})},function(t,n,r){r(2)({target:"WeakSet",stat:!0},{from:r(360)})},function(t,n,r){r(2)({target:"WeakSet",stat:!0},{of:r(370)})},function(t,n,r){var e=r(3),o=r(438),i=r(91),a=r(18);for(var u in o){var c=e[u],f=c&&c.prototype;if(f&&f.forEach!==i)try{a(f,"forEach",i)}catch(s){f.forEach=i}}},function(t,n){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(t,n,r){var e=r(3),o=r(438),i=r(103),a=r(18),u=r(52),c=u("iterator"),f=u("toStringTag"),s=i.values;for(var l in o){var h=e[l],p=h&&h.prototype;if(p){if(p[c]!==s)try{a(p,c,s)}catch(v){p[c]=s}if(p[f]||a(p,f,l),o[l])for(var g in i)if(p[g]!==i[g])try{a(p,g,i[g])}catch(v){p[g]=i[g]}}}},function(t,n,r){var e=r(3),o=r(233),i=!e.setImmediate||!e.clearImmediate;r(2)({global:!0,bind:!0,enumerable:!0,forced:i},{setImmediate:o.set,clearImmediate:o.clear})},function(t,n,r){var e=r(2),o=r(3),i=r(234),a=r(11),u=o.process,c="process"==a(u);e({global:!0,enumerable:!0,noTargetGet:!0},{queueMicrotask:function queueMicrotask(t){var n=c&&u.domain;i(n?n.bind(t):t)}})},function(t,n,r){function $Ia(o){return function(t,n){var r=2<arguments.length,e=r?a.call(arguments,2):kt;return o(r?function(){("function"==typeof t?t:Function(t)).apply(this,e)}:t,n)}}var e=r(2),o=r(3),i=r(235),a=[].slice;e({global:!0,bind:!0,forced:/MSIE .\./.test(i)},{setTimeout:$Ia(o.setTimeout),setInterval:$Ia(o.setInterval)})},function(t,n,r){r(269);function TJa(t,n){var r,e,o;if("["==n.charAt(0)){if("]"!=n.charAt(n.length-1))return M;if(!(r=K(n.slice(1,-1))))return M;t.host=r}else if(J(t)){if(n=h(n),U.test(n))return M;if(null===(r=C(n)))return M;t.host=r}else{if(N.test(n))return M;for(r="",e=S(n),o=0;o<e.length;o++)r+=V(e[o],B);t.host=r}}function XJa(t){var n,r,e,o;if("number"==typeof t){for(n=[],r=0;r<4;r++)n.unshift(t%256),t=E(t/256);return n.join(".")}if("object"!=typeof t)return t;for(n="",e=function(t){for(var n=null,r=1,e=null,o=0,i=0;i<8;i++)0!==t[i]?(r<o&&(n=e,r=o),e=null,o=0):(null===e&&(e=i),++o);return r<o&&(n=e,r=o),n}(t),r=0;r<8;r++)o&&0===t[r]||(o&&(o=!1),e===r?(n+=r?":":"::",o=!0):(n+=t[r].toString(16),r<7&&(n+=":")));return"["+n+"]"}function dKa(t){return""!=t.username||""!=t.password}function eKa(t){return!t.host||t.cannotBeABaseURL||"file"==t.scheme}function fKa(t,n){var r;return 2==t.length&&R.test(t.charAt(0))&&(":"==(r=t.charAt(1))||!n&&"|"==r)}function gKa(t){var n;return 1<t.length&&fKa(t.slice(0,2))&&(2==t.length||"/"===(n=t.charAt(2))||"\\"===n||"?"===n||"#"===n)}function hKa(t){var n=t.path,r=n.length;!r||"file"==t.scheme&&1==r&&fKa(n[0],!0)||n.pop()}function FKa(t,n,r,e){var o,i,a,u,c,f,s=r||$,l=0,h="",p=!1,g=!1,v=!1;for(r||(t.scheme="",t.username="",t.password="",t.host=null,t.port=null,t.path=[],t.query=null,t.fragment=null,t.cannotBeABaseURL=!1,n=n.replace(W,"")),n=n.replace(D,""),o=S(n);l<=o.length;){switch(i=o[l],s){case $:if(!i||!R.test(i)){if(r)return I;s=X;continue}h+=i.toLowerCase(),s=H;break;case H:if(i&&(_.test(i)||"+"==i||"-"==i||"."==i))h+=i.toLowerCase();else{if(":"!=i){if(r)return I;h="",s=X,l=0;continue}if(r&&(J(t)!=w(Y,h)||"file"==h&&(dKa(t)||null!==t.port)||"file"==t.scheme&&!t.host))return;if(t.scheme=h,r)return void(J(t)&&Y[t.scheme]==t.port&&(t.port=null));h="","file"==t.scheme?s=ct:J(t)&&e&&e.scheme==t.scheme?s=Q:J(t)?s=rt:"/"==o[l+1]?(s=Z,l++):(t.cannotBeABaseURL=!0,t.path.push(""),s=pt)}break;case X:if(!e||e.cannotBeABaseURL&&"#"!=i)return I;if(e.cannotBeABaseURL&&"#"==i){t.scheme=e.scheme,t.path=e.path.slice(),t.query=e.query,t.fragment="",t.cannotBeABaseURL=!0,s=vt;break}s="file"==e.scheme?ct:tt;continue;case Q:if("/"!=i||"/"!=o[l+1]){s=tt;continue}s=et,l++;break;case Z:if("/"==i){s=ot;break}s=ht;continue;case tt:if(t.scheme=e.scheme,i==x)t.username=e.username,t.password=e.password,t.host=e.host,t.port=e.port,t.path=e.path.slice(),t.query=e.query;else if("/"==i||"\\"==i&&J(t))s=nt;else if("?"==i)t.username=e.username,t.password=e.password,t.host=e.host,t.port=e.port,t.path=e.path.slice(),t.query="",s=gt;else{if("#"!=i){t.username=e.username,t.password=e.password,t.host=e.host,t.port=e.port,t.path=e.path.slice(),t.path.pop(),s=ht;continue}t.username=e.username,t.password=e.password,t.host=e.host,t.port=e.port,t.path=e.path.slice(),t.query=e.query,t.fragment="",s=vt}break;case nt:if(!J(t)||"/"!=i&&"\\"!=i){if("/"!=i){t.username=e.username,t.password=e.password,t.host=e.host,t.port=e.port,s=ht;continue}s=ot}else s=et;break;case rt:if(s=et,"/"!=i||"/"!=h.charAt(l+1))continue;l++;break;case et:if("/"==i||"\\"==i)break;s=ot;continue;case ot:if("@"==i){p&&(h="%40"+h),p=!0,a=S(h);for(var d=0;d<a.length;d++){var y=a[d];if(":"!=y||v){var m=V(y,G);v?t.password+=m:t.username+=m}else v=!0}h=""}else if(i==x||"/"==i||"?"==i||"#"==i||"\\"==i&&J(t)){if(p&&""==h)return"Invalid authority";l-=S(h).length+1,h="",s=it}else h+=i;break;case it:case at:if(r&&"file"==t.scheme){s=st;continue}if(":"!=i||g){if(i==x||"/"==i||"?"==i||"#"==i||"\\"==i&&J(t)){if(J(t)&&""==h)return M;if(r&&""==h&&(dKa(t)||null!==t.port))return;if(u=TJa(t,h))return u;if(h="",s=lt,r)return;continue}"["==i?g=!0:"]"==i&&(g=!1),h+=i}else{if(""==h)return M;if(u=TJa(t,h))return u;if(h="",s=ut,r==at)return}break;case ut:if(!j.test(i)){if(i==x||"/"==i||"?"==i||"#"==i||"\\"==i&&J(t)||r){if(""!=h){var b=parseInt(h,10);if(65535<b)return P;t.port=J(t)&&b===Y[t.scheme]?null:b,h=""}if(r)return;s=lt;continue}return P}h+=i;break;case ct:if(t.scheme="file","/"==i||"\\"==i)s=ft;else{if(!e||"file"!=e.scheme){s=ht;continue}if(i==x)t.host=e.host,t.path=e.path.slice(),t.query=e.query;else if("?"==i)t.host=e.host,t.path=e.path.slice(),t.query="",s=gt;else{if("#"!=i){gKa(o.slice(l).join(""))||(t.host=e.host,t.path=e.path.slice(),hKa(t)),s=ht;continue}t.host=e.host,t.path=e.path.slice(),t.query=e.query,t.fragment="",s=vt}}break;case ft:if("/"==i||"\\"==i){s=st;break}e&&"file"==e.scheme&&!gKa(o.slice(l).join(""))&&(fKa(e.path[0],!0)?t.path.push(e.path[0]):t.host=e.host),s=ht;continue;case st:if(i==x||"/"==i||"\\"==i||"?"==i||"#"==i){if(!r&&fKa(h))s=ht;else if(""==h){if(t.host="",r)return;s=lt}else{if(u=TJa(t,h))return u;if("localhost"==t.host&&(t.host=""),r)return;h="",s=lt}continue}h+=i;break;case lt:if(J(t)){if(s=ht,"/"!=i&&"\\"!=i)continue}else if(r||"?"!=i)if(r||"#"!=i){if(i!=x&&(s=ht,"/"!=i))continue}else t.fragment="",s=vt;else t.query="",s=gt;break;case ht:if(i==x||"/"==i||"\\"==i&&J(t)||!r&&("?"==i||"#"==i)){if(".."===(f=(f=h).toLowerCase())||"%2e."===f||".%2e"===f||"%2e%2e"===f?(hKa(t),"/"==i||"\\"==i&&J(t)||t.path.push("")):"."===(c=h)||"%2e"===c.toLowerCase()?"/"==i||"\\"==i&&J(t)||t.path.push(""):("file"==t.scheme&&!t.path.length&&fKa(h)&&(t.host&&(t.host=""),h=h.charAt(0)+":"),t.path.push(h)),h="","file"==t.scheme&&(i==x||"?"==i||"#"==i))for(;1<t.path.length&&""===t.path[0];)t.path.shift();"?"==i?(t.query="",s=gt):"#"==i&&(t.fragment="",s=vt)}else h+=V(i,z);break;case pt:"?"==i?(t.query="",s=gt):"#"==i?(t.fragment="",s=vt):i!=x&&(t.path[0]+=V(i,B));break;case gt:r||"#"!=i?i!=x&&("'"==i&&J(t)?t.query+="%27":t.query+="#"==i?"%23":V(i,B)):(t.fragment="",s=vt);break;case vt:i!=x&&(t.fragment+=V(i,q))}l++}}function UKa(t,n){return{get:t,set:n,configurable:!0,enumerable:!0}}var x,e=r(2),f=r(5),o=r(444),i=r(3),a=r(48),u=r(21),s=r(132),w=r(15),c=r(201),S=r(93),l=r(263).codeAt,h=r(445),p=r(55),g=r(446),v=r(26),d=i.URL,y=g.URLSearchParams,m=g.getState,b=v.set,A=v.getterFor("URL"),E=Math.floor,O=Math.pow,I="Invalid scheme",M="Invalid host",P="Invalid port",R=/[A-Za-z]/,_=/[\d+\-.A-Za-z]/,j=/\d/,k=/^(0x|0X)/,T=/^[0-7]+$/,F=/^\d+$/,L=/^[\dA-Fa-f]+$/,U=/[\u0000\u0009\u000A\u000D #%/:?@[\\]]/,N=/[\u0000\u0009\u000A\u000D #/:?@[\\]]/,W=/^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g,D=/[\u0009\u000A\u000D]/g,C=function(t){var n,r,e,o,i,a,u,c=t.split(".");if(c.length&&""==c[c.length-1]&&c.pop(),4<(n=c.length))return t;for(r=[],e=0;e<n;e++){if(""==(o=c[e]))return t;if(i=10,1<o.length&&"0"==o.charAt(0)&&(i=k.test(o)?16:8,o=o.slice(8==i?1:2)),""===o)a=0;else{if(!(10==i?F:8==i?T:L).test(o))return t;a=parseInt(o,i)}r.push(a)}for(e=0;e<n;e++)if(a=r[e],e==n-1){if(a>=O(256,5-n))return null}else if(255<a)return null;for(u=r.pop(),e=0;e<r.length;e++)u+=r[e]*O(256,3-e);return u},K=function(t){function vLa(){return t.charAt(l)}var n,r,e,o,i,a,u,c=[0,0,0,0,0,0,0,0],f=0,s=null,l=0;if(":"==vLa()){if(":"!=t.charAt(1))return;l+=2,s=++f}for(;vLa();){if(8==f)return;if(":"!=vLa()){for(n=r=0;r<4&&L.test(vLa());)n=16*n+parseInt(vLa(),16),l++,r++;if("."==vLa()){if(0==r)return;if(l-=r,6<f)return;for(e=0;vLa();){if(o=null,0<e){if(!("."==vLa()&&e<4))return;l++}if(!j.test(vLa()))return;for(;j.test(vLa());){if(i=parseInt(vLa(),10),null===o)o=i;else{if(0==o)return;o=10*o+i}if(255<o)return;l++}c[f]=256*c[f]+o,2!=++e&&4!=e||f++}if(4!=e)return;break}if(":"==vLa()){if(l++,!vLa())return}else if(vLa())return;c[f++]=n}else{if(null!==s)return;l++,s=++f}}if(null!==s)for(a=f-s,f=7;0!=f&&0<a;)u=c[f],c[f--]=c[s+a-1],c[s+--a]=u;else if(8!=f)return;return c},B={},q=c({},B,{" ":1,'"':1,"<":1,">":1,"`":1}),z=c({},q,{"#":1,"?":1,"{":1,"}":1}),G=c({},z,{"/":1,":":1,";":1,"=":1,"@":1,"[":1,"\\":1,"]":1,"^":1,"|":1}),V=function(t,n){var r=l(t,0);return 32<r&&r<127&&!w(n,t)?t:encodeURIComponent(t)},Y={ftp:21,file:null,gopher:70,http:80,https:443,ws:80,wss:443},J=function(t){return w(Y,t.scheme)},$={},H={},X={},Q={},Z={},tt={},nt={},rt={},et={},ot={},it={},at={},ut={},ct={},ft={},st={},lt={},ht={},pt={},gt={},vt={},dt=function URL(t){var n,r,e=s(this,dt,"URL"),o=1<arguments.length?arguments[1]:kt,i=String(t),a=b(e,{type:"URL"});if(o!==kt)if(o instanceof dt)n=A(o);else if(r=FKa(n={},String(o)))throw TypeError(r);if(r=FKa(a,i,null,n))throw TypeError(r);var u=a.searchParams=new y,c=m(u);c.updateSearchParams(a.query),c.updateURL=function(){a.query=String(u)||null},f||(e.href=mt.call(e),e.origin=bt.call(e),e.protocol=xt.call(e),e.username=wt.call(e),e.password=St.call(e),e.host=At.call(e),e.hostname=Et.call(e),e.port=Ot.call(e),e.pathname=It.call(e),e.search=Mt.call(e),e.searchParams=Pt.call(e),e.hash=Rt.call(e))},yt=dt.prototype,mt=function(){var t=A(this),n=t.scheme,r=t.username,e=t.password,o=t.host,i=t.port,a=t.path,u=t.query,c=t.fragment,f=n+":";return null!==o?(f+="//",dKa(t)&&(f+=r+(e?":"+e:"")+"@"),f+=XJa(o),null!==i&&(f+=":"+i)):"file"==n&&(f+="//"),f+=t.cannotBeABaseURL?a[0]:a.length?"/"+a.join("/"):"",null!==u&&(f+="?"+u),null!==c&&(f+="#"+c),f},bt=function(){var t=A(this),n=t.scheme,r=t.port;if("blob"==n)try{return new URL(n.path[0]).origin}catch(e){return"null"}return"file"!=n&&J(t)?n+"://"+XJa(t.host)+(null!==r?":"+r:""):"null"},xt=function(){return A(this).scheme+":"},wt=function(){return A(this).username},
    St=function(){return A(this).password},At=function(){var t=A(this),n=t.host,r=t.port;return null===n?"":null===r?XJa(n):XJa(n)+":"+r},Et=function(){var t=A(this).host;return null===t?"":XJa(t)},Ot=function(){var t=A(this).port;return null===t?"":String(t)},It=function(){var t=A(this),n=t.path;return t.cannotBeABaseURL?n[0]:n.length?"/"+n.join("/"):""},Mt=function(){var t=A(this).query;return t?"?"+t:""},Pt=function(){return A(this).searchParams},Rt=function(){var t=A(this).fragment;return t?"#"+t:""};if(f&&a(yt,{href:UKa(mt,function(t){var n=A(this),r=String(t),e=FKa(n,r);if(e)throw TypeError(e);m(n.searchParams).updateSearchParams(n.query)}),origin:UKa(bt),protocol:UKa(xt,function(t){var n=A(this);FKa(n,String(t)+":",$)}),username:UKa(wt,function(t){var n=A(this),r=S(String(t));if(!eKa(n)){n.username="";for(var e=0;e<r.length;e++)n.username+=V(r[e],G)}}),password:UKa(St,function(t){var n=A(this),r=S(String(t));if(!eKa(n)){n.password="";for(var e=0;e<r.length;e++)n.password+=V(r[e],G)}}),host:UKa(At,function(t){var n=A(this);n.cannotBeABaseURL||FKa(n,String(t),it)}),hostname:UKa(Et,function(t){var n=A(this);n.cannotBeABaseURL||FKa(n,String(t),at)}),port:UKa(Ot,function(t){var n=A(this);eKa(n)||(""==(t=String(t))?n.port=null:FKa(n,t,ut))}),pathname:UKa(It,function(t){var n=A(this);n.cannotBeABaseURL||(n.path=[],FKa(n,t+"",lt))}),search:UKa(Mt,function(t){var n=A(this);""==(t=String(t))?n.query=null:("?"==t.charAt(0)&&(t=t.slice(1)),n.query="",FKa(n,t,gt)),m(n.searchParams).updateSearchParams(n.query)}),searchParams:UKa(Pt),hash:UKa(Rt,function(t){var n=A(this);""!=(t=String(t))?("#"==t.charAt(0)&&(t=t.slice(1)),n.fragment="",FKa(n,t,vt)):n.fragment=null})}),u(yt,"toJSON",function toJSON(){return mt.call(this)},{enumerable:!0}),u(yt,"toString",function toString(){return mt.call(this)},{enumerable:!0}),d){var _t=d.createObjectURL,jt=d.revokeObjectURL;_t&&u(dt,"createObjectURL",function createObjectURL(t){return _t.apply(d,arguments)}),jt&&u(dt,"revokeObjectURL",function revokeObjectURL(t){return jt.apply(d,arguments)})}p(dt,"URL"),e({global:!0,forced:!o,sham:!f},{URL:dt})},function(t,n,r){var e=r(6),o=r(52),i=r(24),a=o("iterator");t.exports=!e(function(){var t=new URL("b?e=1","http://a"),n=t.searchParams;return t.pathname="c%20d",i&&!t.toJSON||!n.sort||"http://a/c%20d?e=1"!==t.href||"1"!==n.get("e")||"a=1"!==String(new URLSearchParams("?a=1"))||!n[a]||"a"!==new URL("https://a@b").username||"b"!==new URLSearchParams(new URLSearchParams("a=b")).get("a")||"xn--e1aybc"!==new URL("http://тест").host||"#%D0%B1"!==new URL("http://a#б").hash})},function(t,n,r){function YNa(t){return t+22+75*(t<26)}function ZNa(t,n,r){var e=0;for(t=r?b(t/700):t>>1,t+=b(t/n);455<t;e+=36)t=b(t/35);return b(e+36*t/(t+38))}function $Na(t){var n,r,e=[],o=(t=function(t){for(var n=[],r=0,e=t.length;r<e;){var o=t.charCodeAt(r++);if(55296<=o&&o<=56319&&r<e){var i=t.charCodeAt(r++);56320==(64512&i)?n.push(((1023&o)<<10)+(1023&i)+65536):(n.push(o),r--)}else n.push(o)}return n}(t)).length,i=128,a=0,u=72;for(n=0;n<t.length;n++)(r=t[n])<128&&e.push(x(r));var c=e.length,f=c;for(c&&e.push("-");f<o;){var s=y;for(n=0;n<t.length;n++)i<=(r=t[n])&&r<s&&(s=r);var l=f+1;if(s-i>b((y-a)/l))throw RangeError(m);for(a+=(s-i)*l,i=s,n=0;n<t.length;n++){if((r=t[n])<i&&++a>y)throw RangeError(m);if(r==i){for(var h=a,p=36;;p+=36){var g=p<=u?1:u+26<=p?26:p-u;if(h<g)break;var v=h-g,d=36-g;e.push(x(YNa(g+v%d))),h=b(v/d)}e.push(x(YNa(h))),u=ZNa(a,l,f==c),a=0,++f}}++a,++i}return e.join("")}var y=2147483647,i=/[^\0-\u007E]/,a=/[.\u3002\uFF0E\uFF61]/g,m="Overflow: input needs wider integers to process",b=Math.floor,x=String.fromCharCode;t.exports=function(t){var n,r,e=[],o=t.toLowerCase().replace(a,".").split(".");for(n=0;n<o.length;n++)e.push(i.test(r=o[n])?"xn--"+$Na(r):r);return e.join(".")}},function(t,n,r){r(103);function fPa(t){try{return decodeURIComponent(t)}catch(n){return t}}function gPa(t){var n,r=t.replace(A," "),e=4;try{return decodeURIComponent(r)}catch(o){for(;e;)r=r.replace((n=e--,E[n-1]||(E[n-1]=RegExp("((?:%[\\da-f]{2}){"+n+"})","gi"))),fPa);return r}}function jPa(t){return I[t]}function kPa(t){return encodeURIComponent(t).replace(O,jPa)}function lPa(t,n){if(n)for(var r,e,o=n.split("&"),i=0;i<o.length;)(r=o[i++]).length&&(e=r.split("="),t.push({key:gPa(e.shift()),value:gPa(e.join("="))}))}function mPa(t){this.entries.length=0,lPa(this.entries,t)}function nPa(t,n){if(t<n)throw TypeError("Not enough arguments")}var e=r(2),o=r(444),i=r(21),a=r(131),u=r(55),c=r(105),f=r(26),s=r(132),l=r(15),h=r(57),p=r(20),g=r(14),v=r(355),d=r(97),y=r(52)("iterator"),m="URLSearchParams",b=m+"Iterator",x=f.set,w=f.getterFor(m),S=f.getterFor(b),A=/\+/g,E=Array(4),O=/[!'()~]|%20/g,I={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"},M=c(function Iterator(t,n){x(this,{type:b,iterator:v(w(t).entries),kind:n})},"Iterator",function next(){var t=S(this),n=t.kind,r=t.iterator.next(),e=r.value;return r.done||(r.value="keys"===n?e.key:"values"===n?e.value:[e.key,e.value]),r}),P=function URLSearchParams(){s(this,P,m);var t,n,r,e,o,i,a,u=0<arguments.length?arguments[0]:kt,c=[];if(x(this,{type:m,entries:c,updateURL:function(){},updateSearchParams:mPa}),u!==kt)if(g(u))if("function"==typeof(t=d(u)))for(n=t.call(u);!(r=n.next()).done;){if((o=(e=v(p(r.value))).next()).done||(i=e.next()).done||!e.next().done)throw TypeError("Expected sequence with length 2");c.push({key:o.value+"",value:i.value+""})}else for(a in u)l(u,a)&&c.push({key:a,value:u[a]+""});else lPa(c,"string"==typeof u?"?"===u.charAt(0)?u.slice(1):u:u+"")},R=P.prototype;a(R,{append:function append(t,n){nPa(arguments.length,2);var r=w(this);r.entries.push({key:t+"",value:n+""}),r.updateURL()},"delete":function(t){nPa(arguments.length,1);for(var n=w(this),r=n.entries,e=t+"",o=0;o<r.length;)r[o].key===e?r.splice(o,1):o++;n.updateURL()},get:function get(t){nPa(arguments.length,1);for(var n=w(this).entries,r=t+"",e=0;e<n.length;e++)if(n[e].key===r)return n[e].value;return null},getAll:function getAll(t){nPa(arguments.length,1);for(var n=w(this).entries,r=t+"",e=[],o=0;o<n.length;o++)n[o].key===r&&e.push(n[o].value);return e},has:function has(t){nPa(arguments.length,1);for(var n=w(this).entries,r=t+"",e=0;e<n.length;)if(n[e++].key===r)return!0;return!1},set:function set(t,n){nPa(arguments.length,1);for(var r,e=w(this),o=e.entries,i=!1,a=t+"",u=n+"",c=0;c<o.length;c++)(r=o[c]).key===a&&(i?o.splice(c--,1):(i=!0,r.value=u));i||o.push({key:a,value:u}),e.updateURL()},sort:function sort(){var t,n,r,e=w(this),o=e.entries,i=o.slice();for(r=o.length=0;r<i.length;r++){for(t=i[r],n=0;n<r;n++)if(t.key<o[n].key){o.splice(n,0,t);break}n===r&&o.push(t)}e.updateURL()},forEach:function forEach(t){for(var n,r=w(this).entries,e=h(t,1<arguments.length?arguments[1]:kt,3),o=0;o<r.length;)e((n=r[o++]).value,n.key,this)},keys:function keys(){return new M(this,"keys")},values:function values(){return new M(this,"values")},entries:function entries(){return new M(this,"entries")}},{enumerable:!0}),i(R,y,R.entries),i(R,"toString",function toString(){for(var t,n=w(this).entries,r=[],e=0;e<n.length;)t=n[e++],r.push(kPa(t.key)+"="+kPa(t.value));return r.join("&")},{enumerable:!0}),u(P,m),e({global:!0,forced:!o},{URLSearchParams:P}),t.exports={URLSearchParams:P,getState:w}},function(t,n,r){r(2)({target:"URL",proto:!0,enumerable:!0},{toJSON:function toJSON(){return URL.prototype.toString.call(this)}})},function(t,n,r){r(66),r(274)}],__webpack_require__.c=e,__webpack_require__.d=function(t,n,r){__webpack_require__.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:r})},__webpack_require__.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},__webpack_require__.t=function(n,t){if(1&t&&(n=__webpack_require__(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var e in n)__webpack_require__.d(r,e,function(t){return n[t]}.bind(null,e));return r},__webpack_require__.n=function(t){var n=t&&t.__esModule?function getDefault(){return t["default"]}:function getModuleExports(){return t};return __webpack_require__.d(n,"a",n),n},__webpack_require__.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}();
    //# sourceMappingURL=minified.js.map








    /**
* @license Angular v9.1.0-next.4+61.sha-e552591.with-local-changes
* (c) 2010-2020 Google LLC. https://angular.io/
* License: MIT
*/
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}((function () {
    'use strict';
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var Zone$1 = (function (global) {
        var performance = global['performance'];
        function mark(name) { performance && performance['mark'] && performance['mark'](name); }
        function performanceMeasure(name, label) {
            performance && performance['measure'] && performance['measure'](name, label);
        }
        mark('Zone');
        // Initialize before it's accessed below.
        // __Zone_symbol_prefix global can be used to override the default zone
        // symbol prefix with a custom one if needed.
        var symbolPrefix = global['__Zone_symbol_prefix'] || '__zone_symbol__';
        function __symbol__(name) { return symbolPrefix + name; }
        var checkDuplicate = global[__symbol__('forceDuplicateZoneCheck')] === true;
        if (global['Zone']) {
            // if global['Zone'] already exists (maybe zone.js was already loaded or
            // some other lib also registered a global object named Zone), we may need
            // to throw an error, but sometimes user may not want this error.
            // For example,
            // we have two web pages, page1 includes zone.js, page2 doesn't.
            // and the 1st time user load page1 and page2, everything work fine,
            // but when user load page2 again, error occurs because global['Zone'] already exists.
            // so we add a flag to let user choose whether to throw this error or not.
            // By default, if existing Zone is from zone.js, we will not throw the error.
            if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
                throw new Error('Zone already loaded.');
            }
            else {
                return global['Zone'];
            }
        }
        var Zone = /** @class */ (function () {
            function Zone(parent, zoneSpec) {
                this._parent = parent;
                this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
                this._properties = zoneSpec && zoneSpec.properties || {};
                this._zoneDelegate =
                    new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
            }
            Zone.assertZonePatched = function () {
                if (global['Promise'] !== patches['ZoneAwarePromise']) {
                    throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                        'has been overwritten.\n' +
                        'Most likely cause is that a Promise polyfill has been loaded ' +
                        'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                        'If you must load one, do so before loading zone.js.)');
                }
            };
            Object.defineProperty(Zone, "root", {
                get: function () {
                    var zone = Zone.current;
                    while (zone.parent) {
                        zone = zone.parent;
                    }
                    return zone;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Zone, "current", {
                get: function () { return _currentZoneFrame.zone; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Zone, "currentTask", {
                get: function () { return _currentTask; },
                enumerable: true,
                configurable: true
            });
            // tslint:disable-next-line:require-internal-with-underscore
            Zone.__load_patch = function (name, fn) {
                if (patches.hasOwnProperty(name)) {
                    if (checkDuplicate) {
                        throw Error('Already loaded patch: ' + name);
                    }
                }
                else if (!global['__Zone_disable_' + name]) {
                    var perfName = 'Zone:' + name;
                    mark(perfName);
                    patches[name] = fn(global, Zone, _api);
                    performanceMeasure(perfName, perfName);
                }
            };
            Object.defineProperty(Zone.prototype, "parent", {
                get: function () { return this._parent; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Zone.prototype, "name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            Zone.prototype.get = function (key) {
                var zone = this.getZoneWith(key);
                if (zone)
                    return zone._properties[key];
            };
            Zone.prototype.getZoneWith = function (key) {
                var current = this;
                while (current) {
                    if (current._properties.hasOwnProperty(key)) {
                        return current;
                    }
                    current = current._parent;
                }
                return null;
            };
            Zone.prototype.fork = function (zoneSpec) {
                if (!zoneSpec)
                    throw new Error('ZoneSpec required!');
                return this._zoneDelegate.fork(this, zoneSpec);
            };
            Zone.prototype.wrap = function (callback, source) {
                if (typeof callback !== 'function') {
                    throw new Error('Expecting function got: ' + callback);
                }
                var _callback = this._zoneDelegate.intercept(this, callback, source);
                var zone = this;
                return function () {
                    return zone.runGuarded(_callback, this, arguments, source);
                };
            };
            Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            };
            Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
                if (applyThis === void 0) { applyThis = null; }
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    try {
                        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            };
            Zone.prototype.runTask = function (task, applyThis, applyArgs) {
                if (task.zone != this) {
                    throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                }
                // https://github.com/angular/zone.js/issues/778, sometimes eventTask
                // will run in notScheduled(canceled) state, we should not try to
                // run such kind of task but just return
                if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                    return;
                }
                var reEntryGuard = task.state != running;
                reEntryGuard && task._transitionTo(running, scheduled);
                task.runCount++;
                var previousTask = _currentTask;
                _currentTask = task;
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                        task.cancelFn = undefined;
                    }
                    try {
                        return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    // if the task's state is notScheduled or unknown, then it has already been cancelled
                    // we should not reset the state to scheduled
                    if (task.state !== notScheduled && task.state !== unknown) {
                        if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                            reEntryGuard && task._transitionTo(scheduled, running);
                        }
                        else {
                            task.runCount = 0;
                            this._updateTaskCount(task, -1);
                            reEntryGuard &&
                                task._transitionTo(notScheduled, running, notScheduled);
                        }
                    }
                    _currentZoneFrame = _currentZoneFrame.parent;
                    _currentTask = previousTask;
                }
            };
            Zone.prototype.scheduleTask = function (task) {
                if (task.zone && task.zone !== this) {
                    // check if the task was rescheduled, the newZone
                    // should not be the children of the original zone
                    var newZone = this;
                    while (newZone) {
                        if (newZone === task.zone) {
                            throw Error("can not reschedule task to " + this.name + " which is descendants of the original zone " + task.zone.name);
                        }
                        newZone = newZone.parent;
                    }
                }
                task._transitionTo(scheduling, notScheduled);
                var zoneDelegates = [];
                task._zoneDelegates = zoneDelegates;
                task._zone = this;
                try {
                    task = this._zoneDelegate.scheduleTask(this, task);
                }
                catch (err) {
                    // should set task's state to unknown when scheduleTask throw error
                    // because the err may from reschedule, so the fromState maybe notScheduled
                    task._transitionTo(unknown, scheduling, notScheduled);
                    // TODO: @JiaLiPassion, should we check the result from handleError?
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                if (task._zoneDelegates === zoneDelegates) {
                    // we have to check because internally the delegate can reschedule the task.
                    this._updateTaskCount(task, 1);
                }
                if (task.state == scheduling) {
                    task._transitionTo(scheduled, scheduling);
                }
                return task;
            };
            Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
                return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
            };
            Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
            };
            Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
            };
            Zone.prototype.cancelTask = function (task) {
                if (task.zone != this)
                    throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                task._transitionTo(canceling, scheduled, running);
                try {
                    this._zoneDelegate.cancelTask(this, task);
                }
                catch (err) {
                    // if error occurs when cancelTask, transit the state to unknown
                    task._transitionTo(unknown, canceling);
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                this._updateTaskCount(task, -1);
                task._transitionTo(notScheduled, canceling);
                task.runCount = 0;
                return task;
            };
            Zone.prototype._updateTaskCount = function (task, count) {
                var zoneDelegates = task._zoneDelegates;
                if (count == -1) {
                    task._zoneDelegates = null;
                }
                for (var i = 0; i < zoneDelegates.length; i++) {
                    zoneDelegates[i]._updateTaskCount(task.type, count);
                }
            };
            return Zone;
        }());
        // tslint:disable-next-line:require-internal-with-underscore
        Zone.__symbol__ = __symbol__;
        var DELEGATE_ZS = {
            name: '',
            onHasTask: function (delegate, _, target, hasTaskState) { return delegate.hasTask(target, hasTaskState); },
            onScheduleTask: function (delegate, _, target, task) { return delegate.scheduleTask(target, task); },
            onInvokeTask: function (delegate, _, target, task, applyThis, applyArgs) { return delegate.invokeTask(target, task, applyThis, applyArgs); },
            onCancelTask: function (delegate, _, target, task) { return delegate.cancelTask(target, task); }
        };
        var ZoneDelegate = /** @class */ (function () {
            function ZoneDelegate(zone, parentDelegate, zoneSpec) {
                this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
                this.zone = zone;
                this._parentDelegate = parentDelegate;
                this._forkZS =
                    zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
                this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
                this._forkCurrZone =
                    zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
                this._interceptZS =
                    zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
                this._interceptDlgt =
                    zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
                this._interceptCurrZone =
                    zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
                this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
                this._invokeDlgt =
                    zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
                this._invokeCurrZone =
                    zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
                this._handleErrorZS =
                    zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
                this._handleErrorDlgt = zoneSpec &&
                    (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
                this._handleErrorCurrZone =
                    zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
                this._scheduleTaskZS =
                    zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
                this._scheduleTaskDlgt = zoneSpec &&
                    (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
                this._scheduleTaskCurrZone = zoneSpec &&
                    (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
                this._invokeTaskZS =
                    zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
                this._invokeTaskDlgt =
                    zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
                this._invokeTaskCurrZone =
                    zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
                this._cancelTaskZS =
                    zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
                this._cancelTaskDlgt =
                    zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
                this._cancelTaskCurrZone =
                    zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
                this._hasTaskZS = null;
                this._hasTaskDlgt = null;
                this._hasTaskDlgtOwner = null;
                this._hasTaskCurrZone = null;
                var zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
                var parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
                if (zoneSpecHasTask || parentHasTask) {
                    // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                    // a case all task related interceptors must go through this ZD. We can't short circuit it.
                    this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                    this._hasTaskDlgt = parentDelegate;
                    this._hasTaskDlgtOwner = this;
                    this._hasTaskCurrZone = zone;
                    if (!zoneSpec.onScheduleTask) {
                        this._scheduleTaskZS = DELEGATE_ZS;
                        this._scheduleTaskDlgt = parentDelegate;
                        this._scheduleTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onInvokeTask) {
                        this._invokeTaskZS = DELEGATE_ZS;
                        this._invokeTaskDlgt = parentDelegate;
                        this._invokeTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onCancelTask) {
                        this._cancelTaskZS = DELEGATE_ZS;
                        this._cancelTaskDlgt = parentDelegate;
                        this._cancelTaskCurrZone = this.zone;
                    }
                }
            }
            ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
                return this._forkZS ?
                    this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                    new Zone(targetZone, zoneSpec);
            };
            ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
                return this._interceptZS ?
                    this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                    callback;
            };
            ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
                return this._invokeZS ?
                    this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                    callback.apply(applyThis, applyArgs);
            };
            ZoneDelegate.prototype.handleError = function (targetZone, error) {
                return this._handleErrorZS ?
                    this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                    true;
            };
            ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
                var returnTask = task;
                if (this._scheduleTaskZS) {
                    if (this._hasTaskZS) {
                        returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                    }
                    // clang-format off
                    returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                    // clang-format on
                    if (!returnTask)
                        returnTask = task;
                }
                else {
                    if (task.scheduleFn) {
                        task.scheduleFn(task);
                    }
                    else if (task.type == microTask) {
                        scheduleMicroTask(task);
                    }
                    else {
                        throw new Error('Task is missing scheduleFn.');
                    }
                }
                return returnTask;
            };
            ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
                return this._invokeTaskZS ?
                    this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                    task.callback.apply(applyThis, applyArgs);
            };
            ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
                var value;
                if (this._cancelTaskZS) {
                    value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
                }
                else {
                    if (!task.cancelFn) {
                        throw Error('Task is not cancelable');
                    }
                    value = task.cancelFn(task);
                }
                return value;
            };
            ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
                // hasTask should not throw error so other ZoneDelegate
                // can still trigger hasTask callback
                try {
                    this._hasTaskZS &&
                        this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
                }
                catch (err) {
                    this.handleError(targetZone, err);
                }
            };
            // tslint:disable-next-line:require-internal-with-underscore
            ZoneDelegate.prototype._updateTaskCount = function (type, count) {
                var counts = this._taskCounts;
                var prev = counts[type];
                var next = counts[type] = prev + count;
                if (next < 0) {
                    throw new Error('More tasks executed then were scheduled.');
                }
                if (prev == 0 || next == 0) {
                    var isEmpty = {
                        microTask: counts['microTask'] > 0,
                        macroTask: counts['macroTask'] > 0,
                        eventTask: counts['eventTask'] > 0,
                        change: type
                    };
                    this.hasTask(this.zone, isEmpty);
                }
            };
            return ZoneDelegate;
        }());
        var ZoneTask = /** @class */ (function () {
            function ZoneTask(type, source, callback, options, scheduleFn, cancelFn) {
                // tslint:disable-next-line:require-internal-with-underscore
                this._zone = null;
                this.runCount = 0;
                // tslint:disable-next-line:require-internal-with-underscore
                this._zoneDelegates = null;
                // tslint:disable-next-line:require-internal-with-underscore
                this._state = 'notScheduled';
                this.type = type;
                this.source = source;
                this.data = options;
                this.scheduleFn = scheduleFn;
                this.cancelFn = cancelFn;
                if (!callback) {
                    throw new Error('callback is not defined');
                }
                this.callback = callback;
                var self = this;
                // TODO: @JiaLiPassion options should have interface
                if (type === eventTask && options && options.useG) {
                    this.invoke = ZoneTask.invokeTask;
                }
                else {
                    this.invoke = function () {
                        return ZoneTask.invokeTask.call(global, self, this, arguments);
                    };
                }
            }
            ZoneTask.invokeTask = function (task, target, args) {
                if (!task) {
                    task = this;
                }
                _numberOfNestedTaskFrames++;
                try {
                    task.runCount++;
                    return task.zone.runTask(task, target, args);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            };
            Object.defineProperty(ZoneTask.prototype, "zone", {
                get: function () { return this._zone; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZoneTask.prototype, "state", {
                get: function () { return this._state; },
                enumerable: true,
                configurable: true
            });
            ZoneTask.prototype.cancelScheduleRequest = function () { this._transitionTo(notScheduled, scheduling); };
            // tslint:disable-next-line:require-internal-with-underscore
            ZoneTask.prototype._transitionTo = function (toState, fromState1, fromState2) {
                if (this._state === fromState1 || this._state === fromState2) {
                    this._state = toState;
                    if (toState == notScheduled) {
                        this._zoneDelegates = null;
                    }
                }
                else {
                    throw new Error(this.type + " '" + this.source + "': can not transition to '" + toState + "', expecting state '" + fromState1 + "'" + (fromState2 ? ' or \'' + fromState2 + '\'' : '') + ", was '" + this._state + "'.");
                }
            };
            ZoneTask.prototype.toString = function () {
                if (this.data && typeof this.data.handleId !== 'undefined') {
                    return this.data.handleId.toString();
                }
                else {
                    return Object.prototype.toString.call(this);
                }
            };
            // add toJSON method to prevent cyclic error when
            // call JSON.stringify(zoneTask)
            ZoneTask.prototype.toJSON = function () {
                return {
                    type: this.type,
                    state: this.state,
                    source: this.source,
                    zone: this.zone.name,
                    runCount: this.runCount
                };
            };
            return ZoneTask;
        }());
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  MICROTASK QUEUE
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        var symbolSetTimeout = __symbol__('setTimeout');
        var symbolPromise = __symbol__('Promise');
        var symbolThen = __symbol__('then');
        var _microTaskQueue = [];
        var _isDrainingMicrotaskQueue = false;
        var nativeMicroTaskQueuePromise;
        function scheduleMicroTask(task) {
            // if we are not running in any task, and there has not been anything scheduled
            // we must bootstrap the initial task creation by manually scheduling the drain
            if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
                // We are not running in Task, so we need to kickstart the microtask queue.
                if (!nativeMicroTaskQueuePromise) {
                    if (global[symbolPromise]) {
                        nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                    }
                }
                if (nativeMicroTaskQueuePromise) {
                    var nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                    if (!nativeThen) {
                        // native Promise is not patchable, we need to use `then` directly
                        // issue 1078
                        nativeThen = nativeMicroTaskQueuePromise['then'];
                    }
                    nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
                }
                else {
                    global[symbolSetTimeout](drainMicroTaskQueue, 0);
                }
            }
            task && _microTaskQueue.push(task);
        }
        function drainMicroTaskQueue() {
            if (!_isDrainingMicrotaskQueue) {
                _isDrainingMicrotaskQueue = true;
                while (_microTaskQueue.length) {
                    var queue = _microTaskQueue;
                    _microTaskQueue = [];
                    for (var i = 0; i < queue.length; i++) {
                        var task = queue[i];
                        try {
                            task.zone.runTask(task, null, null);
                        }
                        catch (error) {
                            _api.onUnhandledError(error);
                        }
                    }
                }
                _api.microtaskDrainDone();
                _isDrainingMicrotaskQueue = false;
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  BOOTSTRAP
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        var NO_ZONE = { name: 'NO ZONE' };
        var notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
        var microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
        var patches = {};
        var _api = {
            symbol: __symbol__,
            currentZoneFrame: function () { return _currentZoneFrame; },
            onUnhandledError: noop,
            microtaskDrainDone: noop,
            scheduleMicroTask: scheduleMicroTask,
            showUncaughtError: function () { return !Zone[__symbol__('ignoreConsoleErrorUncaughtError')]; },
            patchEventTarget: function () { return []; },
            patchOnProperties: noop,
            patchMethod: function () { return noop; },
            bindArguments: function () { return []; },
            patchThen: function () { return noop; },
            patchMacroTask: function () { return noop; },
            setNativePromise: function (NativePromise) {
                // sometimes NativePromise.resolve static function
                // is not ready yet, (such as core-js/es6.promise)
                // so we need to check here.
                if (NativePromise && typeof NativePromise.resolve === 'function') {
                    nativeMicroTaskQueuePromise = NativePromise.resolve(0);
                }
            },
            patchEventPrototype: function () { return noop; },
            isIEOrEdge: function () { return false; },
            getGlobalObjects: function () { return undefined; },
            ObjectDefineProperty: function () { return noop; },
            ObjectGetOwnPropertyDescriptor: function () { return undefined; },
            ObjectCreate: function () { return undefined; },
            ArraySlice: function () { return []; },
            patchClass: function () { return noop; },
            wrapWithCurrentZone: function () { return noop; },
            filterProperties: function () { return []; },
            attachOriginToPatched: function () { return noop; },
            _redefineProperty: function () { return noop; },
            patchCallbacks: function () { return noop; }
        };
        var _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
        var _currentTask = null;
        var _numberOfNestedTaskFrames = 0;
        function noop() { }
        performanceMeasure('Zone', 'Zone');
        return global['Zone'] = Zone;
    })(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('ZoneAwarePromise', function (global, Zone, api) {
        var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        var ObjectDefineProperty = Object.defineProperty;
        function readableObjectToString(obj) {
            if (obj && obj.toString === Object.prototype.toString) {
                var className = obj.constructor && obj.constructor.name;
                return (className ? className : '') + ': ' + JSON.stringify(obj);
            }
            return obj ? obj.toString() : Object.prototype.toString.call(obj);
        }
        var __symbol__ = api.symbol;
        var _uncaughtPromiseErrors = [];
        var isDisableWrappingUncaughtPromiseRejection = global[__symbol__('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] === true;
        var symbolPromise = __symbol__('Promise');
        var symbolThen = __symbol__('then');
        var creationTrace = '__creationTrace__';
        api.onUnhandledError = function (e) {
            if (api.showUncaughtError()) {
                var rejection = e && e.rejection;
                if (rejection) {
                    console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
                }
                else {
                    console.error(e);
                }
            }
        };
        api.microtaskDrainDone = function () {
            var _loop_1 = function () {
                var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(function () { throw uncaughtPromiseError; });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            };
            while (_uncaughtPromiseErrors.length) {
                _loop_1();
            }
        };
        var UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
        function handleUnhandledRejection(e) {
            api.onUnhandledError(e);
            try {
                var handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
                if (typeof handler === 'function') {
                    handler.call(this, e);
                }
            }
            catch (err) {
            }
        }
        function isThenable(value) { return value && value.then; }
        function forwardResolution(value) { return value; }
        function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }
        var symbolState = __symbol__('state');
        var symbolValue = __symbol__('value');
        var symbolFinally = __symbol__('finally');
        var symbolParentPromiseValue = __symbol__('parentPromiseValue');
        var symbolParentPromiseState = __symbol__('parentPromiseState');
        var source = 'Promise.then';
        var UNRESOLVED = null;
        var RESOLVED = true;
        var REJECTED = false;
        var REJECTED_NO_CATCH = 0;
        function makeResolver(promise, state) {
            return function (v) {
                try {
                    resolvePromise(promise, state, v);
                }
                catch (err) {
                    resolvePromise(promise, false, err);
                }
                // Do not return value or you will break the Promise spec.
            };
        }
        var once = function () {
            var wasCalled = false;
            return function wrapper(wrappedFunction) {
                return function () {
                    if (wasCalled) {
                        return;
                    }
                    wasCalled = true;
                    wrappedFunction.apply(null, arguments);
                };
            };
        };
        var TYPE_ERROR = 'Promise resolved with itself';
        var CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
        // Promise Resolution
        function resolvePromise(promise, state, value) {
            var onceWrapper = once();
            if (promise === value) {
                throw new TypeError(TYPE_ERROR);
            }
            if (promise[symbolState] === UNRESOLVED) {
                // should only get value.then once based on promise spec.
                var then = null;
                try {
                    if (typeof value === 'object' || typeof value === 'function') {
                        then = value && value.then;
                    }
                }
                catch (err) {
                    onceWrapper(function () { resolvePromise(promise, false, err); })();
                    return promise;
                }
                // if (value instanceof ZoneAwarePromise) {
                if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                    value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                    value[symbolState] !== UNRESOLVED) {
                    clearRejectedNoCatch(value);
                    resolvePromise(promise, value[symbolState], value[symbolValue]);
                }
                else if (state !== REJECTED && typeof then === 'function') {
                    try {
                        then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                    }
                    catch (err) {
                        onceWrapper(function () { resolvePromise(promise, false, err); })();
                    }
                }
                else {
                    promise[symbolState] = state;
                    var queue = promise[symbolValue];
                    promise[symbolValue] = value;
                    if (promise[symbolFinally] === symbolFinally) {
                        // the promise is generated by Promise.prototype.finally
                        if (state === RESOLVED) {
                            // the state is resolved, should ignore the value
                            // and use parent promise value
                            promise[symbolState] = promise[symbolParentPromiseState];
                            promise[symbolValue] = promise[symbolParentPromiseValue];
                        }
                    }
                    // record task information in value when error occurs, so we can
                    // do some additional work such as render longStackTrace
                    if (state === REJECTED && value instanceof Error) {
                        // check if longStackTraceZone is here
                        var trace = Zone.currentTask && Zone.currentTask.data &&
                            Zone.currentTask.data[creationTrace];
                        if (trace) {
                            // only keep the long stack trace into error when in longStackTraceZone
                            ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                        }
                    }
                    for (var i = 0; i < queue.length;) {
                        scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                    }
                    if (queue.length == 0 && state == REJECTED) {
                        promise[symbolState] = REJECTED_NO_CATCH;
                        var uncaughtPromiseError = value;
                        if (!isDisableWrappingUncaughtPromiseRejection) {
                            // If disable wrapping uncaught promise reject
                            // and the rejected value is an Error object,
                            // use the value instead of wrapping it.
                            try {
                                // Here we throws a new Error to print more readable error log
                                // and if the value is not an error, zone.js builds an `Error`
                                // Object here to attach the stack information.
                                throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                                    (value && value.stack ? '\n' + value.stack : ''));
                            }
                            catch (err) {
                                uncaughtPromiseError = err;
                            }
                        }
                        uncaughtPromiseError.rejection = value;
                        uncaughtPromiseError.promise = promise;
                        uncaughtPromiseError.zone = Zone.current;
                        uncaughtPromiseError.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(uncaughtPromiseError);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
            // Resolving an already resolved promise is a noop.
            return promise;
        }
        var REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
        function clearRejectedNoCatch(promise) {
            if (promise[symbolState] === REJECTED_NO_CATCH) {
                // if the promise is rejected no catch status
                // and queue.length > 0, means there is a error handler
                // here to handle the rejected promise, we should trigger
                // windows.rejectionhandled eventHandler or nodejs rejectionHandled
                // eventHandler
                try {
                    var handler = Zone[REJECTION_HANDLED_HANDLER];
                    if (handler && typeof handler === 'function') {
                        handler.call(this, { rejection: promise[symbolValue], promise: promise });
                    }
                }
                catch (err) {
                }
                promise[symbolState] = REJECTED;
                for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
                    if (promise === _uncaughtPromiseErrors[i].promise) {
                        _uncaughtPromiseErrors.splice(i, 1);
                    }
                }
            }
        }
        function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
            clearRejectedNoCatch(promise);
            var promiseState = promise[symbolState];
            var delegate = promiseState ?
                (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
                (typeof onRejected === 'function') ? onRejected : forwardRejection;
            zone.scheduleMicroTask(source, function () {
                try {
                    var parentPromiseValue = promise[symbolValue];
                    var isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
                    if (isFinallyPromise) {
                        // if the promise is generated from finally call, keep parent promise's state and value
                        chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                        chainPromise[symbolParentPromiseState] = promiseState;
                    }
                    // should not pass value to finally callback
                    var value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                        [] :
                        [parentPromiseValue]);
                    resolvePromise(chainPromise, true, value);
                }
                catch (error) {
                    // if error occurs, should always return this error
                    resolvePromise(chainPromise, false, error);
                }
            }, chainPromise);
        }
        var ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
        var noop = function () { };
        var ZoneAwarePromise = /** @class */ (function () {
            function ZoneAwarePromise(executor) {
                var promise = this;
                if (!(promise instanceof ZoneAwarePromise)) {
                    throw new Error('Must be an instanceof Promise.');
                }
                promise[symbolState] = UNRESOLVED;
                promise[symbolValue] = []; // queue;
                try {
                    executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
                }
                catch (error) {
                    resolvePromise(promise, false, error);
                }
            }
            ZoneAwarePromise.toString = function () { return ZONE_AWARE_PROMISE_TO_STRING; };
            ZoneAwarePromise.resolve = function (value) {
                return resolvePromise(new this(null), RESOLVED, value);
            };
            ZoneAwarePromise.reject = function (error) {
                return resolvePromise(new this(null), REJECTED, error);
            };
            ZoneAwarePromise.race = function (values) {
                var resolve;
                var reject;
                var promise = new this(function (res, rej) {
                    resolve = res;
                    reject = rej;
                });
                function onResolve(value) { resolve(value); }
                function onReject(error) { reject(error); }
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var value = values_1[_i];
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
                return promise;
            };
            ZoneAwarePromise.all = function (values) { return ZoneAwarePromise.allWithCallback(values); };
            ZoneAwarePromise.allSettled = function (values) {
                var P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
                return P.allWithCallback(values, {
                    thenCallback: function (value) { return ({ status: 'fulfilled', value: value }); },
                    errorCallback: function (err) { return ({ status: 'rejected', reason: err }); }
                });
            };
            ZoneAwarePromise.allWithCallback = function (values, callback) {
                var resolve;
                var reject;
                var promise = new this(function (res, rej) {
                    resolve = res;
                    reject = rej;
                });
                // Start at 2 to prevent prematurely resolving if .then is called immediately.
                var unresolvedCount = 2;
                var valueIndex = 0;
                var resolvedValues = [];
                var _loop_2 = function (value) {
                    if (!isThenable(value)) {
                        value = this_1.resolve(value);
                    }
                    var curValueIndex = valueIndex;
                    try {
                        value.then(function (value) {
                            resolvedValues[curValueIndex] = callback ? callback.thenCallback(value) : value;
                            unresolvedCount--;
                            if (unresolvedCount === 0) {
                                resolve(resolvedValues);
                            }
                        }, function (err) {
                            if (!callback) {
                                reject(err);
                            }
                            else {
                                resolvedValues[curValueIndex] = callback.errorCallback(err);
                                unresolvedCount--;
                                if (unresolvedCount === 0) {
                                    resolve(resolvedValues);
                                }
                            }
                        });
                    }
                    catch (thenErr) {
                        reject(thenErr);
                    }
                    unresolvedCount++;
                    valueIndex++;
                };
                var this_1 = this;
                for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
                    var value = values_2[_i];
                    _loop_2(value);
                }
                // Make the unresolvedCount zero-based again.
                unresolvedCount -= 2;
                if (unresolvedCount === 0) {
                    resolve(resolvedValues);
                }
                return promise;
            };
            Object.defineProperty(ZoneAwarePromise.prototype, Symbol.toStringTag, {
                get: function () { return 'Promise'; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ZoneAwarePromise.prototype, Symbol.species, {
                get: function () { return ZoneAwarePromise; },
                enumerable: true,
                configurable: true
            });
            ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
                var C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = this.constructor || ZoneAwarePromise;
                }
                var chainPromise = new C(noop);
                var zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
                }
                return chainPromise;
            };
            ZoneAwarePromise.prototype.catch = function (onRejected) {
                return this.then(null, onRejected);
            };
            ZoneAwarePromise.prototype.finally = function (onFinally) {
                var C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = ZoneAwarePromise;
                }
                var chainPromise = new C(noop);
                chainPromise[symbolFinally] = symbolFinally;
                var zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
                }
                return chainPromise;
            };
            return ZoneAwarePromise;
        }());
        // Protect against aggressive optimizers dropping seemingly unused properties.
        // E.g. Closure Compiler in advanced mode.
        ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
        ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
        ZoneAwarePromise['race'] = ZoneAwarePromise.race;
        ZoneAwarePromise['all'] = ZoneAwarePromise.all;
        var NativePromise = global[symbolPromise] = global['Promise'];
        var ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
        var desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
        if (!desc || desc.configurable) {
            desc && delete desc.writable;
            desc && delete desc.value;
            if (!desc) {
                desc = { configurable: true, enumerable: true };
            }
            desc.get = function () {
                // if we already set ZoneAwarePromise, use patched one
                // otherwise return native one.
                return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
            };
            desc.set = function (NewNativePromise) {
                if (NewNativePromise === ZoneAwarePromise) {
                    // if the NewNativePromise is ZoneAwarePromise
                    // save to global
                    global[ZONE_AWARE_PROMISE] = NewNativePromise;
                }
                else {
                    // if the NewNativePromise is not ZoneAwarePromise
                    // for example: after load zone.js, some library just
                    // set es6-promise to global, if we set it to global
                    // directly, assertZonePatched will fail and angular
                    // will not loaded, so we just set the NewNativePromise
                    // to global[symbolPromise], so the result is just like
                    // we load ES6 Promise before zone.js
                    global[symbolPromise] = NewNativePromise;
                    if (!NewNativePromise.prototype[symbolThen]) {
                        patchThen(NewNativePromise);
                    }
                    api.setNativePromise(NewNativePromise);
                }
            };
            ObjectDefineProperty(global, 'Promise', desc);
        }
        global['Promise'] = ZoneAwarePromise;
        var symbolThenPatched = __symbol__('thenPatched');
        function patchThen(Ctor) {
            var proto = Ctor.prototype;
            var prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
            if (prop && (prop.writable === false || !prop.configurable)) {
                // check Ctor.prototype.then propertyDescriptor is writable or not
                // in meteor env, writable is false, we should ignore such case
                return;
            }
            var originalThen = proto.then;
            // Keep a reference to the original method.
            proto[symbolThen] = originalThen;
            Ctor.prototype.then = function (onResolve, onReject) {
                var _this = this;
                var wrapped = new ZoneAwarePromise(function (resolve, reject) { originalThen.call(_this, resolve, reject); });
                return wrapped.then(onResolve, onReject);
            };
            Ctor[symbolThenPatched] = true;
        }
        api.patchThen = patchThen;
        function zoneify(fn) {
            return function () {
                var resultPromise = fn.apply(this, arguments);
                if (resultPromise instanceof ZoneAwarePromise) {
                    return resultPromise;
                }
                var ctor = resultPromise.constructor;
                if (!ctor[symbolThenPatched]) {
                    patchThen(ctor);
                }
                return resultPromise;
            };
        }
        if (NativePromise) {
            patchThen(NativePromise);
            var fetch_1 = global['fetch'];
            if (typeof fetch_1 == 'function') {
                global[api.symbol('fetch')] = fetch_1;
                global['fetch'] = zoneify(fetch_1);
            }
        }
        // This is not part of public API, but it is useful for tests, so we expose it.
        Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
        return ZoneAwarePromise;
    });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Suppress closure compiler errors about unknown 'Zone' variable
     * @fileoverview
     * @suppress {undefinedVars,globalThis,missingRequire}
     */
    /// <reference types="node"/>
    // issue #989, to reduce bundle size, use short name
    /** Object.getOwnPropertyDescriptor */
    var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    /** Object.defineProperty */
    var ObjectDefineProperty = Object.defineProperty;
    /** Object.getPrototypeOf */
    var ObjectGetPrototypeOf = Object.getPrototypeOf;
    /** Object.create */
    var ObjectCreate = Object.create;
    /** Array.prototype.slice */
    var ArraySlice = Array.prototype.slice;
    /** addEventListener string const */
    var ADD_EVENT_LISTENER_STR = 'addEventListener';
    /** removeEventListener string const */
    var REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
    /** zoneSymbol addEventListener */
    var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
    /** zoneSymbol removeEventListener */
    var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
    /** true string const */
    var TRUE_STR = 'true';
    /** false string const */
    var FALSE_STR = 'false';
    /** Zone symbol prefix string const. */
    var ZONE_SYMBOL_PREFIX = Zone.__symbol__('');
    function wrapWithCurrentZone(callback, source) {
        return Zone.current.wrap(callback, source);
    }
    function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
        return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
    }
    var zoneSymbol = Zone.__symbol__;
    var isWindowExists = typeof window !== 'undefined';
    var internalWindow = isWindowExists ? window : undefined;
    var _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
    var REMOVE_ATTRIBUTE = 'removeAttribute';
    var NULL_ON_PROP_VALUE = [null];
    function bindArguments(args, source) {
        for (var i = args.length - 1; i >= 0; i--) {
            if (typeof args[i] === 'function') {
                args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
            }
        }
        return args;
    }
    function patchPrototype(prototype, fnNames) {
        var source = prototype.constructor['name'];
        var _loop_3 = function (i) {
            var name_1 = fnNames[i];
            var delegate = prototype[name_1];
            if (delegate) {
                var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name_1);
                if (!isPropertyWritable(prototypeDesc)) {
                    return "continue";
                }
                prototype[name_1] = (function (delegate) {
                    var patched = function () {
                        return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
                    };
                    attachOriginToPatched(patched, delegate);
                    return patched;
                })(delegate);
            }
        };
        for (var i = 0; i < fnNames.length; i++) {
            _loop_3(i);
        }
    }
    function isPropertyWritable(propertyDesc) {
        if (!propertyDesc) {
            return true;
        }
        if (propertyDesc.writable === false) {
            return false;
        }
        return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
    }
    var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    var isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]');
    var isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
    // we are in electron of nw, so we are both browser and nodejs
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    var isMix = typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
        !!(isWindowExists && internalWindow['HTMLElement']);
    var zoneSymbolEventNames = {};
    var wrapFn = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        var eventNameSymbol = zoneSymbolEventNames[event.type];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
        }
        var target = this || event.target || _global;
        var listener = target[eventNameSymbol];
        var result;
        if (isBrowser && target === internalWindow && event.type === 'error') {
            // window.onerror have different signiture
            // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
            // and onerror callback will prevent default when callback return true
            var errorEvent = event;
            result = listener &&
                listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
            if (result === true) {
                event.preventDefault();
            }
        }
        else {
            result = listener && listener.apply(this, arguments);
            if (result != undefined && !result) {
                event.preventDefault();
            }
        }
        return result;
    };
    function patchProperty(obj, prop, prototype) {
        var desc = ObjectGetOwnPropertyDescriptor(obj, prop);
        if (!desc && prototype) {
            // when patch window object, use prototype to check prop exist or not
            var prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
            if (prototypeDesc) {
                desc = { enumerable: true, configurable: true };
            }
        }
        // if the descriptor not exists or is not configurable
        // just return
        if (!desc || !desc.configurable) {
            return;
        }
        var onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
        if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
            return;
        }
        // A property descriptor cannot have getter/setter and be writable
        // deleting the writable and value properties avoids this error:
        //
        // TypeError: property descriptors must not specify a value or be writable when a
        // getter or setter has been specified
        delete desc.writable;
        delete desc.value;
        var originalDescGet = desc.get;
        var originalDescSet = desc.set;
        // substr(2) cuz 'onclick' -> 'click', etc
        var eventName = prop.substr(2);
        var eventNameSymbol = zoneSymbolEventNames[eventName];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
        }
        desc.set = function (newValue) {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            var target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return;
            }
            var previousValue = target[eventNameSymbol];
            if (previousValue) {
                target.removeEventListener(eventName, wrapFn);
            }
            // issue #978, when onload handler was added before loading zone.js
            // we should remove it with originalDescSet
            if (originalDescSet) {
                originalDescSet.apply(target, NULL_ON_PROP_VALUE);
            }
            if (typeof newValue === 'function') {
                target[eventNameSymbol] = newValue;
                target.addEventListener(eventName, wrapFn, false);
            }
            else {
                target[eventNameSymbol] = null;
            }
        };
        // The getter would return undefined for unassigned properties but the default value of an
        // unassigned property is null
        desc.get = function () {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            var target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return null;
            }
            var listener = target[eventNameSymbol];
            if (listener) {
                return listener;
            }
            else if (originalDescGet) {
                // result will be null when use inline event attribute,
                // such as <button onclick="func();">OK</button>
                // because the onclick function is internal raw uncompiled handler
                // the onclick will be evaluated when first time event was triggered or
                // the property is accessed, https://github.com/angular/zone.js/issues/525
                // so we should use original native get to retrieve the handler
                var value = originalDescGet && originalDescGet.call(this);
                if (value) {
                    desc.set.call(this, value);
                    if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                        target.removeAttribute(prop);
                    }
                    return value;
                }
            }
            return null;
        };
        ObjectDefineProperty(obj, prop, desc);
        obj[onPropPatchedSymbol] = true;
    }
    function patchOnProperties(obj, properties, prototype) {
        if (properties) {
            for (var i = 0; i < properties.length; i++) {
                patchProperty(obj, 'on' + properties[i], prototype);
            }
        }
        else {
            var onProperties = [];
            for (var prop in obj) {
                if (prop.substr(0, 2) == 'on') {
                    onProperties.push(prop);
                }
            }
            for (var j = 0; j < onProperties.length; j++) {
                patchProperty(obj, onProperties[j], prototype);
            }
        }
    }
    var originalInstanceKey = zoneSymbol('originalInstance');
    // wrap some native API on `window`
    function patchClass(className) {
        var OriginalClass = _global[className];
        if (!OriginalClass)
            return;
        // keep original class in global
        _global[zoneSymbol(className)] = OriginalClass;
        _global[className] = function () {
            var a = bindArguments(arguments, className);
            switch (a.length) {
                case 0:
                    this[originalInstanceKey] = new OriginalClass();
                    break;
                case 1:
                    this[originalInstanceKey] = new OriginalClass(a[0]);
                    break;
                case 2:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                    break;
                case 3:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                    break;
                case 4:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                    break;
                default:
                    throw new Error('Arg list too long.');
            }
        };
        // attach original delegate to patched function
        attachOriginToPatched(_global[className], OriginalClass);
        var instance = new OriginalClass(function () { });
        var prop;
        for (prop in instance) {
            // https://bugs.webkit.org/show_bug.cgi?id=44721
            if (className === 'XMLHttpRequest' && prop === 'responseBlob')
                continue;
            (function (prop) {
                if (typeof instance[prop] === 'function') {
                    _global[className].prototype[prop] = function () {
                        return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                    };
                }
                else {
                    ObjectDefineProperty(_global[className].prototype, prop, {
                        set: function (fn) {
                            if (typeof fn === 'function') {
                                this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                                // keep callback in wrapped function so we can
                                // use it in Function.prototype.toString to return
                                // the native one.
                                attachOriginToPatched(this[originalInstanceKey][prop], fn);
                            }
                            else {
                                this[originalInstanceKey][prop] = fn;
                            }
                        },
                        get: function () { return this[originalInstanceKey][prop]; }
                    });
                }
            }(prop));
        }
        for (prop in OriginalClass) {
            if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
                _global[className][prop] = OriginalClass[prop];
            }
        }
    }
    function copySymbolProperties(src, dest) {
        if (typeof Object.getOwnPropertySymbols !== 'function') {
            return;
        }
        var symbols = Object.getOwnPropertySymbols(src);
        symbols.forEach(function (symbol) {
            var desc = Object.getOwnPropertyDescriptor(src, symbol);
            Object.defineProperty(dest, symbol, {
                get: function () { return src[symbol]; },
                set: function (value) {
                    if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                        // if src[symbol] is not writable or not have a setter, just return
                        return;
                    }
                    src[symbol] = value;
                },
                enumerable: desc ? desc.enumerable : true,
                configurable: desc ? desc.configurable : true
            });
        });
    }
    var shouldCopySymbolProperties = false;
    function patchMethod(target, name, patchFn) {
        var proto = target;
        while (proto && !proto.hasOwnProperty(name)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && target[name]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = target;
        }
        var delegateName = zoneSymbol(name);
        var delegate = null;
        if (proto && !(delegate = proto[delegateName])) {
            delegate = proto[delegateName] = proto[name];
            // check whether proto[name] is writable
            // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
            var desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
            if (isPropertyWritable(desc)) {
                var patchDelegate_1 = patchFn(delegate, delegateName, name);
                proto[name] = function () { return patchDelegate_1(this, arguments); };
                attachOriginToPatched(proto[name], delegate);
                if (shouldCopySymbolProperties) {
                    copySymbolProperties(delegate, proto[name]);
                }
            }
        }
        return delegate;
    }
    // TODO: @JiaLiPassion, support cancel task later if necessary
    function patchMacroTask(obj, funcName, metaCreator) {
        var setNative = null;
        function scheduleTask(task) {
            var data = task.data;
            data.args[data.cbIdx] = function () { task.invoke.apply(this, arguments); };
            setNative.apply(data.target, data.args);
            return task;
        }
        setNative = patchMethod(obj, funcName, function (delegate) { return function (self, args) {
            var meta = metaCreator(self, args);
            if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
                return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(self, args);
            }
        }; });
    }
    function attachOriginToPatched(patched, original) {
        patched[zoneSymbol('OriginalDelegate')] = original;
    }
    var isDetectedIEOrEdge = false;
    var ieOrEdge = false;
    function isIE() {
        try {
            var ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
                return true;
            }
        }
        catch (error) {
        }
        return false;
    }
    function isIEOrEdge() {
        if (isDetectedIEOrEdge) {
            return ieOrEdge;
        }
        isDetectedIEOrEdge = true;
        try {
            var ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
                ieOrEdge = true;
            }
        }
        catch (error) {
        }
        return ieOrEdge;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // override Function.prototype.toString to make zone.js patched function
    // look like native function
    Zone.__load_patch('toString', function (global) {
        // patch Func.prototype.toString to let them look like native
        var originalFunctionToString = Function.prototype.toString;
        var ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
        var PROMISE_SYMBOL = zoneSymbol('Promise');
        var ERROR_SYMBOL = zoneSymbol('Error');
        var newFunctionToString = function toString() {
            if (typeof this === 'function') {
                var originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
                if (originalDelegate) {
                    if (typeof originalDelegate === 'function') {
                        return originalFunctionToString.call(originalDelegate);
                    }
                    else {
                        return Object.prototype.toString.call(originalDelegate);
                    }
                }
                if (this === Promise) {
                    var nativePromise = global[PROMISE_SYMBOL];
                    if (nativePromise) {
                        return originalFunctionToString.call(nativePromise);
                    }
                }
                if (this === Error) {
                    var nativeError = global[ERROR_SYMBOL];
                    if (nativeError) {
                        return originalFunctionToString.call(nativeError);
                    }
                }
            }
            return originalFunctionToString.call(this);
        };
        newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
        Function.prototype.toString = newFunctionToString;
        // patch Object.prototype.toString to let them look like native
        var originalObjectToString = Object.prototype.toString;
        var PROMISE_OBJECT_TO_STRING = '[object Promise]';
        Object.prototype.toString = function () {
            if (this instanceof Promise) {
                return PROMISE_OBJECT_TO_STRING;
            }
            return originalObjectToString.call(this);
        };
    });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var passiveSupported = false;
    if (typeof window !== 'undefined') {
        try {
            var options = Object.defineProperty({}, 'passive', { get: function () { passiveSupported = true; } });
            window.addEventListener('test', options, options);
            window.removeEventListener('test', options, options);
        }
        catch (err) {
            passiveSupported = false;
        }
    }
    // an identifier to tell ZoneTask do not create a new invoke closure
    var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
        useG: true
    };
    var zoneSymbolEventNames$1 = {};
    var globalSources = {};
    var EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
    var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');
    function prepareEventNames(eventName, eventNameToString) {
        var falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
        var trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
        var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    function patchEventTarget(_global, apis, patchOptions) {
        var ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
        var REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
        var LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
        var REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
        var zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
        var ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
        var PREPEND_EVENT_LISTENER = 'prependListener';
        var PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
        var invokeTask = function (task, target, event) {
            // for better performance, check isRemoved which is set
            // by removeEventListener
            if (task.isRemoved) {
                return;
            }
            var delegate = task.callback;
            if (typeof delegate === 'object' && delegate.handleEvent) {
                // create the bind version of handleEvent when invoke
                task.callback = function (event) { return delegate.handleEvent(event); };
                task.originalDelegate = delegate;
            }
            // invoke static task.invoke
            task.invoke(task, target, [event]);
            var options = task.options;
            if (options && typeof options === 'object' && options.once) {
                // if options.once is true, after invoke once remove listener here
                // only browser need to do this, nodejs eventEmitter will cal removeListener
                // inside EventEmitter.once
                var delegate_1 = task.originalDelegate ? task.originalDelegate : task.callback;
                target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate_1, options);
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = false
        var globalZoneAwareCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            var target = this || event.target || _global;
            var tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    var copyTasks = tasks.slice();
                    for (var i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = true
        var globalZoneAwareCaptureCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            var target = this || event.target || _global;
            var tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    var copyTasks = tasks.slice();
                    for (var i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        function patchEventTargetMethods(obj, patchOptions) {
            if (!obj) {
                return false;
            }
            var useGlobalCallback = true;
            if (patchOptions && patchOptions.useG !== undefined) {
                useGlobalCallback = patchOptions.useG;
            }
            var validateHandler = patchOptions && patchOptions.vh;
            var checkDuplicate = true;
            if (patchOptions && patchOptions.chkDup !== undefined) {
                checkDuplicate = patchOptions.chkDup;
            }
            var returnTarget = false;
            if (patchOptions && patchOptions.rt !== undefined) {
                returnTarget = patchOptions.rt;
            }
            var proto = obj;
            while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
                proto = ObjectGetPrototypeOf(proto);
            }
            if (!proto && obj[ADD_EVENT_LISTENER]) {
                // somehow we did not find it, but we can see it. This happens on IE for Window properties.
                proto = obj;
            }
            if (!proto) {
                return false;
            }
            if (proto[zoneSymbolAddEventListener]) {
                return false;
            }
            var eventNameToString = patchOptions && patchOptions.eventNameToString;
            // a shared global taskData to pass data for scheduleEventTask
            // so we do not need to create a new object just for pass some data
            var taskData = {};
            var nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
            var nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
                proto[REMOVE_EVENT_LISTENER];
            var nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
                proto[LISTENERS_EVENT_LISTENER];
            var nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
                proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
            var nativePrependEventListener;
            if (patchOptions && patchOptions.prepend) {
                nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                    proto[patchOptions.prepend];
            }
            /**
             * This util function will build an option object with passive option
             * to handle all possible input from the user.
             */
            function buildEventListenerOptions(options, passive) {
                if (!passiveSupported && typeof options === 'object' && options) {
                    // doesn't support passive but user want to pass an object as options.
                    // this will not work on some old browser, so we just pass a boolean
                    // as useCapture parameter
                    return !!options.capture;
                }
                if (!passiveSupported || !passive) {
                    return options;
                }
                if (typeof options === 'boolean') {
                    return { capture: options, passive: true };
                }
                if (!options) {
                    return { passive: true };
                }
                if (typeof options === 'object' && options.passive !== false) {
                    return Object.assign(Object.assign({}, options), { passive: true });
                }
                return options;
            }
            var customScheduleGlobal = function (task) {
                // if there is already a task for the eventName + capture,
                // just return, because we use the shared globalZoneAwareCallback here.
                if (taskData.isExisting) {
                    return;
                }
                return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
            };
            var customCancelGlobal = function (task) {
                // if task is not marked as isRemoved, this call is directly
                // from Zone.prototype.cancelTask, we should remove the task
                // from tasksList of target first
                if (!task.isRemoved) {
                    var symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                    var symbolEventName = void 0;
                    if (symbolEventNames) {
                        symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                    }
                    var existingTasks = symbolEventName && task.target[symbolEventName];
                    if (existingTasks) {
                        for (var i = 0; i < existingTasks.length; i++) {
                            var existingTask = existingTasks[i];
                            if (existingTask === task) {
                                existingTasks.splice(i, 1);
                                // set isRemoved to data for faster invokeTask check
                                task.isRemoved = true;
                                if (existingTasks.length === 0) {
                                    // all tasks for the eventName + capture have gone,
                                    // remove globalZoneAwareCallback and remove the task cache from target
                                    task.allRemoved = true;
                                    task.target[symbolEventName] = null;
                                }
                                break;
                            }
                        }
                    }
                }
                // if all tasks for the eventName + capture have gone,
                // we will really remove the global event callback,
                // if not, return
                if (!task.allRemoved) {
                    return;
                }
                return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
            };
            var customScheduleNonGlobal = function (task) {
                return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            var customSchedulePrepend = function (task) {
                return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            var customCancelNonGlobal = function (task) {
                return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
            };
            var customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
            var customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
            var compareTaskCallbackVsDelegate = function (task, delegate) {
                var typeOfDelegate = typeof delegate;
                return (typeOfDelegate === 'function' && task.callback === delegate) ||
                    (typeOfDelegate === 'object' && task.originalDelegate === delegate);
            };
            var compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
            var blackListedEvents = Zone[zoneSymbol('BLACK_LISTED_EVENTS')];
            var passiveEvents = _global[zoneSymbol('PASSIVE_EVENTS')];
            var makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget, prepend) {
                if (returnTarget === void 0) { returnTarget = false; }
                if (prepend === void 0) { prepend = false; }
                return function () {
                    var target = this || _global;
                    var eventName = arguments[0];
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    var delegate = arguments[1];
                    if (!delegate) {
                        return nativeListener.apply(this, arguments);
                    }
                    if (isNode && eventName === 'uncaughtException') {
                        // don't patch uncaughtException of nodejs to prevent endless loop
                        return nativeListener.apply(this, arguments);
                    }
                    // don't create the bind delegate function for handleEvent
                    // case here to improve addEventListener performance
                    // we will create the bind delegate when invoke
                    var isHandleEvent = false;
                    if (typeof delegate !== 'function') {
                        if (!delegate.handleEvent) {
                            return nativeListener.apply(this, arguments);
                        }
                        isHandleEvent = true;
                    }
                    if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                        return;
                    }
                    var passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
                    var options = buildEventListenerOptions(arguments[2], passive);
                    if (blackListedEvents) {
                        // check black list
                        for (var i = 0; i < blackListedEvents.length; i++) {
                            if (eventName === blackListedEvents[i]) {
                                if (passive) {
                                    return nativeListener.call(target, eventName, delegate, options);
                                }
                                else {
                                    return nativeListener.apply(this, arguments);
                                }
                            }
                        }
                    }
                    var capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                    var once = options && typeof options === 'object' ? options.once : false;
                    var zone = Zone.current;
                    var symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (!symbolEventNames) {
                        prepareEventNames(eventName, eventNameToString);
                        symbolEventNames = zoneSymbolEventNames$1[eventName];
                    }
                    var symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                    var existingTasks = target[symbolEventName];
                    var isExisting = false;
                    if (existingTasks) {
                        // already have task registered
                        isExisting = true;
                        if (checkDuplicate) {
                            for (var i = 0; i < existingTasks.length; i++) {
                                if (compare(existingTasks[i], delegate)) {
                                    // same callback, same capture, same event name, just return
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        existingTasks = target[symbolEventName] = [];
                    }
                    var source;
                    var constructorName = target.constructor['name'];
                    var targetSource = globalSources[constructorName];
                    if (targetSource) {
                        source = targetSource[eventName];
                    }
                    if (!source) {
                        source = constructorName + addSource +
                            (eventNameToString ? eventNameToString(eventName) : eventName);
                    }
                    // do not create a new object as task.data to pass those things
                    // just use the global shared one
                    taskData.options = options;
                    if (once) {
                        // if addEventListener with once options, we don't pass it to
                        // native addEventListener, instead we keep the once setting
                        // and handle ourselves.
                        taskData.options.once = false;
                    }
                    taskData.target = target;
                    taskData.capture = capture;
                    taskData.eventName = eventName;
                    taskData.isExisting = isExisting;
                    var data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                    // keep taskData into data to allow onScheduleEventTask to access the task information
                    if (data) {
                        data.taskData = taskData;
                    }
                    var task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                    // should clear taskData.target to avoid memory leak
                    // issue, https://github.com/angular/angular/issues/20442
                    taskData.target = null;
                    // need to clear up taskData because it is a global object
                    if (data) {
                        data.taskData = null;
                    }
                    // have to save those information to task in case
                    // application may call task.zone.cancelTask() directly
                    if (once) {
                        options.once = true;
                    }
                    if (!(!passiveSupported && typeof task.options === 'boolean')) {
                        // if not support passive, and we pass an option object
                        // to addEventListener, we should save the options to task
                        task.options = options;
                    }
                    task.target = target;
                    task.capture = capture;
                    task.eventName = eventName;
                    if (isHandleEvent) {
                        // save original delegate for compare to check duplicate
                        task.originalDelegate = delegate;
                    }
                    if (!prepend) {
                        existingTasks.push(task);
                    }
                    else {
                        existingTasks.unshift(task);
                    }
                    if (returnTarget) {
                        return target;
                    }
                };
            };
            proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
            if (nativePrependEventListener) {
                proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
            }
            proto[REMOVE_EVENT_LISTENER] = function () {
                var target = this || _global;
                var eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                var options = arguments[2];
                var capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                var delegate = arguments[1];
                if (!delegate) {
                    return nativeRemoveEventListener.apply(this, arguments);
                }
                if (validateHandler &&
                    !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                    return;
                }
                var symbolEventNames = zoneSymbolEventNames$1[eventName];
                var symbolEventName;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                var existingTasks = symbolEventName && target[symbolEventName];
                if (existingTasks) {
                    for (var i = 0; i < existingTasks.length; i++) {
                        var existingTask = existingTasks[i];
                        if (compare(existingTask, delegate)) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            existingTask.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                existingTask.allRemoved = true;
                                target[symbolEventName] = null;
                                // in the target, we have an event listener which is added by on_property
                                // such as target.onclick = function() {}, so we need to clear this internal
                                // property too if all delegates all removed
                                if (typeof eventName === 'string') {
                                    var onPropertySymbol = ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                                    target[onPropertySymbol] = null;
                                }
                            }
                            existingTask.zone.cancelTask(existingTask);
                            if (returnTarget) {
                                return target;
                            }
                            return;
                        }
                    }
                }
                // issue 930, didn't find the event name or callback
                // from zone kept existingTasks, the callback maybe
                // added outside of zone, we need to call native removeEventListener
                // to try to remove it.
                return nativeRemoveEventListener.apply(this, arguments);
            };
            proto[LISTENERS_EVENT_LISTENER] = function () {
                var target = this || _global;
                var eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                var listeners = [];
                var tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
                for (var i = 0; i < tasks.length; i++) {
                    var task = tasks[i];
                    var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                    listeners.push(delegate);
                }
                return listeners;
            };
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
                var target = this || _global;
                var eventName = arguments[0];
                if (!eventName) {
                    var keys = Object.keys(target);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                        var evtName = match && match[1];
                        // in nodejs EventEmitter, removeListener event is
                        // used for monitoring the removeListener call,
                        // so just keep removeListener eventListener until
                        // all other eventListeners are removed
                        if (evtName && evtName !== 'removeListener') {
                            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                        }
                    }
                    // remove removeListener listener finally
                    this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
                }
                else {
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    var symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (symbolEventNames) {
                        var symbolEventName = symbolEventNames[FALSE_STR];
                        var symbolCaptureEventName = symbolEventNames[TRUE_STR];
                        var tasks = target[symbolEventName];
                        var captureTasks = target[symbolCaptureEventName];
                        if (tasks) {
                            var removeTasks = tasks.slice();
                            for (var i = 0; i < removeTasks.length; i++) {
                                var task = removeTasks[i];
                                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                        if (captureTasks) {
                            var removeTasks = captureTasks.slice();
                            for (var i = 0; i < removeTasks.length; i++) {
                                var task = removeTasks[i];
                                var delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                    }
                }
                if (returnTarget) {
                    return this;
                }
            };
            // for native toString patch
            attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
            attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
            if (nativeRemoveAllListeners) {
                attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
            }
            if (nativeListeners) {
                attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
            }
            return true;
        }
        var results = [];
        for (var i = 0; i < apis.length; i++) {
            results[i] = patchEventTargetMethods(apis[i], patchOptions);
        }
        return results;
    }
    function findEventTasks(target, eventName) {
        if (!eventName) {
            var foundTasks = [];
            for (var prop in target) {
                var match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                var evtName = match && match[1];
                if (evtName && (!eventName || evtName === eventName)) {
                    var tasks = target[prop];
                    if (tasks) {
                        for (var i = 0; i < tasks.length; i++) {
                            foundTasks.push(tasks[i]);
                        }
                    }
                }
            }
            return foundTasks;
        }
        var symbolEventName = zoneSymbolEventNames$1[eventName];
        if (!symbolEventName) {
            prepareEventNames(eventName);
            symbolEventName = zoneSymbolEventNames$1[eventName];
        }
        var captureFalseTasks = target[symbolEventName[FALSE_STR]];
        var captureTrueTasks = target[symbolEventName[TRUE_STR]];
        if (!captureFalseTasks) {
            return captureTrueTasks ? captureTrueTasks.slice() : [];
        }
        else {
            return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) :
                captureFalseTasks.slice();
        }
    }
    function patchEventPrototype(global, api) {
        var Event = global['Event'];
        if (Event && Event.prototype) {
            api.patchMethod(Event.prototype, 'stopImmediatePropagation', function (delegate) { return function (self, args) {
                self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
                // we need to call the native stopImmediatePropagation
                // in case in some hybrid application, some part of
                // application will be controlled by zone, some are not
                delegate && delegate.apply(self, args);
            }; });
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCallbacks(api, target, targetName, method, callbacks) {
        var symbol = Zone.__symbol__(method);
        if (target[symbol]) {
            return;
        }
        var nativeDelegate = target[symbol] = target[method];
        target[method] = function (name, opts, options) {
            if (opts && opts.prototype) {
                callbacks.forEach(function (callback) {
                    var source = targetName + "." + method + "::" + callback;
                    var prototype = opts.prototype;
                    if (prototype.hasOwnProperty(callback)) {
                        var descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                        if (descriptor && descriptor.value) {
                            descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                            api._redefineProperty(opts.prototype, callback, descriptor);
                        }
                        else if (prototype[callback]) {
                            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                        }
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                    }
                });
            }
            return nativeDelegate.call(target, name, opts, options);
        };
        api.attachOriginToPatched(target[method], nativeDelegate);
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var globalEventHandlersEventNames = [
        'abort',
        'animationcancel',
        'animationend',
        'animationiteration',
        'auxclick',
        'beforeinput',
        'blur',
        'cancel',
        'canplay',
        'canplaythrough',
        'change',
        'compositionstart',
        'compositionupdate',
        'compositionend',
        'cuechange',
        'click',
        'close',
        'contextmenu',
        'curechange',
        'dblclick',
        'drag',
        'dragend',
        'dragenter',
        'dragexit',
        'dragleave',
        'dragover',
        'drop',
        'durationchange',
        'emptied',
        'ended',
        'error',
        'focus',
        'focusin',
        'focusout',
        'gotpointercapture',
        'input',
        'invalid',
        'keydown',
        'keypress',
        'keyup',
        'load',
        'loadstart',
        'loadeddata',
        'loadedmetadata',
        'lostpointercapture',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'mousewheel',
        'orientationchange',
        'pause',
        'play',
        'playing',
        'pointercancel',
        'pointerdown',
        'pointerenter',
        'pointerleave',
        'pointerlockchange',
        'mozpointerlockchange',
        'webkitpointerlockerchange',
        'pointerlockerror',
        'mozpointerlockerror',
        'webkitpointerlockerror',
        'pointermove',
        'pointout',
        'pointerover',
        'pointerup',
        'progress',
        'ratechange',
        'reset',
        'resize',
        'scroll',
        'seeked',
        'seeking',
        'select',
        'selectionchange',
        'selectstart',
        'show',
        'sort',
        'stalled',
        'submit',
        'suspend',
        'timeupdate',
        'volumechange',
        'touchcancel',
        'touchmove',
        'touchstart',
        'touchend',
        'transitioncancel',
        'transitionend',
        'waiting',
        'wheel'
    ];
    var documentEventNames = [
        'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
        'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
        'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
        'visibilitychange', 'resume'
    ];
    var windowEventNames = [
        'absolutedeviceorientation',
        'afterinput',
        'afterprint',
        'appinstalled',
        'beforeinstallprompt',
        'beforeprint',
        'beforeunload',
        'devicelight',
        'devicemotion',
        'deviceorientation',
        'deviceorientationabsolute',
        'deviceproximity',
        'hashchange',
        'languagechange',
        'message',
        'mozbeforepaint',
        'offline',
        'online',
        'paint',
        'pageshow',
        'pagehide',
        'popstate',
        'rejectionhandled',
        'storage',
        'unhandledrejection',
        'unload',
        'userproximity',
        'vrdisplayconnected',
        'vrdisplaydisconnected',
        'vrdisplaypresentchange'
    ];
    var htmlElementEventNames = [
        'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
        'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
        'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
    ];
    var mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
    var ieElementEventNames = [
        'activate',
        'afterupdate',
        'ariarequest',
        'beforeactivate',
        'beforedeactivate',
        'beforeeditfocus',
        'beforeupdate',
        'cellchange',
        'controlselect',
        'dataavailable',
        'datasetchanged',
        'datasetcomplete',
        'errorupdate',
        'filterchange',
        'layoutcomplete',
        'losecapture',
        'move',
        'moveend',
        'movestart',
        'propertychange',
        'resizeend',
        'resizestart',
        'rowenter',
        'rowexit',
        'rowsdelete',
        'rowsinserted',
        'command',
        'compassneedscalibration',
        'deactivate',
        'help',
        'mscontentzoom',
        'msmanipulationstatechanged',
        'msgesturechange',
        'msgesturedoubletap',
        'msgestureend',
        'msgesturehold',
        'msgesturestart',
        'msgesturetap',
        'msgotpointercapture',
        'msinertiastart',
        'mslostpointercapture',
        'mspointercancel',
        'mspointerdown',
        'mspointerenter',
        'mspointerhover',
        'mspointerleave',
        'mspointermove',
        'mspointerout',
        'mspointerover',
        'mspointerup',
        'pointerout',
        'mssitemodejumplistitemremoved',
        'msthumbnailclick',
        'stop',
        'storagecommit'
    ];
    var webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
    var formEventNames = ['autocomplete', 'autocompleteerror'];
    var detailEventNames = ['toggle'];
    var frameEventNames = ['load'];
    var frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
    var marqueeEventNames = ['bounce', 'finish', 'start'];
    var XMLHttpRequestEventNames = [
        'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
        'readystatechange'
    ];
    var IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
    var websocketEventNames = ['close', 'error', 'open', 'message'];
    var workerEventNames = ['error', 'message'];
    var eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
    function filterProperties(target, onProperties, ignoreProperties) {
        if (!ignoreProperties || ignoreProperties.length === 0) {
            return onProperties;
        }
        var tip = ignoreProperties.filter(function (ip) { return ip.target === target; });
        if (!tip || tip.length === 0) {
            return onProperties;
        }
        var targetIgnoreProperties = tip[0].ignoreProperties;
        return onProperties.filter(function (op) { return targetIgnoreProperties.indexOf(op) === -1; });
    }
    function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
        // check whether target is available, sometimes target will be undefined
        // because different browser or some 3rd party plugin.
        if (!target) {
            return;
        }
        var filteredProperties = filterProperties(target, onProperties, ignoreProperties);
        patchOnProperties(target, filteredProperties, prototype);
    }
    function propertyDescriptorPatch(api, _global) {
        if (isNode && !isMix) {
            return;
        }
        if (Zone[api.symbol('patchEvents')]) {
            // events are already been patched by legacy patch.
            return;
        }
        var supportsWebSocket = typeof WebSocket !== 'undefined';
        var ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            var internalWindow_1 = window;
            var ignoreErrorProperties = isIE ? [{ target: internalWindow_1, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow_1, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow_1));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow_1['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow_1['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            var HTMLMarqueeElement_1 = internalWindow_1['HTMLMarqueeElement'];
            if (HTMLMarqueeElement_1) {
                patchFilteredProperties(HTMLMarqueeElement_1.prototype, marqueeEventNames, ignoreProperties);
            }
            var Worker_1 = internalWindow_1['Worker'];
            if (Worker_1) {
                patchFilteredProperties(Worker_1.prototype, workerEventNames, ignoreProperties);
            }
        }
        var XMLHttpRequest = _global['XMLHttpRequest'];
        if (XMLHttpRequest) {
            // XMLHttpRequest is not available in ServiceWorker, so we need to check here
            patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        var XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('util', function (global, Zone, api) {
        api.patchOnProperties = patchOnProperties;
        api.patchMethod = patchMethod;
        api.bindArguments = bindArguments;
        api.patchMacroTask = patchMacroTask;
        // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
        // define which events will not be patched by `Zone.js`.
        // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
        // the name consistent with angular repo.
        // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
        // backwards compatibility.
        var SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
        var SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
        if (global[SYMBOL_UNPATCHED_EVENTS]) {
            global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
        }
        if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
            Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
                global[SYMBOL_BLACK_LISTED_EVENTS];
        }
        api.patchEventPrototype = patchEventPrototype;
        api.patchEventTarget = patchEventTarget;
        api.isIEOrEdge = isIEOrEdge;
        api.ObjectDefineProperty = ObjectDefineProperty;
        api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
        api.ObjectCreate = ObjectCreate;
        api.ArraySlice = ArraySlice;
        api.patchClass = patchClass;
        api.wrapWithCurrentZone = wrapWithCurrentZone;
        api.filterProperties = filterProperties;
        api.attachOriginToPatched = attachOriginToPatched;
        api._redefineProperty = Object.defineProperty;
        api.patchCallbacks = patchCallbacks;
        api.getGlobalObjects = function () { return ({ globalSources: globalSources, zoneSymbolEventNames: zoneSymbolEventNames$1, eventNames: eventNames, isBrowser: isBrowser, isMix: isMix, isNode: isNode, TRUE_STR: TRUE_STR,
            FALSE_STR: FALSE_STR, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX, ADD_EVENT_LISTENER_STR: ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR: REMOVE_EVENT_LISTENER_STR }); };
    });
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /*
     * This is necessary for Chrome and Chrome mobile, to enable
     * things like redefining `createdCallback` on an element.
     */
    var zoneSymbol$1;
    var _defineProperty;
    var _getOwnPropertyDescriptor;
    var _create;
    var unconfigurablesKey;
    function propertyPatch() {
        zoneSymbol$1 = Zone.__symbol__;
        _defineProperty = Object[zoneSymbol$1('defineProperty')] = Object.defineProperty;
        _getOwnPropertyDescriptor = Object[zoneSymbol$1('getOwnPropertyDescriptor')] =
            Object.getOwnPropertyDescriptor;
        _create = Object.create;
        unconfigurablesKey = zoneSymbol$1('unconfigurables');
        Object.defineProperty = function (obj, prop, desc) {
            if (isUnconfigurable(obj, prop)) {
                throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
            }
            var originalConfigurableFlag = desc.configurable;
            if (prop !== 'prototype') {
                desc = rewriteDescriptor(obj, prop, desc);
            }
            return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
        };
        Object.defineProperties = function (obj, props) {
            Object.keys(props).forEach(function (prop) { Object.defineProperty(obj, prop, props[prop]); });
            return obj;
        };
        Object.create = function (obj, proto) {
            if (typeof proto === 'object' && !Object.isFrozen(proto)) {
                Object.keys(proto).forEach(function (prop) {
                    proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
                });
            }
            return _create(obj, proto);
        };
        Object.getOwnPropertyDescriptor = function (obj, prop) {
            var desc = _getOwnPropertyDescriptor(obj, prop);
            if (desc && isUnconfigurable(obj, prop)) {
                desc.configurable = false;
            }
            return desc;
        };
    }
    function _redefineProperty(obj, prop, desc) {
        var originalConfigurableFlag = desc.configurable;
        desc = rewriteDescriptor(obj, prop, desc);
        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
    }
    function isUnconfigurable(obj, prop) {
        return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
    }
    function rewriteDescriptor(obj, prop, desc) {
        // issue-927, if the desc is frozen, don't try to change the desc
        if (!Object.isFrozen(desc)) {
            desc.configurable = true;
        }
        if (!desc.configurable) {
            // issue-927, if the obj is frozen, don't try to set the desc to obj
            if (!obj[unconfigurablesKey] && !Object.isFrozen(obj)) {
                _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
            }
            if (obj[unconfigurablesKey]) {
                obj[unconfigurablesKey][prop] = true;
            }
        }
        return desc;
    }
    function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
        try {
            return _defineProperty(obj, prop, desc);
        }
        catch (error) {
            if (desc.configurable) {
                // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's
                // retry with the original flag value
                if (typeof originalConfigurableFlag == 'undefined') {
                    delete desc.configurable;
                }
                else {
                    desc.configurable = originalConfigurableFlag;
                }
                try {
                    return _defineProperty(obj, prop, desc);
                }
                catch (error) {
                    var descJson = null;
                    try {
                        descJson = JSON.stringify(desc);
                    }
                    catch (error) {
                        descJson = desc.toString();
                    }
                    console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + error);
                }
            }
            else {
                throw error;
            }
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function eventTargetLegacyPatch(_global, api) {
        var _a = api.getGlobalObjects(), eventNames = _a.eventNames, globalSources = _a.globalSources, zoneSymbolEventNames = _a.zoneSymbolEventNames, TRUE_STR = _a.TRUE_STR, FALSE_STR = _a.FALSE_STR, ZONE_SYMBOL_PREFIX = _a.ZONE_SYMBOL_PREFIX;
        var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
        var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex,WebSocket'
            .split(',');
        var EVENT_TARGET = 'EventTarget';
        var apis = [];
        var isWtf = _global['wtf'];
        var WTF_ISSUE_555_ARRAY = WTF_ISSUE_555.split(',');
        if (isWtf) {
            // Workaround for: https://github.com/google/tracing-framework/issues/555
            apis = WTF_ISSUE_555_ARRAY.map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
        }
        else if (_global[EVENT_TARGET]) {
            apis.push(EVENT_TARGET);
        }
        else {
            // Note: EventTarget is not available in all browsers,
            // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
            apis = NO_EVENT_TARGET;
        }
        var isDisableIECheck = _global['__Zone_disable_IE_check'] || false;
        var isEnableCrossContextCheck = _global['__Zone_enable_cross_context_check'] || false;
        var ieOrEdge = api.isIEOrEdge();
        var ADD_EVENT_LISTENER_SOURCE = '.addEventListener:';
        var FUNCTION_WRAPPER = '[object FunctionWrapper]';
        var BROWSER_TOOLS = 'function __BROWSERTOOLS_CONSOLE_SAFEFUNC() { [native code] }';
        var pointerEventsMap = {
            'MSPointerCancel': 'pointercancel',
            'MSPointerDown': 'pointerdown',
            'MSPointerEnter': 'pointerenter',
            'MSPointerHover': 'pointerhover',
            'MSPointerLeave': 'pointerleave',
            'MSPointerMove': 'pointermove',
            'MSPointerOut': 'pointerout',
            'MSPointerOver': 'pointerover',
            'MSPointerUp': 'pointerup'
        };
        //  predefine all __zone_symbol__ + eventName + true/false string
        for (var i = 0; i < eventNames.length; i++) {
            var eventName = eventNames[i];
            var falseEventName = eventName + FALSE_STR;
            var trueEventName = eventName + TRUE_STR;
            var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
            var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
            zoneSymbolEventNames[eventName] = {};
            zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
            zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
        }
        //  predefine all task.source string
        for (var i = 0; i < WTF_ISSUE_555_ARRAY.length; i++) {
            var target = WTF_ISSUE_555_ARRAY[i];
            var targets = globalSources[target] = {};
            for (var j = 0; j < eventNames.length; j++) {
                var eventName = eventNames[j];
                targets[eventName] = target + ADD_EVENT_LISTENER_SOURCE + eventName;
            }
        }
        var checkIEAndCrossContext = function (nativeDelegate, delegate, target, args) {
            if (!isDisableIECheck && ieOrEdge) {
                if (isEnableCrossContextCheck) {
                    try {
                        var testString = delegate.toString();
                        if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                            nativeDelegate.apply(target, args);
                            return false;
                        }
                    }
                    catch (error) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
                else {
                    var testString = delegate.toString();
                    if ((testString === FUNCTION_WRAPPER || testString == BROWSER_TOOLS)) {
                        nativeDelegate.apply(target, args);
                        return false;
                    }
                }
            }
            else if (isEnableCrossContextCheck) {
                try {
                    delegate.toString();
                }
                catch (error) {
                    nativeDelegate.apply(target, args);
                    return false;
                }
            }
            return true;
        };
        var apiTypes = [];
        for (var i = 0; i < apis.length; i++) {
            var type = _global[apis[i]];
            apiTypes.push(type && type.prototype);
        }
        // vh is validateHandler to check event handler
        // is valid or not(for security check)
        api.patchEventTarget(_global, apiTypes, {
            vh: checkIEAndCrossContext,
            transferEventName: function (eventName) {
                var pointerEventName = pointerEventsMap[eventName];
                return pointerEventName || eventName;
            }
        });
        Zone[api.symbol('patchEventTarget')] = !!_global[EVENT_TARGET];
        return true;
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // we have to patch the instance since the proto is non-configurable
    function apply(api, _global) {
        var _a = api.getGlobalObjects(), ADD_EVENT_LISTENER_STR = _a.ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR = _a.REMOVE_EVENT_LISTENER_STR;
        var WS = _global.WebSocket;
        // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
        // On older Chrome, no need since EventTarget was already patched
        if (!_global.EventTarget) {
            api.patchEventTarget(_global, [WS.prototype]);
        }
        _global.WebSocket = function (x, y) {
            var socket = arguments.length > 1 ? new WS(x, y) : new WS(x);
            var proxySocket;
            var proxySocketProto;
            // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
            var onmessageDesc = api.ObjectGetOwnPropertyDescriptor(socket, 'onmessage');
            if (onmessageDesc && onmessageDesc.configurable === false) {
                proxySocket = api.ObjectCreate(socket);
                // socket have own property descriptor 'onopen', 'onmessage', 'onclose', 'onerror'
                // but proxySocket not, so we will keep socket as prototype and pass it to
                // patchOnProperties method
                proxySocketProto = socket;
                [ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR, 'send', 'close'].forEach(function (propName) {
                    proxySocket[propName] = function () {
                        var args = api.ArraySlice.call(arguments);
                        if (propName === ADD_EVENT_LISTENER_STR || propName === REMOVE_EVENT_LISTENER_STR) {
                            var eventName = args.length > 0 ? args[0] : undefined;
                            if (eventName) {
                                var propertySymbol = Zone.__symbol__('ON_PROPERTY' + eventName);
                                socket[propertySymbol] = proxySocket[propertySymbol];
                            }
                        }
                        return socket[propName].apply(socket, args);
                    };
                });
            }
            else {
                // we can patch the real socket
                proxySocket = socket;
            }
            api.patchOnProperties(proxySocket, ['close', 'error', 'message', 'open'], proxySocketProto);
            return proxySocket;
        };
        var globalWebSocket = _global['WebSocket'];
        for (var prop in WS) {
            globalWebSocket[prop] = WS[prop];
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function propertyDescriptorLegacyPatch(api, _global) {
        var _a = api.getGlobalObjects(), isNode = _a.isNode, isMix = _a.isMix;
        if (isNode && !isMix) {
            return;
        }
        if (!canPatchViaPropertyDescriptor(api, _global)) {
            var supportsWebSocket = typeof WebSocket !== 'undefined';
            // Safari, Android browsers (Jelly Bean)
            patchViaCapturingAllTheEvents(api);
            api.patchClass('XMLHttpRequest');
            if (supportsWebSocket) {
                apply(api, _global);
            }
            Zone[api.symbol('patchEvents')] = true;
        }
    }
    function canPatchViaPropertyDescriptor(api, _global) {
        var _a = api.getGlobalObjects(), isBrowser = _a.isBrowser, isMix = _a.isMix;
        if ((isBrowser || isMix) &&
            !api.ObjectGetOwnPropertyDescriptor(HTMLElement.prototype, 'onclick') &&
            typeof Element !== 'undefined') {
            // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
            // IDL interface attributes are not configurable
            var desc = api.ObjectGetOwnPropertyDescriptor(Element.prototype, 'onclick');
            if (desc && !desc.configurable)
                return false;
            // try to use onclick to detect whether we can patch via propertyDescriptor
            // because XMLHttpRequest is not available in service worker
            if (desc) {
                api.ObjectDefineProperty(Element.prototype, 'onclick', { enumerable: true, configurable: true, get: function () { return true; } });
                var div = document.createElement('div');
                var result = !!div.onclick;
                api.ObjectDefineProperty(Element.prototype, 'onclick', desc);
                return result;
            }
        }
        var XMLHttpRequest = _global['XMLHttpRequest'];
        if (!XMLHttpRequest) {
            // XMLHttpRequest is not available in service worker
            return false;
        }
        var ON_READY_STATE_CHANGE = 'onreadystatechange';
        var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
        var xhrDesc = api.ObjectGetOwnPropertyDescriptor(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE);
        // add enumerable and configurable here because in opera
        // by default XMLHttpRequest.prototype.onreadystatechange is undefined
        // without adding enumerable and configurable will cause onreadystatechange
        // non-configurable
        // and if XMLHttpRequest.prototype.onreadystatechange is undefined,
        // we should set a real desc instead a fake one
        if (xhrDesc) {
            api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, { enumerable: true, configurable: true, get: function () { return true; } });
            var req = new XMLHttpRequest();
            var result = !!req.onreadystatechange;
            // restore original desc
            api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, xhrDesc || {});
            return result;
        }
        else {
            var SYMBOL_FAKE_ONREADYSTATECHANGE_1 = api.symbol('fake');
            api.ObjectDefineProperty(XMLHttpRequestPrototype, ON_READY_STATE_CHANGE, {
                enumerable: true,
                configurable: true,
                get: function () { return this[SYMBOL_FAKE_ONREADYSTATECHANGE_1]; },
                set: function (value) { this[SYMBOL_FAKE_ONREADYSTATECHANGE_1] = value; }
            });
            var req = new XMLHttpRequest();
            var detectFunc = function () { };
            req.onreadystatechange = detectFunc;
            var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
            req.onreadystatechange = null;
            return result;
        }
    }
    // Whenever any eventListener fires, we check the eventListener target and all parents
    // for `onwhatever` properties and replace them with zone-bound functions
    // - Chrome (for now)
    function patchViaCapturingAllTheEvents(api) {
        var eventNames = api.getGlobalObjects().eventNames;
        var unboundKey = api.symbol('unbound');
        var _loop_4 = function (i) {
            var property = eventNames[i];
            var onproperty = 'on' + property;
            self.addEventListener(property, function (event) {
                var elt = event.target, bound, source;
                if (elt) {
                    source = elt.constructor['name'] + '.' + onproperty;
                }
                else {
                    source = 'unknown.' + onproperty;
                }
                while (elt) {
                    if (elt[onproperty] && !elt[onproperty][unboundKey]) {
                        bound = api.wrapWithCurrentZone(elt[onproperty], source);
                        bound[unboundKey] = elt[onproperty];
                        elt[onproperty] = bound;
                    }
                    elt = elt.parentElement;
                }
            }, true);
        };
        for (var i = 0; i < eventNames.length; i++) {
            _loop_4(i);
        }
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function registerElementPatch(_global, api) {
        var _a = api.getGlobalObjects(), isBrowser = _a.isBrowser, isMix = _a.isMix;
        if ((!isBrowser && !isMix) || !('registerElement' in _global.document)) {
            return;
        }
        var callbacks = ['createdCallback', 'attachedCallback', 'detachedCallback', 'attributeChangedCallback'];
        api.patchCallbacks(api, document, 'Document', 'registerElement', callbacks);
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    (function (_global) {
        var symbolPrefix = _global['__Zone_symbol_prefix'] || '__zone_symbol__';
        function __symbol__(name) { return symbolPrefix + name; }
        _global[__symbol__('legacyPatch')] = function () {
            var Zone = _global['Zone'];
            Zone.__load_patch('defineProperty', function (global, Zone, api) {
                api._redefineProperty = _redefineProperty;
                propertyPatch();
            });
            Zone.__load_patch('registerElement', function (global, Zone, api) {
                registerElementPatch(global, api);
            });
            Zone.__load_patch('EventTargetLegacy', function (global, Zone, api) {
                eventTargetLegacyPatch(global, api);
                propertyDescriptorLegacyPatch(api, global);
            });
        };
    })(typeof window !== 'undefined' ?
        window :
        typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {});
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var taskSymbol = zoneSymbol('zoneTask');
    function patchTimer(window, setName, cancelName, nameSuffix) {
        var setNative = null;
        var clearNative = null;
        setName += nameSuffix;
        cancelName += nameSuffix;
        var tasksByHandleId = {};
        function scheduleTask(task) {
            var data = task.data;
            function timer() {
                try {
                    task.invoke.apply(this, arguments);
                }
                finally {
                    // issue-934, task will be cancelled
                    // even it is a periodic task such as
                    // setInterval
                    if (!(task.data && task.data.isPeriodic)) {
                        if (typeof data.handleId === 'number') {
                            // in non-nodejs env, we remove timerId
                            // from local cache
                            delete tasksByHandleId[data.handleId];
                        }
                        else if (data.handleId) {
                            // Node returns complex objects as handleIds
                            // we remove task reference from timer object
                            data.handleId[taskSymbol] = null;
                        }
                    }
                }
            }
            data.args[0] = timer;
            data.handleId = setNative.apply(window, data.args);
            return task;
        }
        function clearTask(task) { return clearNative(task.data.handleId); }
        setNative =
            patchMethod(window, setName, function (delegate) { return function (self, args) {
                if (typeof args[0] === 'function') {
                    var options = {
                        isPeriodic: nameSuffix === 'Interval',
                        delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                            undefined,
                        args: args
                    };
                    var task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                    if (!task) {
                        return task;
                    }
                    // Node.js must additionally support the ref and unref functions.
                    var handle = task.data.handleId;
                    if (typeof handle === 'number') {
                        // for non nodejs env, we save handleId: task
                        // mapping in local cache for clearTimeout
                        tasksByHandleId[handle] = task;
                    }
                    else if (handle) {
                        // for nodejs env, we save task
                        // reference in timerId Object for clearTimeout
                        handle[taskSymbol] = task;
                    }
                    // check whether handle is null, because some polyfill or browser
                    // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                    if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                        typeof handle.unref === 'function') {
                        task.ref = handle.ref.bind(handle);
                        task.unref = handle.unref.bind(handle);
                    }
                    if (typeof handle === 'number' || handle) {
                        return handle;
                    }
                    return task;
                }
                else {
                    // cause an error by calling it directly.
                    return delegate.apply(window, args);
                }
            }; });
        clearNative =
            patchMethod(window, cancelName, function (delegate) { return function (self, args) {
                var id = args[0];
                var task;
                if (typeof id === 'number') {
                    // non nodejs env.
                    task = tasksByHandleId[id];
                }
                else {
                    // nodejs env.
                    task = id && id[taskSymbol];
                    // other environments.
                    if (!task) {
                        task = id;
                    }
                }
                if (task && typeof task.type === 'string') {
                    if (task.state !== 'notScheduled' &&
                        (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                        if (typeof id === 'number') {
                            delete tasksByHandleId[id];
                        }
                        else if (id) {
                            id[taskSymbol] = null;
                        }
                        // Do not cancel already canceled functions
                        task.zone.cancelTask(task);
                    }
                }
                else {
                    // cause an error by calling it directly.
                    delegate.apply(window, args);
                }
            }; });
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCustomElements(_global, api) {
        var _a = api.getGlobalObjects(), isBrowser = _a.isBrowser, isMix = _a.isMix;
        if ((!isBrowser && !isMix) || !_global['customElements'] || !('customElements' in _global)) {
            return;
        }
        var callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
        api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function eventTargetPatch(_global, api) {
        if (Zone[api.symbol('patchEventTarget')]) {
            // EventTarget is already patched.
            return;
        }
        var _a = api.getGlobalObjects(), eventNames = _a.eventNames, zoneSymbolEventNames = _a.zoneSymbolEventNames, TRUE_STR = _a.TRUE_STR, FALSE_STR = _a.FALSE_STR, ZONE_SYMBOL_PREFIX = _a.ZONE_SYMBOL_PREFIX;
        //  predefine all __zone_symbol__ + eventName + true/false string
        for (var i = 0; i < eventNames.length; i++) {
            var eventName = eventNames[i];
            var falseEventName = eventName + FALSE_STR;
            var trueEventName = eventName + TRUE_STR;
            var symbol = ZONE_SYMBOL_PREFIX + falseEventName;
            var symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
            zoneSymbolEventNames[eventName] = {};
            zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
            zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
        }
        var EVENT_TARGET = _global['EventTarget'];
        if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
            return;
        }
        api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
        return true;
    }
    function patchEvent(global, api) {
        api.patchEventPrototype(global, api);
    }
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('legacy', function (global) {
        var legacyPatch = global[Zone.__symbol__('legacyPatch')];
        if (legacyPatch) {
            legacyPatch();
        }
    });
    Zone.__load_patch('timers', function (global) {
        var set = 'set';
        var clear = 'clear';
        patchTimer(global, set, clear, 'Timeout');
        patchTimer(global, set, clear, 'Interval');
        patchTimer(global, set, clear, 'Immediate');
    });
    Zone.__load_patch('requestAnimationFrame', function (global) {
        patchTimer(global, 'request', 'cancel', 'AnimationFrame');
        patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
        patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
    });
    Zone.__load_patch('blocking', function (global, Zone) {
        var blockingMethods = ['alert', 'prompt', 'confirm'];
        for (var i = 0; i < blockingMethods.length; i++) {
            var name_2 = blockingMethods[i];
            patchMethod(global, name_2, function (delegate, symbol, name) {
                return function (s, args) {
                    return Zone.current.run(delegate, global, args, name);
                };
            });
        }
    });
    Zone.__load_patch('EventTarget', function (global, Zone, api) {
        patchEvent(global, api);
        eventTargetPatch(global, api);
        // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
        var XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
            api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
        }
        patchClass('MutationObserver');
        patchClass('WebKitMutationObserver');
        patchClass('IntersectionObserver');
        patchClass('FileReader');
    });
    Zone.__load_patch('on_property', function (global, Zone, api) {
        propertyDescriptorPatch(api, global);
    });
    Zone.__load_patch('customElements', function (global, Zone, api) {
        patchCustomElements(global, api);
    });
    Zone.__load_patch('XHR', function (global, Zone) {
        // Treat XMLHttpRequest as a macrotask.
        patchXHR(global);
        var XHR_TASK = zoneSymbol('xhrTask');
        var XHR_SYNC = zoneSymbol('xhrSync');
        var XHR_LISTENER = zoneSymbol('xhrListener');
        var XHR_SCHEDULED = zoneSymbol('xhrScheduled');
        var XHR_URL = zoneSymbol('xhrURL');
        var XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
        function patchXHR(window) {
            var XMLHttpRequest = window['XMLHttpRequest'];
            if (!XMLHttpRequest) {
                // XMLHttpRequest is not available in service worker
                return;
            }
            var XMLHttpRequestPrototype = XMLHttpRequest.prototype;
            function findPendingTask(target) { return target[XHR_TASK]; }
            var oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
            var oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            if (!oriAddListener) {
                var XMLHttpRequestEventTarget_1 = window['XMLHttpRequestEventTarget'];
                if (XMLHttpRequestEventTarget_1) {
                    var XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget_1.prototype;
                    oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
            }
            var READY_STATE_CHANGE = 'readystatechange';
            var SCHEDULED = 'scheduled';
            function scheduleTask(task) {
                var data = task.data;
                var target = data.target;
                target[XHR_SCHEDULED] = false;
                target[XHR_ERROR_BEFORE_SCHEDULED] = false;
                // remove existing event listener
                var listener = target[XHR_LISTENER];
                if (!oriAddListener) {
                    oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
                if (listener) {
                    oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
                }
                var newListener = target[XHR_LISTENER] = function () {
                    if (target.readyState === target.DONE) {
                        // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                        // readyState=4 multiple times, so we need to check task state here
                        if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                            // check whether the xhr has registered onload listener
                            // if that is the case, the task should invoke after all
                            // onload listeners finish.
                            var loadTasks = target[Zone.__symbol__('loadfalse')];
                            if (loadTasks && loadTasks.length > 0) {
                                var oriInvoke_1 = task.invoke;
                                task.invoke = function () {
                                    // need to load the tasks again, because in other
                                    // load listener, they may remove themselves
                                    var loadTasks = target[Zone.__symbol__('loadfalse')];
                                    for (var i = 0; i < loadTasks.length; i++) {
                                        if (loadTasks[i] === task) {
                                            loadTasks.splice(i, 1);
                                        }
                                    }
                                    if (!data.aborted && task.state === SCHEDULED) {
                                        oriInvoke_1.call(task);
                                    }
                                };
                                loadTasks.push(task);
                            }
                            else {
                                task.invoke();
                            }
                        }
                        else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                            // error occurs when xhr.send()
                            target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                        }
                    }
                };
                oriAddListener.call(target, READY_STATE_CHANGE, newListener);
                var storedTask = target[XHR_TASK];
                if (!storedTask) {
                    target[XHR_TASK] = task;
                }
                sendNative.apply(target, data.args);
                target[XHR_SCHEDULED] = true;
                return task;
            }
            function placeholderCallback() { }
            function clearTask(task) {
                var data = task.data;
                // Note - ideally, we would call data.target.removeEventListener here, but it's too late
                // to prevent it from firing. So instead, we store info for the event listener.
                data.aborted = true;
                return abortNative.apply(data.target, data.args);
            }
            var openNative = patchMethod(XMLHttpRequestPrototype, 'open', function () { return function (self, args) {
                self[XHR_SYNC] = args[2] == false;
                self[XHR_URL] = args[1];
                return openNative.apply(self, args);
            }; });
            var XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
            var fetchTaskAborting = zoneSymbol('fetchTaskAborting');
            var fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
            var sendNative = patchMethod(XMLHttpRequestPrototype, 'send', function () { return function (self, args) {
                if (Zone.current[fetchTaskScheduling] === true) {
                    // a fetch is scheduling, so we are using xhr to polyfill fetch
                    // and because we already schedule macroTask for fetch, we should
                    // not schedule a macroTask for xhr again
                    return sendNative.apply(self, args);
                }
                if (self[XHR_SYNC]) {
                    // if the XHR is sync there is no task to schedule, just execute the code.
                    return sendNative.apply(self, args);
                }
                else {
                    var options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                    var task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                    if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                        task.state === SCHEDULED) {
                        // xhr request throw error when send
                        // we should invoke task instead of leaving a scheduled
                        // pending macroTask
                        task.invoke();
                    }
                }
            }; });
            var abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', function () { return function (self, args) {
                var task = findPendingTask(self);
                if (task && typeof task.type == 'string') {
                    // If the XHR has already completed, do nothing.
                    // If the XHR has already been aborted, do nothing.
                    // Fix #569, call abort multiple times before done will cause
                    // macroTask task count be negative number
                    if (task.cancelFn == null || (task.data && task.data.aborted)) {
                        return;
                    }
                    task.zone.cancelTask(task);
                }
                else if (Zone.current[fetchTaskAborting] === true) {
                    // the abort is called from fetch polyfill, we need to call native abort of XHR.
                    return abortNative.apply(self, args);
                }
                // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
                // task
                // to cancel. Do nothing.
            }; });
        }
    });
    Zone.__load_patch('geolocation', function (global) {
        /// GEO_LOCATION
        if (global['navigator'] && global['navigator'].geolocation) {
            patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
        }
    });
    Zone.__load_patch('PromiseRejectionEvent', function (global, Zone) {
        // handle unhandled promise rejection
        function findPromiseRejectionHandler(evtName) {
            return function (e) {
                var eventTasks = findEventTasks(global, evtName);
                eventTasks.forEach(function (eventTask) {
                    // windows has added unhandledrejection event listener
                    // trigger the event listener
                    var PromiseRejectionEvent = global['PromiseRejectionEvent'];
                    if (PromiseRejectionEvent) {
                        var evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                        eventTask.invoke(evt);
                    }
                });
            };
        }
        if (global['PromiseRejectionEvent']) {
            Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
                findPromiseRejectionHandler('unhandledrejection');
            Zone[zoneSymbol('rejectionHandledHandler')] =
                findPromiseRejectionHandler('rejectionhandled');
        }
    });
})));




!function(){"use strict";function e(){setTimeout(function(){window.CustomEvent&&window.dispatchEvent(new CustomEvent("import-map-overrides:change"))})}window.importMapOverrides={addOverride:function(t,n){var o="import-map-override:"+t;return localStorage.setItem(o,n),e(),window.importMapOverrides.getOverrideMap()},getOverrideMap:function(){for(var e={imports:{}},t=0;t<localStorage.length;t++){var n=localStorage.key(t);n.startsWith("import-map-override:")&&(e.imports[n.slice("import-map-override:".length)]=localStorage.getItem(n))}return e},removeOverride:function(t){var n="import-map-override:"+t,o=null!==localStorage.getItem(n);return localStorage.removeItem(n),e(),o},resetOverrides:function(){return Object.keys(window.importMapOverrides.getOverrideMap().imports).forEach(function(e){window.importMapOverrides.removeOverride(e)}),e(),window.importMapOverrides.getOverrideMap()},hasOverrides:function(){return Object.keys(window.importMapOverrides.getOverrideMap().imports).length>0}};var t=window.importMapOverrides.getOverrideMap(),n=document.querySelector('meta[name="importmap-type"]'),o=n?n.getAttribute("content"):"import-map";if(Object.keys(t.imports).length>0){var r=document.createElement("script");r.type=o,r.id="import-map-overrides",r.innerHTML=JSON.stringify(t);var i=document.querySelectorAll('script[type="'.concat(o,'"]'));i.length>0?i[i.length-1].insertAdjacentElement("afterend",r):document.head.appendChild(r)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&c(e,t)}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){return(c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e,t,n){return(m=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var o=[null];o.push.apply(o,t);var r=new(Function.bind.apply(e,o));return n&&c(r,n.prototype),r}).apply(null,arguments)}function f(e){var t="function"==typeof Map?new Map:void 0;return(f=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,o)}function o(){return m(e,arguments,p(this).constructor)}return o.prototype=Object.create(e.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),c(o,e)})(e)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?v(e):t}!function(e,t){void 0===t&&(t={});var n=t.insertAt;if("undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===n&&o.firstChild?o.insertBefore(r,o.firstChild):o.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}(".imo-unstyled {\n  border: none;\n  padding: 0;\n  width: auto;\n  overflow: visible;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  line-height: normal;\n  cursor: pointer;\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n  -webkit-appearance: none;\n}\n\n.imo-unstyled::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n.imo-trigger {\n  position: fixed;\n  bottom: 0;\n  right: 0;\n  margin: 10px;\n  border-radius: 5px;\n  background-color: navajowhite;\n  height: 50px;\n  width: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  font-family: sans-serif;\n  z-index: 10500;\n}\n\n.imo-popup {\n  box-sizing: border-box;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 50%;\n  z-index: 10000;\n  background-color: black;\n  color: white;\n  font-family: sans-serif;\n  padding: 24px;\n}\n\n.imo-popup a:visited,\nimo-popup a {\n  color: white;\n}\n\n.imo-popup .imo-module-dialog {\n  left: calc(50% - 200px);\n}\n\n.imo-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n\n.imo-list {\n  margin-left: 16px;\n}\n\n.imo-list > *:not(:last-child) {\n  margin-bottom: 8px;\n}\n\n.imo-list-container {\n  font-family: sans-serif;\n}\n\n.imo-module-dialog {\n  position: fixed;\n  z-index: 30000000;\n  top: 30%;\n  max-width: 600px;\n  margin: 0 auto;\n  border: 4px solid navajowhite;\n}\n\n.imo-module-dialog input {\n  width: 100%;\n}\n\n.imo-module-dialog table {\n  margin-bottom: 16px;\n}\n\n.imo-module-dialog input {\n  font-size: 16px;\n}\n\n.imo-module-dialog table td:first-child {\n  text-align: right;\n  padding-right: 16px;\n  word-break: keep-all;\n}\n\n.imo-module-dialog table td {\n  word-break: break-all;\n}\n\n.imo-module-dialog.imo-overridden {\n  border: 4px solid salmon;\n}\n\n.imo-list-container button,\n.imo-modal-container button {\n  padding: 6px 16px;\n  font-size: 16px;\n  text-align: center;\n}\n\nbutton.imo-default {\n  background-color: navajowhite;\n}\n\nbutton.imo-overridden,\n.imo-trigger.imo-overridden {\n  background-color: salmon;\n  font-weight: bold;\n}\n\n.imo-add-new {\n  margin-top: 16px;\n  margin-left: 16px;\n}\n\n.imo-clear-input {\n  position: absolute;\n  top: 0;\n  right: 0;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  height: 100%;\n}\n\n.imo-modal-container {\n  font-family: sans-serif;\n}\n\n.imo-modal {\n  background-color: rgba(61, 70, 77, 0.6);\n  position: fixed;\n  width: 100vw;\n  height: 100vh;\n  top: 0;\n  left: 0;\n  z-index: 20000000;\n}\n");var g=function(){},y={},b=[],w=[];function _(e,t){var n,o,r,i,l=w;for(i=arguments.length;i-- >2;)b.push(arguments[i]);for(t&&null!=t.children&&(b.length||b.push(t.children),delete t.children);b.length;)if((o=b.pop())&&void 0!==o.pop)for(i=o.length;i--;)b.push(o[i]);else"boolean"==typeof o&&(o=null),(r="function"!=typeof e)&&(null==o?o="":"number"==typeof o?o=String(o):"string"!=typeof o&&(r=!1)),r&&n?l[l.length-1]+=o:l===w?l=[o]:l.push(o),n=r;var a=new g;return a.nodeName=e,a.children=l,a.attributes=null==t?void 0:t,a.key=null==t?void 0:t.key,a}function N(e,t){for(var n in t)e[n]=t[n];return e}function x(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var k="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,M=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,C=[];function O(e){!e._dirty&&(e._dirty=!0)&&1==C.push(e)&&k(S)}function S(){for(var e;e=C.pop();)e._dirty&&J(e)}function U(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&E(e,t.nodeName):n||e._componentConstructor===t.nodeName}function E(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function P(e){var t=N({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function j(e){var t=e.parentNode;t&&t.removeChild(e)}function T(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)x(n,null),x(o,e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===M.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,D,l):e.removeEventListener(t,D,l),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(e){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var a=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function D(e){return this._listeners[e.type](e)}var I=[],L=0,A=!1,R=!1;function B(){for(var e;e=I.shift();)e.componentDidMount&&e.componentDidMount()}function z(e,t,n,o,r,i){L++||(A=null!=r&&void 0!==r.ownerSVGElement,R=null!=e&&!("__preactattr_"in e));var l=function e(t,n,o,r,i){var l=t,a=A;if(null!=n&&"boolean"!=typeof n||(n=""),"string"==typeof n||"number"==typeof n)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||i)?t.nodeValue!=n&&(t.nodeValue=n):(l=document.createTextNode(n),t&&(t.parentNode&&t.parentNode.replaceChild(l,t),W(t,!0))),l.__preactattr_=!0,l;var u,d,s=n.nodeName;if("function"==typeof s)return function(e,t,n,o){for(var r=e&&e._component,i=r,l=e,a=r&&e._componentConstructor===t.nodeName,u=a,d=P(t);r&&!u&&(r=r._parentComponent);)u=r.constructor===t.nodeName;return r&&u&&(!o||r._component)?($(r,d,3,n,o),e=r.base):(i&&!a&&(G(i),e=l=null),r=V(t.nodeName,d,n),e&&!r.nextBase&&(r.nextBase=e,l=null),$(r,d,1,n,o),e=r.base,l&&e!==l&&(l._component=null,W(l,!1))),e}(t,n,o,r);if(A="svg"===s||"foreignObject"!==s&&A,s=String(s),(!t||!E(t,s))&&(u=s,(d=A?document.createElementNS("http://www.w3.org/2000/svg",u):document.createElement(u)).normalizedNodeName=u,l=d,t)){for(;t.firstChild;)l.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(l,t),W(t,!0)}var p=l.firstChild,c=l.__preactattr_,m=n.children;if(null==c){c=l.__preactattr_={};for(var f=l.attributes,v=f.length;v--;)c[f[v].name]=f[v].value}return!R&&m&&1===m.length&&"string"==typeof m[0]&&null!=p&&void 0!==p.splitText&&null==p.nextSibling?p.nodeValue!=m[0]&&(p.nodeValue=m[0]):(m&&m.length||null!=p)&&function(t,n,o,r,i){var l,a,u,d,s,p=t.childNodes,c=[],m={},f=0,v=0,h=p.length,g=0,y=n?n.length:0;if(0!==h)for(var b=0;b<h;b++){var w=p[b],_=w.__preactattr_,N=y&&_?w._component?w._component.__key:_.key:null;null!=N?(f++,m[N]=w):(_||(void 0!==w.splitText?!i||w.nodeValue.trim():i))&&(c[g++]=w)}if(0!==y)for(var b=0;b<y;b++){d=n[b],s=null;var N=d.key;if(null!=N)f&&void 0!==m[N]&&(s=m[N],m[N]=void 0,f--);else if(v<g)for(l=v;l<g;l++)if(void 0!==c[l]&&U(a=c[l],d,i)){s=a,c[l]=void 0,l===g-1&&g--,l===v&&v++;break}s=e(s,d,o,r),u=p[b],s&&s!==t&&s!==u&&(null==u?t.appendChild(s):s===u.nextSibling?j(u):t.insertBefore(s,u))}if(f)for(var b in m)void 0!==m[b]&&W(m[b],!1);for(;v<=g;)void 0!==(s=c[g--])&&W(s,!1)}(l,m,o,r,R||null!=c.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||T(e,o,n[o],n[o]=void 0,A);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||T(e,o,n[o],n[o]=t[o],A)}(l,n.attributes,c),A=a,l}(e,t,n,o,i);return r&&l.parentNode!==r&&r.appendChild(l),--L||(R=!1,i||B()),l}function W(e,t){var n=e._component;n?G(n):(null!=e.__preactattr_&&x(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||j(e),F(e))}function F(e){for(e=e.lastChild;e;){var t=e.previousSibling;W(e,!0),e=t}}var H=[];function V(e,t,n){var o,r=H.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),K.call(o,t,n)):((o=new K(t,n)).constructor=e,o.render=q);r--;)if(H[r].constructor===e)return o.nextBase=H[r].nextBase,H.splice(r,1),o;return o}function q(e,t,n){return this.constructor(e,n)}function $(e,t,n,o,r){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o)),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===y.syncComponentUpdates&&e.base?O(e):J(e,1,r)),x(e.__ref,e))}function J(e,t,n,o){if(!e._disable){var r,i,l,a=e.props,u=e.state,d=e.context,s=e.prevProps||a,p=e.prevState||u,c=e.prevContext||d,m=e.base,f=e.nextBase,v=m||f,h=e._component,g=!1,y=c;if(e.constructor.getDerivedStateFromProps&&(u=N(N({},u),e.constructor.getDerivedStateFromProps(a,u)),e.state=u),m&&(e.props=s,e.state=p,e.context=c,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(a,u,d)?g=!0:e.componentWillUpdate&&e.componentWillUpdate(a,u,d),e.props=a,e.state=u,e.context=d),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!g){r=e.render(a,u,d),e.getChildContext&&(d=N(N({},d),e.getChildContext())),m&&e.getSnapshotBeforeUpdate&&(y=e.getSnapshotBeforeUpdate(s,p));var b,w,_=r&&r.nodeName;if("function"==typeof _){var x=P(r);(i=h)&&i.constructor===_&&x.key==i.__key?$(i,x,1,d,!1):(b=i,e._component=i=V(_,x,d),i.nextBase=i.nextBase||f,i._parentComponent=e,$(i,x,0,d,!1),J(i,1,n,!0)),w=i.base}else l=v,(b=h)&&(l=e._component=null),(v||1===t)&&(l&&(l._component=null),w=z(l,r,d,n||!m,v&&v.parentNode,!0));if(v&&w!==v&&i!==h){var k=v.parentNode;k&&w!==k&&(k.replaceChild(w,v),b||(v._component=null,W(v,!1)))}if(b&&G(b),e.base=w,w&&!o){for(var M=e,C=e;C=C._parentComponent;)(M=C).base=w;w._component=M,w._componentConstructor=M.constructor}}for(!m||n?I.push(e):g||e.componentDidUpdate&&e.componentDidUpdate(s,p,y);e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);L||o||B()}}function G(e){var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?G(n):t&&(null!=t.__preactattr_&&x(t.__preactattr_.ref,null),e.nextBase=t,j(t),H.push(e),F(t)),x(e.__ref,null)}function K(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function Q(e,t,n){return z(n,e,{},!1,t,!1)}N(K.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=N(N({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),O(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),J(this,2)},render:function(){}});var X=function(e){function t(){var e,n;l(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return d(v(n=h(this,(e=p(t)).call.apply(e,[this].concat(r)))),"getInitialOverrideUrl",function(){var e=new RegExp("//localhost:([0-9]+)/".concat(ee(n.props.module.moduleName))).exec(n.props.module.overrideUrl);return e?e[1]:n.props.module.overrideUrl?n.props.module.overrideUrl:""}),d(v(n),"state",{overrideUrl:n.getInitialOverrideUrl(),moduleName:""}),d(v(n),"inputEl",null),d(v(n),"moduleNameEl",null),d(v(n),"handleInputRef",function(e){n.inputEl=e}),d(v(n),"handleModuleNameRef",function(e){n.moduleNameEl=e}),d(v(n),"dialogRef",function(e){n.dialogEl=e}),d(v(n),"handleSubmit",function(e){e.preventDefault();var t=n.getDerivedUrl();n.props.module.isNew?n.props.addNewModule(n.state.moduleName,t):n.props.updateModuleUrl(t)}),d(v(n),"getDerivedUrl",function(){var e=n.props.module.isNew?n.state.moduleName:n.props.module.moduleName;return Y.test(n.state.overrideUrl)?"//localhost:".concat(n.state.overrideUrl,"/").concat(ee(e)):n.state.overrideUrl}),d(v(n),"keyDown",function(e){"Escape"===e.key&&(e.stopPropagation(),n.props.cancel())}),d(v(n),"focusFirstInput",function(){(n.moduleNameEl||n.inputEl).select()}),d(v(n),"clearModuleName",function(){n.setState({moduleName:""},function(){n.focusFirstInput()})}),d(v(n),"clearInput",function(){n.setState({overrideUrl:""},function(){n.focusFirstInput()})}),n}return s(t,K),u(t,[{key:"componentDidMount",value:function(){this.focusFirstInput(),this.dialogEl.addEventListener("keydown",this.keyDown)}},{key:"componentDidUpdate",value:function(e,t){var n=this;this.props.module!==e.module&&this.setState({overrideUrl:this.props.module.overrideUrl||""},function(){n.focusFirstInput()})}},{key:"componentWillUnmount",value:function(){this.dialogEl.removeEventListener("keydown",this.keyDown)}},{key:"render",value:function(e){var t=this,n=e.module;return _("div",{className:"imo-modal-container"},_("div",{className:"imo-modal"}),_("dialog",{className:"imo-module-dialog ".concat(this.state.overrideUrl.length>0?"imo-overridden":"imo-default"),open:!0,ref:this.dialogRef},_("form",{method:"dialog",onSubmit:this.handleSubmit},_("h3",{style:{marginTop:0}},n.moduleName),_("table",null,_("tbody",null,!n.isNew&&_("tr",null,_("td",null,"Default URL:"),_("td",null,n.defaultUrl)),n.isNew&&_("tr",null,_("td",null,_("span",{id:"module-name-label"},"Module Name:")),_("td",{style:{position:"relative"}},_("input",{type:"text",value:this.state.moduleName,"aria-labelledby":"module-name-label",onInput:function(e){return t.setState({moduleName:e.target.value})},ref:this.handleModuleNameRef,required:!0}),_("div",{role:"button",tabIndex:0,className:"imo-clear-input",onClick:this.clearModuleName},_("div",null,"ⓧ")))),_("tr",null,_("td",null,_("span",{id:"override-url-label"},"Override URL:")),_("td",{style:{position:"relative"}},_("input",{ref:this.handleInputRef,type:"text",value:this.state.overrideUrl,"aria-labelledby":"override-url-label",onInput:function(e){return t.setState({overrideUrl:e.target.value})}}),_("div",{role:"button",tabIndex:0,className:"imo-clear-input",onClick:this.clearInput},_("div",null,"ⓧ")))),Y.test(this.state.overrideUrl)&&_("tr",null,_("td",null,"Derived url:"),_("td",null,this.getDerivedUrl())))),_("div",{className:"imo-dialog-actions"},_("button",{type:"button",onClick:this.props.cancel,style:{marginRight:"16px"}},"Cancel"),_("button",{type:"submit",className:this.state.overrideUrl?"imo-overridden":"imo-default"},this.state.overrideUrl?"Apply override":"Reset to default")))))}}]),t}(),Y=/^\d+$/,Z=/^@.+\/.+$/;function ee(e){return Z.test(e)&&(e=e.slice(e.indexOf("/")+1)),e.replace(/\//g,"")+".js"}var te=function(e){function t(){var e,n;l(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return d(v(n=h(this,(e=p(t)).call.apply(e,[this].concat(r)))),"state",{notOverriddenMap:{imports:{}},dialogModule:null}),d(v(n),"cancel",function(){n.setState({dialogModule:null})}),d(v(n),"updateModuleUrl",function(e){null===(e=e||null)?window.importMapOverrides.removeOverride(n.state.dialogModule.moduleName):window.importMapOverrides.addOverride(n.state.dialogModule.moduleName,e),n.setState({dialogModule:null})}),d(v(n),"addNewModule",function(e,t){e&&t&&window.importMapOverrides.addOverride(e,t),n.setState({dialogModule:null})}),n}return s(t,K),u(t,[{key:"componentDidMount",value:function(){var e=this;Array.prototype.reduce.call(document.querySelectorAll('script[type="'.concat(o,'"]')),function(e,t){return"import-map-overrides"===t.id?e:(n=t.src?fetch(t.src).then(function(e){return e.json()}):Promise.resolve(JSON.parse(t.textContent)),Promise.all([e,n]).then(function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var l,a=e[Symbol.iterator]();!(o=(l=a.next()).done)&&(n.push(l.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==a.return||a.return()}finally{if(r)throw i}}return n}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}());return function(e,t){for(var n in t.imports)e.imports[n]=t.imports[n];for(var o in t.scopes)e.scopes[o]=t.scopes[o];return e}(o[0],o[1])}));var n},Promise.resolve(this.state.notOverriddenMap)).then(function(t){e.setState({notOverriddenMap:t})})}},{key:"componentDidUpdate",value:function(e,t){!t.dialogModule&&this.state.dialogModule?(this.dialogContainer=document.createElement("div"),document.body.appendChild(this.dialogContainer),Q(_(X,{module:this.state.dialogModule,cancel:this.cancel,updateModuleUrl:this.updateModuleUrl,addNewModule:this.addNewModule}),this.dialogContainer)):t.dialogModule&&!this.state.dialogModule&&(Q(null,this.dialogContainer),this.dialogContainer.remove(),delete this.dialogContainer)}},{key:"render",value:function(){var e=this,t=[],n=[],o=window.importMapOverrides.getOverrideMap().imports;return Object.keys(this.state.notOverriddenMap.imports).forEach(function(r){var i={moduleName:r,defaultUrl:e.state.notOverriddenMap.imports[r],overrideUrl:o[r]};o[r]?t.push(i):n.push(i)}),Object.keys(o).forEach(function(e){t.some(function(t){return t.moduleName===e})||t.push({moduleName:e,defaultUrl:null,overrideUrl:o[e]})}),t.sort(ne),n.sort(ne),_("div",{className:"imo-list-container"},_("div",null,_("h3",null,"Overridden Modules"),_("div",{className:"imo-list"},0===t.length&&_("div",null,"(No overridden modules)"),t.map(function(t){return _("div",null,_("button",{className:"imo-overridden",onClick:function(){return e.setState({dialogModule:t})}},t.moduleName))}))),_("div",{className:"imo-add-new"},_("button",{onClick:function(){return e.setState({dialogModule:{moduleName:"New module",isNew:!0}})}},"Add new module")),_("div",null,_("h3",null,"Default Modules"),_("div",{className:"imo-list"},0===n.length&&_("div",null,"(No default modules)"),n.map(function(t){return _("div",null,_("button",{className:"imo-default",onClick:function(){return e.setState({dialogModule:t})}},t.moduleName))}))))}}]),t}();function ne(e,t){return e.moduleName>t.moduleName}var oe=function(e){function t(){var e,n;l(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return d(v(n=h(this,(e=p(t)).call.apply(e,[this].concat(r)))),"keydownListener",function(e){"Escape"===e.key&&n.props.close&&n.props.close()}),n}return s(t,K),u(t,[{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.keydownListener)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.keydownListener)}},{key:"render",value:function(e){return _("div",{className:"imo-popup"},_("div",{className:"imo-header"},_("div",null,_("h1",null,"Import Map Overrides"),_("p",null,"This developer tool allows you to view and override your import maps."," ",_("a",{target:"_blank",href:"https://github.com/joeldenning/import-map-overrides"},"See documentation for more info"),".")),_("button",{className:"imo-unstyled",onClick:e.close},"ⓧ")),_(te,{importMapChanged:this.props.importMapChanged}))}}]),t}(),re=function(e){function t(){var e,n;l(this,t);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return d(v(n=h(this,(e=p(t)).call.apply(e,[this].concat(r)))),"state",{showingPopup:!1}),d(v(n),"toggleTrigger",function(){n.setState(function(e){return{showingPopup:!e.showingPopup}})}),d(v(n),"importMapChanged",function(){n.forceUpdate()}),n}return s(t,K),u(t,[{key:"render",value:function(e,t){var n=Object.keys(window.importMapOverrides.getOverrideMap().imports).length>0;return _("div",null,_("button",{onClick:this.toggleTrigger,className:"imo-unstyled imo-trigger ".concat(n?"imo-overridden":"")},"{···}"),t.showingPopup&&_(oe,{close:this.toggleTrigger,importMapChanged:this.importMapChanged}))}}]),t}();function ie(e){return function(t){function n(){return l(this,n),h(this,p(n).apply(this,arguments))}return s(n,f(HTMLElement)),u(n,[{key:"connectedCallback",value:function(){Q(_(e,this),this)}},{key:"disconnectedCallback",value:function(){Q(null,this)}}]),n}()}window.customElements&&(window.customElements.define("import-map-overrides-full",ie(re)),window.customElements.define("import-map-overrides-popup",ie(oe)),window.customElements.define("import-map-overrides-list",ie(te)))}();
//# sourceMappingURL=import-map-overrides.js.map



/*
* SystemJS 4.0.0
*/
!function(){const t="undefined"!=typeof self,e=t?self:global;let n;if("undefined"!=typeof document){const t=document.querySelector("base[href]");t&&(n=t.href)}if(!n&&"undefined"!=typeof location){const t=(n=location.href.split("#")[0].split("?")[0]).lastIndexOf("/");-1!==t&&(n=n.slice(0,t+1))}const o=/\\/g;function r(t,e){if(-1!==t.indexOf("\\")&&(t=t.replace(o,"/")),"/"===t[0]&&"/"===t[1])return e.slice(0,e.indexOf(":")+1)+t;if("."===t[0]&&("/"===t[1]||"."===t[1]&&("/"===t[2]||2===t.length&&(t+="/"))||1===t.length&&(t+="/"))||"/"===t[0]){const n=e.slice(0,e.indexOf(":")+1);let o;if(o="/"===e[n.length+1]?"file:"!==n?(o=e.slice(n.length+2)).slice(o.indexOf("/")+1):e.slice(8):e.slice(n.length+("/"===e[n.length])),"/"===t[0])return e.slice(0,e.length-o.length-1)+t;const r=o.slice(0,o.lastIndexOf("/")+1)+t,i=[];let c=-1;for(let t=0;t<r.length;t++)-1!==c?"/"===r[t]&&(i.push(r.slice(c,t+1)),c=-1):"."===r[t]?"."!==r[t+1]||"/"!==r[t+2]&&t+2!==r.length?"/"===r[t+1]||t+1===r.length?t+=1:c=t:(i.pop(),t+=2):c=t;return-1!==c&&i.push(r.slice(c)),e.slice(0,e.length-o.length)+i.join("")}}function i(t,e){return r(t,e)||-1!==t.indexOf(":")&&t||r("./"+t,e)}function c(t,e){var n={};for(var o in t){var c=t[o];"string"==typeof c&&(n[r(o,e)||o]=i(c,e))}return n}function s(t,e){if(e[t])return t;let n=t.length;do{const o=t.slice(0,n+1);if(o in e)return o}while(-1!==(n=t.lastIndexOf("/",n-1)))}function u(t,e){const n=s(t,e);if(n){const o=e[n];return null===o&&t.length>n.length&&"/"!==o[o.length-1]&&console.warn("Invalid package target "+o+" for '"+n+"' should have a trailing '/'."),o+t.slice(n.length)}}const l="undefined"!=typeof Symbol,f=l&&Symbol.toStringTag,d=l?Symbol():"@";function a(){this[d]={}}const h=a.prototype;let p;h.import=function(t,e){const n=this;return Promise.resolve(n.resolve(t,e)).then(function(t){const e=function t(e,n,o){let r=e[d][n];if(r)return r;const i=[],c=Object.create(null);f&&Object.defineProperty(c,f,{value:"Module"});let s=Promise.resolve().then(function(){return e.instantiate(n,o)}).then(function(t){if(!t)throw Error("Module "+n+" did not instantiate");const o=t[1](function(t,e){r.h=!0;let n=!1;if("object"!=typeof t)t in c&&c[t]===e||(c[t]=e,n=!0);else for(let e in t){let o=t[e];e in c&&c[e]===o||(c[e]=o,n=!0)}if(n)for(let t=0;t<i.length;t++)i[t](c);return e},2===t[1].length?{import:function(t){return e.import(t,n)},meta:e.createContext(n)}:void 0);return r.e=o.execute||function(){},[t[0],o.setters||[]]});const u=(s=s.catch(function(t){throw e.onload(r.id,t),t})).then(function(o){return Promise.all(o[0].map(function(r,i){const c=o[1][i];return Promise.resolve(e.resolve(r,n)).then(function(o){const r=t(e,o,n);return Promise.resolve(r.I).then(function(){return c&&(r.i.push(c),!r.h&&r.I||c(r.n)),r})})})).then(function(t){r.d=t})});return u.catch(function(t){r.e=null,r.er=t}),r=e[d][n]={id:n,i:i,n:c,I:s,L:u,h:!1,d:void 0,e:void 0,er:void 0,E:void 0,C:void 0}}(n,t);return e.C||function(t,e){return e.C=function t(e,n,o){if(!o[n.id])return o[n.id]=!0,Promise.resolve(n.L).then(function(){return Promise.all(n.d.map(function(n){return t(e,n,o)}))})}(t,e,{}).then(function(){return function t(e,n,o){if(o[n.id])return;if(o[n.id]=!0,!n.e){if(n.er)throw n.er;return n.E?n.E:void 0}let r;return n.d.forEach(function(i){try{const c=t(e,i,o);c&&(r=r||[]).push(c)}catch(t){throw e.onload(n.id,t),t}}),r?Promise.all(r).then(i).catch(function(t){throw e.onload(n.id,t),t}):i();function i(){try{let t=n.e.call(m);if(t)return t=t.then(function(){n.C=n.n,n.E=null,e.onload(n.id,null)},function(t){throw e.onload(n.id,t),t}),n.E=n.E||t;n.C=n.n,e.onload(n.id,null)}catch(t){throw e.onload(n.id,t),n.er=t,t}finally{n.L=n.I=void 0,n.e=null}}}(t,e,{})}).then(function(){return e.n})}(n,e)})},h.createContext=function(t){return{url:t}},h.onload=function(){},h.register=function(t,e){p=[t,e]},h.getRegister=function(){const t=p;return p=void 0,t};const m=Object.freeze(Object.create(null));let g;e.System=new a,"undefined"!=typeof window&&window.addEventListener("error",function(t){g=t.error});const y=h.register;h.register=function(t,e){g=void 0,y.call(this,t,e)},h.instantiate=function(t,e){const n=this;return t.endsWith(".json")?fetch(t).then(function(t){return t.text()}).then(function(t){return[[],function(e){return{execute:function(){e("default",JSON.parse(t))}}}]}):new Promise(function(o,r){const i=document.createElement("script");i.charset="utf-8",i.async=!0,i.crossOrigin="anonymous",i.addEventListener("error",function(){r(Error("Error loading "+t+(e?" from "+e:"")))}),i.addEventListener("load",function(){if(document.head.removeChild(i),g)return r(g),g=void 0;o(n.getRegister())}),i.src=t,document.head.appendChild(i)})},t&&"function"==typeof importScripts&&(h.instantiate=function(t){const e=this;return new Promise(function(n,o){try{importScripts(t)}catch(t){o(t)}n(e.getRegister())})}),function(t){const e=System.constructor.prototype;let n,o,r;const i=e.import;e.import=function(e,c){return function(){n=o=void 0;for(let e in t)t.hasOwnProperty(e)&&(n?o||(o=e):n=e,r=e)}(),i.call(this,e,c)};const c=[[],function(){return{}}],s=e.getRegister;e.getRegister=function(){const e=s.call(this);if(e)return e;const i=function(){let e,i=0;for(let r in t)if(t.hasOwnProperty(r)){if(0===i&&r!==n||1===i&&r!==o)return r;i++,e=r}if(e!==r)return e}();if(!i)return c;let u;try{u=t[i]}catch(t){return c}return[[],function(t){return{execute:function(){t({default:u,__useDefault:!0})}}}]}}("undefined"!=typeof self?self:global);const v=h.instantiate;h.instantiate=function(t,e){return".wasm"!==t.slice(-5)?v.call(this,t,e):fetch(t).then(function(t){if(!t.ok)throw Error(t.status+" "+t.statusText+" "+t.url+(e?" loading from "+e:""));return WebAssembly.compileStreaming?WebAssembly.compileStreaming(t):t.arrayBuffer().then(function(t){return WebAssembly.compile(t)})}).then(function(t){const e=[],n=[],o={};return WebAssembly.Module.imports&&WebAssembly.Module.imports(t).forEach(function(t){const r=t.module;n.push(function(t){o[r]=t}),-1===e.indexOf(r)&&e.push(r)}),[e,function(e){return{setters:n,execute:function(){return WebAssembly.instantiate(t,o).then(function(t){e(t.exports)})}}}]})};const b=Object.create(null);b.imports=Object.create(null),b.scopes=Object.create(null);let O=Promise.resolve(b),E="undefined"!=typeof document;E&&Array.prototype.forEach.call(document.querySelectorAll('script[type="systemjs-importmap"][src]'),function(t){t._j=fetch(t.src).then(function(t){return t.json()})}),h.resolve=function(t,e){return e=e||n,E&&(E=!1,Array.prototype.forEach.call(document.querySelectorAll('script[type="systemjs-importmap"]'),function(t){O=O.then(function(e){return(t._j||t.src&&fetch(t.src).then(function(t){return t.json()})||Promise.resolve(JSON.parse(t.innerHTML))).then(function(o){return function(t,e){for(let n in e.imports)t.imports[n]=e.imports[n];for(let n in e.scopes)t.scopes[n]=e.scopes[n];return t}(e,function(t,e){const n=c(t.imports,e)||{},o={};if(t.scopes)for(let n in t.scopes){const r=t.scopes[n];let s=i(n,e);"/"!==s[s.length-1]&&(s+="/"),o[s]=c(r,s)||{}}return{imports:n,scopes:o}}(o,t.src||n))})})})),O.then(function(n){return function(t,e,n){const o=r(t,e)||-1!==t.indexOf(":")&&t;o&&(t=o);const i=s(e,n.scopes);if(i){const e=u(t,n.scopes[i]);if(e)return e}return u(t,n.imports)||o||function(t,e){throw Error('Unable to resolve bare specifier "'+t+(e?'" from '+e:'"'))}(t,e)}(t,e,n)})};const w="undefined"!=typeof Symbol&&Symbol.toStringTag;h.get=function(t){const e=this[d][t];if(e&&null===e.e&&!e.E)return e.er?null:e.n},h.set=function(t,e){let n;w&&"Module"===e[w]?n=e:(n=Object.assign(Object.create(null),e),w&&Object.defineProperty(n,w,{value:"Module"}));const o=Promise.resolve(n);return this.delete(t),this[d][t]={id:t,i:[],n:n,I:o,L:o,h:!1,d:[],e:null,er:void 0,E:void 0,C:o},n},h.has=function(t){const e=this[d][t];return e&&null===e.e&&!e.E},h.delete=function(t){const e=this.get(t);return void 0!==e&&(e&&e.d&&e.d.forEach(function(t){const n=t.i.indexOf(e);-1!==n&&t.i.splice(n,1)}),delete this[d][t])};const x="undefined"!=typeof Symbol&&Symbol.iterator;h.entries=function(){const t=this,e=Object.keys(t[d]);let n,o,r=0;const i={next:function(){for(;void 0!==(o=e[r++])&&void 0===(n=t.get(o)););return{done:void 0===o,value:void 0!==o&&[o,n]}}};return i[x]=function(){return this},i}}();




!function(e){const t=System.constructor.prototype,r=[[],function(){return{}}];function n(){throw Error("AMD require not supported.")}function o(){}const s=["require","exports","module"];function i(e,t){const r={},o={exports:r},s=[],i=[];let u=0;for(let t=0;t<e.length;t++){const f=e[t],c=i.length;if("require"===f)s[t]=n,u++;else if("module"===f)s[t]=o,u++;else if("exports"===f)s[t]=r,u++;else{const e=t;i.push(function(t){s[e]=t.__useDefault?t.default:t})}u&&(e[c]=f)}u&&(e.length-=u);const f=t;return[e,function(e){return e({default:r,__useDefault:!0}),{setters:i,execute:function(){o.exports=f.apply(r,s)||o.exports,r!==o.exports&&e("default",o.exports)}}}]}let u;const f=t.register;3===f.length?t.register=function(e,t,r){"string"!=typeof e&&(u=t),f.apply(this,arguments)}:t.register=function(e,t){u=t,f.apply(this,arguments)};const c=t.getRegister;let l,p;t.getRegister=function(){const e=c.call(this);if(e&&e[1]===u)return e;if(!l)return e||r;const t=i(l,p);return l=null,t},e.define=function(e,t,r){if("string"==typeof e){if(l){if(!System.registerRegistry)throw Error("Include the named register extension for SystemJS named AMD support.");return System.registerRegistry[e]=i(t,r),l=[],void(p=o)}System.registerRegistry&&(System.registerRegistry[e]=i([].concat(t),r)),e=t,t=r}e instanceof Array?(l=e,p=t):"object"==typeof e?(l=[],p=function(){return e}):"function"==typeof e&&(l=s,p=e)},e.define.amd={}}("undefined"!=typeof self?self:global);



/*
 * Named exports support for legacy module formats in SystemJS 2.0
 */
(function () {
    const systemPrototype = System.constructor.prototype;
    
    // hook System.register to know the last declaration binding
    let lastRegisterDeclare;
    const systemRegister = systemPrototype.register;
    systemPrototype.register = function (deps, declare) {
      lastRegisterDeclare = declare;
      systemRegister.call(this, deps, declare);
    };
  
    const getRegister = systemPrototype.getRegister;
    systemPrototype.getRegister = function () {
      const register = getRegister.call(this);
      // if it is an actual System.register call, then its ESM
      // -> dont add named exports
      if (!register || register[1] === lastRegisterDeclare || register[1].length === 0)
        return register;
      
      // otherwise it was provided by a custom instantiator
      // -> extend the registration with named exports support
      const registerDeclare = register[1];
      register[1] = function (_export, _context) {
        // hook the _export function to note the default export
        let defaultExport;
        const declaration = registerDeclare.call(this, function (name, value) {
          if (name === 'default')
            defaultExport = value;
          if (name === '__useDefault')
            return;
          _export(name, value);
        }, _context);
        // hook the execute function
        const execute = declaration.execute;
        if (execute)
          declaration.execute = function () {
            execute.call(this);
            // do a bulk export of the default export object
            // to export all its names as named exports
            if (typeof defaultExport === 'object')
              _export(defaultExport);
          };
        return declaration;
      };
      return register;
    };
  })();




  !function(){const t=System.constructor.prototype,e=System.constructor,r=function(){e.call(this),this.registerRegistry=Object.create(null)};r.prototype=t,System=new r;const s=t.register;t.register=function(t,e,r){return"string"!=typeof t?s.apply(this,arguments):(this.registerRegistry[t]=[e,r],s.call(this,[],function(){return{}}))};const i=t.resolve;t.resolve=function(t,e){return"/"===t[0]||"."===t[0]&&("/"===t[1]||"."===t[1]&&"/"===t[2])?i.call(this,t,e):t in this.registerRegistry?t:i.call(this,t,e)};const n=t.instantiate;t.instantiate=function(t,e){return this.registerRegistry[t]||n.call(this,t,e)}}();