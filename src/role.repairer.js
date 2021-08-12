/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

export const roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
      console.log('xxxxxxxxxxxxxxx')
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => (object.hits < 5000 && object.structureType == STRUCTURE_ROAD) ||
        (object.hits < 500000 && object.structureType == STRUCTURE_WALL) ||
        (object.hits < 5000 && object.structureType == STRUCTURE_CONTAINER) 
      });
      console.log(`repairer tag ${targets.length}`)
      // for(val of targets){
      //  console.log(val.pos) 
      // }
	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🔨repairing');
	    }

	    if(creep.memory.repairing) {
        console.log('修东西去啦')
        if(targets.length > 0) {
          console.log('修的目标是'+targets[0].pos+targets[0].structureType)
          if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0]);
          }
        }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#DC143C'}});
            }
	    }
	}
};
