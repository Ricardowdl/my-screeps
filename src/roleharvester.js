/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

import { roleBuilder } from "./role.builder";

export const roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
            creep.say('🔄 去采矿');
	    }
	    if(!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvesting = true;
	        creep.say('🚧 运送');
	    }





        console.log(`creep.store.getFreeCapacity()${creep.store.getFreeCapacity()}`)
	    if(!creep.memory.harvesting) {
            var sources = creep.room.find(FIND_SOURCES);//资源地
            let resources = creep.room.find(FIND_DROPPED_RESOURCES,{
                filter: res => res.amount>40
            })//掉落资源
            // let resources2 = creep.room.find(FIND_DROPPED_RESOURCES)//掉落资源
            // console.log(`resources2 length${resources2.length}`)
            console.log(`resources length${resources.length}`)
            for(let val of resources){
                console.log(`捡东西目标${val.pos} ${val.amount}`)
            }
            if(resources.length > 0){
                console.log(`捡东西去啦${creep.pickup(resources[0])}`)
                if(creep.pickup(resources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                console.log('老老实实开资源')
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            
        }
        else {
            console.log('满了满了')
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER)
                         && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            // for(let val of targets){
            //     console.log(`${val.pos}${val.structureType}`)    
            // }
            console.log('targetslength'+targets.length)
            //targets[0]为spawn
            if(targets.length == 1) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: 'red'}});
                    console.log(`检查是不是contain,len=1,+${targets[0].pos}${targets[0].structureType}`)
                }
            }
            if(targets.length == 2) {
                if(creep.transfer(targets[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[1], {visualizePathStyle: {stroke: 'red'}});
                    console.log(`检查是不是spawn,len=1,+${targets[0].pos}${targets[0].structureType}`)
                }
            }
            if(targets.length > 2) {
                if(creep.transfer(targets[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[2], {visualizePathStyle: {stroke: 'red'}});
                    console.log(`检查是不是extension,len>2,+${targets[2].pos}${targets[2].structureType}`)
                }
            }
            if(targets.length == 0){
                var tower = creep.room.find(FIND_STRUCTURES,{
                    filter: { structureType: STRUCTURE_TOWER}
                })
                if(tower[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
                    if(creep.transfer(tower[0], RESOURCE_ENERGY)== ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower[0], {visualizePathStyle: {stroke: 'red'}});
                        console.log(`给炮塔充能${tower[0].pos}${tower[0].structureType}`)
                    }
                }
                if(tower.every((tow) => tow.store.getFreeCapacity(RESOURCE_ENERGY) == 0)){
                    console.log('搬运工没事干进入修东西')
                    roleBuilder.run(creep)
                }
            }
        }
	}
};