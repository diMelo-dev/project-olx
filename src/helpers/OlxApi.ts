import Cookies from "js-cookie";
import qs from 'qs';
import { OptionsType } from "../types/OptionsType";
import { UpdateType } from "../types/UpdateType";


const BASEAPI = 'http://alunos.b7web.com.br:501';

async function apiFetchFile(endpoint: string, body: FormData) {
    

    let token = Cookies.get('token');
    if(token) {
        body.append('token', token);//Atribui um token a essa requisição
    }
    
    
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        body
    });

    //Transformo a resposta da req em json
    const json = await res.json();

    //Aq verifica se o usuário está autorizado a fazer essa requisição
    //Se não estiver, para a função e retorna para a tela de login
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }


    
    return json;
}

async function apiFetchPost(endpoint: string, body: {email: string, password: string, token?: string | undefined, name?: string, state?: string}) {
    
    //Se eu não estiver mandando um token na requisição
    if(!body.token) {
        //Pego o token do computador de quem fez a requisição
        let token = Cookies.get('token');
        if(token) {
            body.token = token;//Atribui um token a essa requisição
        }
    }
    
    
    const res = await fetch(BASEAPI + endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',//Indica para o servidor que tipo de conteúdo estou disposto a receber
            'Content-Type': 'application/json'//Indica para o servidor o tipo de conteúdo que vou enviar
        },
        body: JSON.stringify(body)
    });

    //Transformo a resposta da req em json
    const json = await res.json();

    //Aq verifica se o usuário está autorizado a fazer essa requisição
    //Se não estiver, para a função e retorna para a tela de login
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }


    
    return json;
}

async function apiFetchPut(endpoint: string, body: {email?: string, password?: string, token?: string | undefined, name?: string, state?: string}) {
    
    //Se eu não estiver mandando um token na requisição
    if(!body.token) {
        //Pego o token do computador de quem fez a requisição
        let token = Cookies.get('token');
        if(token) {
            body.token = token;//Atribui um token a essa requisição
        }
    }
    
    
    const res = await fetch(BASEAPI + endpoint, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',//Indica para o servidor que tipo de conteúdo estou disposto a receber
            'Content-Type': 'application/json'//Indica para o servidor o tipo de conteúdo que vou enviar
        },
        body: JSON.stringify(body)
    });

    //Transformo a resposta da req em json
    const json = await res.json();

    //Aq verifica se o usuário está autorizado a fazer essa requisição
    //Se não estiver, para a função e retorna para a tela de login
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }


    
    return json;
}

async function apiFetchGet(endpoint: string, body?: {email?: string, password?: string, sort?: string, limit?: number, id?: string, other?: boolean, token?: string | undefined}) {
    
    //Se eu não estiver mandando um token na requisição
    if(!body) {
        //Pego o token do computador de quem fez a requisição
        let token = Cookies.get('token');
        if(token) {
            body = {token: token};//Atribui um token a essa requisição
        }
    }
    
    
    try {
        const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);

        if(res.ok) {
            //Transformo a resposta da req em json
            const json = await res.json();
                
            //Aq verifica se o usuário está autorizado a fazer essa requisição
            //Se não estiver, para a função e retorna para a tela de login
            if(json.notallowed) {
                window.location.href = '/signin';
                return;
            }

            return json;
        }
        
    } catch(error) {
        console.error('Error: ' + error)

        return 'Erro ao carregar o produto';
    }
    

    /*
    const res = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);

    //Transformo a resposta da req em json
    const json = await res.json();

    //Aq verifica se o usuário está autorizado a fazer essa requisição
    //Se não estiver, para a função e retorna para a tela de login
    if(json.notallowed) {
        window.location.href = '/signin';
        return;
    }


    
    return json;*/
}

const OlxApi = {

    login: async (email: string, password: string) => {
        
        const json = await apiFetchPost(
            '/user/signin',
            {email, password}
        );

        return json;
        
    },

    register: async (name: string, email: string, password: string, stateLoc: string) => {
        const json = await apiFetchPost(
            '/user/signup',
            {email, password, name, state: stateLoc}
        );

        return json;
    },

    getStates: async () => {
        const json = await apiFetchGet(
            '/states'
        );
        return json.states;
    },
    
    getCategories: async () => {
        const json = await apiFetchGet(
            '/categories'
        );
        return json.categories;
    },

    getAds: async (options: OptionsType) => {
        
        try {
            const json = await apiFetchGet(
                '/ad/list',
                options 
            );
            return json;
        } catch(error) {
            console.error('Error: ', error);
        }
    },

    getAd: async (id: string, other: boolean = false) => {
        const json = await apiFetchGet(
            '/ad/item',
            {id, other}
        );
        return json;
    },

    addAd: async (fData: FormData) => {
        const json = await apiFetchFile(
            '/ad/add',
            fData
        );
        return json;
    },

    getUserInfo: async () => {
        const json = await apiFetchGet(
            '/user/me'
        );

        return json;
    },

    updateUser: async (bodyUpdate: UpdateType) => {
        let body: {name?: string, state?: string, email?: string, password?: string} = {}

        if(bodyUpdate.name) {
            body.name = bodyUpdate.name;
        }

        if(bodyUpdate.stateLoc) {
            body.state = bodyUpdate.stateLoc;
        }

        if(bodyUpdate.email) {
            body.email = bodyUpdate.email;
        }

        if(bodyUpdate.password) {
            
            body.password = bodyUpdate.password;
        }
        
        
        const json = await apiFetchPut(
            '/user/me',
            body
        );

        return json;
    },

    updateAd: async (id: string, fData: FormData) => {
        const json = await apiFetchFile(
            `/ad/${id}`,
            fData
        );
        return json;
    }

}


//Uma função q chama o objeto
export default () => OlxApi;
