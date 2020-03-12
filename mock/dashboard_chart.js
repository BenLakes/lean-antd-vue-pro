function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [10, 10, 18, 20, 10, 48]
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;