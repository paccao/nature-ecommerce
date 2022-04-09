# nature-ecommerce

This is a proof of concept webshop made with React, Typescript, Recoiljs, react-query, styled components and Jest + testing-library.
The backend was made with Node.js v.16.13 and PostgreSQL.

The app was built into a docker image and deployed on Heroku.

## To clone this app and run it locally you need to do the following:

``` 
git clone https://github.com/paccao/nature-ecommerce.git
cd nature-ecommerce/app/
npm install
npm run start
```
Open a new terminal window.
```
cd /client/
npm install
npm run start
```
To run the test suites:
```
cd /client/
npm t
```
This will only open up the bare bones app as I will not share the credentials to my database. :-)

To add a database you need to set up a .env file in the path /nature-ecommerce/app/ and connect to where your database is hosted appropriately.

## If you want to check out my deployed version of the app, go to: 
https://nature-ecommerce.herokuapp.com/


## This app was made based on these user stories:
 - As a user can view a list of products to see what's available or not.
 - As a user should can search/filter the names of the available products to make them find items they want faster.
 - As a user you want to be able to see how many products are left in stock to know which items I can buy.
 - As a user I can add a product to my cart to be able to continue shopping before checking out.
 - As a user I want to see an overview of my cart items to get a summary of what I'm purchasing.
 - As a user I want to be able to change the number of products I want to buy in the cart so that I can change my mind.
 - As a user I want to be able to remove products from the cart so that I can change my mind.
 - A user can log in to their account to purchase items in their cart.
