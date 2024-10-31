import { Observable } from '@nativescript/core';
import { AuthService } from '../../services/auth.service';
import { navigate } from '@nativescript/core/ui/frame';

export class LoginViewModel extends Observable {
  private authService: AuthService;
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor() {
    super();
    this.authService = AuthService.getInstance();
  }

  async onLogin() {
    if (!this.email || !this.password) {
      // Show error message
      return;
    }

    try {
      this.set('isLoading', true);
      const user = await this.authService.login(this.email, this.password);
      
      // Navigate based on user role
      if (user.role === 'DRIVER') {
        navigate({ moduleName: 'views/driver/driver-home-page' });
      } else {
        navigate({ moduleName: 'views/passenger/passenger-home-page' });
      }
    } catch (error) {
      console.error('Login error:', error);
      // Show error message to user
    } finally {
      this.set('isLoading', false);
    }
  }

  onRegister() {
    navigate({ moduleName: 'views/register/register-page' });
  }
}