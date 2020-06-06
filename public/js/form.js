function submitHandler(event) {
    let formData = $('#form').serializeJSON();
    // event.preventDefault();
    // const socket = io();
    socket.emit('create', formData);
    let url = `http://skylerspaeth.com:3000/_/${formData.title}`;
    window.location.href = url;
}
