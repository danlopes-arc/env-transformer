import { ClassTransformOptions } from 'class-transformer';
import { ValidationOptions } from 'class-validator';

type Class = new (...args: never[]) => unknown;

interface TransformateOptions {
  /**
   * If set to true, the validation will be done against the transformed
   * environment class instance, otherwise validation will be done against
   * the raw environment object.
   *
   * @default false
   */
  validateAfterTransformation?: boolean;

  /**
   * Options to be used when transforming the environment object.
   */
  transformOptions?: ClassTransformOptions;

  /**
   * Options to be used when validating the class instance.
   */
  validateOptions?: ValidationOptions;
}
