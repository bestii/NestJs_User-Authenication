import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiProperty, ApiSecurity } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AppService } from './app.service';
import { PassportJwtAuthGuard } from './auth/guards/passport-jwt.guard';

export class AwesomenessDto {
  @ApiProperty({ description: 'A URL to test' })
  @IsString()
  @IsNotEmpty()
  url?: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('awesomeness')
  @ApiSecurity('oauth2')
  @UseGuards(PassportJwtAuthGuard)
  @ApiBody({ type: AwesomenessDto })
  test(@Body() body: AwesomenessDto) {
    return this.appService.generatePatternFromURL(body.url);
  }
}
