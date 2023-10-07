# Contact-Manager

The development will consist of the creation of a Contact manager for sales business.

- The contacts will be presented in paginated views and will be allowed to filter them as well as operations of creation, editing and deletion of contacts.

-The goal of the development will be the presentation and validation of contact information.

## Project Stages

- The initial prototype will meet the minimum required functionality.
- The extension of the initial prototype with new complementary functionalities to the previous ones.

In case of validating the initial idea, it is intended to iterate on this development, to add progressive improvements.

## Definition Entities

The system will handle a single "Contact" entity composed of the following fields.

 Name

- Will contain uppercase and minuscule letters.
- Will contain whitespaces.
- No two contacts with the same name will exist.
- Its length must be between 4 and 30 characters.
- It may not contain two whitespaces, consecutively.

Email

- will can contain minuscule letters, underscore, dot and numbers.
- will contain keywords as gmail, hotmail or yahoo after '@'.
- It will only support suffixes such as '.com'.
- Cannot start with numbers.
- Its length must be between 12 and 32 characters.
- Will must be unique.

Phone

- Its length must be 9 numerical character plus the prefix(+51).
- Phone number format start with (+51).
- Will must be unique.

Role

- Unique tags for each contact.
- Available tags would be 'Supplier', 'Customer' and 'Sponsor'.

Status

- Possible values would be 'Available' , 'Unavailable'.

## Requirements

The functional and non-functional requirements of the first functional version of the application are detailed.

During these requirements we will talk about:

- User: Person using the App.
- Item: The Contact (User that is part of the system)that will be presented in the main interface of the application.

### Functional requirements

- The items will be presented to the user in table or card format according to the user's choice.
- The user will be able to filter the elements based on the following criteria:
  - Filter by name: text that allows to show only those elements whose "Name" contains the search term, in any position. This filter will not be case-sensitive.
  - Filter by status: Filter to show only available.

The user will be able to sort the items based on the following criteria:

- Default: The order of creation of the elements.
- By name: Sorted alphabetically (a-z).
- By role: Sorted by role."Customer", "Other", "Sponsor" and "Supplier" respectively .
- By status: By its state, first Available and then Unavailable.

The user will not be able to simultaneously use the available items filter and the order by status.

- If the availables elements filter is previously marked, it will not be possible to sort the elements by status.
- In case of being previously sorted by status, checking the filter of available elements will return the default order and this sorting option will not be available.

The items will be presented to the user in paginated format.

- The default size of the page will be 6 elements per page.
- The user will be able to modify this size between three possible values, 4, 6 and 8 elements per page.
- The navigation between pages must be consecutive, being able to advance only to the next / previous page if any.

The user can add new elements to the table, using a form:

- The "Name" fields will initially be empty.
- The "Email" fields will initially be empty.
- The "Phone" fields will initially be empty.
- The "status" field will be initially marked as "Unavailable", and can be modified.
- The "Role" field will initially be marked as "customer" and may be modified.
- The fields of the form must be previously validated, before proceeding to its sending.

The user can edit the data of any element of the table, using a form:

- The form will contain the current data of the item being edited preloaded.
- The fields of the form must be previously validated, before proceeding to its sending.

The user can delete any item from the table:

- The item is permanently deleted.
- Before deleting an item, the user is prompted for confirmation.

### Non-Functional requirements

The application must be made using React, with the following limitations.

- Version: 18 or higher.
- Hooks allowed: useState, useEffect, and useContext.
- Framework to use: Vite.
- The use of third-party component libraries  is not allowed.

The app must be compatible with modern browsers Chrome, Firefox, and Safari.

Regarding persistence and access to data:

- All data must be persisted in a single JSON file.
- Said file must be consulted and modified through an API, generated using json-server that will be hosted in cloud.
- All API calls should be handled using the native fetch tool.
- The API should be used to retrieve item and persist new changes. The server must return the data of all the elements.The tasks of filtering, sorting and paging of elements will be performed directly on the server, using the API instead of on the client.

Regarding the visual section:

- The purely visual aspects, such as colors, fonts, shadows... are merely indicative. Its free modification is allowed.
- The application will implemented in responsive format.
- The application is adaptable from mobile screen (375px) to desktop screen.

Regarding CSS:

- All CSS implementation must be done natively, using CSS or SCSS without frameworks css.
- Only the use of CSS/SCSS modules is allowed.

### Additional requirements

This section details additional requirements to be added in a second version, after having delivered the first functional version with all the previous requirements.
