import useApi from '../helpers/OlxApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CategoriesType } from '../types/CategoriesType';

export function CategoriesBox() {

    const api = useApi();

    const [categories, setCategories] = useState<CategoriesType[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    return(
        <div className='flex flex-wrap'>
            {categories.map((item, index) => (
                <Link key={index} to={`/ads?cat=${item.slug}`} className='w-1/2 sm:w-1/4 py-2 flex items-center gap-2 cursor-pointer text-[#18122B] hover:text-slate-500 dark:text-[#e2e8f0] dark:hover:text-slate-500'>
                    <img src={item.img} alt='' />
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
    );
}