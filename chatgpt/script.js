const apiKey = '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';
const endpoint = 'https://api.openai.com/v1/chat/completions';

function showLoader() {
    const loaders = document.getElementsByClassName('loader');
    for (let i = 0; i < loaders.length; i++) {
        loaders[i].style.display = 'block';
    }
}

function hideLoader() {
    const loaders = document.getElementsByClassName('loader');
    for (let i = 0; i < loaders.length; i++) {
        loaders[i].style.display = 'none';
    }
}


// 生成行程規劃
function generateText(locations, itineraryContainerId, loaderId) {
    showLoader()
    const messages = [
      { role: 'system', content: '你會幫助使用者安排行程，並用繁體中文回應' },
      { role: 'user', content: '今天的行程我想去'+ locations +'幫我安排一下'},
    ];

  const itineraryContainer = document.getElementById(itineraryContainerId);
  
  showLoader();

  axios.post(endpoint, {
    messages: messages,
    model: 'gpt-3.5-turbo'
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  })
    .then(response => {
      const generatedText = response.data.choices[0].message.content;
      itineraryContainer.innerText = generatedText;
      console.log(generatedText);
      hideLoader()
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });
}

document.getElementById('submit-button').addEventListener('click', () => {
    const inputLocations = document.getElementsByTagName('input');
    const locations = [];
    for (let i = 0; i < inputLocations.length; i++) {
      locations.push(inputLocations[i].value);
    }
    console.log(locations);
    generateText(locations, 'itinerary-container', 'loader')
  });
let counter = 1;

document.getElementById('add-button').addEventListener('click', () => {
  const inputContainer = document.getElementById('input-container');
  const newInputId = `input-location${counter}`;

  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.id = newInputId;
  newInput.class='input-location';
  newInput.placeholder = '輸入地點';

  const newLoader = document.createElement('div');
  inputContainer.appendChild(newLoader);
  inputContainer.appendChild(newInput);
  counter++;
});
