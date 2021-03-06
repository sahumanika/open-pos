import { Pipe, PipeTransform } from '@angular/core';
import {Product, Tag, Brand, Salt} from "../services/items.service";
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: Product[], args?: string): any {
    if (args) {
      let re = new RegExp(args.toLowerCase());
      return value.filter((val) => {
        if (val.name.toLowerCase().match(re)){
            return val
          }
      });
    }
    return value
  }

}

@Pipe({
  name: 'productTag'
})
export class ProductTagPipe implements PipeTransform {

  transform(value: Product[], args?: Tag[]): any {
    if (args && value && args.length) {

      return value.filter((val) => {
        let flag = true;
        for (let tag in args) {
          if (val.tags.findIndex((t)=>{return t.id == args[tag].id})>-1){
            flag = false;
            break;
          }
        }
        if (!flag) {
          return val;
        }

      });
    }
    return value
  }

}

@Pipe({
  name: 'productSalt'
})
export class ProductSaltPipe implements PipeTransform {

  transform(value: Product[], args?: Salt[]): any {
    if (args && value && args.length) {
      return value.filter((val) => {
        let flag = true;
        for (let salt in args) {
          if (val.salts.indexOf(args[salt])<0){
            flag = false;
            return false
          }
        }
        if (flag) {
          return val;
        }
      });
    }
    return value
  }

}

@Pipe({
  name: 'productBrand'
})
export class ProductBrandPipe implements PipeTransform {

  transform(value: Product[], args?: string[]): any {
    if (args && value && args.length) {
      return value.filter((val) => {

        if (args.indexOf(val.brand_id) > -1){
          return val
        }
      });
    }
    return value
  }

}


@Pipe({
  name: 'productDistributor'
})
export class ProductDistributorPipe implements PipeTransform {

  transform(value: Product[], args?: string[]): any {
    // if (args && value && args.length) {
    //   return value.map((val) => {
    //
    //   });
    // }

    return value
  }

}

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value:{}, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

@Pipe({
  name: 'truncate'
})

export class TruncatePipe implements PipeTransform{
  transform(value: string, arg1: number, arg2?: boolean) : string {
    let limit = arg1 || 10;
    let trail = '';
    if (arg2) {
      trail = '...';
    }
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

@Pipe({
  name:'filter',
  pure:false
})
export class SearchPipe implements PipeTransform {

  transform(items :any ,term :any): any {
    if(term === undefined || term === null) return items;

    return items.filter( function(item){
      return item.name.toLowerCase().includes(term.toLowerCase());
    })
  }
}



@Pipe({name: 'safeHtml'})
export class SafeHtml implements PipeTransform{
  constructor(private sanitizer:DomSanitizer){}
  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
