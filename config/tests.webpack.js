/*
 * require.context all src to instrument the code coverage tool
 */

const componentsContext = require.context('../src/components/', true, /\.js$/);

componentsContext.keys().forEach(componentsContext);
