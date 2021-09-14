"use strict";
class CommunsTools extends GameDatas {
	constructor() {
		super()

		this.communsListener = this.listenertools()
		this.communsTools = this.communstools()
		this.communsSheet = this.sheettools()
		this.communsCheat = this.cheattools()
	}
	set_ContextMenu() {
		var notepad = document.getElementById("ground");
		notepad.addEventListener("contextmenu", function (event) {
			event.preventDefault();
			var ctxMenu = document.getElementById("ctxMenu");
			ctxMenu.style.display = "block";
			ctxMenu.style.left = (event.pageX - 10) + "px";
			ctxMenu.style.top = (event.pageY - 10) + "px";
		}, false);
		notepad.addEventListener("click", function (event) {
			event.preventDefault();
			var ctxMenu = document.getElementById("ctxMenu");
			ctxMenu.style.display = "";
			ctxMenu.style.left = "";
			ctxMenu.style.top = "";
		}, false);
	}
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
		document.addEventListener('click', (e) => {
			if (
				e.target.id === 'displaysheet'
				|| (
					// (this.isSheetOpen && e.target.id == '')|| 
					(this.isSheetOpen && (e.target.id === 'ground'))
				)
			) {
				this.switch_Display()
			}
			if ((e.target.id === 'ground' && !this.isSheetOpen)) {
				this.GF.click_Ground(e)
			}
		}, true)
	}
	refresh_Console() {
		document.getElementById('speedvalue').textContent = this.PF.player.datas.character.physics.speed.current
		document.getElementById('intervalvalue').textContent = this.renderInterval
	}
	resize = () => {
		this.GF.set_ScreenXY()
		this.PF.player.refresh(this.GF.ground)
		this.GF.ground.refresh()
	}
	add_ToDom = (div, append = false) => {
		if (append) {
			document.body.appendChild(div)
		}
		else {
			document.body.prepend(div)

		}
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
					this.switch_Display()
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
			get_ParentNode: (mess) => {
				let parentnode = false;
				if (parentnode = this.GF.ground.divGame.parentNode) {
					this.gamedatas.parentnode = {
						w: parentnode.clientWidth,
						h: parentnode.clientHeight,
						nodename: parentnode.nodeName,
						id: parentnode.id.length > 0 ? parentnode.id : false,
						class: parentnode.className.length > 0 ? parentnode.className.length : false,
						object: parentnode,
						fullpage: false
					}
					// console.log('parentNode detection of game div')
					if (this.gamedatas.parentnode.nodename === "BODY") {
						this.gamedatas.parentnode.fullpage = true
					}
					else {
						// console.log('Parent = ' + this.gamedatas.parentnode.nodename)
					}
					// console.log(this.gamedatas.parentnode)
				}
				else {
					// to do
				}
			},
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
	switch_Display = () => {
		this.isSheetOpen = this.isSheetOpen === false ? true : false;
		this.isSheetOpen
			? document.getElementById('sheet').classList.add('active')
			: document.getElementById('sheet').classList.remove('active')
		// switch pause with isSheetOpen case true/false
		this.switch_Pause([this.isSheetOpen])
	}
	switch_Pause = (bool = false) => {
		if (
			// sheet is Open and requeste is to Pause game
			this.isSheetOpen === true && (bool && bool[0] === true)
			// sheet is Close and requeste is to UnPause game
			|| this.isSheetOpen === false && (bool && bool[0] === false)
			// sheet is Close and switch Pause is requested
			|| this.isSheetOpen === false && bool === false
		) {
			this.isPause = (bool)
				? bool[0]
				: !this.isPause
		}
		(this.isPause)
			? document.getElementById('pause').classList.add('active')
			: document.getElementById('pause').classList.remove('active')
	}
	sheettools = () => {
		return {
			add_button: () => {
				let butttons = document.createElement('div')
				butttons.id = 'displayparts' // key c

				let buttton = document.createElement('div')
				buttton.id = 'displaysheet' // key c
				let butttonIn = document.createElement('div')
				butttonIn.textContent = '📜'
				buttton.appendChild(butttonIn)
				buttton.addEventListener('click', this.switch_Display, true)
				// -- 

				butttons.appendChild(buttton)
				this.add_ToDom(butttons, true)

			},
			set_DivSheet: () => {
				// stats
				this.communsSheet.set_avatarDivs(this.PF.player.datas.character, 'avatar', 'You ?')
				this.communsSheet.set_skinChoiceDivs(this.PF.player.datas.character, 'skins', 'skin\'s stats')
				this.communsSheet.set_statsDivs(this.PF.player.datas.character.stats, 'stats', 'Yo\'s stats')
				this.communsSheet.set_statsDivs(this.PF.player.datas.character.rules, 'rules', 'rule\'s stats')
				this.communsSheet.set_statsDivs(this.PF.player.datas.character.physics, 'physics', 'physic\'s stats')
				this.communsSheet.set_statsDivs(this.PF.player.datas.character.skills, 'skills', 'skill\'s stats')
			},
			refresh_SheetSkins: () => {
				for (const [key, value] of Object.entries(this.PF.player.datas.character.skins)) {
					this.PF.player.divstats['divSkins' + key + 'Range'].style.left = (parseInt(100 / (this.PF.player.datas.character.skins[key].max + 1) * this.PF.player.datas.character.skins[key].current)) + '%'
					this.PF.player.divstats['divSkins' + key + 'Stat'].textContent = '' + this[key + 'List'][this.PF.player.datas.character.skins[key].current]
				}
				//refresh EMOJI
				// let emoji = this.get_EmojiRaceArray()
				// [this.raceList[this.PF.player.datas.character.skins.race.current]]
				// [this.genderList[this.PF.player.datas.character.skins.gender.current]]
				// [this.skinList[this.PF.player.datas.character.skins.skin.current]].emoji
				// this.PF.player.divstats['divAvatar'].textContent = emoji
				this.PF.player.divstats['divAvatar'].textContent = this.get_EmojiRace(
					this.PF.player.datas.character.skins.race.current,
					this.PF.player.datas.character.skins.gender.current,
					this.PF.player.datas.character.skins.skin.current)
			},
			lowerStat: (key, value) => {
				if (value.current > 0) { value.current -= 1 }
				else { value.current = value.max }
				// this.PF.player.datas.character.skins[key].current = value.current
				// console.log('lowerStat:' + key + ' to ' + this.PF.player.datas.character.skins[key].current)
				this.communsSheet.refresh_SheetSkins()
			},
			raiseStat: (key, value) => {
				if (value.current < value.max) { value.current += 1 }
				else { value.current = new Number('0') }
				// this.PF.player.datas.character.skins[key].current = value.current
				// console.log('raiseStat:' + key + ' to ' + this.PF.player.datas.character.skins[key].current)
				this.communsSheet.refresh_SheetSkins()
			},
			set_avatarDivs: (datas, cat, title) => {
				// create tmp Div
				let fullDiv = document.createElement('div')
				fullDiv.id = 'part-' + cat
				fullDiv.className = 'sheet-part part-' + cat

				// let titleDiv = document.createElement('div')
				// titleDiv.className = 'sheet-title'
				// titleDiv.textContent = title
				// fullDiv.appendChild(titleDiv)

				let playernameDiv = document.createElement('div')

				let mosrpgName = localStorage.getItem('mosrpgName')
				let golden = ''
				if (mosrpgName) {
					playernameDiv.className = 'sheet-name'
					let Div = document.createElement('div')
					Div.className = 'sheet-name-title'
					Div.textContent = mosrpgName
					playernameDiv.appendChild(Div)
				}
				else {
					playernameDiv.className = 'sheet-name changeonce'
					mosrpgName = 'You !!!'
					let playernameInput = document.createElement('input')
					playernameInput.className = 'sheet-name-input golden'
					playernameInput.value = mosrpgName
					playernameInput.size = '12'
					playernameInput.addEventListener('change', (e) => {
						// CLEAN THIS RIGHT NOW
						let newvalue = e.target.value

						localStorage.setItem('mosrpgName', newvalue)
						let Div = document.createElement('div')
						Div.className = 'sheet-name-title'
						Div.textContent = newvalue
						e.target.parentNode.classList.remove('changeonce')
						e.target.parentNode.appendChild(Div)
						e.target.remove()
					})
					playernameDiv.appendChild(playernameInput)
				}

				//--
				// this.PF.player.divstats['divPlayerName'] = playernameInput
				//--
				fullDiv.appendChild(playernameDiv)

				let avatarDiv = document.createElement('div')
				avatarDiv.className = 'sheet-avatar'
				avatarDiv.textContent = this.get_EmojiRace(
					this.PF.player.datas.character.skins.race.current,
					this.PF.player.datas.character.skins.gender.current,
					this.PF.player.datas.character.skins.skin.current)
				fullDiv.appendChild(avatarDiv)

				this.PF.player.divstats['divAvatar'] = avatarDiv
				// add to dom
				this.add_toStats(
					'sheet-stats', // div target id
					fullDiv,
					cat
				)
			},
			set_skinChoiceDivs: (datas, cat, title) => {
				// create tmp Div
				let fullDiv = document.createElement('div')
				fullDiv.id = 'part-' + cat
				fullDiv.className = 'sheet-part part-' + cat
				let titleDiv = document.createElement('div')
				titleDiv.className = 'sheet-title'
				titleDiv.textContent = title

				fullDiv.appendChild(titleDiv)
				for (const [key, value] of Object.entries(datas.skins)) {
					let skindiv = document.createElement('div')
					skindiv.className = 'sheet-skins-item'
					//--
					let minus = document.createElement('div')
					minus.className = 'statminus'
					minus.setAttribute('stat', key)
					minus.textContent = '-'
					minus.addEventListener('click', (e) => {
						this.communsSheet.lowerStat(key, value)
					}, true)
					skindiv.appendChild(minus)
					//--
					let skinjauge = document.createElement('div')
					skinjauge.className = 'jauge'
					skindiv.appendChild(skinjauge)
					//--
					let skinrange = document.createElement('div')
					skinrange.className = 'range'
					// skinrange.style.width = (parseInt(100 / this.PF.player.datas.character.skins[key].max) * this.PF.player.datas.character.skins[key].current) + '%'
					skinrange.style.width = (parseInt(100 / (this.PF.player.datas.character.skins[key].max + 1))) + '%'
					skinrange.style.left = (parseInt(100 / (this.PF.player.datas.character.skins[key].max + 1) * this.PF.player.datas.character.skins[key].current)) + '%'
					this.PF.player.divstats['divSkins' + key + 'Range'] = skinrange
					skinjauge.appendChild(this.PF.player.divstats['divSkins' + key + 'Range'])
					//--
					let skinstat = document.createElement('div')
					skinstat.className = 'stat'
					skinstat.textContent = key + ':' + this[key + 'List'][value.current]
					this.PF.player.divstats['divSkins' + key + 'Stat'] = skinstat
					skinjauge.appendChild(this.PF.player.divstats['divSkins' + key + 'Stat'])
					//--
					//--
					let plus = document.createElement('div')
					plus.className = 'statplus'
					plus.textContent = '+'
					plus.addEventListener('click', (e) => {
						this.communsSheet.raiseStat(key, value)
					}, true)
					skindiv.appendChild(plus)
					//--
					fullDiv.appendChild(skindiv)
				}

				// add to dom
				this.add_toStats(
					'sheet-stats', // div target id
					fullDiv,
					cat
				)
			},
			set_statsDivs: (datas, cat, title) => {
				// create tmp Div
				let fullDiv = document.createElement('div')
				fullDiv.id = 'part-' + cat
				fullDiv.className = 'sheet-part part-' + cat
				// fullDiv.textContent = cat

				let titleDiv = document.createElement('div')
				titleDiv.className = 'sheet-title'
				titleDiv.textContent = title

				fullDiv.appendChild(titleDiv)

				for (const [key, value] of Object.entries(datas)) {
					// console.log(`${key}: ${value}`);
					// create tmp Div
					let statDiv = document.createElement('div')
					statDiv.id = 'stat-' + key
					statDiv.className = 'stat'
					statDiv.textContent = key + ':' + value.current + '/' + value.max
					// add to lists stats
					this.PF.player.divstats['divStats' + key + 'Stat'] = statDiv
					// capsule it for front and css
					let capsule = this.communsSheet.set_DivStatCapsule(
						this.PF.player.divstats['divStats' + key + 'Stat'],
						key,
						value,
						cat
					)

					fullDiv.appendChild(capsule)

					// add to dom
					this.add_toStats(
						'sheet-stats', // div target id
						fullDiv,
						cat
					)
				}
			},
			set_DivStatCapsule: (div, key = false, value = false, cat) => {
				let item = document.createElement('div')
				// item.id = id ?? ''
				item.className = 'sheet-stats-item shadow'
				item.title = key
				//--
				let ico = document.createElement('div')
				ico.className = 'ico'
				ico.textContent = this.get_emojiStat(cat, key)
				//--
				let jauge = document.createElement('div')
				jauge.className = 'jauge'
				//--
				let rangevalue = document.createElement('div')
				rangevalue.className = 'range'
				rangevalue.id = 'range-' + key
				rangevalue.style.height = '100%'
				rangevalue.style.width = 'calc( ( 100% / ' + value.max + ') * ' + value.current + ')'
				jauge.prepend(rangevalue)
				//--
				let plus = document.createElement('div')
				plus.className = 'statplus'
				plus.textContent = '+'
				//--
				jauge.appendChild(div)
				//--
				item.appendChild(ico)
				item.appendChild(jauge)
				item.appendChild(plus)
				return item
			},
			set_RefreshStats: () => {
				// console.log('1')
			}
		}
	}
	cheattools = () => {
		// CHEATS
		return {
			isCheat: true,
			speed: (data) => {
				if (!this.isPause) {
					this.Wait()
					if (data === 'plus' && this.PF.player.datas.character.physics.speed.current < this.PF.player.datas.character.physics.speed.max) {
						this.PF.player.datas.character.physics.speed.current += 1
					}
					if (data === 'minus' && this.PF.player.datas.character.physics.speed.current > -5) {
						this.PF.player.datas.character.physics.speed.current -= 1
					}
					this.Play()
				}
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
