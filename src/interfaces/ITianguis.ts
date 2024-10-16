export interface ITianguis{
    userId: string;
    name: string;
    color: string;
    dayWeek: string;
    photo?: string;
    indications: string;
    markerMap: {
      type: string;
      coordinates: [number, number]; // Coordenadas (longitud, latitud)
    };
    startTime: string;
    endTime: string;
    locality: string;
    active: boolean;
  }