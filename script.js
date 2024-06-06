let multiplier = 1.0;
let betAmount = 0;
let gameInterval;
let gameActive = false;
let balance = 100.0;

const airplane = document.getElementById('airplane');
const startButton = document.getElementById('start-button');
const cashoutButton = document.getElementById('cashout-button');
const multiplierDisplay = document.getElementById('multiplier');
const statusDisplay = document.getElementById('status');
const betInput = document.getElementById('bet');
const balanceDisplay = document.getElementById('balance');

startButton.addEventListener('click', startGame);
cashoutButton.addEventListener('click', cashout);

function updateBalance(amount) {
    balance += amount;
    balanceDisplay.textContent = balance.toFixed(2);
}

function startGame() {
    if (gameActive) return;
    betAmount = parseFloat(betInput.value);
    if (isNaN(betAmount) || betAmount <= 0) {
        alert('Por favor, ingresa una cantidad de apuesta válida.');
        return;
    }
    if (betAmount > balance) {
        alert('Saldo insuficiente.');
        return;
    }

    updateBalance(-betAmount);
    multiplier = 0.0; // Inicializa el multiplicador en 0
    gameActive = true;
    statusDisplay.textContent = '';
    startButton.disabled = true;
    cashoutButton.disabled = false;

    gameInterval = setInterval(() => {
        multiplier += 0.02; // Aumenta el multiplicador más rápido con el tiempo
        multiplierDisplay.textContent = multiplier.toFixed(2);
        airplane.style.transform = `scale(${multiplier})`;
        if (Math.random() < getCrashProbability(multiplier)) {
            crash();
        }
    }, 100);
}

function cashout() {
    if (!gameActive) return;
    clearInterval(gameInterval);
    gameActive = false;
    const winnings = betAmount * multiplier;
    updateBalance(winnings);
    statusDisplay.textContent = `Ganaste: $${winnings.toFixed(2)}`;
    startButton.disabled = false;
    cashoutButton.disabled = true;
}

function crash() {
    clearInterval(gameInterval);
    gameActive = false;
    statusDisplay.innerHTML = '<span style="color: red;">¡El avión se estrelló! 💥</span>';
    startButton.disabled = false;
    cashoutButton.disabled = true;
}

function getCrashProbability(multiplier) {
    // Aumenta la probabilidad de estrellarse con el multiplicador
    return Math.min(1, 0.009 + (multiplier / 100));
}
