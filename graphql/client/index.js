const axios = require('axios');

axios({
  url: 'http://localhost:5002/graphql',
  method: 'post',
  data: {
    query: `
    {
      article(id: 2) {
        name
        topic
        date
        contributorId
        contributor {
          name
          articles {
            name
          }
        }
      }
    }
      `,
  },
}).then((result) => {
  console.log(result.data);
});
