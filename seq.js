const puzzleContainer = document.getElementById("puzzle-container");
const checkButton = document.getElementById("checkButton");

const puzzles = [
  ["p2.jpeg", "p1.jpeg", "p3.jpeg"],
  ["p4.jpg", "p5.jpg", "p6.jpg"],
];

let currentPuzzleIndex = 0;

function generatePuzzle() {
  const currentPuzzle = puzzles[currentPuzzleIndex];
  currentPuzzle.sort(() => Math.random() - 0.5);

  currentPuzzle.forEach((imagePath, index) => {
    const puzzlePiece = document.createElement("img");
    puzzlePiece.classList.add("puzzle-piece");
    puzzlePiece.setAttribute("draggable", true);
    puzzlePiece.setAttribute("data-index", index);
    puzzlePiece.src = imagePath;

    puzzlePiece.addEventListener("dragstart", dragStart);

    puzzleContainer.appendChild(puzzlePiece);
  });
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function drop(event) {
  event.preventDefault();

  const fromIndex = event.dataTransfer.getData("text/plain");
  const toIndex = event.target.dataset.index;

  swapPuzzlePieces(fromIndex, toIndex);
}

function swapPuzzlePieces(fromIndex, toIndex) {
  const pieces = Array.from(puzzleContainer.children);
  const temp = pieces[fromIndex].src;

  pieces[fromIndex].src = pieces[toIndex].src;
  pieces[toIndex].src = temp;
}

function allowDrop(event) {
  event.preventDefault();
}

function checkSolution() {
    const puzzlePieces = Array.from(puzzleContainer.children);
    const correctOrder = Array.from(Array(puzzlePieces.length).keys());
  
    let isCorrect = false;
    puzzlePieces.forEach((piece, index) => {
      if (parseInt(piece.dataset.index) == index) {
        isCorrect = true;
      }
    });
  
    if (isCorrect) {
      alert("Congratulations! You solved the puzzle!");
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      nextPuzzle();
    } else {
      alert("Oops! That's not the correct solution. Try again!");
    }
  }
  
  
  

puzzleContainer.addEventListener("drop", drop);
puzzleContainer.addEventListener("dragover", allowDrop);
checkButton.addEventListener("click", checkSolution);

generatePuzzle(); 