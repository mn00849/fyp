import React from 'react';

//var Latex = require('react-latex');
import { MathJaxProvider, MathJaxFormula } from 'mathjax3-react';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: 275, question: [], answer: '', steps: '' };
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
    }

    render() {
        return(
            <div>
                <div className='pagebreak border border-black border-[25px] rounded-md pl-[5px] pr-[5px] pb-[275px] m-[10px] mt-[10px]'>
                    <p className='ml-[5px]'>
                        <b>Q{this.props.questionNumber}.</b>
                        &emsp;
                        <MathJaxProvider options={{
                                tex: {
                                inlineMath: [
                                    ['$', '$'],
                                ],
                                },
                            }}>
                            <MathJaxFormula formula={this.state.question} />
                        </MathJaxProvider>
                        <br/>
                        Answer:<br/>
                        <MathJaxProvider options={{
                                tex: {
                                inlineMath: [
                                    ['$', '$'],
                                ],
                                },
                            }}>
                            <MathJaxFormula formula={this.props.answer[0]} />
                        </MathJaxProvider>
                        <br/>Steps:<br/>
                        <MathJaxProvider options={{
                                tex: {
                                inlineMath: [
                                    ['$', '$'],
                                ],
                                },
                            }}>
                            <MathJaxFormula formula={this.props.answer[1]} />
                        </MathJaxProvider>
                    </p>
                </div>
            </div>
        );
    }
}