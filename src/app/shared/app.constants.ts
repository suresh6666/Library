/* Application Constants */

// API End points
export class AppUrls {
  public baseUrl = '/';
  // REST End points
  public login = this.baseUrl + 'login';
  public register = this.baseUrl + 'register';
  public confirmEmail = this.baseUrl + 'account/ConfirmEmailAndSetPassword';
  public resetPassword = this.baseUrl + 'reset';
  public sendForgotPasswordMail = this.baseUrl + 'Password/SendForgotPasswordMail';

  public book_details = this.baseUrl + 'assets/db/books.json';
  public books_list = this.baseUrl + 'assets/db/books.json';
  // public getChipDetails = 'http://demo3039112.mockable.io/chipDashboard';
  public categories = this.baseUrl + 'assets/db/categories.json';
  public authors = this.baseUrl + 'authors';
  public users = this.baseUrl + 'users';
  public user_details = this.baseUrl + 'user_details';
}


// Lease rate for the Entire application
export enum Lease {
  percentage = 12
}
