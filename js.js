document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file-input");
    const largeImg = document.getElementById("large-img");
    const smallImgBox = document.querySelector(".small-img-box");
    const errorPopup = document.getElementById("error-popup");

    const smallImgs = [];

fileInput.addEventListener("change", function(event) {
    const files = Array.from(event.target.files);
    const validExtensions = ["image/png", "image/jpeg", "image/jpg", "application/pdf", "image/svg+xml", "image/vnd.adobe.photoshop", "application/postscript", "application/illustrator"];
    const maxFileSize = 5 * 1024 * 1024;
    const existingFileNames = smallImgs.map(img => img.name);

    files.forEach(file => {
        if (existingFileNames.includes(file.name)) {
            showError("File already exists. Please select a different file.");
        } else if (!validExtensions.includes(file.type) || file.size > maxFileSize) {
            showError("Invalid file type or size. Please select a valid file.");
        } else {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                imgElement.alt = file.name;
                imgElement.style.width = "100px";
                imgElement.style.height = "100px";
                smallImgBox.insertBefore(imgElement, smallImgBox.firstChild);
                smallImgs.unshift(file);

                largeImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    adjustSmallImgBox();
});

function showError(message) {
    errorPopup.textContent = message;
    errorPopup.classList.add("show");
    setTimeout(() => {
        errorPopup.classList.remove("show");
    }, 3000);
}

function adjustSmallImgBox() {
    const images = smallImgBox.querySelectorAll("img");

    if (images.length > 3) {
        smallImgBox.classList.add("scrollable");
        images.forEach(img => {
            img.style.width = "calc(99% / 3)";
        });
    } else {
        smallImgBox.classList.remove("scrollable");
        images.forEach(img => {
            img.style.width = `${100 / images.length}%`;
        });
    }
}
});