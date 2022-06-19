# Library

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend server

Run `npm run json:server ` for a backend server. Navigate to `http://localhost:3000/`. The db.json automatically run.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## About Project

Create a system consisting of 3 pages: books, authors and genres.
Authors and genres for sections to perform lazy-loading.
The first page should have a list of possible genres. Implement: also CRUD for that list.
The list of authors should be on the second page. Implement: CRUD also for this list. Moreover, each author should be related to any genre.
There should be a list of books on the third page. Book Create/Update: Only after selecting genre should be filled the next, authors, dropdown datasource (cascading):


## CRUD Description:
Provide an "Add new" button above all three lists, which: Clicking will open a modal window to add a new item with provided fields. Provide for some fields validations (for example, required field, or only:
Ability to enter a number, as it's definitely needed custom validator) and corresponding form validation. Objects: You can select descriptive fields at your discretion (e.g. Title, date of publication: and etc.). After saving It is necessary to update the list of the given page.


## ADD/EDit Functionality
Provide an edit button on each line of the list that:Clicking will open the above modal window, but already for editing in mode. Further steps as in the previous case. Removing: A confirmation window will open beforehand.

If 2 tabs of the browser are opened at the same time, In case of changing the information, it is necessary that in the second one information will be updated.
