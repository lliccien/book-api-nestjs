import {
  ValidationOptions,
  registerDecorator,
  buildMessage,
} from 'class-validator';

export function IsYear(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isYear',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const expReg = /^(19[0-9][0-9]|20[01][0-9]|2022)$/.test(value);

          if (!expReg) {
            return false;
          }

          return true;
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix} $property must be a valid year (1900 - 2022)`,
          validationOptions,
        ),
      },
    });
  };
}
