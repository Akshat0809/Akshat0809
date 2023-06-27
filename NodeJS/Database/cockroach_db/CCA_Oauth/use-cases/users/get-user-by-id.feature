Feature: Find User with Id

    Scenario Outline: Try to find user by id with invalid details, then it will throw error.
        Given User details id: "<id>" to find user with id
        When Try to find Details
        Then It will throw error: "<error>" with message: "<message>" while finding user with id
        And  getUserById function will call <getUserByIdFunctionCallCount> time while finding user with id


        Examples:
            | id | getUserByIdFunctionCallCount | error | message                   |
            |    | 0                            | Error | '"id" is required'        |
            | a  | 0                            | Error | '"id" must be a valid id' |


    Scenario Outline: Try to find user by id with valid inputs, then it will throw error.
        Given User details id: "<id>" to find user with id
        When Try to find Details
        Then It will find Details with id: "<getUserByIdDetails>"
        And getUserById function will call <getUserByIdFunctionCallCount> time while finding user with id

        Examples:
            | id | getUserByIdDetails | getUserByIdFunctionCallCount |
            | 25 | '{"id": 1}'        | 1                            |
