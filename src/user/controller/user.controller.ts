import { Body, Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user.interface';
import { Observable, catchError, map, of } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService
  ) {}


  @Post()  
  create(@Body() user: User): Observable<User | {error:any}> {
    return this.userService.create(user).pipe(
      map((user:User)=>user),
      catchError((err)=> of({
        error:err.message })),
    )
  }

  @Get()
  findAll(): Observable<User[]>{
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') params): Observable<User>{
    return this.userService.findOne(params.id);
  }

  @Put(':id')
  updateOne(@Param('id') id:string, @Body() user: User): Observable<any>{
    return this.userService.updateOne(Number(id), user);
  }

  @Delete(':id')
  deleteOne(@Param('id') id:string): Observable<any>{
    return this.userService.deleteOne(Number(id));
  }

}
