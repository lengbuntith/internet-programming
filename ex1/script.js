const listItems = document.getElementById("listItems");
const container = document.getElementById("container");
const loading = document.getElementById("loading");
const counter = document.getElementById("counter");

let all_data = [];
let page = 0;
let limit = 16;
let totalPages;
let loadMore = true;

showLoading(false);

container.addEventListener("scroll", () => {
  let clientHeight = container.clientHeight;
  let scrollTop = container.scrollTop;
  let scrollHeight = container.scrollHeight;
  console.log(clientHeight + scrollTop, " = ", scrollHeight);
  if (
    clientHeight + scrollTop >= scrollHeight &&
    loadMore &&
    page <= totalPages
  ) {
    console.log("fetch data...");
    getData();
  }
});



function showLoading(bool) {
  if (bool) loading.style.display = "inline-block";
  else loading.style.display = "none";
}

function renderData() {
  let html = ``;

  for (let i = 0; i < all_data.length; i++) {
    html =
      html +
      `<div class="item">
      <div class="item-top">
        <div> ${i}</div>
        <div class="icon">✈ :</div>
        <div class="title">${all_data[i].airline[0].name}</div>
      </div>
      
      <div class="item-bottom">
        <div class="icon">🙂 :</div>
        <div class="user">${all_data[i].name}</div>
      </div>
      </div>`;
  }

  listItems.innerHTML = html;
  setTimeout(() => {
    loadMore = true;
  }, 20);
}

function renderCountPage(page) {
  counter.innerHTML = `<h1>${page}</h1>`;
}

const getData = async () => {
  showLoading(true);
  loadMore = false;

  try {
    const res = await axios.get(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${limit}`
    );

    totalPages = res.data.totalPages;
    all_data = all_data.concat(res.data.data);
    showLoading(false);
    renderCountPage(page + 1);
    renderData();

    page = page + 1;
  } catch (error) {
    console.log(error);
    showLoading(false);
  }
};

getData();

/* 

{
    "_id": "5ff5c047522101e485a9a4c4",
    "name": "Pedro",
    "trips": null,
    "airline": [
        {
            "id": 4,
            "name": "Emirates",
            "country": "Dubai",
            "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/150px-Emirates_logo.svg.png",
            "slogan": "From Dubai to destinations around the world.",
            "head_quaters": "Garhoud, Dubai, United Arab Emirates",
            "website": "www.emirates.com/",
            "established": "1985"
        }
    ],
    "__v": 0
}


*/
