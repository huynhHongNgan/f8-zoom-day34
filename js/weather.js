const { useState } = React;

function WeatherApp() {
    const initialWeatherData = {
        "hanoi": { city: "Hà Nội", temp: 28, weather: "Nắng", humidity: 65 },
        "hcm": { city: "TP.HCM", temp: 32, weather: "Có mây", humidity: 78 },
        "danang": { city: "Đà Nẵng", temp: 30, weather: "Mưa nhẹ", humidity: 82 }
    };

    const [weatherData, setWeatherData] = useState(initialWeatherData);
    const [selectedCity, setSelectedCity] = useState("hanoi");
    const [isRefreshing, setIsRefreshing] = useState(false);

    const weatherIcons = {
        "Nắng": "☀️",
        "Có mây": "🌤️",
        "Mưa nhẹ": "🌧️",
        "Mưa": "🌦️",
        "Nhiều mây": "☁️"
    };

    const getWeatherClass = (weather) => {
        if (weather === "Nắng") return "sunny";
        if (weather === "Mưa nhẹ" || weather === "Mưa") return "rainy";
        return "cloudy";
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        setWeatherData(prevData => {
            const newData = { ...prevData };
            Object.keys(newData).forEach(cityKey => {
                const currentData = newData[cityKey];

                // Random temperature change ±5 degrees
                const tempChange = (Math.random() - 0.5) * 10; // -5 to +5
                newData[cityKey].temp = Math.round(Math.max(15, Math.min(40, currentData.temp + tempChange)));

                // Random humidity change ±5%
                const humidityChange = (Math.random() - 0.5) * 10; // -5 to +5
                newData[cityKey].humidity = Math.round(Math.max(30, Math.min(95, currentData.humidity + humidityChange)));

                // Randomly change weather (30% chance)
                if (Math.random() < 0.3) {
                    const weatherOptions = ["Nắng", "Có mây", "Mưa nhẹ", "Nhiều mây"];
                    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
                    newData[cityKey].weather = randomWeather;
                }
            });

            return newData;
        });

        setIsRefreshing(false);
    };

    const currentWeather = weatherData[selectedCity];

    return (
        <div className="weather-app">
            <h1 className="app-title">
                Weather App
            </h1>

            <div className="city-selector">
                <label className="selector-label">Chọn thành phố:</label>
                <select
                    className="city-select"
                    value={selectedCity}
                    onChange={handleCityChange}
                >
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
                </select>
            </div>

            <div className={`weather-card ${getWeatherClass(currentWeather.weather)}`}>
                <h2 className="city-name">{currentWeather.city}</h2>

                <div className="weather-main">
                    <div className="weather-icon">
                        {weatherIcons[currentWeather.weather] || "🌤️"}
                    </div>
                    <div className="temperature">
                        {currentWeather.temp}°C
                    </div>
                </div>

                <div className="weather-status">
                    {currentWeather.weather}
                </div>

                <div className="weather-details">
                    <div className="detail-item">
                        <span className="detail-label">
                            Nhiệt độ
                        </span>
                        <span className="detail-value">
                            {currentWeather.temp}°C
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">
                            Độ ẩm
                        </span>
                        <span className="detail-value">
                            {currentWeather.humidity}%
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">
                            Tình trạng
                        </span>
                        <span className="detail-value">
                            {currentWeather.weather}
                        </span>
                    </div>
                </div>
            </div>

            <button
                className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
                onClick={handleRefresh}
                disabled={isRefreshing}
            >
                <span className="refresh-icon"></span>
                {isRefreshing ? 'Đang làm mới...' : 'Làm mới'}
            </button>
        </div>
    );
}

ReactDOM.render(<WeatherApp />, document.getElementById('root'));