export interface Imedia {
    id: string;
    url: string;
    type: string;
    title: string;
    author_name: string;
    dateCreation: Date;
    width?: number;
    height?: number;
    duration?: number;
    thumbnail_url? : string
}

export class Media implements Imedia {
    id: string;
    url: string;
    type: string;
    title: string;
    author_name: string;
    dateCreation: Date;
    width?: number;
    height?: number;
    duration?: number;
    thumbnail_url? : string

    constructor(id: string, url: string, type: string, title: string, author_name: string, dateCreation: Date, width?: number, height?: number, duration?: number, thumbnail_url? : string) {
        this.id = id;
        this.url = url;
        this.type = type;
        this.title = title;
        this.author_name = author_name;
        this.dateCreation = dateCreation;
        this.width = width;
        this.height = height;
        this.duration = duration;
        this.thumbnail_url = thumbnail_url
    }
}

