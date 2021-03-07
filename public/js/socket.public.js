// Conexion Starts
const socket = io();

let ticketOne = $("#lblTicket1");
let ticketTwo = $("#lblTicket2");
let ticketThree = $("#lblTicket3");
let ticketFour = $("#lblTicket4");
let desktopOne = $("#desktop1");
let desktopTwo = $("#desktop2");
let desktopThree = $("#desktop3");
let desktopFour = $("#desktop4");

let desktopArray = [desktopOne, desktopTwo, desktopThree, desktopFour];
let ticketArray = [ticketOne, ticketTwo, ticketThree, ticketFour];

socket.on("actualState", function (message) {
  fourLoop(message);
});

socket.on("lastFour", function (message) {
  let audio = new Audio("audio/new-ticket.mp3");
  audio.play();
  fourLoop(message);
});

function fourLoop({ lastFour }) {
  for (let i = 0; i < lastFour.length; i++) {
    desktopArray[i].text(`Desktop ${lastFour[i].desktop}`);
    ticketArray[i].text(`Ticket ${lastFour[i].number}`);
  }
}
