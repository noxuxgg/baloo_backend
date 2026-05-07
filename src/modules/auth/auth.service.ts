import { HttpException, Injectable } from '@nestjs/common';
import { UsuariosService } from '../admin/usuarios/usuarios.service';
import { inicioSesionDto } from './dto/inicioSesion.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private usuarioService: UsuariosService, 
                private jwtService: JwtService
    ){}

    async login(credenciales: inicioSesionDto){
        const { nombreUsuario, contrasenia } = credenciales;
        
        // Busqueda de usuario por nombreUsuario, no tocar para nada
        const usuario = await this.usuarioService.findOneByUser(nombreUsuario);
        if (!usuario){
            return new HttpException('Usuario no encontrado', 404);
        }

        // Para verificar la contrasenia (asignar la comparación con bcrypt)
        const verificarContra = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if(!verificarContra){
            throw new HttpException('Contraseña incorrecta', 401)
        }
        
        // Generar JWT
        const payload = {nombreUsuario: nombreUsuario, id: usuario.id};
        const token = await this.jwtService.sign(payload);
        return {access_token: token, user: nombreUsuario}
    }

}
