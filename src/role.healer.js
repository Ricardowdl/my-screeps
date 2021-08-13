/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

import { errorMapper } from "./modules/errorMapper";

export const roleHealer = {

  /** @param {Creep} creep **/
  run: function(creep) {
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter: function(object) {
          return object.hits < object.hitsMax;
      }
    });
    if(target) {
      console.log(`冲去治疗！${target}`)
        if(creep.heal(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
  }
};