import { Guest } from "./guest.interface";

export interface GuestList {
    date: string;
    breakfast: Guest[];
    lunch: Guest[];
    dinner: Guest[];
    isAnyoneFoodSensitive: boolean;
}