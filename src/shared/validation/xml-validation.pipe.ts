/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import * as libxmljs from 'libxmljs';


@ValidatorConstraint({ async: false })
class IsXmlStringConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (typeof value !== 'string') return false;

    try {
      libxmljs.parseXml(value);
      return true;
    } catch (error) {
        Logger.error('❌❌❌ XML invalide', error)
      return false;
    }
  }

  defaultMessage(): string {
    return 'The provided value must be a valid XML string';
  }
}

export function IsXmlString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsXmlStringConstraint,
    });
  };
}
