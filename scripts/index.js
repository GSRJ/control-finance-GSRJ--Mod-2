const itemImput = document.getElementById("itemImput");
const addItem = document.getElementById("addItem");
const ul = document.getElementById("cardList");
const inputCategory = document.querySelector(".inputCategory");
const outputCategory = document.querySelector(".outputCategory");
const lists = document.getElementsByTagName("li");
const sumValueBox = document.querySelector(".sumValueBox");
const renderSum = document.createElement("p");
sumValueBox.appendChild(renderSum);
renderSum.innerText = "R$ 0";
let arrSomatotal = [];
let arrSomaInput = [];
let somaValores = 0;
let somaInput = 0;

const noValueBox = document.createElement("div");
noValueBox.classList.add("noValueBox");
const noValueTitle = document.createElement("h1");
const noValueText = document.createElement("p");
noValueTitle.innerText = "Nenhum valor cadastrado";
noValueText.innerText = "Registre novo valor";


(function () {
  let valueSelected = "";
  let idValue = 1;

  function generateLiValue(obj) {
    const cardValue = document.createElement("li");
    cardValue.className = "cardValue";

    const cardValueP = document.createElement("p");
    cardValueP.textContent = "R$ " + obj.valor;

    cardValue.appendChild(cardValueP);

    const cardValueSpan = document.createElement("span");
    const cardValueCategory = document.createElement("p");
    cardValueCategory.className = "buttonGrey";
    cardValueCategory.textContent = obj.category;

    const cardValueDeleteBt = document.createElement("button");
    cardValueDeleteBt.className = "hiddenButton";
    cardValueDeleteBt.innerHTML =
      "<img event-action='deleteValue'  src='./assets/trashIcon.svg' alt='ícone para deletar valor'/>";

    cardValueSpan.append(cardValueCategory, cardValueDeleteBt);
    cardValue.appendChild(cardValueSpan);

    return cardValue;
  }

  inputCategory.addEventListener("click", () => {
    valueSelected = valuesCategory[0];
  });
  outputCategory.addEventListener("click", () => {
    valueSelected = valuesCategory[1];
  });

  function renderValue() {
    ul.innerHTML = "";
    insertedValues.forEach((obj) => {
      ul.appendChild(generateLiValue(obj));
    });
    let inputSelectedBtn = insertedValues.filter((obj2) => {
      return obj2.category == "Entrada";
    });


    const inputSelectec = document.querySelector(".inputSelected");
    inputSelectec.addEventListener("click", function () {
      ul.innerHTML = "";
      inputSelectedBtn.forEach((obj) => {
        ul.appendChild(generateLiValue(obj));
      });
      renderSum.innerText = "Entradas"
    });

    let outputSelectedBtn = insertedValues.filter((obj3) => {
      return obj3.category == "Saída";
    });

    const outputSelectec = document.querySelector(".outputSelected");
    outputSelectec.addEventListener("click", function () {
      ul.innerHTML = "";
      outputSelectedBtn.forEach((obj) => {
        ul.appendChild(generateLiValue(obj));
      });
      renderSum.innerText = "Saídas"
    });

    let allSelectedBtn = insertedValues.filter((obj) => {
      return obj;
    });

    const allSelected = document.querySelector(".all");
    allSelected.addEventListener("click", function () {
      ul.innerHTML = "";
      allSelectedBtn.forEach((obj) => {
        ul.appendChild(generateLiValue(obj));
      });
      renderSum.innerText = "R$ " + somaValores;
    });
  }

  function addValue(value) {
    if (value == "" || value == ".") {
      value = 0;
    }
    insertedValues.push({
      id: idValue,
      valor: parseFloat(value),
      category: valueSelected,
    });

    arrSomatotal.push(parseFloat(value));
    somaValores = arrSomatotal.reduce(myFunc);
    function myFunc(total, num) {
      return total + num;
    }
    renderSum.innerText = "R$ " + somaValores;
  }

  function clickedUl(e) {
    const eventAction = e.target.getAttribute("event-action");
    if (eventAction === null) {
      return;
    }

    let currentLi = e.target;
    while (currentLi.nodeName !== "LI") {
      currentLi = currentLi.parentElement;
    }
    const currentLiIndex = [...lists].indexOf(currentLi);
    const actions = {
      deleteValue: function () {
        insertedValues.splice(currentLiIndex, 1);
        let sumAll = arrSomatotal.splice(currentLiIndex, 1);
        somaValores -= sumAll;
        renderSum.innerText = "R$ " + somaValores;
        if (insertedValues.length == 0) {
          window.location.reload();
        }
        renderValue();
      },
    };

    if (actions[eventAction]) {
      actions[eventAction]();
    }
  }

  addItem.addEventListener("click", (e) => {
    e.preventDefault();
    addValue(itemImput.value);
    itemImput.value = "";
    itemImput.focus();
    renderValue();
    idValue++;
  });

  ul.addEventListener("click", clickedUl);

  renderValue();
  noValueBox.append(noValueTitle, noValueText);
  ul.appendChild(noValueBox);
})();

