/*$(document).ready(function() {
    var apiKey = 'CWB-8DC6CA43-0E15-41F6-942A-DF486DD93867'; // 请替换为你的OpenWeatherMap API密钥
    $.getJSON('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-007?Authorization=' + apiKey, function(data) { // 将 'your_json_file.json' 替换为你的JSON文件路径或直接使用JSON对象
    var locations = data.records.locations;

    // 遍历所有地点
    $.each(locations, function(index, location) {
      var locationName = location.locationsName;
  
      if (locationName === '桃園市') {
        var districts = location.location;
    
        // 遍历桃園市的所有区域
        $.each(districts, function(index, district) {
            var districtName = district.locationName;
      
            if (districtName === '龍潭區') {
            // 输出龙潭区的相关信息
              console.log('Location: ' + districtName);
              var weatherInfo = $('<div>').addClass('weather-info');
              $('<h2>').text('Location: ' + districtName).appendTo(weatherInfo);
              var weatherElements = district.weatherElement[1];
        
        // 遍历天气元素
            //$('<p>').text('Element: ' + weatherElements.elementName).appendTo(weatherInfo);
            //$('<p>').text('Description: ' + weatherElements.description).appendTo(weatherInfo);

            var time = weatherElements.time;              
          // 输出天气元素信息
              //console.log('Element: ' + elementName);
              //console.log('Description: ' + description);
          
          // 遍历时间段
              $.each(time, function(index, period) {
                var startTime = period.startTime;
                var endTime = period.endTime;
                var elementValue = period.elementValue;
            
              // 输出时间段和相关值
                //$('<p>').text('Start Time: ' + startTime).appendTo(weatherInfo);
                //$('<p>').text('End Time: ' + endTime).appendTo(weatherInfo);
                console.log('Start Time: ' + startTime);
                console.log('End Time: ' + endTime);
            
            // 遍历元素值
                $.each(elementValue, function(index, value) {
                  var valueText = value.value;
                  var measures = value.measures;
                  var temperature = $('<p>').addClass('temperature').text('Temperature: ' + valueText);
                  var unit = $('<span>').addClass('unit').text(measures);
                  
                  temperature.append(unit).appendTo(weatherInfo);
                // 输出值和度量单位
                  console.log('Value: ' + valueText);
                  console.log('Measures: ' + measures);
                  });
              });
              weatherInfo.appendTo(weatherContainer);
            }
        });
    }
    });
  });
});*/
let cityData = [
    { name: "中壢區", lat:24.97993803 , lon: 121.2147243 },
    { name: "平鎮區", lat:24.92117923 , lon: 121.2140051 },
    { name: "楊梅區", lat: 24.91820989, lon: 121.1291697 },
    { name: "新屋區", lat: 24.97280352, lon: 121.067758 },
    { name: "觀音區", lat: 25.02671611, lon: 121.1155021 },
    { name: "桃園區", lat: 25.00040024, lon: 121.2996612 },
    { name: "龜山區", lat: 25.02417472, lon: 121.3569265 },
    { name: "八德區", lat: 24.94968903, lon: 121.2913102 },
    { name: "大溪區", lat: 24.86797026, lon: 121.296342 },
    { name: "復興區", lat: 24.72949884, lon: 121.3754588 },
    { name: "大園區", lat: 25.06384709, lon: 121.21177 },
    { name: "蘆竹區", lat: 25.06073337, lon: 121.2831266 }
]


$(function(){
    console.log("[loadServerData] in");
    // debugger;
    $("#result").empty();
    if(this.value == 0) return;
    // Request Weather Data
    let weatherAPI_URL = "https://api.openweathermap.org/data/2.5/weather?";
    // let weatherMapAPIKey = "";
    
    cityData.forEach(function(city,i){
        $.getJSON(weatherAPI_URL,{
            lat:city.lat,
            lon:city.lon,
            appid:weatherMapAPIKey,
            units:'metric',
            lang:'zh_tw'
        })
        .done(function(data){
            console.log(data);
            let weatherDiv = $('<div>').addClass('carousel-item');
            let weatherInfo = $('<div>').addClass('testimonial_section_2 layout_padding');

            weatherInfo.append(
              `<h1 class="emrold_text">${city.name}</p>`
            );
            weatherInfo.append(
                `<h2>氣溫：${data.main.temp_min} ~ ${data.main.temp_max}</p>`
            );
            weatherInfo.append(
                `<h2><img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png'>${data.weather[0].description}</p>`
            );
            weatherDiv.append(weatherInfo)
            $("#weather").append(weatherDiv);
        })
        .fail(function(){console.log("Error")})
        .always(function(){console.log("Always")});
    })
});