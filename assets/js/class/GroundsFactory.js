"use strict";
let px = 'px';
let pc = '%';
let rem = 'rem';
class GroundsFactory extends CommunsTools {
	constructor(player) {
		super()
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
					this.ground.div.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.pos.x) - (this.casesize / 2)) + px
					this.ground.div.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.pos.y) - (this.casesize / 2)) + px
					// console.log('ground:' + this.ground.datas.pos.x + px, this.ground.datas.pos.y + px)
					// console.log('player:' + this.player.datas.pos.x + px, this.player.datas.pos.y + px)
				}
			},
			resize_Ground: () => {
				this.ground.datas.size.w = (this.ground.datas.nbcase.x * this.ground.datas.casesize.w)
				this.ground.datas.size.h = (this.ground.datas.nbcase.y * this.ground.datas.casesize.h)
			},
			set_GroundDatas: () => {
				let grounds = {
					0: {
						name: 'GroundZero', pos: {
							x: parseInt((window.innerWidth / 2) - (this.player.datas.pos.x)),
							y: parseInt((window.innerHeight / 2) - (this.player.datas.pos.y)),
							z: 1
						},
						size: { w: 128, h: 128, l: 1 },
						classname: 'ground ground-0',
						case: { w: 32, h: 32, l: 32 },
						nbcase: { x: 128, h: 128, l: 1 }
					},
					1: {
						name: 'GroundOne', pos: {
							x: parseInt((window.innerWidth / 2) - (this.player.datas.pos.x)),
							y: parseInt((window.innerHeight / 2) - (this.player.datas.pos.y)),
							z: 1
						},
						size: { w: 128, h: 128, l: 1 },
						classname: 'ground ground-1',
						case: { w: 32, h: 32, l: 32 },
						nbcase: { x: 128, h: 128, l: 1 }
					},
					2: {
						name: 'GroundTwo', pos: {
							x: parseInt((window.innerWidth / 2) - (this.player.datas.pos.x)),
							y: parseInt((window.innerHeight / 2) - (this.player.datas.pos.y)),
							z: 1
						},
						size: { w: 128, h: 128, l: 1 },
						classname: 'ground ground-2',
						casesize: { w: 32, h: 32, l: 32 },
						nbcase: { x: 128, y: 128, z: 1 }
					},
				}
				// this.ground.datas = (this.currentGroundImmat >= 0 && grounds[this.currentGroundImmat]) ? grounds[this.currentGroundImmat] : false
				if (grounds[this.currentGroundImmat]) {
					this.ground.datas = grounds[this.currentGroundImmat]
					this.ground.resize_Ground()
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
				this.ground.div = this.ground.get_DivElem('div', this.ground.datas)
			},
			get_DivElem: () => {
				if (this.ground.datas) {
					let groundDiv = document.createElement('div')
					// groundDiv.id = 'absolute' + this.ground.immat
					groundDiv.style.position = 'absolute'
					groundDiv.className = this.ground.datas.classname
					//--
					groundDiv.style.width = this.ground.datas.size.w + px
					groundDiv.style.height = this.ground.datas.size.h + px
					groundDiv.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.pos.x) - (this.casesize / 2)) + px
					groundDiv.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.pos.y) - (this.casesize / 2)) + px
					return groundDiv
				}
				return false
			}
		}
		return newground
	}
	click_Ground = (e) => {
		// get mouse clik x,y info
		let x = e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x + (this.casesize / 2)
		let y = e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y + (this.casesize / 2)

		this.player.datas.pos.d = this.communsTools.get_DegreeWithTwoPos(
			x,
			y,
			this.player.datas.pos.x,
			this.player.datas.pos.y
		)
		let nextpos = this.communsTools.get_PosWithDegree(this.player)
		this.player.set_Destination(nextpos)
	}
	move_ToDestination = (player) => {
		let xxx = [player.datas.destination.x, player.datas.pos.x]
		console.log(Math.max(...xxx), Math.min(...xxx))
		console.log(player.datas.destination.x, player.datas.pos.x)

		if (player.datas.destination.x === player.datas.pos.x &&
			player.datas.destination.x === player.datas.pos.y) {
			this.player.reset_Destination()
		}
		else {
			let nextpos = this.communsTools.get_PosWithDegree(this.player)
			this.player.datas.pos.x = nextpos.x
			this.player.datas.pos.y = nextpos.y
			// this.player.refresh(this.ground)
			// this.ground.refresh()
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
