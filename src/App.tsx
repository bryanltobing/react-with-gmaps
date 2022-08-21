import { useEffect, useState } from 'react'
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const getCurrentPosition = (): Promise<GeolocationPosition> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })

const Map = () => {
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: -6.2,
    lng: 106.816666,
  })

  useEffect(() => {
    getCurrentPosition().then(({ coords }) => {
      setCenter({ lat: coords.latitude, lng: coords.longitude })
    })
  }, [])

  return (
    <>
      <GoogleMap zoom={10} center={center} mapContainerStyle={{ width: '100%', height: '100%' }}>
        <Marker position={center} />
      </GoogleMap>
    </>
  )
}

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
  })

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '16px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ height: '50%' }}>
        <Map />
      </div>
      <div style={{ height: '50%' }}>
        <Map />
      </div>
    </div>
  )
}

export default App
