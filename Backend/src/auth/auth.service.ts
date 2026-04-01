import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { Users } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private userRepo: Repository<Users>,

        private jwtService: JwtService,

        private usersService: UsersService,
    ) {}

    async register(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);

        return this.usersService.create(dto.email, hashed);
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { 
          sub: user.id, 
          email: user.email, 
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string) {
      const user = await this.usersService.findByEmail(email);
    
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    
      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    
      return user;
    }

    async findUserByEmail(email: string) {
      return this.userRepo.findOne({
        where: { email },
      });
    }
}