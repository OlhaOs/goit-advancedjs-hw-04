import{S as h,a as p,i as y}from"./assets/vendor-b725de7c.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const g="https://pixabay.com/api/",b="34373516-b73f95caf1f569d1c97db55cd",n={formEl:document.querySelector(".search-form"),galleryEl:document.querySelector(".gallery"),loadMoreBtnEl:document.querySelector(".load-more")};let s,f;const E=new h(".gallery a",{fadeSpeed:500,animationSlide:!0,widthRatio:1});n.formEl.addEventListener("submit",L);n.loadMoreBtnEl.addEventListener("click",$);function L(e){if(e.preventDefault(),s=1,f=n.formEl[0].value.trim(),!f){c("Please enter a search query!");return}u(f),M()}async function u(e){try{const{data:o}=await v(e),{hits:a,totalHits:i}=o;if(!a.length){c("Sorry, there are no images matching your search query. Please try again.");return}w(a),E.refresh(),P(i),B(),q(i)}catch(o){c(o.message,"#ffafb4")}}async function v(e){const o=new URLSearchParams({key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:s});return await p.get(`${g}?${o}`)}function S(e){return e.map(({webformatURL:o,largeImageURL:a,tags:i,likes:t,views:r,comments:l,downloads:m})=>`    
      <a href=${a}>
        <div class="photo-card">
        <img src=${o}  alt=${i}  loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes ${t}</b>
            </p>
                <p class="info-item">
            <b>Views ${r}</b>
            </p>
            <p class="info-item">
                <b>Comments ${l}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${m}</b>
            </p>
        </div>
    </div> 
    </a>`).join("")}function w(e){n.galleryEl.insertAdjacentHTML("beforeend",S(e))}function c(e,o="#cef6ba"){y.info({message:e,position:"topLeft",color:o,closeOnClick:!0,timeout:2500,pauseOnHover:!0})}function M(){n.formEl[0].value="",n.galleryEl.innerHTML="",d()}function B(){n.loadMoreBtnEl.style.display="flex"}function d(){n.loadMoreBtnEl.style.display="none"}function $(){return s++,u(f)}function k(){const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}function q(e){e<=s*40&&(d(),setTimeout(()=>{c("We're sorry, but you've reached the end of search results...","#ffff99")},2e3))}function P(e){s===1&&c(`Hooray! We found ${e} images.`),s!==1&&k()}
//# sourceMappingURL=commonHelpers.js.map
