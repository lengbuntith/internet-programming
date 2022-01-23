const menuBtn = document.getElementById("menu");
const closeBtn = document.getElementById("close");
const sideBar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sideBar.classList.toggle("sidebar");
});

closeBtn.addEventListener("click", ()=> {
    sideBar.classList.remove("sidebar")
})