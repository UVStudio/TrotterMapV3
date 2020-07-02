const fs = require('fs');

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;
  const dataRaw = JSON.parse(data);
  const newArray = dataRaw.map((e) => e.name + ',' + e.country);
  fs.writeFile('cityList.json', JSON.stringify(newArray), (err) => {
    if (err) throw err;
  });
});
