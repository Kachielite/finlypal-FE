import { Exception } from '@/src/core/error/exception';

function throwException(error: unknown) {
  if (error && typeof error === "object" && "code" in error && "message" in error) {
    throw new Exception(error.message as string);
  } else {
    throw new Exception("An unknown error occurred");
  }
}

export default throwException;