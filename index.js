const carrossel = document.querySelector(".carrossel");
firstImg =carrossel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevScrollLeft;

const showHideIcons = () => {
    let scrollWidth = carrossel.scrollWidth - carrossel.clientWidth;
    arrowIcons[0].style.display = carrossel.scrollLeft == 0 ? "nonde" : "block";
    arrowIcons[1].style.display = carrossel.scrollLeft == scrollWidth ? "nonde" : "block";
};

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () =>{
        let firstImgWidth = firstImg.clientWidth + 390;
        carrossel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60)
    });
});

const DragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX; 
    prevScrollLeft = carrossel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    carrossel.classList.add("dragging");
    let positionDiff  = e.pageX - prevPageX;
    carrossel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carrossel.classList.remove("dragging");
}

carrossel.addEventListener('mousedown', DragStart);
carrossel.addEventListener('mousemove', dragging);
carrossel.addEventListener('mouseup', dragStop);
carrossel.addEventListener('mouseleave', dragStop);