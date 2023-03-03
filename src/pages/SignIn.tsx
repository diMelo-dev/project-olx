import React, { useState } from "react";
import useApi from '../helpers/OlxApi';
import { doLogin } from "../helpers/AuthHandler";
import { Error } from '../Components/Error';

export function SignIn() {

    let api = useApi();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberPassword, setRememberPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    async function hanldeSubmit(e: React.FormEvent) {
        e.preventDefault();
        setDisabled(true);
        setError('');
        

        const json = await api.login(email, password);

        //Fazer a verificação de erro
        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, rememberPassword);
            window.location.href = '/';
        }

        setDisabled(false);
    }

    return(
        <div className="p-[10px]">
            <div className=" max-w-[1000px] m-auto flex justify-center flex-col gap-[20px]">
                <h1 className=" text-[#18122B] dark:text-[#e2e8f0] text-[30px]">Login</h1>

                {error && 
                    <Error  message={error} />
                }
                

                <form className=" py-[10px] px-[20px] bg-slate-300 flex flex-col gap-[15px] shadow-xl rounded" onSubmit={(e: React.FormEvent) => hanldeSubmit(e)}>
                    
                    <label className=" max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Email</div>
                        <input 
                            type='email' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                            required
                        ></input>
                    </label>

                    <label className=" max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Senha</div>
                        <input 
                            type='password' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                            required
                        ></input>
                    </label>

                    <label className=" max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Lembrar Senha</div>
                        <input 
                            type='checkBox' 
                            disabled={disabled}
                            className='w-5 h-5 sm:w-[15px] sm:h-[15px] px-[20px] rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            checked={rememberPassword}
                            onChange={() => setRememberPassword(!rememberPassword)}
                        ></input>
                    </label>

                    <label className=" max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right"></div>
                        <button className="p-3 sm:p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                            Fazer Login
                        </button>
                    </label>
                </form>

            </div>
        </div>
        
    );
}