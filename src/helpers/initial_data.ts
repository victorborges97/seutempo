import { Tempo } from "../types/tempo";

const initialData: Tempo = {
  location: {
    name: "-",
    region: "-",
    country: "-",
  },
  current: {
    temp_c: 0.0,
    condition: {
      text: "-",
      icon: "//cdn.weatherapi.com/weather/64x64/night/353.png",
    },
  },
};

export default initialData;
