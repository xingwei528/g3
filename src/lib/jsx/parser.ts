import * as _ from 'lodash'
var jsdom = require('jsdom-no-contextify').jsdom
var defaultView = jsdom().defaultView;

function createElement(tag) {
  return defaultView.document.createElement(tag);
}

function isEmpty(string) {
   return !/[^\s]/.test(string)
}

const ATTRIBUTE_MAPPING = {
  'classname': 'className',
  'activestyle': 'activeStyle',
  'htmlfor': 'htmlFor'
}

class Parser {
  output: string
  routerLink: boolean

  reset() {
    this.output = ''
    this.routerLink = false
  }

  oneLevelOnly(element) {

    //based on https://github.com/reactjs/react-magic/blob/master/src/htmltojsx.js#L253
    // Only a single child element
    if (
      element.childNodes.length === 1
      && element.childNodes[0].nodeType === 1
    ) {
      return true
    }
    // Only one element, and all other children are whitespace
    var foundElement = false
    for (var i = 0, count = element.childNodes.length; i < count; i++) {
      var child = element.childNodes[i]
      if (child.nodeType === 1) {
        if (foundElement) {
          // Encountered an element after already encountering another one
          // Therefore, more than one element at root level
          return false
        } else {
          foundElement = true
        }
      } else if (child.nodeType === 3 && !isEmpty(child.textContent)) {
        // Contains text content
        return false
      }
    }
    return true
  }

  convert(element) {
    this.reset()

    var wrapper = createElement('div')
    wrapper.innerHTML = element

    if (this.oneLevelOnly(wrapper)) {
      this.traverse(wrapper)
    } else {
      this.visit(wrapper)
    }

    return this.output
  }

  traverse(element) {
    for (var i = 0, count = element.childNodes.length; i < count; i++) {
      this.visit(element.childNodes[i])
    }
  }

  visit(element) {
    this.begin(element)
    this.traverse(element)
    this.end(element)
  }

  handleText(element) {
    var text = element.textContent
    if (this.routerLink) {
      text = text.replace(/\[/g, '{').replace(/]/g, '}')
    }

    var tempEl = createElement('div')
    tempEl.textContent = text

    this.output += tempEl.innerHTML
  }

  beginNode(node) {
    var tagName = this.routerLink ? 'Link' : node.tagName.toLowerCase()
    var attributes = []
    for (var i = 0, count = node.attributes.length; i < count; i++) {
      var value = node.attributes[i].value
      if (value.indexOf('[') === -1) {
        value = '"' + value + '"'
      } else {
        value = '{' + value.replace(/\[/g, '{').replace(/\]/g, '}') + '}'
      }

      var name = node.attributes[i].name
      if (this.routerLink) {
        name = name.replace(/data-/g, '')
      }

      for (var key in ATTRIBUTE_MAPPING) {
        if (ATTRIBUTE_MAPPING.hasOwnProperty(key)) {
          name = name.replace(key, ATTRIBUTE_MAPPING[key])
        }
      }
      attributes.push(name + '=' + value)
    }

    this.output += '<' + tagName
    if (attributes.length > 0) {
      this.output += ' ' + attributes.join(' ')
    }
    if (node.firstChild) {
      this.output += '>'
    }
  }

  begin(node) {
    switch (node.nodeType) {
      case 1:
        if (node.tagName === 'A' && node.getAttribute('data-to')) {
          this.routerLink = true
        }
        this.beginNode(node)
        break

      case 3:
        this.handleText(node)
        break
    }
  }

  end(node) {
    if (node.nodeType === 1) {
      var tagName = this.routerLink ? 'Link' : node.tagName.toLowerCase()
      this.routerLink = false
      if (node.firstChild) {
        this.output += '</' + tagName + '>'
      } else {
        this.output += ' />'
      }
    }
  }
}

export default Parser
