const imagePreview = document.getElementById('imagePreview');
const imageInput = document.getElementById('imageInput');
const getColorPalette = document.getElementById('getColorPalette');
const colorContainer = document.getElementById('colorPalette');
const openFile = document.getElementById('openFile');
const img = document.querySelector(".imgPreview");

document.getElementById('imageInput').addEventListener('change', function(event) {
  if (imageInput.files && imageInput.files[0]) {
    const img = new Image();
    img.src = URL.createObjectURL(imageInput.files[0]);

    img.onload = () => {
      const colorThief = new ColorThief();
      const colors = colorThief.getPalette(img, 10);
      displayColors(colors);

      openFile.remove();
    };
  }
});

function displayColors(colors) {
  colorContainer.innerHTML = '';
  colors.forEach(color => {
    const rgbToHex = (color) => {
      return "#" + ((1 << 24) + (color[0] << 16) + (color[1] << 8) + color[2]).toString(16).slice(1).toLocaleUpperCase();
    }

    const colorDiv = document.createElement('div');
    colorDiv.className = 'color';
    colorDiv.style.backgroundColor = `${rgbToHex(color)}`;

    const colorName = document.createElement('p');
    colorName.className = 'colorName'
    colorName.textContent = `${rgbToHex(color)}`;
    
    colorContainer.appendChild(colorDiv);
    colorDiv.appendChild(colorName);
  });
}