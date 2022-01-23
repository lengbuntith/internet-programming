class GenerateColor {
  colors = [];

  constructor(colors) {
    this.colors = colors;
    this.store();
    this.display();
  }

  generate() {
    let code = Math.floor(Math.random() * 16777215).toString(16);
    this.colors.unshift(code.toUpperCase());
    this.store();
    this.display();
  }

  reset() {
    this.colors = [];
    this.store();
    this.display();
  }

  store() {
    localStorage.setItem("colors", JSON.stringify(this.colors));
  }

  display() {
    console.log(this.colors);
    if (this.colors.length > 0) {
      document.getElementById("latestColor").innerHTML = `#${this.colors[0]}`;
      document.getElementById("boxLatestColor").style.backgroundColor =
        "#" + this.colors[0];
    } else {
      document.getElementById("latestColor").innerHTML = ``;
      document.getElementById("boxLatestColor").style.backgroundColor =
        "#EEEEEE";
    }

    let html = ``;

    for (let i = 0; i < this.colors.length; i++) {
      html =
        html +
        `<li class="color-item">
          <div style="background-color: #${this.colors[i]}" class="color-box"></div>
          <div class="color-code">#${this.colors[i]}</div>
        </li>`;
    }

    document.getElementById("list").innerHTML = html;
  }
}

let storeColors = JSON.parse(localStorage.getItem("colors"));
let colors = [];

if (storeColors) colors = storeColors;
let generator = new GenerateColor(colors);
