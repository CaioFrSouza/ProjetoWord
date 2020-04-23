const readline = require('readline')
const rl = readline.createInterface ({
    input:process.stdin,
    output:process.stdout
})
const state = require('./state')
const word  = require('./word')
const wiki  = require('./wiki')
async function ini (){
    console.clear()
console.log('Bem vindo a esse sistema')
console.log('criador: Caio Caik Fresneda De Souza')
console.log('Primeiro digite o seu nome: ')
var name , n, s,i
rl.question('>', resposta => {
    name = resposta
    console.log('Otimo',resposta,'agora digite o seu número da chamada')
    rl.question('>', resposta => {
        n = resposta
        console.log('Otimo','agora digite a sua série')
        rl.question('>', resposta => {
            s = resposta
            console.log('Agora digite o nome da instituiçao ')
            rl.question('>',resposta => {
                i=resposta
           res =  {
                inst   : i,
                nome   : name,
                numero : n,
                serie  : s
            }

            state.save(res,'.config/dados.json')

            setTimeout(() => {
                console.table(res)
                console.log('Perfeito',name,'!!!!!','agora quero que voce me diga qual a busca que eu tenho que fazer no wikipédia')
                rl.question('>', resposta => {
                    state.save({
                        "articleName": String(resposta),
                        "lang": "pt"
                    },'.config/quest.json')
                    wiki.robot(state.load('.config/quest.json'))
                })
            }, 100);
        })
    })})
})}
module.exports = {ini}
