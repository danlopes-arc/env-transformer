import { transformateFactory } from '.';

class Env {
  STRING!: string;
  NUMBER!: number;
  BOOLEAN!: boolean;
}

describe('transformFactory', () => {
  it('transforms an object into a class instance', () => {
    const rawEnv = {
      STRING: 'some-name',
      NUMBER: 123,
      BOOLEAN: true,
    };

    const transform = transformateFactory(Env);
    const env = transform(rawEnv);

    expect(env).toBeInstanceOf(Env);
  });

  it('returns a validated instance of the given class', () => {
    // arrange
    // the validated value form class-transfomer and class-validator
    // mock class-transfomer and class-validator functions
    // act
    // get the value from transform function
    // assert
    // that value returned form mocked class-transform matches real class-transform's one
    // that the value returned from class-transform matches the one returned form transform()
  });
});

it.todo('transforms'); // class-transform.plainToInstance gets called and value returned from it is returned
it.todo('validates'); // class-validator.validateSync get called with object returned from class-transform.plainToInstance
