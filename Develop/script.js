// Stops JavaScript from loading until HTML and CSS are done.
$(document).ready(function () {
  var currentTime = dayjs();

  var formattedTime = currentTime.format("dddd, MMMM D, YYYY, h:mm:ss a");

  // THEN the current day is displayed at the top of the calendar
  var displayTime = document.querySelector("#currentDay");
  displayTime.textContent = formattedTime;

  // THEN the text for that event is saved in local storage
  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    localStorage.setItem(time, text);
  });

  function hourTracker() {
    var currentHour = currentTime.hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // THEN each time block is color-coded to indicate whether it is in the past, present, or future
      if (currentHour > blockHour) {
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      } else if (currentHour === blockHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
        $(this).removeClass("future");
      } else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  hourTracker();

  // THEN the saved events persist
  function savedEvents() {
    $(".time-block").each(function () {
      var blockHour = $(this).attr("id");
      $(this).children(".description").val(localStorage.getItem(blockHour));
    });
  }

  savedEvents();
});
