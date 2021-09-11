"use strict";
class GameDatas {
	constructor() {
		// communs to all class
		this.drag = false
		this.isBug = false
		this.isPause = true
		this.isWait = false
		this.communs = {
			//casesize: 32 * this.ratio, // px
			ratio: 1,
			gamesize: { w: '1024', h: '1024' },
			parentnode: Object,// game div parentNode
		}
	}
}
