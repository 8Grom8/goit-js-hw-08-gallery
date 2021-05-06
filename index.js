import galleryItems from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const overlay = document.querySelector(".lightbox__overlay");
const modalBtnClose = document.querySelector(".lightbox__button");

galleryContainer.addEventListener("click", modalOpen);
galleryContainer.insertAdjacentHTML(
  "beforeend",
  galleryCardMarkup(galleryItems)
);

function galleryCardMarkup(img) {
  return img
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item">
                    <a class="gallery__link"
                     href=${original}>
                         <img class="gallery__image"
                          src=${preview}
                          data-source=${original}
                          data-index=${index}
                          alt=${description} />
                    </a>
                    </li>`;
    })
    .join("");
}

let currentIndex = 0;

function modalOpen(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }
  modal.classList.add("is-open");
  const t = event.target;
  currentIndex = +t.dataset.index;
  updateAttr(t.dataset.source, t.alt);
  overlay.addEventListener("click", modalCloseByOverlayClick);
  document.addEventListener("keydown", modalCloseByEsc);
  modalBtnClose.addEventListener("click", modalClose);
  document.addEventListener("keydown", onKeyEnter);
}

function modalClose(event) {
  updateAttr();
  modal.classList.remove("is-open");
  overlay.removeEventListener("click", modalCloseByOverlayClick);
  document.removeEventListener("keydown", modalCloseByEsc);
  modalBtnClose.removeEventListener("click", modalClose);
}

function updateAttr(src = "", alt = "") {
  modalImg.src = src;
  modalImg.alt = alt;
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

function onKeyEnter(e) {
  if (e.code === "Escape") {
    updateAttr();
    return;
  }
  if (e.code === "ArrowRight") {
    currentIndex += 1;

    if (currentIndex === galleryItems.length - 1) {
      currentIndex = 0;
    }
  }

  if (e.code === "ArrowLeft") {
    currentIndex -= 1;

    if (currentIndex === 0) {
      currentIndex = galleryItems.length - 1;
    }
  }

  updateAttr(
    galleryItems[currentIndex].original,
    galleryItems[currentIndex].description
  );
}
