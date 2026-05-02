import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { inicioSesionDto } from './dto/inicioSesion.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){

    }

    @Post('/login')
    funInicioSesion(@Body() datos: inicioSesionDto){
        return this.authService.login(datos)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('profile')
    funProfile(@Request() req){
        return req.user;
    }

}
