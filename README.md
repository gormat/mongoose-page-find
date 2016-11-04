# mongoose-page-find

## Installation

Install node.js, mongodb, mongoose, then

```sh
npm install mongoose-page-find
```

## Stability

The current stable branch is master.

## Usage

Read mongoose documentation [here](https://www.npmjs.com/package/mongoose)

First setup plugin to mongoose schema.

```
const mongoose = require('mongoose');
const pageFindPlugin = require('mongoose-page-find');

const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
    }
);

userSchema.plugin(pageFindPlugin);
```

Query example

```
const User = mongoose.model('User', userSchema);

User.pageFind(
    {
        filters: {
            firstName: 'John'
        },
        page: 1,
        limit: 30,
        sort: {
            lastName: 1
        }
    },
    (err, data) => {
        console.log(data);
    }
)
```