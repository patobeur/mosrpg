# mosrpg
🧙 my own solo rpg testing javascript

Where am i going ?

🕹️ https://patobeur.github.io/mosrpg/

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Get direction in degrees from player to click
```
this.player.datas.pos.d = this.communsTools.get_DegreeWithTwoPos(
	this.player.datas.pos.x,
	this.player.datas.pos.y,
	this.player.datas.destination.x,
	this.player.datas.destination.y
)

Then 

get_DegreeWithTwoPos: (fromX, fromY, destX, destY,) ={
	var nextY = fromY - destY;
	var nextX = fromX - destX;
	var theta = Math.atan2(-nextY, -nextX); // 0° = east
	theta *= 180 / Math.PI; // radians to degrees
	if (theta < 0) theta += 360; // negative case
	return theta;
},
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

By the way : get next position x,y with degree
```
get_PosWithDegree: (player) => {
	let x = parseInt( player.datas.pos.x + (player.datas.character.speed * Math.cos((player.datas.pos.d) * (Math.PI / 180))))
	// x  = parseInt( current pos x  + ( distance * Math.cos( tetha * (Math.PI / 180))))
	let y = parseInt( player.datas.pos.y + (player.datas.character.speed * Math.sin((player.datas.pos.d) * (Math.PI / 180))))
	// y  = parseInt( current pos y + ( distance * Math.sin( tetha * (Math.PI / 180))))
	return { x: x, y: y }
},
this may be nice to remove parseInt() to get better posistion check ! more work for processor !!!
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

get distance from two objects
```
get_Distance: (from, destination) => { // get hypotenus with pythaGore
	let AB = (destination.x) - (from.x)
	let AC = (destination.y) - (from.y)
	return Math.sqrt((AB * AB) + (AC * AC))
}
```

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

Visuals ressources link :

floors :

https://www.pinterest.fr/pin/31877109835551591/

ideas :

https://vryell.itch.io/tiny-adventure-pack

https://angrysnail.itch.io/pixel-art-graveyard-tileset
