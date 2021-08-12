/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('Tower');
 * mod.thing == 'a thing'; // true
 */

export const Tower_action = {

  /** @param {Tower} tower **/
  run: function(tower) {
    console.log('towertowertower')
    let targets = tower.room.find(FIND_STRUCTURES, {
      filter: object => (object.hits < 5000 && object.structureType == STRUCTURE_ROAD) ||
      (object.hits < 500000 && object.structureType == STRUCTURE_WALL) ||
      (object.hits < 5000 && object.structureType == STRUCTURE_CONTAINER) 
    });

    console.log(`塔修点东西 tag ${targets.length}----塔能量${tower.store[RESOURCE_ENERGY]}`)
    if(targets.length > 0 && tower.store[RESOURCE_ENERGY] > 200) {
      console.log('修的目标是'+targets[0].pos+targets[0].structureType)
      tower.repair(targets[0])
    }
  }
}
