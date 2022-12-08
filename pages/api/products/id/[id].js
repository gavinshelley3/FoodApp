// Get a single product by ID
export default async function handler(req, res) {
  console.log("handler");
  const apikey = "QhFPdJ8tmPFxgTTJ0AySfqv7etS6SDMANBhwUKQW";
  const id = req.query.id;
  const url =
    "https://api.nal.usda.gov/fdc/v1/food/" +
    id +
    "?dataType=Foundation&sortBy=dataType.keyword&api_key=" +
    apikey;
  console.log(url);
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const product = data;
      console.log(product);
      res.json(product);
    });
}
