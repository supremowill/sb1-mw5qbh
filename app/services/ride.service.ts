import { Observable } from '@nativescript/core';
import { Ride, Location } from '../models/ride.model';

export class RideService extends Observable {
  private static instance: RideService;
  private currentRide: Ride | null = null;

  static getInstance(): RideService {
    if (!RideService.instance) {
      RideService.instance = new RideService();
    }
    return RideService.instance;
  }

  async requestRide(pickup: Location, destination: Location): Promise<Ride> {
    try {
      // Implement actual API call here
      const response = await fetch('https://api.yourserver.com/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pickup, destination }),
      });

      if (!response.ok) {
        throw new Error('Failed to request ride');
      }

      const ride = await response.json();
      this.currentRide = ride;
      return ride;
    } catch (error) {
      console.error('Ride request error:', error);
      throw error;
    }
  }

  async acceptRide(rideId: string): Promise<Ride> {
    try {
      const response = await fetch(`https://api.yourserver.com/rides/${rideId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to accept ride');
      }

      const ride = await response.json();
      this.currentRide = ride;
      return ride;
    } catch (error) {
      console.error('Accept ride error:', error);
      throw error;
    }
  }

  async startRide(rideId: string): Promise<Ride> {
    try {
      const response = await fetch(`https://api.yourserver.com/rides/${rideId}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start ride');
      }

      const ride = await response.json();
      this.currentRide = ride;
      return ride;
    } catch (error) {
      console.error('Start ride error:', error);
      throw error;
    }
  }

  async completeRide(rideId: string): Promise<Ride> {
    try {
      const response = await fetch(`https://api.yourserver.com/rides/${rideId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to complete ride');
      }

      const ride = await response.json();
      this.currentRide = null;
      return ride;
    } catch (error) {
      console.error('Complete ride error:', error);
      throw error;
    }
  }

  async cancelRide(rideId: string, reason: string): Promise<Ride> {
    try {
      const response = await fetch(`https://api.yourserver.com/rides/${rideId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel ride');
      }

      const ride = await response.json();
      this.currentRide = null;
      return ride;
    } catch (error) {
      console.error('Cancel ride error:', error);
      throw error;
    }
  }

  getCurrentRide(): Ride | null {
    return this.currentRide;
  }
}