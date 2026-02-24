const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach(button => {
  button.addEventListener("click", () => {

    // Remover activos
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));

    // Activar seleccionado
    button.classList.add("active");
    const target = document.getElementById(button.dataset.tab);
    target.classList.add("active");
  });
});