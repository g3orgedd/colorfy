const imagePreview = document.getElementById('imagePreview');
const imageInput = document.getElementById('imageInput');
const getColorPalette = document.getElementById('getColorPalette');
const colorContainer = document.getElementById('colorPalette');
const openFile = document.getElementById('openFile');
const buttonContainer = document.getElementById("bContainer");
const canvas = document.getElementById("paletteCanvas");
const easterEgg = document.getElementById("dragLabel");
const ctx = canvas.getContext('2d');

imageInput.addEventListener('change', async function(event) {
  if (imageInput.files && imageInput.files[0]) {
    const img = await loadImage(imageInput.files[0]);
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(img, 10);
    openFile.remove();
    displayColors(colors);
    generatePalette(colors, canvas, ctx);
  }
});

async function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function displayColors(colors) {
  colorContainer.innerHTML = '';
  colors.forEach(color => {
    const col = document.querySelector('.colorContainer');

    col.classList.remove('unvisible');
    col.classList.add('visible');

    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = `${rgbToHex(color)}`;

    const colorName = document.createElement('p');
    colorName.className = 'colorName';
    colorName.style.color = isDark(color);
    colorName.textContent = `${rgbToHex(color)}`;

    buttonContainer.style.display = 'flex';

    colorContainer.appendChild(colorDiv);
    colorDiv.appendChild(colorName);
  });
}

function rgbToHex(color) {
  return "#" + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
}

function isDark(color) {
  return ((color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000) > 128 ? '#000000' : '#FFFFFF';
}

async function generatePalette(colors, canvas, ctx) {
  const cellWidth = 250;
  const cellHeight = 112;
  const cols = 2;

  canvas.width = cols * cellWidth;
  canvas.height = Math.ceil(colors.length / cols) * cellHeight;

  for (let i = 0; i < colors.length; i++) {
    const x = (i % cols) * cellWidth;
    const y = Math.floor(i / cols) * cellHeight;

    ctx.fillStyle = `${rgbToHex(colors[i])}`;
    ctx.fillRect(x, y, cellWidth, cellHeight);
    ctx.fillStyle = isDark(colors[i]);

    ctx.font = '17px DM Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(rgbToHex(colors[i]), x + cellWidth / 2, y + cellHeight / 2);
  }
}

document.getElementById('savePalette').addEventListener('click', function() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'palette.png';
  link.click();
});

document.getElementById('loadImage').addEventListener('click', function() {
  imageInput.click();
});

let meowCounter = 0;
document.getElementById('dragLabel').addEventListener('click', function() {
  if (meowCounter == 10) {
    alert('Я люблю Татьяночку!!!');
    meowCounter = 0;
  }
  meowCounter++;
});