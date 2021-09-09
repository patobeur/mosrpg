"use strict";
// -----------------------------
class PlayersFactory extends CommunsTools {
	constructor() {
		super()
		this.player = Object
		this.get_Basics()
	}
	get_Basics() {
		this.playerManager()
	}
	playerManager() {
		let player = {
			div: Object,
			divinfo: Object,
			divclickrange: Object,
			divvisual: Object,
			divbeyond: Object,
			immat: 1,
			datas: {
				classname: 'player',
				size: {
					w: new Number('32'),
					h: new Number('32'),
					l: new Number('32'),
				},
				pos: {
					x: new Number('64'),//window.innerWidth / 2, // left
					y: new Number('64'),//window.innerHeight / 2, // right
					z: new Number('1'), // z-index
					d: 0 // north
				},
				clickrange: 150,
				height: new Number('180'),
				strength: new Number('10'),
				agility: new Number('10'),
				karma: new Number('10'),
				intelect: new Number('10'),
				dexterity: new Number('10'),
				wisdom: new Number('10'),
				fortitude: new Number('10'),
				hp: new Number('100'),
				xp: new Number('0'),
				lv: new Number('1'),
				speed: new Number('2'),
				destination: {
					x: 64,
					y: 64,
					z: 1,
					d: 0,
					arrivedX: true,
					arrivedY: true,
					arrived: true
				},
				actions: {
					movingToDestinationClick: false,
					firingAFireBall: false,
					castingADefenseSpell: false
				},
				status: {
					poisoned: { active: false, currentdelay: new Number('0'), maxdelay: new Number('100') },
					cursed: { active: false, currentdelay: new Number('0'), maxdelay: new Number('100') },
					petrifyed: { active: false, currentdelay: new Number('0'), maxdelay: new Number('100') },
					undead: { active: false, currentdelay: new Number('0'), maxdelay: new Number('100') },
				},
				skills: {
					magic: false
				},
			},
			add_ToDom: () => {
				document.body.appendChild(this.player.div)
			},
			get_DivElem: () => {
				if (this.player.datas) {
					let playerDiv = document.createElement('div')
					playerDiv.style.position = 'absolute'
					playerDiv.style.width = this.player.datas.size.w + px
					playerDiv.style.height = this.player.datas.size.h + px
					// playerDiv.style.left = parseInt(this.player.datas.pos.x - (this.player.datas.size.w / 2)) + px
					// playerDiv.style.top = parseInt(this.player.datas.pos.y - (this.player.datas.size.h / 2)) + px
					playerDiv.style.left = parseInt((window.innerWidth / 2) - (this.casesize / 2) - (this.player.datas.size.w / 2)) + px
					playerDiv.style.top = parseInt((window.innerHeight / 2) - (this.casesize / 2) - (this.player.datas.size.h / 2)) + px
					playerDiv.className = this.player.datas.classname
					playerDiv.style.zIndex = parseInt(this.player.datas.pos.z)



					let playerDivvisual = document.createElement('div')
					playerDivvisual.style.position = 'absolute'
					playerDivvisual.textContent = this.communsTools.get_aleaEntreBornes(0, 1) > 0 ? '🧙‍♂️' : '🧙‍♀️'// Man Mage
					playerDivvisual.className = 'visual'
					playerDivvisual.style.width = this.player.datas.size.w + px
					playerDivvisual.style.height = this.player.datas.size.h + px
					this.player.divvisual = playerDivvisual


					let playerDivinfo = document.createElement('div')
					playerDivinfo.style.position = 'absolute'
					playerDivinfo.textContent = 'ok playerOne'
					playerDivinfo.className = 'info'
					this.player.divinfo = playerDivinfo

					let playerDivclickrange = document.createElement('div')
					playerDivclickrange.style.position = 'absolute'
					playerDivclickrange.className = 'clickrange'
					playerDivclickrange.style.width = this.player.datas.clickrange + px
					playerDivclickrange.style.height = this.player.datas.clickrange + px
					this.player.divclickrange = playerDivclickrange

					let playerDivbeyond = document.createElement('div')
					playerDivbeyond.style.position = 'absolute'
					playerDivbeyond.className = 'beyond'
					playerDivbeyond.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.w / 2)) + px
					playerDivbeyond.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.h / 2)) + px
					playerDivbeyond.style.width = this.player.datas.clickrange + px
					playerDivbeyond.style.height = this.player.datas.clickrange + px
					playerDivbeyond.style.transform = 'rotate(0deg)'
					this.player.divbeyond = playerDivbeyond

					document.body.appendChild(this.player.divbeyond)

					// playerDiv.appendChild(this.player.divbeyond)
					playerDiv.appendChild(this.player.divclickrange)
					playerDiv.appendChild(this.player.divinfo)
					playerDiv.appendChild(this.player.divvisual)
					this.player.div = playerDiv
					this.player.add_ToDom()
					this.player.refresh()
				}
			},
			refresh: (ground) => {
				// this.player.div.style.left = ground.datas.pos.x + this.player.datas.pos.x + px
				// this.player.div.style.top = ground.datas.pos.y + this.player.datas.pos.y + px
				if (ground) {
					this.player.checkPos(ground)
					this.player.divinfo.textContent = 'x:' + this.player.datas.pos.x + ' ,y:' + this.player.datas.pos.y
					this.player.divclickrange.style.transform = 'rotate(' + (this.player.datas.pos.d + 90) + 'deg)'

					this.player.div.style.left = parseInt((window.innerWidth / 2) - (this.casesize / 2) - (this.player.datas.size.w / 2)) + px
					this.player.div.style.top = parseInt((window.innerHeight / 2) - (this.casesize / 2) - (this.player.datas.size.h / 2)) + px


					this.player.divbeyond.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.w / 2)) + px
					this.player.divbeyond.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.h / 2)) + px
				}
			},
			checkPos: (ground) => {
				if (this.player.datas.pos.x + (this.player.datas.size.w / 2) < 1) {
					this.player.datas.pos.x = ground.datas.size.w - (this.player.datas.size.w / 2)
				}
				if (this.player.datas.pos.x + (this.player.datas.size.w / 2) > ground.datas.size.w) {
					this.player.datas.pos.x = 1 - (this.player.datas.size.w / 2)
				}
				if (this.player.datas.pos.y + (this.player.datas.size.h / 2) < 1) {
					this.player.datas.pos.y = ground.datas.size.h - (this.player.datas.size.h / 2)
				}
				if (this.player.datas.pos.y + (this.player.datas.size.h / 2) > ground.datas.size.h) {
					this.player.datas.pos.y = 1 - (this.player.datas.size.h / 2)
				}
			},
			set_Destination: (e) => {
				this.player.datas.actions.movingToDestinationClick = true
				this.player.datas.destination = {
					x: e.clientX - (window.innerWidth / 2) + this.player.datas.pos.x + (this.casesize / 2),
					y: e.clientY - (window.innerHeight / 2) + this.player.datas.pos.y + (this.casesize / 2),
					z: 1,
					d: this.player.datas.pos.d,
					arrivedX: false,
					arrivedY: false,
					arrived: false
				}
				this.player.datas.pos.d = this.communsTools.get_DegreeWithTwoPos(
					this.player.datas.destination.x,
					this.player.datas.destination.y,
					this.player.datas.pos.x,
					this.player.datas.pos.y
				)
			},
			reset_Destination: (player) => {
				this.player.datas.actions.movingToDestinationClick = false
			},
		}
		this.player = player
		this.player.get_DivElem()
	}
}
