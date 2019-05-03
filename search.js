var totalResults = 0;
var page = 0;
var total = 0;

// Prevent button shown on load
$(document).ready(function() {
  if (page == 1 || page == 0) {
    $(".backBt").css("display", "none");
  } else
    $(".backBt").css("display", "inline-block");

  if (page == total || total == 0) {
    $(".nextBt").css("display", "none");

  } else
    $(".nextBt").css("display", "inline-block");


  // Prevent enter key
  $("input:text").keypress(function(event) {
    if (event.keyCode == 13)
      event.preventDefault();
  });
});

function dateToStr(date) {
  var year = date.substring(0, 4);
  var month = date.substring(5, 7);
  var day = date.substring(8, 10);
  var monthStr = "";

  if (month == "01")
    monthStr = "Jan";
  else if (month == "02")
    monthStr = "Feb";
  else if (month == "03")
    monthStr = "Mar";
  else if (month == "04")
    monthStr = "Apr";
  else if (month == "05")
    monthStr = "May";
  else if (month == "06")
    monthStr = "Jun";
  else if (month == "07")
    monthStr = "Jul";
  else if (month == "08")
    monthStr = "Aug";
  else if (month == "09")
    monthStr = "Sep";
  else if (month == "10")
    monthStr = "Oct";
  else if (month == "11")
    monthStr = "Nov";
  else
    monthStr = "Dec";

  return day + " " + monthStr + ", " + year;
}



// Process search
$('#search').on('input', function() {


  page = 1;

  queryFunction();


});

function queryFunction() {
  var text = "";

  var index = 0;
  var loopa = 1;
  var query = $('#search').val();

  // If empty, don't show anything
  if ($.trim(query) == "") {
    text = "";
    page = 0;
    total = 0;
    $(".pageCount").html("");

    $(".test").html(text + "<br>");

  } else {

    var url = "https://api.themoviedb.org/3/search/movie?api_key=6ee3d2e2ce0012aedf8200320cb66f1c&region=MALAYSIA&page=" + page + "&query=" + query;

    $.getJSON(url, function(data) {
      var hasErrors = true;

      // Loop through the results
      $.each(data, function() {

        try {

          text += "<br><div class=\"record\"><p class=\"title\">" + data.results[index].title + "</p>";

          // If no date, tell user no date
          if (data.results[index].release_date == "")
            text += "<p class=\"date\" style=\"color: darkred; text-align: center;\">No release date available</p>";
          else
            text += "<p class=\"date\">" + dateToStr(data.results[index].release_date) + "</p>";

          // If no description, tell user no description
          if (data.results[index].overview == "")
            text += "<p class=\"description\" style=\"color: darkgoldenrod; text-align: center;\">No description available</p>";
          else
            text += "<p class=\"description\">" + data.results[index].overview + "</p>";

          total = data.total_pages;

          text += "</div>";
          index++;
          hasErrors = false;
        } catch (Exception) {
          // If no results, show error message
          text = "No results";
          page = 0;
          total = 0;
          $(".pageCount").html("");

          $(".test").html(text + "<br>");
        }
      });


      $(".test").html(text + "<br>");
      $(".pageCount").html("Page " + page + "/" + total);

    });
  }

  if (page == 1 || page == 0) {
    $(".backBt").css("display", "none");
  } else
    $(".backBt").css("display", "inline-block");

  if (page == total || total == 0) {
    $(".nextBt").css("display", "none");

  } else
    $(".nextBt").css("display", "inline-block");
}

// Next button (search with page incremeneted)
$(".nextBt").click(function() {

  page++;

  queryFunction();
});

// Back button (search with page decremented)
$(".backBt").click(function() {
  page--;
  queryFunction();
});
