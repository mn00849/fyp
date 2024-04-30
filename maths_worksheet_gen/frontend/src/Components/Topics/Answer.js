import React from 'react';

var Latex = require('react-latex');

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
                        {this.state.question.map((currentQuestion, index) => {
                            if (currentQuestion.startsWith('$') && currentQuestion.endsWith('$')) {
                                try {
                                    // Attempt to render LaTeX content using Latex component
                                    return (
                                        <Latex key={index} strict>
                                            {currentQuestion}
                                        </Latex>
                                    );
                                } catch (error) {
                                    console.error('Error rendering LaTeX:', error);
                                    // If an error occurs during rendering, fall back to plain text
                                    return (
                                        <span key={index}>
                                            {currentQuestion}
                                        </span>
                                    );
                                }
                            } else {
                                // Render plain text or non-LaTeX content
                                return (
                                    <span key={index}>
                                        {currentQuestion}
                                    </span>
                                );
                            }
                        })}
                        <br/>
                        Answer:<br/>
                        <span>
                            {this.props.answer[0]}
                        </span>
                        <br/>Steps:<br/>
                        <span>
                            {this.props.answer[1]}
                        </span>
                    </p>
                </div>
            </div>
        );
    }
}