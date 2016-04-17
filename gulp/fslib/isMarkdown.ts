function isMarkdown(filepath: string): boolean {
  if (_.endsWith(filepath, '.md')) {
    return true
  }
  return false
}

export = isMarkdown
