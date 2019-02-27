import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse"
})
export class ReversePipe implements PipeTransform {
  transform(value: any, param = "a") {
    if (value) {
      let item;
      value.reverse();
      let result = value.slice();

      if (param === "a") {
        item = value.slice(0, 3);
        return item;
      } else {
        return result.reverse();
      }

    }
  }
}
