import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { ResidentsModule } from './modules/residents/residents.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UnitsModule } from './modules/units/units.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      username: 'residents',
      password: 'postgres',
      database: 'residents-management',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BuildingsModule,
    ResidentsModule,
    UsersModule,
    AuthModule,
    UnitsModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
