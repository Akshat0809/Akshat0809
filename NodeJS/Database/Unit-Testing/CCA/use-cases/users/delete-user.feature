Feature: Delete User

    Scenario Outline: Attempt to delete a user that does not Exist
        Given User details id: "<id>" to delete Existing user
        When Try to delete Existing user
        Then It will throw error: "<error>" with message: "<message>" while delete user
        And deleteUser function will call <deleteUserFunctionCallCount> time while delete Exisitng user


        Examples:
            | id | deleteUserFunctionCallCount | error | message                   |
            |    | 0                           | Error | '"id" is required'        |
            | a  | 0                           | Error | '"id" must be a valid id' |

    Scenario Outline: Successfully delete a user
        Given User details id: "<id>" to delete Existing user
        When Try to delete Existing user
        Then It will delete Existing user with details: <deleteUserDetails>
        And deleteUser function will call <deleteUserFunctionCallCount> time while delete Exisitng user


        Examples:
            | id | deleteUserDetails | deleteUserFunctionCallCount |
            | 1  | '{"id": 1}'       | 1                           |








