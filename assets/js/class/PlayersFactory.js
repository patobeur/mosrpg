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
			divclick: Object,
			divfog: Object,
			immat: 1,
			datas: {
				classname: 'player',
				size: {
					w: new Number('4'),
					h: new Number('4'),
					l: new Number('4'),
				},
				sizevisual: {
					w: new Number('32'),
					h: new Number('32'),
					l: new Number('32'),
				},
				pos: {
					x: new Number('1'),//window.innerWidth / 2, // left
					y: new Number('1'),//window.innerHeight / 2, // right
					z: new Number('1'), // z-index
					d: 0 // north
				},
				clickrange: 1030,
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
			get_DivElem: () => {
				if (this.player.datas) {
					let playerDiv = document.createElement('div')
					playerDiv.style.position = 'absolute'
					playerDiv.style.width = this.player.datas.size.w + px
					playerDiv.style.height = this.player.datas.size.h + px
					// playerDiv.style.left = parseInt(this.player.datas.pos.x - (this.player.datas.size.w / 2)) + px
					// playerDiv.style.top = parseInt(this.player.datas.pos.y - (this.player.datas.size.h / 2)) + px
					// playerDiv.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.size.w / 2)) + px
					// playerDiv.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.size.h / 2)) + px
					playerDiv.className = this.player.datas.classname
					playerDiv.style.zIndex = parseInt(this.player.datas.pos.z)

					let playerDivvisual = document.createElement('div')
					// playerDivvisual.style.position = 'absolute'
					playerDivvisual.textContent = this.communsTools.get_aleaEntreBornes(0, 1) > 0 ? '🧙‍♂️' : '🧙‍♀️'// Man Mage
					playerDivvisual.className = 'visual'
					playerDivvisual.style.width = this.player.datas.sizevisual.w + px
					playerDivvisual.style.height = this.player.datas.sizevisual.h + px
					this.player.divvisual = playerDivvisual

					let playerDivinfo = document.createElement('div')
					playerDivinfo.style.position = 'absolute'
					playerDivinfo.textContent = 'ok playerOne'
					playerDivinfo.className = 'info'
					this.player.divinfo = playerDivinfo

					let playerDivclickrange = document.createElement('div')
					// playerDivclickrange.style.position = 'absolute'
					playerDivclickrange.className = 'clickrange'
					playerDivclickrange.style.width = (this.player.datas.clickrange) + px
					playerDivclickrange.style.height = (this.player.datas.clickrange) + px
					this.player.divclickrange = playerDivclickrange

					// let playerDivFog = document.createElement('div')
					// playerDivFog.style.position = 'absolute'
					// playerDivFog.className = 'fog'
					// playerDivFog.style.width = (window.innerWidth * 1.2) + px
					// playerDivFog.style.height = (window.innerHeight * 1.2) + px
					// this.player.divfog = playerDivFog

					// let playerDivbeyond = document.createElement('div')
					// playerDivbeyond.style.position = 'absolute'
					// playerDivbeyond.className = 'beyond'
					// // playerDivbeyond.style.left = parseInt((window.innerWidth / 2)  - (this.player.datas.size.w / 2)) + px
					// // playerDivbeyond.style.top = parseInt((window.innerHeight / 2)  - (this.player.datas.size.h / 2)) + px
					// playerDivbeyond.style.width = this.player.datas.clickrange - 20 + px
					// playerDivbeyond.style.height = this.player.datas.clickrange - 20 + px
					// playerDivbeyond.style.transform = 'rotate(0deg)'
					// this.player.divbeyond = playerDivbeyond

					// // document.body.appendChild(this.player.divbeyond)
					// document.getElementById('game').appendChild(this.player.divbeyond)

					playerDiv.appendChild(this.player.divclickrange)
					playerDiv.appendChild(this.player.divvisual)
					playerDiv.appendChild(this.player.divinfo)
					// playerDiv.appendChild(this.player.divfog)
					this.player.div = playerDiv
					// this.add_ToGame(this.player.div)
					// this.player.refresh()
				}
			},
			refresh: (ground) => {
				if (ground) {
					this.player.checkPos(ground)
					this.player.divinfo.textContent = 'x:' + parseInt(this.player.datas.pos.x) + ' , y:' + parseInt(this.player.datas.pos.y) + ' , d:' + parseInt(this.player.datas.pos.d) + '°'
					this.player.divclickrange.style.transform = 'rotate(' + (this.player.datas.pos.d + 90) + 'deg)'

					// Parse or NOT to parse !!!

					// let's put the toon in the full center of the screen (window)
					// this.player.div.style.left = parseInt((window.innerWidth / 2)) + px
					// this.player.div.style.top = parseInt((window.innerHeight / 2)) + px

					// same here 
					// this.player.divbeyond.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.w / 2)) + px
					// this.player.divbeyond.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.h / 2)) + px
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
		}
		this.player = player
		this.player.get_DivElem()
	}
}
