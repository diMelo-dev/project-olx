import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from '../helpers/OlxApi';
import { StateLocType } from "../types/StateLocType";
import { UserInfoType } from "../types/UserInfoType";
import { Error } from "./Error";

export function UserInfo() {

    let api = useApi();
    let navigate = useNavigate();

    /*
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userStateLoc, setUserStateLoc] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');*/

    
    const [name, setName] = useState('');
    const [userName, setUserName] = useState(name);
    const [email, setEmail] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [stateLoc, setStateLoc] = useState('');
    const [userStateLoc, setUserStateLoc] = useState(stateLoc);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    const [stateList, setStateList] = useState<StateLocType[]>([]);

    

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }

        getStates();
    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            const uInfo = await api.getUserInfo();
            setName(uInfo.name);
            setEmail(uInfo.email);
            setStateLoc(uInfo.state);

            //Guardando os valores iniciais
            setUserName(uInfo.name);
            setUserEmail(uInfo.email);
            setUserStateLoc(uInfo.state)
        }

        getUserInfo();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        let errors = [];
        
        if(!name.trim()) {
            errors.push('Nome vazio');
        }

        if(!stateLoc) {
            errors.push('Estado Vazio');
        }

        if(!email) {
            errors.push('Email Vazio');
        }

        if(errors.length === 0) {
            //Faço a requisição para alterar os dados
            let bodyUpdate: {name?: string, state?: string, email?: string, password?: string} = {}
            
            if(name !== userName) {
                bodyUpdate.name = name;
            }

            if(email !== userEmail) {
                bodyUpdate.email = email;
            }

            if(stateLoc !== userStateLoc) {
                bodyUpdate.state = stateLoc;
            }

            if(password.trim()) {
                bodyUpdate.password = password;
            }

            const json = await api.updateUser(bodyUpdate);

            if(!json.error) {
                //navigate(`/`);
                console.log('funcionou');
                return;
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join("&&"));
        }

       
    }

    return(
        <div className="flex flex-col gap-5">
            <h1 className=" text-[#18122B] dark:text-[#e2e8f0] text-[25px]">
                Informações do Usuário
            </h1>

            {error && 
                <div className="">
                    <Error message={error} />
                </div>
            }

            <form className="py-[10px] px-[20px] bg-slate-300 flex flex-col gap-[15px] shadow-xl rounded" onSubmit={(e: React.FormEvent) => handleSubmit(e)} >

                <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                    <div className="w-full sm:w-[200px] sm:text-right">Nome Completo</div>
                    <input 
                        type='text' 
                        disabled={disabled}
                        className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></input>
                </label>

                <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                    <div className="w-full sm:w-[200px] sm:text-right">Estado</div>
                    <select
                        disabled={disabled}
                        className='py-2 sm:py-[5px] px-[10px] rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        value={stateLoc}
                        onChange={(e) => setStateLoc(e.target.value)}
                    >
                        <option></option>
                        
                        {stateList.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </label>

                <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                    <div className="w-full sm:w-[200px] sm:text-right">Email</div>
                    <input 
                        type='email' 
                        disabled={disabled}
                        className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        value={email}
                        onChange={(e) => {setEmail(e.target.value)}}
                    ></input>
                </label>

                <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                    <div className="w-full sm:w-[200px] sm:text-right">Senha</div>
                    <input 
                        type='password' 
                        disabled={disabled}
                        className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        value={password}
                        onChange={(e) => {setPassword(e.target.value)}}
                    ></input>
                </label>
                
                {/* 
                <label className=" max-w-[500px] flex items-center gap-[20px] text-[#18122B] font-bold">
                    <div className="w-[200px] text-right">Confirmar Senha</div>
                    <input 
                        type='password' 
                        disabled={disabled}
                        className='py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        value={confirmPassword}
                        onChange={(e) => {setConfirmPassword(e.target.value)}}
                        required
                    ></input>
                </label>*/}

                <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                    <div className="w-full sm:w-[200px] sm:text-right"></div>
                    <button className="p-3 sm:p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                        Atualizar Informações
                    </button>
                </label>

            </form>
        </div>
    );
}