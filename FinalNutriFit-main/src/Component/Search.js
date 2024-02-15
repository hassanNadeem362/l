import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();



    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/searched/" + input);
    };
    
    return (
        <PageWrapper>
            <FormStyle onSubmit={submitHandler}>
                <div>
                    <FaSearch></FaSearch>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        value={input}
                    />
                </div>
    
          
            </FormStyle>
        </PageWrapper>
    );
}


const FormStyle = styled.form`
    margin: 2rem 10rem;
    width: 70%;
    position: relative;
    
    
    input{
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem;
        color: white;
        padding: 1rem 3rem;
        border: none;
        outline: none;
        width: 100%;
        border-radius: 50px;

    }
    svg{
        position: absolute;
        top: 40%;
        left: 3%;
        tranform: translate(100%, -50%);
        color: white;
    }
`

const PageWrapper = styled.div`
    margin: 0% 20%;
`


export default Search