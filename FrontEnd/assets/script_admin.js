async function importImages() {
    const data = await importWorks();
    const gallery = document.querySelector(".gallery");
  
    for (const image of data) {
      /*Création d'image en accord avec l'API*/
      const div = document.createElement("div");
      const img = document.createElement("img"); 
      const title = document.createElement("p");
      title.textContent = image.title;
      img.src = image.imageUrl; 
      img.alt = image.title; 
      div.appendChild(img); 
      div.appendChild(title);
      gallery.appendChild(div);
    }
  }
  
  importImages();
 
  /* Modale */
  
  let modal = null;
  
  /* Ouverture Modale */
  const openModal = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const previousModal = document.querySelector(".back");
    previousModal.style.display = "none"; 
    const target = document.querySelector(e.currentTarget.getAttribute("href"));
    target.style.display = "flex"; 
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".close").addEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .addEventListener("click", stopPropagation);
    modalLoad();
  };
  
  /* Fermeture Modale */
  const closeModal = function (e) {
    if (modal === null) return; 
    e.preventDefault();
    const targetWrapper = document.querySelector(".img-load-container");
    targetWrapper.innerHTML = "";
    modal.style.display = "none";
    const loadContainer = document.querySelector(".img-load-container");
    const deleteGallery = document.querySelector(".delete-gallery");
    const previousModal = document.querySelector(".back");
    const workForm = document.querySelector("#my-form");
    const titleModal = document.querySelector("#titlemodal");
    const contentBottom = document.querySelector(".bottom-content");
    const uploadedImg = document.querySelector("#uploadedimage");
    uploadedImg.innerHTML = "";
    uploadedImg.style.width = "0px";
    uploadedImg.style.height = "0px";
    contentBottom.style.display = "flex";
    previousModal.style.display = "none";
    loadContainer.style.display = "flex";
    titleModal.innerHTML = "Galerie photo";
    deleteGallery.style.display = "block";
    workForm.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeAttribute("click", closeModal);
    modal
      .querySelector(".close")
      .removeEventListener("click", closeModal);
    modal
      .querySelector(".js-modal-stop")
      .removeEventListener("click", closeModal);
    modal = null;
  };
  
  const stopPropagation = function (e) {
    e.stopPropagation();
  };
  
  document.querySelectorAll(".js-modal").forEach((a) => {
    a.addEventListener("click", openModal);
  });
  
  window.addEventListener("keydown", function (e) {
    /*Ajout de bind pour fermer la Modale*/ if (
      e.key === "Escape" ||
      e.key === "Esc"
    ) {
      closeModal(e);
    }
  });