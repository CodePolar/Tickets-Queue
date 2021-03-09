const socket = io();

let btn = $("#reset");

btn.on("click", function () {
  socket.emit("resetTickets", function () {});
});
