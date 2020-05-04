import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentRelativePipe',
})
export class MomentRelativePipe implements PipeTransform {

  constructor() {
  }

  public transform(value: Date | string) {
    if (!value) {
      return 'unknown time...';
    }

    const momentRelative = moment(value).fromNow();
    return `${momentRelative}`;
  }

}
