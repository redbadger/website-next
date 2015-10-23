import React from 'react';

export default class EmbeddedGist extends React.Component {

  static propTypes = {
    id: React.PropTypes.string.isRequired,
    file: React.PropTypes.string,
  };

  static gistCallbackId = 0;
  static nextGistCallback() {
    return 'embed_gist_callback_' + EmbeddedGist.gistCallbackId++;
  }

  static stylesheetAdded = false;
  static addStylesheet(href) {
    if (!EmbeddedGist.stylesheetAdded) {
      EmbeddedGist.stylesheetAdded = true;
      var link = document.createElement('link');
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = href;

      document.head.appendChild(link);
    }
  }

  state = {
    loading: true,
    src: "",
  };

  componentDidMount() {
    // Create a JSONP callback that will set our state
    // with the data that comes back from the Gist site
    const gistCallback = EmbeddedGist.nextGistCallback();
    window[gistCallback] = function(gist) {
      this.setState({
        loading: false,
        src: gist.div,
      });
      EmbeddedGist.addStylesheet(gist.stylesheet);
    }.bind(this);

    let url = "https://gist.github.com/" + this.props.id + ".json?callback=" + gistCallback;
    if (this.props.file) {
      url += "&file=" + this.props.file;
    }

    // Add the JSONP script tag to the document.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    } else {
      return <div dangerouslySetInnerHTML={{ __html: this.state.src }} />;
    }
  }
}
