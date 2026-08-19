/* =========================================
   TOOLIFY - MAIN JAVASCRIPT
========================================= */

const modal = document.getElementById("modal");
const toolContent = document.getElementById("toolContent");


/* =========================================
   DARK MODE
========================================= */

const themeBtn =
  document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (
    document.body.classList.contains("dark")
  ) {

    themeBtn.textContent = "☀️";

    localStorage.setItem(
      "theme",
      "dark"
    );

  } else {

    themeBtn.textContent = "🌙";

    localStorage.setItem(
      "theme",
      "light"
    );

  }

});


if (
  localStorage.getItem("theme") === "dark"
) {

  document.body.classList.add("dark");

  themeBtn.textContent = "☀️";

}


/* =========================================
   SEARCH
========================================= */

const searchInput =
  document.getElementById("searchInput");

const toolCards =
  document.querySelectorAll(".tool-card");

const toolCount =
  document.getElementById("toolCount");


searchInput.addEventListener("input", () => {

  const query =
    searchInput.value.toLowerCase().trim();

  let visible = 0;

  toolCards.forEach(card => {

    const name =
      card.dataset.name;

    if (name.includes(query)) {

      card.style.display = "";

      visible++;

    } else {

      card.style.display = "none";

    }

  });

  toolCount.textContent =
    visible + " tools";

});


/* =========================================
   OPEN / CLOSE TOOL
========================================= */

function openTool(tool) {

  modal.classList.add("active");

  switch (tool) {

    case "password":
      passwordTool();
      break;

    case "calculator":
      calculatorTool();
      break;

    case "age":
      ageTool();
      break;

    case "percentage":
      percentageTool();
      break;

    case "currency":
      currencyTool();
      break;

    case "unit":
      unitTool();
      break;

    case "word":
      wordTool();
      break;

    case "stopwatch":
      stopwatchTool();
      break;

    case "countdown":
      countdownTool();
      break;

    case "date":
      dateTool();
      break;

    case "color":
      colorTool();
      break;

    case "image":
      imageTool();
      break;

    case "compressor":
      compressorTool();
      break;

    case "number":
      numberTool();
      break;

    case "case":
      caseTool();
      break;

  }

}


function closeTool() {

  modal.classList.remove("active");

  toolContent.innerHTML = "";

}


modal.addEventListener("click", e => {

  if (e.target === modal) {

    closeTool();

  }

});


/* =========================================
   PASSWORD GENERATOR
========================================= */

function passwordTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🔐 Password Generator
    </h2>

    <p class="tool-description">
      Generate a secure random password.
    </p>

    <label>Password Length</label>

    <input
      id="passLength"
      class="tool-input"
      type="number"
      min="4"
      max="64"
      value="16"
    >

    <label>
      <input id="upper" type="checkbox" checked>
      Uppercase
    </label>
    <br>

    <label>
      <input id="lower" type="checkbox" checked>
      Lowercase
    </label>
    <br>

    <label>
      <input id="numbers" type="checkbox" checked>
      Numbers
    </label>
    <br>

    <label>
      <input id="symbols" type="checkbox" checked>
      Symbols
    </label>

    <button
      class="primary-btn"
      onclick="generatePassword()">
      Generate Password
    </button>

    <div
      id="passwordResult"
      class="result-box">
      Click Generate Password
    </div>

    <button
      class="copy-btn"
      onclick="copyText('passwordResult')">
      📋 Copy Password
    </button>

    <div class="strength">
      <div
        id="strengthBar"
        class="strength-bar">
      </div>
    </div>

    <p id="strengthText">
      Strength: —
    </p>

  `;

}


function generatePassword() {

  const length =
    Math.max(
      4,
      Math.min(
        64,
        Number(
          document.getElementById(
            "passLength"
          ).value
        )
      )
    );

  let chars = "";

  if (
    document.getElementById("upper").checked
  )
    chars +=
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  if (
    document.getElementById("lower").checked
  )
    chars +=
      "abcdefghijklmnopqrstuvwxyz";

  if (
    document.getElementById("numbers").checked
  )
    chars +=
      "0123456789";

  if (
    document.getElementById("symbols").checked
  )
    chars +=
      "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!chars) {

    alert(
      "Select at least one character type."
    );

    return;

  }

  const array =
    new Uint32Array(length);

  crypto.getRandomValues(array);

  let password = "";

  for (let i = 0; i < length; i++) {

    password +=
      chars[array[i] % chars.length];

  }

  document.getElementById(
    "passwordResult"
  ).textContent = password;


  let score = 0;

  if (length >= 12) score++;

  if (length >= 16) score++;

  if (chars.match(/[A-Z]/)) score++;

  if (chars.match(/[0-9]/)) score++;

  if (chars.match(/[^A-Za-z0-9]/))
    score++;


  const bar =
    document.getElementById(
      "strengthBar"
    );

  const text =
    document.getElementById(
      "strengthText"
    );


  if (score <= 2) {

    bar.style.width = "30%";

    text.textContent =
      "Strength: Weak";

  } else if (score <= 4) {

    bar.style.width = "65%";

    text.textContent =
      "Strength: Medium";

  } else {

    bar.style.width = "100%";

    text.textContent =
      "Strength: Strong";

  }

}


/* =========================================
   CALCULATOR
========================================= */

function calculatorTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🧮 Calculator
    </h2>

    <p class="tool-description">
      Perform basic calculations.
    </p>

    <input
      id="calcInput"
      class="tool-input"
      type="text"
      placeholder="Example: 25 * 4 + 10"
    >

    <button
      class="primary-btn"
      onclick="calculate()">
      Calculate
    </button>

    <div
      id="calcResult"
      class="tool-result">
      Result will appear here.
    </div>

  `;

}


function calculate() {

  const value =
    document.getElementById(
      "calcInput"
    ).value;

  const result =
    document.getElementById(
      "calcResult"
    );

  if (!/^[0-9+\-*/().%\s]+$/.test(value)) {

    result.textContent =
      "Invalid calculation.";

    return;

  }

  try {

    result.textContent =
      Function(
        `"use strict"; return (${value})`
      )();

  } catch {

    result.textContent =
      "Invalid calculation.";

  }

}


/* =========================================
   AGE CALCULATOR
========================================= */

function ageTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🎂 Age Calculator
    </h2>

    <p class="tool-description">
      Calculate your current age.
    </p>

    <input
      id="birthDate"
      class="tool-input"
      type="date"
    >

    <button
      class="primary-btn"
      onclick="calculateAge()">
      Calculate Age
    </button>

    <div
      id="ageResult"
      class="tool-result">
    </div>

  `;

}


function calculateAge() {

  const input =
    document.getElementById(
      "birthDate"
    ).value;

  if (!input) return;

  const birth =
    new Date(input);

  const today =
    new Date();

  let years =
    today.getFullYear()
    - birth.getFullYear();

  let months =
    today.getMonth()
    - birth.getMonth();

  let days =
    today.getDate()
    - birth.getDate();


  if (days < 0) {

    months--;

    days +=
      new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();

  }

  if (months < 0) {

    years--;

    months += 12;

  }


  document.getElementById(
    "ageResult"
  ).innerHTML = `

    <strong>
      ${years} Years
      ${months} Months
      ${days} Days
    </strong>

  `;

}


/* =========================================
   PERCENTAGE
========================================= */

function percentageTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      📊 Percentage Calculator
    </h2>

    <p class="tool-description">
      Calculate what percentage one number is of another.
    </p>

    <input
      id="percentA"
      class="tool-input"
      type="number"
      placeholder="Value"
    >

    <input
      id="percentB"
      class="tool-input"
      type="number"
      placeholder="Total"
    >

    <button
      class="primary-btn"
      onclick="calculatePercentage()">
      Calculate
    </button>

    <div
      id="percentResult"
      class="big-number">
      0%
    </div>

  `;

}


function calculatePercentage() {

  const a =
    Number(
      document.getElementById(
        "percentA"
      ).value
    );

  const b =
    Number(
      document.getElementById(
        "percentB"
      ).value
    );

  if (!b) return;

  document.getElementById(
    "percentResult"
  ).textContent =
    ((a / b) * 100).toFixed(2) + "%";

}


/* =========================================
   CURRENCY
========================================= */

function currencyTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      💱 Currency Converter
    </h2>

    <p class="tool-description">
      Enter your current exchange rate.
    </p>

    <input
      id="currencyAmount"
      class="tool-input"
      type="number"
      value="1"
      placeholder="Amount"
    >

    <div class="tool-row">

      <input
        id="currencyRate"
        class="tool-input"
        type="number"
        value="280"
        placeholder="Exchange rate"
      >

      <input
        id="currencyName"
        class="tool-input"
        value="PKR"
        placeholder="Target currency"
      >

    </div>

    <button
      class="primary-btn"
      onclick="convertCurrency()">
      Convert
    </button>

    <div
      id="currencyResult"
      class="tool-result">
    </div>

  `;

}


function convertCurrency() {

  const amount =
    Number(
      document.getElementById(
        "currencyAmount"
      ).value
    );

  const rate =
    Number(
      document.getElementById(
        "currencyRate"
      ).value
    );

  const currency =
    document.getElementById(
      "currencyName"
    ).value
    || "PKR";


  document.getElementById(
    "currencyResult"
  ).textContent =
    `${(amount * rate).toFixed(2)} ${currency}`;

}


/* =========================================
   UNIT CONVERTER
========================================= */

function unitTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      📏 Unit Converter
    </h2>

    <p class="tool-description">
      Convert common length, weight and temperature units.
    </p>

    <input
      id="unitValue"
      class="tool-input"
      type="number"
      placeholder="Value"
    >

    <select
      id="unitFrom"
      class="tool-select">

      <option value="m">Meters</option>
      <option value="km">Kilometers</option>
      <option value="cm">Centimeters</option>
      <option value="ft">Feet</option>
      <option value="kg">Kilograms</option>
      <option value="lb">Pounds</option>

    </select>

    <select
      id="unitTo"
      class="tool-select">

      <option value="m">Meters</option>
      <option value="km">Kilometers</option>
      <option value="cm">Centimeters</option>
      <option value="ft">Feet</option>
      <option value="kg">Kilograms</option>
      <option value="lb">Pounds</option>

    </select>

    <button
      class="primary-btn"
      onclick="convertUnit()">
      Convert
    </button>

    <div
      id="unitResult"
      class="tool-result">
    </div>

  `;

}


function convertUnit() {

  const value =
    Number(
      document.getElementById(
        "unitValue"
      ).value
    );

  const from =
    document.getElementById(
      "unitFrom"
    ).value;

  const to =
    document.getElementById(
      "unitTo"
    ).value;


  const units = {

    m: 1,
    km: 1000,
    cm: 0.01,
    ft: 0.3048,
    kg: 1,
    lb: 0.453592

  };


  if (
    (from === "kg" && to !== "kg" && to !== "lb") ||
    (to === "kg" && from !== "kg" && from !== "lb")
  ) {

    document.getElementById(
      "unitResult"
    ).textContent =
      "Please select compatible units.";

    return;

  }


  const result =
    value * units[from] / units[to];


  document.getElementById(
    "unitResult"
  ).textContent =
    result.toFixed(4);

}


/* =========================================
   WORD COUNTER
========================================= */

function wordTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      📝 Word Counter
    </h2>

    <p class="tool-description">
      Count words, characters and sentences.
    </p>

    <textarea
      id="wordText"
      class="tool-textarea"
      placeholder="Type or paste your text..."
      oninput="countWords()">
    </textarea>

    <div
      id="wordResult"
      class="tool-result">
      Words: 0<br>
      Characters: 0<br>
      Sentences: 0
    </div>

  `;

}


function countWords() {

  const text =
    document.getElementById(
      "wordText"
    ).value;

  const words =
    text.trim()
      ? text.trim().split(/\s+/).length
      : 0;

  const characters =
    text.length;

  const sentences =
    text.split(/[.!?]+/)
      .filter(x => x.trim())
      .length;


  document.getElementById(
    "wordResult"
  ).innerHTML = `

    Words: <strong>${words}</strong><br>

    Characters:
    <strong>${characters}</strong><br>

    Sentences:
    <strong>${sentences}</strong>

  `;

}


/* =========================================
   STOPWATCH
========================================= */

let stopwatchInterval;

let stopwatchSeconds = 0;

function stopwatchTool() {

  clearInterval(stopwatchInterval);

  stopwatchSeconds = 0;

  toolContent.innerHTML = `

    <h2 class="tool-title">
      ⏱️ Stopwatch
    </h2>

    <div
      id="stopwatchDisplay"
      class="big-number">
      00:00:00
    </div>

    <div class="tool-row">

      <button
        class="primary-btn"
        onclick="startStopwatch()">
        Start
      </button>

      <button
        class="primary-btn"
        onclick="stopStopwatch()">
        Stop
      </button>

    </div>

    <button
      class="primary-btn"
      onclick="resetStopwatch()">
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

  const h =
    String(
      Math.floor(
        stopwatchSeconds / 3600
      )
    ).padStart(2, "0");

  const m =
    String(
      Math.floor(
        (stopwatchSeconds % 3600) / 60
      )
    ).padStart(2, "0");

  const s =
    String(
      stopwatchSeconds % 60
    ).padStart(2, "0");


  document.getElementById(
    "stopwatchDisplay"
  ).textContent =
    `${h}:${m}:${s}`;

}


/* =========================================
   COUNTDOWN
========================================= */

let countdownInterval;

function countdownTool() {

  clearInterval(countdownInterval);

  toolContent.innerHTML = `

    <h2 class="tool-title">
      ⏰ Countdown Timer
    </h2>

    <input
      id="countdownSeconds"
      class="tool-input"
      type="number"
      min="1"
      value="60"
      placeholder="Seconds"
    >

    <div
      id="countdownDisplay"
      class="big-number">
      60
    </div>

    <button
      class="primary-btn"
      onclick="startCountdown()">
      Start Countdown
    </button>

  `;

}


function startCountdown() {

  clearInterval(countdownInterval);

  let seconds =
    Number(
      document.getElementById(
        "countdownSeconds"
      ).value
    );

  const display =
    document.getElementById(
      "countdownDisplay"
    );

  display.textContent = seconds;


  countdownInterval =
    setInterval(() => {

      seconds--;

      display.textContent =
        seconds;

      if (seconds <= 0) {

        clearInterval(
          countdownInterval
        );

        display.textContent =
          "🎉 Done!";

      }

    }, 1000);

}


/* =========================================
   DATE DIFFERENCE
========================================= */

function dateTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      📅 Date Difference
    </h2>

    <p class="tool-description">
      Calculate the number of days between two dates.
    </p>

    <label>Start Date</label>

    <input
      id="date1"
      class="tool-input"
      type="date"
    >

    <label>End Date</label>

    <input
      id="date2"
      class="tool-input"
      type="date"
    >

    <button
      class="primary-btn"
      onclick="calculateDateDifference()">
      Calculate
    </button>

    <div
      id="dateResult"
      class="tool-result">
    </div>

  `;

}


function calculateDateDifference() {

  const a =
    new Date(
      document.getElementById(
        "date1"
      ).value
    );

  const b =
    new Date(
      document.getElementById(
        "date2"
      ).value
    );


  if (isNaN(a) || isNaN(b))
    return;


  const days =
    Math.abs(
      b - a
    ) /
    (1000 * 60 * 60 * 24);


  document.getElementById(
    "dateResult"
  ).textContent =
    `${Math.round(days)} days`;

}


/* =========================================
   COLOR CONVERTER
========================================= */

function colorTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🎨 Color Converter
    </h2>

    <p class="tool-description">
      Convert HEX colors to RGB.
    </p>

    <input
      id="hexColor"
      class="tool-input"
      value="#6366f1"
      placeholder="#6366F1"
    >

    <button
      class="primary-btn"
      onclick="convertColor()">
      Convert
    </button>

    <div
      id="colorPreview"
      style="
        height:100px;
        border-radius:15px;
        margin-top:15px;
      ">
    </div>

    <div
      id="colorResult"
      class="tool-result">
    </div>

  `;

  convertColor();

}


function convertColor() {

  let hex =
    document.getElementById(
      "hexColor"
    ).value.trim();

  if (hex[0] === "#")
    hex = hex.slice(1);

  if (!/^[0-9A-Fa-f]{6}$/.test(hex))
    return;


  const r =
    parseInt(
      hex.substring(0, 2),
      16
    );

  const g =
    parseInt(
      hex.substring(2, 4),
      16
    );

  const b =
    parseInt(
      hex.substring(4, 6),
      16
    );


  const rgb =
    `rgb(${r}, ${g}, ${b})`;


  document.getElementById(
    "colorPreview"
  ).style.background =
    "#" + hex;


  document.getElementById(
    "colorResult"
  ).textContent =
    rgb;

}


/* =========================================
   IMAGE RESIZER
========================================= */

function imageTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🖼️ Image Resizer
    </h2>

    <p class="tool-description">
      Resize an image directly in your browser.
    </p>

    <input
      id="resizeFile"
      class="tool-input"
      type="file"
      accept="image/*"
    >

    <div class="tool-row">

      <input
        id="resizeWidth"
        class="tool-input"
        type="number"
        placeholder="Width"
      >

      <input
        id="resizeHeight"
        class="tool-input"
        type="number"
        placeholder="Height"
      >

    </div>

    <button
      class="primary-btn"
      onclick="resizeImage()">
      Resize Image
    </button>

    <div id="resizeResult"></div>

  `;

}


function resizeImage() {

  const file =
    document.getElementById(
      "resizeFile"
    ).files[0];

  const width =
    Number(
      document.getElementById(
        "resizeWidth"
      ).value
    );

  const height =
    Number(
      document.getElementById(
        "resizeHeight"
      ).value
    );


  if (!file || !width || !height)
    return;


  const img =
    new Image();

  img.onload = () => {

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width = width;

    canvas.height = height;

    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      img,
      0,
      0,
      width,
      height
    );


    canvas.toBlob(blob => {

      const url =
        URL.createObjectURL(blob);

      document.getElementById(
        "resizeResult"
      ).innerHTML = `

        <div class="tool-result">
          Image resized successfully.
        </div>

        <a
          href="${url}"
          download="resized-image.png"
          class="primary-btn"
          style="
            display:block;
            text-align:center;
            text-decoration:none;
          ">
          Download Image
        </a>

      `;

    }, "image/png");

  };


  img.src =
    URL.createObjectURL(file);

}


/* =========================================
   IMAGE COMPRESSOR
========================================= */

function compressorTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🗜️ Image Compressor
    </h2>

    <p class="tool-description">
      Compress an image in your browser.
    </p>

    <input
      id="compressFile"
      class="tool-input"
      type="file"
      accept="image/*"
    >

    <label>
      Quality
    </label>

    <input
      id="quality"
      type="range"
      min="0.1"
      max="1"
      step="0.1"
      value="0.7"
      style="width:100%; margin:15px 0;"
    >

    <button
      class="primary-btn"
      onclick="compressImage()">
      Compress Image
    </button>

    <div id="compressResult"></div>

  `;

}


function compressImage() {

  const file =
    document.getElementById(
      "compressFile"
    ).files[0];

  const quality =
    Number(
      document.getElementById(
        "quality"
      ).value
    );


  if (!file)
    return;


  const img =
    new Image();

  img.onload = () => {

    const canvas =
      document.createElement(
        "canvas"
      );

    canvas.width =
      img.width;

    canvas.height =
      img.height;


    const ctx =
      canvas.getContext("2d");

    ctx.drawImage(
      img,
      0,
      0
    );


    canvas.toBlob(
      blob => {

        const url =
          URL.createObjectURL(
            blob
          );

        document.getElementById(
          "compressResult"
        ).innerHTML = `

          <div class="tool-result">

            Original:
            ${(file.size / 1024).toFixed(1)}
            KB

            <br>

            Compressed:
            ${(blob.size / 1024).toFixed(1)}
            KB

          </div>

          <a
            href="${url}"
            download="compressed-image.jpg"
            class="primary-btn"
            style="
              display:block;
              text-align:center;
              text-decoration:none;
            ">
            Download Compressed Image
          </a>

        `;

      },
      "image/jpeg",
      quality
    );

  };


  img.src =
    URL.createObjectURL(file);

}


/* =========================================
   NUMBER CONVERTER
========================================= */

function numberTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🔢 Number Converter
    </h2>

    <p class="tool-description">
      Convert decimal numbers into other number systems.
    </p>

    <input
      id="numberInput"
      class="tool-input"
      type="number"
      value="255"
    >

    <button
      class="primary-btn"
      onclick="convertNumber()">
      Convert
    </button>

    <div
      id="numberResult"
      class="tool-result">
    </div>

  `;

}


function convertNumber() {

  const number =
    Number(
      document.getElementById(
        "numberInput"
      ).value
    );


  document.getElementById(
    "numberResult"
  ).innerHTML = `

    Binary:
    <strong>${number.toString(2)}</strong>

    <br>

    Octal:
    <strong>${number.toString(8)}</strong>

    <br>

    Decimal:
    <strong>${number.toString(10)}</strong>

    <br>

    Hexadecimal:
    <strong>${number.toString(16).toUpperCase()}</strong>

  `;

}


/* =========================================
   CASE CONVERTER
========================================= */

function caseTool() {

  toolContent.innerHTML = `

    <h2 class="tool-title">
      🔤 Case Converter
    </h2>

    <p class="tool-description">
      Convert your text into different cases.
    </p>

    <textarea
      id="caseText"
      class="tool-textarea"
      placeholder="Enter your text..."
    ></textarea>

    <button
      class="primary-btn"
      onclick="upperCase()">
      UPPERCASE
    </button>

    <button
      class="primary-btn"
      onclick="lowerCase()">
      lowercase
    </button>

    <button
      class="primary-btn"
      onclick="titleCase()">
      Title Case
    </button>

    <button
      class="primary-btn"
      onclick="sentenceCase()">
      Sentence case
    </button>

  `;

}


function upperCase() {

  const text =
    document.getElementById(
      "caseText"
    );

  text.value =
    text.value.toUpperCase();

}


function lowerCase() {

  const text =
    document.getElementById(
      "caseText"
    );

  text.value =
    text.value.toLowerCase();

}


function titleCase() {

  const text =
    document.getElementById(
      "caseText"
    );

  text.value =
    text.value
      .toLowerCase()
      .replace(
        /\b\w/g,
        char =>
          char.toUpperCase()
      );

}


function sentenceCase() {

  const text =
    document.getElementById(
      "caseText"
    );

  text.value =
    text.value
      .toLowerCase()
      .replace(
        /(^\s*\w|[.!?]\s*\w)/g,
        char =>
          char.toUpperCase()
      );

}


/* =========================================
   COPY
========================================= */

function copyText(id) {

  const element =
    document.getElementById(id);

  navigator.clipboard.writeText(
    element.textContent
  );

}


/* =========================================
   ESCAPE MODAL
========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeTool();

    }

  }
);