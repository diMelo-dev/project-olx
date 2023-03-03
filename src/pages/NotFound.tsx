import { Link } from "react-router-dom";

export function NotFound() {
    
    return(
        <div className=" p-[10px] max-w-[1000px] m-auto flex justify-center flex-col gap-[20px]">
            <h1 className=" text-[#18122B] dark:text-[#e2e8f0] text-[30px]">Página não encontrada</h1>
            <Link to='/'>Voltar Para Home</Link>
        </div>
    );
}