import React from 'react';

import { InlineMath, BlockMath } from 'react-katex';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: 275, question: [], answer: '', steps: [] };
    }

    componentDidMount() {
        this.setState({ height: (window.innerHeight/3) });

        // splitting the question up based on if there is LaTeX inside
        let currentQuestion = this.props.questionParagraph;
        currentQuestion = currentQuestion.split(/(\$[^$]*\$)/);
        this.setState({ question: currentQuestion });

        if (this.props.answer !== undefined) {
            this.setState({ answer: this.props.answer[0] });
        }

        this.setState({ steps: this.props.answer[1]});
        try {
            let currentSteps = this.props.answer[1];
            currentSteps = currentSteps.split(/(\$[^$]*\$)/);
            this.setState({ steps: currentSteps });
        } catch {
            console.log('error with steps');
        }
    }

    render() {
        return(
            <div>
                <div className='pagebreak border border-black border-[25px] rounded-md pl-[5px] pr-[5px] pb-[275px] m-[10px] mt-[10px]'>
                    <p className='ml-[5px]'>
                        <b>Q{this.props.questionNumber}.</b>
                        &emsp;
                        {this.state.question.map((currentQuestion, questionNumber)=>
                            <span>
                                &emsp;
                                {currentQuestion[0] === '$' && currentQuestion[currentQuestion.length-1] === '$' ?
                                    <InlineMath math={currentQuestion.replaceAll("$","")} className='text-black' />
                                    :
                                    <span>
                                        {currentQuestion}
                                    </span>
                                }
                            </span>
                        )}
                        <br/>
                        Answer:<br/>
                        <InlineMath math={this.props.answer[0].replaceAll("$","")} className='text-black' />
                        <br/>Steps:<br/>
                        {this.state.steps.map((currentStep, stepNumber)=>
                            <span>
                                &emsp;
                                {currentStep[0] === '$' && currentStep[currentStep.length-1] === '$' ?
                                    <InlineMath math={currentStep.replaceAll("$","")} className='text-black' />
                                    :
                                    <span>
                                        {currentStep}
                                    </span>
                                }
                            </span>
                        )}
                    </p>
                </div>
            </div>
        );
    }
}