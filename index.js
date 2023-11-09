const uploadBtn = document.querySelector("#uploadBtn");
const formContainer = document.querySelector(".inputcontainer");
const form = document.querySelector("#fileUpload");
const fileInput = document.querySelector("#fileInput");
const fileInputLabel = document.querySelector("#fileInputLabel");
const functionSelect = document.querySelector("#functionSelect");
const fileOptions = document.querySelector("#fileOptions");
const outputDiv = document.querySelector("#outputDiv");
const inputContainer = document.createElement("div");
inputContainer.className = "container objectContainer";
const folderLabel = document.createElement("label");
folderLabel.setAttribute("for", "folderNameInput");
folderLabel.setAttribute("id", "folderLabel");
folderLabel.textContent = "Foldername that contains the files!";
const folderNameInput = document.createElement("input");
folderNameInput.setAttribute("type", "text");
folderNameInput.setAttribute("id", "folderNameInput");
inputContainer.appendChild(folderLabel);
inputContainer.appendChild(folderNameInput);

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

const fileNameIconCleanerArray = ["-", " ", "_", "–", ")", "("];

//fileNameNormalizer, mapper fileNameNormalizer, og finner alle tegn som passer med fileNameIconCleanerArray,
//fjerner de karakterene, og setter karakteren etter til uppercase.
const fileNameNormalizer = (fileName) => {
  let fileNameArray = fileName.split("");
  fileNameArray[0] = fileNameArray[0].toLowerCase();
  //"mapper" ut arrayet, og sammenligner arrayet med fileNameIconCleanerArray.
  fileNameArray.map((character) => {
    if (fileNameIconCleanerArray.includes(character)) {
      fileNameArray[fileNameArray.indexOf(character) + 1].toUpperCase;
      fileNameArray.splice([fileNameArray.indexOf(character)], 1, "");
    }
  });
  //fjerner filtype fra filename.
  let fileTypeArray = fileNameArray.join("").split(".");
  fileTypeArray.pop();
  return (fileName = fileTypeArray.join(""));
};
//Gamle fileNameNormalizer, beholder den for å ha en referanse til rekursivitet.
/* const fileNameNormalizer = (fileName) => {
  let trimmedFileName = [];
  if (fileName.includes("-")) {
    trimmedFileName = fileName.split("-");
  } else if (fileName.includes("_")) {
    trimmedFileName = fileName.split("_");
  } else if (fileName.includes("–")) {
    trimmedFileName = fileName.split(" – ");
  } else if (fileName.includes("(")) {
    trimmedFileName = fileName.split("(");
  } else if (fileName.includes(")")) {
    trimmedFileName = fileName.split(")");
  } else {
    trimmedFileName = fileName.split(" ");
  }
  //loop som camelCaseifyer key
  for (let i = 0; i < trimmedFileName.length; i++) {
    if (i === 0) {
      let str = trimmedFileName[i];
      strArray = str.split("");
      strArray[0] = strArray[0].toLowerCase();
      trimmedFileName[i] = strArray.join("");
    } else {
      let str = trimmedFileName[i];
      strArray = str.split("");
      console.log(strArray[0]);
      strArray[0] = strArray[0].toUpperCase();
      trimmedFileName[i] = strArray.join("");
    }
  }
  trimmedFileName = trimmedFileName.join("");
  //hvis den fremdeles finner tegn i trimmmedFileName, start på nytt.
  if (
    trimmedFileName.includes("_") ||
    trimmedFileName.includes("-") ||
    trimmedFileName.includes(" – ") ||
    trimmedFileName.includes("(") ||
    trimmedFileName.includes(")") ||
    trimmedFileName.includes(" ")
  )
    return fileNameNormalizer(trimmedFileName);
  //fjerner . og filetype
  if (trimmedFileName.includes(".")) {
    let fileNameArray = trimmedFileName.split("."); //fjerner alle . fra filename
    let fileType = fileNameArray.pop(); //finner filetype.
    let fileNameKey = fileNameArray
      .splice(fileNameArray.indexOf(fileType), 1, "")
      .join(""); //fjerner filetype fra filename
    /*     console.log(fileNameKey); */
/*    return (fileName = fileNameKey);
  }
}; */
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

//checking if outputtext exists
function makeOutput() {
  let existingText = document.querySelector("p");
  if (existingText) existingText.remove();
  const outputText = document.createElement("p");
  outputDiv.appendChild(outputText);
  return outputText;
}
//Lager en funksjon som tar inn alle navnene fra filene lagt inn, og spytter ut en copypasteable string som kan limes inn i andre dokumenter.
function arrayify(event) {
  event.preventDefault();
  if (fileInput.value === "") {
    fileError();
    return;
  }
  //henter in input element fra html
  errorRemover();
  let fileNameArray = getFiles();
  let stringifiedArray = "";
  //lager en string basert på filenames
  fileNameArray.forEach((fileName) => {
    stringifiedArray += `"${fileName}", `;
  });
  let outputText = makeOutput();
  //lager et p element, putter inn den komplette arraystringen inn i pseudokoden og appender det til formen.
  outputText.textContent = `const fileNameArray = [${stringifiedArray}];`;
  console.log(fileNameArray);
}
//error message for fileLabel
function fileError() {
  fileInputLabel.textContent = "Please select valid files.";
  fileInputLabel.style.color = "red";
}

//error message for folderlabel
function folderNameError() {
  folderLabel.textContent = "Please write valid foldername";
  folderLabel.style.color = "red";
}

function errorRemover() {
  folderLabel.innerText = "Foldername that contains the files!";
  folderLabel.style.color = "black";
  fileInputLabel.innerText = "Choose files to Arrayify or Objectify";
  fileInputLabel.style.color = "black";
}

//funksjon som skriver filnavnene som en objectpseudokode. Spør også etter folder navnet filene tilhører.
function objectify(event) {
  event.preventDefault();
  if (fileInput.value === "") {
    fileError();
    return;
  }
  //legger ved noen guardclauses just in case.
  if (
    folderNameInput.value === "" ||
    illegalCharacterChecker(folderNameInput.value)
  ) {
    folderNameError();
    return;
  }
  //korrigerer hvis error
  errorRemover();
  //fetcher filene lagt inn i input.
  let fileNameArray = getFiles();
  let stringifiedObject = "";
  //lager en loop for hvert filename som lager en simpel key/value pair navn basert på filnavnet
  fileNameArray.forEach((fileName) => {
    let trimmedFileName = fileNameNormalizer(fileName); //.trim() finner ikke alltid mellomrom i filnavn.
    stringifiedObject += `${trimmedFileName}: "${fileName}", `;
  });
  let outputText = makeOutput();
  //skriver dette inn i en pseudokode som blir satt som textcontent til output.
  outputText.textContent = `const fileNameObject = {folder: "./${folderNameInput.value}/", fileNames: {${stringifiedObject}}}`;
}
// Skifte mellom array og Object.
functionSelect.addEventListener("change", () => {
  if (functionSelect.value === "Object") {
    formContainer.appendChild(inputContainer);
    uploadBtn.textContent = "Make my Object!";
  } else {
    let labelExists = document.querySelector(".objectContainer");
    if (labelExists) labelExists.remove();
    uploadBtn.textContent = "Make my Array!";
  }
});
//button event listener
uploadBtn.addEventListener("click", (event) => {
  event.preventDefault();
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

//eventlistener på formContainer for preventDefault.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (functionSelect.value === "Object") objectify(event);
  else arrayify(event);
});
