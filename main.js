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
