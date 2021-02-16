//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require("lodash")
require('dotenv').config();
const app = express();

app.set('view engine', 'ejs');
mongoose.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.2zug1.mongodb.net/todolistDB?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
    name: String
}; 

// mongoose models are usually capitalised.
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Hey there! this is your todo list."
});
const item2 = new Item({
    name: "Press the + button to add new items."
});

const item3 = new Item({
    name: "<-- press this button to strike out an item."
});

defaultItemsDocument = [item1, item2, item3];


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var defaultItems = ["Hey there! this is your todo list.", "Press the + button to add new items.", "<-- press this button to strike out an item."]

var items = [];

// creating a list schema
const listSchema = {
    name: String,
    items: [itemSchema]
};

// now creating its model
const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
    
    Item.find({}, (err, docs) => {
	if(docs.length === 0){
	    //inserting the items if there are no present.
	    Item.insertMany([item1, item2, item3], (err) => {
		if(err){
		    console.log(err);
		}
		else{
		    console.log("Basic items added successfully!");
		    res.redirect("/");
		} 
	    });
	}
	else {
	    res.render("list", {listTitle: "Today", newListItems: docs});
	}

    });
    
});



app.post("/delete", (req, res) => {
    var checkedItem = req.body.checkbox;
    var listName = req.body.listTitle;
    listName = _.capitalize(listName);
    checkedItem = checkedItem.toString();
    console.log(listName);

    //deleting the item by id
    if(listName === "Today"){
	Item.deleteOne({_id: checkedItem}, (err) => {
	    if(err) {
		console.log(err);
	    }
	    else{
		res.redirect("/");
	    }
	});
    }
	
    else{
	//try mentioning the nested document
	List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItem}}}, (err, docs) => {

	    if(err){
		console.log(err);
	    }
	    else{
		//make this redirect to the listName 
		res.redirect("/" + listName)
	    }
	    
	});

    } 
});

app.get("/about", function(req, res){
  res.render("about");
});


app.post("/new", (req, res) => {

    var listName = req.body.listTitle;
    var newList = req.body.newList;


    
    //checking if the button pressed is of adding a new list
    if(newList){
	res.redirect("/" + newList);
    }
    else if(listName == "All lists" && newList == ""){
	res.redirect("/all");

    }
    else if(newList == ""){
	res.redirect("/" + listName);
    }
    else{

    listName = _.capitalize(listName)


    if(listName === "Today"){
	Item.find({}, (err, docs) => {
	    if(docs.length === 0){
		//inserting the items if there are no present.
		Item.insertMany([item1, item2, item3], (err) => {
		    if(err){
			console.log(err);
		    }
		    else{
			console.log("Basic items added successfully!");
			res.redirect("/");
		    } 
		});
	}
	    else {
		res.render("new", {listTitle: "Today", newListItems: docs});
	    }
	    
	});
	
    }
	else if(listName === "All lists"){
	    List.find({}, (err, docs) => {
		if(err){
		    console.log(err);
		}
		else{
		    res.render("new", {listTitle: "All lists", newListItems: docs})
		}
	    });
	}
	else{
	    List.find({name: listName}, (err, docs) => {
		if(!err){
		    // if no list with the name exists.
		    if(docs.length === 0){
			const list = new List({
			    name: listName,
			    items: item1
			});
			list.save();   
			console.log("No list with that name exists!")  
			res.redirect("/" + listName);
		    }
		    else{
	    		//console.log("List already exists!")
			res.render("new", {listTitle: docs[0].name, newListItems: docs[0].items});
		    }
		}	
		else{
		    console.log(err);
		} 
	    });
	}
    }
    
});




app.get("/:list", (req, res) => {
    var listName = req.params.list;
    listName = _.capitalize(listName)
    if(listName == "Today"){
	res.redirect("/");
    }
    else{
	List.find({name: listName}, (err, docs) => {
	    if(!err){
		// if no list with the name exists.
		if(docs.length === 0){
		    const list = new List({
			name: listName,
			items: item1
		    });
		    list.save();   
		    console.log("No list with that name exists!")  
		    res.redirect("/" + listName);
		}
		else{
	    	    //console.log("List already exists!")
		    res.render("list", {listTitle: docs[0].name, newListItems: docs[0].items});
		}
	    }	
	    else{
		console.log(err);
	    } 
	});
    }

});

app.post("/:list", (req, res) => {
    var listName = req.params.list; 
    listName = _.capitalize(listName)
    var enteredItem = req.body.newItem;
    const dbEnteredItem = new Item({
	name: enteredItem
    })
    if(listName === "Today"){
	dbEnteredItem.save();	
	res.redirect("/");
    }
    else{
	List.find({name: listName}, (err, docs) => {
	    if(!err){
		//checking if there is something inside the docs.
		if(docs.length != 0){
		    docs[0].items.push(dbEnteredItem);  
		    docs[0].save();
		    res.redirect("/" + listName);
		}
		
	    }
	    else {
		console.log(err);
	    }
	});
    }
    
});
	 
app.post("/", function(req, res){
    
    const item = req.body.newItem;
    const postedItem = new Item({
	name: item
    })
  
    postedItem.save();
    res.redirect("/");

});



// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

// List.create({ name: 'Today', items: defaultItemsDocument }, function (err) {
//     if (err){
// 	console.log(err);
//     } 
//     else console.log("default items added successfully!")
//   // saved!
// });

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

let port = process.env.PORT;
if(port == null || port == ""){
	port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
