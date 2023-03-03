import useApi from '../helpers/OlxApi';
import { useState, useEffect } from 'react';
import { CategoriesType } from '../types/CategoriesType';
import { StateLocType } from '../types/StateLocType';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdItem } from '../Components/AdItem';
import { FakeLoading } from '../Components/FakeLoading';
import { Pagination } from '../Components/Pagination';

let timer: number;

export function Ads() {

    const api = useApi();
    const navigate = useNavigate();

    function useQueryString() {
        return new URLSearchParams( useLocation().search )
    }

    const query = useQueryString();

    const [q, setQ] = useState( query.get('q') !== null ? query.get('q') : '' );
    const [cat, setCat] = useState( query.get('cat') !== null ? query.get('cat') : '' );
    const [state, setState] = useState( query.get('state') !== null ? query.get('state') : '' );

    const [stateList, setStateList] = useState<StateLocType[]>([]);
    const [categories, setCategories] = useState<CategoriesType[]>([]);
    const [adList, setAdList] = useState([]);
    const [adsTotal, setAdsTotal] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [opactity, setOpacity] = useState('opacity-100');
    const [loading, setLoading] = useState(true);

    async function getAdsList() {
        setLoading(true);

        let offset = (currentPage -1) * 9; 

        const json = await api.getAds({
            sort: 'desc',
            limit: 9,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setOpacity('opacity-100');
        setLoading(false);
    }

    useEffect(() => {
        if(adList.length > 0) {
            setPageCount( Math.ceil(adsTotal / adList.length) );
        } else {
            setPageCount(0);
        }
        
    }, [adsTotal]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [])

    useEffect(() => {
        getAdsList();
        setOpacity('opacity-50');
    }, [currentPage])

    useEffect(() => {
        let queryS = [];
        setLoading(true);
        
        if(q) {
            queryS.push(`q=${q}`);
        }

        if(state) {
            queryS.push(`state=${state}`);
        }

        if(cat) {
            queryS.push(`cat=${cat}`);
        }

        if(queryS.length > 0) {
            navigate(`?${queryS.join('&')}`);
        }

        if(timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(getAdsList, 2000);
        setOpacity('opacity-50');
        setCurrentPage(1);
    }, [q, cat, state]);

    function clickPag(clickedPag: number) {
        setCurrentPage(clickedPag);
    }


    return(
        <div className='p-[10px] max-w-[1000px] m-auto flex flex-col sm:flex-row gap-7'>
            <div className='p-4 bg-slate-400/50 rounded shadow-xl'>
                <form method='GET' className='flex-1 sm:w-[250px] p-[10px] flex flex-col gap-[15px] rounded'>
                    
                    <input 
                        type='text' 
                        className='py-3 sm:py-[5px] px-[10px] text-sm rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        name='q'
                        value={q ? q : ''}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder='O que você procura?'
                    />

                    <label className='flex flex-col gap-3 text-sm text-[#18122B] font-bold'>
                        <div className=''>Estado: </div>
                        <select 
                            value={state ? state : ''} 
                            onChange={(e) => setState(e.target.value)}
                            className='py-3 sm:py-[5px] px-[10px] flex-1 rounded outline-none border-2 transition-all focus:border-slate-500 focus:border-2'
                        >
                            <option></option>
                            {stateList && 
                                stateList.map((item, index) => (
                                    <option key={index} value={item.name} className=''>{item.name}</option>
                                ))
                            }
                        </select>
                    </label>

                    <div className='flex items-center gap-3 text-sm text-[#18122B] font-bold'>Categoria: </div>
                    <ul className='text-sm text-[#18122B] dark:text-[#e2e8f0] flex flex-wrap'>
                    {categories.map((item, index) => (
                            <li 
                                key={index} 
                                className={`py-2 px-3 w-1/2 sm:w-full rounded flex items-center gap-2 cursor-pointer transition-all ${cat === item.slug ? 'bg-[#4B56D2] text-slate-200' : 'bg-transparent'} hover:bg-[#4B56D2] hover:text-slate-200`}
                                onClick={(e) => setCat(item.slug)}
                            >
                                <img src={item.img} className='w-[25px] h-[25px]' />
                                <span className=''>{item.name}</span>
                            </li>
                        ))}

                    </ul>
                    
                </form>
            </div>{/*Lef Side*/}

            <div className='flex-1'>
                <h1 className='text-lg text-[#18122B] dark:text-[#e2e8f0]'>Resultados</h1>

                {loading && 
                    <div className=' p-8 text-center text-sm text-[#18122B] dark:text-[#e2e8f0]'>Carregando...</div>
                }

                {!loading && adList.length === 0 &&
                <div className=' p-8 text-center text-sm text-[#18122B] dark:text-[#e2e8f0]'>Nenhum resultado encontrado</div>
                }

                <div className={`flex flex-wrap ${opactity}`}>
                    
                    {adList && !loading &&
                        adList.map((item, index) => (
                            <AdItem width='w-1/2 sm:w-1/3' key={index} data={item} />
                        ))
                    }  

                    {adList && loading &&
                        adList.map((item, index) => (
                            <div key={index} className='w-1/2 sm:w-1/3 px-5 py-3 flex justify-center'>
                                <div className='p-2 w-full bg-slate-200/50 rounded-lg flex flex-col gap-3'>
                                    <FakeLoading height='xl' />

                                    <FakeLoading height='sm' />

                                    <FakeLoading height='sm' />
                                </div>
                            </div>
                        ))
                    }                                  
                </div> 

                <Pagination pageCount={pageCount} currentPage={currentPage} handleClick={clickPag} />  
                                        
            </div>{/*Right Side*/}
        </div>
    );
}