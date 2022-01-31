const userTemplate = document.querySelector("[data-user-template]");
const userCardsConatiner = document.querySelector(
  "[data-user-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value;
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase());
    user.element.classList.toggle("hide", !isVisible);
  });
});

// https://jsonplaceholder.typicode.com/users
fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardsConatiner.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  });
