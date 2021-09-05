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
					d: 0 // nort
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
				speed: new Number('5'),
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
			div_Maker: () => {
				if (this.player.datas) {
					let newdiv = document.createElement('div')
					newdiv.style.position = 'absolute'
					newdiv.style.width = this.player.datas.size.w + px
					newdiv.style.height = this.player.datas.size.h + px
					// newdiv.style.left = parseInt(this.player.datas.pos.x - (this.player.datas.size.w / 2)) + px
					// newdiv.style.top = parseInt(this.player.datas.pos.y - (this.player.datas.size.h / 2)) + px
					newdiv.style.left = parseInt((window.innerWidth / 2) - 16) + px
					newdiv.style.top = parseInt((window.innerHeight / 2) - 16) + px
					newdiv.className = this.player.datas.classname
					newdiv.style.zIndex = parseInt(this.player.datas.pos.z)



					let newdivvisual = document.createElement('div')
					newdivvisual.style.position = 'absolute'
					newdivvisual.textContent = this.aleaEntreBornes(0, 1) > 0 ? '🧙‍♂️' : '🧙‍♀️'// Man Mage
					newdivvisual.className = 'visual'
					newdivvisual.style.width = this.player.datas.size.w + px
					newdivvisual.style.height = this.player.datas.size.h + px
					this.player.divvisual = newdivvisual


					let newdivinfo = document.createElement('div')
					newdivinfo.style.position = 'absolute'
					newdivinfo.textContent = 'ok playerOne'
					newdivinfo.className = 'info'
					this.player.divinfo = newdivinfo



					let newdivclickrange = document.createElement('div')
					newdivclickrange.style.position = 'absolute'
					newdivclickrange.className = 'clickrange'
					newdivclickrange.style.width = this.player.datas.clickrange + px
					newdivclickrange.style.height = this.player.datas.clickrange + px
					this.player.divclickrange = newdivclickrange

					let newdivbeyond = document.createElement('div')
					newdivbeyond.style.position = 'absolute'
					newdivbeyond.className = 'beyond'
					newdivbeyond.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.clickrange / 2)) + px
					newdivbeyond.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.clickrange / 2)) + px
					newdivbeyond.style.width = this.player.datas.clickrange + px
					newdivbeyond.style.height = this.player.datas.clickrange + px
					this.player.divbeyond = newdivbeyond

					document.body.appendChild(this.player.divbeyond)

					// newdiv.appendChild(this.player.divbeyond)
					newdiv.appendChild(this.player.divclickrange)
					newdiv.appendChild(this.player.divinfo)
					newdiv.appendChild(this.player.divvisual)
					this.player.div = newdiv
					this.player.add_ToDom()
				}
			},
			refresh: (ground) => {
				// this.player.div.style.left = ground.datas.pos.x + this.player.datas.pos.x + px
				// this.player.div.style.top = ground.datas.pos.y + this.player.datas.pos.y + px

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
			}
		}
		this.player = player
		this.player.div_Maker()
	}
}
