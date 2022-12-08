// Get products from name
export default async function handler(req, res) {
  console.log("handler");
  const apikey = "QhFPdJ8tmPFxgTTJ0AySfqv7etS6SDMANBhwUKQW";
  const foodname = req.query.name;
  let url =
    "https://api.nal.usda.gov/fdc/v1/foods/search?query=" +
    foodname +
    "&dataType=Foundation,SR%20Legacy&pageSize=50&pageNumber=1&sortBy=dataType.keyword&sortOrder=asc&api_key=" +
    apikey;
  console.log("foodname: ", foodname);
  console.log(url);
  let products = [];
  await fetch(url)
    .then((response) => response.json())
    .then(async (data) => {
      products = data;
      console.log(products);
      if (products.length === 0) {
        url =
          "https://api.nal.usda.gov/fdc/v1/foods/search?query=" +
          foodname +
          "&dataType=Foundation,SR%20Legacy&pageSize=50&pageNumber=2&sortBy=dataType.keyword&sortOrder=asc&api_key=" +
          apikey;
        console.log(url);
        await fetch(url)
          .then((response) => response.json())
          .then(async (data) => {
            const products = data;
            console.log(products);
            if (products.length === 0) {
              url =
                "https://api.nal.usda.gov/fdc/v1/foods/search?query=" +
                foodname +
                "&dataType=Foundation,SR%20Legacy&pageSize=50&pageNumber=3&sortBy=dataType.keyword&sortOrder=asc&api_key=" +
                apikey;
              console.log(url);
              await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                  const products = data;
                  console.log(products);
                });
            }
          });
      }
      res.json(products);
    });
}
