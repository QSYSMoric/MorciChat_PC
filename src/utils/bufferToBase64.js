import imageToUrl from "./ImageToURL";

async function buffersToBase64Array(buffers) {
    const base64Array = [];
    for (let i = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        const base64Data = await bufferToBase64(buffer);
        base64Array.push(base64Data);
    }
    return Promise.resolve(base64Array);
}

function bufferToBase64(buffer) {
    const reader = new FileReader();
    const blob = new Blob([buffer]);
    reader.readAsDataURL(blob);
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const base64Data = reader.result.substr(reader.result.indexOf(',') + 1);
            resolve(imageToUrl(`data:image/jpeg;base64,${base64Data}`,"jpg"));
        };
        reader.onerror = reject;
    });
}

export default {
    buffersToBase64Array,
    bufferToBase64
};