import { Gps } from "./gps";

export interface Registro{
    ubicaciones: Array<Gps>,
    horasTrabajadas: number;
    vacacionesDisponibles: number;
    vacacionesUsadas: number;
    import?: Array<any>
}