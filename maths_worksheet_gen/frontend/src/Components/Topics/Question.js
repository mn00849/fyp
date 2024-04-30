import React from 'react';

import Latex from 'react-latex-next';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = { height: 275, question: [] };
    }

    componentDidMount() {
        this.setState({ height: (window.innerHeight/3) });

        // splitting the question up based on if there is LaTeX inside
        let currentQuestion = this.props.questionParagraph;
        currentQuestion = currentQuestion.split(/(\$[^$]*\$)/);
        this.setState({ question: currentQuestion });
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
                    </p>
                </div>
            </div>
        );
    }
}