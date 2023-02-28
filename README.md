# Social-Network-API

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:|   
| Git | [https://git-scm.com/](https://git-scm.com/)     |   
| JavaScript   | [https://developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)      |
| Express.js  | [https://expressjs.com/](https://expressjs.com/)     |
| Mongoose ODM   |  [https://mongoosejs.com/](https://mongoosejs.com/)    |


## Description

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. This API uses a NoSQL database and will help your website to handle large amounts of unstructured data.

[Link to the video demonstrating the functionality of the Social Network API](https://drive.google.com/file/d/17zM9oii4qzE4-YsGF-TJlv0LSoK8UJAH/view)

![./assets/images/Social%20Network%20API.gif](./assets/images/Social%20Network%20API.gif)


## Table of Contents

- [Code Example](#code-example)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [Credits](#credits)
- [License](#license)


## Code Example

These lines of code demonstrate a creation of a user model and a virtual called `friendCount` that retrieves the length of the user's friends array field on the query.
```js
const { Schema, model } = require('mongoose')

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

UserSchema
    // creating virtual
    .virtual('friendCount')
    // Getter
    .get(function() {
        // retrieving the length of the user's friends
        return this.friends.length
    });

const User = model('User', UserSchema)

module.exports = User
```

## Installation

- Clone the repository to your local directory
- Create a .gitignore file that includes "node_modules/"  and  " .DS_Store/" before installing any npm dependencies.
- Run `npm init -y` to include a `package.json` to your repo with required dependencies.
- Run `npm install` to install all dependencies.

## Usage

- Using terminal, navigate to the root directory of your project in the command-line
- Run the command `node index.js` to start the application.
- Open Insomnia app to get needed data.

## Features

- `Create`/`read`/`update`/`delete` users.
- `Add` and `delete` friends from users' friends list (subdocument of User schema).
- `Create`/`read`/`update`/`delete` thoughts.
- `Add` and `delete` reactions (subdocument of Thought schema).

## Learning Points

- Create and manipulate data using MongoDB Compass.
- Insert, find, and return documents stored in a MongoDB database.
- Update and delete documents stored in a MongoDB database.
- Explain how embedded documents can be used to create one-to-one and one-to-many relationships.
- Limit, sort, and skip documents using MongoDB methods.
- Define the structure of the database with schema, and use validators.
- Create a model to map to the MongoDB document.
- Execute CRUD queries using Mongoose.

## Author Info 

```md
### Gladys Ange Isingizwe 

* [Email](gladyisingizwe@gmail.com)
* [LindeIn](www.linkedin.com/in/gladys-isingizwe)
* [Github]()https://github.com/Isglad
```

## Credits

Collabortors on this project are instructional staff, TAs and winter cohort 2022 of the University of Calfornia Berkeley Coding Bootcamp.

## License

Please refer to the LICENSE in the repo.