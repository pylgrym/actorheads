const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pastelColors = ['#f9c5d1', '#c8e3d4', '#fdf6b2', '#cddafd', '#ffe5b4'];
const treeGreens = ['#6b8e23', '#8fbc8f', '#228b22', '#a2d149'];
const bushGreens = ['#8fbc8f', '#A1DAB3', '#C3D89D'];

function drawScene() {
  //const groundY = canvas.height - 100;
  const groundY = canvas.height - 300;

  const skyColor0 = '#d0e6f6';
  const skyColor = '#f0f6e6';
  ctx.fillStyle = skyColor; //'#d0e6f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // First, draw trees (behind houses)
  drawTrees(groundY);

  // Then, draw houses in the foreground
  const numBuildings = Math.floor(canvas.width / 150);
  for (let i = 0; i < numBuildings; i++) {
    const x = i * 150 + 10;
    const width = 120;
    const height = Math.random() * 100 + 150;
    drawBuilding(x, groundY - height, width, height);
  }

  // Finally, draw bushes (in front of houses)
  drawBushes(groundY);
}

function drawTrees(groundY) {
  let x = -40;
  while (x < canvas.width + 60) {
    const treeType = Math.random();
    const treeX = x + Math.random() * 40;
    const scale = (1.5 + Math.random() * 0.5) * 1.5; // 150% bigger than before
    const trunkBottomY = groundY - (Math.random() * 20 + 10); // varies 10–30px above house ground

    if (treeType < 0.4) drawRoundTree(treeX, trunkBottomY, scale);
    else if (treeType < 0.7) drawPineTree(treeX, trunkBottomY, scale);
    else drawLollipopTree(treeX, trunkBottomY, scale);

    x += 30 + Math.random() * 20;
  }
}

function drawBushes(groundY) {
  let x = -40;
  while (x < canvas.width + 60) {
    const bushX = x + Math.random() * 40;
    const bushScale = 0.5 + Math.random() * 0.4; // Smaller than trees
    const bushY = groundY + Math.random() * 10; // Slightly above ground level

    drawBush(bushX, bushY, bushScale);

    x += 40 + Math.random() * 20;
  }
}

function drawBush(x, y, scale) {
  const r1 = 25 * scale;
  const r2 = 20 * scale;
  const r3 = 15 * scale;
  
  ctx.fillStyle = bushGreens[Math.floor(Math.random() * bushGreens.length)];
  
  ctx.beginPath();
  ctx.arc(x, y, r1, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x - 20 * scale, y, r2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(x + 20 * scale, y, r3, 0, Math.PI * 2);
  ctx.fill();
}

function drawRoundTree(x, trunkBottomY, scale) {
  const r = 35 * scale;
  const trunkHeight = 30 * scale;
  const trunkTopY = trunkBottomY - trunkHeight;
  const canopyY = trunkTopY - r;

  ctx.fillStyle = randomTreeColor();
  ctx.beginPath();
  ctx.arc(x, canopyY, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(x - 5 * scale, trunkTopY, 10 * scale, trunkHeight);
}

function drawPineTree(x, trunkBottomY, scale) {
  const h = 70 * scale;
  const w = 50 * scale;
  const trunkHeight = 35 * scale;
  const trunkTopY = trunkBottomY - trunkHeight;
  const foliageY = trunkTopY - h;

  ctx.fillStyle = randomTreeColor();
  ctx.beginPath();
  ctx.moveTo(x, foliageY);
  ctx.lineTo(x - w / 2, trunkTopY);
  ctx.lineTo(x + w / 2, trunkTopY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(x - 5 * scale, trunkTopY, 10 * scale, trunkHeight);
}

function drawLollipopTree(x, trunkBottomY, scale) {
  const r = 30 * scale;
  const trunkHeight = 30 * scale;
  const trunkTopY = trunkBottomY - trunkHeight;
  const canopyY = trunkTopY - r;

  ctx.fillStyle = '#8b5a2b';
  ctx.fillRect(x - 3 * scale, trunkTopY, 6 * scale, trunkHeight);

  ctx.fillStyle = randomTreeColor();
  ctx.beginPath();
  ctx.arc(x, canopyY, r, 0, Math.PI * 2);
  ctx.fill();
}

function randomTreeColor() {
  return treeGreens[Math.floor(Math.random() * treeGreens.length)];
}

function drawBuilding(x, y, w, h) {
  const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);

  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w / 2, y - 30);
  ctx.lineTo(x + w, y);
  ctx.closePath();
  ctx.fillStyle = '#555';
  ctx.fill();

  const rows = Math.floor(h / 50);
  const cols = 2 + Math.floor(Math.random() * 2);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + 10 + c * (w / cols);
      const wy = y + 10 + r * 40;
      drawWindow(wx, wy, 20, 30);
    }
  }

  ctx.fillStyle = '#333';
  ctx.fillRect(x + w / 2 - 15, y + h - 40, 30, 40);

  //if (Math.random() < 0.3) {
  //  drawSign(x, y - 20, w, 'Café');
  //}
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
