import mongoose from "mongoose";

// Placeholder Data. Replace with real data from a database CSV file.

const countrySchema = new mongoose.Schema({
  name: String,
  votes: Number,
  capital: String,
  population: Number,
  area: Number,
  gdp: Number,
  currency: String,
  language: String,
});

const Country = mongoose.model("Country", countrySchema);

export default Country;
