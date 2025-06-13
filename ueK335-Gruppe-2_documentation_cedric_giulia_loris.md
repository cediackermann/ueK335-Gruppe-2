# Documentation for UEk335 - Cedric, Giulia, Loris

## Prototype

Switch on the left to also see our first prototype. In the Pages section <br>
[https://www.figma.com/design/w8rIkRfbUTGbvDaBig66Jn/uek335-group2_mockup?node-id=14-7&t=WXGN4yIVzRhV4Kmi-1](https://www.figma.com/design/hSykBZIRAUK2G0pUDwrX3z/uek335-group2_mockup?node-id=58432-257&t=EwdSuCJt3Dx1cmFt-1)

## User Stories

### US001: User Authentication

- **Prio:** High
- **Title:** As a user, I want to be able to log in to the application so that I can access my personalized content.
- **Story Points:** 5
- **Requirements:**
  - The system shall allow users to log in with valid email and password. (TC001)
  - The system shall display an error message for invalid login credentials. (TC002)
  - The system shall redirect the user to the Books screen upon successful login. (TC001)
  - _KANN: After successful login, the user could be redirected to the Home page instead of the Books page._

### US002: Account Creation

- **Prio:** High
- **Title:** As a new user, I want to be able to create an account so that I can use the application's features.
- **Story Points:** 8
- **Requirements:**
  - The system shall provide a screen for new user registration.
  - The system shall require email and password for registration, with validation.
  - The system shall allow users to provide additional details like first name, last name, and birthdate during registration.
  - The system shall automatically log in the user after successful account creation. (TC003)

### US003: Book Management - Viewing

- **Prio:** Medium
- **Title:** As a user, I want to view a list of available books so that I can browse my collection.
- **Story Points:** 3
- **Requirements:**
  - The system shall display books in a list format with title and publisher information. (TC004)
  - The system shall allow users to filter books by name and other characteristics. (TC005)
  - The system shall allow users to sort the book list by various options. (TC006)

### US004: Book Management - Adding

- **Prio:** High
- **Title:** As a user, I want to add new books to the system so that I can expand my collection.
- **Story Points:** 8
- **Requirements:**
  - The system shall allow users to add a new book by providing title, ISBN, pages, publisher, language, and publication date. (TC008)
  - The system shall validate required fields when adding a new book. (TC009)
  - The system shall validate the ISBN format when adding a new book. (TC010)
  - The system shall add the new book to the list of displayed books upon successful submission. (TC008)

### US005: Book Management - Deleting

- **Prio:** Medium
- **Title:** As a user, I want to delete books from the system so that I can manage my collection.
- **Story Points:** 3
- **Requirements:**
  - The system shall allow users to delete a book from the list. (TC007)
  - The system shall remove the deleted book from the displayed list. (TC007)

### US006: User Profile & Logout

- **Prio:** Medium
- **Title:** As a user, I want to view my profile information and log out of the application.
- **Story Points:** 2
- **Requirements:**
  - The system shall display the user's information (email, name, birthdate) on the profile screen. (TC011)
  - The system shall allow users to log out of the application. (TC012)
  - The system shall redirect the user to the login screen upon logout. (TC012)

### US007: Book Management - Updating

- **Prio:** High
- **Title:** As a user, I want to update existing book information so that I can correct or modify details.
- **Story Points:** 5
- **Requirements:**
  - The system shall allow users to edit an existing book's details. (TC013)
  - The system shall save the updated book information. (TC013)
  - The system shall display the updated book information in the book list. (TC013)

### US008: Navigation - Home Page

- **Prio:** Medium
- **Title:** As a user, I want to navigate to a Home page to get an overview of the application.
- **Story Points:** 2
- **Requirements:**
  - The system shall provide a way to navigate to the Home page. (TC014)
  - The Home page shall display an overview of the application. (TC014)

## Test Cases

The test cases for the application were all executed on an android emulated device.

| TestCaseId | Component  | Priority | Description/Test Summary                                        | Pre-requisites                                 | Test Steps                                                                                                                                                      | Expected Result                                                                  | Actual Result | Status | Test Executed By |
| ---------- | ---------- | -------- | --------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------- | ------ | ---------------- |
| TC001      | LoginForm  | High     | Verify user can login with valid credentials                    | User account exists in the system              | 1. Navigate to login screen<br>2. Enter valid email<br>3. Enter valid password<br>4. Click Login button                                                         | User is successfully logged in and redirected to the Books screen                | As expected   | Pass   | Cedric           |
| TC002      | LoginForm  | High     | Verify validation for invalid login credentials                 | User account exists in the system              | 1. Navigate to login screen<br>2. Enter invalid email or password<br>3. Click Login button                                                                      | Error message is displayed and user remains on login screen                      | As expected   | Pass   | Giulia           |
| TC003      | SignupForm | High     | Verify user can create a new account                            | -                                              | 1. Navigate to signup screen<br>2. Enter first name, last name, birthdate<br>3. Enter valid email and password<br>4. Confirm password<br>5. Click Signup button | New account is created and user is logged in automatically                       | As expected   | Pass   | Loris            |
| TC004      | Books      | Medium   | Verify books are displayed in a list                            | User is logged in<br>Books exist in the system | 1. Navigate to Books screen                                                                                                                                     | Books are displayed in a list with title and publisher information               | As expected   | Pass   | Cedric           |
| TC005      | Books      | Medium   | Verify filter functionality (by name and other characteristics) | User is logged in<br>Books exist in the system | 1. Navigate to Books screen<br>2. Enter filter term in search bar or select filter options                                                                      | Only books matching the filter criteria are displayed                            | As expected   | Pass   | Giulia           |
| TC006      | Books      | Low      | Verify sort functionality                                       | User is logged in<br>Books exist in the system | 1. Navigate to Books screen<br>2. Click on sort header<br>3. Select a sort option                                                                               | Books are sorted according to the selected option                                | As expected   | Pass   | Loris            |
| TC007      | BookItem   | Medium   | Verify delete book functionality                                | User is logged in<br>Book exists in the system | 1. Navigate to Books screen<br>2. Click delete icon on a book                                                                                                   | Book is removed from the list                                                    | As expected   | Pass   | Cedric           |
| TC008      | BookForm   | High     | Verify add book functionality                                   | User is logged in                              | 1. Navigate to AddBook screen<br>2. Fill in all required fields (title, ISBN, pages, publisher, language, publication date)<br>3. Click Add Book button         | New book is added to the system and appears in the Books list                    | As expected   | Pass   | Giulia           |
| TC009      | BookForm   | Medium   | Verify form validation for required fields                      | User is logged in                              | 1. Navigate to AddBook screen<br>2. Leave required fields empty<br>3. Try to submit the form                                                                    | Error messages are displayed for empty required fields and form is not submitted | As expected   | Pass   | Loris            |
| TC010      | BookForm   | Low      | Verify ISBN validation                                          | User is logged in                              | 1. Navigate to AddBook screen<br>2. Enter invalid ISBN format<br>3. Try to submit the form                                                                      | Error message is displayed for invalid ISBN format                               | As expected   | Pass   | Cedric           |
| TC011      | Profile    | Medium   | Verify user information is displayed correctly                  | User is logged in                              | 1. Navigate to Profile screen                                                                                                                                   | User's information (name, email, birthdate) is displayed correctly               | As expected   | Pass   | Giulia           |
| TC012      | Profile    | Medium   | Verify logout functionality                                     | User is logged in                              | 1. Navigate to Profile screen<br>2. Click Logout button                                                                                                         | User is logged out and redirected to the login screen                            | As expected   | Pass   | Loris            |
| TC013      | BookForm   | High     | Verify update book functionality                                | User is logged in<br>Book exists in the system | 1. Navigate to Books screen<br>2. Click edit icon on a book<br>3. Modify book details<br>4. Click Save button                                                   | Book details are updated and reflected in the list                               | As expected   | Pass   | Giulia           |
| TC014      | Home       | Medium   | Verify navigation to Home page                                  | User is logged in                              | 1. Navigate to Home screen                                                                                                                                      | Home page is displayed with an application overview                              | As expected   | Pass   | Cedric           |
