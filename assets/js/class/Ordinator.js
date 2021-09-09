"use strict";
class Ordinator extends CommunsTools {
	constructor() {
		super()
		this.PF = new PlayersFactory()
		this.GF = new GroundsFactory(this.PF.player)
		this.render = this.renderManager()
		this.rendertics = 0
		this.renderInterval = 20 // render speed 1ms * 50
		this.gameRender = false
		this.PAUSE = this.isPause
		this.set_EventListener()
		this.set_Onkeydown()
		// this.renderer = setInterval(10, this.render, ['true'], 50)

		this.Start()

	}

	Start = () => {
		this.Play()
	}
	Play = () => {
		//RENDER 
		this.rendertics = 0
		this.gameRender = setInterval(() => { this.render() }, this.renderInterval);
	}
	Wait = () => {
		//RENDER 
		this.isWait = true // stuck render
		clearInterval(this.gameRender);
	}
	set_Onkeydown() {
		document.onkeydown = (eventkeydown) => {
			this.playerKeyboard(eventkeydown.key)
		}
	}
	renderManager = () => {
		return () => {
			this.rendertics++
			if (this.isPause != false) {
				// if new destination x y clicked
				if (this.PF.player.datas.actions.movingToDestinationClick === true) {
					this.GF.move_ToDestination(this.PF.player)
				}
				this.PF.player.refresh(this.GF.ground)
				this.PF.player.refresh()
				this.GF.ground.refresh()
			}
		}
	}
	playerKeyboard(eventKeyDown) {
		let tmpMooving = false // needed to check if actived mooves
		if (eventKeyDown === 'p') {
			this.setPause(false)
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
			this.GF.ground.datas.pos.x = parseInt((window.innerWidth / 2) - (this.PF.player.datas.pos.x))
			this.GF.ground.datas.pos.y = parseInt((window.innerHeight / 2) - (this.PF.player.datas.pos.y))
		}
	}
}
