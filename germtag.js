document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');
  const goal = document.getElementById('goal');
  const messageOverlay = document.getElementById('message-overlay');
  const okButton = document.getElementById('ok-button');
  const scoreDisplay = document.getElementById('score');

  let infected = false;
  let score = 0;

  // Function to update the score display
  function updateScore() {
      scoreDisplay.textContent = 'Score: ' + score;
  }

  // Function to generate a random number within a range
  function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to create a germ element
  function createGerm() {
      const germ = document.createElement('div');
      germ.className = 'germ';
      
      // Set random position
      const xPos = getRandomNumber(0, gameContainer.offsetWidth - 40); // Subtract germ width
      const yPos = getRandomNumber(0, gameContainer.offsetHeight - 40); // Subtract germ height
      germ.style.left = xPos + 'px';
      germ.style.top = yPos + 'px';
      
      // Add click event listener for attacking the germ
      germ.addEventListener('click', function() {
          if (!germ.classList.contains('infected')) {
              germ.classList.add('infected');
              showSanitizerMessage(); // Show the sanitizer message overlay
              infected = true;
              player.style.backgroundColor = 'red';
              score -= 2; // Subtract 2 from score when hitting a germ
              updateScore();
          }
      });
      
      gameContainer.appendChild(germ);

      return germ; // Return the created germ element
  }

  // Create multiple germs
  const numGerms = getRandomNumber(10, 20); // Generate random number of germs between 10 and 20
  const germs = []; // Array to store references to germ elements
  for (let i = 0; i < numGerms; i++) {
      const germ = createGerm();
      germs.push(germ); // Add the created germ to the array
  }

  // Function to check if two elements overlap
  function checkOverlap(element1, element2) {
      const rect1 = element1.getBoundingClientRect();
      const rect2 = element2.getBoundingClientRect();
      return !(rect1.right < rect2.left || 
               rect1.left > rect2.right || 
               rect1.bottom < rect2.top || 
               rect1.top > rect2.bottom);
  }

  // Set random position for the player (boy) that doesn't overlap with germs or goal
  let boyPositionX, boyPositionY;
  do {
      boyPositionX = getRandomNumber(0, gameContainer.offsetWidth - player.offsetWidth);
      boyPositionY = getRandomNumber(0, gameContainer.offsetHeight - player.offsetHeight);
      player.style.left = boyPositionX + 'px';
      player.style.top = boyPositionY + 'px';
  } while (germs.some(germ => checkOverlap(player, germ)) || checkOverlap(player, goal));

  // Function to check if player collides with a specific germ
  function checkCollision(player, germ) {
    const playerRect = player.getBoundingClientRect();
    const germRect = germ.getBoundingClientRect();

    return !(playerRect.right < germRect.left || 
             playerRect.left > germRect.right || 
             playerRect.bottom < germRect.top || 
             playerRect.top > germRect.bottom);
  }

  // Function to handle player movement
  function movePlayer(event) {
    if (event.key === 'ArrowUp') {
      player.style.top = Math.max(0, player.offsetTop - 10) + 'px';
    } else if (event.key === 'ArrowDown') {
      player.style.top = Math.min(gameContainer.clientHeight - player.offsetHeight, player.offsetTop + 10) + 'px';
    } else if (event.key === 'ArrowLeft') {
      player.style.left = Math.max(0, player.offsetLeft - 10) + 'px';
    } else if (event.key === 'ArrowRight') {
      player.style.left = Math.min(gameContainer.clientWidth - player.offsetWidth, player.offsetLeft + 10) + 'px';
    }

    // Check for collision with each germ
    germs.forEach(germ => {
      if (checkCollision(player, germ)) {
        if (!germ.classList.contains('infected')) {
          germ.classList.add('infected');
          showSanitizerMessage(); // Show the sanitizer message overlay
          infected = true;
          player.style.backgroundColor = 'red';
          score -= 2; // Subtract 2 from score when hitting a germ
          updateScore();
        }
      }
    });

    // Check if player reaches the goal
    if (checkOverlap(player, goal)) {
      score += 10; // Add 10 to score when reaching the goal
      updateScore();
      alert('Congratulations! You won!\nYour score: ' + score);
      // Reset the game here if needed
    }
  }

  // Function to show the sanitizer message overlay
  function showSanitizerMessage() {
    messageOverlay.style.display = 'flex';
  }

  // Function to hide the sanitizer message overlay
  function hideSanitizerMessage() {
    messageOverlay.style.display = 'none';
  }

  // Event listener for the OK button to hide the sanitizer message overlay
  okButton.addEventListener('click', function() {
      hideSanitizerMessage(); // Hide sanitizer message overlay
      if (infected) {
          player.style.backgroundColor = 'white'; // Reset player color to white
          infected = false; // Reset infected flag
      }
  });

  // Event listener for player movement
  document.addEventListener('keydown', movePlayer);

  // Initialize the score display
  updateScore();
});
// Get the score from localStorage or set it to 0 if not present

// Use the score variable wherever needed
// Get the score from localStorage or set it to 0 if not present
// Initialize the score to 0 if it's not already set in localStorage
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;

// Function to update the score
function updateScore(newScore) {
  score = newScore;
  localStorage.setItem('score', score);
}

// Function to retrieve the score from localStorage or set it to 0 if not present
function getScore() {
  const score = localStorage.getItem('score');
  return parseInt(score) || 0; // Return 0 if score is not present or not a number
}

// Function to update the score from localStorage
function updateScoreFromGermTag() {
  const germTagScore = getScore();
  updateScore(germTagScore);
}

// Call the function to update score from "germtag.js" whenever needed
updateScoreFromGermTag();
// Initialize the score if it's not set in localStorage
if (!localStorage.getItem('score')) {
  localStorage.setItem('score', 0);
}

// Example: Increment the score by 10 when a germ is tagged
function tagGerm() {
  // Increment the score by 10
  const currentScore = parseInt(localStorage.getItem('score')) || 0;
  const newScore = currentScore + 10;
  localStorage.setItem('score', newScore);

  // Redirect back to the options page
  window.location.href = 'options.html';
}

// Example: Decrement the score by 5 when a wrong germ is tagged
function wrongGermTagged() {
  // Decrement the score by 5
  const currentScore = parseInt(localStorage.getItem('score')) || 0;
  const newScore = Math.max(currentScore - 5, 0);
  localStorage.setItem('score', newScore);

  // Redirect back to the options page
  window.location.href = 'options.html';
}
// Example: Increment the score by 10 when a germ is tagged
function tagGerm() {
  // Increment the score by 10
  settings.incrementScore(); // Call incrementScore() from the settings object
  // Redirect back to the options page
  window.location.href = 'options.html';
}

// Example: Decrement the score by 5 when a wrong germ is tagged
function wrongGermTagged() {
  // Decrement the score by 5
  const currentScore = parseInt(localStorage.getItem('score')) || 0;
  const newScore = Math.max(currentScore - 5, 0);
  localStorage.setItem('score', newScore);
  // Call incrementScore() from the settings object
  settings.incrementScore(); 
  // Redirect back to the options page
  window.location.href = 'options.html';
}
document.addEventListener('DOMContentLoaded', function () {
  const player = document.getElementById('player');
  const gameContainer = document.getElementById('game-container');
  const goal = document.getElementById('goal');
  const messageOverlay = document.getElementById('message-overlay');
  const okButton = document.getElementById('ok-button');
  const scoreDisplay = document.getElementById('score');

  let infected = false;
  let score = 0;

  // Function to update the score display
  function updateScore() {
      scoreDisplay.textContent = 'Score: ' + score;
  }

  // Function to generate a random number within a range
  function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Rest of the game logic...

  // Example: Increment the score by 10 when a germ is tagged
  function tagGerm() {
    // Increment the score by 10
    score += 10;
    updateScore();
    // Redirect back to the options page
    window.location.href = 'options.html';
  }

  // Example: Decrement the score by 5 when a wrong germ is tagged
  function wrongGermTagged() {
    // Decrement the score by 5, ensure it's not negative
    score = Math.max(score - 5, 0);
    updateScore();
    // Redirect back to the options page
    window.location.href = 'options.html';
  }

  // Event listeners...
});
