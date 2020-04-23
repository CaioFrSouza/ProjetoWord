const fs = require('fs')

async function save (content,c) {
    // console.table(content)
json = JSON.stringify(content)
return fs.writeFileSync(c,json)
}  
async function load (c){
    json = fs.readFileSync(c,'utf-8')
    object = JSON.parse(json)
    return object
}

module.exports = {
    save,load
}