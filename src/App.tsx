import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import GoogleLogin from "react-google-login";
import "./app.css";

interface AuthResponse {
    token: string;
    user: User;
}

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}

export default function App() {
    const [flag, setFlag] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const HandlePage = (flag: boolean) => {
        setFlag(flag);
    };

    const init = () => {
        setName("");
        setEmail("");
        setPassword("");
    };

    const HandleLogin = async () => {
        try {
            const result = await axios.post(
                process.env.REACT_APP_SERVERURL + "/api/login",
                {
                    email: email,
                    password: password,
                }
            );

            if (result.data.token) {
                console.log(result.data.token);
                alert("OK");
                init();
            }
        } catch (err: any) {
            if (err.response.status) {
                alert(err.response.data);
            } else {
                alert("Server Errorr");
            }
        }
    };

    const HandleRegistry = async () => {
        try {
            const result = await axios.post(
                process.env.REACT_APP_SERVERURL + "/api/registry",
                {
                    name: name,
                    email: email,
                    password: password,
                }
            );

            if (result.data.success) {
                alert("OK");
                init();
            }
        } catch (err: any) {
            if (err.response.status) {
                alert(err.response.data);
            } else {
                alert("Server Errorr");
            }
        }
    };

    const OnSuccess = async (res: any) => {
        try {
            console.log(res);
            const result: AxiosResponse<AuthResponse> = await axios.post(
                process.env.REACT_APP_SERVERURL + "/api/g-login",
                {
                    token: res?.tokenId,
                }
            );

            if (result.data.token) {
                console.log(result.data.token);
                alert("OK");
            }
        } catch (err: any) {
            if (err.response.status) {
                alert(err.response.data);
            } else {
                alert("Server Errorr");
            }
        }
    };

    return (
        <div className="App">
            <div className="tab">
                <button className="tablinks" onClick={() => HandlePage(false)}>
                    Sign In
                </button>
                <button className="tablinks" onClick={() => HandlePage(true)}>
                    Sign Up
                </button>
            </div>

            {flag ? (
                <fieldset>
                    <legend>
                        <h3>Registry</h3>
                    </legend>
                    <div className="elements">
                        <span>
                            <label htmlFor="name">Name: </label>
                            <input
                                type={"text"}
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </span>
                        <span>
                            <label htmlFor="email">Email: </label>
                            <input
                                type={"text"}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </span>
                        <span>
                            <label htmlFor="password">Password: </label>
                            <input
                                type={"password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </span>
                        <button onClick={HandleRegistry}>Registry</button>
                    </div>
                </fieldset>
            ) : (
                <fieldset>
                    <legend>
                        <h3>Login</h3>
                    </legend>
                    <div className="elements">
                        <span>
                            <label htmlFor="email">Email: </label>
                            <input
                                type={"text"}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </span>
                        <span>
                            <label htmlFor="password">Password: </label>
                            <input
                                type={"password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </span>
                        <button onClick={HandleLogin}>Login</button>
                    </div>
                </fieldset>
            )}

            <div className="spacer"></div>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                onSuccess={OnSuccess}
            />
        </div>
    );
}
