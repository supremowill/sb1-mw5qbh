export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'STARTED' | 'COMPLETED' | 'CANCELLED';
  pickup: Location;
  destination: Location;
  price: number;
  distance: number;
  duration: number;
  createdAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  rating?: number;
  feedback?: string;
}