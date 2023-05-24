let currentDate = new Date();
let currentDayElement = document.getElementById("currentDay");
$(function () {
  currentDayElement.innerHTML = currentDate.toDateString();
});
//saves to local storage and reapplys data from local storage as well as change color of blocks based on the time of day
function updateClassAndSaveData() {
  var currentHour = moment().hour();

  $(".time-block").each(function (index) {
    var blockHour = parseInt($(this).attr("id").split("-")[1]);
    var textarea = $(this).find("textarea");
    var textareaId = textarea.attr("id") + "-" + index;

    $(this).removeClass("past present future");

    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }

    var savedData = localStorage.getItem(textareaId);

    if (savedData) {
      textarea.val(savedData);
    }

    textarea.on("change", function () {
      var data = $(this).val();
      localStorage.setItem(textareaId, data);
    });
  });
}

updateClassAndSaveData();
setInterval(updateClassAndSaveData, 60000);
