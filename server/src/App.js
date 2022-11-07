const express = require('express');
const app = express();
const router = require("./router/router")
// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
app.use("/api", router);
const port = 8080;
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Start the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log('lala')
  console.log(`Server listening on port ${server.address().port}`);
});



// import controllers
require('./Controllers/userController')(app);
require('./Controllers/activityController')(app);
require('./Controllers/activityOfCheckerController')(app);
require('./Controllers/productToUserController')(app);
require('./Controllers/userAnswerController')(app);
require('./Controllers/userQuestionController')(app);
require('./Controllers/productInOrderControllers')(app);
require('./Controllers/productController')(app);
require('./Controllers/imageForTheCompetitionController')(app);
require('./Controllers/complaintsController')(app);
require('./Controllers/competitionControllers')(app);
require('./Controllers/checkerController')(app);
require('./Controllers/BuyingAProductContollers')(app);
require('./Controllers/blackListController')(app);
require('./Controllers/artistQuestionController')(app);
require('./Controllers/order_Controller')(app);