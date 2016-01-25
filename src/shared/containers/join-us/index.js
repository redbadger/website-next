import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Cell } from '../../components/grid';
import { updateContentArea } from '../../content-areas';
import Container from '../../components/container';
import HtmlViewer from '../../components/areas/html/viewer';
import Jobs from '../../components/jobs';
import React, { PropTypes } from 'react';
import Section from '../../components/section';
import styles from './style.css';
import Video from '../../components/video';

function getContentArea (id, areas) {
  return areas.find(area => area.id === id);
}

function JoinUs ({ areas }) {
  return (
    <div>
      <Section>
        <Container>
          <HtmlViewer content={getContentArea('1', areas).content} />
          <Grid fit>
            <Cell>
              <HtmlViewer content={getContentArea('2', areas).content} />
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
            <HtmlViewer content={getContentArea('3', areas).content} />
            <Jobs />
          </Container>
        </Section>
      </div>
      <div className={styles.apply}>
        <Section>
          <Container>
            <HtmlViewer content={getContentArea('4', areas).content} />
          </Container>
        </Section>
      </div>
    </div>
  );
}

JoinUs.propTypes = {
  areas: PropTypes.array.isRequired
};

JoinUs.contentIds = ['1', '2', '3', '4'];

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
