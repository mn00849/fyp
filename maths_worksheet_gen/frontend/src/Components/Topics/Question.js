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
                        {this.state.question.map((currentQuestion, questionNumber)=>
                            <span>
                                &emsp;
                                {currentQuestion[0] === '$' && currentQuestion[currentQuestion.length-1] === '$' ?
                                    <Latex>
                                        {currentQuestion}
                                    </Latex>
                                    :
                                    <span>
                                        {currentQuestion}
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