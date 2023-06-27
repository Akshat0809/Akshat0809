Feature: Create New Folder

    Scenario Outline: Try to create new Folder with invalid details, then it will throw error.
        Given User details id: "<id>" and name: "<name>" to create new folder
        When Try to create new folder
        Then It will throw error: "<error>" with message: "<message>" while creating new folder
        And createFolder function will call <createFolderFunctionCallCount> time while creating new folder


        Examples:
            | id | name       | createFolderFunctionCallCount | error | message                   |
            |    |            | 0                             | Error | '"id" is required'        |
            | 25 |            | 0                             | Error | '"name" is required'      |
            | a  | new folder | 0                             | Error | '"id" must be a valid id' |
            | *  |            | 0                             | Error | '"id" must be a valid id' |

    Scenario Outline: Try to create new folder with valid inputs, then it will throw error.
        Given User details id: "<id>" and name: "<name>" to create new folder
        When Try to create new folder
        Then It will create new folder with details: "<newfolderDetails>"
        And createFolder function will call <createFolderFunctionCallCount> time while creating new folder

        Examples:
            | id | name       | newfolderDetails | createFolderFunctionCallCount |
            | 8  | new Folder | '{"id": 1}'      | 1                             |
