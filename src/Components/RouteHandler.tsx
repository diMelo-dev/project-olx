import { ReactElement } from "react";
import { SignIn } from "../pages/SignIn";

type Props = {
    component: ReactElement,
    logged: boolean
}

export function PrivateRoute({component, logged}: Props) {

    return logged ? (
        component
    ) : (
        <SignIn />
    )
}