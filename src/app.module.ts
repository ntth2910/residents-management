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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production', // ignore .env khi prod
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        console.log('Connecting to PROD DB:', process.env.DATABASE_PUBLIC_URL);
        const isProd = process.env.NODE_ENV === 'production';
        if (isProd) {
          console.log(
            'Connecting to PROD DB:',
            process.env.DATABASE_PUBLIC_URL,
          );
          return {
            type: 'postgres',
            url: process.env.DATABASE_PUBLIC_URL,
            ssl: { rejectUnauthorized: false }, // Railway yêu cầu SSL
            autoLoadEntities: true,
            synchronize: false,
          };
        } else {
          console.log('Connecting to LOCAL DB');
          return {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5435'),
            username: process.env.DB_USERNAME || 'residents',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'residents-management',
            autoLoadEntities: true,
            synchronize: true,
          };
        }
      },
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
