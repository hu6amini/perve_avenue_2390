//Menuwrap Icons
function waitForElement(e,t){const n=new MutationObserver((i=>{for(const o of i)if("childList"===o.type&&document.querySelector(e)){n.disconnect(),t(document.querySelector(e));break}}));n.observe(document.body,{childList:!0,subtree:!0})}function addIdsToMenuItems(e){const t=e.querySelector(".left");t&&(t.style.visibility="visible");e.querySelectorAll(".left li.menu").forEach((e=>{const t=e.querySelector("a");if(t){const n=t.getAttribute("href"),i=(t.innerHTML.trim(),t.querySelector("span")?.innerHTML.trim());e.querySelector(".nick")?e.id="nick":"https://msg.forumcommunity.net/?act=Msg&CODE=01&c=655775"===n?e.id="messenger":"https://msg.forumcommunity.net/?act=UserCP&CODE=26&c=655775"===n?e.id="topics":"#notifications"===n?e.id="notif":e.querySelector('form[action="/?act=Mod"]')||["&nbsp;Moderation","&nbsp;Moderazione","&nbsp;Moderación","&nbsp;Modération","&nbsp;Mäßigung","&nbsp;Moderação"].includes(i)?e.id="mod":(["&nbsp;Administration","&nbsp;Amministrazione","&nbsp;Administración","&nbsp;Verwaltung","&nbsp;Administração"].includes(i)||"https://www.forumcommunity.net/?cid=655775"===n)&&(e.id="admin")}})),e.querySelectorAll(".left li:not(.menu)").forEach((e=>{const t=e.querySelector("a");t&&("HOME"===t.textContent.trim()?e.id="pahome":"/latestupdates"===t.getAttribute("href")&&(e.id="updates"))}))}waitForElement(".menuwrap",addIdsToMenuItems);
//Emojione 
function applyEmojiTransformation(e){e.classList.contains("[class*=e1a-]")||(e.innerHTML=emojione.toImage(emojione.shortnameToUnicode(emojione.toShort(e.innerHTML))))}function observeElements(e){document.querySelectorAll(e).forEach(applyEmojiTransformation);new MutationObserver((o=>{o.forEach((o=>{"childList"===o.type&&o.addedNodes.forEach((o=>{o.nodeType===Node.ELEMENT_NODE&&(o.matches(e)||o.querySelector(e))&&applyEmojiTransformation(o.matches(e)?o:o.querySelector(e))}))}))})).observe(document.body,{childList:!0,subtree:!0})}observeElements(".post .color, .post .quote span, .tmsg, .profile-interests, .web a, .mtitle, .notification-text");
//Reply Counter
function processPostElements(){const e=document.querySelectorAll(".post"),t=(()=>{const e=new URLSearchParams(window.location.search);return parseInt(e.get("st")||0)+1})();e.forEach(((e,r)=>{createReplyCounter(e,t+r,"after")}))}function createReplyCounter(e,t,r){if(e.querySelector(".reply_counter"))return;const o=document.createElement("b");o.className="reply_counter",o.textContent="#"+t;const s=e.querySelector(".mini_buttons.rt.Sub");s&&("after"===r?s.appendChild(o):s.insertBefore(o,s.firstChild))}processPostElements();const postObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches(".post")&&processPostElements()}))}))}));postObserver.observe(document.body,{childList:!0,subtree:!0});
//Favicons
function updateFaviconsForLinks(e){e.forEach((e=>{if(!(e.closest(".spoiler .code_top a")||e.closest(".fancyborder a")||e.closest(".quote_top a")||e.querySelector("img"))){let o=document.createElement("img");o.src=e.href.includes("youtu.be")?"https://www.google.com/s2/favicons?domain=youtube.com":"https://www.google.com/s2/favicons?domain="+e.href,o.alt="fav",o.width=e.matches(".quote a, .tmsg a")?14:16,o.height=e.matches(".quote a, .tmsg a")?14:16,e.prepend(o)}}))}updateFaviconsForLinks(document.querySelectorAll(".color a, span.tmsg a"));const faviconObserver=new MutationObserver((e=>{e.forEach((e=>{updateFaviconsForLinks(e.target.querySelectorAll(".color a, span.tmsg a"))}))}));faviconObserver.observe(document.body,{childList:!0,subtree:!0});
//Textarea Autogrow 
function resizeTextarea(){const e=document.querySelector("textarea#Post");function updateTextareaHeight(){e.style.height="0",e.style.height=e.scrollHeight+"px",e.style.maxHeight="650px"}e&&(updateTextareaHeight(),e.addEventListener("input",updateTextareaHeight),window.addEventListener("load",updateTextareaHeight),e.addEventListener("paste",(()=>{setTimeout(updateTextareaHeight,0)})))}resizeTextarea();const textareaObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches("textarea#Post")&&resizeTextarea()}))}))}));textareaObserver.observe(document.body,{childList:!0,subtree:!0});
//Quote
function isInsideVeContentColor(e){return null!==e.closest(".ve-content.color")}function expandQuotes(e){if(isInsideVeContentColor(e))return;const updateHeight=()=>{const o=e.querySelector(".quotebtn button");if(!o&&e.scrollHeight>170){e.style.maxHeight="170px";const o=document.createElement("div");o.className="quotebtn";const t=document.createElement("button");t.innerHTML="Show More...",o.appendChild(t),e.appendChild(o),t.addEventListener("click",(t=>{t.preventDefault(),t.stopPropagation(),e.style.transition="max-height 0.382s ease-in-out",e.style.maxHeight=e.scrollHeight+"px",o.style.display="none",setTimeout((()=>{e.style.maxHeight="none"}),382)}))}else o&&e.scrollHeight<=170&&o.parentNode.remove()};updateHeight();const o=new ResizeObserver(updateHeight);o.observe(e);const t=e.querySelector(".spoiler .code_top a");t&&t.addEventListener("click",(()=>{e.style.maxHeight="none",o.disconnect()}))}document.querySelectorAll(".quote").forEach(expandQuotes);const quoteObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches(".quote")?expandQuotes(e):e.nodeType===Node.ELEMENT_NODE&&e.querySelectorAll(".quote").forEach(expandQuotes)}))}))}));quoteObserver.observe(document.body,{childList:!0,subtree:!0}),document.querySelectorAll(".quote_top").forEach(modifyQuoteTop);const quoteTopObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.querySelectorAll(".quote_top").forEach(modifyQuoteTop)}))}))}));function modifyQuoteTop(e){if(isInsideVeContentColor(e))return;const o=e.textContent,t=e.querySelector("a");if(o.includes("@")){const n=o.replace(/QUOTE\s*\(([^@]+)@[^)]+\)\s*/,"$1 said:");e.innerHTML=n,e.style.color="var(--mdcol)",t&&(e.appendChild(t),t.style.color="var(--mdcol)")}else{const o=e.querySelector(".quote_top b");o&&(o.style.opacity=1)}}quoteTopObserver.observe(document.body,{childList:!0,subtree:!0});
//Goto
let timeoutId;function scrollToSmooth(o){window.scrollTo({top:o,behavior:"smooth"})}function showGotoElement(o){o.classList.add("active"),o.style.zIndex="9999"}function hideGotoElement(o){o.classList.remove("active")}function initSmoothScrolling(){document.querySelector(".p_up").addEventListener("click",(()=>{scrollToSmooth(0)})),document.querySelector(".p_down").addEventListener("click",(()=>{scrollToSmooth(document.body.scrollHeight)}));const o=document.querySelector(".goto");window.addEventListener("scroll",(()=>{clearTimeout(timeoutId),showGotoElement(o),timeoutId=setTimeout((()=>{hideGotoElement(o)}),3e3)})),o.addEventListener("mouseenter",(()=>{clearTimeout(timeoutId),showGotoElement(o)})),o.addEventListener("mouseleave",(()=>{timeoutId=setTimeout((()=>{hideGotoElement(o)}),3e3)}))}initSmoothScrolling();const smoothScrollObserver=new MutationObserver((o=>{o.forEach((o=>{o.addedNodes.forEach((o=>{o.nodeType===Node.ELEMENT_NODE&&o.matches(".p_up, .p_down, .goto")&&initSmoothScrolling()}))}))}));smoothScrollObserver.observe(document.body,{childList:!0,subtree:!0});
//Preview
function processSendElements(){document.querySelectorAll(".send").forEach((e=>{const n=e.querySelectorAll("ul li.Item");if(n.length>=2){const e=document.getElementById("loading");e&&n[1].appendChild(e)}}))}processSendElements();const sendObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches(".send")&&processSendElements()}))}))}));sendObserver.observe(document.body,{childList:!0,subtree:!0});
