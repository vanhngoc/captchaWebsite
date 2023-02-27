import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descending',
})
export class DescendingPipe implements PipeTransform {
  transform(value: any[], property: string): any[] {
    if (!property) {
      return value;
    }

    return value.sort((a, b) => {
      if (a[property] < b[property]) {
        return 1;
      }
      if (a[property] > b[property]) {
        return -1;
      }
      return 0;
    });
  }
}
