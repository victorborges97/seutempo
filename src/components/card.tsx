import React, { ReactNode } from "react";
import initialData from "../helpers/initial_data";
import { Tempo } from "../types/tempo";

type Props = {
  data: Tempo;
  loading: boolean;
};

const Card: React.FC<Props> = ({ data = initialData, loading }) => {
  const Body = ({ children }: { children: ReactNode }) => {
    return (
      <div className="bg-white p-6 mt-10 rounded-lg shadow-md min-w-[220px]">
        {children}
      </div>
    );
  };

  if (loading) {
    return <Body>Carregando</Body>;
  }

  return (
    <Body>
      <div className="text-center">
        <span className="block text-lg font-bold text-slate-700">
          {data.location.name}
        </span>
        <span className="text-slate-400 text-sm font-medium">
          {`${data.location.region}, ${data.location.country}`}
        </span>
      </div>

      <div className="font-bold text-slate-700 flex justify-center mt-4 mb-2">
        <span className="text-8xl">{data.current.temp_c}</span>
        <span className="text-3xl mt-2">°C</span>
      </div>

      <div className="flex justify-center flex-col items-center">
        <img src={data.current.condition.icon} alt="Icon Weather" />
        <span className="text-slate-700 font-medium">
          {data.current.condition.text}
        </span>
      </div>
    </Body>
  );
};

export default Card;
