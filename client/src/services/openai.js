import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // Load API key from environment variable

if (!OPENAI_API_KEY) {
  console.warn('Warning: OpenAI API key is not set. Please set REACT_APP_OPENAI_API_KEY in your environment variables.');
}

const mockFreeResponse = async (prompt) => {
  return "Please set a valid OpenAI API key to use the chatbot.";
};

export async function fetchChatGPTResponse(prompt) {
  if (!OPENAI_API_KEY) {
    // If no API key, return message
    return await mockFreeResponse(prompt);
  }

  const endpoint = 'https://api.openai.com/v1/chat/completions';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
  };

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant for a social media analytics application.' },
      { role: 'user', content: prompt },
    ],
    max_tokens: 500,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(endpoint, data, { headers });
    const message = response.data.choices[0].message.content;
    return message;
  } catch (error) {
    // If quota exceeded or other error, return message
    if (error.response && error.response.status === 429) {
      console.warn('Quota exceeded, please check your OpenAI API usage.');
      return "Sorry, the OpenAI API quota has been exceeded. Please try again later.";
    }
    console.error('Error fetching ChatGPT response:', error);
    throw error;
  }
}
