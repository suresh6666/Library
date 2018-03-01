// API End points
export class AppUrls {
  public baseUrl = '/';
  // REST End points
  public login: string = this.baseUrl + 'login';
  public register: string = this.baseUrl + 'register';
  public confirmEmail: string = this.baseUrl + 'account/ConfirmEmailAndSetPassword';
  public resetPassword: string = this.baseUrl + 'reset';
  public sendForgotPasswordMail: string = this.baseUrl + 'Password/SendForgotPasswordMail';

  public book_details: string = this.baseUrl + 'book_details';
  public books_list: string = this.baseUrl + 'books_list';
  // public getChipDetails: string = 'http://demo3039112.mockable.io/chipDashboard';
  public categories: string = this.baseUrl + 'categories';
  public authors: string = this.baseUrl + 'authors';
  public users: string = this.baseUrl + 'users';
  public user_details: string = this.baseUrl + 'user_details';
  /*-------
  * --
  * --
  * */
  public jsonUser = 'https://jsonplaceholder.typicode.com/users/1';
}

// Lease rate for the Entire application
export enum Lease {
  percentage = 12
}
