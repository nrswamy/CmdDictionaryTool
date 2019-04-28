var DictionaryAPI = require('./api')
const program = require('commander')
const Util = require('./util')
var randomWords = require('./randomWord')
const inquirer = require('inquirer')

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
if (program.syn) {
  dict.getSynonyms(program.syn)
    .then(response => {
      Util.fetchSynonyms(response, true)
    })
    .catch(err => {
      console.log(err)
    })
}
else if (program.ant) {
  dict.getAntonyms(program.ant)
    .then(response => {
      Util.fetchAntonyms(response, true)
    })
    .catch(err => {
      console.log(err)
    })
}
else if (program.def) {
  dict.getDefinitons(program.def)
    .then(response => {
      Util.fetchDefinitions(response, true)
    })
    .catch(err => {
      console.log(err)
    })
}
else if (program.ex) {
  dict.getExamples(program.ex)
    .then(response => {
      Util.fetchExamples(response, true)
    })
    .catch(err => {
      console.log(err)
    })
}
else if (program.dict) {
  dict.getFullDictionary(program.dict)
    .then(response => {
      Util.fetchDefinitions(response.defsAndExs, true)
      Util.fetchSynonyms(response.synonyms, true)
      Util.fetchAntonyms(response.antonyms, true)
      Util.fetchExamples(response.defsAndExs, true)
    })
    .catch(err => {
      console.log(err)
    })
}
else if (program.play) {
  let randWord = randomWords.getRandomWord()
  dict.getFullDictionary(program.dict)
    .then(response => {
      let data = {}
      var correctWords = []
      data["def"] = Util.fetchDefinitions(response.defsAndExs)
      data["syn"] = Util.fetchSynonyms(response.synonyms)
      data["ant"] = Util.fetchAntonyms(response.antonyms)
      correctWords.push(...data["syn"])
      correctWords.push(randWord)
      Util.playGame( randWord, correctWords, data, false, true, '', '' )
    })
    .catch(err => {
      console.log(err)
    })
}
else {
  console.log('Wrong command')
}
