"use strict";
// -----------------------------
class MobsFactory extends CommunsTools {
	constructor() {
		super()
		this.mob = Object
		this.get_Basics()
	}
	get_Basics() {
		this.mobManager()
	}
	mobManager() {
		let mob = {
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
				classname: 'mob',
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
				clickrange: new Number('1030'),
				scale: new Number('1'),
				character: {
					stats: {
						strength: { current: 10, max: 100 },
						agility: { current: 10, max: 100 },
						karma: { current: 10, max: 100 },
						intelect: { current: 10, max: 100 },
						dexterity: { current: 10, max: 100 },
						wisdom: { current: 10, max: 100 },
						fortitude: { current: 10, max: 100 },
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
			get_DivElem: () => {
				if (this.mob.datas) {
					let mobDiv = document.createElement('div')
					mobDiv.style.position = 'absolute'
					mobDiv.style.width = this.mob.datas.size.w + this.px
					mobDiv.style.height = this.mob.datas.size.h + this.px
					// mobDiv.style.left = parseInt(this.mob.datas.pos.x - (this.mob.datas.size.w / 2)) + this.px
					// mobDiv.style.top = parseInt(this.mob.datas.pos.y - (this.mob.datas.size.h / 2)) + this.px
					// mobDiv.style.left = parseInt((window.innerWidth / 2) - (this.mob.datas.size.w / 2)) + this.px
					// mobDiv.style.top = parseInt((window.innerHeight / 2) - (this.mob.datas.size.h / 2)) + this.px
					mobDiv.className = this.mob.datas.classname
					// mobDiv.style.zIndex = parseInt(this.mob.datas.pos.z)

					let mobDivvisual = document.createElement('div')
					// mobDivvisual.style.position = 'absolute'
					mobDivvisual.textContent = this.communsTools.get_aleaEntreBornes(0, 1) > 0 ? '🧙‍♂️' : '🧙‍♀️'// Man Mage
					mobDivvisual.className = 'visual'
					mobDivvisual.style.width = this.mob.datas.sizevisual.w + this.px
					mobDivvisual.style.height = this.mob.datas.sizevisual.h + this.px
					this.mob.divvisual = mobDivvisual

					let mobDivinfo = document.createElement('div')
					mobDivinfo.style.position = 'absolute'
					mobDivinfo.textContent = 'ok mobOne'
					mobDivinfo.className = 'info'
					this.mob.divinfo = mobDivinfo

					let mobDivclickrange = document.createElement('div')
					// mobDivclickrange.style.position = 'absolute'
					mobDivclickrange.className = 'clickrange'
					mobDivclickrange.style.width = (this.mob.datas.clickrange) + this.px
					mobDivclickrange.style.height = (this.mob.datas.clickrange) + this.px
					this.mob.divclickrange = mobDivclickrange


					mobDiv.appendChild(this.mob.divclickrange)
					mobDiv.appendChild(this.mob.divvisual)
					mobDiv.appendChild(this.mob.divinfo)
					// mobDiv.appendChild(this.mob.divfog)
					this.mob.div = mobDiv
					// this.add_ToGame(this.mob.div)
					// this.mob.refresh()
				}
			},
			refresh: (ground) => {
				if (ground) {
					this.mob.checkPos(ground)
					this.mob.divinfo.textContent = 'x:' + parseInt(this.mob.datas.pos.x) + ' , y:' + parseInt(this.mob.datas.pos.y) + ' , d:' + parseInt(this.mob.datas.pos.d) + '°'
					this.mob.divclickrange.style.transform = 'rotate(' + (this.mob.datas.pos.d + 90) + 'deg)'

					// Parse or NOT to parse !!!

					// let's put the toon in the full center of the screen (window)
					// this.mob.div.style.left = parseInt((window.innerWidth / 2)) + this.px
					// this.mob.div.style.top = parseInt((window.innerHeight / 2)) + this.px

					// same here 
					// this.mob.divbeyond.style.left = parseInt((window.innerWidth / 2) - (this.mob.datas.clickrange / 2) - (this.mob.datas.size.w / 2)) + this.px
					// this.mob.divbeyond.style.top = parseInt((window.innerHeight / 2) - (this.mob.datas.clickrange / 2) - (this.mob.datas.size.h / 2)) + this.px
				}
			},
			checkPos: (ground) => {
				if (this.mob.datas.pos.x + (this.mob.datas.size.w / 2) < 1) {
					this.mob.datas.pos.x = ground.datas.size.w - (this.mob.datas.size.w / 2)
				}
				if (this.mob.datas.pos.x + (this.mob.datas.size.w / 2) > ground.datas.size.w) {
					this.mob.datas.pos.x = 1 - (this.mob.datas.size.w / 2)
				}
				if (this.mob.datas.pos.y + (this.mob.datas.size.h / 2) < 1) {
					this.mob.datas.pos.y = ground.datas.size.h - (this.mob.datas.size.h / 2)
				}
				if (this.mob.datas.pos.y + (this.mob.datas.size.h / 2) > ground.datas.size.h) {
					this.mob.datas.pos.y = 1 - (this.mob.datas.size.h / 2)
				}
			},
		}
		this.mob = mob
		this.mob.get_DivElem()
	}
}
