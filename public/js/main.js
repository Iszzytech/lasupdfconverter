for (const dropZone of document.querySelectorAll(".drop-zone")) {
 dropZone.addEventListener("dragover", e => {
     e.preventDefault();
     dropZone.classList.add("drop-zone--over");
 });

    ["dragleave", "dragend"].forEach(type => {
     dropZone.addEventListener(type, e => {
       dropZone.classList.remove("drop-zone--over");
     });
 });

   
  // HTMLInputElement.addEventListener("change", e =>)   

  dropZone.addEventListener("drop", e => {
      e.preventDefault();
      if (e.dataTransfer.files.length) {
          HTMLInputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZone, e.dataTransfer.files[0]);
      }

      dropZone.classList.remove("drop-zone--over");
  });

  const customBtn = document.getElementById("custom-button");
const realBtn = document.getElementById("main-file");
   
        customBtn.addEventListener("click", e => {
            realBtn.click();
        });

      realBtn.addEventListener("change", e => {
        if(realBtn.files.length){
            updateThumbnail(dropZone, realBtn.files[0]);
        }
      });

} 





function updateThumbnail(dropZone, file) {

    let thumbnailElement = dropZone.querySelector(".drop-zone__thumb");

    console.log(file);

    if (dropZone.querySelector(".drop-zone__prompt")){

        dropZone.querySelector(".drop-zone__prompt").remove();
    }

    if (!thumbnailElement){
        thumbnailElement = document.createElement("div")
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZone.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    //show thumbnails for image files
  

    if (file.type.startsWith("image/")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${ reader.result}')`;
            thumbnailElement.style.backgroundSize = "200px 200px";
            thumbnailElement.style.backgroundRepeat = "no-repeat";
            thumbnailElement.style.backgroundPosition ="center center";
            document.getElementById("btnCon").style.display = "block";
            document.getElementById("btnCon").style.margin = "auto auto";
            document.getElementById("btnCon").style.marginBottom= "14px";
            document.getElementById("btnCon").style.backgroundColor = "#2B237C";
        }

    }
    else if(file.type.startsWith("application/")){
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {

            thumbnailElement.style.backgroundImage = `url('img/docimg.jpg')`;
            thumbnailElement.style.backgroundSize = "200px 200px";
            thumbnailElement.style.backgroundRepeat = "no-repeat";
            thumbnailElement.style.backgroundPosition ="center center";
            document.getElementById("btnCon").style.display = "block";
            document.getElementById("btnCon").style.margin = "auto auto";
            document.getElementById("btnCon").style.marginBottom= "14px";
            document.getElementById("btnCon").style.backgroundColor = "#2B237C";
        }
    }
}
