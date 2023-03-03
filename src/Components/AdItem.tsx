import { Link } from "react-router-dom";
import { AdType } from "../types/AdType";
import imageNotFound from '../assets/images/no_image.jpg';
import { ReactNode, useEffect, useState } from "react";
import { OtherAdType } from "../types/OtherAdType";

type Props = {
    width: string,
    data: OtherAdType;
}

export function AdItem({width, data}: Props) {

    let price = '';
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgError, setImgError] = useState(false);

    
    useEffect(() => {
        let img = new Image();

        img.src = data.image;

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
            <Link to={`/ad/${data.id}`} className='p-2 flex flex-col gap-3 border-2 border-slate-100/10 hover:border-slate-300/50 rounded-lg bg-slate-200/50 hover:bg-slate-300/50 transition-all'>
                <div className="">
                    {imgLoaded &&
                        <img src={data.image}  className='w-full rounded-md flex-1'/>
                    }
                    {imgError && !imgLoaded &&
                        <img src={imageNotFound}  className='w-full rounded-md flex-1'/>
                    }
                    
                </div>

                <div className=" text-slate-800 font-bold break-all">{data.title}</div>

                <div className="text-slate-600 font-bold">{price}</div>
            </Link>
        </div>
    );
}