import { UserAdType } from "../types/UserAdType";
import { useState, useRef, useEffect, FormEvent } from "react";
import { CategoriesType } from "../types/CategoriesType";
import MaskedInput from "react-text-mask";
import { createNumberMask } from "text-mask-addons";
import useApi from '../helpers/OlxApi';
import { Error } from "./Error";
import { useNavigate } from "react-router-dom";

type Props = {
    data: UserAdType,
    onClick: () => void,
    onSubmit: (e: FormEvent) => void
}

export function AdModal({data, onClick, onSubmit}: Props) {

    const api = useApi();
    const fileField = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [title, setTitle] = useState(data.title);
    const [category, setCategory] = useState(data.category);
    const [price, setPrice] = useState(data.price.toString());
    const [priceNegotiable, setPriceNegotiable] = useState(data.priceNegotiable);
    const [desc, setDesc] = useState(data.description);

    /*
    const [adTitle, setAdTitle] = useState(data.title);
    const[adCategory, setAdCategory] = useState(data.category);
    const [adPrice, setAdPrice] = useState(data.price);
    const [adPriceNegotiable, setAdPriceNegotiable] = useState(data.priceNegotiable);
    const [adDesc, setAdDesc] = useState(data.description);*/

    const [error, setError] = useState('');

    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [disabled, setDisabled] = useState(false);

    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ',',
    });

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        let errors = [];

        if(!title.trim()) {
            errors.push('Título Vazio');
        }

        if(!category) {
            errors.push('Categoria Vazia');
        }

        if(!price && !priceNegotiable) {
            errors.push('Preço Vazio');
        }

        if(!desc.trim()) {
            errors.push('Descrição Vazia');
        }

        if(errors.length === 0) {
            //Faço a requisição para alterar os dados
            const fData = new FormData();
            
            if(title !== data.title) {
                fData.append('title', title);
            }

            if(category !== data.category) {
                fData.append('cat', category)
            }

            if(price !== data.price.toString()) {
                let priceReq = price.split(' ')[1].replaceAll('.', '');
                fData.append('price', priceReq);
            }

            if(priceNegotiable !== data.priceNegotiable) {
                fData.append('priceneg', priceNegotiable.toString());
            }

            if(desc !== data.description) {
                fData.append('desc', desc);
            }

            
            if(fileField.current) {
                if(fileField.current.files) {
                    if(fileField.current.files.length > 0) {
                        for(let i=0; i< fileField.current.files.length; i++) {
                            fData.append('img', fileField.current.files[i]);
                        }
                    }
                }
            }

            const json = await api.updateAd(data.id, fData);

            if(!json.error) {
                onClick();
                navigate(0);
                return;
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join('&&'));
        }
    }


    return(
        <div className="fixed top-0 left-0 w-full h-screen bg-slate-200/50 flex items-center justify-center">
            <div className="w-full sm:w-auto p-3 bg-slate-300 shadow-xl rounded-xl flex flex-col gap-2">
                
                <div 
                    onClick={onClick}
                    className="w-10 h-10 self-end border-2 border-slate-100/50 flex items-center justify-center rounded cursor-pointer transition-all hover:bg-slate-400/50"
                >
                    X
                </div>

                {error && 
                    <div className="">
                        <Error message={error} />
                    </div>
                }
                
                <form className="py-[10px] px-[20px] bg-slate-300 flex flex-col gap-[15px] rounded" onSubmit={(e: React.FormEvent) => handleSubmit(e)}/*onSubmit={(e: React.FormEvent) => onSubmit(e)}*/ >
                    
                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Título</div>
                        <input 
                            type='text' 
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                            required
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Categoria</div>
                        <select  
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            value={category}
                            onChange={(e) => {setCategory(e.target.value)}}
                            required
                        >
                            <option></option>
                            {categories && 
                                categories.map((item, index) => (
                                    <option key={item._id} value={item.slug}>{item.name}</option>
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
                            className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        />
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Preço Negociável</div>
                        <input 
                            type='checkbox' 
                            disabled={disabled}
                            checked={priceNegotiable}
                            className='w-5 h-5 sm:w-[15px] sm:h-[15px] px-[20px] rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            onChange={(e) => {setPriceNegotiable(e.target.checked)}}
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right">Descrição</div>
                        <textarea
                            disabled={disabled}
                            className='py-2 sm:py-[5px] px-[10px] h-40 flex-1 rounded outline-none border-2 transition-all resize-none focus:border-slate-500 focus:border-2'
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
                            className='py-2 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                            ref={fileField}
                            multiple
                        ></input>
                    </label>

                    <label className="max-w-[500px] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-[20px] text-[#18122B] font-bold">
                        <div className="w-full sm:w-[200px] sm:text-right"></div>
                        <button className="p-3 sm:p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                            Atualizar anúncio
                        </button>
                    </label>

                </form>
            </div>
        </div>
    );
}