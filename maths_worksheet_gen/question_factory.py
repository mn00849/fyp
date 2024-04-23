import os
from os import walk
from dotenv import load_dotenv, dotenv_values
from openai import OpenAI

load_dotenv()
os.environ['OPENAI_API_KEY'] = os.environ.get('OPENAI_API_KEY')

client = OpenAI()

# string of questions
directory = '../maths_papers/data/'

def generateQuestion(topic='Factorising', problemSolving=False, tier='foundation'):
    ''' 
    topic: string - topic that is to be generated
    problemSolving: boolean - checks if it should be a problem solving type question 
    tier: string - shows if foundation or higher
    '''

    question_data = ''

    # Iterate over all files in the directory
    for filename in os.listdir(directory):
        # Check if the file is a text file
        if filename.endswith('.txt') and (tier in filename):
            # Construct the full path to the file
            filepath = os.path.join(directory, filename)
            
            # Open the file in read mode ('r')
            with open(filepath, 'r', encoding='utf-8') as file:
                # Read the entire contents of the file into a string variable
                file_contents = file.read()
                question_data += '\n' + file_contents

    prompt = ''

    if (problemSolving == True):
        prompt = f"Generate a {tier} Tier GCSE maths question in a real life context on the topic on {topic} with an answer. Double check the answer but don't show you have double checked the answer. Surround any algebraic expressions or equations with a dollar sign on each side. Give the question, answer and steps to get the answer in a JSON. The answer should be a single string."
    else:
        prompt = f"Generate a {tier} Tier GCSE maths question on the topic on {topic} with an answer. Double check the answer but don't show you have double checked the answer. Surround any algebraic expressions or equations with a dollar sign on each side. Give the question, answer and steps to get the answer in a JSON. The answer should be a single string."

    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [
            { 
                "role": "system", "content": f"This is the style of questions you are to use for any questions you generate: {question_data}",
                "role": "user", "content": prompt #f"Generate a {tier} GCSE maths question in a real life context on the topic on {topic} with an answer. Double check the answer but don't show you have double checked the answer. Surround any algebraic expressions or equations with a dollar sign on each side. Give the question, answer and steps to get the answer in a JSON."
            }
        ]
    )

    return completion.choices[0].message.content