"use strict";
class CommunsTools {
	constructor() {
		// on peux faire ça ??? can we do that ??? this call himself ?
		// game data
		this.ratio = 1
		this.casesize = 32 * this.ratio // px
		// mouse 
		this.drag = false
		this.isBug = false
		this.isPause = true
		this.isWait = false
		this.communsTools = this.communsTools()
	}
	setPause = () => {
		this.isPause = !this.isPause
	}
	get_isPause() {
		return this.isPause
	}
	set_EventListener() {
		window.addEventListener('resize', this.resize, true)

		// drag test for futur drag and drop stuff ?
		// document.addEventListener('mousedown', () => { this.drag = false });
		// document.addEventListener('mousemove', () => { this.drag = true });
		// document.addEventListener('mouseup', () => console.log(this.drag ? 'draging' : 'clicking'));

		// on click to move
		document.addEventListener('click', this.GF.click_Ground, true)
	}
	resize = () => {
		this.GF.set_ScreenXY()
		this.PF.player.refresh(this.GF.ground)
		this.GF.ground.refresh()
	}
	communsTools = () => {
		return {
			set_BugAndPause: (string = false) => {
				this.isBug = true
				this.isPause = true
				if (this.isBug && this.isPause) {
					console.log('🐛 bug ! game paused' + (string ? ' 💀->' + string : ''))
				}
			},
			get_aleaEntreBornes: (minimum, maximum) => {
				return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
			},
			get_DegreeWithTwoPos: (destX, destY, fromX, fromY) => {
				var nextY = fromY - destY;
				var nextX = fromX - destX;
				var theta = Math.atan2(-nextY, -nextX); // 0° = east
				theta *= 180 / Math.PI; // radians to degrees
				if (theta < 0) theta += 360; // negative case
				return theta;
			},
			get_PosWithDegree: (player) => {
				let x = parseInt(player.datas.pos.x + (player.datas.speed * Math.cos((player.datas.pos.d) * (Math.PI / 180))))
				let y = parseInt(player.datas.pos.y + (player.datas.speed * Math.sin((player.datas.pos.d) * (Math.PI / 180))))
				return { x: x, y: y }
			},
			// trigonometrie
			get_Distance: (from, destination) => { // get hypotenus with pythaGore
				let AB = (destination.x) - (from.x)
				let AC = (destination.y) - (from.y)
				return Math.sqrt((AB * AB) + (AC * AC))
			}
		}
	}

	// emojis
	get_emoji = () => {
		let emojis = {
			0: { ico: '⚔️', name: '' },
			1: { ico: '🗡️', name: 'Dagger' },
			2: { ico: '🔪', name: 'Kitchen Knife' },
			3: { ico: '🥷', name: 'Ninja' },
			4: { ico: '🤴', name: 'Prince' },
			5: { ico: '👸', name: 'Princess' },
			6: { ico: '🛡️', name: 'Shield' },
			7: { ico: '🏹', name: 'Bow and Arrow' },
			8: { ico: '⚚', name: 'Staff of Hermes' },
			9: { ico: '🧙‍♂️', name: 'Man Mage' },
			10: { ico: '🧙‍♀️', name: 'Woman Mage' },
			11: { ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
			12: { ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
			13: { ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
			14: { ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
			15: { ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
			16: { ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
			17: { ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
			18: { ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
		}
		let emojis2 = [
			{ ico: '⚔️', name: '' },
			{ ico: '🗡️', name: 'Dagger' },
			{ ico: '🔪', name: 'Kitchen Knife' },
			{ ico: '🥷', name: 'Ninja' },
			{ ico: '🤴', name: 'Prince' },
			{ ico: '👸', name: 'Princess' },
			{ ico: '🛡️', name: 'Shield' },
			{ ico: '🏹', name: 'Bow and Arrow' },
			{ ico: '⚚', name: 'Staff of Hermes' },
			{ ico: '🧙‍♂️', name: 'Man Mage' },
			{ ico: '🧙‍♀️', name: 'Woman Mage' },
			{ ico: '🧙🏼‍♀️', name: 'Woman Mage: Medium-Light Skin Tone' },
			{ ico: '🧙🏻‍♀️', name: 'Woman Mage: Light Skin Tone' },
			{ ico: '🧙🏽‍♀️', name: 'Woman Mage: Medium Skin Tone' },
			{ ico: '🧙🏿‍♀️', name: 'Woman Mage: Dark Skin Tone' },
			{ ico: '🧙🏾‍♀️', name: 'Woman Mage: Medium-Dark Skin Tone' },
			{ ico: '🧙🏻‍♂️', name: 'Man Mage: Light Skin Tone' },
			{ ico: '🧙🏾', name: 'Man Mage: Medium-Dark Skin Tone' },
			{ ico: '🧙🏽‍♂️', name: 'Man Mage: Medium Skin Tone' },
		]
	}
}
