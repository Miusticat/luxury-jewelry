export type MetalType = "18K Rose Gold" | "18K Yellow Gold" | "18K White Gold" | "Platinum";

export interface RingConfiguration {
  metal: MetalType;
  engraving: string;
}

export const metalOptions: MetalType[] = [
  "18K Rose Gold",
  "18K Yellow Gold",
  "18K White Gold",
  "Platinum",
];

export const defaultRingConfiguration: RingConfiguration = {
  metal: "18K Rose Gold",
  engraving: "LUMIERE",
};
