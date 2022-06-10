import Card from "@tempo/components/card";
import Head from "next/head";
import { useEffect, useState } from "react";
import useWeather from "../services/api";

export default function Home() {
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const { loading, data, error, getAPIData } = useWeather(citySearch);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCitySearch(city);
    getAPIData();
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  const getMyLocation = async () => {
    const window2 = typeof window != "undefined" && window;

    if (window2 === false) return;

    const location = window2.navigator && window2.navigator.geolocation;

    let d = {
      latitude: 0,
      longitude: 0,
    };

    if (location) {
      await location.getCurrentPosition(async function (position) {
        d = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        await getCity(d.latitude, d.longitude);
      }, showError);
    }
  };

  const getCity = async (lat: any, long: any) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
    );
    const json = await res.json();

    const data = json;

    if (data?.address?.city != undefined && data?.address?.state != undefined) {
      setCitySearch(`${data?.address?.city}, ${data?.address?.state}`);
      setCity(`${data?.address?.city}, ${data?.address?.state}`);
    }
  };

  function showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Usuário rejeitou a solicitação de Geolocalização.";
        break;
      case error.POSITION_UNAVAILABLE:
        return "Localização indisponível.";
        break;
      case error.TIMEOUT:
        return "O tempo da requisição expirou.";
        break;
      case error.UNKNOWN_ERROR:
        return "Algum erro desconhecido aconteceu.";
        break;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <Head>
        <title>Seu tempo</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full flex flex-col items-center p-4 sm:relative justify-center"
      >
        <div className="flex">
          <input
            placeholder="Cidade, Estado"
            className="p-3 rounded-lg outline-none w-full sm:max-w-[300px] flex-1"
            type="text"
            value={city}
            onChange={({ target: { value } }) => setCity(value)}
          />
          <button
            type="submit"
            className="bg-blue-600 p-3 rounded-lg ml-3 text-white font-bold"
          >
            Pesquisar
          </button>
        </div>

        <div className="flex pt-2 cursor-pointer items-center hover:underline hover:text-blue-600">
          <p onClick={getMyLocation} className="">
            Buscar minha localização
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </form>

      <Card data={data} loading={loading} />
      {error && <p>{error}</p>}
    </div>
  );
}
