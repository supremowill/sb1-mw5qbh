export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'DRIVER' | 'PASSENGER';
  rating: number;
  profileImage?: string;
  isOnline?: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface Driver extends User {
  role: 'DRIVER';
  vehicle: {
    model: string;
    plate: string;
    color: string;
    year: number;
  };
  documents: {
    license: string;
    insurance: string;
  };
  isAvailable: boolean;
}

export interface Passenger extends User {
  role: 'PASSENGER';
  paymentMethods: Array<{
    id: string;
    type: 'CREDIT_CARD' | 'PIX';
    lastDigits?: string;
  }>;
}