// @cliDescription  Generates a screen, and apollo mutation.

const { path, toUpper } = require('ramda')

module.exports = async function (context) {
  // grab some features
  const {
    parameters,
    strings,
    print,
    ignite,
    filesystem,
    patching,
    prompt
  } = context
  const { pascalCase, isBlank, snakeCase, upperCase, camelCase } = strings
  const options = parameters.options || {}
  const folder = options.folder || options.f
  const config = ignite.loadIgniteConfig()
  const format = path(['ignite-base-plate', 'format'], config)
  const jobs = []

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate screen <name>\n`)
    print.info('A name is required.')
    return
  }

  const name = parameters.first
  const queryName = isBlank(parameters.second)
    ? parameters.first
    : parameters.second
  const pascalName = pascalCase(name)
  const camelQuery = camelCase(queryName)
  const screamingQuery = toUpper(snakeCase(queryName))
  const props = { name, pascalName, screamingQuery, camelQuery }

  if (format === 'function') {
    jobs.push(
      {
        template: 'screen.js.ejs',
        target: folder
          ? `./src/Screens/${folder}/${name}.js`
          : `./src/Screens/${name}.js`
      },
      {
        template: 'mutation.js.ejs',
        target: folder
          ? `./src/Screens/${folder}/${name}.mutation.js`
          : `./src/Screens/${name}.mutation.js`
      }
    )
  }

  await ignite.copyBatch(context, jobs, props)
}
