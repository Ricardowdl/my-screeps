/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

export const  roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.updating && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.updating = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.updating && creep.store.getFreeCapacity() == 0){
            creep.memory.updating = true;
            creep.say('😨update');
        }

        if(creep.memory.updating) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#7FFF00'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            
        }
	}
};

