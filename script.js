/* =========================================
   TOOLIFY - MAIN JAVASCRIPT
========================================= */


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("toolifyTheme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("toolifyTheme", "light");
  }

});


/* Load saved theme */

if (localStorage.getItem("toolifyTheme") === "dark") {

  document.body.classList.add("dark");

  themeBtn.textContent = "☀️";

}


/* =========================================
   SEARCH TOOLS
========================================= */

const searchInput = document.getElementById("searchInput");
const toolsGrid = document.getElementById("toolsGrid");
const toolCount = document.getElementById("toolCount");

const toolCards = document.querySelectorAll(".tool-card");


searchInput.addEventListener("input", () => {

  const searchValue =
    searchInput.value.toLowerCase().trim();

  let visibleTools = 0;


  toolCards.forEach(card => {

    const name =
      card.dataset.name.toLowerCase();

    if (name.includes(searchValue)) {

      card.style.display = "";

      visibleTools++;

    } else {

      card.style.display = "none";

    }

  });


  toolCount.textContent =
    `${visibleTools} ${visibleTools === 1 ? "tool" : "tools"}`;

});


/* =========================================
   MODAL
========================================= */

const modal = document.getElementById("modal");
const toolContent = document.getElementById("toolContent");


function openTool(tool) {

  modal.classList.add("active");

  document.body.style.overflow = "hidden";

  toolContent.innerHTML = "";

  switch (tool) {

    case "password":
      passwordGenerator();
      break;

    case "calculator":
      calculator();
      break;

    case "age":
      ageCalculator();
      break;

    case "percentage":
      percentageCalculator();
      break;

    case "currency":
      currencyConverter();
      break;

    case "unit":
      unitConverter();
      break;

    case "word":
      wordCounter();
      break;

    case "stopwatch":
      stopwatch();
      break;

    case "countdown":
      countdownTimer();
      break;

    case "date":
      dateDifference();
      break;

    case "color":
      colorConverter();
      break;

    case "image":
      imageResizer();
      break;

    case "compressor":
      imageCompressor();
      break;

    case "number":
      numberConverter();
      break;

    case "case":
      caseConverter();
      break;

  }

}


function closeTool() {

  modal.classList.remove("active");

  document.body.style.overflow = "";

}


/* Close modal by clicking outside */

modal.addEventListener("click", (e) => {

  if (e.target === modal) {
    closeTool();
  }

});


/* ESC key */

document.addEventListener("keydown", (e) => {

  if (e.key === "Escape") {
    closeTool();
  }

});


/* =========================================
   PASSWORD GENERATOR
========================================= */

function passwordGenerator() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Password Generator
    </h2>

    <p class="tool-description">
      Generate a strong random password.
    </p>

    <div class="tool-row">

      <input
        type="number"
        id="passwordLength"
        class="tool-input"
        value="16"
        min="4"
        max="100"
        placeholder="Length"
      >

      <select
        id="passwordType"
        class="tool-select"
      >

        <option value="all">
          Letters + Numbers + Symbols
        </option>

        <option value="letters">
          Letters Only
        </option>

        <option value="numbers">
          Numbers Only
        </option>

      </select>

    </div>

    <button
      class="primary-btn"
      onclick="generatePassword()"
    >
      Generate Password
    </button>

    <div
      id="passwordResult"
      class="result-box"
    >
      Your password will appear here.
    </div>

    <button
      class="copy-btn"
      onclick="copyText('passwordResult')"
    >
      Copy Password
    </button>

  `;

}


function generatePassword() {

  const length =
    Number(document.getElementById("passwordLength").value);

  const type =
    document.getElementById("passwordType").value;

  let chars = "";

  if (type === "all") {

    chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
      "abcdefghijklmnopqrstuvwxyz" +
      "0123456789" +
      "!@#$%^&*()_+-=[]{}<>?";

  }

  if (type === "letters") {

    chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  }

  if (type === "numbers") {

    chars =
      "0123456789";

  }


  let password = "";

  for (let i = 0; i < length; i++) {

    password +=
      chars.charAt(
        Math.floor(Math.random() * chars.length)
      );

  }


  document.getElementById("passwordResult")
    .textContent = password;

}


/* =========================================
   CALCULATOR
========================================= */

function calculator() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Calculator
    </h2>

    <p class="tool-description">
      Perform basic mathematical calculations.
    </p>

    <input
      id="calcInput"
      class="tool-input"
      placeholder="Example: 25 + 10 * 2"
    >

    <button
      class="primary-btn"
      onclick="calculateResult()"
    >
      Calculate
    </button>

    <div
      id="calcResult"
      class="tool-result"
    >
      Result will appear here.
    </div>

  `;

}


function calculateResult() {

  const expression =
    document.getElementById("calcInput").value;

  const resultBox =
    document.getElementById("calcResult");

  try {

    if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
      throw new Error();
    }

    const result =
      Function(`"use strict"; return (${expression})`)();

    resultBox.textContent =
      `Result: ${result}`;

  } catch {

    resultBox.textContent =
      "Please enter a valid calculation.";

  }

}


/* =========================================
   AGE CALCULATOR
========================================= */

function ageCalculator() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Age Calculator
    </h2>

    <p class="tool-description">
      Calculate your exact age.
    </p>

    <input
      type="date"
      id="birthDate"
      class="tool-input"
    >

    <button
      class="primary-btn"
      onclick="calculateAge()"
    >
      Calculate Age
    </button>

    <div
      id="ageResult"
      class="tool-result"
    ></div>

  `;

}


function calculateAge() {

  const birth =
    new Date(document.getElementById("birthDate").value);

  const today = new Date();

  if (!document.getElementById("birthDate").value) {

    document.getElementById("ageResult").textContent =
      "Please select your birth date.";

    return;

  }


  let years =
    today.getFullYear() - birth.getFullYear();

  let months =
    today.getMonth() - birth.getMonth();

  let days =
    today.getDate() - birth.getDate();


  if (days < 0) {

    months--;

    const previousMonth =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

    days += previousMonth.getDate();

  }


  if (months < 0) {

    years--;

    months += 12;

  }


  document.getElementById("ageResult").innerHTML = `

    <strong>
      ${years} Years
    </strong><br>

    ${months} Months<br>

    ${days} Days

  `;

}


/* =========================================
   PERCENTAGE CALCULATOR
========================================= */

function percentageCalculator() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Percentage Calculator
    </h2>

    <p class="tool-description">
      Calculate percentages quickly.
    </p>

    <input
      type="number"
      id="percentValue"
      class="tool-input"
      placeholder="Percentage"
    >

    <input
      type="number"
      id="percentTotal"
      class="tool-input"
      placeholder="Total Number"
    >

    <button
      class="primary-btn"
      onclick="calculatePercentage()"
    >
      Calculate
    </button>

    <div
      id="percentResult"
      class="tool-result"
    ></div>

  `;

}


function calculatePercentage() {

  const percentage =
    Number(document.getElementById("percentValue").value);

  const total =
    Number(document.getElementById("percentTotal").value);


  const result =
    (percentage / 100) * total;


  document.getElementById("percentResult").textContent =
    `${percentage}% of ${total} = ${result}`;

}


/* =========================================
   CURRENCY CONVERTER
========================================= */

function currencyConverter() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Currency Converter
    </h2>

    <p class="tool-description">
      Convert using your own exchange rate.
    </p>

    <input
      type="number"
      id="currencyAmount"
      class="tool-input"
      placeholder="Amount"
    >

    <input
      type="number"
      id="currencyRate"
      class="tool-input"
      placeholder="Exchange Rate"
    >

    <button
      class="primary-btn"
      onclick="convertCurrency()"
    >
      Convert
    </button>

    <div
      id="currencyResult"
      class="tool-result"
    ></div>

  `;

}


function convertCurrency() {

  const amount =
    Number(document.getElementById("currencyAmount").value);

  const rate =
    Number(document.getElementById("currencyRate").value);


  const result =
    amount * rate;


  document.getElementById("currencyResult").textContent =
    `Converted Amount: ${result}`;

}


/* =========================================
   UNIT CONVERTER
========================================= */

function unitConverter() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Unit Converter
    </h2>

    <p class="tool-description">
      Convert common units.
    </p>

    <input
      type="number"
      id="unitValue"
      class="tool-input"
      placeholder="Enter value"
    >

    <select
      id="unitType"
      class="tool-select"
    >

      <option value="km-miles">
        Kilometers → Miles
      </option>

      <option value="miles-km">
        Miles → Kilometers
      </option>

      <option value="kg-lb">
        Kilograms → Pounds
      </option>

      <option value="lb-kg">
        Pounds → Kilograms
      </option>

      <option value="c-f">
        Celsius → Fahrenheit
      </option>

      <option value="f-c">
        Fahrenheit → Celsius
      </option>

    </select>

    <button
      class="primary-btn"
      onclick="convertUnit()"
    >
      Convert
    </button>

    <div
      id="unitResult"
      class="tool-result"
    ></div>

  `;

}


function convertUnit() {

  const value =
    Number(document.getElementById("unitValue").value);

  const type =
    document.getElementById("unitType").value;

  let result;


  switch (type) {

    case "km-miles":
      result = value * 0.621371;
      break;

    case "miles-km":
      result = value * 1.60934;
      break;

    case "kg-lb":
      result = value * 2.20462;
      break;

    case "lb-kg":
      result = value * 0.453592;
      break;

    case "c-f":
      result = (value * 9 / 5) + 32;
      break;

    case "f-c":
      result = (value - 32) * 5 / 9;
      break;

  }


  document.getElementById("unitResult").textContent =
    `Result: ${result.toFixed(2)}`;

}


/* =========================================
   WORD COUNTER
========================================= */

function wordCounter() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Word Counter
    </h2>

    <p class="tool-description">
      Count words, characters and sentences.
    </p>

    <textarea
      id="wordText"
      class="tool-textarea"
      placeholder="Type or paste your text..."
    ></textarea>

    <div
      id="wordResult"
      class="tool-result"
    >
      Words: 0<br>
      Characters: 0<br>
      Sentences: 0
    </div>

  `;


  document.getElementById("wordText")
    .addEventListener("input", updateWordCount);

}


function updateWordCount() {

  const text =
    document.getElementById("wordText").value;

  const words =
    text.trim()
      ? text.trim().split(/\s+/).length
      : 0;

  const characters =
    text.length;

  const sentences =
    text.split(/[.!?]+/)
      .filter(s => s.trim()).length;


  document.getElementById("wordResult").innerHTML = `

    Words: <strong>${words}</strong><br>

    Characters: <strong>${characters}</strong><br>

    Sentences: <strong>${sentences}</strong>

  `;

}


/* =========================================
   STOPWATCH
========================================= */

let stopwatchInterval;
let stopwatchSeconds = 0;


function stopwatch() {

  stopwatchSeconds = 0;

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Stopwatch
    </h2>

    <div
      id="stopwatchDisplay"
      class="big-number"
    >
      00:00:00
    </div>

    <button
      class="primary-btn"
      onclick="startStopwatch()"
    >
      Start
    </button>

    <button
      class="primary-btn"
      onclick="stopStopwatch()"
    >
      Stop
    </button>

    <button
      class="primary-btn"
      onclick="resetStopwatch()"
    >
      Reset
    </button>

  `;

}


function startStopwatch() {

  clearInterval(stopwatchInterval);

  stopwatchInterval =
    setInterval(() => {

      stopwatchSeconds++;

      updateStopwatch();

    }, 1000);

}


function stopStopwatch() {

  clearInterval(stopwatchInterval);

}


function resetStopwatch() {

  clearInterval(stopwatchInterval);

  stopwatchSeconds = 0;

  updateStopwatch();

}


function updateStopwatch() {

  const hours =
    Math.floor(stopwatchSeconds / 3600);

  const minutes =
    Math.floor((stopwatchSeconds % 3600) / 60);

  const seconds =
    stopwatchSeconds % 60;


  document.getElementById("stopwatchDisplay")
    .textContent =
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`;

}


/* =========================================
   COUNTDOWN TIMER
========================================= */

let countdownInterval;


function countdownTimer() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Countdown Timer
    </h2>

    <input
      type="number"
      id="countdownSeconds"
      class="tool-input"
      placeholder="Seconds"
      min="1"
    >

    <button
      class="primary-btn"
      onclick="startCountdown()"
    >
      Start Countdown
    </button>

    <div
      id="countdownDisplay"
      class="big-number"
    >
      00:00
    </div>

  `;

}


function startCountdown() {

  clearInterval(countdownInterval);

  let seconds =
    Number(
      document.getElementById("countdownSeconds").value
    );


  countdownInterval =
    setInterval(() => {

      if (seconds <= 0) {

        clearInterval(countdownInterval);

        document.getElementById("countdownDisplay")
          .textContent = "Time's Up!";

        return;

      }


      seconds--;

      const minutes =
        Math.floor(seconds / 60);

      const secs =
        seconds % 60;


      document.getElementById("countdownDisplay")
        .textContent =
        `${String(minutes).padStart(2, "0")}:` +
        `${String(secs).padStart(2, "0")}`;

    }, 1000);

}


/* =========================================
   DATE DIFFERENCE
========================================= */

function dateDifference() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Date Difference
    </h2>

    <input
      type="date"
      id="dateOne"
      class="tool-input"
    >

    <input
      type="date"
      id="dateTwo"
      class="tool-input"
    >

    <button
      class="primary-btn"
      onclick="calculateDateDifference()"
    >
      Calculate Difference
    </button>

    <div
      id="dateResult"
      class="tool-result"
    ></div>

  `;

}


function calculateDateDifference() {

  const date1 =
    new Date(document.getElementById("dateOne").value);

  const date2 =
    new Date(document.getElementById("dateTwo").value);


  if (isNaN(date1) || isNaN(date2)) {

    document.getElementById("dateResult").textContent =
      "Please select both dates.";

    return;

  }


  const difference =
    Math.abs(date2 - date1);


  const days =
    Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );


  document.getElementById("dateResult").textContent =
    `${days} days`;

}


/* =========================================
   COLOR CONVERTER
========================================= */

function colorConverter() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Color Converter
    </h2>

    <input
      id="hexColor"
      class="tool-input"
      placeholder="Example: #6366f1"
    >

    <button
      class="primary-btn"
      onclick="convertColor()"
    >
      Convert
    </button>

    <div
      id="colorResult"
      class="tool-result"
    ></div>

  `;

}


function convertColor() {

  let hex =
    document.getElementById("hexColor").value
      .trim()
      .replace("#", "");


  if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {

    document.getElementById("colorResult").textContent =
      "Enter a valid 6-digit HEX color.";

    return;

  }


  const r =
    parseInt(hex.substring(0, 2), 16);

  const g =
    parseInt(hex.substring(2, 4), 16);

  const b =
    parseInt(hex.substring(4, 6), 16);


  document.getElementById("colorResult").innerHTML = `

    HEX: #${hex.toUpperCase()}<br>

    RGB:
    rgb(${r}, ${g}, ${b})

  `;

}


/* =========================================
   IMAGE RESIZER
========================================= */

function imageResizer() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Image Resizer
    </h2>

    <p class="tool-description">
      Resize an image directly in your browser.
    </p>

    <input
      type="file"
      id="resizeImage"
      class="tool-input"
      accept="image/*"
    >

    <input
      type="number"
      id="resizeWidth"
      class="tool-input"
      placeholder="New width"
    >

    <button
      class="primary-btn"
      onclick="resizeImage()"
    >
      Resize Image
    </button>

    <div
      id="resizeResult"
      class="tool-result"
    ></div>

  `;

}


function resizeImage() {

  const file =
    document.getElementById("resizeImage").files[0];

  const width =
    Number(document.getElementById("resizeWidth").value);


  if (!file || !width) {

    alert("Select an image and enter a width.");

    return;

  }


  const reader =
    new FileReader();


  reader.onload = function(e) {

    const image =
      new Image();


    image.onload = function() {

      const canvas =
        document.createElement("canvas");

      const scale =
        width / image.width;

      canvas.width = width;

      canvas.height =
        image.height * scale;


      const ctx =
        canvas.getContext("2d");

      ctx.drawImage(
        image,
        0,
        0,
        canvas.width,
        canvas.height
      );


      const link =
        document.createElement("a");

      link.download =
        "toolify-resized-image.png";

      link.href =
        canvas.toDataURL("image/png");

      link.textContent =
        "Download Resized Image";

      link.style.color =
        "var(--primary)";

      document.getElementById("resizeResult")
        .innerHTML = "";

      document.getElementById("resizeResult")
        .appendChild(link);

    };


    image.src = e.target.result;

  };


  reader.readAsDataURL(file);

}


/* =========================================
   IMAGE COMPRESSOR
========================================= */

function imageCompressor() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Image Compressor
    </h2>

    <p class="tool-description">
      Compress an image in your browser.
    </p>

    <input
      type="file"
      id="compressImage"
      class="tool-input"
      accept="image/*"
    >

    <label>
      Quality
    </label>

    <input
      type="range"
      id="compressionQuality"
      min="10"
      max="100"
      value="70"
      class="tool-input"
    >

    <button
      class="primary-btn"
      onclick="compressImage()"
    >
      Compress Image
    </button>

    <div
      id="compressResult"
      class="tool-result"
    ></div>

  `;

}


function compressImage() {

  const file =
    document.getElementById("compressImage").files[0];

  const quality =
    Number(
      document.getElementById("compressionQuality").value
    ) / 100;


  if (!file) {

    alert("Please select an image.");

    return;

  }


  const reader =
    new FileReader();


  reader.onload = function(e) {

    const image =
      new Image();


    image.onload = function() {

      const canvas =
        document.createElement("canvas");

      canvas.width =
        image.width;

      canvas.height =
        image.height;


      const ctx =
        canvas.getContext("2d");

      ctx.drawImage(image, 0, 0);


      const compressed =
        canvas.toDataURL(
          "image/jpeg",
          quality
        );


      const link =
        document.createElement("a");

      link.href = compressed;

      link.download =
        "toolify-compressed.jpg";

      link.textContent =
        "Download Compressed Image";

      link.style.color =
        "var(--primary)";


      document.getElementById("compressResult")
        .innerHTML = "";

      document.getElementById("compressResult")
        .appendChild(link);

    };


    image.src = e.target.result;

  };


  reader.readAsDataURL(file);

}


/* =========================================
   NUMBER CONVERTER
========================================= */

function numberConverter() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Number Converter
    </h2>

    <input
      type="number"
      id="decimalNumber"
      class="tool-input"
      placeholder="Enter decimal number"
    >

    <button
      class="primary-btn"
      onclick="convertNumber()"
    >
      Convert
    </button>

    <div
      id="numberResult"
      class="tool-result"
    ></div>

  `;

}


function convertNumber() {

  const value =
    Number(
      document.getElementById("decimalNumber").value
    );


  if (isNaN(value)) {

    document.getElementById("numberResult").textContent =
      "Enter a valid number.";

    return;

  }


  document.getElementById("numberResult").innerHTML = `

    Binary:
    ${Math.trunc(value).toString(2)}
    <br>

    Octal:
    ${Math.trunc(value).toString(8)}
    <br>

    Hexadecimal:
    ${Math.trunc(value).toString(16).toUpperCase()}

  `;

}


/* =========================================
   CASE CONVERTER
========================================= */

function caseConverter() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      Case Converter
    </h2>

    <textarea
      id="caseText"
      class="tool-textarea"
      placeholder="Enter your text..."
    ></textarea>

    <button
      class="primary-btn"
      onclick="convertCase()"
    >
      Convert Text
    </button>

    <div
      id="caseResult"
      class="result-box"
    ></div>

    <button
      class="copy-btn"
      onclick="copyText('caseResult')"
    >
      Copy
    </button>

  `;

}


function convertCase() {

  const text =
    document.getElementById("caseText").value;


  const result =
    document.getElementById("caseResult");


  result.innerHTML = `

    <strong>UPPERCASE:</strong><br>
    ${text.toUpperCase()}<br><br>

    <strong>lowercase:</strong><br>
    ${text.toLowerCase()}

  `;

}


/* =========================================
   COPY FUNCTION
========================================= */

function copyText(elementId) {

  const element =
    document.getElementById(elementId);

  const text =
    element.textContent;


  navigator.clipboard.writeText(text)
    .then(() => {

      alert("Copied!");

    })
    .catch(() => {

      alert("Copy failed.");

    });

}