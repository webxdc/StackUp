let game;

receiveUpdate = (update) => {
    const player = update.payload;
    updateHighscore(player.addr, player.name, player.score);
    if (!update.old) {
        document.getElementById('score-btn').style.display='block';
    }
};

receiveOldUpdate = (update) => {
    update.old = true;
    receiveUpdate(update);
};

onload = () => {
    window.webxdc.setUpdateListener(receiveUpdate);
    window.webxdc.getAllUpdates().then((updates) => {
        updates.forEach(receiveOldUpdate);
        game = new Game();
        if (updates.length > 0) {
            document.getElementById('score-btn').style.display='block';
        }
    });
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
