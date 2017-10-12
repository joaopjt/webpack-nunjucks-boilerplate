class Welcome {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log(`Welcome ${this.name}`);
  }
}

const say = new Welcome('John');
say.hello();
