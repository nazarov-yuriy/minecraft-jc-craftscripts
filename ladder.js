/**
 * Author: Yuriy Nazarov
 */

importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

var blocks = context.remember();
var player = context.getPlayer();

//get ladder height
context.checkArgs(1, 1, "<count>");

var count =  parseInt(argv[1]);

var direction = ''+player.getCardinalDirection();   //XXX: convert to string

var dx = 1;
var dy = 1;
var m = 0;

switch (direction) {
    case "NORTH":
    case "NORTH_WEST":
    case "NORTH_EAST":
        dx = 0;
        dy = -1;
        m = 3;
        break;
    case "SOUTH":
    case "SOUTH_WEST":
    case "SOUTH_EAST":
        dx = 0;
        dy = 1;
        m = 2;
        break;
    case "WEST":
        dx = -1;
        dy = 0;
        m = 1;
        break;
    case "EAST":
        dx = 1;
        dy = 0;
        m = 0;
        break;
    default:
        context.error("Something is wrong!");
}

for (var c = 1; c <= count; c++) {

    var vec = new Vector(
        player.getBlockOn().x+dx*c,
        player.getBlockOn().y+c,
        player.getBlockOn().z+dy*c
    );

    blocks.setBlock(vec, context.getBlock('109:'+m));
}
