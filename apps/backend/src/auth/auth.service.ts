import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(matricula: string, senha: string) {
    const user = await this.usuariosService.findByMatricula(matricula);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const ok = await bcrypt.compare(senha, user.senhaHash);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas');

    const payload = {
      sub: user.id,
      matricula: user.matricula,
      tipo: user.tipo,
      nome: user.nome,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        matricula: user.matricula,
        nome: user.nome,
        tipo: user.tipo,
      },
    };
  }
}
