// Kakao Maps API TypeScript 정의

declare global {
  interface Window {
    kakao: any;
  }
}

export namespace kakao.maps {
  class LatLng {
    constructor(latitude: number, longitude: number);
    getLat(): number;
    getLng(): number;
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions);
    setCenter(latlng: LatLng): void;
    getCenter(): LatLng;
    setLevel(level: number, options?: { animate: boolean }): void;
    getLevel(): number;
    panTo(latlng: LatLng): void;
    setBounds(bounds: LatLngBounds): void;
  }

  interface MapOptions {
    center: LatLng;
    level?: number;
  }

  class Marker {
    constructor(options: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
    setPosition(position: LatLng): void;
  }

  interface MarkerOptions {
    position: LatLng;
    map?: Map;
    image?: MarkerImage;
  }

  class MarkerImage {
    constructor(src: string, size: Size, options?: MarkerImageOptions);
  }

  interface MarkerImageOptions {
    offset?: Point;
  }

  class Size {
    constructor(width: number, height: number);
  }

  class Point {
    constructor(x: number, y: number);
  }

  class Polyline {
    constructor(options: PolylineOptions);
    setMap(map: Map | null): void;
  }

  interface PolylineOptions {
    path: LatLng[];
    strokeWeight?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeStyle?: string;
  }

  class LatLngBounds {
    constructor();
    extend(latlng: LatLng): void;
  }

  namespace services {
    class Places {
      constructor();
      keywordSearch(
        keyword: string,
        callback: (result: any[], status: Status) => void,
        options?: PlacesSearchOptions
      ): void;
      categorySearch(
        code: string,
        callback: (result: any[], status: Status) => void,
        options?: PlacesSearchOptions
      ): void;
    }

    interface PlacesSearchOptions {
      location?: LatLng;
      radius?: number;
      page?: number;
      size?: number;
      sort?: string;
    }

    class Geocoder {
      constructor();
      addressSearch(
        address: string,
        callback: (result: any[], status: Status) => void
      ): void;
      coord2Address(
        lng: number,
        lat: number,
        callback: (result: any[], status: Status) => void
      ): void;
    }

    enum Status {
      OK = 'OK',
      ZERO_RESULT = 'ZERO_RESULT',
      ERROR = 'ERROR',
    }
  }

  function load(callback: () => void): void;
}

export {};
