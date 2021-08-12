import { errorMapper } from './modules/errorMapper'
import { sayHello } from './modules/utils'
import {roleHarvester} from "./roleharvester"
import {roleUpgrader} from "./role.upgrader"
import {roleBuilder} from "./role.builder"
import {roleRepairer} from "./role.repairer"
import {roleCarrier} from "./role.carrier"
import {Tower_action} from "./Tower"

export const loop = errorMapper( function () {
    // sayHello()
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep1 memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 5) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('builders: ' + builders.length);

    if(builders.length < 2) {
        var newName = 'builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName, 
            {memory: {role: 'builder'}});        
    }

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('upgraders: ' + upgraders.length);

    if(upgraders.length < 4) {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE], newName, 
            {memory: {role: 'upgrader'}});        
    }


    let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    console.log('carriers: ' + carriers.length);

    if(carriers.length < 1) {
        var newName = 'carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
            {memory: {role: 'carrier'}});        
    }
    

    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            // roleBuilder.run(creep);
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            let tag = creep.room.find(FIND_CONSTRUCTION_SITES)
            if(tag.length){
                roleBuilder.run(creep);
            }else{
                roleRepairer.run(creep);
            }
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    }

    //炮塔行动
    let tower = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES,{
        filter: { structureType: STRUCTURE_TOWER}
    })
    Tower_action.run(tower[0])
    console.log(`炮塔找到${tower[0].pos}${tower[0].structureType}`)
})