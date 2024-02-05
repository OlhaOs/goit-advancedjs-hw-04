import{a as p,i as h,S as g}from"./assets/vendor-b725de7c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const y="https://pixabay.com/api/",b="34373516-b73f95caf1f569d1c97db55cd",i={formEl:document.querySelector(".search-form"),galleryEl:document.querySelector(".gallery"),loadMoreBtnEl:document.querySelector(".load-more")};let l,f;i.formEl.addEventListener("submit",L);i.loadMoreBtnEl.addEventListener("click",M);function L(o){o.preventDefault(),l=1,f=i.formEl[0].value,u(f),v()}function u(o){const r=new URLSearchParams({key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:l});return p.get(`${y}?${r}`).then(({data:n})=>{if(!n.hits.length){c("Sorry, there are no images matching your search query. Please try again.");return}l===1&&c(`Hooray! We found ${n.totalHits} images.`),i.galleryEl.insertAdjacentHTML("beforeend",E(n.hits)),w(),S(),l!==1&&B(),n.totalHits<=l*40&&(d(),setTimeout(()=>{c("We're sorry, but you've reached the end of search results...","#ffff99")},2e3))}).catch(n=>c(n.message,"#ffafb4"))}function E(o){return o.map(({webformatURL:r,largeImageURL:n,tags:a,likes:e,views:t,comments:s,downloads:m})=>`    
      <a href=${n}>
        <div class="photo-card">
        <img src=${r}  alt=${a}  loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes ${e}</b>
            </p>
                <p class="info-item">
            <b>Views ${t}</b>
            </p>
            <p class="info-item">
                <b>Comments ${s}</b>
            </p>
            <p class="info-item">
                <b>Downloads ${m}</b>
            </p>
        </div>
    </div> 
    </a>`).join("")}function c(o,r="#cef6ba"){h.info({message:o,position:"topLeft",color:r,closeOnClick:!0,timeout:2500,pauseOnHover:!0})}function v(){i.formEl[0].value="",i.galleryEl.innerHTML="",d()}function S(){i.loadMoreBtnEl.style.display="flex"}function d(){i.loadMoreBtnEl.style.display="none"}function M(){return l++,u(f)}function w(){const o=new g(".gallery a",{fadeSpeed:500,animationSlide:!0,widthRatio:1});i.galleryEl.addEventListener("click",r=>{r.target.classList.contains("photo-card")&&o.open()})}function B(){const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
