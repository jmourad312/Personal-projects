const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{ useNewUrlParser: true,useUnifiedTopology: true });

const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "You don't know the name or what?"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
    rating: 7,
    review: "Very good as a fruit"
});

// fruit.save();

const peaches = new Fruit({
    name: "Peaches",
    rating: 10,
    review: "Great fruit"
});
peaches.save();

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    occupation: String,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person ({
    name: "Jhon",
    age: 37,
    occupation: "Engineer",
    favouriteFruit: peaches
})

person.save();

// const kiwi = new Fruit ({
//     name: "Kiwi",
//     score: 9,
//     review: "the best"
// });
// const orange = new Fruit ({
//     name: "Orange",
//     score: 5,
//     review: "a bit sout"
// });
// const mango = new Fruit ({
//     name: "Mango",
//     score: 10,
//     review: "LUV IT! <3"
// });

// Fruit.insertMany([kiwi,orange,mango], function (err) {
//     if (err){
//         console.log(err);
//     }else{
//         console.log("Successfully saved");
//     }
// });

Fruit.find(function (err, fruits) {
    if (err){
        console.log(err);
    }else{

        mongoose.connection.close();


        fruits.forEach(fruit => {
            console.log(fruit.name);
        });

    }
});

// Fruit.updateOne({name:"Kiwi"},{name:"Grape"},function (err) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully updated the document");
//     }
// });

// Fruit.deleteOne({name:"Orange"},function (err) {
//     if (err) {
//         console.log(err);
//     } else{
//         console.log("Deleted Successfully");
//     }
// })

// Person.deleteMany({name: "Jhon"},function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted Successfully");
//     }
// })



// const url ="mongodb://localhost:27017";

// const dbName = "fruitsDB";

// const client = new MongoClient(url, { useUnifiedTopology: true });

// client.connect(function(err){
//     assert.equal(null, err);
//     console.log("connected succefully to the server");
//     const db = client.db(dbName);
//     insertDocuments(db, function () {
//         client.close();
//     })
// });

// const insertDocuments = function(db, callback){
//     const collection = db.collection("fruits");
//     collection.insertMany([
//         {
//             name: "Apple",
//             score: 8,
//             review: "Great fruit"
//         },
//         {
//             name: "Orange",
//             score: 6,
//             review: "Kinda sour"
//         },
//         {
//             name: "Mango", 
//             score: 10,
//             review: "LUV IT!"
//         }
//     ],function(err,result){
//         assert.equal(err, null);
//         assert.equal(3, result.result.n);
//         assert.equal(3, result.ops.length);
//         console.log("Inserted 3 documents into the collection");
//         callback(result);
//     })
// }