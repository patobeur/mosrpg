"use strict";
class CommunsTools extends GameDatas {
	constructor() {
		super()
		// communs to all class
		// mouse 
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
			},
			set_DivSheet: () => {
				// stats
				this.sheetTools.set_statsDivs()
			},
			set_statsDivs: () => {
				for (const [key, value] of Object.entries(this.PF.player.datas.stats)) {
					// console.log(`${key}: ${value}`);
					let statDiv = document.createElement('div')
					statDiv.id = 'a-' + key
					statDiv.className = 'stat ' + key
					statDiv.textContent = value
					this.PF.player.divstats['a-' + key] = statDiv

					let capsule = this.sheetTools.set_DivStatCapsule(
						this.PF.player.divstats['a-' + key],
						key,
						value
					)
					this.sheetTools.add_toStats(
						'sheet-stats', // targetid
						capsule
					)
					// document.getElementById('a-' + key).appendChild(this.PF.player.divstats['a-' + key])
				}
			},
			set_DivStatCapsule: (div, key = false, value = false) => {
				let item = document.createElement('div')
				// item.id = id ?? ''
				item.className = 'sheet-stats-item'
				item.title = key
				//--
				let ico = document.createElement('div')
				ico.className = 'ico'
				ico.textContent = this.get_emoji('stats', key)
				//--
				let jauge = document.createElement('div')
				jauge.className = 'jauge'
				//--
				jauge.appendChild(div)
				item.appendChild(ico)
				item.appendChild(jauge)
				return item
			},
			add_toStats: (targetid, div) => {
				document.getElementById(targetid).appendChild(div)
			},
		}
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
}
