import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const SignUpFormContainer = styled.div`
  width: 100%;
  max-width: 900px;
  height: auto;
  max-height: 500px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%),
    0px 1px 8px 0px rgb(0 0 0 / 12%);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 0px;
    max-width: 350px;
  }
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 10px 0;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const FormContainerH1 = styled.h1`
  font-size: 32px;
  margin-top: 0;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background-color: #edf5f3;
  font-size: 14px;
  margin: 10px 0;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 12px;
  }
`;

const ErrorMsg = styled.div`
  width: 100%;
  padding: 15px;
  margin: 5px 0;
  font-size: 14px;
  background-color: #f34646;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    border-top-left-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 10px;
  }
`;

const RightH1 = styled.h1`
  margin-top: 0;
  color: white;
  font-size: 32px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const WhiteBtn = styled.button`
  border: none;
  outline: none;
  padding: 12px 0;
  background-color: white;
  border-radius: 20px;
  width: 160px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin: 10px 0;
`;

const GreenBtn = styled.button`
  border: none;
  outline: none;
  padding: 12px 0;
  background-color: #ff69b4;
  color: white;
  border-radius: 20px;
  width: 160px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  margin: 10px;
`;

const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data: res } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`, data);
      navigate("/");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError("Server error. Please try again!");
      }
    }
  };

  return (
    <SignUpContainer>
      <SignUpFormContainer>
        <Left>
          <FormContainer onSubmit={handleSubmit}>
            <FormContainerH1>Create Your Account</FormContainerH1>
            <Input
              type="text"
              required
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
            />
            <Input
              required
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
            />
            <Input
              required
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
            <InputContainer>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
              <EyeIcon onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </EyeIcon>
            </InputContainer>
            {error && <ErrorMsg>{error}</ErrorMsg>}
            <GreenBtn type="submit">Sign Up</GreenBtn>
          </FormContainer>
        </Left>
        <Right>
          <RightH1>Welcome Back!</RightH1>
          <Link to="/Login">
            <WhiteBtn>Sign In</WhiteBtn>
          </Link>
        </Right>
      </SignUpFormContainer>
    </SignUpContainer>
  );
};

export default SignUp;
