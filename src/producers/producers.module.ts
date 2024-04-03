import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producers } from './entities/producers.entity';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Producers])],
  controllers: [ProducersController],
  providers: [ProducersService],
  exports: [ProducersService],
})
export class ProducersModule {}
