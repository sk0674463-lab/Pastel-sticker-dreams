const canvas = new fabric.Canvas('stickerCanvas');
const imageUpload = document.getElementById('imageUpload');
const stickerText = document.getElementById('stickerText');
const fontSelect = document.getElementById('fontSelect');
const textColor = document.getElementById('textColor');
const downloadBtn = document.getElementById('downloadBtn');
const memeTemplate = document.getElementById('memeTemplate');
const heartTemplate = document.getElementById('heartTemplate');
let currentText;

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            fabric.Image.fromURL(reader.result, (img) => {
                img.scaleToWidth(250);
                canvas.add(img);
                canvas.renderAll();
            });
        };
        reader.readAsDataURL(file);
    }
});

memeTemplate.addEventListener('click', () => {
    fabric.Image.fromURL('https://via.placeholder.com/300x300/ffb3ba/ffffff?text=😂+Meme+Face', (img) => {
        img.scaleToWidth(250);
        canvas.add(img);
        canvas.renderAll();
    });
});

heartTemplate.addEventListener('click', () => {
    fabric.Image.fromURL('https://via.placeholder.com/300x300/bae1ff/ffffff?text=💖+Hearts', (img) => {
        img.scaleToWidth(250);
        canvas.add(img);
        canvas.renderAll();
    });
});

stickerText.addEventListener('input', () => {
    if (currentText) {
        currentText.set({ text: stickerText.value, fontFamily: fontSelect.value, fill: textColor.value });
    } else {
        currentText = new fabric.Text(stickerText.value, { fontFamily: fontSelect.value, fill: textColor.value, fontSize: 20, left: 50, top: 50 });
        canvas.add(currentText);
    }
    canvas.renderAll();
});

textColor.addEventListener('input', () => {
    if (currentText) {
        currentText.set('fill', textColor.value);
        canvas.renderAll();
    }
});

downloadBtn.addEventListener('click', () => {
    try {
        if (canvas.getObjects().length === 0) {
            alert('Add something first! 🌸');
            return;
        }
        const link = document.createElement('a');
        link.download = 'pastel-sticker.png';
        link.href = canvas.toDataURL({ format: 'png' });
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Download failed:', error);
        alert('Oops! Download failed. Try again.');
    }
});
