let score = JSON.parse(localStorage.getItem('score')) || {wins: 0, lost: 0, ties: 0};

  updateScoreElement();

  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') result = 'You lose';
      else if (computerMove === 'paper') result = 'You win';
      else result = 'It is a tie';
    } 
    else if (playerMove === 'rock') {
      if (computerMove === 'rock') result = 'It is a tie';
      else if (computerMove === 'paper') result = 'You lose';
      else result = 'You win';
    }
    else if (playerMove === 'paper') {
      if (computerMove === 'rock') result = 'You win';
      else if (computerMove === 'paper') result = 'It is a tie';
      else result = 'You lose';
    }
    
    if (result === 'You win') score.wins++;
    else if (result === 'You lose') score.lost++;
    else score.ties++;
    
    localStorage.setItem('score', JSON.stringify(score));

    // Reset animation by cloning the element
    const resultElement = document.querySelector('.js-result');
    resultElement.style.animation = 'none';
    resultElement.offsetHeight; // trigger reflow
    resultElement.style.animation = null;

    updateScoreElement();
    
    resultElement.innerHTML = result;
    resultElement.style.color = result === 'You win' ? '#00ff88' : result === 'You lose' ? '#ff4d4d' : 'white';
    
    document.querySelector('.js-moves').innerHTML = 
      `You <i class="fa-solid fa-hand${getIcon(playerMove)}"></i> vs <i class="fa-solid fa-hand${getIcon(computerMove)}"></i> Computer`;
  }

  function getIcon(move) {
    if (move === 'rock') return '-back-fist';
    if (move === 'scissors') return '-scissors';
    return '';
  }

  function updateScoreElement() {
    document.getElementById('wins').innerText = score.wins;
    document.getElementById('lost').innerText = score.lost;
    document.getElementById('ties').innerText = score.ties;
  }

  function resetGame() {
    score = {wins: 0, lost: 0, ties: 0};
    localStorage.removeItem('score');
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = '';
    document.querySelector('.js-moves').innerHTML = '';
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1/3) return 'rock';
    if (randomNumber < 2/3) return 'paper';
    return 'scissors';
  }

