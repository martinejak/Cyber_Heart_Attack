// Gør et vindue trækbart ved at lytte på dets header
function makeDraggable(el) {
    const header = el.querySelector(".window-header");
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    // Start træk når musen trykkes ned på header
    header.addEventListener("mousedown", dragMouseDown);
  
    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      // Reagere på musebevægelser og slip globalt
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }
  
    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      el.style.top = (el.offsetTop - pos2) + "px";
      el.style.left = (el.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
  }
  
  // Funktion til at skjule et vindue (hvis du har brug for den senere)
  function closeWindow(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  }
  
  // Når DOM'en er klar, gør alle vinduer med .window-style trækbare
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".window-style").forEach(makeDraggable);
  });
  