/* Desenvolva sua lógica aqui */
const modal = document.querySelector(".modal");
const buttonsControllersModal = document.querySelectorAll(
  "[data-control-modal]"
);

buttonsControllersModal.forEach((element) => {
  element.addEventListener("click", () => {
    modal.classList.toggle("showModal");
  });
});


