const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(newPath,path){
    fs.readFile(path,'utf8',(err,data)=> {
        if(newPath){
            if(err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        copyFile(newPath,data);
        }else{
            console.log(data);
        }
        
    })
}

async function webCat(newPath,path){
    try {
        let res = await axios.get(path);
        if(newPath){
            copyFile(newPath,res.data);
        }else{
            console.log(res.data);
        }  
    }catch(err){
        console.log(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}
// https://www.google.com/

function copyFile(newPath, data) {
    fs.writeFile(newPath, data, 'utf8',(err)=>{
    if(err){
        console.log(`Couldn't write ${newPath}: ${err}`);
        process.exit(1);
    } 
    console.log("Done!");
    })
}

let path;
let newPath;

if(process.argv[2] === '--out') {
    newPath = process.argv[3];
    path = process.argv[4];
}else{
    path = process.argv[2];
}

if (path.startsWith('http') === true) {
    webCat(newPath,path);
}else {
    cat(newPath,path);
}


