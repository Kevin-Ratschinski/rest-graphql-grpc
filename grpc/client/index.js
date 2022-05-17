const client = require('./client');

// add a user
client.addUser(
  {
    first_name: 'first name',
    last_name: 'last name',
    email: 'email@email.com',
  },
  (error, user) => {
    if (error) throw error;
    console.log('Successfully added a user.');
  }
);

// edit a User
client.editUser(
  {
    id: 2,
    first_name: 'edit first name',
    last_name: 'edit last name',
    email: 'edit@email.com',
  },
  (error, user) => {
    if (error) throw error;
    console.log('Successfully edited a user.');
  }
);

// delete a user
client.deleteUser(
  {
    id: 3,
  },
  (error, user) => {
    if (error) throw error;
    console.log('Successfully deleted a user.');
  }
);

client.getUser(
  {
    id: 1,
  },
  (error, user) => {
    if (error) {
      console.log(error);
    } else {
      console.log(user);
    }
  }
);

client.getAllUsers({}, (error, users) => {
  if (error) {
    console.log(error);
  } else {
    //console.log(users);
  }
});

// add a message
client.addMessage(
  {
    text: 'Lorem Ipsum',
    userId: 3,
  },
  (error, message) => {
    if (error) throw error;
    console.log('Successfully added a message.');
  }
);

// edit a Message
client.editMessage(
  {
    id: 2,
    text: 'Edit Lorem Ipsum',
    userId: 3,
  },
  (error, message) => {
    if (error) throw error;
    console.log('Successfully edited a message.');
  }
);

// delete a message
client.deleteMessage(
  {
    id: 3,
  },
  (error, message) => {
    if (error) throw error;
    console.log('Successfully deleted a message.');
  }
);

client.getMessage(
  {
    id: 1,
  },
  (error, message) => {
    if (error) {
      console.log(error);
    } else {
      console.log(message);
    }
  }
);

client.getUserMessages(
  {
    id: 172,
  },
  (error, messages) => {
    if (error) {
      console.log(error);
    } else {
      console.log(messages);
    }
  }
);

client.getAllMessages({}, (error, messages) => {
  if (error) {
    console.log(error);
  } else {
    //console.log(users);
  }
});
