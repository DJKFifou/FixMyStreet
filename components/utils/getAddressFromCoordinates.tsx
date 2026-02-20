export default async function getAddressFromCoordinates(
  lat: number,
  lon: number,
  successCallback: (address: string) => void,
  errorCallback: (error: string) => void,
) {
  try {
    const url = new URL("https://data.geopf.fr/geocodage/reverse");
    url.searchParams.set("lat", lat.toString());
    url.searchParams.set("lon", lon.toString());
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur réseau");
    const data = await response.json();
    return successCallback(
      data.features[0]?.properties.label || "Adresse inconnue",
    );
  } catch {
    errorCallback("Impossible de récupérer l'adresse.");
  }
}
