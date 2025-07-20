
// Generate 10 questions based on user input
export async function generateQuestions(input) {
  const response = await fetch('http://localhost:8000/generate_questions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
  });
  if (!response.ok) throw new Error('Failed to generate questions');
  return response.json();
}

// Generate prompt based on answers
export async function generatePrompt(answers) {
  const response = await fetch('http://localhost:8000/generate_prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  if (!response.ok) throw new Error('Failed to generate prompt');
  return response.json();
}

