import { UUID } from "crypto";

export type Artist = {
  fname: string; // Required, assuming every artist has a first name
  lname: string; // Required, assuming every artist has a last name
  category?: string; // Optional, can be omitted if not provided
  file?: string; // Optional, can be omitted if not provided
  link?: string; // Optional, can be omitted if not provided
  facebook?: string; // Optional, can be omitted if not provided
  twitter?: string; // Optional, can be omitted if not provided
  insta?: string; // Optional, can be omitted if not provided
  youtube?: string; // Optional, can be omitted if not provided
  // type: "purchase" | "token" | null; // Restricted to specific valid values or null
};

export type Testimonials = {
  name: string;
  file?: string;
  occupation: string;
  message: string;
  rate: number;
};

export type Investors = {
  id: number;
  file: string;
};

export type Actors = {
  id: number;
  fname: string;
  lname: string;
  category?: string;
  file?: string;
};

export type Models = {
  id: UUID;
  fname: string;
  lname: string;
  category?: string;
  file?: string;
};

export type InitialData = {
  id: string;
  file?: string;
  category?: string;
  juniormodel?: string;
  junioractor?: string;
  fname: string;
  lname: string;
  dob?: string;
  email: string;
  mobile: string;
  wmobile?: string;
  show_number?: string;
  father?: string;
  mother?: string;
  password?: string;
  country?: string;
  state?: string;
  city?: string;
  pincode?: string;
  description?: string;
  short_description?: string;
  exp_title?: string;
  experiance?: string;
  weight?: string;
  height?: string;
  bust?: string;
  waist?: string;
  hips?: string;
  skincolor?: string;
  eyecolor?: string;
  haircolor?: string;
  cloth?: string;
  shoes?: string;
  insta?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
  favourite?: number;
  status?: string;
  fashion?: string;
  sport?: string;
  swimwear?: string;
  lingerie?: string;
  promotional?: string;
  dressed?: string;
  magazine?: string;
  ramp?: string;
  others?: string;
  classic?: string;
  method?: string;
  practical?: string;
  theatre?: string;
  meisner?: string;
  strasberg?: string;
  leading?: string;
  token?: string;
  character?: string;
  presentational?: string;
  imag1?: string;
  imag2?: string;
  imag3?: string;
  imag4?: string;
  imag5?: string;
  imag6?: string;
  imag7?: string;
  imag8?: string;
  imag9?: string;
  imag10?: string;
  video1?: string;
  video2?: string;
  video3?: string;
  video4?: string;
  video5?: string;
};

export interface Images {
  id: string;
  artist_id: string;
  images: string;
}

export interface Videos {
  id: string;
  artist_id?: string;
  videos: string;
}

export interface HeaderResponse{
  artist: InitialData;
}

export interface APIResponse {
  status: number;
  message: string;
  data: {
    artist: InitialData;
    images: Images[];
    videos: Videos[];
    country: string;
    state: string;
    city: string;
    validate: string;
  };
}

export interface CountryList {
  status: number;
  message: string;
  data: Country[];
}

export interface Country {
  id: string;
  name: string;
}

export interface StatesList {
  status: number;
  message: string;
  data: States[];
}

export interface States {
  name: string;
  id: string;
}

export interface CityList {
  status: number;
  message: string;
  data: City[];
}

export interface City {
  name: string;
  id: string;
}
