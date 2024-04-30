
async function importImages() {
    /*Récupération des données + définition des constantes liées*/
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json(); 
    const gallery = document.querySelector(".gallery");
  
    for (const image of data) {
      /*Création dans le html pour chaque image dans la data*/
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
  
   /*Création des filtres*/
   const boutonFilterTous = document.querySelector("#tous");
   const boutonFilterObjet = document.querySelector("#objets");
   const boutonFilterAppartements = document.querySelector("#appartements");
   const boutonFilterHotels = document.querySelector("#hotels");
   

    boutonFilterTous.addEventListener("click",async function () { 
        const gallery = document.querySelector(".gallery"); 
        gallery.innerHTML=""; 
        importImages(); 
    })
      
    /*Définition d'Objets*/
    boutonFilterObjet.addEventListener("click",async function () { 
        const gallery = document.querySelector(".gallery");  
        gallery.innerHTML=""; 
        const response = await fetch("http://localhost:5678/api/works"); 
        const data = await response.json(); 
        let result = data.filter(item => item.category.name === "Objets"); 
  
        for (const image of result) {
          /*Gestion du filtre pour Objets*/
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
    })
  
    /*Définition d'Appartements*/
    boutonFilterAppartements.addEventListener("click",async function () {
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML="";
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        let result = data.filter(item => item.category.name === "Appartements");
  
        for (const image of result) {
          /*Gestion du filtre pour Appartements*/
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
    })
    /*Définition d'Hotels&Restaus*/
    boutonFilterHotels.addEventListener("click",async function () {
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML="";
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        let result = data.filter(item => item.category.name === "Hotels & restaurants");
  
        for (const image of result) {
          /*Gestion du filtre pour Hotels&Restaus*/
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
    })
  
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