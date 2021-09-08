"use strict";
class Ordinator extends CommunsTools {
	constructor() {
		super()
		this.PF = new PlayersFactory()
		this.GF = new GroundsFactory(this.PF.player)
		this.set_EventListener()
		this.set_Onkeydown()
		this.render = this.renderManager()
		this.renderer = setInterval(50, this.render, ['true'], 50)
		this.gameRender = false
		this.rendertics = 0
		this.renderInterval = 50 // render speed 1ms * 50
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
	Stop = () => {
		//RENDER 
		this.wait = true // stuck render
		clearInterval(this.gameRender);
	}
	renderManager = () => {
		return () => {
			this.rendertics++
			if (!this.isPause && !this.wait) {
				// this.PF.player.refresh(this.GF.ground)
			}
		}
	}
}
