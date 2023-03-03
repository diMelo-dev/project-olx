import { AdsBox } from '../Components/AdsBox';
import { CategoriesBox } from '../Components/CategoriesBox';
import { SearchBox } from '../Components/SearchBox';


export function Home() {

    
    
    
    return(
        <div className='p-[10px] max-w-[1000px] m-auto flex flex-col gap-7'>

            <SearchBox />

            <CategoriesBox />

            <AdsBox />
            
        </div>
    );
}