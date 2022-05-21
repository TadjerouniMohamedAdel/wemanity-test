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
  //this value controll unit of decreases or increase by default i fix it to 1
  static speed:number = 1;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((product:Item) => {
        if(product.name.match(/Sulfuras/i) && product.quality==80) return;
        //update sellIn
        product.sellIn--;

        //update quality
        if(product.name.match(/Aged Brie/i) || product.name.match(/Backstage passes/i)){
          //increseaing quality
          if(product.name.match(/Backstage passes/i) && product.sellIn <=10){
            // case Backstage passes
            if(product.sellIn <0){
              //after stage case
              product.quality=0;
              return;
            }
            if(product.sellIn <=5) product.quality+=(3*GildedRose.speed);
            else  product.quality+=(2*GildedRose.speed);

          }else{
            //case Aged Brie
            product.quality+=(1*GildedRose.speed)
             
          }

          //product different than Sulfuras never more than 50 as quality
          if(product.quality >50) product.quality=50;
        }
        else{
          // decreases speed depends on sellin
          const decreasesSpeed = (product.sellIn <0 ? 2:1) * (product.name.match(/Conjured/i) ? 2 :1);
          product.quality = product.quality -1*decreasesSpeed*GildedRose.speed
        }


    });

    return this.items;
  }
}
