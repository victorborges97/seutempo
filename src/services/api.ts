import { useEffect, useState } from "react";

export type TApiResponse = {
  status: number;
  statusText: string;
  data: any;
  error: any;
  loading: boolean;
  getAPIData: () => Promise<void>;
};

const KEY = process.env.NEXT_PUBLIC_KEY_TEMPO;

function useWeather(city: string): TApiResponse {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchData(url: string) {
    return await fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
        }
        return resp.json();
      })
      .then((receivedJson) => {
        setData(receivedJson);
      })
      .catch((err) => {
        throw "Error in fetch " + err;
      });
  }

  const getAPIData = async () => {
    setLoading(true);
    try {
      console.info("USEWEATHER: INIT FETCH");
      const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=yes&lang=pt`;
      await fetchData(url);
    } catch (error: any) {
      console.info("USEWEATHER: ERROR " + error);
      setError(error.toString());
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city !== undefined && city !== null && city.length > 0) {
      getAPIData();
    }
  }, [city]);

  return { status, statusText, data, error, loading, getAPIData };
}

export default useWeather;
