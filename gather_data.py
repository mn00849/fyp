# This script gathers all the questions and answers to GCSE papers
# It iterates through the papers in the folder 'maths_papers' and creates a text file from there
# The text file can then be used as data to be used to train GPT on

import re
from pypdf import PdfReader
import random
import pdfplumber
from os import walk

root = './maths_papers/'
letters = list('abcdefghijklmnopqrstuvwxyz')

# Function to gather data
def scan_data(paper):
    pdf_reader = PdfReader(root+"questions/"+paper+".pdf")
    
    text = {}
    
    for i in range(1,len(pdf_reader.pages)):
        page = pdf_reader.pages[i]
        text[i] = page.extract_text()

    # parsing the questions out
    questions = []

    # removing the text before answer all questions
    #text[1] = text[1].split('You must write down all the stages in your working.\n')[1]

    regex_pattern = r"\(Total for Question (\d+) is (\d+) marks\)"

    for thisText in text:
        # getting each of the questions
        questionsPage = re.split(regex_pattern, text[thisText])

        questionNumber = 0

        # getting the question number
        if len(questionsPage) > 1:
            questionNumber = questionsPage[1]

        for question in questionsPage:
            # adding the questions
            questionCompleted = ""

            # Checking if it is an indices question
            if ("Give your answer as a power of" in question):
                # getting the power
                
                sentence = question[question.index("power"):len(question)]
                number_pattern = r"\d+"
                numbers = re.findall(number_pattern, sentence)
                power = "1"

                if numbers:
                    power = numbers[0]  # Extract the first number found

                for i in range(0,question.index("power")):
                    if (question[i] == power):
                        if (question[i] != "("):
                            if (i != 0):
                                if (question[i-1] != ")"):
                                    questionCompleted += question[i]+"^"
                                else:
                                    questionCompleted += "^"+question[i]
                    else:
                        questionCompleted += question[i]

                questionCompleted += question[question.index("power"):len(question)]
                questionCompleted = questionCompleted.replace("\n"," ")
                questionCompleted = questionCompleted.encode().decode('unicode_escape') 
                '''questionCompleted = questionCompleted.replace("\uf0a2","")
                questionCompleted = questionCompleted.replace("\xa0","")
                questionCompleted = questionCompleted.replace("\uf8f7","")
                questionCompleted = questionCompleted.replace("\uf084","")
                questionCompleted = questionCompleted.replace("\u2212","")'''
                questionCompleted = questionCompleted.replace("*P68721A0728*","")
                questionCompleted = questionCompleted.replace("*P68721A02328*","")
                questionCompleted = questionCompleted.replace("*P68721A02528*","")
                questionCompleted = questionCompleted.replace("Turn over","")
                questionCompleted = re.sub(' +', ' ', questionCompleted)
                questionCompleted = re.sub(r' TOTAL FOR PAPER IS (\d+) MARKS', '', questionCompleted)
            else:
                questionCompleted = question

                questionCompleted = questionCompleted.replace("\n"," ")
                questionCompleted = questionCompleted.encode().decode('unicode_escape') 
                '''questionCompleted = questionCompleted.replace("\xa0","")
                questionCompleted = questionCompleted.replace("\uf0a2","")
                questionCompleted = questionCompleted.replace("\uf8f7","")
                questionCompleted = questionCompleted.replace("\uf084","")
                questionCompleted = questionCompleted.replace("\u2212","")'''
                questionCompleted = questionCompleted.replace("*P68721A0728*","")
                questionCompleted = questionCompleted.replace("*P68721A02328*","")
                questionCompleted = re.sub(r'\*([^*]+)\*','', questionCompleted)
                questionCompleted = questionCompleted.replace("Turn over","")
                questionCompleted = re.sub(' +', ' ', questionCompleted)
                questionCompleted = re.sub(r' TOTAL FOR PAPER IS (\d+) MARKS', '', questionCompleted)

            if (len(questionCompleted) > 5) and (not "BLANK PAGE" in questionCompleted):
                questionCompleted = f"Question {questionNumber}: {questionCompleted}"
                questions.append(questionCompleted)

    answer_root = root+"answers/"+paper+"_answers.pdf"

    answers = []

    with pdfplumber.open(answer_root) as pdf:
        # Loop through each page
        for page in pdf.pages:
            # Extract text content from the page
            text = page.extract_text()

            # Check if the page contains any of the specified headings
            headings_to_check = ["question", "answer", "mark", "mark scheme", "additional guidance"]
            if any(heading in text.lower() for heading in headings_to_check):
                # Extract tables from the page
                tables = page.extract_tables()

                # Loop through each extracted table
                for table in tables:
                    # Loop through each row in the table
                    for row in table:
                        # Check if the row has a number in the "question" column
                        if row and row[0] and any(char.isdigit() for char in row[0]) and "modification" not in row[0].lower():
                            # Print the row
                            #print(row)
                            row[0] = f"Question {row[0]} answer:\n"
                            if (len(row) > 9):
                                if (row[3] != None and row[9] != None):
                                    
                                    answerAll = []

                                    if ("\n" in row[0] and "\n" in row[3]):
                                        # splitting the answers up
                                        row_split = row[3].split("\n")
                                        answer = row[0]
                                        for number, part in enumerate(row_split):
                                            answer += f'Part {letters[number]}: {part}. '
                                    else:
                                        answer = row[0] + row[3]

                                    answerAll.append(f'{answer}.\nMark Scheme for question: {row[9]}.')
                                    answers.append(answerAll[0])
    
    return {"questions": questions, "answers": answers}


f = []
for (dirpath, dirnames, filenames) in walk(root + "questions"):
    f.extend(filenames)
    break


for paper_file in f:
    paper_name = paper_file.replace('.pdf','')
    data = scan_data(paper_name)

    data_file = open(f'{root}/data/{paper_name}.txt','w', encoding='utf-8')
    if ('foundation' in paper_name):
        data_file.write('Foundation Level Paper\n')
    if ('higher' in paper_name):
        data_file.write('Higher Level Paper\n')
    data_file.write('Questions: \n')
    for question in data['questions']:
        data_file.write(f"{question}\n")

    data_file.write('\n\n\n\nAnswers: \n')
    for answer in data['answers']:
        data_file.write(f"{answer}\n")
    
    data_file.close()
        

#data = scan_data('nov_higher_2022')'''