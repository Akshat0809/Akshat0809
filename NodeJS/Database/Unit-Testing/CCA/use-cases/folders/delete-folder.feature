Feature: Delete Folder

    Scenario Outline: Attempt to delete a Folder that does not Exist
        Given Folder details id: "<id>" to delete Existing Folder
        When Try to delete Existing Folder
        Then It will throw error: "<error>" with message: "<message>" while delete Folder
        And deleteFolder function will call <deleteFolderFunctionCallCount> time while delete Exisitng folder


        Examples:
            | id | deleteFolderFunctionCallCount | error | message                   |
            |    | 0                           | Error | '"id" is required'        |
            | a  | 0                           | Error | '"id" must be a valid id' |

Scenario Outline: Successfully delete a folder
    Given Folder details id: "<id>" to delete Existing Folder
    When Try to delete Existing Folder
    Then It will delete Existing folder with details: <deletefolderDetails>
    And deleteFolder function will call <deleteFolderFunctionCallCount> time while delete Exisitng folder


    Examples:
        | id | deletefolderDetails | deleteFolderFunctionCallCount |
        | 1  | '{"id": 1}'         | 1                             |








