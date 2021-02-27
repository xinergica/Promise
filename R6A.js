


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

let w = 3350;
let h = 50;
canvas.width = w;
canvas.height = h;


	function draw(from, to, color, y){
		context.beginPath();
		context.lineWidth = 10;
		context.strokeStyle = color;
		context.moveTo(0.5 + from, 0.5 + y);
		context.lineTo(0.5 + to,   0.5 + y);
		context.stroke();
	}

	function drawYs(hi){
		i = 50;
		let t = 0;
		do{
			if((t % hi) == 0){				
				drawY(t, 3, 47, '#CCC');
			}
			else{				
				drawY(t, 8, 42, '#EEE');
			}
			t += i;
;
		}while(t < w);
	}	


	function drawY(t, y0, y1, color){
		

		context.beginPath();
		context.lineWidth = 5;
		context.strokeStyle = color;
		context.moveTo(t, y0);
		context.lineTo(t, y1);
		context.stroke();
	}
			
			
	var startTime;
	var startNow;

	
	function loop(n, color, y){
	
		// the time (microseconds) when just entered the function
		let from = getNowElapsed(); 
		
		// a random number between 0 and 99 (included)
		let Zero99 = 100 * Math.random(); 		
		let _nMax = (1000 * 1000) * (56 + Zero99);
		
		for(let i = 0; i < _nMax; i++){ }
		
		// the time (microseconds) when just completed the loop
		let to = getNowElapsed(); 
		
		draw(from, to, color, y);
		
		appendLi('loop', n, from, to, color);
		
	}
	
	function loops(interval, btn){
		tools.highlight.clearAll(btn);
		tools.highlight.resolved(btn);
		
		clearList();
		context.clearRect(0, 0, canvas.width, canvas.height);

		drawYs(interval);
		
		tools.disableBtns(btn);
		
		debugger;	
			
		function stopLoops(){
			let from = getNowElapsed(); 
			clearInterval(intervalId1);
			clearInterval(intervalId2);
			appendLi('stop', 'Game over', from, '', '#555', '#F7DC6F');
			tools.enableBtns(btn);
		};		
		
		startTime = new Date();
		startNow = getNow();

		
		window.setTimeout(stopLoops, 3000 + interval);
		
		// the first iteration of function 'loop' starts after 1 'interval'
		let intervalId1 = window.setInterval(loop, interval, 1, '#BA4A00', 20);
		window.setTimeout(loop, 0, 1, '#BA4A00', 20);
		
		// the first iteration of function 'loop' starts not before 1.5 'interval'
		let intervalId2 = 0;
		window.setTimeout(() => {
			intervalId2 = window.setInterval(loop, interval, 2, '#1E8449', 30);
			window.setTimeout(loop, 0, 2, '#1E8449', 30);
			},
			interval/2
		);
	}
		
	function btnR6ALoops100_onClick(btn){
		loops(interval = 100, btn);
	}
	function btnR6ALoops150_onClick(btn){
		loops(interval = 150, btn);
	}
	function btnR6ALoops200_onClick(btn){
		loops(interval = 200, btn);
	}
	function btnR6ALoops250_onClick(btn){
		loops(interval = 250, btn);
	}
	function btnR6ALoops300_onClick(btn){
		loops(interval = 300, btn);
	}
	
	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //
	
	function getNow() {		
		// 'browser compatibility' check.
		var now = (window.performance && window.performance.now) ? Math.round(window.performance.now() * 100): (100 * new Date());
		return now;
	}
	
	function getNowElapsed() {		
		var endNow = getNow()
		return ((endNow - startNow) / 100);
	}	
	function appendLi(action, text, from, to, color, backgroundColor) {
	
		color = color || '#666';
		backgroundColor = backgroundColor || '#FFF';
		
		var toFixed = to == '' ? '' : to.toFixed(2);
		
		let html = 
			'<span class="elapsed">' + from.toFixed(2) +'</span>'  +
			'<span class="elapsed">' + toFixed +'</span>'  +
			'<span class="action" style="color:' + color + '">' + action + '</span>' + 
			'<span class="text"   style="color:' + color + '">' + text   + '</span>';

		var li = document.createElement("li");
		li.setAttribute('style','background-color:' + backgroundColor +';');
		li.innerHTML = html;

		document.getElementById("ulR6A").appendChild(li);
		
	}
	  
	function clearList() {
		document.getElementById("ulR6A").innerHTML = '';
	}

	// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX //

