#!/usr/bin/env node

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
  .option('dict, --dict <word>', 'get full Dictionary of word')
  .option('play, --play', 'play game')
  .option('./dict', 'get full dictionary for Word of the Day')
  .parse(process.argv)

//  console.log(cmdValue)
printProgressDot = () => { process.stdout.write("."); }

if (program.syn) {
  process.stdout.write("Fetching data from oxforddictionaries API.");
  var interval = setInterval(printProgressDot, 1000);
  dict.getSynonyms(program.syn)
    .then(response => {
      clearProcessing(interval)
      Util.fetchSynonyms(response, true)
    })
    .catch(err => {
      clearProcessing(interval)
      console.log(err)
    })
}
else if (program.ant) {
  process.stdout.write("Fetching data from oxforddictionaries API.");
  var interval = setInterval(printProgressDot, 1000);
  dict.getAntonyms(program.ant)
    .then(response => {
      clearProcessing(interval)
      Util.fetchAntonyms(response, true)
    })
    .catch(err => {
      clearProcessing(interval)
      console.log(err)
    })
}
else if (program.def) {
  process.stdout.write("Fetching data from oxforddictionaries API.");
  var interval = setInterval(printProgressDot, 1000);
  dict.getDefinitons(program.def)
    .then(response => {
      clearProcessing(interval)
      Util.fetchDefinitions(response, true)
    })
    .catch(err => {
      clearProcessing(interval)
      console.log(err)
    })
}
else if (program.ex) {
  process.stdout.write("Fetching data from oxforddictionaries API.");
  var interval = setInterval(printProgressDot, 1000);
  dict.getExamples(program.ex)
    .then(response => {
      clearProcessing(interval)
      Util.fetchExamples(response, true)
    })
    .catch(err => {
      clearProcessing(interval)
      console.log(err)
    })
}
else if (program.dict) {
  process.stdout.write("Fetching data from oxforddictionaries API.");
  var interval = setInterval(printProgressDot, 1000);
  dict.getFullDictionary(program.dict)
    .then(response => {
      clearProcessing(interval)
      Util.fetchDefinitions(response.defsAndExs, true)
      Util.fetchSynonyms(response.synonyms, true)
      Util.fetchAntonyms(response.antonyms, true)
      Util.fetchExamples(response.defsAndExs, true)
    })
    .catch(err => {
      clearProcessing(interval)
      console.log(err)
    })
}
else if (program.play) {
  let randWord = randomWords.getRandomWord()
  process.stdout.write("Fetching data from oxforddictionaries API.");
  var interval = setInterval(printProgressDot, 1000);
  dict.getFullDictionary(program.dict)
    .then(response => {
      clearProcessing(interval)
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
      clearProcessing(interval)
      console.log(err)
    })
}
else {
  var args = process.argv.slice(2)
  if(!args.length) {
    let wod = randomWords.getWordOfTheDay()
    process.stdout.write("Fetching data from oxforddictionaries API.");
    var interval = setInterval(printProgressDot, 1000);
    dict.getFullDictionary(wod)
    .then(response => {
      clearProcessing(interval)
      Util.fetchDefinitions(response.defsAndExs, true)
      Util.fetchSynonyms(response.synonyms, true)
      Util.fetchAntonyms(response.antonyms, true)
      Util.fetchExamples(response.defsAndExs, true)
    })
    .catch(err => {
      clearProcessing(interval)
      console.log(err)
    })
  }
  else {
    console.log('Wrong Input!!')    
  }
}

clearProcessing = (handle) => {
  if(handle) clearInterval(handle)
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
}
