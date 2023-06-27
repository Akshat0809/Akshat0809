Feature: Create New User

        Scenario Outline: Try to create new user with invalid details, then it will throw error.
            Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
             When Try to create new user
             Then It will throw error: "<error>" with message: "<message>" while creating new user
              And createUser function will call <createUserFunctionCallCount> time while creating new user


        Examples:
                  | name       | email             | password | createUserFunctionCallCount | error | message                                                |
                  |            |                   |          | 0                           | Error | '"name" is required'                                   |
                  | Aman Gupta |                   |          | 0                           | Error | '"email" is required'                                  |
                  | Aman Gupta | aman              |          | 0                           | Error | '"email" must be a valid email'                        |
                  | Aman Gupta | aman@rapidops.com |          | 0                           | Error | '"password" is required'                               |
                  | Aman Gupta | aman@rapidops.com |          | 0                           | Error | '"password" is required'                               |
                  | Aman Gupta | aman@rapidops.com | 1234     | 0                           | Error | '"password" length must be at least 8 characters long' |


        Scenario Outline: Try to create new user with valid inputs, then it will throw error.
            Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
             When Try to create new user
             Then It will create new user with details: "<newUserDetails>"
              And createUser function will call <createUserFunctionCallCount> time while creating new user

        Examples:
                  | name       | email                   | password   | newUserDetails | createUserFunctionCallCount |
                  | Aman Gupta | aman.gupta@rapidops.com | 1234567890 | '{"id": 1}'    | 1                           |
