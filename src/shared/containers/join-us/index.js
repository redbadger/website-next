import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Cell } from '../../components/grid';
import { updateContentArea } from '../../content-areas';
import Container from '../../components/container';
import HtmlViewer from '../../components/areas/html/viewer';
import Jobs from '../../components/jobs';
import React, { Component, PropTypes } from 'react';
import Section from '../../components/section';
import styles from './style.css';
import Video from '../../components/video';

class JoinUs extends Component {
  static propTypes = {
    areas: PropTypes.array.isRequired
  };
  static contentIds = ['1', '2', '3', '4'];
  getContentArea = (id) => this.props.areas.find(area => area.id === id);
  render () {
    return (
      <div>
        <Section>
          <Container>
            <HtmlViewer content={this.getContentArea('1').content} />
            <Grid fit>
              <Cell>
                <HtmlViewer content={this.getContentArea('2').content} />
              </Cell>
              <Cell>
                <Video id="110925126" type="vimeo" />
              </Cell>
            </Grid>
          </Container>
        </Section>
        <div className={styles.listings}>
          <Section>
            <Container>
              <HtmlViewer content={this.getContentArea('3').content} />
              <Jobs />
            </Container>
          </Section>
        </div>
        <div className={styles.apply}>
          <Section>
            <Container>
              <HtmlViewer content={this.getContentArea('4').content} />
            </Container>
          </Section>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    areas: JoinUs.contentIds.map(id => state.contentAreas.areasById[id])
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({updateContentArea}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinUs);
