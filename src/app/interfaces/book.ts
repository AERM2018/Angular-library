import { Author } from "./author";

export interface Book {
    id:number,
    title:string,
    numPages:number,
    description:string,
    ISBN:string,
    cover:string,
    author:Author,
}
