import { BadRequestException } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
const handlerErrorDB = (error: unknown, res: string) => {
  let message = '';
  let target = '';

  if (error instanceof PrismaClientKnownRequestError) {
    error.meta?.modelName ? (res = error.meta.modelName as string) : res;
    error.meta?.target
      ? (target = (error.meta.target as string[]).join(','))
      : '';
    if (error.code === 'P2002') {
      message = `${res} ${'(' + target + ')'} already exists`;
    } else if (error.code === 'P2025') {
      message = `${res} not found`;
    } else if (error.message.includes('Unique constraint failed')) {
      message = `Unique constraint failed in ${res}`;
    } else {
      message = `Error in ${res}`;
    }
  }

  if (error instanceof PrismaClientValidationError) {
    if (error.message.includes('Invalid value for argument')) {
      message = `Invalid value for argument in ${res}`;
    } else {
      message = `Error in ${res}`;
    }
  }
  throw new BadRequestException(message);
};

export { handlerErrorDB };
