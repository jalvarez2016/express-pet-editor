const express = require('express')
const app = express()
const methodOverride = require('method-override');
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'))
let pets = [
  {
    id: 1,
    species: "Dog",
    name: "Fido", 
    age: "5 years",
    notes: "Cute guy",
    likes: 0
  },
  {
    id: 2,
    species: "Cat",
    name: "Fluffy", 
    age: "8 months",
    notes: "Adorable girl",
    likes: 0
  },
  {
    id: 3,
    species: "Bird",
    name: "Polly", 
    age: "3 years",
    notes: "Lovable fellow",
    likes: 0
  },
]

app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

app.get('/', (req, res) => {
  res.render("home.ejs", {pets})
})

app.get('/pets', (req, res) => {
  res.redirect('/')
})

app.put('/pets/:id', (req, res) => {
  const foundPet = pets.find(pet => pet.id === parseInt(req.params.id));
  foundPet.likes++;
  res.redirect('/');
});

app.get("*", (req, res) => {
  res.render("notfound.ejs", {title: "Not Found"})
})