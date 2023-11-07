const uploadBtn = document.querySelector("#uploadBtn");
const fileUploadForm = document.querySelector("#fileUpload");
//lager et tomt fileSaveArray
const fileSaveArray = [];
//Lager en funksjon som tar inn alle navnene fra filene lagt inn, og spytter ut en copypasteable string som kan limes inn i andre dokumenter.
function uploadFiles(event) {
  event.preventDefault();
  //henter in input element fra html
  const fileInput = document.querySelector("#fileInput");
  //input.files er alle filene som er lagt inn i input elementet når knappen er trykket.
  const selectedFiles = fileInput.files;
  console.log(selectedFiles);
  //dette er en fileList, som ikke funker *helt* som et array, men kan loopes gjennom med vanlig for løkke.
  for (let i = 0; i < selectedFiles.length; i++) {
    //pusher navnet til hver fil inn i fileSaveArray
    fileSaveArray.push(selectedFiles[i].name);
  }
  //lager en tom string
  let arrayString = "";
  //lager en string basert på filenames
  fileSaveArray.forEach((fileName) => {
    arrayString += `"${fileName}", `;
  });
  console.log(arrayString);
  //lager et p element, putter inn den komplette arraystringen inn i pseudokoden og appender det til formen.
  let arrayText = document.createElement("p");
  arrayText.textContent = `const fileNameArray = [${arrayString}];`;
  fileUploadForm.appendChild(arrayText);
  console.log(fileSaveArray);
}
//eventlistener på knapp.
uploadBtn.addEventListener("click", uploadFiles);
