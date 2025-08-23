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
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';

        return isProd
          ? {
              type: 'postgres',
              url: process.env.DATABASE_URL, // Railway connection string
              ssl: { rejectUnauthorized: false },
              autoLoadEntities: true,
              synchronize: true, // ⚠️ chỉ test thôi
            }
          : {
              type: 'postgres',
              host: process.env.DB_HOST || 'localhost',
              port: parseInt(process.env.DB_PORT || '5435'),
              username: process.env.DB_USERNAME || 'residents',
              password: process.env.DB_PASSWORD || 'postgres',
              database: process.env.DB_NAME || 'residents-management',
              autoLoadEntities: true,
              synchronize: true,
            };
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
