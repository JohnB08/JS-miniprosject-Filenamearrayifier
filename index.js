const uploadBtn = document.querySelector("#uploadBtn");
const fileUploadForm = document.querySelector("#fileUpload");
const fileInput = document.querySelector("#fileInput");
const functionSelect = document.querySelector("#functionSelect");
const fileOptions = document.querySelector("#fileOptions");
const folderLabel = document.createElement("label");
folderLabel.setAttribute("for", "folderNameInput");
folderLabel.setAttribute("id", "folderLabel");
folderLabel.textContent = "Foldername that contains the files!";
const folderNameInput = document.createElement("input");
folderNameInput.setAttribute("type", "text");
folderNameInput.setAttribute("id", "folderNameInput");
folderLabel.appendChild(folderNameInput);
fileUploadForm.appendChild(folderLabel);
folderLabel.style.display = "none";
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
  if (fileInput.value === "") {
    outputText = "Please select Files";
    return;
  }
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

//funksjon som skriver filnavnene som en objectpseudokode. Spør også etter folder navnet filene tilhører.
function objectify(event) {
  event.preventDefault();
  if (fileInput.value === "") {
    outputText = "Please select Files";
    return;
  }
  //legger ved noen guardclauses just in case.
  if (
    folderNameInput.value === "" ||
    folderNameInput.value.includes("/") ||
    folderNameInput.value.includes("{") ||
    folderNameInput.value.includes(".") ||
    folderNameInput.value.includes("(") ||
    folderNameInput.value.includes("=")
  ) {
    outputText.textContent = "Please set a valid filename";
    return;
  }
  //fetcher filene lagt inn i input.
  let fileNameArray = getFiles();
  let stringifiedObject = "";
  //lager en loop for hvert filename som lager en simpel key/value pair navn basert på filnavnet
  fileNameArray.forEach((fileName) => {
    stringifiedObject += `${fileName.slice(0, -4)}: "${fileName}", `;
  });
  //skriver dette inn i en pseudokode som blir satt som textcontent til output.
  outputText.textContent = `const fileNameObject = {folder: "./${folderNameInput.value}/", filenames: {${stringifiedObject}}}`;
}
//eventlistener på knapp.
uploadBtn.addEventListener("click", (event) => {
  if (functionSelect.value === "Object") objectify(event);
  else arrayify(event);
});
// Skifte mellom array og Object.
functionSelect.addEventListener("change", () => {
  if (functionSelect.value === "Object") folderLabel.style.display = "block";
  else {
    folderLabel.style.display = "none";
  }
});

//eventlistener for å se hvilke filtype som er valgt.
fileOptions.addEventListener("change", () => {
  //tømmer fileinput, sånn at gamle filer ikke skaper kluss.
  fileInput.value = null;
  if (fileOptions.value === "sound") fileInput.accept = "audio/*";
  else if (fileOptions.value === "video") fileInput.accept = "video/*";
  else if (fileOptions.value === "image") fileInput.accept = "image/*";
});
fileUploadForm.addEventListener("submit", (event) => {
  event.preventDefault();
});
