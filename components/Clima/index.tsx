import style from './Clima.module.css';
import { useState } from "react";
import axios from 'axios';
const key = '8415e5281cbcc981e1a003b3f9ddb002';
import Image from 'next/image';
import loupe from '../../src/icons/loupe.png';
import sun from '../../src/images/sun.png';
import wind from '../../src/icons/wind_2.png';
import press from '../../src/icons/barometer.png';
import hum from '../../src/icons/humidity.png';

export const Clima = () => {
    const [cidade, setCidade] = useState('');
    const [cityName, setCityName] = useState('Cidade');
    const [country, setCountry] = useState('País');
    const [temp, setTemp] = useState(0);
    const [pressure, setPressure] = useState(0);
    const [speedWind, setSpeedWind] = useState(0);
    const [humidity, setHumidity] = useState(0);


    const handleInputCidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCidade(event.target.value);
    }

    const getClima = async () => {

        if (cidade) {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${key}`);

            if (response.data) {
                setCityName(response.data.name);
                setCountry(response.data.sys.country);
                setTemp(parseInt(response.data.main.temp));
                setSpeedWind(parseInt(response.data.wind.speed));
                setPressure(response.data.main.pressure);
                setHumidity(response.data.main.humidity);
            }
        }else{
            alert("Informe o nome da cidade");
        }

    }
    return (
        <>
            <div className={style.container}>
                <div className={style.search}>

                    <input type="text" className={style.search_input} onChange={handleInputCidade} value={cidade} placeholder='Digite aqui a sua cidade, se internacional digite em inglês' />
                    <button type='submit' onClick={getClima}><Image src={loupe} alt='Icone de uma lupa' /></button>

                </div>
                <div className={style.stage}>
                    <div className={style.stage_int_1}>
                        <div className={style.city}>{cityName}</div>
                        <div className={style.weather}>
                            <Image src={sun} alt='Icone do tempo' />
                            <span className={style.tempeture}>{temp} ° Graus</span>
                        </div>
                    </div>
                    <div className={style.stage_int_2}>
                        <div className={style.country}><h1>{country}</h1></div>
                        <div className={style.speed_wind}><Image src={wind} className={style.stage_2_icons} alt='Icone de velocidade do vento' />{speedWind} km/h - Velocidade do Vento</div>
                        <div className={style.pressure}><Image src={press} className={style.stage_2_icons} alt='Icone de pressão do ar' />{pressure} - Pressão do ar</div>
                        <div className={style.humidity_air}><Image src={hum} className={style.stage_2_icons} alt='Icone de humidade do ar' />{humidity}% - Humidade do ar</div>
                    </div>
                </div>
            </div>
        </>
    )
}