import { Location } from "./event-location";

export interface FightEvent {
    id: string;
    name: string;
    organizer: string;
    date: Date;
    photo: string;
    category: string;
    location: Location;
    active: boolean;
}
