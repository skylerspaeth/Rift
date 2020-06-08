function submitHandler(event) {
  let formData = $('#form').serializeJSON();
  // event.preventDefault();
  // const socket = io();
  formData.type = "rift";
  socket.emit('create', formData);
  let url = `http://skylerspaeth.com:3000/_/${formData.title}`;
  window.location.href = url;
}

function newUser() {
  socket.emit('create', { type: "user" });
  alert('Done');
}

function newPost() {
  socket.emit('create', { type: "post"});
  alert('Post Submited');
}