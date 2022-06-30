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
                <td class="btn" style="display: flex; margin-right: -200px;">
                    <a href="/people/${people.id}" class="edit" ><img width="14px" src="/img/pencil.png" alt=""></a>
                    <div class="line"></div>
                    <a href="#" class="edit" ><img width="14px" src="/img/trash.png" alt=""></a>
                </td>
            </tr>
            `;
        })
        .join("");
      table.querySelector("tbody").innerHTML = html;
    });
});
