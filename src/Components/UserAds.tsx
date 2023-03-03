import { useState, useEffect, FormEvent } from "react";
import { UserAdType } from '../types/UserAdType';
import useApi from '../helpers/OlxApi';
import { OtherAdType } from "../types/OtherAdType";
import { UserAdItem } from "./UserAdItem";
import { useScrollLock } from "../helpers/ScrollLock";
import { AdModal } from "./AdModal";


export function UserAds() {

    const api = useApi();

    const [userAds, setUserAds] = useState<UserAdType[]>();
    const [userOtherAds, setUserOtherAds] = useState<OtherAdType[]>();
    const [showModal, setShowModal] = useState(false);
    const [modalAd, setModalAd] = useState<UserAdType>();

    const[error, setError] = useState('');


    useEffect(() => {
        const getUserInfo = async () => {
            const uInfo = await api.getUserInfo();
            setUserAds(uInfo.ads);
        }

        getUserInfo();
    }, []);


    function handleClick(item: UserAdType) {
        setModalAd(item);
        setShowModal(true);
    }

    function closeClick() {
        setShowModal(false);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError('');
        
        /*
        let errors = [];
        
        if(modalAd) {
            if(!modalAd.title.trim()) {
                errors.push('Título vazio');
            }
    
            if(!modalAd.category) {

            }
        }*/
        
    }

    return(
        <div className="flex flex-col">
            {userAds?.length === 0 && 
                <div className="text-[#18122B] dark:text-[#e2e8f0] text-lg">Sem anúncios disponíveis</div>
            }
            {userAds && 
                <div className="text-[#18122B] dark:text-[#e2e8f0] text-[25px]">Seus anúncios</div>
            }
            <div className="flex flex-wrap">
                {userAds && userAds?.length > 0 && userAds.map((item, index) => (
                    <UserAdItem width="w-1/2 sm:w-1/4" key={index} data={item} onClick={() => handleClick(item)} />
                ))}
            </div>
            {showModal && modalAd &&
                <AdModal data={modalAd} onClick={closeClick} onSubmit={handleSubmit} />
            }
        </div>
    );
}