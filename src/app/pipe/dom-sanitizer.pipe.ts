import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domSanitizer',
  standalone: true
})
export class DomSanitizerPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

}
