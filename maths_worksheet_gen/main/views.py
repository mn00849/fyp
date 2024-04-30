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
            questionJSON = json.loads(question)
        except:
            question = generateQuestion(topic=topic, problemSolving=problemSolvingTemp, tier=difficulty.lower())
            questionJSON = json.loads(question)

    print(questionJSON)

    return JsonResponse(questionJSON)