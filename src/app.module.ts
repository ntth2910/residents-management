import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { ResidentsModule } from './modules/residents/residents.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UnitsModule } from './modules/units/units.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isProd = process.env.NODE_ENV === 'production';
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('DATABASE_URL (internal):', process.env.DATABASE_URL);
        console.log('DATABASE_PUBLIC_URL:', process.env.DATABASE_PUBLIC_URL);

        if (isProd) {
          const dbUrl = process.env.DATABASE_URL;
          if (!dbUrl) throw new Error('DATABASE_URL not defined!');
          return {
            type: 'postgres',
            url: dbUrl,
            ssl: { rejectUnauthorized: false },
            autoLoadEntities: true,
            synchronize: true, // prod: false nếu không muốn auto sync
          };
        }  else {
          return {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '5432'),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
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
