const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pastelColors = ['#f9c5d1', '#c8e3d4', '#fdf6b2', '#cddafd', '#ffe5b4'];

function drawScene() {
  const numBuildings = Math.floor(canvas.width / 150);
  //const groundY = canvas.height - 100;
  const groundY = canvas.height - 300;

  for (let i = 0; i < numBuildings; i++) {
    const x = i * 150 + 10;
    const width = 120;
    const height = Math.random() * 100 + 150;
    drawBuilding(x, groundY - height, width, height);
  }
}

function drawBuilding(x, y, w, h) {
  const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);

  // Roof
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w / 2, y - 30);
  ctx.lineTo(x + w, y);
  ctx.closePath();
  ctx.fillStyle = '#555';
  ctx.fill();

  // Windows
  const rows = Math.floor(h / 50);
  const cols = 2 + Math.floor(Math.random() * 2);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + 10 + c * (w / cols);
      const wy = y + 10 + r * 40;
      drawWindow(wx, wy, 20, 30);
    }
  }

  // Door
  ctx.fillStyle = '#333';
  ctx.fillRect(x + w / 2 - 15, y + h - 40, 30, 40);

  // Maybe draw a café sign
  if (Math.random() < 0.7) {
    const randomShop = randomShopSign();
    drawSign(x, y - 20, w, randomShop);//);
  }
}

function rnd(n) { return Math.floor(Math.random()*n); }
function pick(array) { const ix = rnd(array.length); return array[ix]; }
function randomShopSign() {
  const shops = ['Baker','Café','Butcher','Doctor','Saloon','Undertaker','Hardware Store','Barber','Hairdresser','Shoemaker','Burgers','Bookstore','Dentist','School','Church','Sherif','Grocery','Library','Museum'];
  return pick(shops); //[0];
}
function drawWindow(x, y, w, h) {
  ctx.fillStyle = '#a3d5f7';
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = '#666';
  ctx.strokeRect(x, y, w, h);
}

function drawSign(x, y, w, text) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + w / 2 - 30, y, 60, 20);
  ctx.strokeStyle = '#444';
  ctx.strokeRect(x + w / 2 - 30, y, 60, 20);
  ctx.fillStyle = '#000';
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + w / 2, y + 14);
}

drawScene();
