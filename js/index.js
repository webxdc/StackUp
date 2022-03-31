let game;

onload = () => {
    game = new Game();
    let scoreBtn = document.getElementById('score-btn');
    window.webxdc.setUpdateListener((update) => {
        const player = update.payload;
        updateHighscore(player.addr, player.name, player.score);
        if (update.serial === update.max_serial) {
            scoreBtn.style.display = 'block';
        }
    }, 0);
}

showScoreboard = () => {
    event.stopPropagation();
    const container = document.getElementById('scoreboard-container');
    container.innerHTML = '';

    const addr = window.webxdc.selfAddr;
    const list = document.createElement('ol');
    list.className = 'w3-ol';
    highscores().forEach(item => {
        const name = document.createElement('span');
        name.className = 'w3-large';
        name.textContent = item.name.length > 20 ? item.name.substring(0, 20) + '…' : item.name;

        const score = document.createElement('span');
        score.textContent = item.score;
        score.className = 'w3-right';

        const li = document.createElement('li');
        if (item.addr == addr) {
            const strong = document.createElement("strong");
            strong.appendChild(name);
            strong.appendChild(score);
            li.appendChild(strong);
        } else {
            li.appendChild(name);
            li.appendChild(score);
        }
        list.appendChild(li);
    });

    container.appendChild(list);
    document.getElementById('scoreboard').style.display='block';
}
