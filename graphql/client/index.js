const axios = require('axios');

axios({
  url: 'http://localhost:5002/graphql',
  method: 'post',
  data: {
    query: `
    {
      user(id: 172) {
        id
        first_name
        messages {
          id
          userId
          text
        }
      }
    }
      `,
  },
}).then((result) => {
  console.log(result.data);
});
