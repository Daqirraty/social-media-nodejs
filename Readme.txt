Todo Today

Social Media Clone

Guys The objective here is to build something like Facebook or LinkedIn 

Todo as expected by the student 
-	Clone Repo on git
-	Branch out  from the base branch and have your own branch
-	In your branch
o	Install all necessary dependencies to kick-start an express app
o	Set up the server and connect to MySQL database using sequelize
-	Here’s a list of todos for you 
o	// Register 
o	// Edit profile 
o	// get my profile --- Log in
o	// get all users 
o	// get one user  
o	// add post
o	// delete post
o	// like/dislike/love post
o	// comment on post
o	// delete comment
o	// get all posts
o	// get one post
o	// get users all posts
o	// delete account




Schemas

usersTbl  
-	id
-	user_id,
-	surname,
-	othernames,
-	username – unique,
-	email_address – unique,
-	occupation,
-	about_me
-	password_hash,
-	password_salt
-	created_at
-	updated_at

postsTbl
-	id
-	post_id
-	user_id
-	post
-	created_at
-	updated_at

commentsTbl
-	id
-	post_id
-	comments
-	user_id (This is the user that made the comment)
-	created_at
-	updated_at

reactionsTbl
-	id
-	post_id
-	user_id (This is the user that give a reaction)
-	reaction[like, dislike, love, funny]
-	created_at
-	updated_at