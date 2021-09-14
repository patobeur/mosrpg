"use strict";
// -----------------------------
class MobsFactory extends CommunsTools {
	constructor() {
		super()
		this.immat = new Number('0')
	}
	refresh_mobs = (ground) => {
		this.mobs.forEach(mob => {
			// get dir
			// Patrol 
			if (mob.datas.dirdelay.cur < 1) {
				mob.datas.pos.d += this.communsTools.get_aleaEntreBornes(-50, 50)
			}
			// get next pos
			let nexpos = this.communsTools.get_PosWithDegree(mob)
			mob.datas.pos.x = nexpos.x
			mob.datas.pos.y = nexpos.y
			this.checkPos(mob, ground)
			// refresh div
			// mob.div.style.transform = 'rotate(' + mob.datas.pos.d + 'deg)'
			mob.div.style.left = (nexpos.x - (mob.datas.size.w / 2)) + this.px
			mob.div.style.top = (nexpos.y - (mob.datas.size.h / 2)) + this.px
			mob.datas.dirdelay.cur++
			if (mob.datas.dirdelay.cur > mob.datas.dirdelay.max) {
				mob.datas.dirdelay.cur = 0
			}
		});
	}
	add_NewMobPackToStack = (ground) => {
		for (let i = 0; i < 31; i++) {
			this.add_NewMobToStack(ground)
		}
	}
	add_NewMobToStack = (ground) => {
		let mob = {
			div: Object,
			immat: this.immat,
			datas: {
				classname: 'mob',
				dirdelay: { cur: 0, max: 20 },
				movdelay: { cur: 0, max: 30 },
				alignement: ['neutral', 'chaotique'],
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
					x: new Number(this.communsTools.get_aleaEntreBornes(1, ground.datas.size.w - 1)),
					y: new Number(this.communsTools.get_aleaEntreBornes(1, ground.datas.size.h - 1)),
					z: new Number('2'), // z-index
					d: 0 // north
				},
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
						speed: { current: new Number('1'), max: new Number('10') },
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
					x: new Number('440'),
					y: new Number('440'),
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
			}
		}
		this.immat++
		// this.mob = mob
		mob.div = this.get_DivElem(mob)
		this.mobs.push(mob)
		// this.mob.refresh()
		this.add_ToMap(mob.div)

	}
	get_DivElem = (mob) => {
		if (mob) {
			let mobDiv = document.createElement('div')
			mobDiv.id = 'mob' + mob.immat
			mobDiv.style.position = 'absolute'
			mobDiv.style.width = mob.datas.size.w + this.px
			mobDiv.style.height = mob.datas.size.h + this.px
			mobDiv.style.top = mob.datas.pos.x + this.px
			mobDiv.style.left = mob.datas.pos.y + this.px
			mobDiv.className = mob.datas.classname
			mobDiv.textContent = this.get_EmojiMobArray()[this.communsTools.get_aleaEntreBornes(0, this.get_EmojiMobArray().length)]
			//  this.communsTools.get_aleaEntreBornes(0, 1) > 0 ? '🐇' : '🐖'

			// Man Mage
			return mobDiv
		}
	}
}
