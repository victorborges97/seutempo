import { useEffect, useState } from "react";

export type TApiResponse = {
  status: number;
  statusText: string;
  data: any;
  error: any;
  loading: boolean;
};

const KEY = "27ef9fd0cf7541169da130306220206";

function useWeather(city: string): TApiResponse {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAPIData = async () => {
    setLoading(true);
    try {
      console.info("USEWEATHER: INIT FETCH");
      const apiResponse = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${encodeURI(
          city
        )}&aqi=no`
      );
      const json = await apiResponse.json();
      setStatus(apiResponse.status);
      console.info("USEWEATHER: STATUS " + apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(json);
    } catch (error) {
      console.info("USEWEATHER: ERROR " + error);
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) {
      getAPIData();
    }
  }, [city]);

  return { status, statusText, data, error, loading };
}

export default useWeather;
