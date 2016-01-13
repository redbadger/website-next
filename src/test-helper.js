import TestUtils from 'react-addons-test-utils';

const renderer = TestUtils.createRenderer();

export default {
	render: (component) => {
	    renderer.render(component);
	    return renderer.getRenderOutput();
	}
};