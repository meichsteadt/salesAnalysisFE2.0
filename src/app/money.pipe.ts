import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(number: any): string {
    var string = (Math.round(number) + "").split('')
    var negative = (string.includes("-") ? true : false)
    if(string.includes("-")) {
      string.shift()
    }
    var newString = "";
    for(var i = string.length - 1; i >= 0 ; i --) {
      if(((string.length - i) % 3 == 0) && (string.length - i + 1 > 0) && string.length > 3 && i !== 0) {
        newString = "," + string[i] + newString
      }
      else {
        newString = string[i] + newString
      }
    }
    if(negative) {
      newString = "-" + newString
    }
    return "$ " + newString
  }

}
