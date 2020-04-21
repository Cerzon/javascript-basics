var errMsg = document.querySelector("#fullsize p"),
    imgTag = document.querySelector("#fullsize img"),
    thumbs = document.querySelectorAll("#thumbnails img");

function thumbClick(event) {
    var imgName = event.target.getAttribute("src").split("thumbs/")[1];
    for(var tn of thumbs) {
        tn.className = "";
    }
    event.target.className = "active";
    errMsg.style.display = "none";
    imgTag.setAttribute("src", `images/${imgName}`);
    imgTag.setAttribute("alt", imgName.split(".")[0].replace("_", " "));
    imgTag.style.display = "block";
}

function loadError(event) {
    var imgName = event.target.getAttribute("src").split("images/")[1];
    imgTag.style.display = "none";
    errMsg.innerText = `Файл с полноразмерным изображением ${imgName} отсутствует!`;
    errMsg.style.display = "block";
}

imgTag.addEventListener("error", loadError);

for(var tn of thumbs) {
    tn.addEventListener("click", thumbClick);
}