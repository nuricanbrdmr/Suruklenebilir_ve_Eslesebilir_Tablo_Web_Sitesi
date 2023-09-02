const wrappers = document.querySelectorAll(".wrapper");
let div1 = document.getElementById("div1");
let div2 = document.getElementById("div2");
let activeHeader = null;

let isDragging = false;
let startX, startY;
let svg = document.getElementById("svg");
let line = svg.querySelector("line");
let item2 = document.getElementById("item2");

function onDragStart(e, header) {
  activeHeader = header;
  activeHeader.classList.add("active");
  console.log(location1, activeHeader.getAttribute("data-no"))
}
let movementX;
let movementY
function onDrag(e) {
  if (!activeHeader) return;
  const wrapper = activeHeader.closest(".wrapper");
  if (!wrapper) return;

   movementX = e.movementX;
   movementY = e.movementY;

  let getStyle = window.getComputedStyle(wrapper);

  let left = parseInt(getStyle.left);
  let top = parseInt(getStyle.top);
  wrapper.style.left = left + movementX + "px";
  wrapper.style.top = top + movementY + "px";

   // Line'ın mevcut x1 ve y1 değerlerini alın
   let x1 = parseInt(line.getAttribute("x1"));
   let y1 = parseInt(line.getAttribute("y1"));
   let x2 = parseInt(line.getAttribute("x2"));
   let y2 = parseInt(line.getAttribute("y2"));
   
   if (activeHeader.getAttribute("data-no") == location1) {
     // Line'ın x1 ve y1 değerlerini güncelleyin
     line.setAttribute("x1", x1 + movementX);
     line.setAttribute("y1", y1 + movementY);
   } else {
     // Line'ın x2 ve y2 değerlerini güncelleyin
     line.setAttribute("x2", x2 + movementX);
     line.setAttribute("y2", y2 + movementY);
   }
}

function onDragEnd() {
  if (!activeHeader) return;
  activeHeader.classList.remove("active");
  activeHeader = null;
}

wrappers.forEach((wrapper) => {
  const header = wrapper.querySelector("header");

  header.addEventListener("mousedown", (e) => onDragStart(e, header));
});

document.addEventListener("mousemove", onDrag);
document.addEventListener("mouseup", onDragEnd);

let location1, location2;
function startDragging(event) {
  location1 = event.target.closest("li").getAttribute("data-no");
  console.log(location1);

  isDragging = true;
  startX = event.clientX;
  startY = event.clientY;

  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", startX);
  line.setAttribute("y2", startY);

  svg.classList.remove("hidden");

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", endDragging);
}

function drag(event) {
  if (isDragging) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    line.setAttribute("x2", mouseX);
    line.setAttribute("y2", mouseY);
  }
}

function endDragging(event) {
  if (isDragging) {
    isDragging = false;
    svg.classList.add("hidden");
    location2 = event.target.closest("li").getAttribute("data-no");

    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", endDragging);
    const classesToCheck = ["icon", "item", "bx", "item-name", "item-type", "select"];

    if (event.target.id === "item2" || classesToCheck.some(className => event.target.classList.contains(className))) {
      // Bağlantıyı oluşturun veya başka bir işlem yapın
      console.log("Bağlantı oluşturuldu.");
      svg.classList.remove("hidden");

    }
  }
}