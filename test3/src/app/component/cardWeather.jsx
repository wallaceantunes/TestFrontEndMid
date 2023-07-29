import { VscDebugRestart } from "react-icons/vsc";

export default function CardWeather({scale, weather, main, last, hour, refresh}) {
    return (
        <div className={`flex-1 flex-col items-center space-y-4 ${last ? 'hidden' : 'flex'} ${!main ? 'lg:basis-1/3 lg:m-4 lg:p-8 lg:border-2 lg:rounded-xl' : '' } lg:flex`}>
            <div className={`${main ? 'flex' : 'hidden lg:flex'} flex-1 text-xl text-center`}>{weather.text}</div>
            <div className="flex-1 text-center">
                <img
                    src={weather.icon}
                    alt=""
                    width={!main ? 60 : 100}
                    height={!main ? 60 : 100}
                    className="rounded-full"
                />
            </div>
            <div className={`flex-1 ${!main ? 'text-lg' : 'text-4xl'} text-center font-medium`}>{scale == 'F' ? `${weather.temp_f} °F` : `${weather.temp_c} °C`}</div>
            <div className={`flex-1 ${!main ? 'text-lg' : 'text-2xl'} text-center font-medium`}>{weather.day}</div>
            <div className={`flex-1 hidden ${main ? 'lg:flex' : ''} text-lg text-center font-medium`}>{hour}</div>
            <div className={`flex-1 hidden cursor-pointer ${main ? 'lg:flex lg:2xl' : ''} text-lg`} onClick={refresh}>
                <VscDebugRestart />
            </div>
        </div>
    )
}