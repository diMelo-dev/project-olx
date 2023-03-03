import { useRoutes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { NotFound } from '../pages/NotFound';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { AdPage } from '../pages/AdPage';
import { PrivateRoute } from '../Components/RouteHandler';
import { isLogged } from '../helpers/AuthHandler';
import { AddAd } from '../pages/AddAd';
import { Ads } from '../pages/Ads';
import { MyAccount } from '../pages/MyAccount';

export function MainRoutes() {

    let logged = isLogged();

    const routes = useRoutes([
        {path: '/', element: <Home />},
        {path: '/about', element: <About />},
        {path: '/signin', element: <SignIn />},
        {path: '/post-an-ad', element: <PrivateRoute component={<AddAd />} logged={logged} /> },
        {path: '/signup', element: <SignUp />},
        {path: '/ad/:id', element: <AdPage />},
        {path: '/ads', element: <Ads />},
        {path: '/my-account', element: <PrivateRoute component={<MyAccount />} logged={logged} />},
        {path: '*', element: <NotFound />}
    ]);

    return(
        routes
    );
}