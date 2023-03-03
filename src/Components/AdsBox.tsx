import useApi from '../helpers/OlxApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AdItem } from './AdItem';

export function AdsBox() {

    const api = useApi();

    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort: 'desc',
                limit: 8
            });
            setAdList(json.ads);
        }
        getRecentAds();
    }, []);

    return(
        <div className='flex flex-col gap-3'>
            <h2 className='font-bold text-xl text-[#18122B] dark:text-[#e2e8f0]'>Anúncios Recentes</h2>

            <div className='flex flex-wrap'>

                {adList.map((item, index) => (
                    <AdItem width='w-1/2 sm:w-1/4' key={index} data={item} />
                ))}

            </div>

            <Link to='/ads' className='text-[#18122B] hover:text-slate-500 dark:text-[#e2e8f0] dark:hover:text-slate-500'>Ver Todos</Link>

            <hr />

            <p className='text-[#18122B] dark:text-[#e2e8f0]'>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</p>
        </div>
    );
}