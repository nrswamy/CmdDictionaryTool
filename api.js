const https = require('https');
var config = require('./config').oxfordDict
var request = require('request');

class DictionaryAPI {

  constructor() {
    this.options = {
      url: '',
      headers: {
        'Accept': 'application/json',
        'app_id': config.appId,
        'app_key': config.apiKey
      }
    }
  }

  getResponseFromOxford(url) {
    return new Promise((resolve, reject) => {
      this.options.url = url;
      // let res = require('./response.json')
      // // console.log(res)
      // return resolve(res)
      request(this.options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          resolve(info)
        }
        else {
          if (error) reject(error)
          else {
            reject(new Error("Internal error"))
          }
        }
      })
    })
  }

  getDefinitons(word_id) {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v2/entries/' + config.language_code + '/' + word_id + '?strictMatch=true';
    return this.getResponseFromOxford(url)
  }

  getSynonyms(word_id) {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v2/thesaurus/' + config.language_code + '/' + word_id + '?fields=synonyms&strictMatch=true';
    return this.getResponseFromOxford(url)
  }

  getAntonyms(word_id) {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v2/thesaurus/' + config.language_code + '/' + word_id + '?fields=antonyms&strictMatch=true';
    return this.getResponseFromOxford(url)
  }

  getExamples(word_id) {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v2/entries/' + config.language_code + '/' + word_id + '?strictMatch=true';
    return this.getResponseFromOxford(url)
  }

  getFullDictionary(word_id) {
    let completeData = {}
    return new Promise((resolve, reject) => {
      let url = 'https://od-api.oxforddictionaries.com:443/api/v2/thesaurus/' + config.language_code + '/' + word_id + '?fields=synonyms&strictMatch=true';
      return this.getResponseFromOxford(url)
        .then(response => {
          completeData["synonyms"] = response
          url = 'https://od-api.oxforddictionaries.com:443/api/v2/thesaurus/' + config.language_code + '/' + word_id + '?fields=antonyms&strictMatch=true';
          return this.getResponseFromOxford(url)
        })
        .then(response => {
          completeData["antonyms"] = response
          url = 'https://od-api.oxforddictionaries.com:443/api/v2/entries/' + config.language_code + '/' + word_id + '?strictMatch=true';
          return this.getResponseFromOxford(url)
        })
        .then(response => {
          completeData["defsAndExs"] = response
          return resolve(completeData)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

module.exports = DictionaryAPI;