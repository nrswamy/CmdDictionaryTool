var DictionaryAPI = require('./api')
const program = require('commander')
const Util = require('./util')
var randomWords = require('./randomWord')

var dict = new DictionaryAPI()

program
  .version('0.0.1')
  .option('syn, --syn <word>', 'get Synonyms of word')
  .option('def, --def <word>', 'get Definitions of word')
  .option('ant, --ant <word>', 'get Antonyms of word')
  .option('ex, --ex <word>', 'get Examples of word')
  .option('dict, --dict <word>', 'get Dictionaries of word')
  .option('play, --play', 'play game')
  .parse(process.argv)

//  console.log(cmdValue)
if(program.syn) {
  dict.getSynonyms(program.syn)
  .then(response => {
    Util.printSynonyms(response)
  })
  .catch(err => {
    console.log(err)
  })
}
else if(program.ant) {
  dict.getAntonyms(program.ant)
  .then(response => {
    Util.printAntonyms(response)
  })
  .catch(err => {
    console.log(err)
  })
}
else if(program.def) {
  dict.getDefinitons(program.def)
  .then(response => {
    Util.printDefinitions(response)
  })
  .catch(err => {
    console.log(err)
  })
}
else if(program.ex) {
  dict.getExamples(program.ex)
  .then(response => {
    Util.printExamples(response)
  })
  .catch(err => {
    console.log(err)
  })
}
else if(program.dict) {
  dict.getFullDictionary(program.dict)
  .then(response => {
    Util.printDefinitions(response.defsAndExs)
    Util.printSynonyms(response.synonyms)
    Util.printAntonyms(response.antonyms)
    Util.printExamples(response.defsAndExs)
  })
  .catch(err => {
    console.log(err)
  })
}
else if(program.play) {
  console.log('play')
  console.log(randomWords.getRandomWord())
}
else {
  
}