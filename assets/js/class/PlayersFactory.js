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
			divfog: Object, // need to change divclick to divfog
			divstats: Object,
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
					x: new Number('512'),//window.innerWidth / 2, // left
					y: new Number('512'),//window.innerHeight / 2, // right
					z: new Number('1'), // z-index
					d: 0 // north
				},
				clickrange: new Number('1030'),
				scale: new Number('1'),
				character: {
					stats: {
						strength: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },// new Number('10'),
						agility: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },
						karma: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },
						intelect: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },
						dexterity: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },
						wisdom: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },
						fortitude: { current: this.communsTools.get_aleaEntreBornes(10, this.gamedatas.maxstat), max: this.gamedatas.maxstat },
					},
					rules: {
						hp: { current: new Number('100'), max: new Number('100') },
						mana: { current: new Number('1'), max: new Number('100') },
						xp: { current: new Number('1'), max: new Number('0') },
						lv: { current: new Number('1'), max: new Number('0') },
					},
					physics: {
						speed: { current: new Number('5'), max: new Number('10') },
						height: { current: new Number('180'), max: new Number('240') },
						weight: { current: new Number('80'), max: new Number('190') },
					},
					skills: {
						magic: { current: new Number('0'), max: new Number('1') },
						faith: { current: new Number('0'), max: new Number('1') },
						guarding: { current: new Number('0'), max: new Number('1') },
						long: { current: new Number('0'), max: new Number('1') },
						medium: { current: new Number('0'), max: new Number('1') },
						short: { current: new Number('0'), max: new Number('1') },
						self: { current: new Number('0'), max: new Number('1') },
						wtf: { current: new Number('0'), max: new Number('1') },
					},
					skins: {
						race: { current: new Number('0'), max: new Number(this.raceList.length - 1) },
						gender: { current: new Number('0'), max: new Number(this.genderList.length - 1) },
						skin: { current: new Number('0'), max: new Number(this.skinList.length - 1) },
					}
				},
				destination: {
					x: 64,
					y: 64,
					z: 1,
					d: 0,
					mapX: 0,
					mapY: 0,
					arrivedX: true,
					arrivedY: true,
					arrived: true,
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
			},
			// get_DivSheet: () => {
			// 	// console.log(this.player.datas.stats)
			// 	for (const [key, value] of Object.entries(this.player.datas.stats)) {
			// 		// console.log(`${key}: ${value}`);
			// 		let statDiv = document.createElement('div')
			// 		statDiv.id = 'a-' + key
			// 		statDiv.textContent = value
			// 		this.player.divstats['a-' + key] = statDiv
			// 	}
			// 	// console.log(this.player.divstats)

			// },
			get_DivElem: () => {
				if (this.player.datas) {
					let playerDiv = document.createElement('div')
					playerDiv.style.position = 'absolute'
					playerDiv.style.width = this.player.datas.size.w + this.px
					playerDiv.style.height = this.player.datas.size.h + this.px
					// playerDiv.style.left = parseInt(this.player.datas.pos.x - (this.player.datas.size.w / 2)) + this.px
					// playerDiv.style.top = parseInt(this.player.datas.pos.y - (this.player.datas.size.h / 2)) + this.px
					// playerDiv.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.size.w / 2)) + this.px
					// playerDiv.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.size.h / 2)) + this.px
					playerDiv.className = this.player.datas.classname
					// playerDiv.style.zIndex = parseInt(this.player.datas.pos.z)

					let playerDivvisual = document.createElement('div')
					// playerDivvisual.style.position = 'absolute'
					playerDivvisual.textContent = this.communsTools.get_aleaEntreBornes(0, 1) > 0 ? '🧙‍♂️' : '🧙‍♀️'// Man Mage
					playerDivvisual.className = 'visual'
					playerDivvisual.style.width = this.player.datas.sizevisual.w + this.px
					playerDivvisual.style.height = this.player.datas.sizevisual.h + this.px
					this.player.divvisual = playerDivvisual

					let playerDivinfo = document.createElement('div')
					playerDivinfo.style.position = 'absolute'
					playerDivinfo.textContent = 'ok playerOne'
					playerDivinfo.className = 'info'
					this.player.divinfo = playerDivinfo

					let playerDivclickrange = document.createElement('div')
					// playerDivclickrange.style.position = 'absolute'
					playerDivclickrange.className = 'clickrange'
					playerDivclickrange.style.width = (this.player.datas.clickrange) + this.px
					playerDivclickrange.style.height = (this.player.datas.clickrange) + this.px
					this.player.divclickrange = playerDivclickrange

					// let playerDivFog = document.createElement('div')
					// playerDivFog.style.position = 'absolute'
					// playerDivFog.className = 'fog'
					// playerDivFog.style.width = (window.innerWidth * 1.2) + this.px
					// playerDivFog.style.height = (window.innerHeight * 1.2) + this.px
					// this.player.divfog = playerDivFog

					// let playerDivbeyond = document.createElement('div')
					// playerDivbeyond.style.position = 'absolute'
					// playerDivbeyond.className = 'beyond'
					// // playerDivbeyond.style.left = parseInt((window.innerWidth / 2)  - (this.player.datas.size.w / 2)) + this.px
					// // playerDivbeyond.style.top = parseInt((window.innerHeight / 2)  - (this.player.datas.size.h / 2)) + this.px
					// playerDivbeyond.style.width = this.player.datas.clickrange - 20 + this.px
					// playerDivbeyond.style.height = this.player.datas.clickrange - 20 + this.px
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
					// this.player.div.style.left = parseInt((window.innerWidth / 2)) + this.px
					// this.player.div.style.top = parseInt((window.innerHeight / 2)) + this.px

					// same here 
					// this.player.divbeyond.style.left = parseInt((window.innerWidth / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.w / 2)) + this.px
					// this.player.divbeyond.style.top = parseInt((window.innerHeight / 2) - (this.player.datas.clickrange / 2) - (this.player.datas.size.h / 2)) + this.px
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
