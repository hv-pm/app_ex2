import { useContext } from "react";
import AuthContext from "../context/auth";

function Signin() {
    const classnames = "flex flex-col px-14 pt-5 pb-8";
    const labelClassNames = "block text-gray-700 text-sm font-bold mb-2";
    const inputClassNames = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    const {loginUser} = useContext(AuthContext);

    const handleSubmit = (event) => {
        loginUser(event);
    };

    return (
        <div className="bg-slate-100 grid content-center justify-items-center h-screen w-screen">
            <form className="grid cols-span-1 content-center h-[22rem] w-[26rem] sm:w-[30rem] bg-white shadow-md rounded" onSubmit={handleSubmit}>
                <div className={classnames}>
                    <label className={labelClassNames}>Username</label>
                    <input className={inputClassNames} type="text" name="username" id="username" placeholder="Insert your username." required></input>
                </div>
                <div className={classnames}>
                    <label className={labelClassNames}>Password</label>
                    <input className={inputClassNames} type="password" name="password" id="password" placeholder="***********" required></input>
                </div>
                <div className={classnames}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Entrar</button>
                </div>
            </form>
        </div>
    );
}

export default Signin;