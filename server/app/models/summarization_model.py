import openai

openai.api_key = 'your-openai-api-key'

def summarize_text(text):
    # Call the OpenAI API to summarize text
    response = openai.Completion.create(
        engine="text-davinci-003",  # or whichever GPT-3 engine you prefer
        prompt=text,
        max_tokens=50  # You may adjust the max tokens
    )
    return response.choices[0].text.strip()
