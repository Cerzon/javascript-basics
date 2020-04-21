// работает только на запущеном веб-сервере

var errMsg = document.querySelector("#fullsize p"),
    imgTag = document.querySelector("#fullsize img"),
    thumbs = document.querySelectorAll("#thumbnails img");

function thumbClick(event) {
    var imgName = event.target.getAttribute("src").split("thumbs/")[1];
    for(var tn of thumbs) {
        tn.className = "";
    }
    event.target.className = "active";
    fetch(`images/${imgName}`).then(function(response) {
        if(response.ok) {
            errMsg.style.display = "none";
            imgTag.setAttribute("src", `images/${imgName}`);
            imgTag.setAttribute("alt", imgName.split(".")[0].replace("_", " "));
            imgTag.style.display = "block";
        }
        else {
            imgTag.style.display = "none";
            errMsg.innerText = `Файл с полноразмерным изображением ${imgName} отсутствует!`;
            errMsg.style.display = "block";
        }
    })
}

for(var tn of thumbs) {
    tn.addEventListener("click", thumbClick);
}