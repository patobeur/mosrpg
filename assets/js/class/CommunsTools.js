"use strict";
class CommunsTools extends GameDatas {
	constructor() {
		super()
		// communs to all class
		// mouse 
		this.communsListener = this.listenertools()
		this.communsTools = this.communstools()
		this.communsSheet = this.sheettools()
		this.communsCheat = this.cheattools()
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
	switch_Pause = (bool = false) => {
		if (!bool === false) {
			this.isPause = bool[0]
		}
		else {
			this.isPause = !this.isPause
		}
		if (this.isPause) {
			document.getElementById('pause').classList.add('active')
		} else {
			document.getElementById('pause').classList.remove('active')
		}
	}
	// get_isPause() {
	// 	return this.isPause
	// }
	set_EventListener() {
		window.addEventListener('resize', this.resize, true)
		// drag test for futur drag and drop stuff ?
		// document.addEventListener('mousedown', () => { this.drag = false });
		// document.addEventListener('mousemove', () => { this.drag = true });
		// document.addEventListener('mouseup', () => console.log(this.drag ? 'draging' : 'clicking'));
		document.getElementById('speedplus').addEventListener('click', () => { this.communsCheat.speed('plus') }, true)
		document.getElementById('speedminus').addEventListener('click', () => { this.communsCheat.speed('minus') }, true)
		document.getElementById('intervalplus').addEventListener('click', () => { this.communsCheat.interval('plus') }, true)
		document.getElementById('intervalminus').addEventListener('click', () => { this.communsCheat.interval('minus') }, true)
		// on click to move
		document.addEventListener('click', this.GF.click_Ground, true)
	}
	refresh_Console() {
		document.getElementById('speedvalue').textContent = this.PF.player.datas.character.height
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
	add_toStats = (targetid, div) => {
		document.getElementById(targetid).appendChild(div)
	}
	listenertools = () => {
		return {
			playerKeyboard: (eventKeyDown) => {
				// stop auto move

				let tmpMooving = false // needed to check if actived mooves
				if (eventKeyDown === 'p') {
					this.switch_Pause()
				}
				if (eventKeyDown === 'c') {
					this.communsSheet.switch_Display()
				}
				// key 37 & 81
				if (eventKeyDown === "ArrowLeft" || eventKeyDown === "q") {
					this.PF.player.datas.pos.d = 180
					tmpMooving = true
				}
				// key 37 & 81
				if (eventKeyDown === "ArrowRight" || eventKeyDown === "d") {
					this.PF.player.datas.pos.d = 0
					tmpMooving = true
				}
				// key 38 & 90
				if (eventKeyDown === "ArrowUp" || eventKeyDown === "z") {
					this.PF.player.datas.pos.d = 270
					tmpMooving = true
				}
				// key 40 & 83
				if (eventKeyDown === "ArrowDown" || eventKeyDown === "s") {
					this.PF.player.datas.pos.d = 90
					tmpMooving = true
				}

				if (tmpMooving) {
					this.GF.ground.reset_Destination()
					let nextpos = this.communsTools.get_PosWithDegree(this.PF.player)
					this.PF.player.datas.pos.x = nextpos.x
					this.PF.player.datas.pos.y = nextpos.y
					// console.log('CurPlayPos:', this.PF.player.datas.pos)
				}
			}
		}
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
				// let x = parseInt(player.datas.pos.x + (player.datas.character.physics.speed.current * Math.cos((player.datas.pos.d) * (Math.PI / 180))))
				// let y = parseInt(player.datas.pos.y + (player.datas.character.physics.speed.current * Math.sin((player.datas.pos.d) * (Math.PI / 180))))
				let x = player.datas.pos.x + (player.datas.character.physics.speed.current * Math.cos((player.datas.pos.d) * (Math.PI / 180)))
				let y = player.datas.pos.y + (player.datas.character.physics.speed.current * Math.sin((player.datas.pos.d) * (Math.PI / 180)))
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
				this.communsSheet.isSheetOpen = !this.communsSheet.isSheetOpen;
				// if (this.communsSheet.isSheetOpen) {
				// 	document.getElementById('sheet').classList.add('active')
				// } else {
				// 	document.getElementById('sheet').classList.remove('active')
				// }
				this.communsSheet.isSheetOpen ? document.getElementById('sheet').classList.add('active') : document.getElementById('sheet').classList.remove('active')

				this.switch_Pause([this.communsSheet.isSheetOpen])
			},
			set_DivSheet: () => {
				// stats
				this.communsSheet.set_statsDivs(this.PF.player.datas.character.stats, 'Statistics')
				this.communsSheet.set_statsDivs(this.PF.player.datas.character.rules, 'Rules')
			},
			set_statsDivs: (datas, cat) => {
				// create tmp Div
				let fullDiv = document.createElement('div')
				fullDiv.id = 'part-' + cat
				fullDiv.className = 'sheet-part part-' + cat
				// fullDiv.textContent = cat

				let titleDiv = document.createElement('div')
				titleDiv.className = 'sheet-title'
				titleDiv.textContent = cat

				fullDiv.appendChild(titleDiv)


				for (const [key, value] of Object.entries(datas)) {
					// console.log(`${key}: ${value}`);
					// create tmp Div
					let statDiv = document.createElement('div')
					statDiv.id = 'stat-' + key
					statDiv.className = 'stat'
					statDiv.style.height = '100%'
					if (typeof value) {
						console.log(typeof value)
					}
					statDiv.style.width = 'calc( ( 100% / ' + this.communs.maxstat + ') * ' + value.current + ')'
					// add to lists stats
					this.PF.player.divstats['div' + key] = statDiv
					// capsule it for front and css
					let capsule = this.communsSheet.set_DivStatCapsule(
						this.PF.player.divstats['div' + key],
						key,
						value
					)

					fullDiv.appendChild(capsule)
					// // add to dom
					// this.add_toStats(
					// 	'sheet-stats', // div target id
					// 	titleDiv
					// )


					// add to dom
					this.add_toStats(
						'sheet-stats', // div target id
						fullDiv
					)
				}
			},
			set_DivStatCapsule: (div, key = false, value = false) => {
				let item = document.createElement('div')
				// item.id = id ?? ''
				item.className = 'sheet-stats-item shadow'
				item.title = key
				//--
				let ico = document.createElement('div')
				ico.className = 'ico'
				ico.textContent = this.get_emoji('stats', key)
				//--
				let jauge = document.createElement('div')
				jauge.className = 'jauge'
				//--
				let rangevalue = document.createElement('div')
				rangevalue.className = 'range'
				rangevalue.id = 'range-' + key
				rangevalue.setAttribute('stat', key)
				rangevalue.textContent = value.current + '/' + value.max
				jauge.prepend(rangevalue)
				//--
				let plus = document.createElement('div')
				plus.className = 'statplus'
				plus.setAttribute('stat', key)
				plus.textContent = '+'
				//--
				jauge.appendChild(div)
				//--
				item.appendChild(ico)
				item.appendChild(jauge)
				item.appendChild(plus)
				return item
			},
		}
	}
	cheattools = () => {
		return {
			isCheat: true,
			speed: (data) => {
				this.Wait()
				if (data === 'plus' && this.PF.player.datas.character.physics.speed.current < this.PF.player.datas.character.speed.max) {
					this.PF.player.datas.character.physics.speed.current += 1
				}
				if (data === 'minus' && this.PF.player.datas.character.physics.speed.current > -5) {
					this.PF.player.datas.character.physics.speed.current -= 1
				}
				this.Play()
			},
			interval: (data) => {
				this.Wait()
				if (data === 'plus') {
					this.renderInterval += 1
				}
				if (data === 'minus' && this.renderInterval >= 20) {
					this.renderInterval -= 1
				}
				this.Play()
			}
		}
	}
}
