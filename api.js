var request = require('request')

class DictionaryAPI {

  constructor() { }

  testApi(word_id) {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v2/thesaurus/en-us/ace?fields=synonyms&strictMatch=true';
    let options = {
      url,
      headers: {
        'Accept': 'application/json',
        'app_id': '37d138bd',
        'app_key': '292ac72a4bd09cfbb9f1075065c20f70'
      }
    }
    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info)
      }
      else {
        if (error) console.log(error)
        else {
          console.log(response)
        }
      }
      return;
    })
  }
}

module.exports = DictionaryAPI;