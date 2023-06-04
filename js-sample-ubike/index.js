function initMap(properties) {
    const center = {
      lat: 24.98,
      lng: 121.3,
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center,
      mapId: "4504f8b37365c3d0",
    });
  
    for (const property of properties) {
        const pos = {
            lat: parseFloat(property.lat),
            lng: parseFloat(property.lng)
          };          
      const advancedMarkerView = new google.maps.marker.AdvancedMarkerView({
        map,
        content: buildContent(property),
        position: pos,
        title: property.ar,
      });
      
      const element = advancedMarkerView.element;
  
      ["focus", "pointerenter"].forEach((event) => {
        element.addEventListener(event, () => {
          highlight(advancedMarkerView, property);
        });
      });
      ["blur", "pointerleave"].forEach((event) => {
        element.addEventListener(event, () => {
          unhighlight(advancedMarkerView, property);
        });
      });
      advancedMarkerView.addListener("click", (event) => {
        unhighlight(advancedMarkerView, property);
      });
    }
  }
  
  function highlight(markerView, property) {
    markerView.content.classList.add("highlight");
    markerView.element.style.zIndex = 1;
  }
  
  function unhighlight(markerView, property) {
    markerView.content.classList.remove("highlight");
    markerView.element.style.zIndex = "";
  }
  
  function buildContent(property) {
    const content = document.createElement("div");
  
    content.classList.add("property");
    content.innerHTML = `
    <div class="icon">
        <span class=""><span>${property.sbi}</span>
    </div>
    <div class="details">
    <span class="material-symbols-outlined">directions_bike</span>
    <div class="price">${property.sna}</div>
    <div class="address">${property.ar}</div>
    </div>
      `;
    return content;
  }
  
let properties = [];
function updateProperties() {
  // 使用适当的方法从 API 获取属性数据，例如使用 fetch() 或 axios.get()
  fetch('https://data.tycg.gov.tw/api/v1/rest/datastore/a1b4714b-3b75-4ff8-a8f2-cc377e4eaa0f?format=json')
    .then(response => response.json())
    .then(data => {
      properties = data.result.records;
      // 在成功获取数据后，调用 initMap 函数，并将属性数据作为参数传递
      initMap(properties);
    })
    .catch(error => {
      console.error('Error fetching properties:', error);
    });
}


setInterval(updateProperties, 1 * 60 * 1000);
updateProperties();

  
window.initMap = initMap;