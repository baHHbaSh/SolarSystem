class Object {
	constructor(x, y, width, height, color = "black") {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color
	}
	get w() {
		return this.width;
	}
	set w(value) {
		this.width = value;
	}
	get h() {
		return this.height;
	}
	set h(value) {
		this.height = value;
	}
	get pos() {
		return Array(this.x, this.y)
	}
	set pos(value) {
		this.x = value[0];
		this.y = value[1];
	}
	Render(ctx) {
		ctx.fillStyle = this.color
		ctx.fillRect(this.x, this.y, this.w, this.h)
	}
}

class ImageObject extends Object {
	constructor(x, y, width, height, img) {
		super(x, y, width, height)
		this.SetImage(img);
	}
	Render(ctx) {
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
	}
	SetImageByName(img) {
		this.img = new Image();
		this.img.src = img
	}
	SetImageByObject(img) {
		this.img = img
	}
	SetImage(img) {
		if (typeof (img) == "string") return this.SetImageByName(img)
		return this.SetImageByObject(img)
	}
}


function GetTime() {
	return Date.now() / 1000
}

function ImageLoad(path) {
	let a = new Image()
	a.src = path
	return a
}
function IsTouching(ax, ay, aw, ah, bx, by, bw, bh) {
	a_l = ax;
	a_r = ax + aw;
	a_b = ay;
	a_t = ay + ah;
	b_l = bx;
	b_r = bx + bw;
	b_b = by;
	b_t = by + bh;
	if (a_l >= b_r || a_r <= b_l || a_t <= b_b || a_b >= b_t) return false;
	return true;
}
function ObjTouching(obj1, obj2) {
	return IsTouching(obj1.x, obj1.y, obj1.w, obj1.h, obj2.x, obj2.y, obj2.w, obj2.h);
}



//卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐卐//
let d1;
let d2;
let d3;
let d4;
let d5;
let d6;

class Planet extends ImageObject {
	constructor(size, rad, img, days) {
		let g = 10;
		if (img == "planeti/saturn.png") { g = 5 } else { g = 10 }
		super(0, 0, 10 * size, g * size, img)
		this.MaxDays = days * 10;
		this.Days = 0;
		this.Radius = (rad / 10 * 3) ** (12 / 13);
		this.radian = 0;
	}
	Update() {
		this.Days++;
		if (this.Days > this.MaxDays) {
			this.Days -= this.MaxDays;
		}
		this.radian = (this.Days / this.MaxDays) * (2 * Math.PI)
		this.y = Math.sin(this.radian) * this.Radius;
		this.x = Math.cos(this.radian) * this.Radius;
	}
}

class Game {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.Objs = [];
		this.Planet = [];
		this.Scale = 5;
		this.CreateObject();
		setInterval(this.Update, 10)
	}
	CreateObject() {
		this.Planet.push(new Planet(0.1, 88, "planeti/merkyriy.png", 58))
		this.Planet.push(new Planet(0.24, 108, "planeti/venera.png", 224))
		this.Planet.push(new Planet(0.25, 150, "planeti/zemla.png", 365))
		this.Planet.push(new Planet(0.15, 228, "planeti/mars.png", 1.88 * 365))
		this.Planet.push(new Planet(2.8, 778, "planeti/yupiter.png", 11.86 * 365))
		this.Planet.push(new Planet(2.4, 1429, "planeti/saturn.png", 29.46 * 365))
		this.Planet.push(new Planet(1, 1875, "planeti/uran.png", 84.02 * 365))
		this.Planet.push(new Planet(0.9, 2200, "planeti/neptyn.png", 164.78 * 365))
		this.Objs.push(new ImageObject(-15, -15, 30, 30, "planeti/sun.png"))


	}
	Coef(num) {
		let Data = 0;
		switch (num) {
			case 1:
				Data = 1; break
			case 2:
				Data = 1.5; break
			case 3:
				Data = 1.67; break
			case 4:
				Data = 1.75; break
			case 5:
				Data = 1.8; break
			case 6:
				Data = 1.8375; break
		}
		return Data
	}


	Update() {
		if(d1) {App.Scale = 1;}
		else if(d2) {App.Scale = 2;}
		else if(d3) {App.Scale = 3;}
		else if(d4) {App.Scale = 4;}
		else if(d5) {App.Scale = 5;}
		else if(d6) {App.Scale = 6;}

		App.ctx.clearRect(0, 0, App.canvas.width, App.canvas.height);
		App.ctx.save();
		App.ctx.scale(App.Scale, App.Scale)
		let C = App.Coef(App.Scale);
		App.ctx.translate(-MousePosX * C + App.canvas.width, -MousePosY * C + App.canvas.height);
		App.Objs.forEach((obj) => { obj.Render(App.ctx) })
		App.Planet.forEach((PL) => {
			PL.Update()
		})
		App.Planet.forEach((obj) => { obj.Render(App.ctx) })
		App.ctx.restore()
	}
}

MousePosX = 0;
MousePosY = 0;

window.addEventListener('mousemove', (event) => {
	MousePosX = event.clientX;
	MousePosY = event.clientY;
});

document.addEventListener("keydown", BoolActive);
document.addEventListener("keyup", BoolDeactive);

function BoolDeactive(key) {
	if (key.code == "Digit1") d1 = false;
	if (key.code == "Digit2") d2 = false;
	if (key.code == "Digit3") d3 = false;
	if (key.code == "Digit4") d4 = false;
	if (key.code == "Digit5") d5 = false;
	if (key.code == "Digit6") d6 = false;

}
function BoolActive(key) {
	if (key.code == "Digit1") d1 = true;
	if (key.code == "Digit2") d2 = true;
	if (key.code == "Digit3") d3 = true;
	if (key.code == "Digit4") d4 = true;
	if (key.code == "Digit5") d5 = true;
	if (key.code == "Digit6") d6 = true;

}

let App = new Game();