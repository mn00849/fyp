from django.shortcuts import render
from django.http import JsonResponse
import json

from question_factory import generateQuestion

def parseJson(string):
    string = string.replace('\\', '\\\\')
    return string


def getQuestion(request, topic, difficulty, problemSolving):
    topics = topic.replace('_',' ')
    topics = topic.replace('&',' and ')

    problemSolvingTemp = False
    if (problemSolving == 'No'):
        problemSolvingTemp = False
    if (problemSolving == 'Yes'):
        problemSolvingTemp = True

    questionJSON = {}

    while len(questionJSON.keys()) < 3:
        try:
            question = generateQuestion(topic=topic, problemSolving=problemSolvingTemp, tier=difficulty.lower())
            questionJSONTest = json.loads(question)

            if not 'steps' in questionJSONTest:
                raise Exception('error - no steps')
            
            if not (isinstance(questionJSONTest['question'], str) and isinstance(questionJSONTest['answer'], str) and isinstance(questionJSONTest['steps'], str)):
                raise Exception('error - keys error')

            questionJSON = questionJSONTest
        except:
            question = generateQuestion(topic=topic, problemSolving=problemSolvingTemp, tier=difficulty.lower())
            questionJSONTest = json.loads(question)

            if not 'steps' in questionJSONTest:
                raise Exception('error - no steps')
            
            if not (isinstance(questionJSONTest['question'], str) and isinstance(questionJSONTest['answer'], str) and isinstance(questionJSONTest['steps'], str)):
                raise Exception('error - keys error')
            
            questionJSON = questionJSONTest

    print(questionJSON)

    return JsonResponse(questionJSON)