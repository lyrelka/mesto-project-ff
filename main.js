(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e,t,n){e.closest(".card").remove(),n(t)}function n(e,t,n,o){(function(t){return e.classList.contains("card__like-button_is-active")?o.deleteLikeServer(t):o.putLikeServer(t)})(t).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length}))}function o(t,n,o,r){var c=e.cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__like-button"),l=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-counter");return a.setAttribute("src",t.link),a.setAttribute("alt",t.name),u.textContent=t.name,s.textContent=t.likes.length,t.likes.some((function(e){return e._id===n}))?i.classList.add("card__like-button_is-active"):i.classList.remove("card__like-button_is-active"),i.addEventListener("click",(function(){o.likeCardElement(i,t._id,s,r)})),t.owner._id!==n&&l.remove(),l.addEventListener("click",(function(){o.deleteCardElement(l,t._id,o.deleteCardServer)})),a.addEventListener("click",(function(){o.openImageElement(t)})),c}function r(e,t){t(e,{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),document.addEventListener("keydown",a),e.classList.add("popup_is-opened")}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e,t,n){var o=e.querySelector(".".concat(t.id,"_error"));o.classList.remove(n.errorClass),o.textContent="",t.classList.remove(n.inputErrorClass)}function i(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function l(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),i(n,o,t)}var s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-25",headers:{authorization:"abf0fec9-b620-43ba-94e6-fe1b7c727ff0","Content-Type":"application/json"}};function d(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function p(){return fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(d).catch((function(e){console.log(e)}))}function _(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then(d).catch((function(e){console.log(e)}))}function f(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then(d).catch((function(e){console.log(e)}))}function m(e){return fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then(d).catch((function(e){console.log(e)}))}var v,h=document.querySelector(".profile"),y=h.querySelector(".profile__info"),S=y.querySelector(".profile__title"),b=y.querySelector(".profile__description"),C=h.querySelector(".profile__image"),E=document.querySelector(".places__list"),k=document.querySelectorAll(".popup"),L=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_edit-avatar"),g=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_image"),A=y.querySelector(".profile__edit-button"),U=h.querySelector(".profile__add-button"),B=document.querySelectorAll(".popup__close"),T=document.forms.edit_profile,w=T.elements.name,P=T.elements.description,D=document.forms.edit_avatar,I=D.elements.avatar,N=document.forms.new_place,O=N.elements.place_name,j=N.elements.link;function J(e){var t;x.querySelector(".popup__image").setAttribute("src",e.link),x.querySelector(".popup__image").setAttribute("alt",e.name),x.querySelector(".popup__caption").textContent=e.name,t=x,document.addEventListener("keydown",a),t.classList.add("popup_is-opened")}A.addEventListener("click",(function(){p().then((function(e){w.value=e.name,P.value=e.about})),r(L,l)})),C.addEventListener("click",(function(){I.value="",r(q,l)})),U.addEventListener("click",(function(){O.value="",j.value="",r(g,l)})),B.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){c(t)}))})),k.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",(function(t){t.currentTarget===t.target&&c(e)}))})),p().then((function(e){S.textContent=e.name,b.textContent=e.about})),T.addEventListener("submit",(function(e){var t,n;e.preventDefault(),L.querySelector(".popup__button").textContent="Сохранение...",(t=w.value,n=P.value,fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:t,about:n})}).then(d).catch((function(e){console.log(e)}))).then((function(e){S.textContent=e.name,b.textContent=e.about,c(L),L.querySelector(".popup__button").textContent="Сохранить"}))})),p().then((function(e){C.style.backgroundImage="url(".concat(e.avatar,")")})),D.addEventListener("submit",(function(e){var t;e.preventDefault(),q.querySelector(".popup__button").textContent="Сохранение...",(t=I.value,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:t})}).then(d).catch((function(e){console.log(e)}))).then((function(e){C.style.backgroundImage="url(".concat(e.avatar,")"),c(q),q.querySelector(".popup__button").textContent="Сохранить"}))})),Promise.all([fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(d).catch((function(e){console.log(e)})),p()]).then((function(e){e[0].forEach((function(r){E.append(o(r,e[1]._id,{likeCardElement:n,deleteCardElement:t,deleteCardServer:m,openImageElement:J},{putLikeServer:_,deleteLikeServer:f}))}))})),N.addEventListener("submit",(function(e){var r,a;e.preventDefault(),g.querySelector(".popup__button").textContent="Сохранение...",Promise.all([(r=O.value,a=j.value,fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:r,link:a})}).then(d).catch((function(e){console.log(e)}))),p()]).then((function(e){E.prepend(o(e[0],e[1]._id,{likeCardElement:n,deleteCardElement:t,deleteCardServer:m,openImageElement:J},{putLikeServer:_,deleteLikeServer:f})),c(g),O.value="",j.value="",g.querySelector(".popup__button").textContent="Сохранить"}))})),v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Array.from(document.querySelectorAll(v.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"_error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),i(n,o,t)}))}))}(e,v)}))})();