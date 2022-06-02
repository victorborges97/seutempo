import Card from "@tempo/components/card";
import Head from "next/head";
import { useEffect, useState } from "react";
import useWeather from "../services/api";

export default function Home() {
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const { loading, data, error } = useWeather(citySearch);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCitySearch(city);
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
      location.getCurrentPosition(async function (position) {
        d = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        console.log(d);
        await getCity(d.latitude, d.longitude);
      }, showError);
    }
  };

  const getCity = async (lat: any, long: any) => {
    const res = await fetch(
      `http://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
    );
    const json = await res.json();

    console.log(json);
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
        <link rel="icon" href="/favicon.ico" />]
      </Head>

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0 w-full flex p-4 sm:relative justify-center"
      >
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
      </form>

      {error && <p>Error api</p>}

      <Card data={data} loading={loading} />
    </div>
  );
}
