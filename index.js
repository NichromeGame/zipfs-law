var string = "";
var words = new Array();
var quantities = new Array();

var table = document.getElementById("table");
var text = document.getElementById("text");

const drawGraphic = () => {
  GRAPHIC = document.getElementById("graphic");
  let meter = 0;
  const X = quantities.map(() => {
    meter++;
    return meter;
  });

  Plotly.plot(
    GRAPHIC,
    [
      {
        x: X,
        y: quantities,
      },
    ],
    {
      margin: { t: 0 },
    },
    { showSendToCloud: true }
  );

  text.innerHTML = "Как видно из грaфика, он хорошо апроксимируется гиперболой";
};

const drawTable = (words, quantities) => {
  for (let i = 0; i < words.length; i++) {
    const tr = document.createElement("tr");
    const word = document.createElement("td");
    const quantity = document.createElement("td");

    word.innerHTML = words[i];
    quantity.innerHTML = quantities[i];
    tr.appendChild(word);
    tr.appendChild(quantity);
    table.appendChild(tr);
  }
};

const sort = () => {
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length - i - 1; j++) {
      const current = quantities[j];
      if (current < quantities[j + 1]) {
        const currentWord = words[j];
        words[j] = words[j + 1];
        words[j + 1] = currentWord;
        quantities[j] = quantities[j + 1];
        quantities[j + 1] = current;
      }
    }
  }
};

const changeHandler = (e) => (string = e.target.value);
const clickHandler = () => {
  let str = string.trim();
  str = str.replace(/\)/g, () => " ");
  str = str.replace(/\(/g, () => " ");
  str = str.replace(/\\/g, () => " ");
  str = str.replace(/\./g, () => " ");
  str = str.replace(/\,/g, () => " ");
  str = str.replace(/\!/g, () => " ");
  str = str.replace(/\?/g, () => " ");
  str = str.replace(/\*/g, () => " ");
  str = str.replace(/\^/g, () => " ");
  str = str.replace(/\+/g, () => " ");
  str = str.trim();
  if (!str) return alert("строка пустая!");
  table.innerHTML = "";
  while (!!str) {
    const index = str.indexOf(" ");
    if (index === -1) {
      words.push(str);
      quantities.push(1);
      break;
    }

    const keyword = str.substring(0, index);
    words.push(keyword);
    let counter = 0;
    const expression = new RegExp(` ${keyword} `, "gi");
    str = " " + str + " ";
    str = str.replace(expression, () => {
      //console.log(word);
      counter++;
      return " ";
    });
    quantities.push(counter);
    str = str.trim();
  }
  sort();
  drawTable(words, quantities);
  drawGraphic();
  words = [];
  quantities = [];
};

document.getElementById("string").oninput = changeHandler;
document.getElementById("button").onclick = clickHandler;
