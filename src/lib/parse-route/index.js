/*
mask ='/p1/:id1/p2/:id2'
route = '/p1/11111/p2/22222'

return { id1: '1111', id2: '2222' }
else return FALSE

*/

module.exports = class ParseRoute {
  constructor(mask, separator = '/') {
    this.separator = separator;
    this.mask = mask;

    mask = this._clearSeparator(mask);

    this.arrMask = mask.split(separator);
  }

  match = (path) => {
    path = this._clearSeparator(path);
    const arrPath = path.split(this.separator);

    if (arrPath.length !== this.arrMask.length) return false;

    this._objPath = { mask: this.mask };

    for (let i = 0; i < this.arrMask.length; i++) {
      if (this.arrMask[i][0] === ':') {
        this.arrMask[i] = this.arrMask[i].slice(1);
        this._objPath[this.arrMask[i]] = arrPath[i];
      } else if (this.arrMask[i] === arrPath[i]) {
        //this._objPath[this.arrMask[i]] = arrPath[i];
      } else {
        return false;
      }
    }

    return this._objPath;
  };

  _clearSeparator = (path) => {
    if (path[0] === this.separator) {
      path = path.slice(1, path.length);
    }

    if (path[path.length - 1] === this.separator) {
      path = path.slice(0, path.length - 1);
      return path;
    }

    return path;
  };
};
