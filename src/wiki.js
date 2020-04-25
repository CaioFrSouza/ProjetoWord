const apiKey      = require('../.config/apikey.json').apikey
const state       = require('./state')
const Algorithmia = require('algorithmia')
const word        = require('./word')
 const  robot = async (pesquisa) =>{
   const quest = await state.load('.config/quest.json')
      Algorithmia.client(apiKey)
        .algo("web/WikipediaParser/0.1.2?timeout=300") // timeout is optional
        .pipe(quest)
        .then(async function(output) {
          setTimeout(() => {
            console.log(output)
             texto = output.result.content
             semLinhasBrancas =   removeBlankLinesAndMarkdown(String(texto))
             semDatasEmParentes  = removeDatesInParentheses(semLinhasBrancas)
             state.save({result:semDatasEmParentes},'./content.json')

             if(output != undefined){
              console.log('>Pesquisa Feita Com Sucesso ;)')
              setTimeout(() => {
                console.log('> criando arquivo no word...')
              }, 1000);
              word.word()
             }
              
            },1000);})
}
function removeBlankLinesAndMarkdown(text) {
    const allLines = text.split('\n')

    const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
      if (line.trim().length === 0 || line.trim().startsWith('=')) {
        return false
      }

      return true
    })

    return withoutBlankLinesAndMarkdown.join(' ')
  }


function removeDatesInParentheses(text) {
  return String(text).replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
}

module.exports = {
robot
}