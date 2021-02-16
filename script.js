const dataRow = document.querySelector(".dataRow");
const tableHeader = document.querySelector(".tableHeader");

const getUser = async () => {
    const res = await fetch(
        "https://randomuser.me/api/?gender=female&results=100"
    );
    const data = await res.json();

    const users = data.results[0];

    console.log(users);
};

getUser();
