let p = require("path")

let file = document.getElementById("file-to-upload");
file.addEventListener("change", () => {
    const selectedFile = file.files[0];
   document.getElementById("file-label").innerText = selectedFile.name;
});

let path = document.getElementById("path");
path.addEventListener("change", () => {
    const selectedFile = path.files[0];
    let directory = selectedFile.path;
   document.getElementById("path-label").innerText = p.dirname(directory);
});