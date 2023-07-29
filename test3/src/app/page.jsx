"use client";

import moment from 'moment';
import { useEffect, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
import CardWeather from "./component/cardWeather";
import { useApiClient } from "./hooks/api";

export default function Home() {
    const [location, setLocation] = useState({
        lat: '',
        lon: ''
    })
    const [scale, setScale] = useState('F')
    const [weather, setWeather] = useState([])
    const [load, setLoad] = useState(false)
    const apiClient = useApiClient()

    const changeScale = () => {
        scale == 'F' ? setScale('C') : setScale('F')
    }

    const getWeather = async (locationTemp) => {
        const lat = location.lat ? location.lat : locationTemp.lat
        const lon = location.lon ? location.lon : locationTemp.lon
        const params = {
            key: 'db24a878a42845929ec11513232907',
            q: `${lat},${lon}`,
            days: 5,
            hour: moment().format('H.mm')
        }
        try {
            const response = await apiClient.get('forecast.json', { params: params })
            const temp = response.data.forecast.forecastday.map(item => {
                return {
                    day: moment(item.date).format('dddd'),
                    temp_c: item.hour[0].temp_c,
                    temp_f: item.hour[0].temp_f,
                    text: item.hour[0].condition.text,
                    icon: item.hour[0].condition.icon
                }
            })
            setLoad(true)
            setWeather(temp)
        } catch (error) {
            alert('Error when searching for weather')
        }
    }
    const successLocation = (position) => {
        const locationTemp = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
        setLocation(locationTemp)

        getWeather(locationTemp)
    }

    const errorLocation = (err) => {
        alert('Error getting your location')
    }
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => successLocation(position), (err) => errorLocation(err));
    }, [])

    return <>
        {load && <>
            <div className="w-full h-full flex flex-col px-4 py-3 lg:items-center">
                <div className="flex font-semibold items-center lg:w-2/4">
                    <div className="flex-1 text-lg cursor-pointer lg:hidden" onClick={() => getWeather(location)}>
                        <VscDebugRestart />
                    </div>
                    <div className="flex-1 text-lg text-center lg:hidden">{moment().format('LT')}</div>
                    <div className="flex-1 text-lg text-right cursor-pointer lg:text-center lg:text-2xl" onClick={() => changeScale()}>°{scale == 'F' ? 'C' : 'F'}</div>
                </div>
                <div className='flex flex-col w-full lg:items-center lg:justify-center lg:space-x-8 lg:flex-row' >
                    <div className="flex flex-col mt-11 py-4 bg-gray-100 border-2 shadow-xl rounded-2xl lg:w-1/2 lg:h-full lg:mt-15 xl:w-1/3 2xl:w-1/4">
                        <CardWeather scale={scale} weather={weather[0]} main={true} hour={moment().format('LT')} refresh={() => getWeather(location)} />
                    </div>
                    <div className="flex flex-row mt-8 lg:w-1/2 lg:flex-wrap xl:w-1/3 2xl:w-1/4">
                        {weather.map((w, idx) => {
                            if (idx == 0) {
                                return <></>
                            }
                            let last = idx == 4 ? true : false
                            return <CardWeather scale={scale} weather={w} main={false} last={last} />
                        })}
                    </div>
                </div>
            </div>
        </>
        }
    </>
}