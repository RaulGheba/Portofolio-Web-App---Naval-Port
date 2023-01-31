

function getDate() {
  let today = new Date();
  let day = today.toLocaleDateString("en-US");
  return day;
}

module.exports = {
  getDate,
};