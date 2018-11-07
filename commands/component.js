// @cliDescription  Generates a component, index and a storybook test.

const { path } = require('ramda')

module.exports = async function (context) {
  // grab some features
  const { parameters, strings, print, ignite, filesystem, patching, prompt } = context
  const { pascalCase, isBlank } = strings
  const options = parameters.options || {}
  const folder = options.folder || options.f
  const config = ignite.loadIgniteConfig()
  const storybooks = path(['ignite-base-plate', 'storybooks'], config)
  const format = path(['ignite-base-plate', 'format'], config)  
  const componentpath = path(['ignite-base-plate', 'format'], config)    

  // validation
  if (isBlank(parameters.first)) {
    print.info(`${context.runtime.brand} generate component <name>\n`)
    print.info('A name is required.')
    return
  }

  const domains = filesystem.list('./src/views/')
  const domainChoices = ['(Create New)', ...domains]
  let domainAddAnswer = {}
  let domainPath = ''
  if (format === 'feature') {
    if (!folder) {
      const domainQuestion = 'Add component to which domain?'
      domainAddAnswer = await prompt.ask({
        name: 'domain',
        type: 'list',
        message: domainQuestion,
        choices: domainChoices
      })
      domainPath = (domainAddAnswer.domain === domainChoices[0]) ? '' : domainAddAnswer.domain + '/'
    } else {
      domainPath = (folder === 'views') ? '' : folder + '/'
    }
  }

  const name = parameters.first
  const pascalName = pascalCase(name)

  const props = { name, pascalName }
  if (format === 'feature') {
    let jobs = [
      {
        template: 'component.js.ejs',
        target: `src/views/${domainPath}${name}/${name}.js`
      }, {
        template: 'rollup-index.js.ejs',
        target: `src/views/${domainPath}${name}/index.js`
      }
    ]
  
    if (storybooks) {
      jobs.push({
        template: 'component.story.js.ejs',
        target: `src/views/${domainPath}${name}/${name}.story.js`
      })
    }
  }

  if (format === 'function') {
    let jobs = [
      {
        template: 'component.js.ejs',
        target: folder ? `${componentPath}${folder}/${name}.js` : `${componentPath}${name}.js`
      }
    ]
  
    if (storybooks) {
      jobs.push({
        template: 'component.story.js.ejs',
        target: folder ? `${componentPath}${folder}/${name}.js` : `${componentPath}${name}.js`
      })
    }
  }

   await ignite.copyBatch(context, jobs, props)

  if (storybooks) {
    // wire up example
    if (format === 'function') {
      patching.insertInFile('./storybook/storybook-registry.js', '\n', `require('../src/views/${domainPath}${name}/${name}.story')`)
    } else {
        if (folder) { 
          patching.insertInFile('./storybook/storybook-registry.js', '\n', `require('../${componentPath}${folder}/${name}.story')`)
      } else {
          patching.insertInFile('./storybook/storybook-registry.js', '\n', `require('../${componentPath}${name}.story')`)
      }
    }
  }
}
