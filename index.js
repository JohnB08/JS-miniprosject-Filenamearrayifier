const uploadBtn = document.querySelector("#uploadBtn");
const fileUploadForm = document.querySelector("#fileUpload");
//lager et tomt fileSaveArray
const fileSaveArray = [];
//Lager en funksjon som tar inn alle navnene fra filene lagt inn, og spytter ut en copypasteable string som kan limes inn i andre dokumenter.
function uploadFiles(event) {
  event.preventDefault();
  const fileInput = document.querySelector("#fileInput");
  const selectedFiles = fileInput.files;
  console.log(selectedFiles);
  for (let i = 0; i < selectedFiles.length; i++) {
    fileSaveArray.push(selectedFiles[i].name);
  }
  let arrayString = "";
  fileSaveArray.forEach((fileName) => {
    arrayString += `"${fileName}",`;
  });
  console.log(arrayString);
  let arrayText = document.createElement("p");
  arrayText.textContent = `const fileNameArray = [${arrayString}]`;
  fileUploadForm.appendChild(arrayText);
  console.log(fileSaveArray);
}
//eventlistener på knapp.
uploadBtn.addEventListener("click", uploadFiles);
