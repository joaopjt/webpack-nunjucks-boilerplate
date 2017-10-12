class Welcome {
  constructor(name) {
    this.name = name;
  }

  hello() {
    /* eslint-disable no-alert, no-console */
    console.log(`Welcome ${this.name}`);
  }
}

const say = new Welcome('John');
say.hello();
