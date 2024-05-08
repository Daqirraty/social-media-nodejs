require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const sequelize = require('./config/db');
const UserModel = require('./model/userModel');
const PostModel = require('./model/postModel');
const commentModel = require('./model/commentModel');
const reactionModel = require('./model/reactionModel');
const displayRoute = require('express-routemap');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const postRouter = require('./routes/postRouter');



app.use(bodyParser.json());
app.use('/api/v1/user', userRouter );
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/post', postRouter);


sequelize.sync()
.then(result => console.log('Model synced successfully'))
.catch(err => console.log('Error syncing model'));

sequelize.authenticate()
.then(result => {
  console.log("Database Connection established");
  app.listen(port, ()=>{
    console.log(`listening on ${port}`);
    displayRoute(app);
  });
})
.catch(err =>{
  console.log("Server error")
});


app.use((req, res)=>{
  res.status(400).json({
    status: false,
    message: 'Cannot Reach'
  });
});

