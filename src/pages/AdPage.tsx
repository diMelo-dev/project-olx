import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import { AdItem } from "../Components/AdItem";
import { FakeLoading } from "../Components/FakeLoading";
import useApi from '../helpers/OlxApi';
import { AdType } from '../types/AdType';

export function AdPage() {

    const api = useApi();
    const { id } = useParams();
    

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState<AdType>();
    const [error, setError] = useState('');

    useEffect(() => {
        const getAdInfo = async (id: string) => {
            const json = await api.getAd(id, true);
            if(json !== 'Erro ao carregar o produto') {
                setAdInfo(json);
            } else {
                setError(json);
                console.log(error)
            }
            setLoading(false);
        };
        if(id) {
            getAdInfo(id);
        }
    }, []);


    function formatDate(dateCreated: string) {
        let date = new Date(dateCreated);
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        
        let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

        return `${day} de ${months[month]} de ${year}`;

    }

    return(
        <div className="p-[10px] max-w-[1000px] m-auto flex flex-col gap-7">
            {error && 
                <h1 className="text-black text-2xl">{error}</h1>
            }
            {!error && 
                <>
                    <div className="p-3 text-sm text-[#18122B] dark:text-[#e2e8f0]">
                        <span className="">Você está aqui: </span>
                        <Link className=' underline' to='/' >Home </Link>
                        <span>/ </span>
                        <Link className=' underline' to={`/ads?state=${adInfo?.stateName}`} >{adInfo?.stateName} </Link>
                        <span>/ </span>
                        <Link className=' underline' to={`/ads?state=${adInfo?.stateName}&cat=${adInfo?.category.slug}`} >{adInfo?.category.name} </Link>
                        <span>/ </span>
                        <span className="">{adInfo?.title}</span>
                    </div>{/* BreadCrumb */}

                    <div className="flex flex-col items-center lg:flex-row gap-5">

                        <div className="flex-1">{/* Left Side */}
                            <div className="bg-white/90 rounded-lg shadow-xl flex flex-col sm:flex-row gap-4">{/* Box */}

                                <div className="w-[300px] h-[300px]">
                                    {loading && <FakeLoading height={'3xl'} />}
                                    {adInfo?.images && 
                                        <Slide>
                                            {adInfo.images.map((item, index) => (
                                                <div key={index} className=" w-[300px] h-[300px] flex item-center justify-center bg-cover">
                                                    <img src={item} className='flex item-center justify-center bg-cover rounded' />
                                                </div>
                                            ))}

                                        </Slide>
                                    }
                                    
                                </div>

                                <div className="flex-1 flex flex-col gap-3">
                                    
                                    <div className=" p-3">
                                        {loading && <FakeLoading height={'md'} />}
                                        {adInfo?.title && 
                                            <h2 className="text-black font-bold text-2xl">{adInfo.title}</h2>
                                        }
                                        {adInfo?.dateCreated && 
                                            <small>{formatDate(adInfo.dateCreated)}</small>
                                        }
                                    </div>

                                    <div className="p-3">
                                        {loading && <FakeLoading height={'xl'} />}
                                        {adInfo?.description && 
                                            <p className="py-2 text-slate-600 border-b-[1px] border-slate-400">{adInfo.description}</p>
                                        }
                                        {adInfo?.views && 
                                            <small>{adInfo.views}</small>
                                        }
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className=" w-[250px] flex flex-col gap-5">{/* Right Side */}
                            <div className="bg-white/90 rounded-lg shadow-xl flex flex-col gap-4">
                                <div className=" p-3">
                                    {loading && <FakeLoading height={'sm'} />}
                                    {adInfo?.priceNegotiable && 
                                        <div className="text-black text-lg font-bold">Preço negociável</div>
                                    }

                                    {!adInfo?.priceNegotiable && adInfo?.price && 
                                        <>
                                            <div className="text-black text-lg font-bold">Preço:</div>
                                            <div className="text-[#4B56D2] text-3xl font-bold">R$ <span>{adInfo.price.toFixed(2)}</span></div>
                                        </>
                                    }
                                </div>
                            </div>

                            {loading && <FakeLoading height={'md'} />}
                            {adInfo?.userInfo && 
                                <>
                                    <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className="bg-[#4B56D2] p-[5px] text-white text-center rounded-lg shadow-xl ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                                        Fale com o vendedor
                                    </a>

                                    <div className="bg-white/90 rounded-lg shadow-xl flex flex-col gap-4">
                                        <div className="p-3 flex flex-col gap-2">
                                            <div className="text-lg font-bold text-black">{adInfo.userInfo.name}</div>
                                            <div className="text-sm">Email: {adInfo.userInfo.email}</div>
                                            <div className="text-sm">Estado: {adInfo.stateName}</div>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>

                    </div>

                    {adInfo?.others && 
                        <div className="">{/* Others Ads */}
                            <h2 className="font-bold text-xl text-[#18122B] dark:text-[#e2e8f0]">Outras ofertas do vendedor</h2>
                        
                            <div className="flex flex-wrap">
                                {adInfo.others.map((item, index) => (
                                        <AdItem width='w-1/2 sm:w-1/4' key={index} data={item} />
                                    ))  
                                }
                            </div>
                
                        </div>
                    }
                    
                </>
            }
        </div>
    );
}