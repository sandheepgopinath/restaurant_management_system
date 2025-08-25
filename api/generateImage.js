// /api/generateImage.js

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { dishName } = request.body;
  if (!dishName) {
    return response.status(400).json({ message: 'Dish name is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ message: 'API key not configured' });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
  const prompt = `A photorealistic, professional food photography shot of '${dishName}', beautifully plated on a clean white background, ready for a restaurant menu.`;
  const payload = { instances: [{ prompt: prompt }], parameters: { "sampleCount": 1 } };

  try {
    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!fetchResponse.ok) {
      throw new Error(`API call failed with status: ${fetchResponse.status}`);
    }

    const result = await fetchResponse.json();
    const imageBase64 = result.predictions?.[0]?.bytesBase64Encoded;

    if (!imageBase64) {
      throw new Error('No image generated from API.');
    }

    response.status(200).json({ image: `data:image/png;base64,${imageBase64}` });
  } catch (error) {
    console.error('Error calling Imagen API:', error);
    response.status(500).json({ message: 'Failed to generate image.' });
  }
}
