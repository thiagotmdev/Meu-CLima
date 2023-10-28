import style from './Clima.module.css';
import { useState } from "react";
import React, { KeyboardEvent } from 'react';
import axios from 'axios';
import Image from 'next/image';
import loupe from '../../src/icons/loupe.png';
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
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState(0);


    const handleInputCidade = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCidade(event.target.value);

    }

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            getClima();
        }
    }


    const getClima = async () => {

        try {
            if (cidade) {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${process.env.customKey}`);

                if (response.data) {
                    setCityName(response.data.name);
                    setCountry(response.data.sys.country);
                    setTemp(parseInt(response.data.main.temp));
                    setSpeedWind(parseInt(response.data.wind.speed));
                    setPressure(response.data.main.pressure);
                    setHumidity(response.data.main.humidity);
                    setIcon(response.data.weather[0].icon);
                    setDescription(response.data.weather[0].description);

                }
            } else {
                alert("Informe o nome da cidade");
            }
        } catch (error) {
            alert("Ocorreu algum erro!");
            console.log(error);
        }
    }



    return (
        <>
            <div className={style.container}>
                <div className={style.search}>

                    <input type="text" className={style.search_input} id='search_input' onChange={handleInputCidade} onKeyUp={handleKeyUp} value={cidade} placeholder='Digite aqui a sua cidade, se internacional digite em inglês' />
                    <button type='submit' onClick={getClima}><Image src={loupe} alt='Icone de uma lupa' /></button>

                </div>
                <div className={style.stage}>
                    <div className={style.stage_int_1}>
                        <div className={style.city}>{cityName}</div>
                        <div className={style.weather}>
                            <img src={`${!icon ? 'sun.png' : `https://openweathermap.org/img/wn/${icon}.png`}`} width={182} height={182} alt={`Icone de tempo ${description}`} />

                            <div className={style.container_condition}>
                                <span className={style.tempeture}>{temp} ° Graus</span> <br />
                                <span className={style.weather_condition}>{description}</span>
                            </div>
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