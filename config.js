
var settings = {
    
    getScore: function() {
        return parseInt(localStorage.getItem('score')) || 0;
    },
   
    updateScore: function(newScore) {
        localStorage.setItem('score', newScore);
    },
    // Function to increment the score by 1
    incrementScore: function() {
        var newScore = this.getScore() + 1; // Increment the score
        this.updateScore(newScore); // Update the score
        updateScoreDisplay(); // Update the score display
    }
};

// Function to update the score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = 'Score: ' + settings.getScore();
}
