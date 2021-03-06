/* Application Constants */

// API End points
export class AppUrls {
  public staticPath = 'http://ec2-18-220-81-9.us-east-2.compute.amazonaws.com:8090/';
  public baseUrl = 'http://ec2-18-220-81-9.us-east-2.compute.amazonaws.com:8090/api/1.0/';
  // REST End points
  public login = this.baseUrl + 'auth/login';
  public register = this.baseUrl + 'auth/signup';
  public me = this.baseUrl + 'auth/me';
  public emailActivation = this.baseUrl + 'auth/email-activation';
  public change_password = this.baseUrl + 'auth/change-password';
  public sendForgotPasswordLink = this.baseUrl + 'auth/send-forgot-password-link';
  public logout = this.baseUrl + 'auth/logout';

  public book_details = this.baseUrl + 'books?where=';
  public search_books = this.baseUrl + 'books';
  public books_list = this.baseUrl + 'books';
  // public getChipDetails = 'http://demo3039112.mockable.io/chipDashboard';
  public categories = this.baseUrl + 'categories';
  public authors = this.baseUrl + 'authors';
  public users = this.baseUrl + 'persons';
  public payments = this.baseUrl + 'payments';
  public orders = this.baseUrl + 'orders';
  public membership = this.baseUrl + 'membership';
  public cart = this.baseUrl + 'cart';
  public wallet = this.baseUrl + 'wallet';
  public transactions = this.baseUrl + 'transactions';
  /*
  * ------------- Parse Queries
  * */
  /*public transactions = 'http://localhost:1337/parse/classes/wallet';
  public transactions = 'http://localhost:1337/parse/classes/transactions';*/
}


// Lease rate for the Entire application
export class AppConstants {
  public lease_rate = 12.00;
  public del_charges = 40.00;
  public one_time_reg_fee = 400.00;
  public one_time_security_deposit = 400.00;
}
