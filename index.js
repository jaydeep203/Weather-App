const temprateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

let target = "delhi";

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=aaa0944240024e79adc162548221411&q=${target}`;

    const response = await fetch(url);
    const data = await response.json();

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found.");
  }
};

function updateDom(temprature, city, time, emoji, text) {
  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactDate).getDay());
  temprateField.innerText = temprature;
  cityField.innerText = city;
  dateField.innerText = `${exactTime} - ${exactDay} ${exactDate} `;

  emojiField.src = emoji;
  weatherField.innerText = text;
}

fetchData(target);

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
      break;
    case 1:
      return "Monday";
      break;
    case 2:
      return "Tuesday";
      break;
    case 3:
      return "Wednesday";
      break;
    case 4:
      return "Thursday";
      break;
    case 5:
      return "Friday";
      break;
    case 6:
      return "Saturday";
      break;
    default:
      console.log("Invalid..");
  }
}

const search = (e) => {
  e.preventDefault();

  target = searchField.value;

  fetchData(target);
};

form.addEventListener("submit", search);
