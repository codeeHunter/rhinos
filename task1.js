//  1.1. Преобразование строки к нижнему регистру, но первая буква большая. “Abscd”

const getLowerCase = (str) => {
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
};

let cc =
  "Преобразование строки с целью правильно расстановки пробелов. “Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.”";

//  1.2. Преобразование строки с целью правильно расстановки пробелов.
// “Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .
//  Если есть лишние подряд идущие пробелы, они должны быть устранены.”
const getCorrectSpace = (str) => {
  let arr = str.split(" ");

  let correctText = arr.filter((item) => item).join(" ");
  correctText = correctText.replace(",", ", ");
  correctText = correctText.replace(" ,", ",");
  correctText = correctText.replace(" .", ". ");
  correctText = correctText.replace(" . ", ". ");
  return correctText;
};

getCorrectSpace(cc);

// 1.3. Посдчитывающие кол-во слов в строке.

const getCountWord = (str) => {
  let normalizeText = getCorrectSpace(str);

  return normalizeText.split(" ").length;
};

// 1.4. Подсчитывающий, уникальные слова.
// “Текст, в котором слово текст несколько раз встречается и слово тоже” - в ответе, что “слово - 2 раза, текст - 2 раза, в - 1 раз, несколько - 1 раз“.
// Самостоятельно придумать наиболее удачную структуру данных для ответа.
const normalizeText = (str) => {
  let arr = str.split(" ");

  let correctText = arr.filter((item) => item).join(" ");
  correctText = correctText.replace(", ", " , ");
  correctText = correctText.replace(" ,", " , ");
  correctText = correctText.replace(" .", " . ");

  correctText = correctText.replace(". ", " . ");

  return correctText;
};

const getUniqueWords = (str) => {
  let array = normalizeText(str).split(" ");
  let validationArray = array.filter((item) => item != "" && item != ",");
  let words = [];
  let counts = [];

  for (let i = 0; i < validationArray.length; i++) {
    let checker = false;

    for (let j = 0; j < words.length; j++) {
      if (validationArray[i].toLowerCase() == words[j].toLowerCase()) {
        checker = true;
        counts[j] += 1;
      }
    }

    if (!checker) {
      words.push(validationArray[i]);
      counts.push(1);
    }
  }
  console.log("Слова: {");

  for (let i = 0; i < words.length; i++) {
    console.log(`  ${words[i].toLowerCase()}: ${counts[i]}`);
  }

  console.log("}");
};

// 2.Написать модуль, который способен выполнять операции с числами любой длины.
// Сумма
const getSumNumber = (firstNum, secondNum) => {
  if (Number(firstNum) !== NaN && Number(secondNum) !== NaN)
    return Number(firstNum) + Number(secondNum);

  return "Неправильные вводные данные";
};

// Деление
const getDivisionNumber = (firstNum, secondNum) => {
  if (Number(firstNum) !== NaN && Number(secondNum) !== NaN)
    return Number(firstNum) / Number(secondNum);

  return "Неправильные вводные данные";
};

// Умножение
const getMultiplicationNumber = (firstNum, secondNum) => {
  if (Number(firstNum) !== NaN && Number(secondNum) !== NaN)
    return Number(firstNum) * Number(secondNum);

  return "Неправильные вводные данные";
};

// Вычитание
const getSubtractionNumber = (firstNum, secondNum) => {
  if (Number(firstNum) !== NaN && Number(secondNum) !== NaN)
    return Number(firstNum) - Number(secondNum);

  return "Неправильные вводные данные";
};

// 3. Создать класс данных “Товар”
// С полями
// Название
// Цена
// Количество
// Описание
class Product {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }

  validationObject = (str) => {
    const condition = str.split("&");

    for (let i = 0; i < condition.length; i++) {
      const array = condition[i].split("-");

      for (let j = 0; j < array.length; j++) {
        if (array[j] == "name") {
          if (array[j + 1] == "contains")
            if (!this.name.includes(array[j + 2])) return false;

          if (array[j + 1] == "starts")
            if (!this.name.startsWith(array[j + 2])) return false;

          if (array[j + 1] == "ends")
            if (!this.name.endsWith(array[j + 2])) return false;
        }

        if (array[j] == "description") {
          if (array[j + 1] == "contains")
            if (!this.description.includes(array[j + 2])) return false;

          if (array[j + 1] == "starts")
            if (!this.description.startsWith(array[j + 2])) return false;

          if (array[j + 1] == "ends")
            if (!this.description.endsWith(array[j + 2])) return false;
        }

        if (array[j] == "price") {
          let str = "";
          str = array[j + 1].slice(0, 1);
          array[j + 1] = array[j + 1].slice(1);

          for (let t = 0; t < 2; t++) {
            if (array[j + 1][t] == "=") {
              str += array[j + 1].slice(0, 1);
              array[j + 1] = array[j + 1].slice(1);
            }
          }

          if (str == "=")
            if (Number(this.price) != Number(array[j + 1])) return false;

          if (str == ">=")
            if (Number(this.price) < Number(array[j + 1])) return false;

          if (str == "<=")
            if (Number(this.price) > Number(array[j + 1])) return false;

          if (str == "<")
            if (Number(this.price) >= Number(array[j + 1])) return false;

          if (str == ">")
            if (Number(this.price) <= Number(array[j + 1])) return false;
        }

        if (array[j] == "quantity") {
          let str = "";
          str = array[j + 1].slice(0, 1);
          array[j + 1] = array[j + 1].slice(1);

          for (let t = 0; t < 2; t++) {
            if (array[j + 1][t] == "=") {
              str += array[j + 1].slice(0, 1);
              array[j + 1] = array[j + 1].slice(1);
            }
          }

          if (str == "=") {
            if (Number(this.quantity) != Number(array[j + 1])) return false;
          }
          if (str == ">=") {
            if (Number(this.quantity) < Number(array[j + 1])) return false;
          }
          if (str == "<=") {
            if (Number(this.quantity) > Number(array[j + 1])) return false;
          }
          if (str == "<") {
            if (Number(this.quantity) >= Number(array[j + 1])) return false;
          }
          if (str == ">") {
            if (Number(this.quantity) <= Number(array[j + 1])) return false;
          }
        }
      }
    }

    return true;
  };
}

let listProduct = [];
listProduct.push(new Product(`fd`, `1`, `10`, `fabc`));
listProduct.push(new Product(`fd`, `0`, `5`, `abc`));
listProduct.push(new Product(`fdgdsa`, `523`, `55`, `agc`));
listProduct.push(new Product(`ffd`, `52`, `5`, `abvc`));
listProduct.push(new Product(`fd`, `52`, `51`, `abasc`));

const checkerObject = (str) => {
  const arrObject = [];

  for (let i = 0; i < listProduct.length; i++) {
    let flag = listProduct[i].validationObject(str);
    console.log(listProduct[i]);

    if (flag == true) {
      arrObject.push(listProduct[i]);
    }
  }

  return arrObject;
};

