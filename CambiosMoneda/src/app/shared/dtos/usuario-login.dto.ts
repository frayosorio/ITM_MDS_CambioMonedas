import { Usuario } from "../entidades/Usuario";

export interface UsuarioLoginDto  {
    token: string;
    usuario: Usuario;
}