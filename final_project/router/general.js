const express = require('express');
let books = require("./booksdb.js");
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// let users = []


public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login",users});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
  });

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(books)
    },60)})
    myPromise.then((successMessage) => {
        console.log("From Callback ")
        return res.send(JSON.stringify(books));
    });
//   return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  let promise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(isbn= req.params.isbn)
    },60)})
    promise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
        return res.send(books[isbn]);
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let promise1 = new Promise((resolve,reject) => {
    let auth = req.params.author;
        for(i in books){
            let book = books[i]
            
            if (book.author=== auth){
                result = books[i]
                break;
            }
        }
    });
    promise1.then((successMessage) => {
        console.log("From Callback " + successMessage)
        return res.send(result);
    });
//   let auth = req.params.author;
//   for(i in books){
//       let book = books[i]
//       console.log(book.author);
//       if (book.author=== auth){
//           return res.send(books[i]);
//       }
//   }
  });
  

//   return res.status(300).json({message: "Yet to be implemented"});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here'
  let promise1 = new Promise((resolve,reject) => {
  let tit = req.params.title;
  for(i in books){
      let book = books[i]
     
      if (book.title=== tit){
        console.log(book.title);
        result = books[i];
        break;
        // return res.send(books[i]);
      }
  }

});
  promise1.then((result) => {
    console.log(result);
    return res.send(result);


});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  let review = books[isbn];
  console.log(review);
  return res.send(review.reviews);
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users
