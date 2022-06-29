const inp = document.querySelector(".inp");
const table = document.querySelector("table");

inp.addEventListener("input", (e) => {
  fetch(`/all/${inp.value.toLowerCase()}`)
    .then((item) => item.json())
    .then((item) => {
          let num = 1;
      const html = item
        .map((people) => {

          return `
            <tr>
                <td class="top">${num++}</td>
                <td>${people.name} ${people.surname}</td>
                <td>${people.score}</td>
                <td>${people.number}</td>
                <td>${people.group}</td>
                <td>${people.month}</td>
                <td class="btn"><a href="/people/${
                  people._id
                }" class="edit">O'zgartirish</a></td>
            </tr>
            `;
        })
        .join("");
      table.querySelector("tbody").innerHTML = html;
    });
});
