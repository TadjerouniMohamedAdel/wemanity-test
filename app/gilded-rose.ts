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
        if(product.name==="Sulfuras" && product.quality==80) return;
        //update sellIn
        product.sellIn--;

        //update quality
        if(product.name==="Aged Brie" || product.name==="Backstage passes"){
          //increseaing quality
        }
        else{
          //degrade quality
        }


    });

    return this.items;
  }
}
