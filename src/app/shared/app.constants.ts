/* Application Constants */

// API End points
export class AppUrls {
  public baseUrl = 'http://ec2-18-220-81-9.us-east-2.compute.amazonaws.com/api/1.0/';
  // REST End points
  public login = this.baseUrl + 'auth/login';
  public register = this.baseUrl + 'auth/signup';
  public me = this.baseUrl + 'auth/me';
  public confirmEmail = this.baseUrl + 'account/ConfirmEmailAndSetPassword';
  public resetPassword = this.baseUrl + 'reset';
  public sendForgotPasswordLink = this.baseUrl + 'auth/send-forgot-password-link';

  public book_details = this.baseUrl + 'books?where=';
  public books_list = this.baseUrl + 'books';
  // public getChipDetails = 'http://demo3039112.mockable.io/chipDashboard';
  public categories = this.baseUrl + 'categories';
  public authors = this.baseUrl + 'authors';
  public users = this.baseUrl + 'persons';
  public user_details = this.baseUrl + 'user_details';
}


// Lease rate for the Entire application
export class AppConstants {
  public lease_rate = 12.00;
  public del_charges = 40.00;
}
