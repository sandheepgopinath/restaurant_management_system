// /api/generateDescription.js

export default async function handler(request, response) {
  // 1. Check for POST request and get the dish name from the request body
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { dishName } = request.body;
  if (!dishName) {
    return response.status(400).json({ message: 'Dish name is required' });
  }

  // 2. Securely get the API key from Vercel's environment variables
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ message: 'API key not configured' });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
  const prompt = `Generate a short, appetizing menu description for a dish called '${dishName}'. Keep it under 20 words.`;
  const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

  try {
    // 3. Call the Google AI API from the server
    const fetchResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!fetchResponse.ok) {
      throw new Error(`API call failed with status: ${fetchResponse.status}`);
    }

    const result = await fetchResponse.json();
    const description = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!description) {
      throw new Error('No description generated from API.');
    }

    // 4. Send the successful result back to the browser
    response.status(200).json({ description: description.trim() });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    response.status(500).json({ message: 'Failed to generate description.' });
  }
}
