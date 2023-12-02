const path = require('path')

const cluster = require('cluster')
const os = require('os')

function clusterMaster(){
    const cpus = os.cpus().length * 2
    
    //console.log(`Primary ${process.pid} is running`)
    //console.log(`Fork ${cpus}`)

    for(let i=0; i < cpus; i++){
        cluster.fork()
    }

    cluster.on('exit',(worker, code, signal)=>{
        if(code !== 0  &&  !worker.exitedAfterDisconnect){
            cluster.fork()
        }
    })
}

async function clusterSlave(){
    await require('./src/server')
}

cluster.isMaster ? clusterMaster(): clusterSlave()

