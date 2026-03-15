"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { STORE_LOCATIONS } from "./gta-stores";

type TileStyle = "Atlas" | "Satellite" | "Roadmap";

const defaultTileStyle = (process.env.NEXT_PUBLIC_GTAV_TILE_STYLE as TileStyle | undefined) ?? "Atlas";
const tileSource = process.env.NEXT_PUBLIC_GTAV_TILE_SOURCE ?? "remote";
const customTileBaseUrl = process.env.NEXT_PUBLIC_GTAV_TILE_BASE_URL?.replace(/\/$/, "");

const remoteTileUrls: Record<TileStyle, string> = {
  Atlas: "https://compromit.github.io/gta5-map/assets/map/tiles-atlas/{z}/{x}/{y}.png",
  Satellite: "https://compromit.github.io/gta5-map/assets/map/tiles-satellite/{z}/{x}/{y}.png",
  Roadmap: "https://compromit.github.io/gta5-map/assets/map/tiles-terrain/{z}/{x}/{y}.png",
};

const localTileUrls: Record<TileStyle, string> = {
  Atlas: "/gtav-map/Atlas/{z}_{x}_{y}.jpg",
  Satellite: "/gtav-map/Satellite/{z}_{x}_{y}.jpg",
  Roadmap: "/gtav-map/Roadmap/{z}_{x}_{y}.jpg",
};

const getTileUrl = (tileStyle: TileStyle) => {
  if (customTileBaseUrl) {
    return `${customTileBaseUrl}/${tileStyle}/{z}_{x}_{y}.jpg`;
  }

  if (tileSource === "local") {
    return localTileUrls[tileStyle];
  }

  return remoteTileUrls[tileStyle];
};

const tileAttribution = customTileBaseUrl || tileSource === "local"
  ? "Tiles © Flamm64 GTA-V-World-Map · Leaflet"
  : "Tiles © Compromit GTA V Map · Leaflet";

// GTA in-game (x,y) -> map lat/lng conversion used in classic GTA V web maps.
// This keeps markers aligned with atlas/satellite tile layers that use non-geographic coordinates.
const gtavToMapLatLng = (x: number, y: number): [number, number] => {
  const mx = 0.0503;
  const my = -0.0503;
  const lng = mx * x - 486.97;
  const lat = my * y + 408.9;
  return [lat, lng];
};

const createStoreIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:${active ? 50 : 40}px;height:${active ? 50 : 40}px;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;width:${active ? 34 : 28}px;height:${active ? 34 : 28}px;border-radius:999px;border:2px solid rgba(201,168,76,${active ? 0.95 : 0.55});box-shadow:0 0 ${active ? 26 : 14}px rgba(201,168,76,${active ? 0.75 : 0.38});"></div>
        <div style="
          width:${active ? 20 : 15}px;height:${active ? 20 : 15}px;
          background:linear-gradient(135deg,#C9A84C,#F3D78A);
          border:2px solid rgba(255,255,255,0.75);
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 0 ${active ? 24 : 12}px rgba(201,168,76,${active ? 0.95 : 0.7}),0 0 ${active ? 10 : 5}px rgba(201,168,76,${active ? 0.6 : 0.35});
        "></div>
      </div>`,
    iconSize: active ? [50, 50] : [40, 40],
    iconAnchor: active ? [25, 34] : [20, 28],
    popupAnchor: [0, -30],
  });

function MapStabilizer() {
  const map = useMap();

  useEffect(() => {
    const resize = () => map.invalidateSize({ animate: false });

    const t1 = window.setTimeout(resize, 80);
    const t2 = window.setTimeout(resize, 360);

    window.addEventListener("resize", resize);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", resize);
    };
  }, [map]);

  return null;
}

function MapFocusController({
  activeStoreId,
}: {
  activeStoreId: number | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (activeStoreId == null) return;

    const targetStore = STORE_LOCATIONS.find((store) => store.id === activeStoreId);
    if (!targetStore) return;

    const target = gtavToMapLatLng(targetStore.gtaX, targetStore.gtaY);
    map.flyTo(target, Math.max(map.getZoom(), 4), {
      animate: true,
      duration: 0.8,
    });
  }, [activeStoreId, map]);

  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function GTAVMap({
  activeStoreId = null,
  onStoreSelect,
}: {
  activeStoreId?: number | null;
  onStoreSelect?: (storeId: number) => void;
}) {
  const [tileStyle, setTileStyle] = useState<TileStyle>(defaultTileStyle);
  const [tilesReady, setTilesReady] = useState(false);

  useEffect(() => {
    setTilesReady(false);
  }, [tileStyle]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-[1000] flex gap-2 rounded-full border border-[#C9A84C]/20 bg-[#090909]/85 p-1 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        {(["Atlas", "Satellite", "Roadmap"] as TileStyle[]).map((style) => {
          const active = tileStyle === style;

          return (
            <button
              key={style}
              type="button"
              onClick={() => setTileStyle(style)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
                active
                  ? "bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] text-[#14120f] shadow-[0_0_18px_rgba(201,168,76,0.25)]"
                  : "text-[#E9D7AF]/65 hover:text-[#C9A84C]"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {style}
            </button>
          );
        })}
      </div>

      <MapContainer
        key={tileStyle}
        center={[0, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={7}
        style={{ width: "100%", height: "100%", background: "#0d0d0d" }}
        zoomControl
        attributionControl
      >
        <MapStabilizer />
        <MapFocusController activeStoreId={activeStoreId} />

        {/*
          Tile source priority:
          1) NEXT_PUBLIC_GTAV_TILE_BASE_URL/<Style>/{z}_{x}_{y}.jpg
          2) local public/gtav-map/<Style>/{z}_{x}_{y}.jpg when NEXT_PUBLIC_GTAV_TILE_SOURCE=local
          3) verified remote GTA V tile source fallback
        */}
        <TileLayer
          url={getTileUrl(tileStyle)}
          tileSize={256}
          minZoom={2}
          maxZoom={7}
          attribution={tileAttribution}
          noWrap
          keepBuffer={4}
          updateWhenIdle={false}
          eventHandlers={{
            loading: () => setTilesReady(false),
            load: () => setTilesReady(true),
          }}
        />

        {STORE_LOCATIONS.map((store) => (
          <Marker
            key={store.id}
            position={gtavToMapLatLng(store.gtaX, store.gtaY)}
            icon={createStoreIcon(activeStoreId === store.id)}
            eventHandlers={{
              click: () => onStoreSelect?.(store.id),
            }}
          >
            <Popup
              className="aurum-popup"
              maxWidth={220}
              minWidth={180}
            >
              <div style={{ padding: "6px 4px" }}>
                <p
                  style={{
                    color: "#B8902A",
                    fontSize: "8.5px",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                    fontWeight: 500,
                  }}
                >
                  Sede Aurum · Los Santos
                </p>
                <p
                  style={{
                    color: "#111",
                    fontSize: "14px",
                    fontWeight: 700,
                    marginBottom: "3px",
                    letterSpacing: "0.04em",
                  }}
                >
                  {store.name}
                </p>
                <p
                  style={{
                    color: "#888",
                    fontSize: "10.5px",
                    marginBottom: "8px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {store.address}
                </p>
                <div
                  style={{
                    height: "1px",
                    background: "linear-gradient(to right, #C9A84C, transparent)",
                    marginBottom: "8px",
                  }}
                />
                <p
                  style={{
                    color: "#444",
                    fontSize: "11px",
                    lineHeight: 1.6,
                  }}
                >
                  {store.description}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {!tilesReady && (
        <div className="absolute inset-0 z-[950] flex items-center justify-center bg-[#050505]/86 backdrop-blur-[1px] pointer-events-none">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="text-[#C9A84C]/65 text-[9px] tracking-[0.38em] uppercase"
            >
              Cargando mapa de Los Santos...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
