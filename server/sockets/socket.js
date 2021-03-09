const { io } = require("../server");
const { TicketControl } = require("../classes/control-ticket");
const ticketControl = new TicketControl();

io.on("connection", (client) => {
  client.on("nextTicket", (message, callback) => {
    let lastTicket = ticketControl.nextTicket();
    console.log(lastTicket);
    callback(lastTicket);
  });

  client.on("attendTicket", (data, callback) => {
    if (!data.desktop) {
      callback({
        ok: false,
        err: {
          message: "Please, Introduce A Desktop 💻",
        },
      });
    }

    let attendTicket = ticketControl.attendTicket(data.desktop);

    callback(attendTicket);

    client.broadcast.emit("lastFour", {
      lastFour: ticketControl.getLastFour(),
    });
  });

  client.emit("actualState", {
    last: ticketControl.getLastTicket(),
    lastFour: ticketControl.getLastFour(),
  });

  client.on("resetTickets", () => {
    console.log("reset");
    ticketControl.resetCount();

    client.broadcast.emit("lastFour", {
      lastFour: ticketControl.getLastFour(),
    });
  });
});
