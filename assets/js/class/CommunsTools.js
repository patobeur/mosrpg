"use strict";
class CommunsTools {
	constructor() {
		this.isBug = false
		this.isPause = false
		this.wait = false
		this.tools = this.tools()
	}
	set_EventListener() {
		window.addEventListener('resize', this.resize, true)
		window.addEventListener('click', this.click, true)
	}
	set_Onkeydown() {
		document.onkeydown = (eventkeydown) => {
			this.GF.move(eventkeydown.key)
		}
	}
	resize = () => {
		this.GF.set_ScreenXY()
		this.PF.player.refresh(this.GF.ground)
		this.GF.ground.refresh()
	}
	click = (e) => {
		console.log('Click on target:', e.target.className, ' / Click Coord:', 'x:' + e.clientX, 'y:' + e.clientY)
	}
	tools = () => {
		return {
			setBugAndPause: (string = false) => {
				this.isBug = true
				this.isPause = true
				if (this.isBug && this.isPause) {
					console.log('🐛 bug ! game paused' + (string ? ' 💀->' + string : ''))
				}
			},
			aleaEntreBornes: (minimum, maximum) => {
				return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
			},
			get_emoji: () => {

				let toons = [
					{ ico: '🧙‍♀️', name: 'Woman Mage' },
					{ ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
					{ ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
					{ ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
					{ ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
					{ ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
					{ ico: '🧙‍♂️', name: 'Man Mage' },
					{ ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
					{ ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
					{ ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
					{ ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
					{ ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
				]
				return toons[this.tools.aleaEntreBornes(0, toons.length - 1)]
				// let emojis = {
				// 	0: { ico: '⚔️', name: '' },
				// 	1: { ico: '🗡️', name: 'Dagger' },
				// 	2: { ico: '🔪', name: 'Kitchen Knife' },
				// 	3: { ico: '🥷', name: 'Ninja' },
				// 	4: { ico: '🤴', name: 'Prince' },
				// 	5: { ico: '👸', name: 'Princess' },
				// 	6: { ico: '🛡️', name: 'Shield' },
				// 	7: { ico: '🏹', name: 'Bow and Arrow' },
				// 	8: { ico: '⚚', name: 'Staff of Hermes' },
				// 	9: { ico: '🧙‍♂️', name: 'Man Mage' },
				// 	10: { ico: '🧙‍♀️', name: 'Woman Mage' },
				// 	11: { ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
				// 	12: { ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
				// 	13: { ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
				// 	14: { ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
				// 	15: { ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
				// 	16: { ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
				// 	17: { ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
				// 	18: { ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
				// }
				// let emojis2 = [
				// 	{ ico: '⚔️', name: '' },
				// 	{ ico: '🗡️', name: 'Dagger' },
				// 	{ ico: '🔪', name: 'Kitchen Knife' },
				// 	{ ico: '🥷', name: 'Ninja' },
				// 	{ ico: '🤴', name: 'Prince' },
				// 	{ ico: '👸', name: 'Princess' },
				// 	{ ico: '🛡️', name: 'Shield' },
				// 	{ ico: '🏹', name: 'Bow and Arrow' },
				// 	{ ico: '⚚', name: 'Staff of Hermes' },
				// 	{ ico: '🧙‍♂️', name: 'Man Mage' },
				// 	{ ico: '🧙‍♀️', name: 'Woman Mage' },
				// 	{ ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
				// 	{ ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
				// 	{ ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
				// 	{ ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
				// 	{ ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
				// 	{ ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
				// 	{ ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
				// 	{ ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
				// ]
			}
		}
	}
	setPause() {
		this.isPause = !this.isPause
	}
	// trigonometrie
	get_Distance = (a, b) => { // get hypotenus with pythaGore
		// let AB = (a.x + (a.w / 2)) - (b.x + (b.w / 2))
		// let AC = (a.y + (a.h / 2)) - (b.y + (b.h / 2))
		let AB = (a.x) - (b.x)
		let AC = (a.y) - (b.y)
		return Math.sqrt((AB * AB) + (AC * AC))
	}
	get_DirDegree = (a, b) => { // get hypotenus with pythaGore
		projectil.x = projectil.x + (projectil.speed * Math.cos((projectil.d) * (Math.PI / 180)))
		projectil.y = projectil.y + (projectil.speed * Math.sin((projectil.d) * (Math.PI / 180)))
	}
	get_PosWithdegree = (a) => { // get hypotenus with pythaGore
		let x = a.pos.x + (a.speed * Math.cos((a.d) * (Math.PI / 180)))
		let y = a.pos.y + (a.speed * Math.sin((a.d) * (Math.PI / 180)))
	}
}
