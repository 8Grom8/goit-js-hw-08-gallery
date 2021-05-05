import galleryItems from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const modalContent = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");
const modalBtnClose = document.querySelector(".lightbox__button");

galleryContainer.addEventListener("click", modalOpen);
galleryContainer.insertAdjacentHTML(
  "beforeend",
  galleryCardMarkup(galleryItems)
);

function galleryCardMarkup(img) {
  return img
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
                    <a class="gallery__link"
                     href=${original}>
                         <img class="gallery__image"
                          src=${preview}
                          data-source=${original}
                          alt=${description} />
                    </a>
                    </li>`;
    })
    .join("");
}

function modalOpen(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  modal.classList.add("is-open");
  modalImg.src = event.target.dataset.source;
  modalImg.alt = event.target.alt;
  overlay.addEventListener("click", modalCloseByOverlayClick);
  document.addEventListener("keydown", modalCloseByEsc);
  modalBtnClose.addEventListener("click", modalClose);
  window.addEventListener("keydown", modalImgScrolling);
  modalContent.addEventListener("click", modalImgScrolling);
}

function modalClose(event) {
  modal.classList.remove("is-open");
  overlay.removeEventListener("click", modalCloseByOverlayClick);
  document.removeEventListener("keydown", modalCloseByEsc);
  modalBtnClose.removeEventListener("click", modalClose);
  window.removeEventListener("keydown", modalImgScrolling);
  modalContent.removeEventListener("click", modalImgScrolling);
}

function modalCloseByEsc(event) {
  if (event.code === "Escape") {
    modalClose(event);
  }
}

function modalCloseByOverlayClick(event) {
  if (event.currentTarget === event.target) {
    modalClose(event);
  }
}
