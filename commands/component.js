// @cliDescription  Generates a component, index and a storybook test.

const { path, tail } = require('ramda')

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print, ignite, filesystem, patching, prompt } = context
  const { pascalCase, isBlank } = strings
  const options = parameters.options || {}
  const folder = options.folder || options.f
  const config = ignite.loadIgniteConfig()
  const storybooks = path(['ignite-base-plate', 'storybooks'], config)
  const format = path(['ignite-base-plate', 'format'], config)
  const componentPath = path(['ignite-base-plate', 'componentpath'], config)

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  let jobs = []
  const name = parameters.first
  const pascalName = pascalCase(name)
  const props = { name, pascalName }

  jobs.push({
    template: 'component.js.ejs',
    target: folder ? `${componentPath}${folder}/${name}.js` : `${componentPath}${name}.js`
  })

  jobs.push({
    template: 'test.js.ejs',
    target: folder ? `${componentPath}${folder}/${name}.test.js` : `${componentPath}${name}.test.js`
  })


  if (storybooks) {
    jobs.push({
      template: 'component.story.js.ejs',
      target: folder
        ? `${componentPath}${folder}/${name}.story.js`
        : `${componentPath}${name}.story.js`
    })
  }


  await ignite.copyBatch(context, jobs, props)
}
