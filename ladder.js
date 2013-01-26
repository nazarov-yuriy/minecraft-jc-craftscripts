/**
 * Created with JetBrains WebStorm.
 * User: firefish
 * Date: 27/01/13
 * Time: 00:38
 */

importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

var blocks = context.remember();
var session = context.getSession();
var player = context.getPlayer();

context.checkArgs(1, 1, "<count>");

var count =  parseInt(argv[1]);

context.print(player.getCardinalDirection());

var dx = 1;
var dy = 1;
var m = 0;
if(player.getCardinalDirection() == 'NORTH'){
    dx = 0;
    dy = -1;
    m = 3;
    context.print("tp1");
}
if(player.getCardinalDirection() == 'WEST'){
    dx = -1;
    dy = 0;
    m = 1;
    context.print("tp2");
}
if(player.getCardinalDirection() == 'SOUTH'){
    dx = 0;
    dy = 1;
    m = 2;
    context.print("tp3");
}
if(player.getCardinalDirection() == 'EAST'){
    dx = 1;
    dy = 0;
    m = 0;
    context.print("tp4");
}

for (var c = 1; c <= count; c++) {

    var vec = new Vector(
        player.getBlockOn().x+dx*c,
        player.getBlockOn().y+c,
        player.getBlockOn().z+dy*c
    );

    blocks.setBlock(vec, context.getBlock('109:'+m));
}
