const contentsBody = document.querySelector(".contentsBody");
const buttons = document.querySelector(".buttons");

let userArray = [];

const getUser = async () => {
    const res = await fetch(
        "https://randomuser.me/api/?gender=female&results=100"
    );
    const data = await res.json();
    const users = data.results[0];

    const newUser = {
        name: `${users.name.first} ${users.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };

    addUser(newUser);
};

const render = (data = userArray) => {
    contentsBody.innerHTML = "";
    data.forEach(user => {
        contentsBody.insertAdjacentHTML(
            "beforeend",
            `<tr>
        <td class="person">${user.name}</td>
        <td class="money">$ ${formatMoney.format(user.money)}</td>
    </tr>`
        );
    });
};

const formatMoney = new Intl.NumberFormat();

const addUser = user => {
    userArray.push(user);
    render();
};

const doubleMoney = () => {
    console.log(userArray);
    userArray = userArray.map(user => ({
        ...user,
        money: user.money * 2,
    }));

    render();
};

const showMillionaries = () => {
    const filtered = userArray.filter(user => user.money > 1000000);
    render(filtered);
};

const sortByRichest = () => {
    const sorted = userArray.sort((a, b) => b.money - a.money);
    render(sorted);
};

const calculateTotal = () => {
    const total = userArray.reduce((a, b) => ({ money: a.money + b.money }));
    contentsBody.insertAdjacentHTML(
        "afterend",
        `<tr class="totalTr">
        <td class="person">Total</td>
        <td class="money">$ ${formatMoney.format(total.money)}</td>
    </tr>`
    );
};

getUser();

buttons.addEventListener("click", e => {
    switch (e.target.className) {
        case "addUser":
            getUser();
            break;
        case "doubleMoney":
            doubleMoney();
            break;
        case "showMillionaries":
            showMillionaries();
            break;
        case "richest":
            sortByRichest();
            break;
        case "calculateTotal":
            calculateTotal();
            break;
        default:
            break;
    }
});
