import { gql } from "graphql-tag"

export const QUERY_GET_ALL = gql`
  query {
    places {
      id
      name
      description
      location
      latitude
      longitude
      hours
      locationImage
    }
  }
`

export const QUERY_GET_ONE = (id: number) => {
  return gql`
    query {
      place(getPlaceIdDto: {
        id: ${id}
      }) {
        id
        name
        description
        location
        latitude
        longitude
        hours
        locationImage
      }
    }
  `
}

export const SIGN_IN = (email: string, password: string) => gql`
  mutation {
    login(loginUserInput: {
      username: "${email}",
      password: "${password}",
    }){
      access_token,
      user{
        username,
        role,
        id
      }
    }
  }
`


export const SIGN_UP = ( email: string, password: string) => gql`
  mutation {
    signup(loginUserInput: {
      username: "${email}",
      password: "${password}",
    }){
      username,
      role,
      id
    }
  }
`


type CREATE_PLACE = {
  locationName: string
  location: string
  description: string
  latitude: string
  longitude: string
  openPeriods: string
  images: string
}

export const CREATE_PLACE = ({locationName, location, description, latitude, longitude, openPeriods, images}: CREATE_PLACE) => gql`
  mutation {
    createPlace(createPlaceInput: {
      name: "${locationName}",
      location: "${location}",
      latitude: "${latitude}",
      longitude: "${longitude}",
      description: "${description}",
      hours: "${openPeriods}",
      locationImage: "${images}"
    }) {
      id
      name
      description
      location
      latitude
      longitude
      hours
      locationImage
    }
  }
`