import{S as J,i as Q,s as U,e as $,w as R,c as _,a as k,x,d as f,b as y,g as v,y as P,V as B,q as b,o as w,B as S,t as E,h as H,Q as h,M as G,I as X,J as Y,K as z,L as Z,_ as ee,k as T,m as L,n as te,p as se}from"../chunks/vendor-82c75a9c.js";import{C as ae,L as oe}from"../chunks/Controls-cee10546.js";import{p as ne,g as re}from"../chunks/navigation-6e098c45.js";import{C as W}from"../chunks/Card-1275b158.js";import{C as ie}from"../chunks/MustLogInModal.svelte_svelte_type_style_lang-0d77dda0.js";import{I as le}from"../chunks/Idea-0756ff63.js";import{I as ce}from"../chunks/Info-76630e33.js";import"../chunks/stores-3e2e9e39.js";import"../chunks/Logo-06ab5db7.js";import"../chunks/gqlRequest-8b3b303a.js";import"../chunks/env-66f3c62e.js";import"../chunks/disableInteractablesWhile-0e82c9c8.js";import"../chunks/singletons-d19c42e4.js";import"../chunks/Checkmark-0e19b8f1.js";function F(m){let e,s,n,a,t,o,l,r;return{c(){e=$("button"),s=$("h1"),n=E("Participate"),this.h()},l(c){e=_(c,"BUTTON",{class:!0});var p=k(e);s=_(p,"H1",{class:!0});var i=k(s);n=H(i,"Participate"),i.forEach(f),p.forEach(f),this.h()},h(){y(s,"class","svelte-4phlp9"),y(e,"class","hover-effect svelte-4phlp9")},m(c,p){v(c,e,p),h(e,s),h(s,n),o=!0,l||(r=[B(e,"click",m[3]),B(e,"mouseleave",m[5])],l=!0)},p:G,i(c){o||(X(()=>{t&&t.end(1),a=Y(e,z,{duration:100}),a.start()}),o=!0)},o(c){a&&a.invalidate(),t=Z(e,z,{duration:100}),o=!1},d(c){c&&f(e),c&&t&&t.end(),l=!1,ee(r)}}}function fe(m){let e;return{c(){e=E("Remove your personal funds from the large, for-profit banks")},l(s){e=H(s,"Remove your personal funds from the large, for-profit banks")},m(s,n){v(s,e,n)},d(s){s&&f(e)}}}function ue(m){let e,s,n,a=m[0]&&F(m);return s=new ie({props:{checked:m[1],$$slots:{default:[fe]},$$scope:{ctx:m}}}),{c(){a&&a.c(),e=T(),R(s.$$.fragment)},l(t){a&&a.l(t),e=L(t),x(s.$$.fragment,t)},m(t,o){a&&a.m(t,o),v(t,e,o),P(s,t,o),n=!0},p(t,o){t[0]?a?(a.p(t,o),o&1&&b(a,1)):(a=F(t),a.c(),b(a,1),a.m(e.parentNode,e)):a&&(te(),w(a,1,1,()=>{a=null}),se());const l={};o&2&&(l.checked=t[1]),o&64&&(l.$$scope={dirty:o,ctx:t}),s.$set(l)},i(t){n||(b(a),b(s.$$.fragment,t),n=!0)},o(t){w(a),w(s.$$.fragment,t),n=!1},d(t){a&&a.d(t),t&&f(e),S(s,t)}}}function me(m){let e,s,n,a,t;return s=new W({props:{$$slots:{default:[ue]},$$scope:{ctx:m}}}),{c(){e=$("div"),R(s.$$.fragment),this.h()},l(o){e=_(o,"DIV",{class:!0});var l=k(e);x(s.$$.fragment,l),l.forEach(f),this.h()},h(){y(e,"class","checklist-item")},m(o,l){v(o,e,l),P(s,e,null),n=!0,a||(t=B(e,"mouseenter",m[2]),a=!0)},p(o,[l]){const r={};l&67&&(r.$$scope={dirty:l,ctx:o}),s.$set(r)},i(o){n||(b(s.$$.fragment,o),n=!0)},o(o){w(s.$$.fragment,o),n=!1},d(o){o&&f(e),S(s),a=!1,t()}}}function he(m,e,s){let{checked:n=!0}=e,{participationLink:a}=e,{shouldDisplayHoverEffect:t=!1}=e;const o=async()=>{await ne(a),s(0,t=!0)},l=async()=>{await re(a)},r=()=>s(0,t=!1);return m.$$set=c=>{"checked"in c&&s(1,n=c.checked),"participationLink"in c&&s(4,a=c.participationLink),"shouldDisplayHoverEffect"in c&&s(0,t=c.shouldDisplayHoverEffect)},[t,n,o,l,a,r]}class pe extends J{constructor(e){super();Q(this,e,he,me,U,{checked:1,participationLink:4,shouldDisplayHoverEffect:0})}}function de(m){let e,s,n,a,t,o,l;return s=new ce({}),{c(){e=$("h4"),R(s.$$.fragment),n=E(" That's it? It's not much of a checklist..."),a=T(),t=$("p"),o=E(`Development of the platform is a volunteer effort (what corporation is going to pay for
        something like this?), and development of new features takes time.`),this.h()},l(r){e=_(r,"H4",{class:!0});var c=k(e);x(s.$$.fragment,c),n=H(c," That's it? It's not much of a checklist..."),c.forEach(f),a=L(r),t=_(r,"P",{class:!0});var p=k(t);o=H(p,`Development of the platform is a volunteer effort (what corporation is going to pay for
        something like this?), and development of new features takes time.`),p.forEach(f),this.h()},h(){y(e,"class","svelte-5pjiu1"),y(t,"class","svelte-5pjiu1")},m(r,c){v(r,e,c),P(s,e,null),h(e,n),v(r,a,c),v(r,t,c),h(t,o),l=!0},i(r){l||(b(s.$$.fragment,r),l=!0)},o(r){w(s.$$.fragment,r),l=!1},d(r){r&&f(e),S(s),r&&f(a),r&&f(t)}}}function $e(m){let e,s,n,a,t,o,l,r,c,p;return s=new le({}),{c(){e=$("h4"),R(s.$$.fragment),n=E(" Have an idea for the checklist?"),a=T(),t=$("p"),o=E(`We're looking to field ideas from passionate advocates and subject-matter experts like you.
        The roadmap for the platform consists of input from the r/latestage community on Reddit; the
        following template helps us nail down specifics for your idea and allows for easy posting on
        Reddit for the community to see:`),l=T(),r=$("a"),c=E("Checklist Idea Template"),this.h()},l(i){e=_(i,"H4",{class:!0});var g=k(e);x(s.$$.fragment,g),n=H(g," Have an idea for the checklist?"),g.forEach(f),a=L(i),t=_(i,"P",{class:!0});var I=k(t);o=H(I,`We're looking to field ideas from passionate advocates and subject-matter experts like you.
        The roadmap for the platform consists of input from the r/latestage community on Reddit; the
        following template helps us nail down specifics for your idea and allows for easy posting on
        Reddit for the community to see:`),I.forEach(f),l=L(i),r=_(i,"A",{href:!0,class:!0});var j=k(r);c=H(j,"Checklist Idea Template"),j.forEach(f),this.h()},h(){y(e,"class","svelte-5pjiu1"),y(t,"class","svelte-5pjiu1"),y(r,"href","/checklist-rfcs#checklist-idea-template"),y(r,"class","svelte-5pjiu1")},m(i,g){v(i,e,g),P(s,e,null),h(e,n),v(i,a,g),v(i,t,g),h(t,o),v(i,l,g),v(i,r,g),h(r,c),p=!0},i(i){p||(b(s.$$.fragment,i),p=!0)},o(i){w(s.$$.fragment,i),p=!1},d(i){i&&f(e),S(s),i&&f(a),i&&f(t),i&&f(l),i&&f(r)}}}function _e(m){let e,s,n,a,t,o,l,r,c,p,i,g,I,j,V,q,D,N;return e=new ae({}),i=new pe({props:{participationLink:"/campaigns/1",checked:typeof window!="undefined"&&localStorage.getItem(oe.HasCompletedBankChecklistItem)==="true"}}),j=new W({props:{$$slots:{default:[de]},$$scope:{ctx:m}}}),D=new W({props:{$$slots:{default:[$e]},$$scope:{ctx:m}}}),{c(){R(e.$$.fragment),s=T(),n=$("main"),a=$("section"),t=$("h1"),o=E("Checklist"),l=T(),r=$("p"),c=E("These are things you can do today to limit your participation in extractionist capitalism."),p=T(),R(i.$$.fragment),g=T(),I=$("div"),R(j.$$.fragment),V=T(),q=$("div"),R(D.$$.fragment),this.h()},l(u){x(e.$$.fragment,u),s=L(u),n=_(u,"MAIN",{class:!0});var d=k(n);a=_(d,"SECTION",{});var C=k(a);t=_(C,"H1",{class:!0});var M=k(t);o=H(M,"Checklist"),M.forEach(f),l=L(C),r=_(C,"P",{});var A=k(r);c=H(A,"These are things you can do today to limit your participation in extractionist capitalism."),A.forEach(f),p=L(C),x(i.$$.fragment,C),C.forEach(f),g=L(d),I=_(d,"DIV",{class:!0});var K=k(I);x(j.$$.fragment,K),K.forEach(f),V=L(d),q=_(d,"DIV",{class:!0});var O=k(q);x(D.$$.fragment,O),O.forEach(f),d.forEach(f),this.h()},h(){y(t,"class","svelte-5pjiu1"),y(I,"class","disclosure svelte-5pjiu1"),y(q,"class","disclosure svelte-5pjiu1"),y(n,"class","checklist svelte-5pjiu1")},m(u,d){P(e,u,d),v(u,s,d),v(u,n,d),h(n,a),h(a,t),h(t,o),h(a,l),h(a,r),h(r,c),h(a,p),P(i,a,null),h(n,g),h(n,I),P(j,I,null),h(n,V),h(n,q),P(D,q,null),N=!0},p(u,[d]){const C={};d&1&&(C.$$scope={dirty:d,ctx:u}),j.$set(C);const M={};d&1&&(M.$$scope={dirty:d,ctx:u}),D.$set(M)},i(u){N||(b(e.$$.fragment,u),b(i.$$.fragment,u),b(j.$$.fragment,u),b(D.$$.fragment,u),N=!0)},o(u){w(e.$$.fragment,u),w(i.$$.fragment,u),w(j.$$.fragment,u),w(D.$$.fragment,u),N=!1},d(u){S(e,u),u&&f(s),u&&f(n),S(i),S(j),S(D)}}}class Re extends J{constructor(e){super();Q(this,e,null,_e,U,{})}}export{Re as default};
