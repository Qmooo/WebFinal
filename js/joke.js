$(function() {
    $("#joke1").on("click", loadServerData1);
    $("#joke2").on("click", loadServerData2);
    $("#joke3").on("click", loadServerData3);
  });
  
  function loadServerData1() {
    $.getJSON("https://api.chucknorris.io/jokes/random")
      .done(function(data) {
        console.log("Success");
        $("#showData1").text(data.value);
      })
      .fail(function() {
        console.log("Error");
      })
      .always(function() {
        console.log("Always");
      });
  };

  function loadServerData2() {
    $.getJSON("https://api.chucknorris.io/jokes/random")
      .done(function(data) {
        console.log("Success");
        $("#showData2").text(data.value);
      })
      .fail(function() {
        console.log("Error");
      })
      .always(function() {
        console.log("Always");
      });
  };

  function loadServerData3() {
    $.getJSON("https://api.chucknorris.io/jokes/random")
      .done(function(data) {
        console.log("Success");
        $("#showData3").text(data.value);
      })
      .fail(function() {
        console.log("Error");
      })
      .always(function() {
        console.log("Always");
      });
  };
  document.getElementById("joke1").addEventListener("click", function() {
    var showDataContainer1 = document.querySelector(".showDataContainer1");
    showDataContainer1.style.display = "block";
  });
  document.getElementById("joke2").addEventListener("click", function() {
    var showDataContainer2 = document.querySelector(".showDataContainer2");
    showDataContainer2.style.display = "block";
  });
  document.getElementById("joke3").addEventListener("click", function() {
    var showDataContainer3 = document.querySelector(".showDataContainer3");
    showDataContainer3.style.display = "block";
  });