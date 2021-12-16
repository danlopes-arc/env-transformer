import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Class, TransformateOptions } from './types';

/**
 * Creates a function that instantiates and validates an environment class.
 *
 * Obs.: The transformation happens after the validation, so make sure to
 * use string validatorts (e.g. `IsNumberString` instead of `IsNumber`).
 *
 * Can be used with Nestjs `ConfigModule`.
 *
 * @param cls The class to be intantiated and validated against.
 * @param options: Options to be used in the transformation and validation.
 *
 * @returns The validate function that receives an environment object
 * and returns the environment class instance.
 */
export const transformateFactory =
  <T extends Class>(cls: T, options?: TransformateOptions) =>
  (obj: Record<string, unknown>): T => {
    const castCls = cls as unknown as ClassConstructor<T>;

    const rawInstance = plainToInstance(castCls, obj, {
      ignoreDecorators: true,
    });

    const convertedInstance = plainToInstance(castCls, obj, options?.transformOptions);

    const instanceToBeValidated = options?.validateAfterTransformation
      ? convertedInstance
      : rawInstance;

    const errors = validateSync(instanceToBeValidated, options?.validateOptions);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return convertedInstance;
  };

/**
 * Instantiates and validates an environment class.
 *
 * Obs.: The transformation happens after the validation, so make sure to
 * use string validatorts (e.g. `IsNumberString` instead of `IsNumber`).
 *
 * @param cls The class to be intantiated and validated against.
 * @param envObject The environment source.
 * @param options: Options to be used in the transformation and validation.
 *
 * @returns The validated environment class instance.
 */
export const transformate = <T extends Class>(
  cls: T,
  envObject: Record<string, unknown>,
  options?: TransformateOptions,
): T => {
  return transformateFactory(cls, options)(envObject);
};

class Env {
  PORT!: number;
  DB_NAME!: string;
}

export const transformateEnv = (envObject: Record<string, unknown>): Env => {
  const rawInstance = plainToInstance(Env, envObject, {
    ignoreDecorators: true,
  });

  const errors = validateSync(rawInstance);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  const convertedInstace = plainToInstance(Env, envObject, {
    enableImplicitConversion: true,
  });

  return convertedInstace;
};
