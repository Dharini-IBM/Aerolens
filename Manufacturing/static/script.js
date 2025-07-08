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
  