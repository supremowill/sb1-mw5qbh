import { Observable } from '@nativescript/core';
import { LocationService } from '../../services/location.service';
import { RideService } from '../../services/ride.service';
import { Location } from '../../models/ride.model';

export class PassengerHomeViewModel extends Observable {
  private locationService: LocationService;
  private rideService: RideService;
  
  userLocation: Location = { latitude: 0, longitude: 0, address: '' };
  destination: string = '';
  estimatedPrice: string = 'R$ 0,00';
  isRequesting: boolean = false;
  requestButtonText: string = 'Request Ride';

  constructor() {
    super();
    this.locationService = LocationService.getInstance();
    this.rideService = RideService.getInstance();
    this.setupLocation();
  }

  async setupLocation() {
    try {
      const hasPermission = await this.locationService.requestPermissions();
      if (hasPermission) {
        const location = await this.locationService.getCurrentLocation();
        this.updateUserLocation(location);
        
        // Start watching location
        this.locationService.startLocationWatch((location) => {
          this.updateUserLocation(location);
        });
      }
    } catch (error) {
      console.error('Location setup error:', error);
    }
  }

  private updateUserLocation(location: any) {
    this.set('userLocation', {
      latitude: location.latitude,
      longitude: location.longitude,
      address: 'Current Location' // You would typically reverse geocode this
    });
  }

  async onSetDestination() {
    if (!this.destination) return;
    
    try {
      // Here you would typically:
      // 1. Geocode the destination address
      // 2. Calculate route
      // 3. Update estimated price
      this.set('estimatedPrice', 'R$ 25,00'); // Example price
    } catch (error) {
      console.error('Set destination error:', error);
    }
  }

  async onRequestRide() {
    if (this.isRequesting) {
      // Cancel existing request
      const currentRide = this.rideService.getCurrentRide();
      if (currentRide) {
        await this.rideService.cancelRide(currentRide.id, 'User cancelled');
      }
      this.set('isRequesting', false);
      this.set('requestButtonText', 'Request Ride');
      return;
    }

    try {
      const ride = await this.rideService.requestRide(
        this.userLocation,
        {
          latitude: 0, // You would get this from geocoding
          longitude: 0,
          address: this.destination
        }
      );

      this.set('isRequesting', true);
      this.set('requestButtonText', 'Cancel Request');

      // Start monitoring ride status
      // Implement WebSocket or polling here
    } catch (error) {
      console.error('Request ride error:', error);
    }
  }

  onProfile() {
    // Navigate to profile page
  }
}