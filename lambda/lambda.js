'use strict';
const axios = require('axios');

const run = () => {
  return new Promise(async (resolve, reject) => {
    console.log('Lambda called');
    let comic = Math.random() > .5 ? 'https://www.gocomics.com/random/foxtrot' : 'https://www.gocomics.com/random/calvinandhobbes';
    let stuff = await axios.get(comic);
    const re = /"og:image" content="(?<url>.*)"/g;
    const url = re.exec(stuff.data).groups.url;
    //console.log(`Response: ${JSON.stringify(response, null, 2)}`);
    //console.log(response);

    const imageBase64 = await axios
    .get(url, { responseType: 'arraybuffer' })
    .then((response) => Buffer.from(response.data, 'binary').toString('base64'));
    console.log('Successful call');
    const response = {
      statusCode: 200,
      body: imageBase64
    };
    //console.log(imageBase64);
    return resolve(response);
  });
};

module.exports.handler = run;
