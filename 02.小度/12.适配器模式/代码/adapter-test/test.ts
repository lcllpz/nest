class Duck {
  quack() {
    console.log("小鸭 嘎嘎嘎");
  }
}

class Chicken {
  cluck() {
    console.log("小鸡 咯咯咯");
  }
}

interface Quackable {
  quack(): void;
}

function makeItQuack(animal: Quackable) {
  animal.quack();
}

class AnimalAdapter implements Quackable {
  private animal: any;
  private soundMethod: string;

  constructor(animal: any, soundMethod: string) {
    this.animal = animal;
    this.soundMethod = soundMethod;
  }

  quack() {
    if (this.soundMethod in this.animal) {
      this.animal[this.soundMethod]();
    } else {
      console.log("动物没有这个叫声方法");
    }
  }
}

const duck = new Duck();
const chicken = new Chicken();
// const adapter = new AnimalAdapter(duck, "quack");
const adapter = new AnimalAdapter(chicken, "cluck");
makeItQuack(adapter);
