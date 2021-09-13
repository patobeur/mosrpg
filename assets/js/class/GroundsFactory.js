"use strict";
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
		this.add_ToDom(this.ground.divGame)
		this.add_ToGame(this.ground.div)
	}
	groundManager = () => {
		let newground = {
			immat: this.currentGroundImmat,
			datas: {},
			divGame: Object,
			div: Object,
			divDest: Object,
			refresh: () => {
				if (this.ground) {
					this.ground.datas.pos.x = 0 - this.player.datas.pos.x + (this.gamedatas.gamesize.w / 2)
					this.ground.datas.pos.y = 0 - this.player.datas.pos.y + (this.gamedatas.gamesize.h / 2)
					this.ground.div.style.left = this.ground.datas.pos.x + this.px
					this.ground.div.style.top = this.ground.datas.pos.y + this.px
				}
			},
			resize_Ground: () => {
				this.ground.datas.size.w = (this.ground.datas.nbcase.x * this.ground.datas.casesize.w)// * this.gamedatas.ratio)
				this.ground.datas.size.h = (this.ground.datas.nbcase.y * this.ground.datas.casesize.h)// * this.gamedatas.ratio)
			},
			set_GroundDatas: () => {
				let grounds = this.get_ground()
				// this.ground.datas = (this.currentGroundImmat >= 0 && grounds[this.currentGroundImmat]) ? grounds[this.currentGroundImmat] : false
				if (grounds[this.currentGroundImmat]) {
					this.ground.datas = grounds[this.currentGroundImmat]
					this.ground.resize_Ground()
					this.ground.set_Div()
				}
				else {
					this.set_BugAndPause('empty ground')
				}
			},
			set_Div: () => {
				this.ground.div = this.ground.get_DivElem('div', this.ground.datas)
				this.ground.divGame.className = 'ground'
				this.ground.div.id = 'ground'

				this.ground.divGame = document.createElement('div')
				this.ground.divGame.id = 'game'
				this.ground.divGame.className = 'game'
				this.ground.divGame.style.width = this.gamedatas.gamesize.w + this.px
				this.ground.divGame.style.height = this.gamedatas.gamesize.h + this.px
			},
			get_DivElem: () => {
				if (this.ground.datas) {
					let groundDiv = document.createElement('div')
					// groundDiv.id = 'absolute' + this.ground.immat
					groundDiv.style.position = 'absolute'
					groundDiv.className = this.ground.datas.classname
					//--
					groundDiv.style.width = this.ground.datas.size.w + this.px
					groundDiv.style.height = this.ground.datas.size.h + this.px
					groundDiv.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.pos.x) - (this.gamedatas.casesize / 2)) + this.px
					groundDiv.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.pos.y) - (this.gamedatas.casesize / 2)) + this.px

					let divdest = document.createElement('div')
					divdest.style.position = 'absolute'
					divdest.className = 'destination'
					divdest.textContent = 'X'//❌
					this.ground.divDest = divdest
					return groundDiv
				}
				return false
			},
			set_Destination: (e) => {
				// set action to true
				this.player.datas.actions.movingToDestinationClick = true
				// refresh destination datas 
				this.player.datas.destination = {
					x: e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x - (this.player.datas.size.w / 2),
					y: e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y - (this.player.datas.size.h / 2),
					z: 1,
					d: this.player.datas.pos.d,
					mapX: e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x - (this.player.datas.size.w / 2),
					mapY: e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y - (this.player.datas.size.h / 2),
					arrivedX: false,
					arrivedY: false,
					arrived: false,
				}
				// get degree from both pos player and click
				this.player.datas.pos.d = this.communsTools.get_DegreeWithTwoPos(
					this.player.datas.pos.x,
					this.player.datas.pos.y,
					this.player.datas.destination.x,
					this.player.datas.destination.y
				)
			},
			reset_Destination: () => {
				this.player.datas.actions.movingToDestinationClick = false
				this.ground.divDest.remove()
			},
			add_DestinationMark: () => {
				this.add_ToMap(this.ground.divDest)
				this.ground.divDest.style.left = this.player.datas.destination.mapX + this.px
				this.ground.divDest.style.top = this.player.datas.destination.mapY + this.px
				this.ground.div.appendChild(this.ground.divDest)
			},
			move_ToPlayerDestination: (GF) => {
				// distances check
				let xxx = [this.player.datas.destination.x, this.player.datas.pos.x]
				let yyy = [this.player.datas.destination.y, this.player.datas.pos.y]
				let newdistx = Math.max(...xxx) - Math.min(...xxx) // get distance x
				let newdisty = Math.max(...yyy) - Math.min(...yyy) // get distance y

				// check only if arrivedX not reach
				!this.player.datas.destination.arrivedX
					? this.player.datas.destination.arrivedX =
					(newdistx > this.player.datas.destination.distx)// <= (this.player.datas.size.w / 2))
						? true
						: false
					: ''
				// check only if arrivedY not reach
				!this.player.datas.destination.arrivedY
					? this.player.datas.destination.arrivedY =
					(newdisty > this.player.datas.destination.disty)//<= (this.player.datas.size.h / 2))
						? true
						: false
					: ''
				// check only if arrived is false
				!this.player.datas.destination.arrived
					// if both arrivedx && arrivedy are reached then arrived = true
					? this.player.datas.destination.arrived = (this.player.datas.destination.arrivedX && this.player.datas.destination.arrivedY)
					: ''

				// destination reached check
				if (this.player.datas.destination.arrived) {
					// console.log('RESET')
					this.ground.reset_Destination()
				}
				else {
					// if not reached dest then refresh
					let nextpos = this.communsTools.get_PosWithDegree(this.player)
					this.player.datas.pos.x = nextpos.x
					this.player.datas.pos.y = nextpos.y
					// save last dist for next check
					this.player.datas.destination.distx = newdistx
					this.player.datas.destination.disty = newdisty
				}

			}
		}
		return newground
	}
	click_Ground = (e) => {
		// to do 
		// fonction and Set good dest pos with the translated coords if out ground clicked
		if (e.target.id === 'ground') {
			// if display on 
			if (this.sheettools.isSheetOpen) {
				this.sheettools.switch_Display()
			}
			console.log(e.target)
			// CLICK TO RUN
			// reset last arrived actions
			this.ground.reset_Destination(e)
			// methode A test if e.clientX and e.clientY is on board
			// this work but not realy tested
			// let x = e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x + (this.casesize / 2)
			// let y = e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y + (this.casesize / 2)
			// if (x > 0 && x < this.ground.datas.size.w && y > 0 && y < this.ground.datas.size.h) {
			// 	// set new destination 
			// 	this.player.set_Destination(e, this.ground)
			// }

			// methode B open bar click
			this.ground.set_Destination(e)
			this.ground.add_DestinationMark()
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
	}
	get_BoundingClientRectById = (id) => {
		return document.getElementById(id).getBoundingClientRect()
	}
}
