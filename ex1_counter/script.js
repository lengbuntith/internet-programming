class Counter {
  start = 0;

  constructor(n) {
    this.start = n;
    this.storeNumber();
    this.display();
  }

  increase() {
    this.start = this.start + 1;
    this.storeNumber();
    this.display();
  }

  decrease() {
    this.start = this.start - 1;
    this.storeNumber();
    this.display();
  }

  reset() {
    this.start = 0;
    this.storeNumber();
    this.display();
  }

  display() {
    let color = "black";
    if (this.start > 0) color = "green";
    else if (this.start < 0) color = "red";
    document.getElementById(
      "number"
    ).innerHTML = `<h1 style="color: ${color}">${this.start}</h1>`;
  }

  storeNumber() {
    localStorage.setItem("start", JSON.stringify(this.start));
  }
}

let storeStart = JSON.parse(localStorage.getItem("start"));
let start = 0;

if (storeStart) start = storeStart;
let count = new Counter(start);
