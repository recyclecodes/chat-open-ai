const API_KEY = 'YOUR API KEY HERE';
const API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

let conversations = [];

async function sendMessage(msg) {
  const response = await fetch(`${API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: msg,
    }),
  });

  console.log(msg);

  const data = await response.json();

  console.log(data);

  let responseMessage = data.choices[0].message;

  displayMessage({ role: 'system', content: responseMessage });
}

function displayMessage(message) {
  conversations.push(message);

  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');

  if (typeof message.content === 'object') {
    messageElement.innerText = JSON.stringify(message.content.content);
  } else {
    messageElement.innerText = message.content;
  }

  chatMessages.appendChild(messageElement);
}

document.getElementById('send-btn').addEventListener('click', function () {
  const userInput = document.getElementById('user-input');
  const userMessage = userInput.value.trim();

  if (userMessage !== '') {
    displayMessage({ role: 'user', content: userMessage });
    sendMessage([{ role: 'user', content: userMessage }]);
    userInput.value = '';
  }
});

sendMessage([{ role: 'system', content: 'You are a helpful assistant.' }]);
