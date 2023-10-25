// main.js

document.getElementById('convertButton').addEventListener('click', extractValues);

function extractValues() {
    var urlInput = document.getElementById('inputBox1').value;
    var valueInput = document.getElementById('inputBox2');
    var urls = urlInput.split('\n');
    var extractedValues = [];

    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        var splitUrl = url.split('=');
        if (splitUrl.length > 1) {
            extractedValues.push(splitUrl[1]);
        }
    }
    valueInput.value = extractedValues.join('\n');
    copyToClipboard(extractedValues.join('\n'));
}

function copyToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

const quill = new Quill('#editor-container', {
    theme: 'snow',
});

document.getElementById("generateButton").addEventListener("click", function () {
    const htmlCode = quill.root.innerHTML;
    document.getElementById("inputBox4").value = htmlCode;
    const inputBox4 = document.getElementById("inputBox4");
    inputBox4.select();
    document.execCommand("copy");
});

//New Scripts
document.getElementById('uploadButton').addEventListener('click', function () {
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload.files.length > 0) {
        const uploadedImage = imageUpload.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const uploadedImageURL = event.target.result;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const image = new Image();

            image.src = uploadedImageURL;

            image.onload = function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);

                const watermarkSize = canvas.width * 0.1;
                const averageColor = getAverageColor(context, canvas.width, canvas.height);
                const watermarkColor = getWatermarkColor(averageColor);
                context.font = `${watermarkSize}px Roboto`; 
                context.fillStyle = watermarkColor; 
                context.globalAlpha = 0.3; 
                context.textAlign = 'center'; 
                context.textBaseline = 'middle';
                const watermarkText = 'Physics Wallah';
                context.fillText(watermarkText, canvas.width / 2, canvas.height / 2);
                const watermarkedImageURL = canvas.toDataURL('image/jpeg');
                const watermarkedImage = new Image();
                watermarkedImage.src = watermarkedImageURL;
                document.body.appendChild(watermarkedImage);
            };
        };

        reader.readAsDataURL(uploadedImage);
    }
});

function getAverageColor(context, width, height) {
    const imageData = context.getImageData(0, 0, width, height).data;
    let sumR = 0, sumG = 0, sumB = 0;
    const pixelCount = width * height;

    for (let i = 0; i < pixelCount * 4; i += 4) {
        sumR += imageData[i];
        sumG += imageData[i + 1];
        sumB += imageData[i + 2];
    }

    const averageColor = {
        r: Math.round(sumR / pixelCount),
        g: Math.round(sumG / pixelCount),
        b: Math.round(sumB / pixelCount),
    };

    return averageColor;
}

function getWatermarkColor(averageColor) {
    const brightness = (averageColor.r * 299 + averageColor.g * 587 + averageColor.b * 114) / 1000;
    if (brightness < 128) {
        return 'white';
    } else {
        return 'black'; 
    }
}
