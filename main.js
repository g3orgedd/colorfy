const imagePreview = document.getElementById('imagePreview');
const imageInput = document.getElementById('imageInput');
const getColorPalette = document.getElementById('getColorPalette');
const colorContainer = document.getElementById('colorPalette');
const openFile = document.getElementById('openFile');
const img = document.querySelector(".imgPreview");
const buttonContainer = document.getElementById("bContainer");
const canvas = document.getElementById("paletteCanvas");

document.getElementById('imageInput').addEventListener('change', function(event) {
  if (imageInput.files && imageInput.files[0]) {
    const img = new Image();
    img.src = URL.createObjectURL(imageInput.files[0]);

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 10);

      openFile.remove();

      displayColors(colors);
      generatePalette(colors, canvas);
    };
  }
});

function displayColors(colors) {
  colorContainer.innerHTML = '';
  colors.forEach(color => {
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

function rgbToHex (color) {
  return "#" + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1);
}

function isDark(color) {
  return ((color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000) > 128 ? '#000000' : '#FFFFFF';
}

function generatePalette(colors, canvas) {
  const ctx = canvas.getContext('2d');

  canvas.width = colors.length * 100;
  canvas.height = 100;

  colors.forEach((color, index) => {
    ctx.fillStyle = `${rgbToHex(color)}`;
    ctx.fillRect(index * 100, 0, 100, 100);
  });
}

document.getElementById('savePalette').addEventListener('click', function() {
  const canvas = document.getElementById('paletteCanvas');
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'palette.png';
  link.click();
});