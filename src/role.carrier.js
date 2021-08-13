/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

import { errorMapper } from "./modules/errorMapper";
import { roleHarvester } from "./roleharvester";

export const roleCarrier = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.store.getFreeCapacity() > 0) {
        let contains = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
              return (structure.structureType == STRUCTURE_CONTAINER)
                && structure.store.getCapacity(RESOURCE_ENERGY) > 0;
          }
        });
        if(contains.length > 0 ){
          console.log(`carrier去找container里拿资源了${contains[0].pos}${contains[0].structureType}`)
          if(creep.withdraw(contains[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(contains[0]);
          }
        }else{
          console.log(`别干活了 原地等着吧`)
          //roleHarvester.run(creep);
        }
      }
      else {
          console.log('carrier满了满了，去运送')
          var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER)
                  && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
          });
          // for(let val of targets){
          //     console.log(`${val.pos}${val.structureType}`)    
          // }
          if(targets.length > 0){
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'red'}});
              console.log(`carrier运送目标+${targets[0].pos}${targets[0].structureType}`)
            }
          }else{
            throw new Error(creep.transfer(targets[0], RESOURCE_ENERGY))
          }
      }
}
};