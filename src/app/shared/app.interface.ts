export interface Book {
  'book_id': string,
  'title': string,
  'book_summary': string,
  'author': string,
  'lease_price': string,
  'availability': boolean,
  'delivery_time': string,
  'book_image': string,
  'material_group': string,
  'language': string,
  'publisher': string,
  'year': string,
  'ISBN': string,
  'IBCN': string,
  'book_author_desc': string
}

export interface Category {
  category_id: string,
  category_name: string
}

export interface Author {
  author_id: string
}

export interface User {
  'user_id': string,
  'user_name': string,
  'isActive': boolean,
  'picture': string,
  'age': number,
  'first_name': string,
  'last_name': string,
  'gender': string,
  'company': string,
  'email': string,
  'phone': string,
  'address': string,
  'about': string,
  'shipping_address': Array<any>
}

