const fs = require('fs');

class Icons {
  getIcon(id) {
    const  s = ('0' + Number(id)).substr(-2);
    return fs.createReadStream(require.resolve(`./${s}-s.png`));
  }
}

module.exports = new Icons();
