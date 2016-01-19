/*
 * require.context all src to instrument the code coverage tool
 */

const sharedContext = require.context('../src/shared/', true, /\.js$/);

sharedContext.keys().forEach(sharedContext);
