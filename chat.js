document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.getElementById('input');
  const sendButton = document.getElementById('send');
  const responseDiv = document.getElementById('response');

  async function sendMessage() {
    const input = inputField.value.trim();
    if (!input) return;

    responseDiv.innerHTML += `\n\nYou: ${input}`;
    inputField.value = '';
    
    try {
      responseDiv.innerHTML += `\n\nVelma: ...`;

      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      responseDiv.innerHTML = responseDiv.innerHTML.replace('Velma: ...', `Velma: ${data.reply}`);
    } catch (error) {
      console.error('Error:', error);
      responseDiv.innerHTML += `\n\nVelma: The threads of fate are tangled... try again.`;
    }

    responseDiv.scrollTop = responseDiv.scrollHeight;
  }

  sendButton.addEventListener('click', sendMessage);
  inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
  });
});
