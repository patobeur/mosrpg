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
					this.ground.datas.pos.x = 0 - this.player.datas.pos.x + (this.communs.gamesize.w / 2)
					this.ground.datas.pos.y = 0 - this.player.datas.pos.y + (this.communs.gamesize.h / 2)
					this.ground.div.style.left = this.ground.datas.pos.x + px
					this.ground.div.style.top = this.ground.datas.pos.y + px
				}
			},
			resize_Ground: () => {
				this.ground.datas.size.w = (this.ground.datas.nbcase.x * this.ground.datas.casesize.w)// * this.communs.ratio)
				this.ground.datas.size.h = (this.ground.datas.nbcase.y * this.ground.datas.casesize.h)// * this.communs.ratio)
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
						casesize: { w: 32, h: 32, l: 32 },
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
						casesize: { w: 32, h: 32, l: 32 },
						nbcase: { x: 128, h: 128, l: 1 }
					},
					2: {
						name: 'GroundTwo', pos: {
							x: 0,//parseInt((window.innerWidth / 2) - (this.player.datas.pos.x)),
							y: 0,//parseInt((window.innerHeight / 2) - (this.player.datas.pos.y)),
							z: 1
						},
						size: { w: 128, h: 128, l: 1 },
						classname: 'ground ground-2',
						casesize: { w: 32, h: 32, l: 32 },
						nbcase: { x: 15, y: 10, z: 1 }
					},
				}
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
				this.ground.divGame.style.width = this.communs.gamesize.w + px
				this.ground.divGame.style.height = this.communs.gamesize.h + px
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
					groundDiv.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.pos.x) - (this.communs.casesize / 2)) + px
					groundDiv.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.pos.y) - (this.communs.casesize / 2)) + px

					let divdest = document.createElement('div')
					divdest.style.position = 'absolute'
					divdest.className = 'destination'
					divdest.textContent = '❌'
					this.ground.divDest = divdest




					return groundDiv
				}
				return false
			},
			set_Destination: (e) => {
				this.player.datas.actions.movingToDestinationClick = true
				this.player.datas.destination = {
					x: e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x - (this.player.datas.size.w / 2),
					y: e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y - (this.player.datas.size.h / 2),
					mapX: e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x - (this.player.datas.size.w / 2),
					mapY: e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y - (this.player.datas.size.h / 2),
					z: 1,
					d: this.player.datas.pos.d,
					arrivedX: false,
					arrivedY: false,
					arrived: false
				}
				console.log('Cliked->Pos:', this.player.datas.destination.x, this.player.datas.destination.y)
				console.log('Cliked->map:', this.player.datas.destination.mapX, this.player.datas.destination.mapY)
				this.player.datas.pos.d = this.communsTools.get_DegreeWithTwoPos(
					this.player.datas.pos.x,
					this.player.datas.pos.y,
					this.player.datas.destination.x,
					this.player.datas.destination.y
				)

				// this.ground.add_DestMark()
			},
			reset_Destination: () => {
				this.player.datas.actions.movingToDestinationClick = false
				this.ground.divDest.remove()
			},

			add_DestMark: () => {
				// v1 
				// this.ground.divDest.style.left = parseInt(this.player.datas.destination.mapX + this.ground.datas.pos.x - (this.casesize / 2)) + px
				// this.ground.divDest.style.top = parseInt(this.player.datas.destination.mapY + this.ground.datas.pos.y - (this.casesize / 2)) + px
				// this.player.divDest.style.zIndex = this.player.datas.destination.z
				this.add_ToMap(this.ground.divDest)
				// v2 
				this.ground.divDest.style.left = this.player.datas.destination.mapX + px
				this.ground.divDest.style.top = this.player.datas.destination.mapY + px
				this.ground.div.appendChild(this.ground.divDest)
			},
			// refresh_DestMark: () => {
			// 	this.ground.divDest.style.left = (this.player.datas.destination.mapX + this.ground.datas.pos.x - (this.casesize / 2)) + px
			// 	this.ground.divDest.style.top = (this.player.datas.destination.mapY + this.ground.datas.pos.y - (this.casesize / 2)) + px
			// },
			move_ToPlayerDestination: (GF) => {
				let xxx = [this.player.datas.destination.x, this.player.datas.pos.x]
				let yyy = [this.player.datas.destination.y, this.player.datas.pos.y]

				// check only if arrivedX not reach
				!this.player.datas.destination.arrivedX
					? this.player.datas.destination.arrivedX =
					(Math.max(...xxx) - Math.min(...xxx) <= (this.player.datas.size.w / 2))
						? true
						: false
					: ''
				// check only if arrivedY not reach
				!this.player.datas.destination.arrivedY
					? this.player.datas.destination.arrivedY =
					(Math.max(...yyy) - Math.min(...yyy) <= (this.player.datas.size.h / 2))
						? true
						: false
					: ''
				// if both x && y are reached then arrived = true
				!this.player.datas.destination.arrived
					? this.player.datas.destination.arrived = (this.player.datas.destination.arrivedX && this.player.datas.destination.arrivedY)
					: ''

				// console.log('playerPIXELSmove:' + this.player.datas.speed)
				// console.log('dist x:' + (Math.max(...xxx) - Math.min(...xxx)), this.player.datas.destination.arrivedX)
				// console.log('dist y:' + (Math.max(...yyy) - Math.min(...yyy)), this.player.datas.destination.arrivedY)
				console.log('CurDestPos:', this.player.datas.destination)
				console.log('CurPlayPos:', this.player.datas.pos)
				console.log('CurGrndPos:', this.ground.datas.pos)
				// console.log('DestMark:', this.ground.datas.pos)


				if (this.player.datas.destination.arrived) {
					// console.log('RESET')
					this.ground.reset_Destination()
				}
				else {
					let nextpos = this.communsTools.get_PosWithDegree(this.player)
					this.player.datas.pos.x = nextpos.x
					this.player.datas.pos.y = nextpos.y
				}

			}
		}
		return newground
	}
	click_Ground = (e) => {
		console.log(e.target.id)
		// 	// to do 
		// 	// fonction and Set good dest pos with the translated coords if out ground clicked
		if (e.target.id === 'ground') {
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
			this.ground.set_Destination(e, this.ground)
			this.ground.add_DestMark()

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
