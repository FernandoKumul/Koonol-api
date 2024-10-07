export interface ILocationSalesStalls {
    salesStallsId: string;
    tianguisId: string;
    markerMap: {
      type: string;
      coordinates: [number, number];
    };
  }
  