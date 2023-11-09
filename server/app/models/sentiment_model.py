import openai

openai.api_key = 'your-openai-api-key'

def analyze_sentiment(text):
    # Call the OpenAI API to analyze sentiment
    response = openai.Completion.create(
        engine="text-davinci-003",  # or whichever GPT-3 engine you prefer
        prompt="This is a sentiment analysis request: {}\n".format(text),
        max_tokens=1  # Adjust if you need more context
    )
    return response.choices[0].text.strip()
