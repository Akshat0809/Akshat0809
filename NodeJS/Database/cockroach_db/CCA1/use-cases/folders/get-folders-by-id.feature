Feature: Find Folder with Id

    Scenario Outline: Try to find folder by id with invalid details, then it will throw error.
        Given folder details id: "<id>" to find folder with id
        When Try to find details
        Then It will throw error: "<error>" with message: <message> while finding folder with id
        And  getfolderById function will call <getfolderByIdFunctionCallCount> time while finding folder with id


        Examples:
            | id | getfolderByIdFunctionCallCount | error | message                   |
            |    | 0                              | Error | '"id" is required'        |
            | a  | 0                              | Error | '"id" must be a valid id' |


    Scenario Outline: Try to find folder by id with valid inputs, then it will throw error.
        Given folder details id: "<id>" to find folder with id
        When Try to find details
        Then It will get folders with id: <getfolderByIdDetails>
        And getfolderById function will call <getfolderByIdFunctionCallCount> time while finding folder with id

        Examples:
            | id | getfolderByIdDetails | getfolderByIdFunctionCallCount |
            | 25 | '{"id": 1}'          | 1                              |
