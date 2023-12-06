import { Fight } from "./fight"
import { Record } from "./record"

export interface Athlete {
    email: string,
    password: string,
    name: string,
    surname: string,
    gender: string,
    style: string,
    weight: number,
    record: Record[],
    comingFights: string[]
}
