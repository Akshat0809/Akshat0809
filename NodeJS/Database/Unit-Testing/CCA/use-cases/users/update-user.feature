Feature: Update user

    Scenario Outline: Try to update user with invalid details, then it will throw error.
        Given User details id: "<id>" to update user
        When Try to update user
        Then It will throw error: "<error>" with message: "<message>" while updating user
        And updateUser function will call <updateUserFunctionCallCount> time while updating user


        Examples:
            | id | updateUserFunctionCallCount | error | message            |
            |    | 0                           | Error | '"id" is required' |


    Scenario Outline: Try to find id with valid inputs, then it will throw error.
        Given User details id: "<id>" to update user
        When Try to update user
        Then It will update user with details: <updateUserDetails>
        And updateUser function will call <updateUserFunctionCallCount> time while updating user

        Examples:
            | id | updateUserDetails | updateUserFunctionCallCount |
            | 1  | 1                 | 1                           |
