const uploadBtn = document.querySelector("#uploadBtn");
const fileUploadForm = document.querySelector("#fileUpload");
const fileInput = document.querySelector("#fileInput");
const functionSelect = document.querySelector("#functionSelect");
const folderLabel = document.createElement("label");
folderLabel.setAttribute("for", "folderNameInput");
folderLabel.setAttribute("id", "folderLabel");
folderLabel.textContent = "Set a foldername!";
const folderNameInput = document.createElement("input");
folderNameInput.setAttribute("type", "text");
folderNameInput.setAttribute("id", "folderNameInput");
folderLabel.appendChild(folderNameInput);
const outputText = document.createElement("p");
fileUploadForm.appendChild(outputText);

//lager et tomt fileSaveArray

function getFiles() {
  let fileNameArray = [];
  //input.files er alle filene som er lagt inn i input elementet når knappen er trykket.
  const selectedFiles = fileInput.files;
  //dette er en fileList, som ikke funker *helt* som et array, men kan loopes gjennom med vanlig for løkke.
  for (let i = 0; i < selectedFiles.length; i++) {
    //pusher navnet til hver fil inn i fileSaveArray
    fileNameArray.push(selectedFiles[i].name);
    //lager en tom string
  }
  return fileNameArray;
}
//Lager en funksjon som tar inn alle navnene fra filene lagt inn, og spytter ut en copypasteable string som kan limes inn i andre dokumenter.
function arrayify(event) {
  event.preventDefault();
  //henter in input element fra html
  let fileNameArray = getFiles();
  let stringifiedArray = "";
  //lager en string basert på filenames
  fileNameArray.forEach((fileName) => {
    stringifiedArray += `"${fileName}", `;
  });
  //lager et p element, putter inn den komplette arraystringen inn i pseudokoden og appender det til formen.
  outputText.textContent = `const fileNameArray = [${stringifiedArray}];`;
  console.log(fileNameArray);
}

function objectify(event) {
  event.preventDefault();
  let fileNameArray = getFiles();
  let stringifiedObject = "";
  fileNameArray.forEach((fileName) => {
    stringifiedObject += `${fileName.slice(0, -4)}:{filename: "${fileName}"}, `;
  });
  outputText.textContent = `const fileNameObject = {folder: "./${folderNameInput.value}/", ${stringifiedObject}}`;
}
//eventlistener på knapp.
uploadBtn.addEventListener("click", (event) => {
  if (functionSelect.value === "Object") objectify(event);
  else arrayify(event);
});
// Skifte mellom array og Object.
functionSelect.addEventListener("change", () => {
  if (functionSelect.value === "Object")
    fileUploadForm.appendChild(folderLabel);
  else {
    let currentInput = document.querySelector("#folderLabel");
    if (currentInput) currentInput.remove();
  }
});
