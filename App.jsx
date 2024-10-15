import React, { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState({ photos: [] });
    const [currentPhoto, setCurrentPhoto] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=hI2QC1tagJUPTryz2SKKTagayEYy6eIt5fCod0rm'); // replace with your API URL
            const result = await response.json();
            setData(result);

            // RANDOMIZATION !
            if (result.photos.length > 0) {
                const randomIndex = Math.floor(Math.random() * result.photos.length);
                setCurrentPhoto(result.photos[randomIndex]);
            } else {
                setCurrentPhoto(null); // No photos 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Mars Photos</h1>
            <button onClick={fetchData}>Fetch New Photo</button>

            {/* dis Checks if currentPhoto is available :) */}
            {currentPhoto && (
                <div>
                    <img className="marsImage" src={currentPhoto.img_src}  />
                    <p>
                        <strong>Date:</strong> {currentPhoto.earth_date}
                    </p>
                    <p>
                        <strong>Camera:</strong> {currentPhoto.camera.full_name}
                    </p>
                    <p>
                        <strong>Rover:</strong> {currentPhoto.rover.name}
                    </p>
                </div>
            )}

            {/* dis handles case of there being no photos */}
            {currentPhoto === null && <p>No photos available.</p>}
        </div>
    );
};

export default App;
