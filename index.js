let model;
async function loadModel() {
    model = await mobilenet.load();
    console.log("Model loaded");
}
async function classifyImage() {
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const predictionResult = document.getElementById('predictionResult');
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            selectedImage.src = e.target.result;
            const img = document.createElement('img');
            img.src = e.target.result;
            const predictions = await model.classify(img);
            // Neticenin gosterilmesi
            const resultText = predictions.map(pred => `${pred.className}: ${pred.probability.toFixed(4)}`).join('<br>');
            predictionResult.innerHTML = resultText;
        };
        reader.readAsDataURL(file);
    }
}
//  MobileNetV2 modelini yuklemek
loadModel();