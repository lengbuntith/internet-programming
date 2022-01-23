const menuBtn = document.getElementById("menu");
const navigatorMenu = document.getElementById("navigator");
const iconMenu = document.getElementById("icon");

menuBtn.addEventListener("click", () => {
  console.log("click");
  iconMenu.classList.toggle("icon-rotate");
  navigatorMenu.classList.toggle("toggle");
});
