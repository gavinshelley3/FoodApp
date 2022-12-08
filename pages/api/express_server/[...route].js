// Purpose: This file is used to handle all the API requests from the front end
//          and return the data to the front end
//

const FDC_API_Name = (request) => {
  const foodName = request.POST.get("foodName");

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&dataType=Foundation&sortBy=dataType.keyword&api_key=hau66Auej9ComnzHEm2xLrHvyelPig3ORzx3jqry`;

  const j = request.get(url).json();

  const l = [];

  const ids = [];

  class Item {
    constructor(name, id) {
      this.name = name;
      this.id = id;
    }
  }

  const listItem = [];

  for (const food of j["foods"]) {
    const x = new Item(food["description"], food["fdcId"]);
    listItem.push(x);
  }

  if (listItem.length === 0) {
    url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&dataType=Survey%20%28FNDDS%29&sortBy=dataType.keyword&api_key=hau66Auej9ComnzHEm2xLrHvyelPig3ORzx3jqry`;

    j = requests.get(url).json();

    for (const food of j["foods"]) {
      const x = new Item(food["description"], food["fdcId"]);
      listItem.push(x);
    }

    if (listItem.length === 0) {
      url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&dataType=Branded&sortBy=dataType.keyword&api_key=hau66Auej9ComnzHEm2xLrHvyelPig3ORzx3jqry`;

      j = requests.get(url).json();

      for (const food of j["foods"]) {
        const x = new Item(food["description"], food["fdcId"]);
        listItem.push(x);
      }
    }
  }

  current_dc = DailyConsumed.objects.get((dcid = request.POST.get("3dcid")));
  current_person = Person.objects.get((email = request.POST.get("3email")));

  const foods = FoodConsumed.objects.filter((dcid = current_dc));

  let context;
  if (listItem.length === 0) {
    context = {
      listItem: listItem,
      send: true,
      message: "Food not found, enter info manually below",
      current_person: current_person,
      foods: foods,
      current_dc: current_dc,
    };
  } else {
    context = {
      send: false,
      listItem: listItem,
      current_person: current_person,
      foods: foods,
      current_dc: current_dc,
    };
  }
  return context;
}; // End of FDC_API_Name

export default FDC_API_Name;
