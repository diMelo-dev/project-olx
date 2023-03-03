import { Link } from "react-router-dom";
import { UserAdType } from "../types/UserAdType";
import imageNotFound from '../assets/images/no_image.jpg';
import { useEffect, useState } from "react";

type Props = {
    width: string,
    data: UserAdType,
    onClick: () => void;
}

export function UserAdItem({width, data, onClick}: Props) {

    let price = '';
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    
    useEffect(() => {
        let img = new Image();

        img.src = `http://alunos.b7web.com.br:501/media/${data.images[0].url}`;

        img.onload = function() {
            setImgLoaded(true);
        }

        img.onerror = function() {
            setImgError(true);
        }
        

    }, [])

    if(data.priceNegotiable) {
        price = 'Preço Negociável';
    } else {
        price = `R$ ${data.price.toFixed(0)}`;
    }

    


    return(
        <div className={`${width} px-5 py-3 flex justify-center`}>
            <div className="relative">
                <Link to={`/ad/${data.id}`} className='p-2 flex flex-col gap-3 border-2 border-slate-100/10 hover:border-slate-300/50 rounded-lg bg-slate-200/50 hover:bg-slate-300/50 transition-all'>
                    <div className="">
                        {imgLoaded &&
                            <img src={`http://alunos.b7web.com.br:501/media/${data.images[0].url}`}  className='w-full rounded-md flex-1'/>
                        }
                        {imgError && !imgLoaded &&
                            <img src={imageNotFound}  className='w-full rounded-md flex-1'/>
                        }
                        
                    </div>

                    <div className=" text-slate-800 font-bold break-all">{data.title}</div>

                    <div className="text-slate-600 font-bold">{price}</div>
                </Link>
                <div onClick={onClick} className=" absolute top-0 right-0 p-1 bg-slate-100/80 dark:hover:bg-slate-200/80 rounded flex items-center gap-1 cursor-pointer transition-all">
                    <div className="">
                        <svg width="20" height="20" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.5 21h18"></path>
                            <path d="M5.5 13.36V17h3.659L19.5 6.654 15.848 3 5.5 13.36Z"></path>
                        </svg>
                    </div>
                    <span className="text-sm text-black font-bold">Editar</span>
                </div>
            </div>
        </div>
    );
}