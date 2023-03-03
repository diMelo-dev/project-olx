import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../contexts/Context";
import { isLogged, doLogout } from "../helpers/AuthHandler";
import { Toogler } from "./Toggler";

export function Header() {

    const {state, dispatch} = useContext(Context);

    let logged = isLogged();

    function handleLogout() {
        doLogout();
        window.location.href = '/';
    }
    
    return(

        <div className=" border-b-2 border-slate-400/50 ">

            <div className="p-[10px] max-w-[1000px] m-auto flex flex-col gap-3 sm:flex-row items-center">

                <div className="flex-1">

                    <Link to='/' className=" text-[30px]">

                        <span className=" text-red-600 font-bold">O</span>
                        <span className=" text-green-600 font-bold">L</span>
                        <span className=" text-blue-600 font-bold">X</span>

                    </Link>

                </div>

                <nav>
                    <ul className="flex flex-col sm:flex-row gap-[20px] items-center">
                        <li className="hover:text-slate-500">
                            <Toogler />
                        </li>
                        {logged && 
                            <>
                                <li className='cursor-pointer text-[#18122B] hover:text-slate-500 dark:text-[#e2e8f0] dark:hover:text-slate-500'>
                                    <Link to='/my-account'>Minha Conta</Link>
                                </li>
                                <li className='cursor-pointer text-[#18122B] hover:text-slate-500 dark:text-[#e2e8f0] dark:hover:text-slate-500'>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                                <li className=" p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                                    <Link to='/post-an-ad'>Poste um anúncio</Link>
                                </li>
                            </>
                        }
                        {!logged && 
                            <>
                                <li className='cursor-pointer text-[#18122B] hover:text-slate-500 dark:text-[#e2e8f0] dark:hover:text-slate-500'>
                                    <Link to='/signin'>Login</Link>
                                </li>
                                <li className='cursor-pointer text-[#18122B] hover:text-slate-500 dark:text-[#e2e8f0] dark:hover:text-slate-500'>
                                    <Link to='/signup'>Cadastrar</Link>
                                </li>
                                <li className=" p-[5px] rounded text-white bg-[#4B56D2] cursor-pointer ease-in-out duration-[.3s] hover:bg-[#4B56D2]/80">
                                    <Link to='/signin'>Poste um anúncio</Link>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
                
            </div>

        </div>
    );
}