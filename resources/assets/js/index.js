class Welcome {
  constructor(name) {
    this.name = name;
  }

  hello() {
    alert(`Welcome ${this.name}`);
  }
}

const say = new Welcome('John');
say.hello();
