import {Heading} from "../components/Heading";
import {SubHeading} from "../components/SubHeading";
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button";
import {BottomWarning} from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    console.log(firstName);

    return <div className="bg-slate-300 h-screen flex justify-center items-center">  
        <div className="bg-white rounded-lg w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign up"}/>
            <SubHeading label={"Enter your information to create your account."}/>
            <InputBox onChange={(e) => {
                setFirstName(e.target.value);
            }} placeholder={"John"} label={"First Name"}/>
            <InputBox onChange={(e) => {
                setlastName(e.target.value);
            }} placeholder={"Doe"} label={"Last Name"}/>
            <InputBox onChange={(e) => {
                setusername(e.target.value);
            }} placeholder={"johndoe1"} label={"Username"}/>
            <InputBox onChange={(e) => {
                setpassword(e.target.value);
            }} placeholder={"123456"} label={"Password"}/>
            <Button onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        password: password
                    });
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                }} 
                label={"Sign Up"}/>
            <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
        </div>
    </div>
}