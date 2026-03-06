import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async findByMatricula(matricula: string) {
    return this.prisma.usuario.findUnique({ where: { matricula } });
  }

  async create(data: {
    matricula: string;
    nome: string;
    senhaHash: string;
    tipo?: 'ADMIN' | 'USER' | 'TECNICO';
  }) {
    return this.prisma.usuario.create({
      data: {
        matricula: data.matricula,
        nome: data.nome,
        senhaHash: data.senhaHash,
        tipo: data.tipo ?? 'USER',
      },
    });
  }
}
