import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  width: 25%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;


//Login Screen with Basic Login Request to Django and Authentication, saving User data locally for persistence
const Login = () => {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Error,setError] = useState(false);
    const handleClick =  (e) => {
        e.preventDefault();
        const data = { "Name": username, "Password": password};

        
        axios.post('http://127.0.0.1:8000/Server/login/', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(response=>{
              localStorage.setItem("Name", response.data.Name);
              nav("/");
            }).catch(err=>{
              console.log("Error Logging in",err);
              setError(true);
            });
            
        }
       
  
    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button onClick={handleClick} >
                        LOGIN
                    </Button>
                    
                    <Link onClick={()=>{nav('/Register')}}>CREATE A NEW ACCOUNT</Link>
            {Error && <div style={{ color: "red" }}>
              Error Occured. Try again with different credentials
            </div>}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Login;