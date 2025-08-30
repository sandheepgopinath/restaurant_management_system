const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

async function generateDescription(prompt) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text;
}

async function generateImage(prompt) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${GEMINI_API_KEY}`;
    const payload = { instances: [{ prompt: prompt }], parameters: { "sampleCount": 1 } };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result.predictions?.[0]?.bytesBase64Encoded;
}

export { generateDescription, generateImage };