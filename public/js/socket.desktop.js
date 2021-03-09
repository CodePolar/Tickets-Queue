const socket = io();

let small = $("small"); // Small Element

let searchParams = new URLSearchParams(window.location.search); // Search for params in URI

if (!searchParams.has("desktop")) {
  // If desktop is not a param
  window.location = "index.html"; // Go to index.html
  throw new Error("Desktop Is Required"); // And Throw Error
}

var desktop = searchParams.get("desktop"); // Get the params values

$("#desktop").text(`${desktop}`); // Show the Desktop in h1

refreshSocket(); // Functions call

$(".btn").on("click", function () {
  refreshSocket(); // Functions call
});

function refreshSocket() {
  // Ticket to Attend go to Last Four
  socket.emit("attendTicket", { desktop: desktop }, function (resp) {
    small.text(resp);
  });
}
