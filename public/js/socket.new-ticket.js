const socket = io();

let label = $("#lblNewTicket"); // Label Element

socket.on("connect", () => {
  console.log("Server Connected");
  socket.on("actualState", (message) => {
    // Show Last Ticket Created
    label.text(`Ticket ${message.last}`);
  });
});

socket.on("disconnect", () => {
  console.log("Server Disconnected");
});

$(".btn-lg").on("click", function () {
  socket.emit("nextTicket", null, function (ticket) {
    // Create A Next Ticket And Show On Screen
    label.text(`${ticket}`);
  });
});
