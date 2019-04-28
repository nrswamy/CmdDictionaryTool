var DictionaryAPI = require('./api')

var dict = new DictionaryAPI()
dict.getSynonyms('price')
  .then(response => {
    synonyms = []
    if (response.results) response.results.forEach(result => {
      if (result.lexicalEntries) result.lexicalEntries.forEach(lexicalEntry => {
        if (lexicalEntry.entries) lexicalEntry.entries.forEach(entry => {
          if (entry.senses) entry.senses.forEach(sense => {
            if (sense.synonyms) sense.synonyms.forEach(synonym => {
              synonyms.push(synonym.text)
            })
          })
        })
      })
    })
    console.log('\n\nSynonyms:')
    console.log(synonyms.join())
  })
  .catch(err => {
    console.log(err)
  })

dict.getAntonyms('price')
  .then(response => {
    antonyms = []
    if (response.results) response.results.forEach(result => {
      if (result.lexicalEntries) result.lexicalEntries.forEach(lexicalEntry => {
        if (lexicalEntry.entries) lexicalEntry.entries.forEach(entry => {
          if (entry.senses) entry.senses.forEach(sense => {
            if (sense.antonyms) sense.antonyms.forEach(antonym => {
              antonyms.push(antonym.text)
            })
          })
        })
      })
    })
    console.log('\n\nAntonyms:')
    console.log(antonyms.join())
  })
  .catch(err => {
    console.log(err)
  })

dict.getDefinitons('price')
  .then(response => {
    definitions = []
    if (response.results) response.results.forEach(result => {
      if (result.lexicalEntries) result.lexicalEntries.forEach(lexicalEntry => {
        if (lexicalEntry.entries) lexicalEntry.entries.forEach(entry => {
          if (entry.senses) entry.senses.forEach(sense => {
            if (sense.definitions) sense.definitions.forEach(definition => {
              definitions.push(definition)
            })
          })
        })
      })
    })
    console.log('\n\nDefinitions:')
    console.log(definitions)
  })
  .catch(err => {
    console.log(err)
  })

dict.getExamples('price')
  .then(response => {
    examples = []
    if (response.results) response.results.forEach(result => {
      if (result.lexicalEntries) result.lexicalEntries.forEach(lexicalEntry => {
        if (lexicalEntry.entries) lexicalEntry.entries.forEach(entry => {
          if (entry.senses) entry.senses.forEach(sense => {
            if (sense.examples) sense.examples.forEach(example => {
              examples.push(example.text)
            })
          })
        })
      })
    })
    console.log('\n\nExamples:')
    console.log(examples)
  })
  .catch(err => {
    console.log(err)
  })