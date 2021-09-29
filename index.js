'use strict'

const express = require('express')
const controller = require('./controller/controller')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: false}));



//routes
app.post('/create', controller.create)

app.get('/read', controller.read)

app.get('/readAll', controller.readAll)

app.put('/update/:id', controller.update)

app.delete('/delete/:id', controller.deleteProduct)


// server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


