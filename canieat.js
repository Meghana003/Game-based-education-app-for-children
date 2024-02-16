
let score = 0;

function checkItem() {
  const item = document.getElementById('item-input').value.trim().toLowerCase();
  let resultMessage = '';
  let boyImage = 'boy.jpeg';

  if (item === 'apple' || item === 'banana' || item === 'pear') {
    resultMessage = `Yes, ${item} can be eaten!`;
    increaseScore(10);
    boyImage = 'happy_boy.jpeg';
  } else if( item === 'pizza' || item === 'burger' || item === 'french fries'){
    resultMessage = `No, ${item} cannot be eaten!`;
    decreaseScore(5);
    boyImage = 'sad_boy.jpeg';
  }

  document.getElementById('result').textContent = resultMessage;
  document.getElementById('score-value').textContent = score;
  document.getElementById('boy').src = boyImage; // Change the boy's image
}

function increaseScore(points) {
  score += points;
}

function decreaseScore(points) {
  score = Math.max(0, score - points); // Ensure score doesn't go negative
}

