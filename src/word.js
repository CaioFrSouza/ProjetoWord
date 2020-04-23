const fs     = require('fs')
const officegen = require('officegen')

const state  = require('./state')
const date   = new Date()

const word = async() => {
    const year     = date.getFullYear()
    const dados    = await state.load('./.config/dados.json')
    const quest    = await state.load('./.config/quest.json')
    const pesquisa = await state.load('./content.json')
    let docx  =  officegen ({
        type : 'docx',
        pageSize : 'A4',
        pageMargins :{ top: '3cm' , right: '2cm', bottom: '2cm', left: '3cm' }
    })

    const QuebraDeLinhaEmMasss = (n) => {
        for (let i = 0;i<n ; i++){
            pObj.addLineBreak()
        }}

    let pObj = docx.createP ()
    let pObj1 = docx.createP ()
    const centerArial = {
        align : 'center',
        font_face : 'Arial',
        font_size : 12,
    }
    const justifyArial = {
        align : 'center',
        font_face : 'Arial',
        font_size : 12,
    }
  
    pObj.options.align = 'center'
    pObj.addText(dados.inst,{align : 'center',font_face : 'Arial',font_size : 12,bold:true})
    QuebraDeLinhaEmMasss(4)
    pObj.addText('Trabalho de '+quest.articleName, centerArial)
    pObj.addLineBreak()
    pObj.addText('Nome: '+dados.nome, centerArial )
    pObj.addLineBreak()
    pObj.addText('Nº '+dados.numero+' Série: '+dados.serie,centerArial)
    QuebraDeLinhaEmMasss(35)
    pObj.addText('São Paulo',centerArial)
    pObj.addLineBreak()
    pObj.addText(''+year,centerArial)
    pObj.addLineBreak()
    pObj1.options.align = 'justify'
    pObj1.addText(''+pesquisa.result,justifyArial)
    let out = fs.createWriteStream('Trabalho.docx')

out.on('error', function(err) {
    console.log(err)
  })

docx.generate(out)
}

module.exports = {
    word
}