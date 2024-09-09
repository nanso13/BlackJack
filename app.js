// APIのURL指定
	const API = "https://deckofcardsapi.com/api/deck/";
	// ディーラーとプレイヤーのカード表示領域の作成
	const cards_d_div = document.getElementById("cards_d");
	const cards_p_div = document.getElementById("cards_p");
	const card_d_div = document.createElement("div"); 
	const card_p_div = document.createElement("div");
	const winpoint = document.getElementById("winpoint");
	let deck_id = "";

// Start BlackJackボタンを押されたときに動く
document.getElementById("start").addEventListener("click", async () => {
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
	const random_win_point = Math.floor(Math.random() * 30 + 1);
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
		
		cards_d_image.src = draw.cards[0].image;
		cards_d_value.textContent = draw.cards[0].value;
		cards_p_image.src = draw.cards[1].image;
		cards_p_value.textContent = draw.cards[1].value;
		// div要素にカード追加
		cards_d_div.appendChild(cards_d_image);
		cards_p_div.appendChild(cards_p_image);
	}
	document.getElementById('hit').style.visibility = 'visible';
	document.getElementById('stand').style.visibility = 'visible';
	winp.textContent = random_win_point;
	document.getElementById("winpoint").appendChild(winp);
	
	
});

// ヒットボタンを押された場合
document.getElementById("hit").addEventListener("click", async () => {
	const response = await fetch(API + deck_id +"/draw/?count=1")
	const draw = await response.json();
	const cards_p_image = document.createElement("img");
	const cards_p_value = document.createElement("p");
	cards_p_image.src = draw.cards[0].image;
	cards_p_value.textContent = draw.cards[0].value;
	cards_p_div.appendChild(cards_p_image);
});
