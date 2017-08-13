const fs = require('fs');

class Icons {
  getIcon(id) {
    return fs.createReadStream(this.getIconPath(id));
  }

  getIconPath(id) {
    const  s = ('0' + Number(id)).substr(-2);
    return require.resolve(`./${s}-s.png`);
  }
}

module.exports = new Icons();
