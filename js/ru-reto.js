let rouletteTrack = document.getElementById('rouletteTrack');
    let numbers = [];
    for (let i = 21; i <= 60; i++) {
        numbers.push(i);
    }

    // 配列をシャッフルする関数
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // 数字を初期化する関数
    function initializeNumbers() {
        let uniqueNumbers = [...numbers]; // 21から60までのユニークな数字
        shuffle(uniqueNumbers); // ランダムに並べる
        rouletteTrack.innerHTML = '';
        uniqueNumbers.forEach(num => {
            let div = document.createElement('div');
            div.classList.add('number');
            div.textContent = num;
            rouletteTrack.appendChild(div);
        });
    }

    let currentIndex = 0;
    let totalDistance = 0;
    let speed = 0;
    let interval;

    // ルーレットを開始する関数
    function startRoulette() {
        clearInterval(interval);
        initializeNumbers();

        let totalWidth = rouletteTrack.scrollWidth;
        let containerWidth = document.querySelector('.roulette-container').offsetWidth;

        let stopPosition = Math.random() * (totalWidth / 2); // ランダムな停止位置

        totalDistance = 0;
        speed = 80; // 初期スピード

        interval = setInterval(() => {
            speed *= 0.98; // 減速
            currentIndex += speed;

            if (currentIndex >= totalWidth / 2) {
                currentIndex = 0; // トラックをループさせる
            }

            rouletteTrack.style.transform = `translateX(${-currentIndex}px)`;

            totalDistance += speed;

            // 停止条件：スピードが十分に低下し、距離が十分に進んだら停止
            if (speed < 0.5 && totalDistance >= stopPosition) {
                clearInterval(interval);
                adjustPositionAndHighlight();
            }
        }, 20);
    }

    // ハイライトされた数字を画面中央に配置する関数
    function adjustPositionAndHighlight() {
        let containerRect = document.querySelector('.roulette-container').getBoundingClientRect();
        let numbers = document.querySelectorAll('.number');
        let selectedNumber = null;
        let closestDistance = Infinity;
        let closestNumber = null;

        // コンテナの中央を計算
        let containerCenterX = containerRect.left + containerRect.width / 2;

        numbers.forEach(num => {
            let numRect = num.getBoundingClientRect();
            let numCenterX = numRect.left + numRect.width / 2;

            let distance = Math.abs(containerCenterX - numCenterX);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestNumber = num;
            }
        });

        if (closestNumber) {
            closestNumber.classList.add('highlight'); // 最も近い数字をハイライト
            console.log("選ばれた数値は: " + closestNumber.textContent);

            // ハイライトされた数字を中央に配置するための調整量を計算
            let numberRect = closestNumber.getBoundingClientRect();
            let numberCenterX = numberRect.left + numberRect.width / 2;
            let offset = containerCenterX - numberCenterX;

            // トラックの位置を調整して、選ばれた数字を中央に配置
            let trackTransformValue = parseFloat(rouletteTrack.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
            let newTransformValue = trackTransformValue - offset;

            // コンテナの幅を超えないように調整
            let maxTransformValue = containerRect.width - rouletteTrack.scrollWidth;
            if (newTransformValue > 0) {
                newTransformValue = 0; // 左端に寄せる
            } else if (newTransformValue < maxTransformValue) {
                newTransformValue = maxTransformValue; // 右端に寄せる
            }

            rouletteTrack.style.transform = `translateX(${newTransformValue}px)`;
        }
    }

    window.onload = initializeNumbers;