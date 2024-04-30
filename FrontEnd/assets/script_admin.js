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