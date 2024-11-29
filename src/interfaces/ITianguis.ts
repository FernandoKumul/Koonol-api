export interface ITianguis{
    userId: string;
    name: string;
    color: string;
    photo?: string;
    indications: string;
    markerMap: {
      type: string;
      coordinates: [number, number]; // Coordenadas (longitud, latitud)
    };
    locality: string;
    active: boolean;
  }