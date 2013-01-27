/**
 * Author: Yuriy Nazarov
 */

importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);

var blocks = context.remember();
var player = context.getPlayer();

function placeLine(from, to, blocktype){
    if(from.x != to.x && from.z == to.z){
        for(x=Math.min(from.x, to.x); x<=Math.max(from.x, to.x); x++){
            var vec = new Vector(x, from.y, from.z);
            blocks.setBlock(vec, context.getBlock(blocktype));
        }
    }else if(from.z != to.z && from.x == to.x){
        for(z=Math.min(from.z, to.z); z<=Math.max(from.z, to.z); z++){
            var vec = new Vector(from.x, from.y, z);
            blocks.setBlock(vec, context.getBlock(blocktype));
        }
    }else if(from.z != to.z && from.x != to.x && Math.abs(to.x-from.x) == Math.abs(to.z-from.z)){
        if( (to.x-from.x) == (to.z-from.z) ){

            for(dxz=0; dxz<=Math.abs(to.x-from.x); dxz++){
                var vec = new Vector(Math.min(from.x, to.x) + dxz, from.y, Math.min(from.z, to.z) + dxz);
                blocks.setBlock(vec, context.getBlock(blocktype));
            }

        }else{

            for(dxz=0; dxz<=Math.abs(to.x-from.x); dxz++){
                var vec = new Vector(Math.min(from.x, to.x) + dxz, from.y, Math.max(from.z, to.z) - dxz);
                blocks.setBlock(vec, context.getBlock(blocktype));
            }

        }
    }else{
        context.error("LineError");
    }

}

function placeLayer(from, line, diag){
    var d = diag+1;
    var dl = diag+1+line+1;
    var dld= diag+1+line+1+diag+1;

    //glass

    var fvec = new Vector(from.x+1+d, from.y, from.z);
    var tvec = new Vector(from.x+dl, from.y, from.z);
    placeLine(fvec, tvec, 'glass');

    var fvec = new Vector(from.x, from.y, from.z+1+d);
    var tvec = new Vector(from.x, from.y, from.z+dl);
    placeLine(fvec, tvec, 'glass');

    var fvec = new Vector(from.x+1+d, from.y, from.z+dld);
    var tvec = new Vector(from.x+dl, from.y, from.z+dld);
    placeLine(fvec, tvec, 'glass');

    var fvec = new Vector(from.x+dld, from.y, from.z+1+d);
    var tvec = new Vector(from.x+dld, from.y, from.z+dl);
    placeLine(fvec, tvec, 'glass');

    //glass diag

    var fvec = new Vector(from.x+d, from.y, from.z);
    var tvec = new Vector(from.x, from.y, from.z+d);
    placeLine(fvec, tvec, 'glass');

    var fvec = new Vector(from.x+dl, from.y, from.z);
    var tvec = new Vector(from.x+dld, from.y, from.z+d);
    placeLine(fvec, tvec, 'glass');

    var fvec = new Vector(from.x, from.y, from.z+dl);
    var tvec = new Vector(from.x+d, from.y, from.z+dld);
    placeLine(fvec, tvec, 'glass');

    var fvec = new Vector(from.x+dld, from.y, from.z+dl);
    var tvec = new Vector(from.x+dl, from.y, from.z+dld);
    placeLine(fvec, tvec, 'glass');

    //lazurit. Clockwise.

    var vec = new Vector(from.x+d, from.y, from.z);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x+dl, from.y, from.z);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x+dld, from.y, from.z+d);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x+dld, from.y, from.z+dl);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x+dl, from.y, from.z+dld);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x+d, from.y, from.z+dld);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x, from.y, from.z+dl);
    blocks.setBlock(vec, context.getBlock(22));

    var vec = new Vector(from.x, from.y, from.z+d);
    blocks.setBlock(vec, context.getBlock(22));

    //
}

var layers = new Array(
    {h: 4, l:22, d:0},
    {h: 4, l:24, d:-1},
    {h: 5, l:22, d:0},
    {h: 5, l:20, d:1},
    {h: 5, l:18, d:2},
    {h: 6, l:16, d:3},
    {h: 6, l:14, d:4},
    {h: 6, l:12, d:5},
    {h: 7, l:10, d:6},
    {h: 7, l:8,  d:7},
    {h: 7, l:6,  d:8},
    {h: 8, l:4,  d:9},
    {h: 8, l:2,  d:10}
);
var height = 0;
for (var l = 0; l < layers.length; l++) {
    for ( var i = 0; i<layers[l].h; i++){
        var vec = new Vector(
            player.getBlockOn().x+1,
            player.getBlockOn().y+1+height,
            player.getBlockOn().z+1
        );
        placeLayer(vec, layers[l].l, layers[l].d);
        height++;
    }
}