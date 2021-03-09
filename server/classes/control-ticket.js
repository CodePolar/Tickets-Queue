const fs = require("fs");

class Ticket {
  constructor(number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.date = new Date().getDate();
    this.tickets = [];
    this.lastFour = [];
    let data = require("../data/data.json");
    if (data.today === this.date) {
      this.tickets = data.tickets;
      this.last = data.last;
      this.lastFour = data.lastFour;
    } else {
      this.resetCount();
    }
  }

  nextTicket() {
    this.last += 1;
    let ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.writeFile();
    return `Ticket ${this.last}`;
  }

  resetTickets() {}

  attendTicket(desktop) {
    if (this.tickets.length <= 0) {
      return "Tickets Clean ✔";
    }

    let ticketAttend = this.tickets[0].number;
    this.tickets.shift();
    let ticket = new Ticket(ticketAttend, desktop);
    this.lastFour.unshift(ticket);
    if (this.lastFour.length > 4) {
      this.lastFour.splice(-1, 1);
    }
    console.log("last four");
    console.log(this.lastFour);
    this.writeFile();

    return ticketAttend;
  }

  getLastTicket() {
    return this.last;
  }

  getLastFour() {
    return this.lastFour;
  }

  resetCount() {
    this.last = 0;
    this.tickets = [];
    this.lastFour = [];
    this.writeFile();
    console.log("System Starts");
  }

  writeFile() {
    let jsonData = {
      last: this.last,
      today: this.date,
      tickets: this.tickets,
      lastFour: this.lastFour,
    };
    let jsonDataString = JSON.stringify(jsonData);

    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}
module.exports = {
  TicketControl,
};
