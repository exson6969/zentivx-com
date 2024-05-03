import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from 'marked'; // import marked library
import he from 'he';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const Home = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [copyMessage, setCopyMessage] = useState('');
    const [inputEmpty, setInputEmpty] = useState(false);

    useEffect(() => {
        setOutputText(marked(outputText));
    }, [outputText]);

    const handleGenerateClick = async (event) => {
        event.preventDefault();
        if (!inputText.trim()) {
            setInputEmpty(true);
            return;
        }
        setLoading(true);
        const result = await run(inputText);
        setOutputText(result);
        setLoading(false);
        setInputEmpty(false);
    }

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    }

    const handleCopyClick = (event) => {
        event.preventDefault();
        let cleanedText = he.decode(outputText.replace(/<\/?[^>]+(>|$)/g, ""));
        navigator.clipboard.writeText(cleanedText)
            .then(() => {
                setCopyMessage('Copied!');
                setTimeout(() => {
                    setCopyMessage('');
                }, 2000);
            })
            .catch((error) => console.error('Error copying text: ', error));
    }


    const run = async (inputText) => {
        const prompt = inputText;
        const result = await model.generateContent(`I have to take lecture for 2 hours. I need you to help me make notes from the book. I am giving you the passage that I have selected. You have to make point by point notes of the given passage, give appropriate title, include any extra relevant details. Keep the sentences short, but include all details in the passage. 
        Here’s the passage:  ${prompt}`);
        const response = await result.response;
        const text = await response.text();
        return text;
    }

    return (
        <div className='p-6 flex flex-col justify-between h-screen'>
            <Header />
            <main className='flex items-center justify-center flex-col'>
                <h1 className='md:text-8xl text-2xl font-semibold text-slate-700 text-center'>Transforming Text into <br /> Teachable Moments</h1>
                <form action="" className='w-4/5 py-6 flex md:flex-row flex-col gap-6'>
                    <div className="flex flex-col w-full relative">
                        <textarea
                            placeholder="Paste your paragraph... "
                            name="inputText"
                            id="inputText"
                            rows="10"
                            className={`w-full px-3 py-2 border overflow-y-scroll border-gray-300 rounded-md focus:outline-none focus:border-green-500 ${inputEmpty ? 'border-red-500' : ''}`} // Add border-red-500 class if input is empty
                            value={inputText}
                            onChange={handleInputChange}
                        ></textarea>
                        {inputEmpty && <p className="text-red-500 text-xs absolute bottom-2 left-2">Please provide input text.</p>} {/* Display input empty message */}
                        <button
                            className='absolute bottom-2 right-2 text-white bg-orange-600 hover:border-orange-600 border-2 hover:text-orange-600 duration-700 opacity-55 hover:opacity-100 hover:bg-white rounded-full px-6 py-2 ml-4'
                            onClick={handleGenerateClick}
                        >
                            Generate
                        </button>
                    </div>

                    <div className="flex flex-col w-full relative">
                        {loading ? (
                            <div className="loader"></div>
                        ) : (
                            <div className="output-text-container">
                                <div style={{ height: "259px" }} className="w-full px-3 py-2 border overflow-y-scroll border-gray-300 bg-white rounded-md focus:outline-none focus:border-green-500 relative">
                                    <div dangerouslySetInnerHTML={{ __html: outputText }} />
                                </div>
                                <button className='copy-button' onClick={handleCopyClick}>Copy</button>
                            </div>
                        )}
                        {copyMessage && <p className="text-green-500 absolute bottom-4 left-2">{copyMessage}</p>}
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    )
}

export default Home;
