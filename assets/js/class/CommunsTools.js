"use strict";
class CommunsTools {
	constructor() {
		// communs to all class
		this.communs = {
			//casesize: 32 * this.ratio, // px
			ratio: 1,
			gamesize: { w: '1024', h: '1024' },
			parentnode: Object,// game div parentNode
		}
		// mouse 
		this.drag = false
		this.isBug = false
		this.isPause = true
		this.isWait = false
		this.communsTools = this.communstools()
		this.sheetTools = this.sheettools()
		this.cheatTools = this.cheattools()
	}
	get_ParentNode = (mess) => {
		let parentnode = false;
		if (parentnode = this.GF.ground.divGame.parentNode) {
			this.communs.parentnode = {
				w: parentnode.clientWidth,
				h: parentnode.clientHeight,
				nodename: parentnode.nodeName,
				id: parentnode.id.length > 0 ? parentnode.id : false,
				class: parentnode.className.length > 0 ? parentnode.className.length : false,
				object: parentnode,
				fullpage: false
			}
			// console.log('parentNode detection of game div')
			if (this.communs.parentnode.nodename === "BODY") {
				this.communs.parentnode.fullpage = true
			}
			else {
				// console.log('Parent = ' + this.communs.parentnode.nodename)
			}
			// console.log(this.communs.parentnode)
		}
		else {
			// to do
		}
	}
	switch_Pause = () => {
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
		document.getElementById('speedplus').addEventListener('click', () => { this.cheatTools.speed('plus') }, true)
		document.getElementById('speedminus').addEventListener('click', () => { this.cheatTools.speed('minus') }, true)
		document.getElementById('intervalplus').addEventListener('click', () => { this.cheatTools.interval('plus') }, true)
		document.getElementById('intervalminus').addEventListener('click', () => { this.cheatTools.interval('minus') }, true)
		// on click to move
		document.addEventListener('click', this.GF.click_Ground, true)
	}
	refresh_Console() {
		document.getElementById('speedvalue').textContent = this.PF.player.datas.speed
		document.getElementById('intervalvalue').textContent = this.renderInterval
	}
	resize = () => {
		this.GF.set_ScreenXY()
		this.PF.player.refresh(this.GF.ground)
		this.GF.ground.refresh()
	}
	cheattools = () => {
		return {
			isCheat: true,
			speed: (data) => {
				this.Wait()
				if (data === 'plus') {
					this.PF.player.datas.speed += 1
				}
				if (data === 'minus') {
					this.PF.player.datas.speed -= 1
				}
				this.Play()
			},
			interval: (data) => {
				this.Wait()
				if (data === 'plus') {
					this.renderInterval += 1
				}
				if (data === 'minus') {
					this.renderInterval -= 1
				}
				this.Play()
			}
		}
	}
	add_ToDom = (div) => {
		document.body.prepend(div)
	}
	add_ToGame = (div) => {
		document.getElementById('game').appendChild(div)
	}
	add_ToMap = (div) => {
		document.getElementById('ground').appendChild(div)
	}
	communstools = () => {
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
			get_DegreeWithTwoPos: (fromX, fromY, destX, destY,) => {
				var nextY = fromY - destY;
				var nextX = fromX - destX;
				var theta = Math.atan2(-nextY, -nextX); // 0° = east
				theta *= 180 / Math.PI; // radians to degrees
				if (theta < 0) theta += 360; // negative case
				return theta;
			},
			get_PosWithDegree: (player) => {
				// let x = parseInt(player.datas.pos.x + (player.datas.speed * Math.cos((player.datas.pos.d) * (Math.PI / 180))))
				// let y = parseInt(player.datas.pos.y + (player.datas.speed * Math.sin((player.datas.pos.d) * (Math.PI / 180))))
				let x = player.datas.pos.x + (player.datas.speed * Math.cos((player.datas.pos.d) * (Math.PI / 180)))
				let y = player.datas.pos.y + (player.datas.speed * Math.sin((player.datas.pos.d) * (Math.PI / 180)))
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
	sheettools = () => {
		return {
			isSheetOpen: false,
			switch_Display: () => {
				this.sheetTools.isSheetOpen = !this.sheetTools.isSheetOpen;
				this.sheetTools.isSheetOpen
					? document.getElementById('sheet').classList.add('active')
					: document.getElementById('sheet').classList.remove('active')
				console.log(this.sheetTools.isSheetOpen)
			},
			get_DivSheet: () => {
				for (const [key, value] of Object.entries(this.PF.player.datas.stats)) {
					// console.log(`${key}: ${value}`);
					let statDiv = document.createElement('div')
					statDiv.id = 'a-' + key
					statDiv.textContent = value
					this.PF.player.divstats['a-' + key] = statDiv
					// document.getElementById('a-' + key).appendChild(this.PF.player.divstats['a-' + key])
				}
			},
			get_DivCapsule: (div, classname = false, id = false) => {
				if (typeof div === Object) {
					let item = document.createElement('div')
					item.id = id ?? ''
					item.classname = classname ?? ''
					item.appendChild(div)
					return item
				}
			},
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
