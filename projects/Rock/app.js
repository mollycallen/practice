const game = () => {
  let pScore = 0;
  let cScore = 0;

  // start the game
  const startGame = () => {
    const playBtn = document.querySelector(".intro-button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  //play match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const computerOptions = ["rock", "paper", "scissors"];

    const hands = document.querySelectorAll(".hands img");
    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    options.forEach((option) => {
      option.addEventListener("click", function () {
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        playerHand.src = `./img/rock.png`;
        computerHand.src = `./img/rock.png`;
        setTimeout(() => {
          compareHands(this.textContent, computerChoice);
          //update images
          playerHand.src = `./img/${this.textContent}.png`;
          computerHand.src = `./img/${computerChoice}.png`;
        }, 1000);

        playerHand.style.animation = "shakePlayer 1s ease";
        computerHand.style.animation = "shakeComputer 1s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const playerWins = () => {
    const winner = document.querySelector(".winner");
    const playerScore = document.querySelector(".player-score p");
    pScore++;
    playerScore.textContent = pScore;
    winner.textContent = "Player wins!";
  };

  const computerWins = () => {
    const winner = document.querySelector(".winner");
    const computerScore = document.querySelector(".computer-score p");
    cScore++;
    computerScore.textContent = cScore;
    winner.textContent = "Computer wins!";
  };

  const tieGame = () => {
    const winner = document.querySelector(".winner");
    winner.textContent = "It is a tie!";
  };

  const compareHands = (playerChoice, computerChoice) => {
    //console.log(`Player: ${playerChoice} Computer: ${computerChoice}`);

    if (playerChoice === computerChoice) {
      tieGame();
      return;
    }
    if (playerChoice === "rock")
      if (computerChoice === "scissors") {
        playerWins();
        return;
      } else {
        computerWins();
        return;
      }
    if (playerChoice === "paper")
      if (computerChoice === "scissors") {
        computerWins();
        return;
      } else {
        playerWins();
        return;
      }
    if (playerChoice === "scissors")
      if (computerChoice === "paper") {
        playerWins();
        return;
      } else {
        computerWins();
        return;
      }
  };

  // call all the inner functions
  startGame();
  playMatch();
};

game();
