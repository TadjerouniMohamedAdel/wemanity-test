import { Item, GildedRose } from '@/gilded-rose';
type ItemType= {
  name: string;
  sellIn: number;
  quality: number;

}

const createAndUpdateSystem= (days:number):ItemType[]=> {
  const gildedRose = new GildedRose([
    new Item("+5 Dexterity Vest", 10, 20), //
    new Item("Aged Brie", 2, 0), //
    new Item("Elixir of the Mongoose", 5, 7), //
    new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Conjured Mana Cake", 3, 6),
    new Item("Conjured Mana", 3, 10)

  ]);
  let items:ItemType[] = []
  for (let i = 0; i < days; i++) {
     items = gildedRose.updateQuality();
  }
  return items
}


describe('Gilded Rose', () => {
  
  it("testing : Sulfuras never has to be sold or decreases in Quality",()=>{
    const items = createAndUpdateSystem(80)
    expect(items[3].name).toEqual("Sulfuras, Hand of Ragnaros")
    expect(items[3].quality).toEqual(80);
    expect(items[3].sellIn).toEqual(0);
  })

  it("testing ach day our system lowers both values for every item",()=>{
    const items = createAndUpdateSystem(10)
    expect(items[0].name).toEqual("+5 Dexterity Vest")
    expect(items[0].quality).toEqual(10)
    expect(items[0].sellIn).toEqual(0)
  })

  it("testing: Once the sell by date has passed, Quality degrades twice as fast",()=>{
    const items = createAndUpdateSystem(6)
    expect(items[2].name).toEqual("Elixir of the Mongoose")
    expect(items[2].quality).toEqual(0)
    expect(items[2].sellIn).toEqual(-1)
  })

  it("testing:The Quality of an item is never negative",()=>{
    const items = createAndUpdateSystem(60)
    expect(items[2].name).toEqual("Elixir of the Mongoose")
    expect(items[2].quality).toEqual(0)
    expect(items[2].sellIn).toEqual(-55)
  })

  it("tesing: Aged Brie actually increases in Quality the older it gets",()=>{
    const items = createAndUpdateSystem(6)
    expect(items[1].name).toEqual("Aged Brie")
    expect(items[1].quality).toEqual(6)
    expect(items[1].sellIn).toEqual(-4)
  })

  it("tesing: The Quality of an item is never more than 50",()=>{
    const items = createAndUpdateSystem(60)
    expect(items[1].name).toEqual("Aged Brie")
    expect(items[1].quality).toEqual(50)
  })
  it("tesing: Backstage passes like aged brie, increases in Quality as its SellIn value approaches",()=>{
    const items = createAndUpdateSystem(3)
    expect(items[5].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
    expect(items[5].quality).toEqual(23)
    expect(items[5].sellIn).toEqual(12)
  })

  it("tesing: Backstage passes's Quality increases by 2 when there are 10 days or less",()=>{
    const items = createAndUpdateSystem(6)
    expect(items[5].quality).toEqual(28)
    expect(items[5].sellIn).toEqual(9)
  })

  it("tesing: Backstage passes's Quality increases by 3 when there are 5 days or less",()=>{
    const items = createAndUpdateSystem(12)
    expect(items[5].quality).toEqual(43)
    expect(items[5].sellIn).toEqual(3)
  })
  it("tesing: Backstage passes's Quality drops to 0 after the concert",()=>{
    const items = createAndUpdateSystem(16)
    expect(items[5].quality).toEqual(0)
    expect(items[5].sellIn).toEqual(-1)
  })

  it("tesing: Conjured items degrade in Quality twice as fast as normal items",()=>{
    const items = createAndUpdateSystem(1)
    expect(items[8].name.includes("Conjured")).toEqual(true)
    expect(items[8].quality).toEqual(4)
    expect(items[8].sellIn).toEqual(2)
  })

  it("tesing: Conjured items degrade in Quality twice as fast as normal items + Once the sell by date has passed, Quality degrades twice as fast",()=>{
    const items = createAndUpdateSystem(4)
    expect(items[9].name.includes("Conjured")).toEqual(true)
    expect(items[9].quality).toEqual(0)
    expect(items[9].sellIn).toEqual(-1)
  })

});
