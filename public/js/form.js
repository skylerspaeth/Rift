function submitHandler(event) {
    let formData = $('#form').serializeJSON();
    // event.preventDefault();
    // const socket = io();
    socket.emit('create', formData);
}