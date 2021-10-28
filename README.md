# Advanced_Sequelize

# getters, setters, validation, custom, queries.

npm init -y
npm install --save sequelize
npm install --save express
npm install --save-dev nodemon
npm install --save pg pg-hstore

sequelize init
sequelize model:generate --name User --attributes name:string,email:string,gender:string
