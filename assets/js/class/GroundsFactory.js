"use strict";
let px = 'px';
let pc = '%';
let rem = 'rem';
class GroundsFactory extends CommunsTools {
	constructor(player) {
		super()
		this.isBug = true
		this.isPause = true
		this.startGroundImmat = 2
		this.currentGroundImmat = this.startGroundImmat
		// --
		this.player = player
		// --
		this.ground = Object
		this.get_Basics()
	}
	get_Basics() {
		this.screenConfig = this.get_ScreenConfig()
		this.ground = this.groundManager()
		this.ground.set_GroundDatas()
		this.ground.add_ToDom()
	}
	groundManager = () => {
		let newground = {
			immat: this.currentGroundImmat,
			datas: {
				// name: 'GroundZero', 
				// pos: { x: 0, y: 0, z: 0 }, 
				// size: { w: 0, h: 0, l: 0 }, 
				// classname: 'ground ground-0', 
				// case: { w: , h:, l: }
			},
			div: Object,
			refresh: () => {
				if (this.ground) {

					this.player.checkPos(this.ground)
					this.player.divinfo.textContent = 'x:' + this.player.datas.pos.x + ' ,y:' + this.player.datas.pos.y
					this.player.divvisual.style.transform = 'rotate(' + this.player.datas.pos.d + 'deg)'

					this.player.div.style.left = parseInt((window.innerWidth / 2) - 16) + px
					this.player.div.style.top = parseInt((window.innerHeight / 2) - 16) + px


					this.player.divbeyond.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.clickrange / 2)) + px
					this.player.divbeyond.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.clickrange / 2)) + px


					this.ground.div.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.pos.x) - 16) + px
					this.ground.div.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.pos.y) - 16) + px
				}
			},
			set_GroundDatas: () => {
				let grounds = {
					0: { name: 'GroundZero', pos: { x: 4096, y: 4096, z: 1 }, size: { w: 4096, h: 4096, l: 1 }, classname: 'ground ground-0', case: { w: 32, h: 32, l: 32 } },
					1: { name: 'GroundOne', pos: { x: 4096, y: 4096, z: 1 }, size: { w: 4096, h: 4096, l: 1 }, classname: 'ground ground-1', case: { w: 32, h: 32, l: 32 } },
					2: { name: 'GroundTwo', pos: { x: 4096, y: 4096, z: 1 }, size: { w: 4096, h: 4096, l: 1 }, classname: 'ground ground-2', case: { w: 32, h: 32, l: 32 } },
				}
				// this.ground.datas = (this.currentGroundImmat >= 0 && grounds[this.currentGroundImmat]) ? grounds[this.currentGroundImmat] : false
				if (grounds[this.currentGroundImmat]) {
					this.ground.datas = grounds[this.currentGroundImmat]
					this.ground.set_Div()
				}
				else {
					this.setBugAndPause('empty ground')
				}
			},
			add_ToDom: () => {
				document.body.appendChild(this.ground.div)
			},
			set_Div: () => {
				this.ground.div = this.ground.div_Maker('div', this.ground.datas)
			},
			div_Maker: () => {
				if (this.ground.datas) {
					let newdiv = document.createElement('div')
					// newdiv.id = 'absolute' + this.ground.immat
					newdiv.style.position = 'absolute'
					newdiv.className = this.ground.datas.classname
					//--
					newdiv.style.width = this.ground.datas.size.w + px
					newdiv.style.height = this.ground.datas.size.h + px
					newdiv.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.pos.x) - 16) + px
					newdiv.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.pos.y) - 16) + px
					return newdiv
				}
				return false
			}
		}
		return newground
	}
	move = (dir) => {
		// key 37 & 81
		if (dir === "ArrowLeft" || dir === "q") {
			this.player.datas.pos.x -= this.player.datas.speed
			this.player.datas.pos.d = 270
			this.ground.refresh()
		}
		// key 37 & 81
		if (dir === "ArrowRight" || dir === "d") {
			this.player.datas.pos.x += this.player.datas.speed
			this.player.datas.pos.d = 90
			this.ground.refresh()
		}
		// key 38 & 90
		if (dir === "ArrowUp" || dir === "z") {
			this.player.datas.pos.y -= this.player.datas.speed
			this.player.datas.pos.d = 0
			this.ground.refresh()
		}
		// key 40 & 83
		if (dir === "ArrowDown" || dir === "s") {
			this.player.datas.pos.y += this.player.datas.speed
			this.player.datas.pos.d = 180
			this.ground.refresh()
		}
	}
	get_ScreenConfig = () => {
		return {
			renderinterval: this.renderinterval,
			groundsize: { w: 400, h: 400, l: 1 },
			screenSize: {
				x: window.innerWidth,
				y: window.innerHeight,
				z: 0
			},
			screenCenter: {
				w: window.innerWidth / 2,
				h: window.innerHeight / 2,
				l: 0
			},
		}
	}
	set_ScreenXY = () => {
		this.screenConfig.screenSize = {
			x: window.innerWidth,
			y: window.innerHeight,
			z: 0
		}
		this.set_ScreenCenterXY()
	}
	set_ScreenCenterXY = () => {
		this.screenConfig.screenCenter = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
			z: 0
		}
	}
	get_BoundingClientRectById = (id) => {
		return document.getElementById(id).getBoundingClientRect()
	}
}
