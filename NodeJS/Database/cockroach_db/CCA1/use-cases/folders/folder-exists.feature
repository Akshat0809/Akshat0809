Feature: Find Folder by folder id that folder exist or not

    Scenario Outline: Try to find folder Exist with invalid details, then it will throw error.
        Given Folder details id: "<id>" and name: "<name>" to folder Exist
        When Try to folder Exist
        Then It will throw error: "<error>" with message: "<message>" while finding folder existence
        And folderExists function will call <FolderExistsFunctionCallCount> time while creating new folder


        Examples:
            | id | name       | FolderExistsFunctionCallCount | error | message                   |
            |    |            | 0                             | Error | '"id" is required'        |
            | 25 |            | 0                             | Error | '"name" is required'      |
            | a  | new folder | 0                             | Error | '"id" must be a valid id' |
            | *  |            | 0                             | Error | '"id" must be a valid id' |
            |    | new app    | 0                             | Error | '"id" is required'        |


    Scenario Outline: Try to folder Exist with valid inputs, then it will throw error.
        Given Folder details id: "<id>" and name: "<name>" to folder Exist
        When Try to folder Exist
        Then It will folder Exist with details: "<folderExistsDetails>"
        And folderExists function will call <FolderExistsFunctionCallCount> time while creating new folder

        Examples:
            | id | name       | folderExistsDetails | FolderExistsFunctionCallCount |
            | 8  | new Folder | '{"id": 1}'         | 1                             |
