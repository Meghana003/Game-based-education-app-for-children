const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const colors = document.querySelectorAll('.color');
let currentColor = 'black';
let painting = false;

colors.forEach(color => {
  color.addEventListener('click', () => {
    currentColor = color.style.backgroundColor;
  });
});

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

function startPosition(e) {
  painting = true;
  draw(e);
}

function endPosition() {
  painting = false;
  context.beginPath();
}

function draw(e) {
  if (!painting) return;
  context.lineWidth = 10;
  context.lineCap = 'round';
  context.strokeStyle = currentColor;
  
  context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  context.stroke();
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
