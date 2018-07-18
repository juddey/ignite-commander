// Ignite CLI plugin for Commander
// ----------------------------------------------------------------------------

// const NPM_MODULE_NAME = 'react-native-MODULENAME'
// const NPM_MODULE_VERSION = '0.0.1'

// const PLUGIN_PATH = __dirname
// const APP_PATH = process.cwd()

const add = async function (context) {
}

/**
 * Remove yourself from the project.
 */
const remove = async function (context) {
  // Learn more about context: https://infinitered.github.io/gluegun/#/context-api.md
  // const { ignite, filesystem } = context

  // remove the npm module and unlink it
  // await ignite.removeModule(NPM_MODULE_NAME, { unlink: true })

  // Example of removing App/Commander folder
  // const removeCommander = await context.prompt.confirm(
  //   'Do you want to remove App/Commander?'
  // )
  // if (removeCommander) { filesystem.remove(`${APP_PATH}/App/Commander`) }

  // Example of unpatching a file
  // ignite.patchInFile(`${APP_PATH}/App/Config/AppConfig.js`, {
  //   delete: `import '../Commander/Commander'\n`
  // )
}

// Required in all Ignite CLI plugins
module.exports = { add, remove }
