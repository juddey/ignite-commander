// @cliDescription  Generates a component, index and a storybook test.

const { path } = require('ramda')

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print, ignite, filesystem, patching, prompt } = context
  const { pascalCase, isBlank } = strings
  const options = parameters.options || {}
  const folder = options.folder || options.f
  const config = ignite.loadIgniteConfig()
  const format = path(['ignite-base-plate', 'format'], config)  

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate screen <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = parameters.first
  const pascalName = pascalCase(name)

  const props = { name, pascalName }

  if (format === 'function') {
    let jobs = [
      {
        template: 'screen.js.ejs',
        target: folder ? `./src/Screens/${folder}/${name}.js` : `./src/Screens/${name}.js`
      }
    ]  
  }

   await ignite.copyBatch(context, jobs, props)

}
