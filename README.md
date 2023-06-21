# Grace Shopper Project

## Objectives 
Students will be able to:

Work Together in a Team
Understand senior phase structure
Demonstrate team workflow best practices
Discuss team roles (taskmaster, gitmaster, testmaster)
Create team contract

## Setup
Set up your Github Org
Objectives:
Demonstrate good git/github practices
Create team org and project board
Initialize team repo with boilermaker code

## Customize
Now that you've got the code, follow these steps to get acclimated:

- Update project name and description in `package.json`
- `npm install`
- Create a postgres database called 'graceshopper' 
- These commands below will create both your **development** and **test** databases

```
createdb graceshopper
createdb graceshopper-test
```

- By default, running `npm test` will use your test database, while
  regular development uses development database

## Start

Sync and seed your database by running `npm run seed`. Running `npm run start:dev` will make great things happen!

- start:dev will both start your server and build your client side files using webpack
- start:dev:logger is the same as start:dev, but you will see your SQL queries (can be helpful for debugging)
- start:dev:seed will start your server and also seed your database (this is useful when you are making schema changes and you don't want to run your seed script separately)

Credits....

Ivan

Caleb

Michelle

Jovan


