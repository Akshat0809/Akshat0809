Feature: Find Id

        Scenario Outline: Try to find id with invalid details, then it will throw error.
            Given User details email: "<email>" to find id
             When Try to find id
             Then It will throw error: "<error>" with message: "<message>" while finding id
              And findId function will call <findIdFunctionCallCount> time while finding id


        Examples:
                  | email | findIdFunctionCallCount | error | message                         |
                  |       | 0                       | Error | '"email" is required'           |
                  | aman  | 0                       | Error | '"email" must be a valid email' |
                  
              
        Scenario Outline: Try to find id with valid inputs, then it will throw error.
            Given User details email: "<email>" to find id
             When Try to find id
             Then It will find id with details: <findIdDetails>
              And findId function will call <findIdFunctionCallCount> time while finding id

        Examples:
                  | email                   | findIdDetails | findIdFunctionCallCount |
                  | aman.gupta@rapidops.com | '{"id": 1}'   | 1                       |
