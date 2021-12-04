/*
mask ='/p1/:id1/p2/:id2'
route = '/p1/11111/p2/22222'

return { id1: '1111', id2: '2222' }
else return null

*/

module.exports = class ParseRoute {
  constructor(mask, separator = '/') {
    this.separator = separator;

    this.mask = mask;

    this.arrMask = this._clearSeparator(mask).split(separator);
  }

  match(pathUrl) {
    const path = this._clearSeparator(pathUrl);
    const arrPath = path.split(this.separator);

    if (arrPath.length !== this.arrMask.length) return null;

    this._objPath = { mask: this.mask };

    for (let i = 0; i < this.arrMask.length; i += 1) {
      if (this.arrMask[i][0] === ':') {
        this.arrMask[i] = this.arrMask[i].slice(1);
        this._objPath[this.arrMask[i]] = arrPath[i];
      } else if (this.arrMask[i] === arrPath[i]) {
        //
      } else {
        return null;
      }
    }

    return this._objPath;
  }

  _clearSeparator(pathUrl) {
    let path = pathUrl;
    if (path[0] === this.separator) {
      path = path.slice(1, path.length);
    }

    if (path[path.length - 1] === this.separator) {
      path = path.slice(0, path.length - 1);
      return path;
    }

    return path;
  }
};
