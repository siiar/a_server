# Development Environment
- OS: Fedora 34
- Nodejs: v16.9.1
- NPM: 7.21.1
- MongoDB: 5.0.3 Community
# Running Instructions
- Make sure you have Nodejs, NPM, and MongoDB installed
- Navigate to the root folder that contains **src** folders
- Run: npm install
- Wait for NPM to install the modules
- Run: npm start

Use the register mutation to create a user first so you can use that user credentials to login on the client side.
# Development Guideline
All the source code can be found inside the **src** folder. Folders use **kebab-case** and all the files other than **index.js** and **config.js** use **PascalCase**.

## src/type-defs
All type-defs are stored here, including queries and mutations. Just the type-defs.
## src/resolvers
This folder contains the another two folders for mutations and queries which contains their respective resolvers. **AuthorizedResolver.js** is a wrapper to be used for resolvers that only allows authorized users.
## src/datasource
contains datasources that are to be injected into Apollo's context object.
## src/models
Contains mongoose models.