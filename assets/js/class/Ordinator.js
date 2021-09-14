"use strict";
class Ordinator extends CommunsTools {
	constructor() {
		super()
		this.PF = new PlayersFactory()
		this.GF = new GroundsFactory(this.PF.player)


		this.add_ToGame(this.PF.player.div)
		this.PF.player.refresh()
		this.gamedatas.parentnode = this.communsTools.get_ParentNode('this is a test')
		this.render = this.renderManager()
		this.set_EventListener()
		this.set_Onkeydown()
		// this.renderer = setInterval(10, this.render, ['true'], 50)

		this.communsSheet.set_DivSheet()
		this.communsSheet.add_button()
		// this.switch_Display()

		// this.set_ContextMenu()
		this.Start()

	}

	Start = () => {
		this.Play()
	}
	Play = () => {
		//RENDER 
		this.rendertics = 0
		this.isWait = false // UNstuck render
		this.gameRender = setInterval(() => { this.render() }, this.renderInterval);
	}
	Wait = () => {
		//RENDER 
		this.GF.ground.reset_Destination()
		this.isWait = true // stuck render
		clearInterval(this.gameRender);
	}
	set_Onkeydown() {
		document.onkeydown = (eventkeydown) => {
			this.communsListener.playerKeyboard(eventkeydown.key)
		}
	}
	playerKeyboard(eventKeyDown) {
		// stop auto move
		this.GF.ground.reset_Destination()

		let tmpMooving = false // needed to check if actived mooves
		if (eventKeyDown === 'p') {
			this.switch_Pause(false)
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
			let nextpos = this.communsTools.get_PosWithDegree(this.PF.player)
			this.PF.player.datas.pos.x = nextpos.x
			this.PF.player.datas.pos.y = nextpos.y
			console.log('CurPlayPos:', this.PF.player.datas.pos)
		}
	}
	renderManager = () => {
		return () => {
			this.rendertics++
			if (!this.isPause) {
				this.PF.player.refresh(this.GF.ground)
				this.GF.ground.refresh()
				// if new destination x y clicked
				this.communsSheet.set_RefreshStats()
				this.refresh_Console()
				if (this.PF.player.datas.actions.movingToDestinationClick === true) {
					this.GF.ground.move_ToPlayerDestination()
				}
			}
		}
	}
}
