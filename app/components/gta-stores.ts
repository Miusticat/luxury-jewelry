// Shared GTA V store location data — no browser dependencies
// Coordinates are in GTA V world space: X = east/west, Y = north/south
// Leaflet latLng maps as: latLng(Y, X)

export interface GTAStore {
  id: number;
  name: string;
  fullName: string;
  address: string;
  description: string;
  /** GTA in-game world coordinates */
  gtaX: number;
  gtaY: number;
}

export const STORE_LOCATIONS: GTAStore[] = [
  {
    id: 1,
    name: "ROCKFORD HILLS",
    fullName: "AURUM — ROCKFORD HILLS",
    address: "7021 Portola Drive, Los Santos, SA 90035",
    description:
      "Nuestra sede principal ubicada en el exclusivo distrito de Rockford Hills, donde atendemos citas privadas y pedidos personalizados de joyeria de alta gama.",
    // Portola Drive, Rockford Hills (aprox)
    gtaX: 8996.36,
    gtaY: 9271.74,
  },
  {
    id: 2,
    name: "DIAMOND CASINO",
    fullName: "AURUM — DIAMOND CASINO",
    address: "2972 Vinewood Boulevard, Los Santos, SA 90899",
    description:
      "Boutique ubicada cerca del Diamond Casino & Resort, disenada para clientes VIP y compradores exclusivos de Los Santos.",
    // Diamond Casino & Resort area (aprox)
    gtaX: 9910.65,
    gtaY: 9165.94,
  },
];
