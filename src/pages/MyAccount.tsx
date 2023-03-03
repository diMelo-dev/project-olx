import { UserAds } from "../Components/UserAds";
import { UserInfo } from "../Components/UserInfo";


export function MyAccount() {

    return(
        <div className="p-[10px] max-w-[1000px] m-auto flex-1 flex flex-col gap-10">
            <UserInfo />

            <UserAds />
        </div>
    );
}