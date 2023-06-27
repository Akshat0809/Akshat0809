Feature: Update folder

    Scenario Outline: Try to update folder with invalid details, then it will throw error.
        Given folder details id: "<id>" to update folder
        When Try to update folder
        Then It will throw error: "<error>" with message: "<message>" while updating folder
        And updatefolder function will call <updatefolderFunctionCallCount> time while updating folder


        Examples:
            | id | updatefolderFunctionCallCount | error | message                   |
            |    | 0                             | Error | '"id" is required'        |
            | *  | 0                             | Error | '"id" must be a valid id' |

    Scenario Outline: Try to find id with valid inputs, then it will throw error.
        Given folder details id: "<id>" to update folder
        When Try to update folder
        Then It will update folder with details: <updatefolderDetails>
        And updatefolder function will call <updatefolderFunctionCallCount> time while updating folder

        Examples:
            | id | updatefolderDetails | updatefolderFunctionCallCount |
            | 1  | '{ "id": 1 }'       | 1                             |
