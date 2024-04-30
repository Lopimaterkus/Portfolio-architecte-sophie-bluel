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
      img.crossOrigin = "anonymous"; 
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
  
  /*Call API dans la Modale*/
  async function modalLoad() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
  
    const targetWrapper = document.querySelector(".img-load-container");
  
    targetWrapper.innerHTML = "";
  
    for (const image of data) {
      /*Ajout d'image dans la data*/
      const div = document.createElement("div");
      div.classList.add("work-item");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const trashButton = document.createElement("button");
      trashButton.classList.add("deleted-work");
      trashButton.dataset.id =
        image.id;
      title.textContent = "éditer";
      img.src = image.imageUrl;
      img.crossOrigin = "anonymous";
      trashButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash"></i>';
      div.appendChild(img);
      div.appendChild(title);
      div.appendChild(trashButton);
      targetWrapper.appendChild(div);
    } 
    /* Suppression des images */
    const deleteButtons =
      document.querySelectorAll(
        ".deleted-work"
      );
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async function (e) {
        e.preventDefault();
        let workId =
          button.dataset
            .id;
        const token = localStorage.getItem("jwtToken");
        await fetch(`http://localhost:5678/api/works/${workId}`, {
          method: "DELETE",
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        });
        const deletedWorkDiv = button.closest(".work-item");
        deletedWorkDiv.remove();
      });
    }); 
  }
  
  async function importWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
  }
  
  /* Définition de l'id(catégorie) associée à la nouvelle image */
  async function getFilterCategory(category) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    const data = await importWorks();
    let result = data.filter((item) => item.category.name === category); 
  
    for (const image of result) {
      /*Création de l'image via la data*/
      const div = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("p");
      title.textContent = image.title;
      img.src = image.imageUrl;
      img.alt = image.title;
      img.crossOrigin = "anonymous";
      div.appendChild(img);
      div.appendChild(title);
      gallery.appendChild(div);
    }
  }
  /* Modale Creation de travaux */
  async function creatingWork() {
    const loadContainer = document.querySelector(".img-load-container");
    const deleteGallery = document.querySelector(".delete-gallery");
    const previousModal = document.querySelector(".back");
    const workForm = document.querySelector("#my-form");
    const titleModal = document.querySelector("#titlemodal");
    const contentBottom = document.querySelector(".bottom-content");
    const hiddenContent = document.querySelector(".hide-content");
    const hiddenTxt = document.querySelector(".image-text");
    const hiddenFormat = document.querySelector(".image-format");
  
    hiddenContent.style.display = "flex";
    hiddenTxt.style.display = "flex";
    hiddenFormat.style.display = "flex";
    contentBottom.style.display = "none";
    previousModal.style.display = "block";
    loadContainer.style.display = "none";
    titleModal.innerHTML = "Ajout photo";
    deleteGallery.style.display = "none";
    workForm.style.display = "flex";
  }
    const targetAddWork = document.querySelector(".add-photo");
    targetAddWork.addEventListener("click", creatingWork);
  
  /* fleche back */
  async function modalPrevious() {
    const loadContainer = document.querySelector(".img-load-container");
    const deleteGallery = document.querySelector(".delete-gallery");
    const previousModal = document.querySelector(".back");
    const workForm = document.querySelector("#my-form");
    const titleModal = document.querySelector("#titlemodal");
    const contentBottom = document.querySelector(".bottom-content");
    const uploadedImg = document.querySelector("#uploadedimage");
    
    contentBottom.style.display = "flex";
    previousModal.style.display = "none";
    loadContainer.style.display = "flex";
    titleModal.innerHTML = "Galerie photo";
    deleteGallery.style.display = "block";
    uploadedImg.innerHTML = "";
    uploadedImg.style.width = "0px";
    uploadedImg.style.height = "0px";
    workForm.style.display = "none";
    workForm.reset();
  }
  const targetPrevious = document.querySelector(".back");
  targetPrevious.addEventListener("click", modalPrevious);
  
  async function createWork() {
    const token = localStorage.getItem("jwtToken");
    const imageForm = document.getElementById("image").files[0];
    const titleForm = document.getElementById("title").value;
    const categoryForm = document.getElementById("category").value;
  /* afficher l'image sélectionnée */
  const uploadedImageDiv = document.querySelector("#uploadedimage");
  const fileUpload = document.querySelector("#image");
  const sendWork = document.querySelector("#valid-photo");
  const hiddenContent = document.querySelector(".hide-content");
  const hiddenTxt = document.querySelector(".image-text");
  const hiddenFormat = document.querySelector(".image-format");
  
  fileUpload.addEventListener("change", getImage);
  
  function getImage(e) {
    hiddenContent.style.display = "none";
    hiddenTxt.style.display = "none";
    hiddenFormat.style.display = "none";
    sendWork.style.backgroundColor = "#1D6154";
    console.log(e.target.files[0]);
    console.log("images", e.target.files[0]);
    const imageToProcess = e.target.files[0];
  
    let newImg = new Image(imageToProcess.width, imageToProcess.height);
    newImg.src = URL.createObjectURL(imageToProcess);
    uploadedImageDiv.style.width = "130px";
    uploadedImageDiv.style.height = "169px";
    uploadedImageDiv.appendChild(newImg);
  }
  
  function logout() {
    localStorage.removeItem("jwtToken");
  }
  targetLogout = document.querySelector("#btn-link-logout");
  targetLogout.addEventListener("click", logout);

  /*Update de la liste sur appui des boutons de filtres*/
  const boutonFilterTous =
    document.querySelector("#tous"); 
  const boutonFilterObjet =
    document.querySelector("#objets"); 
  const boutonFilterAppartements =
    document.querySelector("#appartements"); 
  const boutonFilterHotels =
    document.querySelector(
      "#hotels"
    ); 
  boutonFilterTous.addEventListener("click", async function () {
    const gallery = document.querySelector(".gallery"); 
    gallery.innerHTML = ""; 
    importImages(); 
  });
  
  boutonFilterObjet.addEventListener("click", async function () {
    getFilterCategory("Objets");
  });
  
  boutonFilterAppartements.addEventListener("click", async function () {
    getFilterCategory("Appartements");
  });
  
  boutonFilterHotels.addEventListener("click", async function () {
    getFilterCategory("Hotels & restaurants");
  });
}