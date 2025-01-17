import styled from "styled-components";

import { useState } from "react";

import { useNavigate } from 'react-router-dom';
import axios from "axios";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

//Register functionality, creating new user and saving data for persistence
const Register = () => {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Error,setError] = useState(false);
    
    
    const handleClick = (e) => {
        e.preventDefault();
        const data = { "Name": username, "Password": password };
        
        axios.post('http://127.0.0.1:8000/Server/register/', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => {
            localStorage.setItem("Name", response.data.Name);
            nav("/");
        }).catch(err => {
            console.log("Error Registering in", err);
            setError(true);
        });
        
    }     
        
    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                   
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick={password.length>=8? handleClick:()=>{alert("Password Must be atleast size 8")}}>CREATE</Button>
                    {Error && <div style={{color:"red"}}>
                    Error Occured. Try again with different credentials
                    </div>}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;