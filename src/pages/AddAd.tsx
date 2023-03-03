import React, { useEffect, useRef, useState } from "react";
import useApi from '../helpers/OlxApi';
import { Error } from '../Components/Error';
import { CategoriesType } from "../types/CategoriesType";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import { useNavigate } from "react-router-dom";

export function AddAd() {

    let api = useApi();
    const fileField = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [price, setPrice] = useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [desc, setDesc] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [])

    async function hanldeSubmit(e: React.FormEvent) {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];

        if(!title.trim()) {
            errors.push('Título vazio')
        } 

        if(!category) {
            errors.push('Categoria vazia')
        }

        if(errors.length === 0) {
            const fData = new FormData();//Bom jeito de mandar dados de formulário com arquivos
            fData.append('title', title);
            fData.append('price', price);
            fData.append('priceneg', priceNegotiable.toString());
            fData.append('desc', desc);
            fData.append('cat', category);

            if(fileField.current) {
                if(fileField.current.files) {
                    if(fileField.current.files.length > 0) {
                        for(let i=0; i< fileField.current.files.length; i++) {
                            fData.append('img', fileField.current.files[i]);
                        }
                    }
                }
            }

            const json = await api.addAd(fData);

            if(!json.error) {
                navigate(`/ad/${json.id}`);
                return;
            } else {
                setError(json.error);
            }
            

        } else {
            setError(errors.join("\n"));
        }


        setDisabled(false);
        
    }

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
    });

    return(
        <div className="p-[10px]">
            <div className=" max-w-[1000px] m-auto flex justify-center flex-col gap-[20px]">
                <h1 className=" text-[#18122B] dark:text-[#e2e8f0] text-[30px]">Poste um Anúncio</h1>


                <form className=" py-[10px] px-[20px] bg-slate-300 flex flex-col gap-[15px] shadow-xl rounded" onSubmit={(e: React.FormEvent) => hanldeSubmit(e)}>
                    
                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Título</div>
                        <input 
                            type='text' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                            required
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Categoria</div>
                        <select  
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={category}
                            onChange={(e) => {setCategory(e.target.value)}}
                            required
                        >
                            <option></option>
                            {categories && 
                                categories.map((item, index) => (
                                    <option key={item._id} value={item._id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Preço</div>
                        <MaskedInput 
                            mask={priceMask}
                            placeholder='R$ '
                            disabled={disabled || priceNegotiable}
                            value={price}
                            onChange={(e) => {setPrice(e.target.value)}}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        />
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Preço Negociável</div>
                        <input 
                            type='checkbox' 
                            disabled={disabled}
                            className='w-5 h-5 sm:w-[15px] sm:h-[15px] px-[20px] rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            onChange={(e) => {setPriceNegotiable(e.target.checked)}}
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Descrição</div>
                        <textarea
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] h-40 flex-1 rounded outline-none border-2 transition-all resize-none focus:border-slate-500 focus:border-2'
                            value={desc}
                            onChange={(e) => {setDesc(e.target.value)}}
                            required
                        ></textarea>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Imagens</div>
                        <input 
                            type='file' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[20px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            ref={fileField}
                            required
                            multiple
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right"></div>
                        <button className="p-3 sm:p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                            Adicionar Anúncio
                        </button>
                    </label>
                </form>

            </div>
        </div>
        
    );
}