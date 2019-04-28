const Util = require('./util')
var randomWords = require('./randomWord')
const inquirer = require('inquirer')

exports.fetchSynonyms = (response, print) => {
  synonyms = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.synonyms) sense.synonyms.forEach(synonym => {
      synonyms.push(synonym.text)
    })
  })
  if(print){
    console.log('\n\nSynonyms:')
    console.log(synonyms.join())
  }
  return synonyms;  
}

exports.fetchAntonyms = (response, print) => {
  antonyms = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.antonyms) sense.antonyms.forEach(antonym => {
      antonyms.push(antonym.text)
    })
  })
  if(print){
    console.log('\n\nAntonyms:')
    console.log(antonyms.join())
  }
  return antonyms;  
}

exports.fetchDefinitions = (response, print) => {
  definitions = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.definitions) sense.definitions.forEach(definition => {
      definitions.push(definition)
    })
  })
  if(print){
    console.log('\n\nDefinitions:')
    console.log(definitions)
  }
  return definitions;  
}

exports.fetchExamples = (response, print) => {
  examples = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.examples) sense.examples.forEach(example => {
      examples.push(example.text)
    })
  })
  if(print){
    console.log('\n\nExamples:')
    console.log(examples)
  }
  return examples;  
}

exports.playGame = (randWord, correctWords, data, retry, changeHint, hint, fhint) => {
  maxRand = 3;
  if(retry) maxRand = 4;
  let rand = Math.floor(Math.random() * 3)
  if (changeHint) {
    if (rand == 0) {
      hint = randomWords.getRandomStringinArray(data["def"]); 
      fhint = 'Definition: ' + hint; 
    }
    else if (rand == 1) {
      hint = randomWords.getRandomStringinArray(data["syn"]);
      fhint = 'Synonym: ' + hint;
      //Remove the synonymn from possible answers
      var index = correctWords.indexOf(hint);
      if (index !== -1) {
        correctWords.splice(index, 1);
      }
      if (!correctWords.length) {
        console.log('You Loose!!')
        process.exit(0)
      }
    }
    else if (rand == 2){ 
      hint = randomWords.getRandomStringinArray(data["ant"]); 
      fhint = 'Antonym: ' + hint;
    }
    else {
      hint = randomWords.getRandomStringinArray(data["ant"]); 
      fhint = 'Jumbled: ' + hint;
    }
  }

  console.log(fhint)
  let questions = [
    {
      type: "input",
      name: "word",
      message: "Guess the word - "
    }
  ];
  inquirer.prompt(questions).then(function (answers) {
    var found = correctWords.find(function (element) {
      return element == answers.word;
    })
    if (found) {
      console.log('Correct!!!')
      process.exit(0)
    }
    else {
      inquirer.prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Wrong Answer!!?',
          choices: ['try again', 'hint', 'quit'],
          filter: function (val) {
            return val.toLowerCase();
          }
        }
      ])
        .then(answers => {
          if (answers.option === "try again") {
            Util.playGame( randWord, correctWords, data, true, false, hint, fhint)
          }
          else if (answers.option == "hint") {
            Util.playGame( randWord, correctWords, data, true, true, hint, fhint )
          }
          else {
            console.log('Bye...!!!')
            process.exit(0)
          }
        });
    }
  })
}

extractData = (response) => {
  senses = []
  if (response.results) response.results.forEach(result => {
    if (result.lexicalEntries) result.lexicalEntries.forEach(lexicalEntry => {
      if (lexicalEntry.entries) lexicalEntry.entries.forEach(entry => {
        if (entry.senses) senses.push(...entry.senses)
      })
    })
  })
  return senses
}