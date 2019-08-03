import React__default, { createContext, createElement, Fragment, forwardRef, Component as Component$l, PureComponent, useState, useRef } from 'react';
import PropTypes$1, { PropTypes } from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import axios from 'axios';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  flex-direction: ", ";\n  flex-grow: ", ";\n  justify-content: ", ";\n  align-items: ", ";\n  padding: ", ";\n  background: ", ";\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var px = function px(n) {
  return "".concat(n, "px");
};

var space = function space(props) {
  if (!props.space) return;

  if (props.horizontal) {
    return "\n    > * + * {\n      margin-left: ".concat(px(props.space), " !important\n    }\n    ");
  }

  return "\n    > * + * {\n      margin-top: ".concat(px(props.space), " !important\n    }\n  ");
};

var padding = function padding(props) {
  return "".concat(px(props.p));
};

var direction = function direction(props) {
  return props.horizontal ? 'row' : 'column';
};

function Box(props) {
  return React__default.createElement(BaseBox, props);
}
var BaseBox = styled.div(_templateObject(), function (p) {
  return p.display;
}, direction, function (p) {
  return p.grow;
}, function (p) {
  return p.justify;
}, function (p) {
  return p.align;
}, padding, function (p) {
  return p.bg;
}, space);
Box.propTypes = {
  display: PropTypes.string,
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  grow: PropTypes.string,
  space: PropTypes.number,
  bg: PropTypes.string,
  p: PropTypes.number
};
Box.defaultProps = {
  display: 'flex',
  direction: 'flex-column',
  align: 'stretch',
  justify: 'flex-start',
  grow: 'initial',
  space: 0,
  bg: 'inherit',
  p: 0
};

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var inheritsLoose = _inheritsLoose;

/*

Based off glamor's StyleSheet, thanks Sunil ❤️

high performance StyleSheet for css-in-js systems

- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance

// usage

import { StyleSheet } from '@emotion/sheet'

let styleSheet = new StyleSheet({ key: '', container: document.head })

styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet

styleSheet.flush()
- empties the stylesheet of all its contents

*/
// $FlowFixMe
function sheetForTag(tag) {
  if (tag.sheet) {
    // $FlowFixMe
    return tag.sheet;
  } // this weirdness brought to you by firefox

  /* istanbul ignore next */


  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

function createStyleElement(options) {
  var tag = document.createElement('style');
  tag.setAttribute('data-emotion', options.key);

  if (options.nonce !== undefined) {
    tag.setAttribute('nonce', options.nonce);
  }

  tag.appendChild(document.createTextNode(''));
  return tag;
}

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(options) {
    this.isSpeedy = options.speedy === undefined ? "production" === 'production' : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce; // key is the value of the data-emotion attribute, it's used to identify different sheets

    this.key = options.key;
    this.container = options.container;
    this.before = null;
  }

  var _proto = StyleSheet.prototype;

  _proto.insert = function insert(rule) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      var _tag = createStyleElement(this);

      var before;

      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }

      this.container.insertBefore(_tag, before);
      this.tags.push(_tag);
    }

    var tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);

      try {
        // this is a really hot path
        // we check the second character first because having "i"
        // as the second character will happen less often than
        // having "@" as the first character
        var isImportRule = rule.charCodeAt(1) === 105 && rule.charCodeAt(0) === 64; // this is the ultrafast version, works across browsers
        // the big drawback is that the css won't be editable in devtools

        sheet.insertRule(rule, // we need to insert @import rules before anything else
        // otherwise there will be an error
        // technically this means that the @import rules will
        // _usually_(not always since there could be multiple style tags)
        // be the first ones in prod and generally later in dev
        // this shouldn't really matter in the real world though
        // @import is generally only used for font faces from google fonts and etc.
        // so while this could be technically correct then it would be slower and larger
        // for a tiny bit of correctness that won't matter in the real world
        isImportRule ? 0 : sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }

    this.ctr++;
  };

  _proto.flush = function flush() {
    // $FlowFixMe
    this.tags.forEach(function (tag) {
      return tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };

  return StyleSheet;
}();

function stylis_min (W) {
  function M(d, c, e, h, a) {
    for (var m = 0, b = 0, v = 0, n = 0, q, g, x = 0, K = 0, k, u = k = q = 0, l = 0, r = 0, I = 0, t = 0, B = e.length, J = B - 1, y, f = '', p = '', F = '', G = '', C; l < B;) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), n = v = m = 0, B++, J++);

      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;

            default:
              f += e.charAt(l);
          }

          g = 59;
        }

        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;

            for (t = ++l; l < B;) {
              switch (g = e.charCodeAt(l)) {
                case 123:
                  k++;
                  break;

                case 125:
                  k--;
                  break;

                case 47:
                  switch (g = e.charCodeAt(l + 1)) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }

                              break;

                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }

                          }
                        }

                        l = u;
                      }

                  }

                  break;

                case 91:
                  g++;

                case 40:
                  g++;

                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g;) {
                  }

              }

              if (0 === k) break;
              l++;
            }

            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));

            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);

                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;

                  default:
                    r = O;
                }

                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A && (r = X(O, f, I), C = H(3, k, r, c, D, z, t, g, a, h), f = r.join(''), void 0 !== C && 0 === (t = (k = C.trim()).length) && (g = 0, k = ''));
                if (0 < t) switch (g) {
                  case 115:
                    f = f.replace(da, ea);

                  case 100:
                  case 109:
                  case 45:
                    k = f + '{' + k + '}';
                    break;

                  case 107:
                    f = f.replace(fa, '$1 $2');
                    k = f + '{' + k + '}';
                    k = 1 === w || 2 === w && L('@' + k, 3) ? '@-webkit-' + k + '@' + k : '@' + k;
                    break;

                  default:
                    k = f + k, 112 === h && (k = (p += k, ''));
                } else k = '';
                break;

              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }

            F += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;

          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length)) switch (0 === u && (q = f.charCodeAt(0), 45 === q || 96 < q && 123 > q) && (t = (f = f.replace(' ', ':')).length), 0 < A && void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) && 0 === (t = (f = C.trim()).length) && (f = '\x00\x00'), q = f.charCodeAt(0), g = f.charCodeAt(1), q) {
              case 0:
                break;

              case 64:
                if (105 === g || 99 === g) {
                  G += f + e.charAt(l);
                  break;
                }

              default:
                58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
            }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }

      switch (g) {
        case 13:
        case 10:
          47 === b ? b = 0 : 0 === 1 + q && 107 !== h && 0 < f.length && (r = 1, f += '\x00');
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;

        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }

        default:
          z++;
          y = e.charAt(l);

          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b) switch (x) {
                case 44:
                case 58:
                case 9:
                case 32:
                  y = '';
                  break;

                default:
                  32 !== g && (y = ' ');
              }
              break;

            case 0:
              y = '\\0';
              break;

            case 12:
              y = '\\f';
              break;

            case 11:
              y = '\\v';
              break;

            case 38:
              0 === n + b + m && (r = I = 1, y = '\f' + y);
              break;

            case 108:
              if (0 === n + b + m + E && 0 < u) switch (l - u) {
                case 2:
                  112 === x && 58 === e.charCodeAt(l - 3) && (E = x);

                case 8:
                  111 === K && (E = K);
              }
              break;

            case 58:
              0 === n + b + m && (u = l);
              break;

            case 44:
              0 === b + v + n + m && (r = 1, y += '\r');
              break;

            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;

            case 91:
              0 === n + b + v && m++;
              break;

            case 93:
              0 === n + b + v && m--;
              break;

            case 41:
              0 === n + b + m && v--;
              break;

            case 40:
              if (0 === n + b + m) {
                if (0 === q) switch (2 * x + 3 * K) {
                  case 533:
                    break;

                  default:
                    q = 1;
                }
                v++;
              }

              break;

            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;

            case 42:
            case 47:
              if (!(0 < n + m + v)) switch (b) {
                case 0:
                  switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                    case 235:
                      b = 47;
                      break;

                    case 220:
                      t = l, b = 42;
                  }

                  break;

                case 42:
                  47 === g && 42 === x && t + 2 !== l && (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), y = '', b = 0);
              }
          }

          0 === b && (f += y);
      }

      K = x;
      x = g;
      l++;
    }

    t = p.length;

    if (0 < t) {
      r = c;
      if (0 < A && (C = H(2, p, r, d, D, z, t, h, a, h), void 0 !== C && 0 === (p = C).length)) return G + p + F;
      p = r.join(',') + '{' + p + '}';

      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);

        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;

          case 112:
            p = p.replace(Q, '::-webkit-input-$1') + p.replace(Q, '::-moz-$1') + p.replace(Q, ':-ms-input-$1') + p;
        }

        E = 0;
      }
    }

    return G + p + F;
  }

  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
        m = d.length;

    switch (m) {
      case 0:
      case 1:
        var b = 0;

        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }

        break;

      default:
        var v = b = 0;

        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }

    }

    return c;
  }

  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));

    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());

      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());

      default:
        if (0 < 1 * e && 0 < c.indexOf('\f')) return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }

    return d + c;
  }

  function P(d, c, e, h) {
    var a = d + ';',
        m = 2 * c + 3 * e + 4 * h;

    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || 2 === w && L(b, 1) ? '-webkit-' + b + b : b;
    }

    if (0 === w || 2 === w && !L(a, 1)) return a;

    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;

      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;

      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;

      case 1009:
        if (100 !== a.charCodeAt(4)) break;

      case 969:
      case 942:
        return '-webkit-' + a + a;

      case 978:
        return '-webkit-' + a + '-moz-' + a + a;

      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;

      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;

      case 932:
        if (45 === a.charCodeAt(4)) switch (a.charCodeAt(5)) {
          case 103:
            return '-webkit-box-' + a.replace('-grow', '') + '-webkit-' + a + '-ms-' + a.replace('grow', 'positive') + a;

          case 115:
            return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;

          case 98:
            return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
        }
        return '-webkit-' + a + '-ms-' + a + a;

      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;

      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;

      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;

      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;

        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;

          case 232:
            b = a.replace(G, 'tb-rl');
            break;

          case 220:
            b = a.replace(G, 'lr');
            break;

          default:
            return a;
        }

        return '-webkit-' + a + '-ms-' + b + a;

      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;

      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();

        switch (m = b.charCodeAt(0) + (b.charCodeAt(7) | 0)) {
          case 203:
            if (111 > b.charCodeAt(8)) break;

          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;

          case 207:
          case 102:
            a = a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') + ';' + a.replace(b, '-webkit-' + b) + ';' + a.replace(b, '-ms-' + b + 'box') + ';' + a;
        }

        return a + ';';

      case 938:
        if (45 === a.charCodeAt(5)) switch (a.charCodeAt(6)) {
          case 105:
            return b = a.replace('-items', ''), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;

          case 115:
            return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;

          default:
            return '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a;
        }
        break;

      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;

      case 931:
      case 953:
        if (!0 === la.test(d)) return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0) ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch') : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;

      case 962:
        if (a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a, 211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10)) return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }

    return a;
  }

  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
        h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }

  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }

  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w; g < A; ++g) {
      switch (w = S[g].call(B, d, x, e, h, a, m, b, v, n, q)) {
        case void 0:
        case !1:
        case !0:
        case null:
          break;

        default:
          x = w;
      }
    }

    if (x !== c) return x;
  }

  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;

      default:
        if ('function' === typeof d) S[A++] = d;else if ('object' === typeof d) for (var c = 0, e = d.length; c < e; ++c) {
          T(d[c]);
        } else Y = !!d | 0;
    }

    return T;
  }

  function U(d) {
    d = d.prefix;
    void 0 !== d && (R = null, d ? 'function' !== typeof d ? w = 1 : (w = 2, R = d) : w = 0);
    return U;
  }

  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];

    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }

    var a = M(O, e, c, 0, 0);
    0 < A && (h = H(-2, a, e, e, D, z, a.length, 0, 0, 0), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }

  var ca = /^\0+/g,
      N = /[\0\r\f]/g,
      aa = /: */g,
      ka = /zoo|gra/,
      ma = /([,: ])(transform)/g,
      ia = /,\r+?/g,
      F = /([\t\r\n ])*\f?&/g,
      fa = /@(k\w+)\s*(\S*)\s*/,
      Q = /::(place)/g,
      ha = /:(read-only)/g,
      G = /[svh]\w+-[tblr]{2}/,
      da = /\(\s*(.*)\s*\)/g,
      oa = /([\s\S]*?);/g,
      ba = /-self|flex-/g,
      na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
      la = /stretch|:\s*\w+\-(?:conte|avail)/,
      ja = /([^-])(image-set\()/,
      z = 1,
      D = 1,
      E = 0,
      w = 1,
      O = [],
      S = [],
      A = 0,
      R = null,
      Y = 0,
      V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var weakMemoize = function weakMemoize(func) {
  // $FlowFixMe flow doesn't include all non-primitive types as allowed for weakmaps
  var cache = new WeakMap();
  return function (arg) {
    if (cache.has(arg)) {
      // $FlowFixMe
      return cache.get(arg);
    }

    var ret = func(arg);
    cache.set(arg, ret);
    return ret;
  };
};

// https://github.com/thysultan/stylis.js/tree/master/plugins/rule-sheet
// inlined to avoid umd wrapper and peerDep warnings/installing stylis
// since we use stylis after closure compiler
var delimiter = '/*|*/';
var needle = delimiter + '}';

function toSheet(block) {
  if (block) {
    Sheet.current.insert(block + '}');
  }
}

var Sheet = {
  current: null
};
var ruleSheet = function ruleSheet(context, content, selectors, parents, line, column, length, ns, depth, at) {
  switch (context) {
    // property
    case 1:
      {
        switch (content.charCodeAt(0)) {
          case 64:
            {
              // @import
              Sheet.current.insert(content + ';');
              return '';
            }
          // charcode for l

          case 108:
            {
              // charcode for b
              // this ignores label
              if (content.charCodeAt(2) === 98) {
                return '';
              }
            }
        }

        break;
      }
    // selector

    case 2:
      {
        if (ns === 0) return content + delimiter;
        break;
      }
    // at-rule

    case 3:
      {
        switch (ns) {
          // @font-face, @page
          case 102:
          case 112:
            {
              Sheet.current.insert(selectors[0] + content);
              return '';
            }

          default:
            {
              return content + (at === 0 ? delimiter : '');
            }
        }
      }

    case -2:
      {
        content.split(needle).forEach(toSheet);
      }
  }
};
var removeLabel = function removeLabel(context, content) {
  if (context === 1 && // charcode for l
  content.charCodeAt(0) === 108 && // charcode for b
  content.charCodeAt(2) === 98 // this ignores label
  ) {
      return '';
    }
};

var isBrowser = typeof document !== 'undefined';
var rootServerStylisCache = {};
var getServerStylisCache = isBrowser ? undefined : weakMemoize(function () {
  var getCache = weakMemoize(function () {
    return {};
  });
  var prefixTrueCache = {};
  var prefixFalseCache = {};
  return function (prefix) {
    if (prefix === undefined || prefix === true) {
      return prefixTrueCache;
    }

    if (prefix === false) {
      return prefixFalseCache;
    }

    return getCache(prefix);
  };
});

var createCache = function createCache(options) {
  if (options === undefined) options = {};
  var key = options.key || 'css';
  var stylisOptions;

  if (options.prefix !== undefined) {
    stylisOptions = {
      prefix: options.prefix
    };
  }

  var stylis = new stylis_min(stylisOptions);

  var inserted = {}; // $FlowFixMe

  var container;

  if (isBrowser) {
    container = options.container || document.head;
    var nodes = document.querySelectorAll("style[data-emotion-" + key + "]");
    Array.prototype.forEach.call(nodes, function (node) {
      var attrib = node.getAttribute("data-emotion-" + key); // $FlowFixMe

      attrib.split(' ').forEach(function (id) {
        inserted[id] = true;
      });

      if (node.parentNode !== container) {
        container.appendChild(node);
      }
    });
  }

  var _insert;

  if (isBrowser) {
    stylis.use(options.stylisPlugins)(ruleSheet);

    _insert = function insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      Sheet.current = sheet;

      stylis(selector, serialized.styles);

      if (shouldCache) {
        cache.inserted[name] = true;
      }
    };
  } else {
    stylis.use(removeLabel);
    var serverStylisCache = rootServerStylisCache;

    if (options.stylisPlugins || options.prefix !== undefined) {
      stylis.use(options.stylisPlugins); // $FlowFixMe

      serverStylisCache = getServerStylisCache(options.stylisPlugins || rootServerStylisCache)(options.prefix);
    }

    var getRules = function getRules(selector, serialized) {
      var name = serialized.name;

      if (serverStylisCache[name] === undefined) {
        serverStylisCache[name] = stylis(selector, serialized.styles);
      }

      return serverStylisCache[name];
    };

    _insert = function _insert(selector, serialized, sheet, shouldCache) {
      var name = serialized.name;
      var rules = getRules(selector, serialized);

      if (cache.compat === undefined) {
        // in regular mode, we don't set the styles on the inserted cache
        // since we don't need to and that would be wasting memory
        // we return them so that they are rendered in a style tag
        if (shouldCache) {
          cache.inserted[name] = true;
        }

        return rules;
      } else {
        // in compat mode, we put the styles on the inserted cache so
        // that emotion-server can pull out the styles
        // except when we don't want to cache it which was in Global but now
        // is nowhere but we don't want to do a major right now
        // and just in case we're going to leave the case here
        // it's also not affecting client side bundle size
        // so it's really not a big deal
        if (shouldCache) {
          cache.inserted[name] = rules;
        } else {
          return rules;
        }
      }
    };
  }

  var cache = {
    key: key,
    sheet: new StyleSheet({
      key: key,
      container: container,
      nonce: options.nonce,
      speedy: options.speedy
    }),
    nonce: options.nonce,
    inserted: inserted,
    registered: {},
    insert: _insert
  };
  return cache;
};

var isBrowser$1 = typeof document !== 'undefined';
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = '';
  classNames.split(' ').forEach(function (className) {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className]);
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
  var className = cache.key + "-" + serialized.name;

  if ( // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (isStringTag === false || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  isBrowser$1 === false && cache.compat !== undefined) && cache.registered[className] === undefined) {
    cache.registered[className] = serialized.styles;
  }

  if (cache.inserted[serialized.name] === undefined) {
    var stylesForSSR = '';
    var current = serialized;

    do {
      var maybeStyles = cache.insert("." + className, current, cache.sheet, true);

      if (!isBrowser$1 && maybeStyles !== undefined) {
        stylesForSSR += maybeStyles;
      }

      current = current.next;
    } while (current !== undefined);

    if (!isBrowser$1 && stylesForSSR.length !== 0) {
      return stylesForSSR;
    }
  }
};

/* eslint-disable */
// murmurhash2 via https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash2_32_gc(str) {
  var l = str.length,
      h = l ^ l,
      i = 0,
      k;

  while (l >= 4) {
    k = str.charCodeAt(i) & 0xff | (str.charCodeAt(++i) & 0xff) << 8 | (str.charCodeAt(++i) & 0xff) << 16 | (str.charCodeAt(++i) & 0xff) << 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    k ^= k >>> 24;
    k = (k & 0xffff) * 0x5bd1e995 + (((k >>> 16) * 0x5bd1e995 & 0xffff) << 16);
    h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16) ^ k;
    l -= 4;
    ++i;
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16;

    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8;

    case 1:
      h ^= str.charCodeAt(i) & 0xff;
      h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  }

  h ^= h >>> 13;
  h = (h & 0xffff) * 0x5bd1e995 + (((h >>> 16) * 0x5bd1e995 & 0xffff) << 16);
  h ^= h >>> 15;
  return (h >>> 0).toString(36);
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;

var isCustomProperty = function isCustomProperty(property) {
  return property.charCodeAt(1) === 45;
};

var processStyleName = memoize(function (styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, '-$&').toLowerCase();
});

var processStyleValue = function processStyleValue(key, value) {
  if (value == null || typeof value === 'boolean') {
    return '';
  }

  switch (key) {
    case 'animation':
    case 'animationName':
      {
        if (typeof value === 'string') {
          return value.replace(animationRegex, function (match, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
  }

  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === 'number' && value !== 0) {
    return value + 'px';
  }

  return value;
};

function handleInterpolation(mergedProps, registered, interpolation, couldBeSelectorInterpolation) {
  if (interpolation == null) {
    return '';
  }

  if (interpolation.__emotion_styles !== undefined) {

    return interpolation;
  }

  switch (typeof interpolation) {
    case 'boolean':
      {
        return '';
      }

    case 'object':
      {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }

        if (interpolation.styles !== undefined) {
          var next = interpolation.next;

          if (next !== undefined) {
            // not the most efficient thing ever but this is a pretty rare case
            // and there will be very few iterations of this generally
            while (next !== undefined) {
              cursor = {
                name: next.name,
                styles: next.styles,
                next: cursor
              };
              next = next.next;
            }
          }

          var styles = interpolation.styles;

          return styles;
        }

        return createStringFromObject(mergedProps, registered, interpolation);
      }

    case 'function':
      {
        if (mergedProps !== undefined) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result, couldBeSelectorInterpolation);
        }
      }
    // eslint-disable-next-line no-fallthrough

    default:
      {
        if (registered == null) {
          return interpolation;
        }

        var cached = registered[interpolation];

        return cached !== undefined && !couldBeSelectorInterpolation ? cached : interpolation;
      }
  }
}

function createStringFromObject(mergedProps, registered, obj) {
  var string = '';

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i], false);
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];

      if (typeof value !== 'object') {
        if (registered != null && registered[value] !== undefined) {
          string += _key + "{" + registered[value] + "}";
        } else {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === 'NO_COMPONENT_SELECTOR' && "production" !== 'production') {
          throw new Error('Component selectors can only be used in conjunction with babel-plugin-emotion.');
        }

        if (Array.isArray(value) && typeof value[0] === 'string' && (registered == null || registered[value[0]] === undefined)) {
          for (var _i = 0; _i < value.length; _i++) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value, false);

          switch (_key) {
            case 'animation':
            case 'animationName':
              {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }

            default:
              {
                string += _key + "{" + interpolated + "}";
              }
          }
        }
      }
    }
  }

  return string;
}

var labelPattern = /label:\s*([^\s;\n{]+)\s*;/g;
// keyframes are stored on the SerializedStyles object as a linked list


var cursor;
var serializeStyles = function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === 'object' && args[0] !== null && args[0].styles !== undefined) {
    return args[0];
  }

  var stringMode = true;
  var styles = '';
  cursor = undefined;
  var strings = args[0];

  if (strings == null || strings.raw === undefined) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings, false);
  } else {
    styles += strings[0];
  } // we start at 1 since we've already handled the first arg


  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i], styles.charCodeAt(styles.length - 1) === 46);

    if (stringMode) {
      styles += strings[i];
    }
  }


  labelPattern.lastIndex = 0;
  var identifierName = '';
  var match; // https://esbench.com/bench/5b809c2cf2949800a0f61fb5

  while ((match = labelPattern.exec(styles)) !== null) {
    identifierName += '-' + // $FlowFixMe we know it's not null
    match[1];
  }

  var name = murmurhash2_32_gc(styles) + identifierName;

  return {
    name: name,
    styles: styles,
    next: cursor
  };
};

function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return serializeStyles(args);
}

var isBrowser$2 = typeof document !== 'undefined';

var EmotionCacheContext = createContext(isBrowser$2 ? createCache() : null);
var ThemeContext = createContext({});
var CacheProvider = EmotionCacheContext.Provider;

var withEmotionCache = function withEmotionCache(func) {
  var render = function render(props, ref) {
    return createElement(EmotionCacheContext.Consumer, null, function ( // $FlowFixMe we know it won't be null
    cache) {
      return func(props, cache, ref);
    });
  }; // $FlowFixMe


  return forwardRef(render);
};

if (!isBrowser$2) {
  var BasicProvider =
  /*#__PURE__*/
  function (_React$Component) {
    inheritsLoose(BasicProvider, _React$Component);

    function BasicProvider(props, context, updater) {
      var _this;

      _this = _React$Component.call(this, props, context, updater) || this;
      _this.state = {
        value: createCache()
      };
      return _this;
    }

    var _proto = BasicProvider.prototype;

    _proto.render = function render() {
      return createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
    };

    return BasicProvider;
  }(Component$l);

  withEmotionCache = function withEmotionCache(func) {
    return function (props) {
      return createElement(EmotionCacheContext.Consumer, null, function (context) {
        if (context === null) {
          return createElement(BasicProvider, null, function (newContext) {
            return func(props, newContext);
          });
        } else {
          return func(props, context);
        }
      });
    };
  };
}

var typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
var hasOwnProperty = Object.prototype.hasOwnProperty;

var render = function render(cache, props, theme, ref) {
  var type = props[typePropName];
  var registeredStyles = [];
  var className = '';
  var cssProp = theme === null ? props.css : props.css(theme); // so that using `css` from `emotion` and passing the result to the css prop works
  // not passing the registered cache to serializeStyles because it would
  // make certain babel optimisations not possible

  if (typeof cssProp === 'string' && cache.registered[cssProp] !== undefined) {
    cssProp = cache.registered[cssProp];
  }

  registeredStyles.push(cssProp);

  if (props.className !== undefined) {
    className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
  }

  var serialized = serializeStyles(registeredStyles);

  var rules = insertStyles(cache, serialized, typeof type === 'string');
  className += cache.key + "-" + serialized.name;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key) && key !== 'css' && key !== typePropName && ("production" === 'production' )) {
      newProps[key] = props[key];
    }
  }

  newProps.ref = ref;
  newProps.className = className;
  var ele = createElement(type, newProps);

  if (!isBrowser$2 && rules !== undefined) {
    var _ref;

    var serializedNames = serialized.name;
    var next = serialized.next;

    while (next !== undefined) {
      serializedNames += ' ' + next.name;
      next = next.next;
    }

    return createElement(Fragment, null, createElement("style", (_ref = {}, _ref["data-emotion-" + cache.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref)), ele);
  }

  return ele;
};

var Emotion = withEmotionCache(function (props, cache, ref) {
  // use Context.read for the theme when it's stable
  if (typeof props.css === 'function') {
    return createElement(ThemeContext.Consumer, null, function (theme) {
      return render(cache, props, theme, ref);
    });
  }

  return render(cache, props, null, ref);
});


var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || props.css == null) {
    // $FlowFixMe
    return createElement.apply(undefined, args);
  }

  var argsLength = args.length;
  var createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = Emotion;
  var newProps = {};

  for (var key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key];
    }
  }

  newProps[typePropName] = type;

  createElementArgArray[1] = newProps;

  for (var i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i];
  } // $FlowFixMe


  return createElement.apply(null, createElementArgArray);
};

var keyframes = function keyframes() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = withEmotionCache(function (props, context) {
  return createElement(ThemeContext.Consumer, null, function (theme) {
    var rules = '';
    var serializedHashes = '';
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && "production" !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serializeStyles(args, context.registered);

      if (isBrowser$2) {
        insertStyles(context, serialized, false);
      } else {
        var res = insertStyles(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!isBrowser$2) {
        serializedHashes += " " + serialized.name;
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && "production" !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    if (!isBrowser$2 && rules.length !== 0) {
      var _ref;

      return createElement(Fragment, null, createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = context.sheet.nonce, _ref)), ele);
    }

    return ele;
  });
});

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

var setStatic_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */

    return BaseComponent;
  };
};

var _default = setStatic;
exports.default = _default;
});

unwrapExports(setStatic_1);

var setDisplayName_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _setStatic = interopRequireDefault(setStatic_1);

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic.default)('displayName', displayName);
};

var _default = setDisplayName;
exports.default = _default;
});

unwrapExports(setDisplayName_1);

var getDisplayName_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

var _default = getDisplayName;
exports.default = _default;
});

unwrapExports(getDisplayName_1);

var wrapDisplayName_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _getDisplayName = interopRequireDefault(getDisplayName_1);

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + "(" + (0, _getDisplayName.default)(BaseComponent) + ")";
};

var _default = wrapDisplayName;
exports.default = _default;
});

unwrapExports(wrapDisplayName_1);

var shouldUpdate_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = interopRequireDefault(inheritsLoose);



var _setDisplayName = interopRequireDefault(setDisplayName_1);

var _wrapDisplayName = interopRequireDefault(wrapDisplayName_1);

var shouldUpdate = function shouldUpdate(test) {
  return function (BaseComponent) {
    var factory = (0, React__default.createFactory)(BaseComponent);

    var ShouldUpdate =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(ShouldUpdate, _Component);

      function ShouldUpdate() {
        return _Component.apply(this, arguments) || this;
      }

      var _proto = ShouldUpdate.prototype;

      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return test(this.props, nextProps);
      };

      _proto.render = function render() {
        return factory(this.props);
      };

      return ShouldUpdate;
    }(React__default.Component);

    return ShouldUpdate;
  };
};

var _default = shouldUpdate;
exports.default = _default;
});

unwrapExports(shouldUpdate_1);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty$1.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual;

var shallowEqual$1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _shallowEqual = interopRequireDefault(shallowEqual_1);

var _default = _shallowEqual.default;
exports.default = _default;
});

unwrapExports(shallowEqual$1);

var pick_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var pick = function pick(obj, keys) {
  var result = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

var _default = pick;
exports.default = _default;
});

unwrapExports(pick_1);

var onlyUpdateForKeys_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _shouldUpdate = interopRequireDefault(shouldUpdate_1);

var _shallowEqual = interopRequireDefault(shallowEqual$1);

var _setDisplayName = interopRequireDefault(setDisplayName_1);

var _wrapDisplayName = interopRequireDefault(wrapDisplayName_1);

var _pick = interopRequireDefault(pick_1);

var onlyUpdateForKeys = function onlyUpdateForKeys(propKeys) {
  var hoc = (0, _shouldUpdate.default)(function (props, nextProps) {
    return !(0, _shallowEqual.default)((0, _pick.default)(nextProps, propKeys), (0, _pick.default)(props, propKeys));
  });

  return hoc;
};

var _default = onlyUpdateForKeys;
exports.default = _default;
});

var onlyUpdateForKeys = unwrapExports(onlyUpdateForKeys_1);

var _a;
/*
 * List of string constants to represent different props
 */
var LOADING = "loading";
var COLOR = "color";
var CSS = "css";
var SIZE = "size";
var SIZE_UNIT = "sizeUnit";
var WIDTH = "width";
var WIDTH_UNIT = "widthUnit";
var HEIGHT = "height";
var HEIGHT_UNIT = "heightUnit";
var RADIUS = "radius";
var RADIUS_UNIT = "radiusUnit";
var MARGIN = "margin";
/*
 * Array for onlyUpdateForKeys function
 */
var commonStrings = [LOADING, COLOR, CSS];
var sizeStrings = [SIZE, SIZE_UNIT];
var heightWidthString = [HEIGHT, HEIGHT_UNIT, WIDTH, WIDTH_UNIT];
var sizeKeys = commonStrings.concat(sizeStrings);
var sizeMarginKeys = sizeKeys.concat([MARGIN]);
var heightWidthKeys = commonStrings.concat(heightWidthString);
var heightWidthRadiusKeys = heightWidthKeys.concat([
    RADIUS,
    RADIUS_UNIT,
    MARGIN
]);
var commonValues = (_a = {},
    _a[LOADING] = true,
    _a[COLOR] = "#000000",
    _a[CSS] = {},
    _a);
var heightWidthValues = function (height, width) {
    var _a;
    return (_a = {},
        _a[HEIGHT] = height,
        _a[HEIGHT_UNIT] = "px",
        _a[WIDTH] = width,
        _a[WIDTH_UNIT] = "px",
        _a);
};
var sizeValues = function (sizeValue) {
    var _a;
    return (_a = {},
        _a[SIZE] = sizeValue,
        _a[SIZE_UNIT] = "px",
        _a);
};
var sizeDefaults = function (sizeValue) {
    return Object.assign({}, commonValues, sizeValues(sizeValue));
};
var sizeMarginDefaults = function (sizeValue) {
    var _a;
    return Object.assign({}, sizeDefaults(sizeValue), (_a = {},
        _a[MARGIN] = "2px",
        _a));
};
var heightWidthDefaults = function (height, width) {
    return Object.assign({}, commonValues, heightWidthValues(height, width));
};
var heightWidthRadiusDefaults = function (height, width, radius) {
    var _a;
    if (radius === void 0) { radius = 2; }
    return Object.assign({}, heightWidthDefaults(height, width), (_a = {},
        _a[RADIUS] = radius,
        _a[RADIUS_UNIT] = "px",
        _a[MARGIN] = "2px",
        _a));
};

var calculateRgba = function (color, opacity) {
    if (color[0] === "#") {
        color = color.slice(1);
    }
    if (color.length === 3) {
        var res_1 = "";
        color.split("").forEach(function (c) {
            res_1 += c;
            res_1 += c;
        });
        color = res_1;
    }
    var rgbValues = color
        .match(/.{2}/g)
        .map(function (hex) { return parseInt(hex, 16); })
        .join(", ");
    return "rgba(" + rgbValues + ", " + opacity + ")";
};

var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var long = keyframes(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  0% {left: -35%;right: 100%}\n  60% {left: 100%;right: -90%}\n  100% {left: 100%;right: -90%}\n"], ["\n  0% {left: -35%;right: 100%}\n  60% {left: 100%;right: -90%}\n  100% {left: 100%;right: -90%}\n"])));
var short = keyframes(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  0% {left: -200%;right: 100%}\n  60% {left: 107%;right: -8%}\n  100% {left: 107%;right: -8%}\n"], ["\n  0% {left: -200%;right: 100%}\n  60% {left: 107%;right: -8%}\n  100% {left: 107%;right: -8%}\n"])));
var Loader = /** @class */ (function (_super) {
    __extends(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, height = _a.height, color = _a.color, heightUnit = _a.heightUnit;
            return css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n      position: absolute;\n      height: ", ";\n      overflow: hidden;\n      background-color: ", ";\n      background-clip: padding-box;\n      display: block;\n      border-radius: 2px;\n      will-change: left, right;\n      animation-fill-mode: forwards;\n      animation: ", " 2.1s ", "\n        ", "\n        infinite;\n    "], ["\n      position: absolute;\n      height: ", ";\n      overflow: hidden;\n      background-color: ", ";\n      background-clip: padding-box;\n      display: block;\n      border-radius: 2px;\n      will-change: left, right;\n      animation-fill-mode: forwards;\n      animation: ", " 2.1s ", "\n        ",
                "\n        infinite;\n    "])), "" + height + heightUnit, color, i === 1 ? long : short, i === 2 ? "1.15s" : "", i === 1
                ? "cubic-bezier(0.65, 0.815, 0.735, 0.395)"
                : "cubic-bezier(0.165, 0.84, 0.44, 1)");
        };
        _this.wrapper = function () {
            var _a = _this.props, width = _a.width, height = _a.height, color = _a.color, heightUnit = _a.heightUnit, widthUnit = _a.widthUnit;
            return css(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      overflow: hidden;\n      background-color: ", ";\n      background-clip: padding-box;\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      overflow: hidden;\n      background-color: ", ";\n      background-clip: padding-box;\n    "])), "" + width + widthUnit, "" + height + heightUnit, calculateRgba(color, 0.2));
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = heightWidthDefaults(4, 100);
    return Loader;
}(PureComponent));
var Component = onlyUpdateForKeys(heightWidthKeys)(Loader);
Component.defaultProps = Loader.defaultProps;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;

var __makeTemplateObject$1 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var beat = keyframes(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject$1(["\n  50% {transform: scale(0.75);opacity: 0.2}\n  100% {transform: scale(1);opacity: 1}\n"], ["\n  50% {transform: scale(0.75);opacity: 0.2}\n  100% {transform: scale(1);opacity: 1}\n"])));
var Loader$1 = /** @class */ (function (_super) {
    __extends$1(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_2$1 || (templateObject_2$1 = __makeTemplateObject$1(["\n      display: inline-block;\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      animation: ", " 0.7s ", " infinite linear;\n      animation-fill-mode: both;\n    "], ["\n      display: inline-block;\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      animation: ", " 0.7s ", " infinite linear;\n      animation-fill-mode: both;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, margin, beat, i % 2 ? "0s" : "0.35s");
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$1 = onlyUpdateForKeys(sizeMarginKeys)(Loader$1);
Component$1.defaultProps = Loader$1.defaultProps;
var templateObject_1$1, templateObject_2$1;

var __makeTemplateObject$2 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bounce = keyframes(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject$2(["\n  0%, 100% {transform: scale(0)}\n  50% {transform: scale(1.0)}\n"], ["\n  0%, 100% {transform: scale(0)}\n  50% {transform: scale(1.0)}\n"])));
var Loader$2 = /** @class */ (function (_super) {
    __extends$2(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, color = _a.color, sizeUnit = _a.sizeUnit;
            return css(templateObject_2$2 || (templateObject_2$2 = __makeTemplateObject$2(["\n      position: absolute;\n      height: ", ";\n      width: ", ";\n      background-color: ", ";\n      border-radius: 100%;\n      opacity: 0.6;\n      top: 0;\n      left: 0;\n      animation-fill-mode: both;\n      animation: ", " 2.1s ", " infinite ease-in-out;\n    "], ["\n      position: absolute;\n      height: ", ";\n      width: ", ";\n      background-color: ", ";\n      border-radius: 100%;\n      opacity: 0.6;\n      top: 0;\n      left: 0;\n      animation-fill-mode: both;\n      animation: ", " 2.1s ", " infinite ease-in-out;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit, color, bounce, i === 1 ? "1s" : "0s");
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_3$1 || (templateObject_3$1 = __makeTemplateObject$2(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n    "])), "" + size + sizeUnit, "" + size + sizeUnit);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = sizeDefaults(60);
    return Loader;
}(React__default.PureComponent));
var Component$2 = onlyUpdateForKeys(sizeKeys)(Loader$2);
Component$2.defaultProps = Loader$2.defaultProps;
var templateObject_1$2, templateObject_2$2, templateObject_3$1;

var __makeTemplateObject$3 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var circle = keyframes(templateObject_1$3 || (templateObject_1$3 = __makeTemplateObject$3(["\n  0% {transform: rotate(0deg)}\n  50% {transform: rotate(180deg)}\n  100% {transform: rotate(360deg)}\n"], ["\n  0% {transform: rotate(0deg)}\n  50% {transform: rotate(180deg)}\n  100% {transform: rotate(360deg)}\n"])));
var Loader$3 = /** @class */ (function (_super) {
    __extends$3(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, color = _a.color, sizeUnit = _a.sizeUnit;
            return css(templateObject_2$3 || (templateObject_2$3 = __makeTemplateObject$3(["\n      position: absolute;\n      height: ", ";\n      width: ", ";\n      border: 1px solid ", ";\n      border-radius: 100%;\n      transition: 2s;\n      border-bottom: none;\n      border-right: none;\n      top: ", "%;\n      left: ", "%;\n      animation-fill-mode: \"\";\n      animation: ", " 1s ", "s infinite linear;\n    "], ["\n      position: absolute;\n      height: ", ";\n      width: ", ";\n      border: 1px solid ", ";\n      border-radius: 100%;\n      transition: 2s;\n      border-bottom: none;\n      border-right: none;\n      top: ", "%;\n      left: ", "%;\n      animation-fill-mode: \"\";\n      animation: ", " 1s ", "s infinite linear;\n    "])), "" + size * (1 - i / 10) + sizeUnit, "" + size * (1 - i / 10) + sizeUnit, color, i * 0.7 * 2.5, i * 0.35 * 2.5, circle, i * 0.2);
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_3$2 || (templateObject_3$2 = __makeTemplateObject$3(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n    "])), "" + size + sizeUnit, "" + size + sizeUnit);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(0) }),
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }),
            jsx("div", { css: this.style(4) }))) : null;
    };
    Loader.defaultProps = sizeDefaults(50);
    return Loader;
}(React__default.PureComponent));
var Component$3 = onlyUpdateForKeys(sizeKeys)(Loader$3);
Component$3.defaultProps = Loader$3.defaultProps;
var templateObject_1$3, templateObject_2$3, templateObject_3$2;

var __makeTemplateObject$4 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var climbingBox = keyframes(templateObject_1$4 || (templateObject_1$4 = __makeTemplateObject$4(["\n  0% {transform:translate(0, -1em) rotate(-45deg)}\n  5% {transform:translate(0, -1em) rotate(-50deg)}\n  20% {transform:translate(1em, -2em) rotate(47deg)}\n  25% {transform:translate(1em, -2em) rotate(45deg)}\n  30% {transform:translate(1em, -2em) rotate(40deg)}\n  45% {transform:translate(2em, -3em) rotate(137deg)}\n  50% {transform:translate(2em, -3em) rotate(135deg)}\n  55% {transform:translate(2em, -3em) rotate(130deg)}\n  70% {transform:translate(3em, -4em) rotate(217deg)}\n  75% {transform:translate(3em, -4em) rotate(220deg)}\n  100% {transform:translate(0, -1em) rotate(-225deg)}\n"], ["\n  0% {transform:translate(0, -1em) rotate(-45deg)}\n  5% {transform:translate(0, -1em) rotate(-50deg)}\n  20% {transform:translate(1em, -2em) rotate(47deg)}\n  25% {transform:translate(1em, -2em) rotate(45deg)}\n  30% {transform:translate(1em, -2em) rotate(40deg)}\n  45% {transform:translate(2em, -3em) rotate(137deg)}\n  50% {transform:translate(2em, -3em) rotate(135deg)}\n  55% {transform:translate(2em, -3em) rotate(130deg)}\n  70% {transform:translate(3em, -4em) rotate(217deg)}\n  75% {transform:translate(3em, -4em) rotate(220deg)}\n  100% {transform:translate(0, -1em) rotate(-225deg)}\n"])));
var Loader$4 = /** @class */ (function (_super) {
    __extends$4(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function () {
            var color = _this.props.color;
            return css(templateObject_2$4 || (templateObject_2$4 = __makeTemplateObject$4(["\n      position: absolute;\n      left: 0;\n      bottom: -0.1em;\n      height: 1em;\n      width: 1em;\n      background-color: transparent;\n      border-radius: 15%;\n      border: 0.25em solid ", ";\n      transform: translate(0, -1em) rotate(-45deg);\n      animation-fill-mode: both;\n      animation: ", " 2.5s infinite cubic-bezier(0.79, 0, 0.47, 0.97);\n    "], ["\n      position: absolute;\n      left: 0;\n      bottom: -0.1em;\n      height: 1em;\n      width: 1em;\n      background-color: transparent;\n      border-radius: 15%;\n      border: 0.25em solid ", ";\n      transform: translate(0, -1em) rotate(-45deg);\n      animation-fill-mode: both;\n      animation: ", " 2.5s infinite cubic-bezier(0.79, 0, 0.47, 0.97);\n    "])), color, climbingBox);
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_3$3 || (templateObject_3$3 = __makeTemplateObject$4(["\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin-top: -2.7em;\n      margin-left: -2.7em;\n      width: 5.4em;\n      height: 5.4em;\n      font-size: ", ";\n    "], ["\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      margin-top: -2.7em;\n      margin-left: -2.7em;\n      width: 5.4em;\n      height: 5.4em;\n      font-size: ", ";\n    "])), "" + size + sizeUnit);
        };
        _this.hill = function () {
            var color = _this.props.color;
            return css(templateObject_4$1 || (templateObject_4$1 = __makeTemplateObject$4(["\n      position: absolute;\n      width: 7.1em;\n      height: 7.1em;\n      top: 1.7em;\n      left: 1.7em;\n      border-left: 0.25em solid ", ";\n      transform: rotate(45deg);\n    "], ["\n      position: absolute;\n      width: 7.1em;\n      height: 7.1em;\n      top: 1.7em;\n      left: 1.7em;\n      border-left: 0.25em solid ", ";\n      transform: rotate(45deg);\n    "])), color);
        };
        _this.container = function () {
            return css(templateObject_5 || (templateObject_5 = __makeTemplateObject$4(["\n      position: relative;\n      width: 7.1em;\n      height: 7.1em;\n    "], ["\n      position: relative;\n      width: 7.1em;\n      height: 7.1em;\n    "])));
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.container(), css] },
            jsx("div", { css: this.wrapper() },
                jsx("div", { css: this.style() }),
                jsx("div", { css: this.hill() })))) : null;
    };
    Loader.defaultProps = sizeDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$4 = onlyUpdateForKeys(sizeKeys)(Loader$4);
Component$4.defaultProps = Loader$4.defaultProps;
var templateObject_1$4, templateObject_2$4, templateObject_3$3, templateObject_4$1, templateObject_5;

var __makeTemplateObject$5 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var clip = keyframes(templateObject_1$5 || (templateObject_1$5 = __makeTemplateObject$5(["\n  0% {transform: rotate(0deg) scale(1)}\n  50% {transform: rotate(180deg) scale(0.8)}\n  100% {transform: rotate(360deg) scale(1)}\n"], ["\n  0% {transform: rotate(0deg) scale(1)}\n  50% {transform: rotate(180deg) scale(0.8)}\n  100% {transform: rotate(360deg) scale(1)}\n"])));
var Loader$5 = /** @class */ (function (_super) {
    __extends$5(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, color = _a.color;
            return css(templateObject_2$5 || (templateObject_2$5 = __makeTemplateObject$5(["\n      background: transparent !important;\n      width: ", ";\n      height: ", ";\n      border-radius: 100%;\n      border: 2px solid;\n      border-color: ", ";\n      border-bottom-color: transparent;\n      display: inline-block;\n      animation: ", " 0.75s 0s infinite linear;\n      animation-fill-mode: both;\n    "], ["\n      background: transparent !important;\n      width: ", ";\n      height: ", ";\n      border-radius: 100%;\n      border: 2px solid;\n      border-color: ", ";\n      border-bottom-color: transparent;\n      display: inline-block;\n      animation: ", " 0.75s 0s infinite linear;\n      animation-fill-mode: both;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit, color, clip);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? jsx("div", { css: [this.style(), css] }) : null;
    };
    Loader.defaultProps = sizeDefaults(35);
    return Loader;
}(React__default.PureComponent));
var Component$5 = onlyUpdateForKeys(sizeKeys)(Loader$5);
Component$5.defaultProps = Loader$5.defaultProps;
var templateObject_1$5, templateObject_2$5;

var __makeTemplateObject$6 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var rotate = keyframes(templateObject_1$6 || (templateObject_1$6 = __makeTemplateObject$6(["\n  100% {transform: rotate(360deg)}\n"], ["\n  100% {transform: rotate(360deg)}\n"])));
var bounce$1 = keyframes(templateObject_2$6 || (templateObject_2$6 = __makeTemplateObject$6(["\n  0%, 100% {transform: scale(0)}\n  50% {transform: scale(1.0)}\n"], ["\n  0%, 100% {transform: scale(0)}\n  50% {transform: scale(1.0)}\n"])));
var Loader$6 = /** @class */ (function (_super) {
    __extends$6(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, color = _a.color;
            return css(templateObject_3$4 || (templateObject_3$4 = __makeTemplateObject$6(["\n      position: absolute;\n      top: ", ";\n      bottom: ", ";\n      height: ", ";\n      width: ", ";\n      background-color: ", ";\n      border-radius: 100%;\n      animation-fill-mode: forwards;\n      animation: ", " 2s ", " infinite linear;\n    "], ["\n      position: absolute;\n      top: ", ";\n      bottom: ", ";\n      height: ", ";\n      width: ", ";\n      background-color: ", ";\n      border-radius: 100%;\n      animation-fill-mode: forwards;\n      animation: ", " 2s ", " infinite linear;\n    "])), i % 2 ? "0" : "auto", i % 2 ? "auto" : "0", "" + size / 2 + sizeUnit, "" + size / 2 + sizeUnit, color, bounce$1, i === 2 ? "-1s" : "0s");
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_4$2 || (templateObject_4$2 = __makeTemplateObject$6(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      animation-fill-mode: forwards;\n      animation: ", " 2s 0s infinite linear;\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      animation-fill-mode: forwards;\n      animation: ", " 2s 0s infinite linear;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit, rotate);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = sizeDefaults(60);
    return Loader;
}(React__default.PureComponent));
var Component$6 = onlyUpdateForKeys(sizeKeys)(Loader$6);
Component$6.defaultProps = Loader$6.defaultProps;
var templateObject_1$6, templateObject_2$6, templateObject_3$4, templateObject_4$2;

var __makeTemplateObject$7 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var fade = keyframes(templateObject_1$7 || (templateObject_1$7 = __makeTemplateObject$7(["\n  50% {opacity: 0.3}\n  100% {opacity: 1}\n"], ["\n  50% {opacity: 0.3}\n  100% {opacity: 1}\n"])));
var Loader$7 = /** @class */ (function (_super) {
    __extends$7(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.radius = 20;
        _this.quarter = _this.radius / 2 + _this.radius / 5.5;
        _this.style = function (i) {
            var _a = _this.props, height = _a.height, width = _a.width, margin = _a.margin, color = _a.color, radius = _a.radius, widthUnit = _a.widthUnit, heightUnit = _a.heightUnit, radiusUnit = _a.radiusUnit;
            return css(templateObject_2$7 || (templateObject_2$7 = __makeTemplateObject$7(["\n      position: absolute;\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      background-color: ", ";\n      border-radius: ", ";\n      transition: 2s;\n      animation-fill-mode: \"both\";\n      animation: ", " 1.2s ", "s infinite ease-in-out;\n    "], ["\n      position: absolute;\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      background-color: ", ";\n      border-radius: ", ";\n      transition: 2s;\n      animation-fill-mode: \"both\";\n      animation: ", " 1.2s ", "s infinite ease-in-out;\n    "])), "" + width + widthUnit, "" + height + heightUnit, margin, color, "" + radius + radiusUnit, fade, i * 0.12);
        };
        _this.wrapper = function () {
            return css(templateObject_3$5 || (templateObject_3$5 = __makeTemplateObject$7(["\n      position: relative;\n      font-size: 0;\n      top: ", "px;\n      left: ", "px;\n      width: ", "px;\n      height: ", "px;\n    "], ["\n      position: relative;\n      font-size: 0;\n      top: ", "px;\n      left: ", "px;\n      width: ", "px;\n      height: ", "px;\n    "])), _this.radius, _this.radius, _this.radius * 3, _this.radius * 3);
        };
        _this.a = function () { return css(templateObject_4$3 || (templateObject_4$3 = __makeTemplateObject$7(["\n    ", ";\n    top: ", "px;\n    left: 0;\n  "], ["\n    ", ";\n    top: ", "px;\n    left: 0;\n  "])), _this.style(1), _this.radius); };
        _this.b = function () { return css(templateObject_5$1 || (templateObject_5$1 = __makeTemplateObject$7(["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(-45deg);\n  "], ["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(-45deg);\n  "])), _this.style(2), _this.quarter, _this.quarter); };
        _this.c = function () { return css(templateObject_6 || (templateObject_6 = __makeTemplateObject$7(["\n    ", ";\n    top: 0;\n    left: ", "px;\n    transform: rotate(90deg);\n  "], ["\n    ", ";\n    top: 0;\n    left: ", "px;\n    transform: rotate(90deg);\n  "])), _this.style(3), _this.radius); };
        _this.d = function () { return css(templateObject_7 || (templateObject_7 = __makeTemplateObject$7(["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(45deg);\n  "], ["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(45deg);\n  "])), _this.style(4), -_this.quarter, _this.quarter); };
        _this.e = function () { return css(templateObject_8 || (templateObject_8 = __makeTemplateObject$7(["\n    ", ";\n    top: ", "px;\n    left: 0;\n  "], ["\n    ", ";\n    top: ", "px;\n    left: 0;\n  "])), _this.style(5), -_this.radius); };
        _this.f = function () { return css(templateObject_9 || (templateObject_9 = __makeTemplateObject$7(["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(-45deg);\n  "], ["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(-45deg);\n  "])), _this.style(6), -_this.quarter, -_this.quarter); };
        _this.g = function () { return css(templateObject_10 || (templateObject_10 = __makeTemplateObject$7(["\n    ", ";\n    top: 0;\n    left: ", "px;\n    transform: rotate(90deg);\n  "], ["\n    ", ";\n    top: 0;\n    left: ", "px;\n    transform: rotate(90deg);\n  "])), _this.style(7), -_this.radius); };
        _this.h = function () { return css(templateObject_11 || (templateObject_11 = __makeTemplateObject$7(["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(45deg);\n  "], ["\n    ", ";\n    top: ", "px;\n    left: ", "px;\n    transform: rotate(45deg);\n  "])), _this.style(8), _this.quarter, -_this.quarter); };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.a() }),
            jsx("div", { css: this.b() }),
            jsx("div", { css: this.c() }),
            jsx("div", { css: this.d() }),
            jsx("div", { css: this.e() }),
            jsx("div", { css: this.f() }),
            jsx("div", { css: this.g() }),
            jsx("div", { css: this.h() }))) : null;
    };
    Loader.defaultProps = heightWidthRadiusDefaults(15, 5, 2);
    return Loader;
}(React__default.PureComponent));
var Component$7 = onlyUpdateForKeys(heightWidthRadiusKeys)(Loader$7);
Component$7.defaultProps = Loader$7.defaultProps;
var templateObject_1$7, templateObject_2$7, templateObject_3$5, templateObject_4$3, templateObject_5$1, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;

var __makeTemplateObject$8 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var grid = keyframes(templateObject_1$8 || (templateObject_1$8 = __makeTemplateObject$8(["\n  0% {transform: scale(1)}\n  50% {transform: scale(0.5); opacity: 0.7}\n  100% {transform: scale(1);opacity: 1}\n"], ["\n  0% {transform: scale(1)}\n  50% {transform: scale(0.5); opacity: 0.7}\n  100% {transform: scale(1);opacity: 1}\n"])));
var random = function (top) { return Math.random() * top; };
var Loader$8 = /** @class */ (function (_super) {
    __extends$8(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (rand) {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_2$8 || (templateObject_2$8 = __makeTemplateObject$8(["\n      display: inline-block;\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      animation-fill-mode: \"both\";\n      animation: ", " ", "s ", "s infinite ease;\n    "], ["\n      display: inline-block;\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      animation-fill-mode: \"both\";\n      animation: ", " ", "s ", "s infinite ease;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, margin, grid, rand / 100 + 0.6, rand / 100 - 0.2);
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_3$6 || (templateObject_3$6 = __makeTemplateObject$8(["\n      width: ", ";\n      font-size: 0;\n    "], ["\n      width: ", ";\n      font-size: 0;\n    "])), "" + (parseFloat(size.toString()) * 3 + parseFloat(margin) * 6) + sizeUnit);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }),
            jsx("div", { css: this.style(random(100)) }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$8 = onlyUpdateForKeys(sizeMarginKeys)(Loader$8);
Component$8.defaultProps = Loader$8.defaultProps;
var templateObject_1$8, templateObject_2$8, templateObject_3$6;

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject$9 = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var Loader$9 = /** @class */ (function (_super) {
    __extends$9(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.thickness = function () {
            var size = _this.props.size;
            return size / 5;
        };
        _this.lat = function () {
            var size = _this.props.size;
            return (size - _this.thickness()) / 2;
        };
        _this.offset = function () { return _this.lat() - _this.thickness(); };
        _this.color = function () {
            var color = _this.props.color;
            return calculateRgba(color, 0.75);
        };
        _this.before = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            var color = _this.color();
            var lat = _this.lat();
            var thickness = _this.thickness();
            var offset = _this.offset();
            return keyframes(templateObject_1$9 || (templateObject_1$9 = __makeTemplateObject$9(["\n      0% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {width: ", ";box-shadow: 0 ", "px ", ", 0 ", "px ", "}\n      70% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "], ["\n      0% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {width: ", ";box-shadow: 0 ", "px ", ", 0 ", "px ", "}\n      70% {width: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "])), thickness, lat, -offset, color, -lat, offset, color, "" + size + sizeUnit, -offset, color, offset, color, thickness, -lat, -offset, color, lat, offset, color, lat, -offset, color, -lat, offset, color);
        };
        _this.after = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            var color = _this.color();
            var lat = _this.lat();
            var thickness = _this.thickness();
            var offset = _this.offset();
            return keyframes(templateObject_2$9 || (templateObject_2$9 = __makeTemplateObject$9(["\n      0% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {height: ", ";box-shadow: ", "px 0 ", ", ", "px 0 ", "}\n      70% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "], ["\n      0% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      35% {height: ", ";box-shadow: ", "px 0 ", ", ", "px 0 ", "}\n      70% {height: ", "px;box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n      100% {box-shadow: ", "px ", "px ", ", ", "px ", "px ", "}\n    "])), thickness, offset, lat, color, -offset, -lat, color, "" + size + sizeUnit, offset, color, -offset, color, thickness, offset, -lat, color, -offset, lat, color, offset, lat, color, -offset, -lat, color);
        };
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_3$7 || (templateObject_3$7 = __makeTemplateObject$9(["\n      position: absolute;\n      content: \"\";\n      top: 50%;\n      left: 50%;\n      display: block;\n      width: ", ";\n      height: ", ";\n      border-radius: ", ";\n      transform: translate(-50%, -50%);\n      animation-fill-mode: none;\n      animation: ", " 2s infinite;\n    "], ["\n      position: absolute;\n      content: \"\";\n      top: 50%;\n      left: 50%;\n      display: block;\n      width: ", ";\n      height: ", ";\n      border-radius: ", ";\n      transform: translate(-50%, -50%);\n      animation-fill-mode: none;\n      animation: ", " 2s infinite;\n    "])), "" + size / 5 + sizeUnit, "" + size / 5 + sizeUnit, "" + size / 10 + sizeUnit, i === 1 ? _this.before() : _this.after());
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_4$4 || (templateObject_4$4 = __makeTemplateObject$9(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      transform: rotate(165deg);\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      transform: rotate(165deg);\n    "])), "" + size + sizeUnit, "" + size + sizeUnit);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = sizeDefaults(50);
    return Loader;
}(React__default.PureComponent));
var Component$9 = onlyUpdateForKeys(sizeKeys)(Loader$9);
Component$9.defaultProps = Loader$9.defaultProps;
var templateObject_1$9, templateObject_2$9, templateObject_3$7, templateObject_4$4;

var __makeTemplateObject$a = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var moon = keyframes(templateObject_1$a || (templateObject_1$a = __makeTemplateObject$a(["\n  100% {transform: rotate(360deg)}\n"], ["\n  100% {transform: rotate(360deg)}\n"])));
var Loader$a = /** @class */ (function (_super) {
    __extends$a(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moonSize = function () {
            var size = _this.props.size;
            return size / 7;
        };
        _this.ballStyle = function (size) {
            var sizeUnit = _this.props.sizeUnit;
            return css(templateObject_2$a || (templateObject_2$a = __makeTemplateObject$a(["\n      width: ", ";\n      height: ", ";\n      border-radius: 100%;\n    "], ["\n      width: ", ";\n      height: ", ";\n      border-radius: 100%;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit);
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_3$8 || (templateObject_3$8 = __makeTemplateObject$a(["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      animation: ", " 0.6s 0s infinite linear;\n      animation-fill-mode: forwards;\n    "], ["\n      position: relative;\n      width: ", ";\n      height: ", ";\n      animation: ", " 0.6s 0s infinite linear;\n      animation-fill-mode: forwards;\n    "])), "" + (size + _this.moonSize() * 2) + sizeUnit, "" + (size + _this.moonSize() * 2) + sizeUnit, moon);
        };
        _this.ball = function () {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_4$5 || (templateObject_4$5 = __makeTemplateObject$a(["\n      ", ";\n      background-color: ", ";\n      opacity: 0.8;\n      position: absolute;\n      top: ", ";\n      animation: ", " 0.6s 0s infinite linear;\n      animation-fill-mode: forwards;\n    "], ["\n      ", ";\n      background-color: ", ";\n      opacity: 0.8;\n      position: absolute;\n      top: ", ";\n      animation: ", " 0.6s 0s infinite linear;\n      animation-fill-mode: forwards;\n    "])), _this.ballStyle(_this.moonSize()), color, "" + (size / 2 - _this.moonSize() / 2) + sizeUnit, moon);
        };
        _this.circle = function () {
            var _a = _this.props, size = _a.size, color = _a.color;
            return css(templateObject_5$2 || (templateObject_5$2 = __makeTemplateObject$a(["\n      ", ";\n      border: ", "px solid ", ";\n      opacity: 0.1;\n    "], ["\n      ", ";\n      border: ", "px solid ", ";\n      opacity: 0.1;\n    "])), _this.ballStyle(size), _this.moonSize(), color);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.ball() }),
            jsx("div", { css: this.circle() }))) : null;
    };
    Loader.defaultProps = sizeDefaults(60);
    return Loader;
}(React__default.PureComponent));
var Component$a = onlyUpdateForKeys(sizeKeys)(Loader$a);
Component$a.defaultProps = Loader$a.defaultProps;
var templateObject_1$a, templateObject_2$a, templateObject_3$8, templateObject_4$5, templateObject_5$2;

var __makeTemplateObject$b = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pacman = [
    keyframes(templateObject_1$b || (templateObject_1$b = __makeTemplateObject$b(["\n    0% {transform: rotate(0deg)}\n    50% {transform: rotate(-44deg)}\n  "], ["\n    0% {transform: rotate(0deg)}\n    50% {transform: rotate(-44deg)}\n  "]))),
    keyframes(templateObject_2$b || (templateObject_2$b = __makeTemplateObject$b(["\n    0% {transform: rotate(0deg)}\n    50% {transform: rotate(44deg)}\n  "], ["\n    0% {transform: rotate(0deg)}\n    50% {transform: rotate(44deg)}\n  "])))
];
var Loader$b = /** @class */ (function (_super) {
    __extends$b(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ball = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return keyframes(templateObject_3$9 || (templateObject_3$9 = __makeTemplateObject$b(["\n      75% {opacity: 0.7}\n      100% {transform: translate(", ", ", ")}\n    "], ["\n      75% {opacity: 0.7}\n      100% {transform: translate(", ", ", ")}\n    "])), "" + -4 * size + sizeUnit, "" + -size / 4 + sizeUnit);
        };
        _this.ballStyle = function (i) {
            var _a = _this.props, color = _a.color, margin = _a.margin, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_4$6 || (templateObject_4$6 = __makeTemplateObject$b(["\n      width: ", ";\n      height: ", ";\n      background-color: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      transform: translate(0, ", ");\n      position: absolute;\n      top: ", "px;\n      left: ", ";\n      animation: ", " 1s ", "s infinite linear;\n      animation-fill-mode: both;\n    "], ["\n      width: ", ";\n      height: ", ";\n      background-color: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      transform: translate(0, ", ");\n      position: absolute;\n      top: ", "px;\n      left: ", ";\n      animation: ", " 1s ", "s infinite linear;\n      animation-fill-mode: both;\n    "])), "" + size / 3 + sizeUnit, "" + size / 3 + sizeUnit, color, margin, "" + -size / 4 + sizeUnit, size, "" + size * 4 + sizeUnit, _this.ball(), i * 0.25);
        };
        _this.s1 = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return "" + size + sizeUnit + " solid transparent";
        };
        _this.s2 = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, color = _a.color;
            return "" + size + sizeUnit + " solid " + color;
        };
        _this.pacmanStyle = function (i) {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            var s1 = _this.s1();
            var s2 = _this.s2();
            return css(templateObject_5$3 || (templateObject_5$3 = __makeTemplateObject$b(["\n      width: 0;\n      height: 0;\n      border-right: ", ";\n      border-top: ", ";\n      border-left: ", ";\n      border-bottom: ", ";\n      border-radius: ", ";\n      position: absolute;\n      animation: ", " 0.8s infinite ease-in-out;\n      animation-fill-mode: both;\n    "], ["\n      width: 0;\n      height: 0;\n      border-right: ", ";\n      border-top: ", ";\n      border-left: ", ";\n      border-bottom: ", ";\n      border-radius: ", ";\n      position: absolute;\n      animation: ", " 0.8s infinite ease-in-out;\n      animation-fill-mode: both;\n    "])), s1, i === 0 ? s1 : s2, s2, i === 0 ? s2 : s1, "" + size + sizeUnit, pacman[i]);
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_6$1 || (templateObject_6$1 = __makeTemplateObject$b(["\n      position: relative;\n      font-size: 0;\n      height: ", ";\n      width: ", ";\n    "], ["\n      position: relative;\n      font-size: 0;\n      height: ", ";\n      width: ", ";\n    "])), "" + size + sizeUnit, "" + size + sizeUnit);
        };
        _this.pac = function () { return _this.pacmanStyle(0); };
        _this.man = function () { return _this.pacmanStyle(1); };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.pac() }),
            jsx("div", { css: this.man() }),
            jsx("div", { css: this.ballStyle(2) }),
            jsx("div", { css: this.ballStyle(3) }),
            jsx("div", { css: this.ballStyle(4) }),
            jsx("div", { css: this.ballStyle(5) }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(25);
    return Loader;
}(React__default.PureComponent));
var Component$b = onlyUpdateForKeys(sizeMarginKeys)(Loader$b);
Component$b.defaultProps = Loader$b.defaultProps;
var templateObject_1$b, templateObject_2$b, templateObject_3$9, templateObject_4$6, templateObject_5$3, templateObject_6$1;

var __makeTemplateObject$c = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 1.5 4.5 7.5
var distance = [1, 3, 5];
var propagate = [
    keyframes(templateObject_1$c || (templateObject_1$c = __makeTemplateObject$c(["\n      25% {transform: translateX(-", "rem) scale(0.75)}\n      50% {transform: translateX(-", "rem) scale(0.6)}\n      75% {transform: translateX(-", "rem) scale(0.5)}\n      95% {transform: translateX(0rem) scale(1)}\n    "], ["\n      25% {transform: translateX(-", "rem) scale(0.75)}\n      50% {transform: translateX(-", "rem) scale(0.6)}\n      75% {transform: translateX(-", "rem) scale(0.5)}\n      95% {transform: translateX(0rem) scale(1)}\n    "])), distance[0], distance[1], distance[2]),
    keyframes(templateObject_2$c || (templateObject_2$c = __makeTemplateObject$c(["\n      25% {transform: translateX(-", "rem) scale(0.75)}\n      50% {transform: translateX(-", "rem) scale(0.6)}\n      75% {transform: translateX(-", "rem) scale(0.6)}\n      95% {transform: translateX(0rem) scale(1)}\n    "], ["\n      25% {transform: translateX(-", "rem) scale(0.75)}\n      50% {transform: translateX(-", "rem) scale(0.6)}\n      75% {transform: translateX(-", "rem) scale(0.6)}\n      95% {transform: translateX(0rem) scale(1)}\n    "])), distance[0], distance[1], distance[1]),
    keyframes(templateObject_3$a || (templateObject_3$a = __makeTemplateObject$c(["\n      25% {transform: translateX(-", "rem) scale(0.75)}\n      75% {transform: translateX(-", "rem) scale(0.75)}\n      95% {transform: translateX(0rem) scale(1)}\n    "], ["\n      25% {transform: translateX(-", "rem) scale(0.75)}\n      75% {transform: translateX(-", "rem) scale(0.75)}\n      95% {transform: translateX(0rem) scale(1)}\n    "])), distance[0], distance[0]),
    keyframes(templateObject_4$7 || (templateObject_4$7 = __makeTemplateObject$c(["\n      25% {transform: translateX(", "rem) scale(0.75)}\n      75% {transform: translateX(", "rem) scale(0.75)}\n      95% {transform: translateX(0rem) scale(1)}\n    "], ["\n      25% {transform: translateX(", "rem) scale(0.75)}\n      75% {transform: translateX(", "rem) scale(0.75)}\n      95% {transform: translateX(0rem) scale(1)}\n    "])), distance[0], distance[0]),
    keyframes(templateObject_5$4 || (templateObject_5$4 = __makeTemplateObject$c(["\n      25% {transform: translateX(", "rem) scale(0.75)}\n      50% {transform: translateX(", "rem) scale(0.6)}\n      75% {transform: translateX(", "rem) scale(0.6)}\n      95% {transform: translateX(0rem) scale(1)}\n    "], ["\n      25% {transform: translateX(", "rem) scale(0.75)}\n      50% {transform: translateX(", "rem) scale(0.6)}\n      75% {transform: translateX(", "rem) scale(0.6)}\n      95% {transform: translateX(0rem) scale(1)}\n    "])), distance[0], distance[1], distance[1]),
    keyframes(templateObject_6$2 || (templateObject_6$2 = __makeTemplateObject$c(["\n      25% {transform: translateX(", "rem) scale(0.75)}\n      50% {transform: translateX(", "rem) scale(0.6)}\n      75% {transform: translateX(", "rem) scale(0.5)}\n      95% {transform: translateX(0rem) scale(1)}\n    "], ["\n      25% {transform: translateX(", "rem) scale(0.75)}\n      50% {transform: translateX(", "rem) scale(0.6)}\n      75% {transform: translateX(", "rem) scale(0.5)}\n      95% {transform: translateX(0rem) scale(1)}\n    "])), distance[0], distance[1], distance[2])
];
var Loader$c = /** @class */ (function (_super) {
    __extends$c(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, color = _a.color;
            return css(templateObject_7$1 || (templateObject_7$1 = __makeTemplateObject$c(["\n      position: absolute;\n      font-size: ", ";\n      width: ", ";\n      height: ", ";\n      background: ", ";\n      border-radius: 50%;\n      animation: ", " 1.5s infinite;\n      animation-fill-mode: forwards;\n    "], ["\n      position: absolute;\n      font-size: ", ";\n      width: ", ";\n      height: ", ";\n      background: ", ";\n      border-radius: 50%;\n      animation: ", " 1.5s infinite;\n      animation-fill-mode: forwards;\n    "])), "" + size / 3 + sizeUnit, "" + size + sizeUnit, "" + size + sizeUnit, color, propagate[i]);
        };
        _this.wrapper = function () {
            return css(templateObject_8$1 || (templateObject_8$1 = __makeTemplateObject$c(["\n      position: relative;\n    "], ["\n      position: relative;\n    "])));
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(0) }),
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }),
            jsx("div", { css: this.style(4) }),
            jsx("div", { css: this.style(5) }))) : null;
    };
    Loader.defaultProps = sizeDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$c = onlyUpdateForKeys(sizeKeys)(Loader$c);
Component$c.defaultProps = Loader$c.defaultProps;
var templateObject_1$c, templateObject_2$c, templateObject_3$a, templateObject_4$7, templateObject_5$4, templateObject_6$2, templateObject_7$1, templateObject_8$1;

var __makeTemplateObject$d = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pulse = keyframes(templateObject_1$d || (templateObject_1$d = __makeTemplateObject$d(["\n  0% {transform: scale(1);opacity: 1}\n  45% {transform: scale(0.1);opacity: 0.7}\n  80% {transform: scale(1);opacity: 1}\n"], ["\n  0% {transform: scale(1);opacity: 1}\n  45% {transform: scale(0.1);opacity: 0.7}\n  80% {transform: scale(1);opacity: 1}\n"])));
var Loader$d = /** @class */ (function (_super) {
    __extends$d(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_2$d || (templateObject_2$d = __makeTemplateObject$d(["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      display: inline-block;\n      animation: ", " 0.75s ", "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);\n      animation-fill-mode: both;\n    "], ["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      display: inline-block;\n      animation: ", " 0.75s ", "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);\n      animation-fill-mode: both;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, margin, pulse, i * 0.12);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$d = onlyUpdateForKeys(sizeMarginKeys)(Loader$d);
Component$d.defaultProps = Loader$d.defaultProps;
var templateObject_1$d, templateObject_2$d;

var __makeTemplateObject$e = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var right = keyframes(templateObject_1$e || (templateObject_1$e = __makeTemplateObject$e(["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}\n"], ["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}\n"])));
var left = keyframes(templateObject_2$e || (templateObject_2$e = __makeTemplateObject$e(["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}\n"], ["\n  0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)}\n  100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}\n"])));
var Loader$e = /** @class */ (function (_super) {
    __extends$e(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, color = _a.color;
            return css(templateObject_3$b || (templateObject_3$b = __makeTemplateObject$e(["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: ", ";\n      height: ", ";\n      border: ", " solid ", ";\n      opacity: 0.4;\n      border-radius: 100%;\n      animation-fill-mode: forwards;\n      perspective: 800px;\n      animation: ", " 2s 0s infinite linear;\n    "], ["\n      position: absolute;\n      top: 0;\n      left: 0;\n      width: ", ";\n      height: ", ";\n      border: ", " solid ", ";\n      opacity: 0.4;\n      border-radius: 100%;\n      animation-fill-mode: forwards;\n      perspective: 800px;\n      animation: ", " 2s 0s infinite linear;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit, "" + size / 10 + sizeUnit, color, i === 1 ? right : left);
        };
        _this.wrapper = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_4$8 || (templateObject_4$8 = __makeTemplateObject$e(["\n      width: ", ";\n      height: ", ";\n      position: relative;\n    "], ["\n      width: ", ";\n      height: ", ";\n      position: relative;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }))) : null;
    };
    Loader.defaultProps = sizeDefaults(60);
    return Loader;
}(React__default.PureComponent));
var Component$e = onlyUpdateForKeys(sizeKeys)(Loader$e);
Component$e.defaultProps = Loader$e.defaultProps;
var templateObject_1$e, templateObject_2$e, templateObject_3$b, templateObject_4$8;

var __makeTemplateObject$f = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var riseAmount = 30;
var even = keyframes(templateObject_1$f || (templateObject_1$f = __makeTemplateObject$f(["\n  0% {transform: scale(1.1)}\n  25% {translateY(-", "px)}\n  50% {transform: scale(0.4)}\n  75% {transform: translateY(", "px)}\n  100% {transform: translateY(0) scale(1.0)}\n"], ["\n  0% {transform: scale(1.1)}\n  25% {translateY(-", "px)}\n  50% {transform: scale(0.4)}\n  75% {transform: translateY(", "px)}\n  100% {transform: translateY(0) scale(1.0)}\n"])), riseAmount, riseAmount);
var odd = keyframes(templateObject_2$f || (templateObject_2$f = __makeTemplateObject$f(["\n  0% {transform: scale(0.4)}\n  25% {translateY(", "px)}\n  50% {transform: scale(1.1)}\n  75% {transform: translateY(", "px)}\n  100% {transform: translateY(0) scale(0.75)}\n"], ["\n  0% {transform: scale(0.4)}\n  25% {translateY(", "px)}\n  50% {transform: scale(1.1)}\n  75% {transform: translateY(", "px)}\n  100% {transform: translateY(0) scale(0.75)}\n"])), riseAmount, -riseAmount);
var Loader$f = /** @class */ (function (_super) {
    __extends$f(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_3$c || (templateObject_3$c = __makeTemplateObject$f(["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      display: inline-block;\n      animation: ", " 1s 0s infinite cubic-bezier(0.15, 0.46, 0.9, 0.6);\n      animation-fill-mode: both;\n    "], ["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      display: inline-block;\n      animation: ", " 1s 0s infinite cubic-bezier(0.15, 0.46, 0.9, 0.6);\n      animation-fill-mode: both;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, "" + margin, i % 2 === 0 ? even : odd);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }),
            jsx("div", { css: this.style(4) }),
            jsx("div", { css: this.style(5) }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$f = onlyUpdateForKeys(sizeMarginKeys)(Loader$f);
Component$f.defaultProps = Loader$f.defaultProps;
var templateObject_1$f, templateObject_2$f, templateObject_3$c;

var __makeTemplateObject$g = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var rotate$1 = keyframes(templateObject_1$g || (templateObject_1$g = __makeTemplateObject$g(["\n  0% {transform: rotate(0deg)}\n  50% {transform: rotate(180deg)}\n  100% {transform: rotate(360deg)}\n"], ["\n  0% {transform: rotate(0deg)}\n  50% {transform: rotate(180deg)}\n  100% {transform: rotate(360deg)}\n"])));
var Loader$g = /** @class */ (function (_super) {
    __extends$g(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) { return css(templateObject_2$g || (templateObject_2$g = __makeTemplateObject$g(["\n    opacity: 0.8;\n    position: absolute;\n    top: 0;\n    left: ", "px;\n  "], ["\n    opacity: 0.8;\n    position: absolute;\n    top: 0;\n    left: ", "px;\n  "])), i % 2 ? -28 : 25); };
        _this.ball = function () {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_3$d || (templateObject_3$d = __makeTemplateObject$g(["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n    "], ["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, margin);
        };
        _this.wrapper = function () {
            return css(templateObject_4$9 || (templateObject_4$9 = __makeTemplateObject$g(["\n      ", ";\n      display: inline-block;\n      position: relative;\n      animation-fill-mode: both;\n      animation: ", " 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);\n    "], ["\n      ", ";\n      display: inline-block;\n      position: relative;\n      animation-fill-mode: both;\n      animation: ", " 1s 0s infinite cubic-bezier(0.7, -0.13, 0.22, 0.86);\n    "])), _this.ball(), rotate$1);
        };
        _this.long = function () { return css(templateObject_5$5 || (templateObject_5$5 = __makeTemplateObject$g(["\n    ", ";\n    ", ";\n  "], ["\n    ", ";\n    ", ";\n  "])), _this.ball(), _this.style(1)); };
        _this.short = function () { return css(templateObject_6$3 || (templateObject_6$3 = __makeTemplateObject$g(["\n    ", ";\n    ", ";\n  "], ["\n    ", ";\n    ", ";\n  "])), _this.ball(), _this.style(2)); };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [this.wrapper(), css] },
            jsx("div", { css: this.long() }),
            jsx("div", { css: this.short() }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$g = onlyUpdateForKeys(sizeMarginKeys)(Loader$g);
Component$g.defaultProps = Loader$g.defaultProps;
var templateObject_1$g, templateObject_2$g, templateObject_3$d, templateObject_4$9, templateObject_5$5, templateObject_6$3;

var __makeTemplateObject$h = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scale = keyframes(templateObject_1$h || (templateObject_1$h = __makeTemplateObject$h(["\n  0% {transform: scaley(1.0)}\n  50% {transform: scaley(0.4)}\n  100% {transform: scaley(1.0)}\n"], ["\n  0% {transform: scaley(1.0)}\n  50% {transform: scaley(0.4)}\n  100% {transform: scaley(1.0)}\n"])));
var Loader$h = /** @class */ (function (_super) {
    __extends$h(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, color = _a.color, width = _a.width, height = _a.height, margin = _a.margin, radius = _a.radius, widthUnit = _a.widthUnit, heightUnit = _a.heightUnit, radiusUnit = _a.radiusUnit;
            return css(templateObject_2$h || (templateObject_2$h = __makeTemplateObject$h(["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: ", ";\n      display: inline-block;\n      animation: ", " 1s ", "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);\n      animation-fill-mode: both;\n    "], ["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: ", ";\n      display: inline-block;\n      animation: ", " 1s ", "s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);\n      animation-fill-mode: both;\n    "])), color, "" + width + widthUnit, "" + height + heightUnit, margin, "" + radius + radiusUnit, scale, i * 0.1);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }),
            jsx("div", { css: this.style(4) }),
            jsx("div", { css: this.style(5) }))) : null;
    };
    Loader.defaultProps = heightWidthRadiusDefaults(35, 4, 2);
    return Loader;
}(React__default.PureComponent));
var Component$h = onlyUpdateForKeys(heightWidthRadiusKeys)(Loader$h);
Component$h.defaultProps = Loader$h.defaultProps;
var templateObject_1$h, templateObject_2$h;

var __makeTemplateObject$i = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$i = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var skew = keyframes(templateObject_1$i || (templateObject_1$i = __makeTemplateObject$i(["\n  25% {transform: perspective(100px) rotateX(180deg) rotateY(0)}\n  50% {transform: perspective(100px) rotateX(180deg) rotateY(180deg)}\n  75% {transform: perspective(100px) rotateX(0) rotateY(180deg)}\n  100% {transform: perspective(100px) rotateX(0) rotateY(0)}\n"], ["\n  25% {transform: perspective(100px) rotateX(180deg) rotateY(0)}\n  50% {transform: perspective(100px) rotateX(180deg) rotateY(180deg)}\n  75% {transform: perspective(100px) rotateX(0) rotateY(180deg)}\n  100% {transform: perspective(100px) rotateX(0) rotateY(0)}\n"])));
var Loader$i = /** @class */ (function (_super) {
    __extends$i(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function () {
            var _a = _this.props, size = _a.size, sizeUnit = _a.sizeUnit, color = _a.color;
            return css(templateObject_2$i || (templateObject_2$i = __makeTemplateObject$i(["\n      width: 0;\n      height: 0;\n      border-left: ", " solid transparent;\n      border-right: ", " solid transparent;\n      border-bottom: ", " solid ", ";\n      display: inline-block;\n      animation: ", " 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);\n      animation-fill-mode: both;\n    "], ["\n      width: 0;\n      height: 0;\n      border-left: ", " solid transparent;\n      border-right: ", " solid transparent;\n      border-bottom: ", " solid ", ";\n      display: inline-block;\n      animation: ", " 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);\n      animation-fill-mode: both;\n    "])), "" + size + sizeUnit, "" + size + sizeUnit, "" + size + sizeUnit, color, skew);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? jsx("div", { css: [this.style(), css] }) : null;
    };
    Loader.defaultProps = sizeDefaults(20);
    return Loader;
}(React__default.PureComponent));
var Component$i = onlyUpdateForKeys(sizeKeys)(Loader$i);
Component$i.defaultProps = Loader$i.defaultProps;
var templateObject_1$i, templateObject_2$i;

var __makeTemplateObject$j = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$j = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var square = keyframes(templateObject_1$j || (templateObject_1$j = __makeTemplateObject$j(["\n  25% {transform: rotateX(180deg) rotateY(0)}\n  50% {transform: rotateX(180deg) rotateY(180deg)}\n  75% {transform: rotateX(0) rotateY(180deg)}\n  100% {transform: rotateX(0) rotateY(0)}\n"], ["\n  25% {transform: rotateX(180deg) rotateY(0)}\n  50% {transform: rotateX(180deg) rotateY(180deg)}\n  75% {transform: rotateX(0) rotateY(180deg)}\n  100% {transform: rotateX(0) rotateY(0)}\n"])));
var Loader$j = /** @class */ (function (_super) {
    __extends$j(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function () {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit;
            return css(templateObject_2$j || (templateObject_2$j = __makeTemplateObject$j(["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      display: inline-block;\n      animation: ", " 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);\n      animation-fill-mode: both;\n    "], ["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      display: inline-block;\n      animation: ", " 3s 0s infinite cubic-bezier(0.09, 0.57, 0.49, 0.9);\n      animation-fill-mode: both;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, square);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? jsx("div", { css: [this.style(), css] }) : null;
    };
    Loader.defaultProps = sizeDefaults(50);
    return Loader;
}(React__default.PureComponent));
var Component$j = onlyUpdateForKeys(sizeKeys)(Loader$j);
Component$j.defaultProps = Loader$j.defaultProps;
var templateObject_1$j, templateObject_2$j;

var __makeTemplateObject$k = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends$k = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sync = keyframes(templateObject_1$k || (templateObject_1$k = __makeTemplateObject$k(["\n  33% {transform: translateY(10px)}\n  66% {transform: translateY(-10px)}\n  100% {transform: translateY(0)}\n"], ["\n  33% {transform: translateY(10px)}\n  66% {transform: translateY(-10px)}\n  100% {transform: translateY(0)}\n"])));
var Loader$k = /** @class */ (function (_super) {
    __extends$k(Loader, _super);
    function Loader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = function (i) {
            var _a = _this.props, color = _a.color, size = _a.size, sizeUnit = _a.sizeUnit, margin = _a.margin;
            return css(templateObject_2$k || (templateObject_2$k = __makeTemplateObject$k(["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      display: inline-block;\n      animation: ", " 0.6s ", "s infinite ease-in-out;\n      animation-fill-mode: both;\n    "], ["\n      background-color: ", ";\n      width: ", ";\n      height: ", ";\n      margin: ", ";\n      border-radius: 100%;\n      display: inline-block;\n      animation: ", " 0.6s ", "s infinite ease-in-out;\n      animation-fill-mode: both;\n    "])), color, "" + size + sizeUnit, "" + size + sizeUnit, margin, sync, i * 0.07);
        };
        return _this;
    }
    Loader.prototype.render = function () {
        var _a = this.props, loading = _a.loading, css = _a.css;
        return loading ? (jsx("div", { css: [css] },
            jsx("div", { css: this.style(1) }),
            jsx("div", { css: this.style(2) }),
            jsx("div", { css: this.style(3) }))) : null;
    };
    Loader.defaultProps = sizeMarginDefaults(15);
    return Loader;
}(React__default.PureComponent));
var Component$k = onlyUpdateForKeys(sizeMarginKeys)(Loader$k);
Component$k.defaultProps = Loader$k.defaultProps;
var templateObject_1$k, templateObject_2$k;

var ClipLoader = Component$5;

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  position: absolute;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var LoaderWrapper = styled.div(_templateObject$1());
function Loader$l(props) {
  var size = props.size,
      color = props.color;
  return React__default.createElement(LoaderWrapper, null, React__default.createElement(ClipLoader, {
    sizeUnit: "px",
    size: size,
    color: color
  }));
}
Loader$l.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
};

function _extends$1() {
  _extends$1 = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends$1.apply(this, arguments);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 * @private
 */


var PolishedError =
/*#__PURE__*/
function (_Error) {
  _inheritsLoose$1(PolishedError, _Error);

  function PolishedError(code) {
    var _this;

    {
      _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/master/src/internalHelpers/errors.md#" + code + " for more information.") || this;
    }

    return _assertThisInitialized(_this);
  }

  return PolishedError;
}(
/*#__PURE__*/
_wrapNativeSuper(Error));

function colorToInt(color) {
  return Math.round(color * 255);
}

function convertToInt(red, green, blue) {
  return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
}

function hslToRgb(hue, saturation, lightness, convert) {
  if (convert === void 0) {
    convert = convertToInt;
  }

  if (saturation === 0) {
    // achromatic
    return convert(lightness, lightness, lightness);
  } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV


  var huePrime = (hue % 360 + 360) % 360 / 60;
  var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
  var red = 0;
  var green = 0;
  var blue = 0;

  if (huePrime >= 0 && huePrime < 1) {
    red = chroma;
    green = secondComponent;
  } else if (huePrime >= 1 && huePrime < 2) {
    red = secondComponent;
    green = chroma;
  } else if (huePrime >= 2 && huePrime < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (huePrime >= 3 && huePrime < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    red = secondComponent;
    blue = chroma;
  } else if (huePrime >= 5 && huePrime < 6) {
    red = chroma;
    blue = secondComponent;
  }

  var lightnessModification = lightness - chroma / 2;
  var finalRed = red + lightnessModification;
  var finalGreen = green + lightnessModification;
  var finalBlue = blue + lightnessModification;
  return convert(finalRed, finalGreen, finalBlue);
}

var namedColorMap = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '00ffff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '0000ff',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '00ffff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'ff00ff',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '639',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
  /**
   * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
   * @private
   */

};

function nameToHex(color) {
  if (typeof color !== 'string') return color;
  var normalizedColorName = color.toLowerCase();
  return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
}

var hexRegex = /^#[a-fA-F0-9]{6}$/;
var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i;
var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
/**
 * Returns an RgbColor or RgbaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a RgbColor or RgbaColor object back to a string.
 *
 * @example
 * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
 * const color1 = parseToRgb('rgb(255, 0, 0)');
 * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
 * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
 */

function parseToRgb(color) {
  if (typeof color !== 'string') {
    throw new PolishedError(3);
  }

  var normalizedColor = nameToHex(color);

  if (normalizedColor.match(hexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
    };
  }

  if (normalizedColor.match(hexRgbaRegex)) {
    var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
      green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
      blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
      alpha: alpha
    };
  }

  if (normalizedColor.match(reducedHexRegex)) {
    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
    };
  }

  if (normalizedColor.match(reducedRgbaHexRegex)) {
    var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

    return {
      red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
      green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
      blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
      alpha: _alpha
    };
  }

  var rgbMatched = rgbRegex.exec(normalizedColor);

  if (rgbMatched) {
    return {
      red: parseInt("" + rgbMatched[1], 10),
      green: parseInt("" + rgbMatched[2], 10),
      blue: parseInt("" + rgbMatched[3], 10)
    };
  }

  var rgbaMatched = rgbaRegex.exec(normalizedColor);

  if (rgbaMatched) {
    return {
      red: parseInt("" + rgbaMatched[1], 10),
      green: parseInt("" + rgbaMatched[2], 10),
      blue: parseInt("" + rgbaMatched[3], 10),
      alpha: parseFloat("" + rgbaMatched[4])
    };
  }

  var hslMatched = hslRegex.exec(normalizedColor);

  if (hslMatched) {
    var hue = parseInt("" + hslMatched[1], 10);
    var saturation = parseInt("" + hslMatched[2], 10) / 100;
    var lightness = parseInt("" + hslMatched[3], 10) / 100;
    var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
    var hslRgbMatched = rgbRegex.exec(rgbColorString);

    if (!hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, rgbColorString);
    }

    return {
      red: parseInt("" + hslRgbMatched[1], 10),
      green: parseInt("" + hslRgbMatched[2], 10),
      blue: parseInt("" + hslRgbMatched[3], 10)
    };
  }

  var hslaMatched = hslaRegex.exec(normalizedColor);

  if (hslaMatched) {
    var _hue = parseInt("" + hslaMatched[1], 10);

    var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

    var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

    var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

    var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

    if (!_hslRgbMatched) {
      throw new PolishedError(4, normalizedColor, _rgbColorString);
    }

    return {
      red: parseInt("" + _hslRgbMatched[1], 10),
      green: parseInt("" + _hslRgbMatched[2], 10),
      blue: parseInt("" + _hslRgbMatched[3], 10),
      alpha: parseFloat("" + hslaMatched[4])
    };
  }

  throw new PolishedError(5);
}

function rgbToHsl(color) {
  // make sure rgb are contained in a set of [0, 255]
  var red = color.red / 255;
  var green = color.green / 255;
  var blue = color.blue / 255;
  var max = Math.max(red, green, blue);
  var min = Math.min(red, green, blue);
  var lightness = (max + min) / 2;

  if (max === min) {
    // achromatic
    if (color.alpha !== undefined) {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness,
        alpha: color.alpha
      };
    } else {
      return {
        hue: 0,
        saturation: 0,
        lightness: lightness
      };
    }
  }

  var hue;
  var delta = max - min;
  var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

  switch (max) {
    case red:
      hue = (green - blue) / delta + (green < blue ? 6 : 0);
      break;

    case green:
      hue = (blue - red) / delta + 2;
      break;

    default:
      // blue case
      hue = (red - green) / delta + 4;
      break;
  }

  hue *= 60;

  if (color.alpha !== undefined) {
    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness,
      alpha: color.alpha
    };
  }

  return {
    hue: hue,
    saturation: saturation,
    lightness: lightness
  };
}

/**
 * Returns an HslColor or HslaColor object. This utility function is only useful
 * if want to extract a color component. With the color util `toColorString` you
 * can convert a HslColor or HslaColor object back to a string.
 *
 * @example
 * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
 * const color1 = parseToHsl('rgb(255, 0, 0)');
 * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
 * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
 */
function parseToHsl(color) {
  // Note: At a later stage we can optimize this function as right now a hsl
  // color would be parsed converted to rgb values and converted back to hsl.
  return rgbToHsl(parseToRgb(color));
}

/**
 * Reduces hex values if possible e.g. #ff8866 to #f86
 * @private
 */
var reduceHexValue = function reduceHexValue(value) {
  if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
    return "#" + value[1] + value[3] + value[5];
  }

  return value;
};

function numberToHex(value) {
  var hex = value.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function colorToHex(color) {
  return numberToHex(Math.round(color * 255));
}

function convertToHex(red, green, blue) {
  return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
}

function hslToHex(hue, saturation, lightness) {
  return hslToRgb(hue, saturation, lightness, convertToHex);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsl(359, 0.75, 0.4),
 *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsl(359, 0.75, 0.4)};
 *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#b3191c";
 *   background: "#b3191c";
 * }
 */
function hsl(value, saturation, lightness) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
    return hslToHex(value, saturation, lightness);
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
    return hslToHex(value.hue, value.saturation, value.lightness);
  }

  throw new PolishedError(1);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: hsla(359, 0.75, 0.4, 0.7),
 *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
 *   background: hsla(359, 0.75, 0.4, 1),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${hsla(359, 0.75, 0.4, 0.7)};
 *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
 *   background: ${hsla(359, 0.75, 0.4, 1)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(179,25,28,0.7)";
 *   background: "rgba(179,25,28,0.7)";
 *   background: "#b3191c";
 * }
 */
function hsla(value, saturation, lightness, alpha) {
  if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
    return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
  } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
    return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
  }

  throw new PolishedError(2);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible hex notation.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgb(255, 205, 100),
 *   background: rgb({ red: 255, green: 205, blue: 100 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgb(255, 205, 100)};
 *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffcd64";
 *   background: "#ffcd64";
 * }
 */
function rgb(value, green, blue) {
  if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
    return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
  } else if (typeof value === 'object' && green === undefined && blue === undefined) {
    return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
  }

  throw new PolishedError(6);
}

/**
 * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
 *
 * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: rgba(255, 205, 100, 0.7),
 *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
 *   background: rgba(255, 205, 100, 1),
 *   background: rgba('#ffffff', 0.4),
 *   background: rgba('black', 0.7),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${rgba(255, 205, 100, 0.7)};
 *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
 *   background: ${rgba(255, 205, 100, 1)};
 *   background: ${rgba('#ffffff', 0.4)};
 *   background: ${rgba('black', 0.7)};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,205,100,0.7)";
 *   background: "rgba(255,205,100,0.7)";
 *   background: "#ffcd64";
 *   background: "rgba(255,255,255,0.4)";
 *   background: "rgba(0,0,0,0.7)";
 * }
 */
function rgba(firstValue, secondValue, thirdValue, fourthValue) {
  if (typeof firstValue === 'string' && typeof secondValue === 'number') {
    var rgbValue = parseToRgb(firstValue);
    return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
  } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
    return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
  } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
    return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
  }

  throw new PolishedError(7);
}

var isRgb = function isRgb(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isRgba = function isRgba(color) {
  return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
};

var isHsl = function isHsl(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
};

var isHsla = function isHsla(color) {
  return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
};
/**
 * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
 * This util is useful in case you only know on runtime which color object is
 * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: toColorString({ red: 255, green: 205, blue: 100 }),
 *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
 *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
 *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
 *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
 *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
 *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#ffcd64";
 *   background: "rgba(255,205,100,0.72)";
 *   background: "#00f";
 *   background: "rgba(179,25,25,0.72)";
 * }
 */


function toColorString(color) {
  if (typeof color !== 'object') throw new PolishedError(8);
  if (isRgba(color)) return rgba(color);
  if (isRgb(color)) return rgb(color);
  if (isHsla(color)) return hsla(color);
  if (isHsl(color)) return hsl(color);
  throw new PolishedError(8);
}

// Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-redeclare
function curried(f, length, acc) {
  return function fn() {
    // eslint-disable-next-line prefer-rest-params
    var combined = acc.concat(Array.prototype.slice.call(arguments));
    return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
  };
} // eslint-disable-next-line no-redeclare


function curry(f) {
  // eslint-disable-line no-redeclare
  return curried(f, f.length, []);
}

function guard(lowerBoundary, upperBoundary, value) {
  return Math.max(lowerBoundary, Math.min(upperBoundary, value));
}

/**
 * Returns a string value for the darkened color.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: darken(0.2, '#FFCD64'),
 *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${darken(0.2, '#FFCD64')};
 *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#ffbd31";
 *   background: "rgba(255,189,49,0.7)";
 * }
 */

function darken(amount, color) {
  if (color === 'transparent') return color;
  var hslColor = parseToHsl(color);
  return toColorString(_extends$1({}, hslColor, {
    lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
  }));
} // prettier-ignore


var curriedDarken =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(darken);

/**
 * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
 *
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: transparentize(0.1, '#fff');
 *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
 *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${transparentize(0.1, '#fff')};
 *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
 *   background: ${transparentize('0.5', 'rgba(255, 0, 0, 0.8)')},
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "rgba(255,255,255,0.9)";
 *   background: "rgba(255,255,255,0.8)";
 *   background: "rgba(255,0,0,0.3)";
 * }
 */

function transparentize(amount, color) {
  if (color === 'transparent') return color;
  var parsedColor = parseToRgb(color);
  var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

  var colorWithAlpha = _extends$1({}, parsedColor, {
    alpha: guard(0, 1, (alpha * 100 - parseFloat(amount) * 100) / 100)
  });

  return rgba(colorWithAlpha);
} // prettier-ignore


var curriedTransparentize =
/*#__PURE__*/
curry
/* ::<number | string, string, string> */
(transparentize);

var THEME_TYPES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK'
};
var THEMES = [{
  mode: THEME_TYPES.LIGHT,
  theme: {
    primary: '#006CAF',
    secondary: '#006CAF',
    danger: '#D50935',
    darkgrey: '#9197A1',
    grey: '#E3E5E8'
  }
}, {
  mode: THEME_TYPES.DARK,
  theme: {
    primary: '#006CAF',
    secondary: '#33b1ff',
    danger: '#f74a6f',
    darkgrey: '#868C97',
    grey: '#464B53'
  }
}];
var colors = {
  white: '#fff',
  blue: '#1066F2',
  darkgrey: '#4A4A4A',
  grey: '#979797',
  lightgrey: '#E6E6E6',
  basegrey: '#F7F8F8',
  orange: '#f58b3a',
  caution: '#CD4747',
  cta: '#57B68B',
  system: '#006CAF'
};

var FILL_TYPES = {
  FILLED: 'filled',
  GHOST: 'ghost',
  OUTLINED: 'outlined'
};
var PADDING = {
  tiny: '3px 10px',
  small: '5px 15px',
  large: '5px 20px'
};
var FONTSIZE = {
  tiny: '0.5em',
  small: '0.7em',
  large: '1em'
};
var SPINNER_SIZE = {
  tiny: 8,
  small: 10,
  large: 15
};
/**
 * Theme Definition
 */

var BUTTON_THEME = function BUTTON_THEME(theme, type, fill) {
  var _selectedTheme;

  var isFilled = fill === FILL_TYPES.FILLED;

  if (!theme) {
    return {};
  }

  var selectedTheme = (_selectedTheme = {}, _defineProperty(_selectedTheme, THEME_TYPES.LIGHT, {
    TEXT_COLOR: isFilled ? colors.white : theme.theme[type],
    BG_COLOR: isFilled ? theme.theme[type] : 'inherit'
  }), _defineProperty(_selectedTheme, THEME_TYPES.DARK, {
    TEXT_COLOR: isFilled ? colors.white : theme.theme[type],
    BG_COLOR: isFilled ? theme.theme[type] : 'transparent'
  }), _selectedTheme);
  return selectedTheme[theme.mode];
};
/**
 * Helper Functions
 */

var getColor = function getColor(_ref) {
  var theme = _ref.theme,
      type = _ref.type,
      fill = _ref.fill,
      disabled = _ref.disabled;
  var selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled ? theme.theme.grey : selectedTheme.TEXT_COLOR;
};
var getHoverActiveColor = function getHoverActiveColor(_ref2) {
  var theme = _ref2.theme,
      fill = _ref2.fill,
      disabled = _ref2.disabled,
      type = _ref2.type;
  var isOutlined = fill === FILL_TYPES.OUTLINED;
  var selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled ? theme.theme.grey : isOutlined ? colors.white : selectedTheme.TEXT_COLOR;
};
var getHoverBgColor = function getHoverBgColor(_ref3) {
  var theme = _ref3.theme,
      type = _ref3.type,
      fill = _ref3.fill,
      disabled = _ref3.disabled;
  var isFilled = fill === FILL_TYPES.FILLED;
  var isGhost = fill === FILL_TYPES.GHOST;
  var buttonBg = theme.theme[type];
  var selectedTheme = BUTTON_THEME(theme, type, fill);
  return disabled || isGhost ? null : isFilled ? curriedDarken(0.1, buttonBg) : selectedTheme.TEXT_COLOR;
};
var getBgColor = function getBgColor(_ref4) {
  var theme = _ref4.theme,
      type = _ref4.type,
      fill = _ref4.fill,
      disabled = _ref4.disabled;
  var selectedTheme = BUTTON_THEME(theme, type, fill);
  var disabledBg = fill === FILL_TYPES.FILLED ? theme.theme.darkgrey : 'transparent';
  return disabled ? disabledBg : selectedTheme.BG_COLOR;
};
var getSpinnerColor = function getSpinnerColor(_ref5) {
  var theme = _ref5.theme,
      type = _ref5.type,
      fill = _ref5.fill,
      isMouseOver = _ref5.isMouseOver;
  var isOutlined = fill === FILL_TYPES.OUTLINED;
  return isOutlined && !isMouseOver ? getColor({
    theme: theme,
    type: type,
    fill: fill
  }) : colors.white;
};
var getBorderStyle = function getBorderStyle(props) {
  var isOutlined = props.fill === FILL_TYPES.OUTLINED;
  return isOutlined ? "2px solid ".concat(getColor(props)) : 'inherit';
};
var getPadding = function getPadding(props) {
  return PADDING[props.size];
};
var getFontSize = function getFontSize(props) {
  return FONTSIZE[props.size];
};

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: ", ";\n  margin: 0;\n  padding: ", ";\n  background-color: ", ";\n  border: ", ";\n  border-radius: 22px;\n  cursor: ", ";\n  &:focus {\n    outline: 0\n  }\n  &:hover {\n    background: ", ";\n    cursor: ", ";\n    color: ", "\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  opacity: ", ";\n  cursor: ", ";"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\ndisplay: flex;\nposition: relative;"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Container = styled(Box)(_templateObject$2());
var ChildrenContainer = styled(Box)(_templateObject2(), function (p) {
  return p.isLoading ? 0.3 : 1;
}, function (p) {
  return p.isLoading ? 'none' : 'inherit';
});
var BaseButton = styled.button.attrs({
  fontFamily: 'Lato, sans-serif'
})(_templateObject3(), function (props) {
  return getColor(props);
}, function (props) {
  return getFontSize(props);
}, function (props) {
  return getPadding(props);
}, function (props) {
  return getBgColor(props);
}, function (props) {
  return getBorderStyle(props);
}, function (props) {
  return props.disabled ? 'none' : 'pointer';
}, function (props) {
  return getHoverBgColor(props);
}, function (props) {
  return props.disabled ? 'not-allowed' : 'pointer';
}, function (props) {
  return getHoverActiveColor(props);
});

var Button = function Button(_ref) {
  var children = _ref.children,
      size = _ref.size,
      type = _ref.type,
      fill = _ref.fill,
      theme = _ref.theme,
      rest = _objectWithoutProperties(_ref, ["children", "size", "type", "fill", "theme"]);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isMouseOver = _useState4[0],
      setMouseOver = _useState4[1];

  var handleClick = function handleClick() {
    var onClick = rest.onClick;
    setIsLoading(true);
    Promise.resolve().then(onClick)["catch"](function (err) {
      return err;
    }).then(function () {
      return setIsLoading(false);
    });
  };

  return React__default.createElement(BaseButton, _extends({
    size: size,
    type: type,
    fill: fill
  }, rest, {
    onClick: handleClick,
    onMouseEnter: function onMouseEnter() {
      return setMouseOver(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setMouseOver(false);
    }
  }), React__default.createElement(Container, null, React__default.createElement(ChildrenContainer, {
    isLoading: isLoading
  }, children), isLoading && React__default.createElement(Loader$l, {
    size: SPINNER_SIZE[size],
    color: getSpinnerColor({
      theme: theme,
      type: type,
      fill: fill,
      isMouseOver: isMouseOver
    })
  })));
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'grey']),
  size: PropTypes.string,
  fill: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired
};
Button.defaultProps = {
  type: 'primary',
  size: 'large',
  fill: 'filled',
  disabled: false
};
var index = withTheme(Button);

var PADDING$1 = {
  tiny: '3px 10px',
  small: '5px 10px',
  large: '8px 10px'
};
var FONTSIZE$1 = {
  tiny: '12px',
  small: '14px',
  large: '16px'
};
var FONTSIZETITLE = {
  tiny: '12px',
  small: '18px',
  large: '24px'
};
var LINEHEIGHT = {
  tiny: '16px',
  small: '16px',
  large: '20px'
};
var LINEHEIGHTTITLE = {
  tiny: '14px',
  small: '20px',
  large: '29px'
};

var TEXT_THEME = function TEXT_THEME(theme) {
  var _selectedTheme;

  var selectedTheme = (_selectedTheme = {}, _defineProperty(_selectedTheme, THEME_TYPES.LIGHT, {
    TEXT_COLOR: '#000000'
  }), _defineProperty(_selectedTheme, THEME_TYPES.DARK, {
    TEXT_COLOR: '#ffffff'
  }), _selectedTheme);
  return selectedTheme[theme.mode];
};

var getTextColor = function getTextColor(_ref) {
  var title = _ref.title,
      size = _ref.size,
      theme = _ref.theme;
  return title || size !== 'tiny' ? TEXT_THEME(theme).TEXT_COLOR : TEXT_THEME(theme).TEXT_COLOR;
};
var getPadding$1 = function getPadding(_ref2) {
  var size = _ref2.size;
  return PADDING$1[size];
};
var getFontStyle = function getFontStyle(_ref3) {
  var title = _ref3.title,
      size = _ref3.size;
  return title || size !== 'tiny' ? 'normal' : 'italic';
};
var getFontSize$1 = function getFontSize(_ref4) {
  var title = _ref4.title,
      size = _ref4.size;
  return title ? FONTSIZETITLE[size] : FONTSIZE$1[size];
};
var getLineHeight = function getLineHeight(_ref5) {
  var title = _ref5.title,
      size = _ref5.size;
  return title ? LINEHEIGHTTITLE[size] : LINEHEIGHT[size];
};
var getFontWeight = function getFontWeight(_ref6) {
  var title = _ref6.title;
  return title ? '900' : '400';
};
var getBorderBottom = function getBorderBottom(_ref7) {
  var underline = _ref7.underline,
      theme = _ref7.theme;
  return underline ? "1px ".concat(theme.theme.gray, " solid") : '0px';
};

function _templateObject$3() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-family: 'Lato', sans-serif;\n  font-style: ", ";\n  font-size: ", ";\n  font-weight: ", ";\n  line-height: ", ";\n  padding: ", ";\n  border-bottom: ", ";\n  margin-top: 10px;\n  margin-bottom: 10px;\n"]);

  _templateObject$3 = function _templateObject() {
    return data;
  };

  return data;
}
var BaseText = styled.div(_templateObject$3(), function (props) {
  return getTextColor(props);
}, function (props) {
  return getFontStyle(props);
}, function (props) {
  return getFontSize$1(props);
}, function (props) {
  return getFontWeight(props);
}, function (props) {
  return getLineHeight(props);
}, function (props) {
  return getPadding$1(props);
}, function (props) {
  return getBorderBottom(props);
});
function Text(props) {
  var children = props.children,
      title = props.title,
      size = props.size,
      underline = props.underline,
      rest = _objectWithoutProperties(props, ["children", "title", "size", "underline"]);

  return React__default.createElement(BaseText, _extends({
    title: title,
    size: size,
    underline: underline
  }, rest), children);
}
Text.propTypes = {
  title: PropTypes.bool,
  size: PropTypes.string,
  underline: PropTypes.bool,
  children: PropTypes.node.isRequired
};
Text.defaultProps = {
  title: false,
  size: 'large',
  underline: false
};

var getBackgroundColor = function getBackgroundColor(_ref) {
  var theme = _ref.theme;
  return theme.mode === THEME_TYPES.LIGHT ? colors.white : curriedTransparentize(0.9, colors.white);
};
var getBoxShadowColor = function getBoxShadowColor(_ref2) {
  var theme = _ref2.theme;
  return theme.mode === THEME_TYPES.LIGHT ? curriedTransparentize(0.86, '#000') : theme.theme.grey;
};
var getBorderColor = function getBorderColor(_ref3) {
  var theme = _ref3.theme;
  return theme.mode === THEME_TYPES.LIGHT ? theme.theme.gray : null;
};

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$4() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 10px;\n  margin-bottom: 10px;\n  border: ", ";\n  border-radius: 2px;\n  box-shadow: ", ";\n\n  transition: all 0.3s cubic-bezier(.25,.8,.25,1);\n  &:hover {\n    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);\n    background-color: ", ";\n  }\n  width: 100%;\n"]);

  _templateObject$4 = function _templateObject() {
    return data;
  };

  return data;
}
var BaseCard = styled.div(_templateObject$4(), function (props) {
  return "1px solid ".concat(getBorderColor(props));
}, function (props) {
  return "0 1px 3px ".concat(getBoxShadowColor(props), ", 0 1px 2px ").concat(getBoxShadowColor(props));
}, function (props) {
  return getBackgroundColor(props);
});
var CardTitle = styled.span(_templateObject2$1(), function (p) {
  return p.title === '' ? 'none' : 'inline-block';
});
function Card(props) {
  var children = props.children,
      title = props.title,
      rest = _objectWithoutProperties(props, ["children", "title"]);

  return React__default.createElement(BaseCard, rest, React__default.createElement(Box, null, React__default.createElement(CardTitle, {
    title: title
  }, React__default.createElement(Box, null, React__default.createElement(Text, {
    title: true,
    size: "large",
    underline: true
  }, title))), React__default.createElement(Box, null, children)));
}
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};
Card.defaultProps = {
  title: ''
};

function _templateObject$5() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  border-bottom: 1px ", " solid;\n"]);

  _templateObject$5 = function _templateObject() {
    return data;
  };

  return data;
}
function Separator() {
  return React__default.createElement(BaseSeparator, null);
}
var BaseSeparator = styled.div(_templateObject$5(), colors.lightgrey);

var getTabHeaderBorder = function getTabHeaderBorder(_ref) {
  var theme = _ref.theme;
  return "1px ".concat(theme.theme.grey, " solid");
};
var getTabItemFontWeight = function getTabItemFontWeight(_ref2) {
  var activeTab = _ref2.activeTab,
      label = _ref2.label;
  return activeTab === label ? 'bold' : '100';
};
var getTabItemColor = function getTabItemColor(_ref3) {
  var activeTab = _ref3.activeTab,
      label = _ref3.label,
      theme = _ref3.theme;
  return activeTab === label ? theme.theme.primary : theme.theme.darkgrey;
};
var getTabItemAlign = function getTabItemAlign(_ref4) {
  var align = _ref4.align;
  return align === 'right' ? 'right' : 'left';
};
var getTabHeaderIndicatorMarginLeft = function getTabHeaderIndicatorMarginLeft(_ref5) {
  var activeTabAlign = _ref5.activeTabAlign,
      activeTabIndex = _ref5.activeTabIndex;
  return activeTabAlign === 'right' ? 'calc(100% - 150px)' : "".concat(activeTabIndex * 150, "px");
};
var getHeaderIndicatorBackground = function getHeaderIndicatorBackground(_ref6) {
  var theme = _ref6.theme;
  return theme.theme.primary;
};

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: 150px;\n  height: 3px;\n  display: absolute;\n  background: ", ";\n  margin-top: 38px;\n  margin-left: ", ";\n\n  -webkit-transition: margin 0.5s ease;\n  transition: margin 0.5s ease;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 150px;\n  list-style: none;\n  margin-bottom: -1px;\n  padding: 0 0.75rem 17px 0.75rem;\n  border-bottom: 0px;\n  text-align: ", ";\n  float: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3$1() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'Lato', sans-serif;\n  font-size: 18px;\n  font-weight: ", ";\n  line-height: 22px;\n  cursor: pointer;\n  color: ", ";\n"]);

  _templateObject3$1 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$2() {
  var data = _taggedTemplateLiteral(["\n  padding-left: 0;\n  width: 100%;\n  border-bottom: ", ";\n"]);

  _templateObject2$2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$6() {
  var data = _taggedTemplateLiteral(["\n  margin-top: 0px;\n  margin-bottom: 0px;\n  width: 100%;\n"]);

  _templateObject$6 = function _templateObject() {
    return data;
  };

  return data;
}
var BaseTabs = styled.div(_templateObject$6());
var TabHeader = styled.ol(_templateObject2$2(), function (props) {
  return getTabHeaderBorder(props);
});
var TabHeaderLabel = styled.span(_templateObject3$1(), function (props) {
  return getTabItemFontWeight(props);
}, function (props) {
  return getTabItemColor(props);
});
var TabHeaderItem = styled.li(_templateObject4(), function (props) {
  return getTabItemAlign(props);
}, function (props) {
  return getTabItemAlign(props);
});
var TabHeaderIndicator = styled.div(_templateObject5(), function (props) {
  return getHeaderIndicatorBackground(props);
}, function (props) {
  return getTabHeaderIndicatorMarginLeft(props);
});
function Tabs(props) {
  var _useState = useState(props.children[props.activeTab].props.label),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var _useState3 = useState(props.activeTab),
      _useState4 = _slicedToArray(_useState3, 2),
      activeTabIndex = _useState4[0],
      setActiveTabIndex = _useState4[1];

  var _useState5 = useState(props.children[props.activeTab].props.align),
      _useState6 = _slicedToArray(_useState5, 2),
      activeTabAlign = _useState6[0],
      setActiveTabAlign = _useState6[1];

  var onClickTabItem = function onClickTabItem(label, index, align) {
    setActiveTab(label);
    setActiveTabIndex(index);
    setActiveTabAlign(align);
  };

  var children = props.children,
      rest = _objectWithoutProperties(props, ["children"]);

  return React__default.createElement(BaseTabs, rest, React__default.createElement(Box, {
    horizontal: true
  }, React__default.createElement(TabHeader, null, children.map(function (child, index) {
    var _child$props = child.props,
        label = _child$props.label,
        align = _child$props.align;
    return React__default.createElement(TabHeaderItem, {
      key: label,
      label: label,
      activeTab: activeTab,
      align: align,
      onClick: function onClick() {
        return onClickTabItem(label, index, align);
      }
    }, React__default.createElement(TabHeaderLabel, {
      label: label,
      activeTab: activeTab
    }, label));
  }), React__default.createElement(TabHeaderIndicator, {
    activeTabIndex: activeTabIndex,
    activeTabAlign: activeTabAlign
  }))), React__default.createElement(Box, {
    horizontal: true
  }, children.map(function (child) {
    if (child.props.label !== activeTab) return undefined;
    return child.props.children;
  })));
}
Tabs.propTypes = {
  activeTab: PropTypes.number,
  children: PropTypes.node.isRequired
};
Tabs.defaultProps = {
  activeTab: 0
};

var getThemedBorderColor = function getThemedBorderColor(_ref) {
  var theme = _ref.theme,
      inputState = _ref.inputState,
      disabled = _ref.disabled;
  var border = {
    initial: curriedDarken(0.1, theme.theme.grey),
    modified: theme.theme.darkgrey,
    error: theme.theme.danger
  };
  return disabled ? theme.theme.grey : border[inputState];
};

var getColor$1 = function getColor(_ref2) {
  var theme = _ref2.theme,
      inputState = _ref2.inputState;
  return inputState === 'error' ? theme.theme.danger : theme.mode === THEME_TYPES.DARK ? '#F1F2F3' : '#25272A';
};
var getPlaceholderColor = function getPlaceholderColor(_ref3) {
  var theme = _ref3.theme,
      inputState = _ref3.inputState;
  return inputState === 'error' ? theme.theme.danger : theme.theme.darkgrey;
};
var getBorderColor$1 = function getBorderColor(props) {
  return getThemedBorderColor(props);
};
var getBackgroundColor$1 = function getBackgroundColor(_ref4) {
  var theme = _ref4.theme;
  return theme.mode === THEME_TYPES.DARK ? '#2F3237' : 'transparent';
};
var getPadding$2 = function getPadding(_ref5) {
  var copyInput = _ref5.copyInput;
  return copyInput ? '3.75rem' : '.75rem';
};
var getWidth = function getWidth(_ref6) {
  var copyInput = _ref6.copyInput;
  return copyInput ? 'calc(100% - 3rem)' : '100%';
};

function _templateObject3$2() {
  var data = _taggedTemplateLiteral(["\n  font-family: 'Lato', sans-serif;\n  font-size: .875rem;\n  border-radius: .2rem;\n  border: 1px solid ", ";\n  width: ", ";\n  padding: .6rem ", " .6rem .75rem;\n  cursor: ", ";\n  transition: border 1s cubic-bezier(.25,.8,.25,1);\n  background: ", ";\n  color: ", ";\n  &:disabled {\n    opacity: .8;\n    cursor: not-allowed;\n  }\n  \n  &::placeholder {\n    color: ", ";\n  }\n\n  &:focus {\n    outline: none;\n    border-color: ", ";\n  }\n"]);

  _templateObject3$2 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 11px;\n  right: -12px;\n  font-family: 'Lato', sans-serif;\n  font-size: .875rem;\n  color: ", "\n  cursor: ", ";\n  pointer-events: ", "\n"]);

  _templateObject2$3 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$7() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject$7 = function _templateObject() {
    return data;
  };

  return data;
}
var CopyLinkInputWrapper = styled.div(_templateObject$7());
var CopyInput = styled.div(_templateObject2$3(), function (p) {
  return p.disabled ? colors.grey : colors.blue;
}, function (p) {
  return p.disabled ? 'default' : 'pointer';
}, function (p) {
  return p.disabled ? 'none' : '';
});
var BaseInputField = styled.input(_templateObject3$2(), function (props) {
  return getBorderColor$1(props);
}, function (props) {
  return getWidth(props);
}, function (props) {
  return getPadding$2(props);
}, function (p) {
  return p.disabled ? 'inherit' : 'text';
}, function (props) {
  return getBackgroundColor$1(props);
}, function (props) {
  return getColor$1(props);
}, function (props) {
  return getPlaceholderColor(props);
}, function (p) {
  return p.inputState === 'error' ? colors.caution : colors.blue;
});

var InputField = function InputField(props) {
  var inputRef = useRef(null);

  function copyToClipBoard() {
    inputRef.current.select();
    document.execCommand('copy');
  }

  var id = props.id,
      disabled = props.disabled,
      onChange = props.onChange,
      onBlur = props.onBlur,
      placeholder = props.placeholder,
      value = props.value,
      inputState = props.inputState,
      copyInput = props.copyInput;
  return React__default.createElement("div", null, copyInput ? React__default.createElement(CopyLinkInputWrapper, null, React__default.createElement(BaseInputField, {
    disabled: disabled,
    id: id,
    onChange: onChange,
    onBlur: onBlur,
    placeholder: placeholder,
    type: "text",
    value: value,
    inputState: inputState,
    ref: inputRef,
    copyInput: copyInput
  }), React__default.createElement(CopyInput, {
    disabled: disabled,
    copyInput: copyInput,
    onClick: copyToClipBoard
  }, "copy")) : React__default.createElement(BaseInputField, {
    disabled: disabled,
    id: id,
    onChange: onChange,
    onBlur: onBlur,
    placeholder: placeholder,
    type: "text",
    value: value,
    inputState: inputState,
    ref: inputRef
  }));
};

InputField.propTypes = {
  copyInput: PropTypes$1.bool,
  disabled: PropTypes$1.bool,
  id: PropTypes$1.string,
  inputState: PropTypes$1.string,
  placeholder: PropTypes$1.string,
  value: PropTypes$1.string,
  onChange: PropTypes$1.func,
  onBlur: PropTypes$1.func
};
InputField.defaultProps = {
  copyInput: false,
  disabled: false,
  inputState: 'INITIAL',
  id: '',
  onChange: undefined,
  onBlur: undefined,
  placeholder: 'Input here...',
  value: ''
};

var loggerLevels = {
  DEBUG: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  CRITICAL: 5,
  OFF: 100
};
var envs = {
  MOCK: 'MOCK',
  DEV: 'DEV',
  PROD: 'PROD',
  TEST: 'TEST'
};
var TITLE_PRIMARY = 'color: #e65328';
var TITLE_SECONDARY = 'color: #34255c';
var COLOR_DEFAULT = 'color: auto';
var COLOR_DEBUG = 'color: #767676';
var COLOR_INFO = 'color: #1e88e5';
var COLOR_WARNING = 'color: #e7910e';
var COLOR_ERROR = 'color: #ec4d5c';

var Logger =
/*#__PURE__*/
function () {
  function Logger(_ref) {
    var appTitle = _ref.appTitle,
        environment = _ref.environment,
        apiUrl = _ref.apiUrl,
        debugLevel = _ref.debugLevel;

    _classCallCheck(this, Logger);

    _defineProperty(this, "environment", null);

    _defineProperty(this, "apiUrl", null);

    _defineProperty(this, "level", null);

    _defineProperty(this, "appTitle", null);

    this.appTitle = appTitle;
    this.environment = environment;
    this.apiUrl = apiUrl;
    this.level = debugLevel;

    if (!this.level) {
      switch (this.environment) {
        case envs.MOCK:
        case envs.DEV:
        case envs.TEST:
          this.level = loggerLevels.DEBUG;
          break;

        case envs.PROD:
          this.level = loggerLevels.INFO;
          break;

        default:
          this.level = loggerLevels.INFO;
      }
    } else {
      this.level = debugLevel;
    }

    if (appTitle) {
      this.setAppTitle(appTitle);
    }
  }

  _createClass(Logger, [{
    key: "debug",
    value: function debug(str) {
      if (this.level <= loggerLevels.DEBUG) {
        console.log("".concat(this.loggerHeader, "%cDEBUG: %c").concat(str), TITLE_SECONDARY, TITLE_PRIMARY, COLOR_DEBUG, COLOR_DEFAULT);
      }
    }
  }, {
    key: "info",
    value: function info(str) {
      if (this.level <= loggerLevels.INFO) {
        console.info("".concat(this.loggerHeader, "%cINFO: %c").concat(str), TITLE_SECONDARY, TITLE_PRIMARY, COLOR_INFO, COLOR_DEFAULT);
      }
    }
  }, {
    key: "warning",
    value: function warning(str) {
      if (this.level <= loggerLevels.WARNING) {
        console.warn("".concat(this.loggerHeader, "%cWARNING: %c").concat(str), TITLE_SECONDARY, TITLE_PRIMARY, COLOR_WARNING, COLOR_DEFAULT);
      }
    }
  }, {
    key: "error",
    value: function error(str) {
      var _error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var isCritical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var errorString = '';

      if (_error) {
        if (_error.stack) {
          errorString = "\n".concat(_error.stack);
        } else {
          errorString = "\n".concat(_error);
        }
      }

      if (this.level <= loggerLevels.ERROR) {
        console.error("".concat(this.loggerHeader, "%c").concat(isCritical ? 'CRITICAL' : 'ERROR', ": %c").concat(str).concat(errorString), TITLE_SECONDARY, TITLE_PRIMARY, COLOR_ERROR, COLOR_DEFAULT);
      }
    }
  }, {
    key: "critical",
    value: function critical(str) {
      var _this = this;

      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.level <= loggerLevels.CRITICAL) {
        this.error(str, error, true);
        axios.post(this.apiUrl, {
          log: str
        }, {
          headers: {
            Authorization: "Bearer ".concat(this.jwt)
          }
        })["catch"](function (e) {
          return _this.error("Error while logging following error to server: \"".concat(str, "\""), e);
        });
      }
    }
  }, {
    key: "setJwt",
    value: function setJwt(jwt) {
      this.jwt = jwt;
    }
  }, {
    key: "setAppTitle",
    value: function setAppTitle(appTitle) {
      this.loggerHeader = "%c >> %c".concat(appTitle, "\n");
    }
  }, {
    key: "setLevel",
    value: function setLevel(level) {
      this.level = level;
    }
  }]);

  return Logger;
}(); // Singleton instance


var instance = new Logger(window.appConfig);

var ThemeToggleContext = React__default.createContext({
  setTheme: function setTheme() {},
  theme: {}
});
var useTheme = function useTheme() {
  return React__default.useContext(ThemeToggleContext);
};

var MSThemeProvider = function MSThemeProvider(_ref) {
  var children = _ref.children,
      _ref$themeMap = _ref.themeMap,
      themeMap = _ref$themeMap === void 0 ? null : _ref$themeMap;
  var hasCustomTheme = themeMap && themeMap.length;

  var _React$useState = React__default.useState(Object.assign({}, hasCustomTheme ? themeMap[0] : THEMES[0])),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      themeState = _React$useState2[0],
      setThemeState = _React$useState2[1];

  var setTheme = function setTheme(value) {
    var theme = hasCustomTheme ? themeMap.find(function (el) {
      return el.mode === value;
    }) : THEMES.find(function (el) {
      return el.mode === value;
    });

    if (!theme) {
      instance.error("Selected Theme ".concat(value, " doesnt exists"));
      return;
    }

    setThemeState(Object.assign({}, theme));
  };

  return React__default.createElement(ThemeToggleContext.Provider, {
    value: {
      theme: themeState.theme,
      setTheme: setTheme
    }
  }, React__default.createElement(ThemeProvider, {
    theme: themeState.theme
  }, children));
};

MSThemeProvider.propTypes = {
  children: PropTypes$1.any,
  themeMap: PropTypes$1.array
};
MSThemeProvider.defaultProps = {
  children: [],
  themeMap: null
};

export { Box, index as Button, Card, InputField, Loader$l as Loader, instance as Logger, Separator, Tabs, Text, MSThemeProvider as ThemeProvider, useTheme };
//# sourceMappingURL=index.js.map
