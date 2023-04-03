import { HttpException } from '@nestjs/common';
import { Test} from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
      const module = await Test.createTestingModule({
          controllers: [UserController],
          providers: [UserService]
      }).compile();

      userService = module.get<UserService>(UserService);
      userController = module.get<UserController>(UserController);
  });

  describe('getUser', () => { 
      it('should return an instance of UserDetails', async () => { 
          class UserDetails {
            constructor(public _id: string, public name: string, public surname: string, public email: string) {}
          }
        
          const result = new UserDetails("1", "jhon", "doe", "john.doe@example.com"); 

          jest.spyOn(userService, 'findById').mockImplementation(() => Promise.resolve(result)); 

          expect(await userController.getUser('1')).toBe(result); 
      }); 

      it('should throw an HttpException if the requested id does not exist', async () => { 
          jest.spyOn(userService, 'findById').mockImplementation(() => Promise.resolve(undefined)); 

          try { 
              await userController.getUser('1'); 
              fail();  // should not get here, should throw exception instead  
          } catch (e) {   // catch the exception thrown by the controller  
              expect(e instanceof HttpException).toBeTruthy();   // check that it is an HttpException  
          }  
      });  

  });  

   afterEach(() => {   // clean up any mocks after each test is run  
       jest.restoreAllMocks();   // restore all mocks back to original implementation after each test is run  
});     														                                                           })
