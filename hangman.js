/******************************************
                 Hangman
 *****************************************/

const pickOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

let pass = pickOne(["Algorytm", "Defragmentacja", "Grafika wektorowa", "Oprogramowanie", "Pamięć operacyjna", "Procesor", "System operacyjny", "Interpreter", "Maszyna wirtualna", "Kompilator"]);

pass = pass.toUpperCase();

let length = pass.length;

let faults = 0;

const correct = new Audio("sounds/correct.wav");
const wrong = new Audio("sounds/wrong.wav");

let pass1 = "";

for (i = 0; i < length; i++) {
  if (pass.charAt(i) == " ") pass1 = pass1 + " ";
  else pass1 = pass1 + "_";
}

const passGenerator = () => {
  document.getElementById("board").innerHTML = pass1;
};

const letters = new Array(35);
letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

const start = () => {
  let alphabet = "";

  for (i = 0; i <= 34; i++) {
    alphabet =
      alphabet +
      '<div id="letter' +
      i +
      '" onclick="checkLetter(' +
      i +
      ')" class="letter">' +
      letters[i] +
      "</div>";
  }

  document.getElementById("keyboard").innerHTML = alphabet;

  passGenerator();
};

String.prototype.changeLetter = function (place, letter) {
  if (place > this.length - 1) return this.toString();
  else return this.substring(0, place) + letter + this.substring(place + 1);
};

const checkLetter = (number) => {
  let guess = false;

  for (i = 0; i < length; i++) {
    if (pass.charAt(i) == letters[number]) {
      pass1 = pass1.changeLetter(i, letters[number]);
      guess = true;
    }
  }
  //jeżeli odgadnę
  if (guess == true) {
    correct.play();
    const element = "letter" + number;
    document.getElementById(element).style.background = "#22a358";
    document.getElementById(element).style.color = "#b8b4b4";
    document.getElementById(element).style.border = "1px solid #22a358";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick",";")


    passGenerator();

    //jeżeli nie odgadnę
  } else {
    wrong.play();
    const element = "letter" + number;
    document.getElementById(element).style.background = "#a52e2e";
    document.getElementById(element).style.color = "#b8b4b4";
    document.getElementById(element).style.border = "1px solid #a52e2e";
    document.getElementById(element).style.cursor = "default";
    document.getElementById(element).setAttribute("onclick",";")


    faults++;
    const picture = "img" + faults;
    document.getElementById(picture).style.animation = "fadeIn 0.5s ease-in-out forwards";
  }

  //wygrana
  if (pass1 == pass) {
    document.getElementById("keyboard").style.gridTemplateColumns = "1fr";
    document.getElementById("keyboard").style.textAlign = "center";
    document.getElementById("keyboard").innerHTML = "Tak jest!<br/> Podano prawidłowe hasło:<br/>" + pass + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ ?</span>';
  }

  //przegrana
  if (faults >= 9) {
    document.getElementById("keyboard").style.gridTemplateColumns = "1fr";
    document.getElementById("keyboard").style.textAlign = "center";
    document.getElementById("keyboard").innerHTML = "Przegrana!<br/><br/>Prawidłowe hasło:<br/>" + pass + '<br/><br/><span class="reset" onclick="location.reload()">JESZCZE RAZ ?</span>';
  }
};

window.onload = start;
