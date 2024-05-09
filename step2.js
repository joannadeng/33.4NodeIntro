const fs = require('fs')
const process = require('process')
const axios = require('axios')

function cat(path){
    fs.readFile(path,'utf8',(err,data)=> {
        if(err){
            console.log(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        console.log(data)
    })
}

// cat(process.argv[2])

async function webCat(path){
    try {
        let res = await axios.get(path)
        console.log(res.data)
    }catch(err){
        console.log(`Error fetching ${path}: 
        Error: Request failed with status code 404`)
        process.exit(1)
    }
}

// webCat(process.argv[2])

let path = process.argv[2]
if (path.startsWith('http') === true) {
    webCat(path)
}else {
    cat(path)
}

// https://www.google.com/