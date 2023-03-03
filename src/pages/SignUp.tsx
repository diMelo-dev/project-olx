import React, { useEffect, useState } from "react";
import useApi from '../helpers/OlxApi';
import { doLogin } from "../helpers/AuthHandler";
import { Error } from '../Components/Error';
import { StateLocType } from "../types/StateLocType";

export function SignUp() {

    let api = useApi();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [stateList, setStateList] = useState<StateLocType[]>([]);

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }

        getStates();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setDisabled(true);
        setError('');
        
        if(password !== confirmPassword) {
            setError('Senhas não batem');
            setDisabled(false);
            return;
        }



        const json = await api.register(name, email, password, stateLoc);
        
        if(json.error) {
            setError(json.error);
        } else {
            doLogin(json.token, false);
            window.location.href = '/';
        }

        setDisabled(false);
    }

    return(
        <div className="p-[10px]">
            <div className=" max-w-[1000px] m-auto flex justify-center flex-col gap-[20px]">
                <h1 className=" text-[#18122B] dark:text-[#e2e8f0] text-[30px]">
                    Cadastro
                </h1>

                {error && 
                    <Error  message={error} />
                }
                

                <form className=" py-[10px] px-[20px] bg-slate-300 flex flex-col gap-[15px] shadow-xl rounded" onSubmit={(e: React.FormEvent) => handleSubmit(e)}>
                    
                    <label className=" max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Nome Completo</div>
                        <input 
                            type='text' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={name}
                            onChange={(e) => {setName(e.target.value)}}
                            required
                        ></input>
                    </label>

                    <label className=" max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Estado</div>
                        <select
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={stateLoc}
                            onChange={(e) => {setStateLoc(e.target.value)}}
                            required
                        >
                            <option></option>
                            
                            {stateList.map((item, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
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

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
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

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Confirmar Senha</div>
                        <input 
                            type='password' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            required
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right"></div>
                        <button className="p-3 sm:p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                            Fazer Cadastro
                        </button>
                    </label>
                </form>

            </div>
        </div>
        
    );
}