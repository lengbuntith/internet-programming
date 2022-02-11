const tableShow = document.getElementById("table");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

showLoading(false);
showTable(true);
showError(false);

function showTable(bool) {
  if (bool) tableShow.style.display = "inline-block";
  else tableShow.style.display = "none";
}

function showError(bool) {
  if (bool) error.style.display = "inline-block";
  else error.style.display = "none";
}

function showLoading(bool) {
  if (bool) loading.style.display = "inline-block";
  else loading.style.display = "none";
}

const renderData = (items) => {
  let html = ``;
  html =
    html +
    `<table>
    <thead>

  <tr>
    <th>Name</th>
    <th>User</th>
    <th>Email</th>
    <th>Address</th>
    <th>Phone</th>
    <th>Website</th>
    <th>Company</th>
  </tr>

  </thead>

  <tbody>

  `;
  for (let i = 0; i < items.length; i++) {
    html =
      html +
      `
      <tr>
      <td>${items[i].name}</td>
      <td>${items[i].username}</td>
      <td>${items[i].email}</td>
      <td>${items[i].address.street}</td>
      <td>${items[i].phone}</td>
      <td>${items[i].website}</td>
      <td>${items[i].company.name}</td>
      </tr>
      `;
  }
  html = html + `</tbody></table>`;

  tableShow.innerHTML = html;
};

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 10000,
});

const getData = () => {
  showLoading(true);

  setTimeout(() => {
    api
      .get("users")
      .then((res) => {
        console.log("get data", res);
        showLoading(false);
        renderData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        showLoading(false);
        showError(true);
      });
  }, 1000);
};

getData();

/* 
address: {street: 'Kulas Light', suite: 'Apt. 556', city: 'Gwenborough', zipcode: '92998-3874', geo: {…}}
company: {name: 'Romaguera-Crona', catchPhrase: 'Multi-layered client-server neural-net', bs: 'harness real-time e-markets'}
email: "Sincere@april.biz"
id: 1
name: "Leanne Graham"
phone: "1-770-736-8031 x56442"
username: "Bret"
website: "hildegard.org"
*/
