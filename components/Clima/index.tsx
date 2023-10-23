import style from './Clima.module.css';
import { useEffect, useState } from "react";
const key = '8415e5281cbcc981e1a003b3f9ddb002';
import { GeoDados } from '../../types/GeoDados';
import Image from 'next/image';
import loupe from '../../src/icons/loupe.png';


export const Clima = () => {
    const [geoDados, setGeoDados] = useState<GeoDados[]>([]);
    const [loading, setLoading] = useState(false);

    const baseApi = `http://api.openweathermap.org/geo/1.0/direct?q=Curitiba&limit=1&appid=${key}`;

    useEffect(() => {
    }, [])

    const loadDados = async () => {
        setLoading(true);
        const res = await fetch(baseApi);
        const geo: GeoDados[] = await res.json();
        setGeoDados(geo);
        setLoading(false);
    }




    return (

        <>
            <div className={style.container}>
                <div className={style.search}>
                    <Image src={loupe} alt='Lupa'/>
                    <input type="text" className={style.search_input} placeholder='Digite aqui a sua cidade'/>
                </div>
                <div className={style.stage}>
                    <div className={style.stage_int_1}>
                        <div className={style.city}></div>
                        <div className={style.weather}></div>
                    </div>
                    <div className={style.stage_int_2}>
                        <div className={style.country}></div>
                        <div className={style.speed_wind}></div>
                        <div className={style.pressure}></div>
                        <div className={style.humidity_air}></div>
                    </div>
                </div>
            </div>
        </>
    )
}