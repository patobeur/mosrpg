# mosrpg
my own solo rpg test

Where am i going ?

Visuals ressources link :

floors :

https://www.pinterest.fr/pin/31877109835551591/

ideas :

https://vryell.itch.io/tiny-adventure-pack

https://angrysnail.itch.io/pixel-art-graveyard-tileset


https://patobeur.github.io/mosrpg/


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Get direction in degrees from player to click
```
> this.player.datas.pos.d = this.communsTools.get_DegreeWithTwoPos(
> 	this.player.datas.pos.x,
> 	this.player.datas.pos.y,
> 	this.player.datas.destination.x,
> 	this.player.datas.destination.y
> )
```
Then 
```
> get_DegreeWithTwoPos: (fromX, fromY, destX, destY,) => {
> 	var nextY = fromY - destY;
> 	var nextX = fromX - destX;
> 	var theta = Math.atan2(-nextY, -nextX); // 0° = east
> 	theta *= 180 / Math.PI; // radians to degrees
> 	if (theta < 0) theta += 360; // negative case
> 	return theta;
> },
```
