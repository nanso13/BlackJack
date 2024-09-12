// APIのURL指定
	const API = "https://deckofcardsapi.com/api/deck/";
	// ディーラーとプレイヤーのカード表示領域の作成
	const cards_d_div = document.getElementById("cards_d");
	const cards_p_div = document.getElementById("cards_p");
	const card_d_div = document.createElement("div"); 
	const card_p_div = document.createElement("div");
	const winpoint = document.getElementById("winpoint");
	let d_point = 0;
	let p_point = 0;
	const d_work = [];
	const p_work = [];
	let work = 1;
	let work2 = 2;
	let deck_id = "";
	let random_win_point = "";
	let closestNumber = null;


// Start BlackJackボタンを押されたときに動く
async function startGame() {
	document.getElementById('restart').style.visibility = 'hidden';
	
	const d_work = [];
	const p_work = [];
	const button = document.getElementById("hitstand");
	const winp = document.createElement("p");
	cards_d_div.innerHTML = "";
	cards_p_div.innerHTML = "";
	winpoint.innerHTML = "";
	const response = await fetch(API + "new/shuffle/?deck_count=1");
	const blackjack = await response.json();
	deck_id = blackjack.deck_id;
	console.log(deck_id);
	// ランダムで勝ち点を出す
	const card = document.createElement("img");
	
	
	// ディーラーとプレイヤーのカードを二枚引く
	for (let i = 0; i < 2; i++) {
		const response_d = await fetch(API + deck_id + "/draw/?count=2")
		const draw = await response_d.json();
		// 要素の生成
		const cards_d_image = document.createElement("img");
		const cards_d_value = document.createElement("p");
		const cards_p_image = document.createElement("img");
		const cards_p_value = document.createElement("p");
		// ディーラーのカード画像
		if(i == 0) {
			cards_d_image.src = draw.cards[0].image;
		}else {
		}
		// ディーラーのカードの数値
		d_work[i] = draw.cards[0].value;
		
		cards_p_image.src = draw.cards[1].image;
		p_work[i] = draw.cards[1].value;
		cards_d_value.textContent = d_work[i];
		cards_p_value.textContent = p_work[i];
		if(d_work[i] == "KING" || d_work[i] == "QUEEN" || d_work[i] == "JACK") {
			d_work[i] = 10;
		}else if (d_work[i] == "ACE") {
			d_work[i] = 1;
		}
		if(p_work[i] == "KING" || p_work[i] == "QUEEN" || p_work[i] == "JACK") {
			p_work[i] = 10;
		}else if (p_work[i] == "ACE") {
			p_work[i] = 1;
		}
		// div要素にカード追加
		cards_d_div.appendChild(cards_d_image);
		cards_p_div.appendChild(cards_p_image);
	}
	
		d_point = parseInt(d_work[0]);
		p_point = parseInt(p_work[0]) + parseInt(p_work[1]);
		console.log(d_point);
		console.log(p_point);
	document.getElementById('hit').style.visibility = 'visible';
	document.getElementById('stand').style.visibility = 'visible';
	
	
};

// ヒットボタンを押された場合
document.getElementById("hit").addEventListener("click", async () => {
	work = work + 1;
	
	const response = await fetch(API + deck_id +"/draw/?count=1")
	const draw = await response.json();
	const cards_p_image = document.createElement("img");
	const cards_p_value = document.createElement("p");
	cards_p_image.src = draw.cards[0].image;
	p_work[work] = draw.cards[0].value;
	cards_p_value.textContent = p_work[work];
	if(p_work[work] == "KING" || p_work[work] == "QUEEN" || p_work[work] == "JACK") {
			p_work[work] = 10;
		}else if (p_work[work] == "ACE") {
			p_work[work] = 1;
		}
	p_point = parseInt(p_point) + parseInt(p_work[work]);
	console.log(p_point);
	cards_p_div.appendChild(cards_p_image);
	if(p_point > random_win_point) {
		bust();
	}
	if(p_point == random_win_point){
		logic();
	}
});

// スタンドボタンを押された場合
document.getElementById("stand").addEventListener("click", async () => {
	logic();
});

async function logic(){
	document.getElementById("hit").style.visibility = 'hidden';
	document.getElementById("stand").style.visibility = 'hidden';
	console.log(random_win_point - 4)
	while(d_point < (random_win_point - 4)) {
		const response = await fetch(API + deck_id +"/draw/?count=1")
		const draw = await response.json();
		const cards_d_image = document.createElement("img");
		const cards_d_value = document.createElement("p");
		cards_d_image.src = draw.cards[0].image;
		cards_d_div.appendChild(cards_d_image);
		d_work[work2] = draw.cards[0].value;
		if(d_work[work2] == "KING" || d_work[work2] == "QUEEN" || d_work[work2] == "JACK") {
			d_work[work2] = 10;
		}else if (d_work[work2] == "ACE") {
			d_work[work2] = 1;
		}
		cards_d_value.textContent = d_work[work2];
		console.log(cards_d_value.textContent);
		d_point = parseInt(d_point) + parseInt(d_work[work2]);
		console.log(parseInt(d_point) + parseInt(d_work[work2]));
	
		console.log(d_point);
		work2 = work2 + 1;
		
	}
	
	calc();
	
	document.getElementById('restart').style.visibility = 'visible';
}

function bust() {
	document.getElementById("hit").style.visibility = 'hidden';
	document.getElementById("stand").style.visibility = 'hidden';
	winlose("lose");
	
	document.getElementById('restart').style.visibility = 'visible';
}

function winlose(w){
	if(w == "win") {
		console.log(w);
	}else if(w == "draw"){
		console.log(w);
	}else {
		console.log(w);
	}
}

function calc(){
	if(d_point > random_win_point) {
		winlose("win");
	}else {
		if(p_point > d_point){
			winlose("win");
		}else if(p_point == d_point){
			winlose("draw");
		}else {
			winlose("lose");
		}
	}
}

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
	    if(document.getElementById("btitle")){
			document.getElementById("btitle").remove();
		}
    	document.getElementById('roulette').style.visibility = 'visible';
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
            let numberCenterX = numberRect.left + numberRect.width / 2 - 25;
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
            
        	random_win_point = parseInt(closestNumber.textContent); // closestNumberから数値を取得
        	startGame();
        }
    }

    window.onload = initializeNumbers;