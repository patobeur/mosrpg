"use strict";
class GameDatas {
	constructor() {
		// communs to all class
		this.drag = false
		this.isBug = false
		this.isPause = false
		this.isWait = false
		this.isSheetOpen = false
		this.fromGameDatas = 'it work !!!'
		// groundsfactory
		this.px = 'px';
		this.pc = '%';
		this.rem = 'rem';
		// -- RENDER
		this.rendertics = 0
		this.renderInterval = 30 // render speed 1ms * 50
		this.gameRender = false
		// define emojis list
		// this.emojiStatArray = this.set_EmojiStatArray()
		// this.emojisRaceArray = this.set_EmojiRaceArray()
		this.raceList = ['none', 'elf', 'human']
		this.genderList = ['none', 'man', 'woman']
		this.skinList = ['none', 'LightSkinTone', 'MediumLightSkinTone', 'MediumSkinTone', 'MediumDarkSkinTone', 'DarkSkinTone']

		// --
		this.gamedatas = {
			ratio: 1,
			gamesize: { w: '1024', h: '1024' },
			parentnode: Object,// game div parentNode
			maxstat: 16, // temporary ??
		}
	}

	// EMOJIS
	get_emojiStat = (cat, name) => {
		return this.get_EmojiStatArray()[cat][name]
	}
	get_EmojiRace = (race, gender, skin) => {
		return this.get_EmojiRaceArray()
		[this.raceList[race]]
		[this.genderList[gender]]
		[this.skinList[skin]].emoji
	}
	// emojis list datas
	get_EmojiStatArray = () => {
		return {
			rules: {
				hp: '❤️',
				mana: '🌡️',
				xp: '🎲',
				lv: '💊',
			},
			physics: {
				speed: '💨',
				height: '📏',
				weight: '⚖️',
			},
			stats: {
				strength: '💪',
				agility: '🏐',
				karma: '⚗️',//🪄
				intelect: '✔️',
				dexterity: '🤏',//🖐️
				wisdom: '🦄',//🎓🏳️
				fortitude: '🍔',//🏈
			},
			skills: {
				magic: '📜',//📚
				faith: '🙏🏻',//
				guarding: '🛡️',
				long: '🏹',
				medium: '⚔️',
				short: '🗡️',
				self: '🥋',//🤚
				wtf: '🐖',//🐇
			},
			spells: {
				fireball: '🔥',
				water: '🌊',
				cloud: '⛈️',
				Sparkle: '✨',
			}
		}
	}
	get_EmojiRaceArray = () => {
		return {
			none: {
				none: {
					none: { emoji: '👶' },
					LightSkinTone: { emoji: '👶🏻' },
					MediumLightSkinTone: { emoji: '👶🏼' },
					MediumSkinTone: { emoji: '👶🏽' },
					MediumDarkSkinTone: { emoji: '👶🏾' },
					DarkSkinTone: { emoji: '👶🏿' },
				},
				man: {
					none: { emoji: '👶' },
					LightSkinTone: { emoji: '👶🏻' },
					MediumLightSkinTone: { emoji: '👶🏼' },
					MediumSkinTone: { emoji: '👶🏽' },
					MediumDarkSkinTone: { emoji: '👶🏾' },
					DarkSkinTone: { emoji: '👶🏿' },
				},
				woman: {
					none: { emoji: '👶' },
					LightSkinTone: { emoji: '👶🏻' },
					MediumLightSkinTone: { emoji: '👶🏼' },
					MediumSkinTone: { emoji: '👶🏽' },
					MediumDarkSkinTone: { emoji: '👶🏾' },
					DarkSkinTone: { emoji: '👶🏿' },
				}
			},
			elf: {
				none: {
					none: { emoji: '🧝' },
					LightSkinTone: { emoji: '🧝🏻' },
					MediumLightSkinTone: { emoji: '🧝🏼' },
					MediumSkinTone: { emoji: '🧝🏽' },
					MediumDarkSkinTone: { emoji: '🧝🏾' },
					DarkSkinTone: { emoji: '🧝🏿' },
				},
				man: {
					none: { emoji: '🧝‍' },
					LightSkinTone: { emoji: '🧝🏻‍' },
					MediumLightSkinTone: { emoji: '🧝🏼‍' },
					MediumSkinTone: { emoji: '🧝🏽‍' },
					MediumDarkSkinTone: { emoji: '🧝🏾‍' },
					DarkSkinTone: { emoji: '🧝🏿‍' },
				},
				woman: {
					none: { emoji: '🧝‍♀️‍' },
					LightSkinTone: { emoji: '🧝🏻‍♀️‍' },
					MediumLightSkinTone: { emoji: '🧝🏼‍♀️‍' },
					MediumSkinTone: { emoji: '🧝🏽‍♀️‍' },
					MediumDarkSkinTone: { emoji: '🧝🏾‍♀️‍' },
					DarkSkinTone: { emoji: '🧝🏿‍♀️‍' },
				}
			},
			human: {
				none: {
					none: { emoji: '🧑' },
					LightSkinTone: { emoji: '🧑🏻' },
					MediumLightSkinTone: { emoji: '🧑🏼' },
					MediumSkinTone: { emoji: '🧑🏽' },
					MediumDarkSkinTone: { emoji: '🧑🏾' },
					DarkSkinTone: { emoji: '🧑🏿' },
				},
				man: {
					none: { emoji: '👨' },
					LightSkinTone: { emoji: '👨🏻' },
					MediumLightSkinTone: { emoji: '👨🏼' },
					MediumSkinTone: { emoji: '👨🏽' },
					MediumDarkSkinTone: { emoji: '👨🏾' },
					DarkSkinTone: { emoji: '👨🏿' },
				},
				woman: {
					none: { emoji: '👩' },
					LightSkinTone: { emoji: '👩🏻' },
					MediumLightSkinTone: { emoji: '👩🏼' },
					MediumSkinTone: { emoji: '👩🏽' },
					MediumDarkSkinTone: { emoji: '👩🏾' },
					DarkSkinTone: { emoji: '👩🏿' },

				}
			}
		}
	}
	// GROUNDS
	get_ground = () => {
		return {
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
				nbcase: { x: 128, y: 128, z: 1 }
			},
		}
	}
}

			// emojis
			// 🪨
			// get_emoji = () => {
			// 	let emojis = {
			// 		0: { ico: '⚔️', name: '' },
			// 		1: { ico: '🗡️', name: 'Dagger' },
			// 		2: { ico: '🔪', name: 'Kitchen Knife' },
			// 		3: { ico: '🥷', name: 'Ninja' },
			// 		4: { ico: '🤴', name: 'Prince' },
			// 		5: { ico: '👸', name: 'Princess' },
			// 		6: { ico: '🛡️', name: 'Shield' },
			// 		7: { ico: '🏹', name: 'Bow and Arrow' },
			// 		8: { ico: '⚚', name: 'Staff of Hermes' },
			// 		9: { ico: '🧙‍♂️', name: 'Man Mage' },
			// 		10: { ico: '🧙‍♀️', name: 'Woman Mage' },
			// 		11: { ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
			// 		12: { ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
			// 		13: { ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
			// 		14: { ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
			// 		15: { ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
			// 		16: { ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
			// 		17: { ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
			// 		18: { ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
			// 	}
			// 	let emojis2 = [
			// 		{ ico: '⚔️', name: '' },
			// 		{ ico: '🗡️', name: 'Dagger' },
			// 		{ ico: '🔪', name: 'Kitchen Knife' },
			// 		{ ico: '🥷', name: 'Ninja' },
			// 		{ ico: '🤴', name: 'Prince' },
			// 		{ ico: '👸', name: 'Princess' },
			// 		{ ico: '🛡️', name: 'Shield' },
			// 		{ ico: '🏹', name: 'Bow and Arrow' },
			// 		{ ico: '⚚', name: 'Staff of Hermes' },
			// 		{ ico: '🧙‍♂️', name: 'Man Mage' },
			// 		{ ico: '🧙‍♀️', name: 'Woman Mage' },
			// 		{ ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
			// 		{ ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
			// 		{ ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
			// 		{ ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
			// 		{ ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
			// 		{ ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
			// 		{ ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
			// 		{ ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
			// 	]
			// }
	// 		// 🧓 Older Person
	// 		// 🧓🏻 Older Person: Light Skin Tone
	// 		// 🧓🏼 Older Person: Medium-Light Skin Tone
	// 		// 🧓🏽 Older Person: Medium Skin Tone
	// 		// 🧓🏾 Older Person: Medium-Dark Skin Tone
	// 		// 🧓🏿 Older Person: Dark Skin Tone
	// 		// 👴 Old Man
	// 		// 👴🏻 Old Man: Light Skin Tone
	// 		// 👴🏼 Old Man: Medium-Light Skin Tone
	// 		// 👴🏽 Old Man: Medium Skin Tone
	// 		// 👴🏾 Old Man: Medium-Dark Skin Tone
	// 		// 👴🏿 Old Man: Dark Skin Tone
	// 		// 👵 Old Woman
	// 		// 👵🏻 Old Woman: Light Skin Tone
	// 		// 👵🏼 Old Woman: Medium-Light Skin Tone
	// 		// 👵🏽 Old Woman: Medium Skin Tone
	// 		// 👵🏾 Old Woman: Medium-Dark Skin Tone
	// 		// 👵🏿 Old Woman: Dark Skin Tone
