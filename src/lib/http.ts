import * as _ from 'lodash'

export interface Error {
  status: number
  message: string
}

export enum ERestMethod {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH
}

export class ERestMethodUtils {
  static getValue(method: ERestMethod): string {
    if (method === ERestMethod.GET) {
      return "GET"
    } else if (method === ERestMethod.POST) {
      return "POST"
    } else if (method === ERestMethod.PUT) {
      return "PUT"
    } else if (method === ERestMethod.DELETE) {
      return "DELETE"
    } else if (method === ERestMethod.PATCH) {
      return "PATCH"
    }
    return "POST"
  }

  static equals(methodStr: string, method: ERestMethod) {
    return (ERestMethodUtils.getValue(method) === methodStr)
  }

  static errorCode(status: number): string {
    switch (status) {
      case Const.STATUS_BAD_REQUEST:
        return 'Bad Request'
      case Const.STATUS_UNAUTHORIZED:
        return 'Unauthorized'
      case Const.STATUS_PAYMENT_REQUIRED:
        return 'Payment Required'
      case Const.STATUS_FORBIDDEN:
        return 'Forbidden'
      case Const.STATUS_NOT_FOUND:
        return 'Not Found'
      case Const.STATUS_METHOD_NOT_ALLOWED:
        return 'Method Not Allowed'
      case Const.STATUS_NOT_ACCEPTABLE:
        return 'Not Acceptable'
      case Const.STATUS_PROXY_AUTHENTICATION_REQUIRED:
        return 'Proxy Authentication Required'
      case Const.STATUS_REQUEST_TIMEOUT:
        return 'Request Timeout'
      case Const.STATUS_CONFLICT:
        return 'Conflict'
      case Const.STATUS_GONE:
        return 'Gone'
      case Const.STATUS_LENGTH_REQUIRED:
        return 'Length Required'
      case Const.STATUS_INTERNAL_SERVER_ERROR:
        return 'Internal Server Error'
    }
    return 'Unknown Error'
  }
}

export interface Options {
  api?: string;
}

export class Const {
  static STATUS_NOT_MODIFIED = 304
  static STATUS_BAD_REQUEST = 400
  static STATUS_UNAUTHORIZED = 401
  static STATUS_PAYMENT_REQUIRED = 402
  static STATUS_FORBIDDEN = 403
  static STATUS_NOT_FOUND = 404
  static STATUS_METHOD_NOT_ALLOWED = 405
  static STATUS_NOT_ACCEPTABLE = 406
  static STATUS_PROXY_AUTHENTICATION_REQUIRED = 407
  static STATUS_REQUEST_TIMEOUT = 408
  static STATUS_CONFLICT = 409
  static STATUS_GONE = 410
  static STATUS_LENGTH_REQUIRED = 411
  static STATUS_INTERNAL_SERVER_ERROR = 500
}

var XMLHttpRequest = window["XMLHttpRequest"]

function snakeToCamelcase(key) {
  return key.replace(/(_+[a-z0-9])/g, function(snip) {
    return snip.toUpperCase().replace("_", "")
  })
}

function camelToSnakecase(key) {
  return key.replace(/([A-Z0-9])/g, function(snip) {
    return "_" + snip.toLowerCase()
  })
}

export function parseSnake(responseText) {
  if (!responseText) {
    return {}
  }
  return JSON.parse(responseText.replace(/"([^"]*)"\s*:/g, snakeToCamelcase))
}

function stringify(obj: Object) {
  return JSON.stringify(obj).replace(/"([^"]*)"\s*:/g, camelToSnakecase)
}

export class WebRequest {
  constructor() { }

  private static _getURL(path: string, data: any, method: string) {
    var url = path
    url += ((/\?/).test(url) ? '&' : '?')
    // Fix #195 about XMLHttpRequest.send method and GET/HEAD request
    if (_.isObject(data) && _.indexOf(['GET', 'HEAD'], method) > -1) {
      url += '&' + _.map(data, function(v, k) {
        return k + '=' + v
      }).join('&')
    }
    return url + '&' + (new Date()).getTime()
  }

  private static _request(method: string, path: string, data: Object, cb?: (err: Error, res: string, status?: number) => void) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, this._getURL(path, data, method), true)
    if (cb) {
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status < 400) {
            cb(null, xhr.responseText, xhr.status)
          } else {
            var err: Error = {
              status: xhr.status,
              message: ERestMethodUtils.errorCode(xhr.status)
            }
            cb(err, null, xhr.status)
          }
        }
      }
    }

    if (data) {
      xhr.dataType = 'json'
      xhr.send(JSON.stringify(data))
    } else {
      xhr.send()
    }
  }

  public static get(path: string, cb: (err: Error, data: Object, status?: number) => void) {
    return this._request("GET", path, null, cb)
  }

  public static post(path: string, data: Object, cb: (err: Error, data: Object, status?: number) => void) {
    return this._request("POST", path, data, cb)
  }

  public static patch(path: string, data: Object, cb: (err: Error, data: Object, status?: number) => void) {
    return this._request("PATCH", path, data, cb)
  }

  public static put(path: string, data: Object, cb: (err: Error, data: Object, status?: number) => void) {
    return this._request("PUT", path, data, cb)
  }

  public static delete(path: string, data: Object, cb: (err: Error, data: Object, status?: number) => void) {
    return this._request("DELETE", path, data, cb)
  }
}
