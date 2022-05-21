export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((product:Item) => {
        if(product.name.includes("Sulfuras") && product.quality==80) return;
        //update sellIn
        product.sellIn--;

        //update quality
        if(product.name.includes("Aged Brie") || product.name.includes("Backstage passes")){
          //increseaing quality
          if(product.name.includes("Backstage passes")){
            // case Backstage passes
            if(product.sellIn <0){
              //after stage case
              product.quality=0;
              return;
            }
            if(product.sellIn <=5) product.quality+=3;
            else if(product.sellIn<=10) product.quality+=2;
            else product.quality++

          }else{
            //case Aged Brie
            product.quality++
             
          }

          //product different than Sulfuras never more than 50 as quality
          if(product.quality >50) product.quality=50;
        }
        else{
          // decreases speed depends on sellin
          const decreasesSpeed = (product.sellIn <0 ? 2:1) * (product.name.includes("Conjured") ? 2 :1);
          product.quality = product.quality -1*decreasesSpeed
        }


    });

    return this.items;
  }
}
