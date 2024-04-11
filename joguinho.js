document.addEventListener('DOMContentLoaded', () => {
    const pacman = document.getElementById('pacman');
    const pacmanFace = document.getElementById('pacman-face');
    const foods = document.querySelectorAll('.food');
    const barriers = document.querySelectorAll('.barrier');
    const ghosts = document.querySelectorAll('.ghost');
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('start-button');
    const speedDownButton = document.getElementById('speed-down'); // Adicionando o botão Diminuir Velocidade
    const scoreDisplay = document.getElementById('score');

    let pacmanX = 0;
    let pacmanY = 0;
    let pacmanDirection = 'right';
    let score = 0;
    let gameRunning = false;
    let movementInterval = 100; // Intervalo de movimento inicial em milissegundos
    const pacmanSize = 40; // tamanho do Pac-Man
    const margin = 1; // margem de colisão reduzida
    const minMovementInterval = 500; // Intervalo mínimo de movimento em milissegundos


        function movePacman() {
            switch (pacmanDirection) {
                case 'up':
                    pacmanY -= 20;
                    break;
                case 'down':
                    pacmanY += 20;
                    break;
                case 'left':
                    pacmanX -= 20;
                    break;
                case 'right':
                    pacmanX += 20;
                    break;
            }
        
            // Restante do código de detecção de colisão e atualização de posição...
        
        

        // Check for collision with walls
        if (pacmanX < 0 || pacmanX >= gameContainer.offsetWidth || pacmanY < 0 || pacmanY >= gameContainer.offsetHeight) {
            endGame();
            return;
        }

        // Check for collision with barriers
        barriers.forEach(barrier => {
            if (collision(pacman, barrier, margin)) {
                endGame();
                return;
            }
        });

        // Check for collision with ghosts
        ghosts.forEach(ghost => {
            if (collision(pacman, ghost, margin)) {
                endGame();
                return;
            }
        });

        // Check for collision with food
        foods.forEach(food => {
            if (collision(pacman, food, 0)) { // Não adicionamos margem de colisão para os alimentos
                food.remove();
                score++;
                scoreDisplay.textContent = `Pontuação: ${score}`;
            }
        });

        pacman.style.left = `${pacmanX}px`;
        pacman.style.top = `${pacmanY}px`;

        setTimeout(movePacman, movementInterval);
    }

    function collision(element1, element2, margin) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(rect1.right - margin < rect2.left || 
                rect1.left + margin > rect2.right || 
                rect1.bottom - margin < rect2.top || 
                rect1.top + margin > rect2.bottom);
    }


    function startGame() {
        if (!gameRunning) {
            pacmanX = 0;
            pacmanY = 0;
            score = 0;
            scoreDisplay.textContent = `Pontuação: ${score}`;
            gameRunning = true;
            movePacman();
        }
    }

    function endGame() {
        gameRunning = false;
        pacmanX = 0;
        pacmanY = 0;
        pacmanDirection = 'right';
        alert('Game Over! Sua pontuação: ' + score);
    }

    startButton.addEventListener('click', startGame);

    speedDownButton.addEventListener('click', () => {
        if (movementInterval < minMovementInterval) return; // Evita diminuir além do limite mínimo
        movementInterval += 100; // Diminui o intervalo em 100ms
    });

    document.addEventListener('keydown', e => {
        if (!gameRunning) return;
        if (e.key === 'ArrowUp') {
            pacmanDirection = 'up';
            pacmanFace.style.transform = 'rotate(-90deg)';
        } else if (e.key === 'ArrowDown') {
            pacmanDirection = 'down';
            pacmanFace.style.transform = 'rotate(90deg)';
        } else if (e.key === 'ArrowLeft') {
            pacmanDirection = 'left';
            pacmanFace.style.transform = 'rotate(180deg)';
        } else if (e.key === 'ArrowRight') {
            pacmanDirection = 'right';
            pacmanFace.style.transform = 'rotate(0deg)';
        }
    });
});
