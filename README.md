## Summary
Internet Programming (Autumn 2023) Assignment 2 - Online Car Rental System using AJAX and JSON
<br/>
**URL**: https://hertz-uts-orcin.vercel.app/
<br/><br/>
## Tech Stack
### Web framework
- [Next.js](https://nextjs.org/)
### CSS
- [Tailwind CSS](https://tailwindcss.com/)
### Database
- [Prisma](https://www.prisma.io/)
- [PlanetScale](https://planetscale.com/)
### Deployment
- [Vercel](https://vercel.com/)
<br/><br/>
## Assignment Specification
1. Design a JSON file “cars.json” with the structure specified in requirement 3 and store at least 10+ car data items in the JSON file. Set up the availability state to “True” for 70% of cars in the Warehouse, and a “False” state to the other 30%.
2. Use AJAX to load the JSON file “cars.json” and extract the data and save it as arrays in your webpage.
3. Display the cars in a nice tabular format using the above arrays on your webpage for users to select.
4. Provide a “button” to add the car to the reservation “shopping cart”. Use AJAX to check the availability of the car after clicking the button (the field “availability” is included in cars.json). If the availability is “True” then add the car to the reservation shopping cart and prompt success; If the availability is “False” then alert that “Sorry, the car is not available now. Please try other cars”.
5. Provide a button/link to view the reservation shopping cart. Display the cars which have been added into the reservation shopping cart (hint: use session to store the data). Users can set the “rent days” or delete cars in the shopping cart.
6. Provide the checkout button to check if there are cars in the shopping cart. If no, then alert “No car has been reserved.” and jump to the first page. If yes, validate the “rental days” (integer, >0) using JavaScript and navigate to the next page.
7. Design the checkout page which displays a purchase form asking the user to fill in their delivery details (name, email address, mailing address, city, state, post-code and payment type). All these fields must be completed for the order to go ahead. Validate the format of the email address. If all details are filled correctly, then direct the user to a page showing the delivery details and the cost.
<br/><br/>
## Assignemnt Marking Scheme
1. Home page [7 marks]
- The home page (or the browsing page) correctly shows car images and relevant information.
- Cars on the browsing page are in a nice-looking layout.
- A shopping cart is visible and easy to access from the browsing page.
- The page’s content is interactable – users can click the shopping cart and the “Add to cart” button.
- The page’s content can dynamically reflect changes in the underlying JSON file.
2. Shopping Cart [8 marks]
- The shopping cart shows the correct information, such as car info, price, rental days, and user actions.
- User can edit the rental days, which can be validated by the website.
- Users can remove items from the shopping cart, which will reload the whole page.
- The shopping cart can be validated by the website.
3. Checkout Page [8 marks]
- The user’s input to the form can be validated by the website.
- The correct amount can be calculated and show on the page.
- User can return to the browsing page without a problem.
- The underlying JSON can be updated upon successful booking.
- The underlying MySQL database can be updated correctly upon successful booking.
4. Technologies [7 marks]
- Use of AJAX or comparable technologies to complete the functionalities.
- Use of JSON as required to store cars information.
- Use of MySQL database to store renting history.
- Use of session to keep the content of shopping cart.
5. Overall Presentation and User Experience [5 marks]
- Web pages dynamically update information without interfering users and website behaviors.
- Text fonts used on the web pages are contemporary and of appropriate font sizes.
- Everything on the pages has the appropriate font colors and background colors.
- All texts and labels are easy to read.
- Data presented in tables is nicely formatted.
- No unnecessary borders in tables.
- No borders around images.
- Website works smoothly without technical errors.
6. Bonus Points [5 marks]
- Additional features on top of the assignments requirements that significantly improve technological set up or user experience of the website.
- AJAX features are used or reflected throughout the website.
- Effective measures that notably improve the website design or user experience.
