import { Observable, Accuracy } from '@nativescript/core';
import * as geolocation from '@nativescript/geolocation';

export class LocationService extends Observable {
  private static instance: LocationService;
  private watchId: number | null = null;

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const hasPermission = await geolocation.enableLocationRequest(true);
      return hasPermission;
    } catch (error) {
      console.error('Location permission error:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<geolocation.Location> {
    try {
      const location = await geolocation.getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 20000
      });
      return location;
    } catch (error) {
      console.error('Get location error:', error);
      throw error;
    }
  }

  startLocationWatch(callback: (location: geolocation.Location) => void): void {
    this.watchId = geolocation.watchLocation(
      (location) => {
        callback(location);
      },
      (error) => {
        console.error('Location watch error:', error);
      },
      {
        desiredAccuracy: Accuracy.high,
        updateDistance: 10,
        minimumUpdateTime: 1000
      }
    );
  }

  stopLocationWatch(): void {
    if (this.watchId !== null) {
      geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}