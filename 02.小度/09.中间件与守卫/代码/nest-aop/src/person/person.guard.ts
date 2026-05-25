import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PersonService } from './person.service';

@Injectable()
export class PersonGuard implements CanActivate {
  @Inject(PersonService)
  private personService: PersonService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('person guard');
    console.log('调用注入的守卫 ' + this.personService.findAll());
    console.log('context', context);
    // return false;
    return true;
  }
}
