export interface Product {
  _id?: string;
  name: string;
  description: string;
  dateOfPosting?: Date;
  category: Category;
  status: Status;
  price: number;
  idUser?: string;
  image: string;
  statusProduct?: StatusProduct;
}

export enum Category {
  // Vehículos
  CarsAndMotorcycles = 'Cars and Motorcycles',
  EngineAndAccessories = 'Engine and Accessories',

  // Moda
  Fashion = 'Fashion',
  FashionAccessories = 'Fashion Accessories',

  // Inmobiliaria
  RealEstate = 'Real Estate',

  // Electrónica
  TVAudioAndPhoto = 'TV, Audio and Photo',
  MobilePhonesAndTelephony = 'Mobile Phones and Telephony',
  ComputersAndElectronics = 'Computers and Electronics',

  // Deportes y ocio
  SportsAndLeisure = 'Sports and Leisure',
  Bikes = 'Bikes',
  ConsolesAndVideoGames = 'Consoles and Video Games',

  // Hogar
  HomeAndGarden = 'Home and Garden',
  Appliances = 'Appliances',

  // Entretenimiento
  Cinema = 'Cinema',

  Books = 'Books',

  Music = 'Music',

  // Otros
  ChildrenAndBabies = 'Children and Babies',
  Collecting = 'Collecting',
  ConstructionAndRenovation = 'Construction and Renovation',
  IndustryAndAgriculture = 'Industry and Agriculture',
  Employment = 'Employment',
  Services = 'Services',
  Others = 'Others',
}

// Status of the product condition
export enum Status {
  New = 'New',
  LikeNew = 'Like New',
  Good = 'Good',
  Acceptable = 'Acceptable',
  Used = 'Used',
  Worn = 'Worn',
}

// Status of the product availability
export enum StatusProduct {
  Available = 'Available',
  Sold = 'Sold',
  Reserved = 'Reserved',
  Canceled = 'Canceled',
}
