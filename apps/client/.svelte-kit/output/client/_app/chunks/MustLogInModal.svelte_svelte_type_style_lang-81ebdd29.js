import{S as q,i as w,s as B,e as m,w as D,c as h,a as b,x as M,d as u,g as $,y as N,q as d,I as S,J as A,K as I,o as p,L as F,B as G,N as H,k as E,m as L,b as v,X as V,Q as k,V as J,n as K,p as P,F as Q,G as T,H as U,$ as X}from"./vendor-e5aa1018.js";import{C as z}from"./Checkmark-d9a68554.js";function j(r){let e,s,f,n,_;return s=new z({}),{c(){e=m("div"),D(s.$$.fragment)},l(t){e=h(t,"DIV",{});var o=b(e);M(s.$$.fragment,o),o.forEach(u)},m(t,o){$(t,e,o),N(s,e,null),_=!0},i(t){_||(d(s.$$.fragment,t),S(()=>{n&&n.end(1),f=A(e,I,{}),f.start()}),_=!0)},o(t){p(s.$$.fragment,t),f&&f.invalidate(),n=F(e,I,{}),_=!1},d(t){t&&u(e),G(s),t&&n&&n.end()}}}function O(r){let e,s,f,n,_,t,o,y,a=r[0]&&j();const g=r[2].default,c=H(g,r,r[1],null);return{c(){e=m("label"),s=m("input"),f=E(),n=m("div"),a&&a.c(),_=E(),c&&c.c(),this.h()},l(l){e=h(l,"LABEL",{class:!0});var i=b(e);s=h(i,"INPUT",{type:!0,class:!0}),f=L(i),n=h(i,"DIV",{class:!0});var C=b(n);a&&a.l(C),C.forEach(u),_=L(i),c&&c.l(i),i.forEach(u),this.h()},h(){v(s,"type","checkbox"),v(s,"class","svelte-o7eg7"),v(n,"class","custom-checkbox svelte-o7eg7"),v(e,"class","svelte-o7eg7"),V(e,"checked",r[0])},m(l,i){$(l,e,i),k(e,s),k(e,f),k(e,n),a&&a.m(n,null),k(e,_),c&&c.m(e,null),t=!0,o||(y=J(s,"change",r[3]),o=!0)},p(l,[i]){l[0]?a?i&1&&d(a,1):(a=j(),a.c(),d(a,1),a.m(n,null)):a&&(K(),p(a,1,1,()=>{a=null}),P()),c&&c.p&&(!t||i&2)&&Q(c,g,l,l[1],t?U(g,l[1],i,null):T(l[1]),null),i&1&&V(e,"checked",l[0])},i(l){t||(d(a),d(c,l),t=!0)},o(l){p(a),p(c,l),t=!1},d(l){l&&u(e),a&&a.d(),c&&c.d(l),o=!1,y()}}}function R(r,e,s){let{$$slots:f={},$$scope:n}=e,{checked:_=!1}=e;function t(o){X.call(this,r,o)}return r.$$set=o=>{"checked"in o&&s(0,_=o.checked),"$$scope"in o&&s(1,n=o.$$scope)},[_,n,f,t]}class Z extends q{constructor(e){super();w(this,e,R,O,B,{checked:0})}}export{Z as C};