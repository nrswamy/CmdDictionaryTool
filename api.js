const https = require('https');
var config = require('./config').oxfordDict
var request = require('request');

class DictionaryAPI {
  
  constructor() {
    this.options = {
      url : '',
      headers: {
        'Accept': 'application/json',
        'app_id': config.appId,
        'app_key': config.apiKey
      }
    }
  }

  getResponseFromOxford(url) {
    return new Promise((resolve, reject)=> {
      this.options.url = url;
      // let res = require('./response.json')   
      // resolve(res)
      request(this.options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          resolve(info)
        }
        else {
          if(error) reject(error)
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

}

module.exports = DictionaryAPI;