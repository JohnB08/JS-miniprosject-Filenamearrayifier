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

//lager et array med karaktere som skal bli ignorert.
illegalCharacters = [
  "@",
  "[",
  "]",
  "(",
  ")",
  "{",
  "}",
  "?",
  "=",
  "$",
  "+",
  "/",
  "!",
  "<",
  ">",
  "*",
  ":",
  '"',
  ",",
  ";",
];

//funksjon som sammenligner en string, med karakterene i illegalCharacters.
const illegalCharacterChecker = (string) => {
  let stringArray = string.split("");
  return stringArray.some((character) => illegalCharacters.includes(character));
};
/* console.log(illegalCharacterChecker("Hello!")); */

//funksjon for å normalisere filenames, fjerner mellomrom, og alt bak siste punktum.
const fileNameNormalizer = (fileName) => {
  let trimmedFileName = fileName.split(" ");
  //loop som camelCaseifyer key
  for (let i = 0; i < trimmedFileName.length; i++) {
    if (i === 0) {
      trimmedFileName[i] = trimmedFileName[i].toLowerCase();
    } else {
      let str = trimmedFileName[i];
      strArray = str.split("");
      strArray[0] = strArray[0].toUpperCase();
      trimmedFileName[i] = strArray.join("");
    }
  }
  console.log(trimmedFileName);
  trimmedFileName = trimmedFileName.join("");
  if (trimmedFileName.includes(".")) {
    let fileNameArray = trimmedFileName.split("."); //fjerner alle . fra filename
    let fileType = fileNameArray.pop(); //finner filetype.
    let fileNameKey = fileNameArray
      .splice(fileNameArray.indexOf(fileType), 1, "")
      .join(""); //fjerner filetype fra filename
    /*     console.log(fileNameKey); */
    return (fileName = fileNameKey);
  }
};
//fil som henter filnavnene fra fileInput, og legger de i et filenameArray. returner arrayet.
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
    outputText.textContent = "Please select Files";
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
    outputText.textContent = "Please select Files";
    return;
  }
  //legger ved noen guardclauses just in case.
  if (
    folderNameInput.value === "" ||
    illegalCharacterChecker(folderNameInput.value)
  ) {
    outputText.textContent = "Please set a valid filename";
    return;
  }
  //fetcher filene lagt inn i input.
  let fileNameArray = getFiles();
  let stringifiedObject = "";
  //lager en loop for hvert filename som lager en simpel key/value pair navn basert på filnavnet
  fileNameArray.forEach((fileName) => {
    let trimmedFileName = fileNameNormalizer(fileName); //.trim() finner ikke alltid mellomrom i filnavn.
    stringifiedObject += `${trimmedFileName}: "${fileName}", `;
  });
  //skriver dette inn i en pseudokode som blir satt som textcontent til output.
  outputText.textContent = `const fileNameObject = {folder: "./${folderNameInput.value}/", filenames: {${stringifiedObject}}}`;
}
// Skifte mellom array og Object.
functionSelect.addEventListener("change", () => {
  if (functionSelect.value === "Object") folderLabel.style.display = "block";
  else {
    folderLabel.style.display = "none";
  }
});
//button event listener
uploadBtn.addEventListener("click", (event) => {
  if (functionSelect.value === "Object") objectify(event);
  else arrayify(event);
});

//eventlistener for å se hvilke filtype som er valgt.
fileOptions.addEventListener("change", () => {
  //tømmer fileinput, sånn at gamle filer ikke skaper kluss.
  fileInput.value = null;
  if (fileOptions.value === "sound") fileInput.accept = "audio/*";
  else if (fileOptions.value === "video") fileInput.accept = "video/*";
  else if (fileOptions.value === "image") fileInput.accept = "image/*";
});

//eventlistener på fileUploadForm for preventDefault.
fileUploadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (functionSelect.value === "Object") objectify(event);
  else arrayify(event);
});
