const { Client, Environment, ApiError } = require('square');
const client = require('@/app/helpers/apiAuth').default;
const { locationsApi } = client;

async function getLocations() {
  try {
    let listLocationsResponse = await locationsApi.listLocations();

    let locations = listLocationsResponse.result.locations;

    let info = '';
    locations.forEach(function (location) {
       info += 
        location.id + ": " +
          location.name +", " +
          location.address.addressLine1 + ", " +
          location.address.locality;
      
    });
    console.log(info);
    return info;
  } catch (error) {
    if (error instanceof ApiError) {
      error.result.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

export default async function handler(req, res) {
  let locationInfo = await getLocations();
  res.status(200).json({ message: locationInfo})
}


