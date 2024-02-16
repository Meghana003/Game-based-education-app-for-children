document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const gameContainer = document.getElementById('game-container');
    const goal = document.getElementById('goal');
    const messageOverlay = document.getElementById('message-overlay');
    const okButton = document.getElementById('ok-button');

    let infected = false;

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
          }
        }
      });
      function resetPlayerColor() {
        player.style.backgroundColor = 'white';
    }

    // Event listener for the OK button to hide the sanitizer message overlay
    okButton.addEventListener('click', function() {
        hideSanitizerMessage(); // Hide sanitizer message overlay
        if (infected) {
            resetPlayerColor(); // Reset player color to white
            infected = false; // Reset infected flag
        }
    });
      // Check if player reaches the goal
      if (checkOverlap(player, goal)) {
        alert('Congratulations! You won!');
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
    okButton.addEventListener('click', hideSanitizerMessage);

    // Event listener for player movement
    document.addEventListener('keydown', movePlayer);
});