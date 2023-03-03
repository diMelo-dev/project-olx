import useApi from '../helpers/OlxApi';
import { StateLocType } from '../types/StateLocType';
import React, { useState, useEffect } from 'react';

export function SearchBox() {

    const api = useApi();

    const [inputValue, setInputValue] = useState('');
    const [stateList, setStateList] = useState<StateLocType[]>([]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    return(

        <div className=" p-4 bg-slate-400/50 rounded">

            <form method="GET" action="/ads" className="flex flex-col sm:flex-row gap-6">
                <input 
                    type='text'
                    name='q' 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="O que você procura"
                    className="py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2" 
                />

                <select 
                    name='state' 
                    className="py-[5px] px-[20px] rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2"  
                >
                    {stateList.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>

                <button 
                    className="p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80"
                >Pesquisar</button>

            </form>

        </div>


    );
}