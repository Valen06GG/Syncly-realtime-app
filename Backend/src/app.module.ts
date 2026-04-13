import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { SocketsModule } from './sockets/sockets.module';
import { databaseConfig } from './config/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SocketsModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
      }),
    }),
    PassportModule,
    AuthModule,
    UsersModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    SocketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
