function Player() {
  this.name = '';

  this.setName = function (name) {
    console.log(name);
    this.name = name;
  }
}