import React from 'react';

import Question from './Question';
import Answer from './Answer';

export default class Worksheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], questionsRendered: false, answers: [], title: '', topics: '', difficulty: 'foundation', problemSolving: 'No' };
        this.createQuestion = this.createQuestion.bind(this);
    }

    createQuestion = async (topic) => {
        let questions = this.state.questions;
        let answers = this.state.answers;

        if (questions.length < this.props.numberOfQuestions) {
            fetch('/api/getQuestion/topic='+this.props.topicsText+'&difficulty='+this.props.difficulty+'&'+'problemSolving='+this.props.problemSolving).then((data)=>data.json()).then(
                (questionData)=>{
                    questions.push(questionData.question);
                    answers.push([questionData.answer, questionData.steps ]);
                    this.setState({ questions: questions, answers: answers });
                }
            ).catch((error)=>this.createQuestion(topic));
        }
    }

    async componentDidMount() {
        
        this.setState({ title: this.props.topics[0].label });
    
        const promises = [];
    
        let numberOfQuestions = this.props.numberOfQuestions;
        let topicNumber = 0;
        while (numberOfQuestions > 0) {
            promises.push(this.createQuestion(this.props.topics[topicNumber].value));
            topicNumber += 1;
            if (topicNumber > this.props.topics.length-1) {
                topicNumber = 0;
            }
            numberOfQuestions -= 1;
        }
    
        await Promise.all(promises);
        this.setState({ questionsRendered: true });
    }

    render() {
        return(
            <div>
                {/* Worksheet Questions */}
                <div id='worksheet' className='flex flex-col justify-start outline rounded-[5px] outline-black-500 mb-[50px] w-[75%] sm:w-[70%] md:w-[70%] lg:w-[50%] ml-auto pb-[50px] mr-auto space-y-[5px]'>
                    <div className='m-[10px] pb-[5px]'>
                        <h1 className='text-left text-2xl'>{this.state.title}</h1>
                    </div>
                    
                    {/* Question */}
                    { this.state.questionsRendered ?
                        <div>
                            {this.state.questions.map((question, questionNumber)=>
                                <div key={questionNumber*100}>
                                    <Question questionNumber={questionNumber+1} questionParagraph={question} />
                                    {(questionNumber + 1) % 3 === 0 && questionNumber !== 0 && <div className='pagebreak'></div>}
                                </div>
                            )}
                        </div>
                        :
                        null
                    }
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
                </div>

                {/* Worksheet Answers */}
                <div id='answers' className='flex flex-col justify-start outline rounded-[5px] outline-black-500 mb-[50px] w-[75%] sm:w-[70%] md:w-[70%] lg:w-[50%] ml-auto pb-[50px] mr-auto space-y-[5px]'>
                    <div className='m-[10px] pb-[5px]'>
                        <h1 className='text-left text-2xl'>{this.state.title} Answers</h1>
                    </div>
                    
                    {/* Answers */}
                    { this.state.questionsRendered ?
                        <div>
                            {this.state.answers.map((answer, questionNumber)=>
                                <div className='' key={questionNumber*100}>
                                    <div className='pb-[5px] pagebreak'>
                                        <Answer questionNumber={questionNumber+1} questionParagraph={this.state.questions[questionNumber]} answer={answer} />
                                        {(questionNumber + 1) % 3 === 0 && questionNumber !== 0 && <div className='pagebreak'></div>}
                                    </div>
                                </div>
                            )}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}