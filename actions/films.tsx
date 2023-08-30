import { Film } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_STRAPI_URL}/films`;

const getFilms = async (): Promise<Film[]> => {
    const res = await fetch(URL);

    return res.json();
};

export default getFilms;