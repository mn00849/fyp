import React, { useState, useRef } from 'react';
import Select from 'react-select';
import html2pdf from 'html2pdf.js';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import Navbar from '../Navbar';
import Worksheet from './Worksheet';

const sampleData = [
    { value: 'factorising', label: 'Factorising'},
    { value: 'solving_equations', label: 'Solving Equations'},
    { value: 'quadratic_simultaneous_equations', label:'Quadratic Simultaneous Equations'},
    { value: 'simultaneous_equations', label: 'Simultaneous Equations' },
    { value: 'percentages', label: 'Percentages' },
    { value: 'ratio', label: 'Ratio' }
  ];

export default function Topics() {
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [worksheetCreated, setWorksheetCreated] = useState(false);
    const [worksheetQuestions, setWorksheetQuestions] = useState(5);
    const [topicsSelected, setTopicsSelected] = useState([]);
    const [topicsText, setTopicsText] = useState('');
    const [difficulty, setDifficulty] = useState('foundation');
    const [problemSolving, setProblemSolving] = useState(false);

    const myRef = useRef(null);
    const executeScroll = () => myRef.current.scrollIntoView();

    const generateWorksheet = () => {
        if (topicsSelected.length > 0) {
            // topic names
            let topics = [];
            for (let i=0; i < topicsSelected.length; i++) {
                topics.push(topicsSelected[i].value);
            }
            setTopicsText(topics.join('&'));

            setWorksheetCreated(false);
            setWorksheetQuestions(numberOfQuestions);
            setTimeout(()=>
            setWorksheetCreated(true),1);
        } else {
            alert("You haven't picked any topics!");
        }
    }

    const parseTopics = (topics) => {
        let topicsNames = [];

        for (let i=0; i < topics.length; i++) {
            topicsNames.push({'value': topics[i].value,'label': topics[i].label});
        }

        setTopicsSelected(topicsNames);
    }

    const scrollToAnswers = () => {
        const yOffset = 100; // Adjust this value as needed
        const element = document.getElementById('answers');
        if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition - yOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth' // Optional: Add smooth scrolling behavior
        });
        }
    }

    const Print = (worksheetPart) => {     
        const element = document.getElementById(worksheetPart).innerHTML;

        // Instead of extracting styles from document style sheets, include your Tailwind CSS or any other external stylesheet
        // Make sure to include the correct path or URL to your external stylesheet
        const externalStyles = [
            'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css'
        ];

        const options = {
            margin: 10,
            filename: 'worksheet.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            // Add pagebreak option with a CSS selector where you want the page break to occur
            pagebreak: { mode: 'css', avoid: '.pagebreak' }
        };
    
        html2pdf().set(options).from(element).save();
    }

    return(
        <div>
            <Navbar />

            <div className='mt-[30px]'>
                <h1 className='text-center text-3xl sm:text-3xl md:text-5xl lg:text-6xl'>Worksheet Generator</h1>

                {/* Topic Search */}
                <div className='mt-[50px] ml-auto mr-auto w-[350px] outline rounded-[5px] outline-black-500 p-[5px] flex items-center'>
                    <MagnifyingGlassIcon className='w-[32px] h-[32px]' />
                    {/*<input type='text' className='flex-shrink-0 ml-[10px] mr-[10%px] text-xl w-[85%] focus:outline-none focus:border-transparent' placeholder='Search for topic...' />*/}
                    <Select options={sampleData} onChange={(topics)=>parseTopics(topics)} isMulti className='flex-shrink-0 ml-[10px] mr-[10%px] text-xl w-[85%] focus:outline-none focus:border-transparent' placeholder='Search for topic...' />
                </div>

                {/* Select Number of Questions */}
                <div className='mt-[15px]'>
                    <div className='text-center'>
                        <span className='text-xl'>Number of questions: </span>
                        <select className='text-l ml-[15px] p-[5px] cursor-pointer' onChange={(e)=>setNumberOfQuestions(e.target.value)}>
                            <option>5</option>
                            <option>10</option>
                        </select>
                        <br/>
                        <div className='mt-[10px]'>
                            <span className='text-xl'>Do you want problem solving focused questions?</span>
                            <select className='text-l ml-[15px] p-[5px] cursor-pointer' onChange={(e)=>setProblemSolving(e.target.value)}>
                                <option>No</option>
                                <option>Yes</option>
                            </select>
                        </div>
                        <div className='mt-[10px]'>
                            <span className='text-xl'>Difficulty Level: </span>
                            <select className='text-l ml-[15px] p-[5px] cursor-pointer' onChange={(e)=>setDifficulty(e.target.value)}>
                                <option>Foundation</option>
                                <option>Higher</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Worksheet Buttons */}
                <div className='mt-[20px] ml-auto mr-auto justify-center text-center'>
                    {
                        !worksheetCreated &&
                        <div>
                            <input value='Create Worksheet' type='submit' onClick={()=>generateWorksheet()} className='text-xl w-[250px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-[250px] ' />
                        </div>
                    }
                </div>

                <div className='mt-[20px] grid grid-cols-1 md:grid-cols-2 gap-2 ml-auto mr-auto text-center w-[300px] md:w-[550px]'>
                    { worksheetCreated &&
                    <div>
                        <input value='Create Worksheet' type='submit' onClick={()=>generateWorksheet()} className='text-xl w-[250px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-[250px] ' />
                    </div>
                    }
                    { worksheetCreated &&
                        <div>
                            <input onClick={()=>Print('worksheet')} value='Print Worksheet' type='submit' className='text-xl w-[250px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-[250px] ' />
                        </div>
                    }
                    { worksheetCreated &&
                        <div>
                            <input onClick={()=>scrollToAnswers()} value='Scroll to Answers' type='submit' className='text-xl w-[250px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-[250px] ' />
                        </div>
                    }
                    { worksheetCreated &&
                        <div>
                            <input onClick={()=>Print('answers')} value='Print Answers' type='submit' className='text-xl w-[250px] bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-[250px] ' />
                        </div>
                    }
                </div>


                {/* Worksheet */}
                {worksheetCreated ?
                    <div className='mt-[75px]'>
                        <Worksheet topics={topicsSelected} numberOfQuestions={worksheetQuestions} problemSolving={problemSolving} difficulty={difficulty} topicsText={topicsText} />
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}