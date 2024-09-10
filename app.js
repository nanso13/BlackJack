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
	let deck_id = "";

// Start BlackJackボタンを押されたときに動く
document.getElementById("start").addEventListener("click", async () => {
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
	const random_win_point = Math.floor(Math.random() * 40 + 11);
	const card = document.createElement("img");
	
	var num = random_win_point;
	$('#roulette')
		.removeClass(function(index, className) {
        return (className.match(/(^|\s)number-\S+/g) || []).join(' ');
    	})
    	.addClass('number-' + num);
	
	
	// ディーラーとプレイヤーのカードを二枚引く
	for (let i = 0; i < 2; i++) {
		const response_d = await fetch(API + deck_id + "/draw/?count=2")
		const draw = await response_d.json();
		// 要素の生成
		const cards_d_image = document.createElement("img");
		const cards_d_value = document.createElement("p");
		const cards_p_image = document.createElement("img");
		const cards_p_value = document.createElement("p");
<<<<<<< HEAD
		
		cards_d_image.src = draw.cards[0].image;
		cards_d_value.textContent = draw.cards[0].value;
=======
		// ディーラーのカード画像
		if(i == 0) {
			cards_d_image.src = draw.cards[0].image;
		}else {
			cards_d_image.src = "https://www.deckofcardsapi.com/static/img/back.png";
		}
		// ディーラーのカードの数値
		d_work[i] = draw.cards[0].value;
		
>>>>>>> 3c3c19e31c642b5ad36222025f6e80f16ce0ba51
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
	winp.textContent = random_win_point;
	document.getElementById("winpoint").appendChild(winp);
	
	
});

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
});

// スタンドボタンを押された場合
document.getElementById("stand").addEventListener("click", async () => {
	document.getElementById("hit").style.visibility = 'hidden';
	document.getElementById("stand").style.visibility = 'hidden';
});

function logic(){
	
}

function calc(){
	
}