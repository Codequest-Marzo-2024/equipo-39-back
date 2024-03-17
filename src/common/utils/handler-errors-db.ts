import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
const handlerErrorDB = (error: unknown, res: string) => {
  let message = '';

  if (error instanceof PrismaClientKnownRequestError) {
    error.meta?.modelName ? (res = error.meta.modelName as string) : res;
    if (error.code === 'P2002') {
      message = `${res} already exists`;
    } else if (error.code === 'P2025') {
      message = `${res} not found`;
    } else if (error.code === 'P2025') {
      message = `Invalid data for ${res}`;
    } else {
      message = `Error in ${res}`;
    }
  }

  throw new BadRequestException(message);
};

export { handlerErrorDB };
