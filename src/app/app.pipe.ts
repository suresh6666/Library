import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    const myItems = []; let flag: any = 0;
    for (const key in filter['authors']) {
      if (filter['authors'].hasOwnProperty(key)) {
        if (filter['authors'][key] === false && filter['stock']) {
          flag ++;
        }
        items.forEach((item) => {
          if (item['book_authors'].indexOf(key) !== -1 && filter['authors'][key]) {
            if (myItems.indexOf(item) === -1 && item['availability'] === filter['stock']) {
              myItems.push(item);
            }
          }
        });
      }
    }
    return (filter['authors'] !== 'null' && flag === Object.keys(filter['authors']).length) ? items : myItems;
  }
}
