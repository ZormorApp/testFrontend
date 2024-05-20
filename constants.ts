export const readQuery = gql`
query getPlaces {
  places {
    name
    description
    latitude
    longitude
    location
    locationImage
    hours
  }
}
`