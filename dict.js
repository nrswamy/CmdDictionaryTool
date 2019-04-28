var DictionaryAPI = require('./api')

var dict = new DictionaryAPI()
dict.getSynonyms('price')
  .then(response => {
    printSynonyms(response)
  })
  .catch(err => {
    console.log(err)
  })

dict.getAntonyms('price')
  .then(response => {
    printAntonyms(response)
  })
  .catch(err => {
    console.log(err)
  })

dict.getDefinitons('price')
  .then(response => {
    printDefinitions(response)
  })
  .catch(err => {
    console.log(err)
  })

dict.getExamples('price')
  .then(response => {
    printExamples(response)
  })
  .catch(err => {
    console.log(err)
  })

dict.getFullDictionary('price')
  .then(response => {
    printDefinitions(response.defsAndExs)
    printSynonyms(response.synonyms)
    printAntonyms(response.antonyms)
    printExamples(response.defsAndExs)
  })
  .catch(err => {
    console.log(err)
  })

printSynonyms = (response) => {
  synonyms = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.synonyms) sense.synonyms.forEach(synonym => {
      synonyms.push(synonym.text)
    })
  })
  console.log('\n\nSynonyms:')
  console.log(synonyms.join())
}

printAntonyms = (response) => {
  antonyms = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.antonyms) sense.antonyms.forEach(antonym => {
      antonyms.push(antonym.text)
    })
  })
  console.log('\n\nAntonyms:')
  console.log(antonyms.join())
}

printDefinitions = (response) => {
  definitions = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.definitions) sense.definitions.forEach(definition => {
      definitions.push(definition)
    })
  })
  console.log('\n\nDefinitions:')
  console.log(definitions)
}

printExamples = (response) => {
  examples = []
  let senses = extractData(response)
  if (senses) senses.forEach(sense => {
    if (sense.examples) sense.examples.forEach(example => {
      examples.push(example.text)
    })
  })
  console.log('\n\nExamples:')
  console.log(examples)
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