import React from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.css'
import {useEffect, useState} from "react"




export default function Riddles() {
    const [riddle, setRiddle] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        fetchRiddle();
    }, []);

    function fetchRiddle() {
        fetch("https://riddles-api.vercel.app/random")
            .then(res => res.json())
            .then(data => {
                setRiddle(data)
                setShowAnswer(false)
                setUserAnswer("")
                setIsCorrect(false)
            })
            .catch(error => console.error("Error fetching riddle:", error))
    }
    

    function handleChange(event){
        setUserAnswer(event.target.value)
        setShowAnswer(false) 
        setIsCorrect(false)
    };

    function handleSubmit(event){
        event.preventDefault() 
        if (userAnswer.trim().toLowerCase() === riddle.answer.toLowerCase()) {
            setIsCorrect(true)
        } else {
            setIsCorrect(false)
        }
        setShowAnswer(true)
    };

    function getRiddle(){

    }

    return (
        <main className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <div className="riddle">
                            <p>{riddle.riddle}</p>
                            <br />
                            <Form onSubmit={handleSubmit}>
                                <Form.Control 
                                    type="text"
                                    size="lg"
                                    placeholder="Answer"
                                    value={userAnswer}
                                    onChange={handleChange}
                                />
                                <div className="d-flex justify-content-center mt-3">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="mx-2"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={fetchRiddle}
                                        size="lg"
                                        className="mx-2"
                                    >
                                        Get New Riddle
                                    </Button>
                                </div>
                            </Form>
                            {showAnswer && (
                                isCorrect ? <p>Correct!</p> : <p>Incorrect. The correct answer is: {riddle.answer}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}