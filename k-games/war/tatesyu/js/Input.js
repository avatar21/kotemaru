
function Input(game){this.initialize.apply(this, arguments)};
(function(Class, Super) {
	Util.extend(Class, Super);

	const KEYCODE = {
		37: "left",  //←
		38: "up",    //↑
		39: "right", //→
		40: "down",  //↓
		88: "btn1", //x
		90: "btn2",  //y
	};
	for (var k in KEYCODE) {
		Class[KEYCODE[k]] = false;
	}

	document.onkeydown = function(ev){
		var name = KEYCODE[keyCode(ev)];
		if (name === undefined) return false;
		Class[name] = true;
		return false;
	};
	document.onkeyup = function(ev){
		var name = KEYCODE[keyCode(ev)];
		if (name === undefined) return false;
		Class[name] = false;
		return false;
	};
	function keyCode(ev){
	    if(document.all)
	        return ev.keyCode;
	    else if(document.getElementById)
	        return (ev.keyCode)? ev.keyCode: ev.charCode;
	    else if(document.layers)
	        return ev.which;
	} 

	var isDrag = false;
	Class.onMouseDown = function(ev){
		isDrag = true;
	}
	Class.onMouseUp = function(ev){
		isDrag = false;
		Class.padClear();
	}
	Class.onMouseMove = function(ev){
		if (!isDrag) return;
		if (Config.control == "pad") {
			padTouch(ev);
		} else {
			directTouch(ev); 
		}
	};

	function directTouch(ev) {
		const myShip = Main.thisGame.myShip;
		const ox = (myShip.x-Main.thisGame.clipX);
		const oy = (myShip.y-Main.thisGame.clipY);
		const zoom = document.body.style.zoom;
		const x = ev.clientX/zoom - ox;
		const y = ev.clientY/zoom - oy;
		Class.left  = (x<-4);
		Class.right = (x> 4);
		Class.up    = (y<-4);
		Class.down  = (y> 4);
	}
	
	function padTouch(ev) {
		const ox = 320-80+32;
		const oy = Main.thisGame.clipH-32;
		const zoom = document.body.style.zoom;
		const x = ev.clientX/zoom - ox;
		const y = ev.clientY/zoom - oy;
		Class.left  = (x<-8);
		Class.right = (x> 8);
		Class.up    = (y<-8);
		Class.down  = (y> 8);
	}
	
	Class.padClear = function(){
		Class.left  = false;
		Class.right = false;
		Class.up    = false;
		Class.down  = false;
	};
	
	Class.on = function(name) {
		Class[name] = true;
	}
	Class.off = function(name) {
		Class[name] = false;
	}


	// for iPhone
	function onDeviceMotion(ev) {
		if (Config.control != "orient") return;
		with (ev) {
			Class.right = (gamma> 5);
			Class.left  = (gamma<-5);
			Class.up    = (beta < 20);
			Class.down  = (beta > 30);
		}
	}
	if (!IS_PC) {
		window.addEventListener("deviceorientation", onDeviceMotion, true);
	}
	window.ontouchmove = function(ev) {
		ev.preventDefault();//スクロール禁止
	}


	Class.modeDemo = function(onPlay) {
		function onClick(ev) {
			const zoom = document.body.style.zoom;
			const x = ev.clientX/zoom;
			const y = ev.clientY/zoom;
			if (x<64 && y>Main.thisGame.clipH-64) {
				Input.modeConfig();
				Config.open();
				return;
			}
			onPlay(ev);
		}
		document.body.onmousedown = onClick;
		document.body.ontouchstart = function(ev){onClick(ev.touches[0]);};
	}
	Class.modeConfig = function() {
		document.body.onmousedown = null;
		document.body.ontouchstart = null;
	}
	
	Class.modePlay = function() {
		function onTouchMove(ev){
			isDrag = true;
			Class.onMouseMove(ev.touches[0]);
		};
		document.body.onmousedown = Class.onMouseDown;
		document.body.onmouseup   = Class.onMouseUp;
	
		document.body.onmousemove  = Class.onMouseMove;
		document.body.ontouchmove  = onTouchMove;
		document.body.ontouchstart = onTouchMove;
		document.body.ontouchend   = Class.padClear;
	}
	
	
})(Input);

