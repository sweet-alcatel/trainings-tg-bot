import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const userRoles = request.headers?.role?.split(',');

    if (!userRoles || !userRoles?.length) {
      return false;
    }

    return this.validateRoles(roles, userRoles);
  }

  validateRoles(roles: string[], userRoles: string[]): boolean {
    return roles.some((role) => userRoles.includes(role));
  }
}
