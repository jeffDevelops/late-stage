import{S as m,i as g,s as f,e as u,t as S,c as p,a as _,g as k,d as l,b as C,f as w,Q as v,L as i,C as L}from"./vendor-a62e5b1e.js";function y(e){let t,a;return{c(){t=u("h1"),a=S("Late-Stage"),this.h()},l(r){t=p(r,"H1",{class:!0});var o=_(t);a=k(o,"Late-Stage"),o.forEach(l),this.h()},h(){C(t,"class","svelte-p3rbex")},m(r,o){w(r,t,o),v(t,a)},p:i,i,o:i,d(r){r&&l(t)}}}class P extends m{constructor(t){super();g(this,t,null,y,f,{})}}var s;(function(e){e.PrefersColorScheme="prefersColorScheme"})(s||(s={}));const c=typeof window!="undefined",b=()=>{if(!c)return"light";if(window.sessionStorage.getItem(s.PrefersColorScheme)){const e=window.sessionStorage.getItem(s.PrefersColorScheme);if(e==="dark"||e==="light")return e}return window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"},h=b(),n=e=>{c&&(document.firstElementChild.classList.add(e==="dark"?"dark-theme":"light-theme"),document.firstElementChild.classList.remove(e==="dark"?"light-theme":"dark-theme"))};n(h);const{set:d,subscribe:x}=L(h),E={subscribe:x,setToLight:()=>{sessionStorage.setItem(s.PrefersColorScheme,"light"),n("light"),d("light")},setToDark:()=>{sessionStorage.setItem(s.PrefersColorScheme,"dark"),n("dark"),d("dark")}};export{P as L,E as p};