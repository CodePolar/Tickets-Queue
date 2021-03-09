// Comando para establecer la conexión
var socket = io();

var lblTicket1 = $("#lblTicket1");
var lblTicket2 = $("#lblTicket2");
var lblTicket3 = $("#lblTicket3");
var lblTicket4 = $("#lblTicket4");

var desktop1 = $("#desktop1");
var desktop2 = $("#desktop2");
var desktop3 = $("#desktop3");
var desktop4 = $("#desktop4");

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var Desktops = [desktop1, desktop2, desktop3, desktop4];

socket.on("actualState", function (data) {
  // console.log(data);
  updateHTML(data.lastFour);
});

socket.on("lastFour", function (data) {
  // console.log(data);

  var audio = new Audio("audio/new-ticket.mp3");
  audio.play();

  updateHTML(data.lastFour);
});

function updateHTML(lastFour) {
  for (var i = 0; i <= lastFour.length - 1; i++) {
    lblTickets[i].text(`Ticket ${lastFour[i].number}`);
    Desktops[i].html(`Desktop <i class="bi bi-tv"></i> ${lastFour[i].desktop}`);
  }
}
