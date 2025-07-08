document.addEventListener('DOMContentLoaded', function() {
function updateClock() {
    const now = new Date();
    const formatted = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    document.getElementById("clock").textContent = formatted;
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  let battery = 72;
  let temp = 58;
  let assembly = 20;
  let calibration = 10;
  let packaging = 50;
  
  setInterval(() => {
    // Simulate telemetry changes
    battery = Math.max(0, battery - Math.random() * 0.5);
    temp = 55 + Math.random() * 10;
    document.getElementById("battery").textContent = `${battery.toFixed(1)}%`;
    document.getElementById("temperature").textContent = `${temp.toFixed(1)}°C`;
  
    // Fake location data
    const coords = [14 + Math.random(), 5 + Math.random(), 7 + Math.random()];
    document.getElementById("location").textContent = coords.map(c => c.toFixed(1)).join(',');
  
    // Progress updates
    assembly = (assembly + 2) % 100;
    calibration = (calibration + 1) % 100;
    packaging = (packaging + 3) % 100;
  
    document.querySelector('#assembly .fill').style.width = `${assembly}%`;
    document.querySelector('#calibration .fill').style.width = `${calibration}%`;
    document.querySelector('#packaging .fill').style.width = `${packaging}%`;
  }, 3000);
  
// --- Chat Widget Logic ---
(function() {
  // No toggle button logic needed, chat is always visible
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  function appendMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.className = sender === 'user' ? 'chat-user' : 'chat-bot';
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const prompt = chatInput.value.trim();
    if (!prompt) return;
    appendMessage(prompt, 'user');
    chatInput.value = '';
    // Simple intent detection
    if (/new drone/i.test(prompt)) {
      setTimeout(() => {
        appendMessage('✅ New drone request has been initiated!');
        // Add new drone to queue table if present
        const queueBody = document.getElementById('queue-body');
        if (queueBody) {
          // Generate a new unique Drone ID (increment from highest existing)
          let maxId = 0;
          Array.from(queueBody.querySelectorAll('tr')).forEach(row => {
            const idCell = row.querySelector('td');
            if (idCell) {
              const num = parseInt(idCell.textContent, 10);
              if (!isNaN(num) && num > maxId) maxId = num;
            }
          });
          const newId = (maxId + 1).toString().padStart(4, '0');
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${newId}</td><td class="pending">Pending</td>`;
          queueBody.prepend(tr);
        }
      }, 500);
    } else if (/queue|show.*queue/i.test(prompt)) {
      setTimeout(() => appendMessage('📝 Current Queue:\n- Drone #0018: Pending\n- Drone #0017: Printing'), 500);
    } else {
      setTimeout(() => appendMessage('🤖 Sorry, I can only help with new drone requests or showing the queue for now.'), 500);
    }
  });
})();
});
  