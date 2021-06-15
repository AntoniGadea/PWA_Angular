import { Registro } from "./registro";

export interface Usuario{
    email: string;
    password: string;
    password1?: string;
    password2?: string;
    nombre?: string;
    apellidos?: string;
    empresa?: string;
    settings?: any;
    img?: string;
    registroTrabajo?: Registro;
    data_joined?: string;
    last_login?:  string;
    is_active?: boolean;
}