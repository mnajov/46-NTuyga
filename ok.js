Array.prototype.myFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("callback is not a function bro or sister");
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    const e = this[i];
    if (callback(e, i, this)) {
      result.push(e);
    }
  }

  return result;
};

// const a = numbers.filter((e) => e % 2 === 0);
// console.log(a);
// const a1 = numbers.myFilter((e) => e % 2 === 0);
// console.log(a1);

Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("callback is not a function bro or sister");
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    const e = this[i];
    const r = callback(e, i, this);

    result.push(r);
  }

  return result;
};

Array.prototype.myFindLastIndex = function (callback) {
  if (typeof callback !== "function") {
    throw new Error("callback is not a function bro or sister");
  }
  let result = -1;

  for (let i = this.length - 1; i >= 0; i--) {
    const e = this[i];
    if (callback(e, i, this)) {
      result = i;
      break;
    }
  }

  return result;
};

const numbers = [1, 2, 3, 4, 0, 4, 0];

function ok(el, i, a) {
  console.log("ele :", el);
  console.log("iindex :", i);
  console.log("arr :", a);

  return el == 0;
}

// console.log(numbers.map(ok));
// console.log(numbers.myMap(ok));
// console.log(numbers.filter(ok));
// console.log(numbers.myFilter(ok));
// console.log(numbers.findLastIndex(ok));

// console.log("7777777777777777777");

// console.log(numbers.myFindLastIndex(ok));

String.prototype.toNumber = function () {
  const r = Number(this);

  if (isNaN(r)) {
    throw new Error(`this is ${this} cannot convert to number!`);
  }

  return r;
};

// console.log(typeof "5".toNumber());
// console.log("5xecf".toNumber());
