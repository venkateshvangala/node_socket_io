const currentUsers = [];

// joins the user to the specific chatroom
function joinUser(id, username, room) {
  const user = { id, username, room };
  currentUsers.push(user);
  console.log(currentUsers, "users");
  return user;
}

console.log("user out", currentUsers);

// Gets a particular user id to return the current user
function getCurrentUser(id) {
  return currentUsers.find((user) => user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function userDisconnect(id) {
  const index = currentUsers.findIndex((user) => user.id === id);
  if (index !== -1) {
    return currentUsers.splice(index, 1)[0];
  }
}

module.exports = {
  joinUser,
  getCurrentUser,
  userDisconnect,
};
