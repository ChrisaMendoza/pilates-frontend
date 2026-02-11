import { http, TOKEN_KEY } from './http';

export async function login(username: string, password: string) {
    const res = await http.post('/authenticate', {
        username,
        password,
        rememberMe: true,
    });

    const token: string = res.data.id_token;
    localStorage.setItem(TOKEN_KEY, token);
    return token;
}


export function logout() {
    localStorage.removeItem(TOKEN_KEY);
}

export async function getAccount() {
    const res = await http.get('/account');
    return res.data;
}
