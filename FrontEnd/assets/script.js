// Fonction pour récupérer les données depuis votre API
async function getDataFromAPI() {
  try {
      const response = await fetch('http://localhost:5678/api/categories');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Erreur lors de la récupération des données depuis l\'API :', error);
  }
}
async function importImages() {
  /*Récupération des données + définition des constantes liées*/
  const response = await fetch("http://localhost:5678/api/works");
  const data = await response.json(); 
  const gallery = document.querySelector(".gallery");

  for (const image of data) {
    /*Définition état par défaut + Tous*/
    const div = document.createElement ("div");
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

async function checkAccess() {
  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId")
  console.log(userId)
  console.log(token);
    if (!token || userId != 1) {
      async function createButtons() {
      try {
      const response = await fetch('http://localhost:5678/api/categories');
      const data = await response.json();
      
      const logoutclass = document.getElementById('logout');
      logoutclass.classList.add('hide');
      
      
      const modifier_etlogo = document.getElementById('modifier_etlogo');
      modifier_etlogo.classList.add('hide');
      modifier_etlogo.classList.remove('modifier-kit-bot');

      const buttonContainer = document.getElementById('container-btns');
      if (!buttonContainer) {
          console.error('L\'élément avec l\'ID "container-btns" n\'a pas été trouvé dans le document.');
          return;
      }
      // Création du bouton "Tous"
      const allButton = document.createElement('button');
      allButton.textContent = 'Tous';
      allButton.setAttribute('id', 'Tous');
      allButton.setAttribute('data-category', 'Tous'); // Ajout de l'attribut data-category
      allButton.classList.add('btn-projets');
      allButton.addEventListener('click', () => {
          // Action à effectuer lors du clic sur le bouton "Tous"
          handleFilterButtonClick('Tous'); // Appel de la fonction avec la catégorie "Tous"
      });
      buttonContainer.appendChild(allButton);

      data.forEach(category => {
          const button = document.createElement('button');
          button.textContent = category.name;
          button.setAttribute('id', category.name);
          button.setAttribute('data-category', category.id); // Ajout de l'attribut data-category avec l'ID de la catégorie
          button.classList.add('btn-projets');
          button.addEventListener('click', () => {
              // Action à effectuer lors du clic sur le bouton
              const categoryId = button.getAttribute('data-category'); // Récupération de l'ID de la catégorie
              handleFilterButtonClick(categoryId); // Appel de la fonction avec l'ID de la catégorie
          });
          buttonContainer.appendChild(button);
      });
      } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
        }
      }

    // Appel de la fonction pour créer les boutons au chargement de la page
    window.onload = createButtons;
    // Fonction pour créer les sélecteurs dynamiques avec les données de l'API
    async function createDynamicSelectors() {
      const dataFromAPI = await getDataFromAPI();
  
        if (dataFromAPI) {
          dataFromAPI.forEach(item => {
          const name = item.name.replace(/\s+/g, '-').toLowerCase();
          const selector = document.querySelector(`#${name}`);
          if (selector) {
              selector.addEventListener('click', () => {
              });
                }
              });
            }
          }

    async function handleFilterButtonClick(categoryId) {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      const response = await fetch("http://localhost:5678/api/works");
     const data = await response.json();

      let result;
        if (categoryId === "Tous") {
          result = data;
        } else {
          result = data.filter(item => {
            // Convertir l'ID de la catégorie de l'API en chaîne de caractères
            const categoryStringId = item.category.id.toString();
            return categoryStringId === categoryId;
            });
        }

      for (const image of result) {
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
    async function addFilterButtonListeners() {
    const boutonsFilters = document.querySelectorAll(".btn-projets");

        boutonsFilters.forEach(button => {
            button.addEventListener("click", async function () {
                const category = button.getAttribute("data-category");
                await handleFilterButtonClick(category);
            });
       });
    }

    // Appel de la fonction pour ajouter les écouteurs d'événements aux boutons de filtre
    addFilterButtonListeners();
  
  } else {
    const loginclass = document.getElementById('login');
      loginclass.classList.add('hide');

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

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    importImages();
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
      /*Ajout des éléments dans le html par image*/
      const div = document.createElement("div");
      div.classList.add("work-item");
      const img = document.createElement("img");
      const title = document.createElement("p");
      const trashButton = document.createElement("button");
      trashButton.classList.add("deleted-work");
      trashButton.dataset.id =
      image.id;
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
        const token = localStorage.getItem("Token");
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
  
  /*Update en temps réel (call API)*/
  async function importWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
  }
  
  async function getFilterCategory(category) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    const data = await importWorks();
    let result = data.filter((item) => item.category.name === category); 
  
    for (const image of result) {
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
  
  
  /* Fleche back */
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
    const token = localStorage.getItem("Token");
    const imageForm = document.getElementById("image").files[0];
    const titleForm = document.getElementById("title").value;
    const categoryForm = document.getElementById("category").value;
    /* Gestion d'erreurs */
    if (!imageForm || !titleForm || !categoryForm) {
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", imageForm);
    formData.append("title", titleForm);
    formData.append("category", categoryForm);
  
    await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        modalLoad();
        modalPrevious()
      })
      .catch((error) => {
        console.error("problem with the fetch operation:", error);
      });
  }
  
  
  document.getElementById("my-form").addEventListener("submit", function (event) {
    event.preventDefault();
    createWork();
  });
  
  
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
  async function createDynamicSelect() {
    const select = document.getElementById('category');

    const dataFromAPI = await getDataFromAPI();

    if (dataFromAPI) {
        dataFromAPI.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        });
    }
}

window.onload = createDynamicSelect;

    function logout() {
      localStorage.removeItem("Token");
    }
    targetLogout = document.querySelector("#btn-link-logout");
    targetLogout.addEventListener("click", logout);
  }}
  if (window.location.href.endsWith('index.html')) {
    checkAccess();
     }
  /* Activation des filtres fonctionnels */
  const buttons = document.querySelectorAll('.btn-projets');
  
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('active');
      
      buttons.forEach(otherButton => {
        if (otherButton !== button) {
          otherButton.classList.remove('active');
        }
      });
    });
  });