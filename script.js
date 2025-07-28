$(document).ready(function () {
  const MAX_CARDS = 12;
  let lockBoard = false;
  let hasFlippedCard = false;
  let firstCard, secondCard;

  const cards = document.querySelectorAll(".memoryCard");

  (function suffleCards() {
    cards.forEach((card) => {
      const randomPosition = Math.floor(Math.random() * MAX_CARDS);
      card.style.order = randomPosition;
    });
  })();

  cards.forEach((card) => {
    card.addEventListener("click", handleCardFlip);
  });

  function handleCardFlip() {
    if (lockBoard || firstCard === this) {
      return;
    }

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    checkForMatch();
  }

  function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? disableMatchedCards() : unflipCards();
  }

  function disableMatchedCards() {
    firstCard.removeEventListener("click", handleCardFlip);
    secondCard.removeEventListener("click", handleCardFlip);

    resetTurn();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetTurn();
    }, 1500);
  }

  function resetTurn() {
    [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false];
    [firstCard, secondCard] = [null, null];
    winning();
  }

  let themesArray = {};
  let hartryPoterImageResulte = [];
  let dogsImageResulte = [];
  let flagsImageResulte = [];

    
// get Harry Potter Images from public Api
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://hp-api.onrender.com/api/characters/students",
    success: function (data) {
      for (let i = 0; i < 6; i++) {
        if (data[i].image !== "") {
          hartryPoterImageResulte.push(data[i].image);
        }
      }
      themesArray.harryPotter = hartryPoterImageResulte;
    },
  });

// get Dogs Images from public Api
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://dog.ceo/api/breed/hound/images",
    success: (data) => {
      let res = data.message;
      for (let i = 0; i < 6; i++) {
        if (data.message[i] !== "") {
          dogsImageResulte.push(data.message[i]);
        }
      }
      themesArray.dogs = dogsImageResulte;
    },
  });

// get Flags Images from public Api
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://restcountries.com/v3.1/all?fields=name,flags",
    success: (data) => {
      for (let i = 0; i < 6; i++) {
        flagsImageResulte.push(data[i].flags.png);
      }
      themesArray.flags = flagsImageResulte;
    },
  });


  const gameTheme = document.querySelector(".gameTheme");
  let curTheme = "";
  let isThemeSelected = false;

  function chooseSelectedTheme() {
    gameTheme.addEventListener("change", (e) => {
      if (!isThemeSelected) {
        let curThemeE = e.target.value;
        curTheme = curThemeE;
        isThemeSelected = true;
        randomeThemeSelection();
         activateGame();
        curTheme = curThemeE;
      }
    });
  }

  chooseSelectedTheme();

  function randomeThemeSelection() {
    if (curTheme === "randome") {
      let randomizeNumAsIdx = Math.floor(Math.random() * 3);
      let randomnum = randomizeNumAsIdx;

      switch (randomnum) {
        case 0:
          randomnum = "harryPotter";
          curTheme = randomnum;
          break;
        case 1:
          randomnum = "dogs";
          curTheme = randomnum;
          break;
        case 2:
          randomnum = "flags";
          curTheme = randomnum;
          break;
      }
    }
  }

  function  activateGame() {
    if (isThemeSelected) {
      gameTheme.classList.add("d-none");
      document.querySelector(".memoryGame").classList.remove("d-none");
      changeBackFaceCard();
      changeFrontFaceCard();
    }
  }

  let backFace = document.querySelectorAll(".backFace");
  let frontFace = document.querySelectorAll(".frontFace");

  function changeBackFaceCard() {
    if (curTheme == "harryPotter") {
      backFace.forEach((card, idx) => {
        card.src = "img/APIImg/HarryPotter.jpeg";
      });
    }
    if (curTheme == "dogs") {
      backFace.forEach((card, idx) => {
        card.src = "img/APIImg/Dogs.jpeg";
      });
    }
    if (curTheme == "flags") {
      backFace.forEach((card, idx) => {
        card.src = "img/APIImg/Flags.jpeg";
      });
    }
  }

  function changeFrontFaceCard() {
    frontFace.forEach((img, idx) => {
      let curImgAlt = img.alt;
      let divTest= img.closest("div")
      
      if (curTheme != "" && curImgAlt === "Wonder Woman") {
        img.alt = `${curTheme} Image`;
        img.src = themesArray[curTheme][0];
       divTest.dataset.card = 'firstCardPair';

       console.log(divTest);
      }
      if (curTheme != "" && curImgAlt === "batman") {
        img.alt = `${curTheme} Image`;
        img.src = themesArray[curTheme][1];
        divTest.dataset.card = 'secondCardPair';
      }
      if (curTheme != "" && curImgAlt === "catwoman") {
        img.alt = `${curTheme} Image`;
        img.src = themesArray[curTheme][2];
        divTest.dataset.card = 'thirdCardPair';
      }
      if (curTheme != "" && curImgAlt === "ironman") {
        img.alt = `${curTheme} Image`;
        img.src = themesArray[curTheme][3];
        divTest.dataset.card = 'fourthCard Pair';
      }
      if (curTheme != "" && curImgAlt === "spiderman") {
        img.alt = `${curTheme} Image`;
        img.src = themesArray[curTheme][4];
        divTest.dataset.card = 'fifthCard Pair';
      }
      if (curTheme != "" && curImgAlt === "The Flash") {
        img.alt = `${curTheme} Image`;
        img.src = themesArray[curTheme][5];
        divTest.dataset.card = 'sixthCard Pair';
      }
    });
  }

  function winning() {
    let flippedCards = document.querySelectorAll(".flip");

      if (flippedCards.length === 12) {
        alert(" Congratulations! you win the game, refresh to start over");
          flippedCards.forEach((curflipedCard, idx) => {
          curflipedCard.classList.remove("flip");
        });
    }
  }
});
