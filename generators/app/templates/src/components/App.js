import React from 'react';
import PropTypes from 'prop-types';
import { tokens } from '../designTokens';

const styles = {
  shell: {
    maxWidth: 960,
    margin: '0 auto',
    padding: tokens.space.space6,
    color: tokens.color.textStrong,
    fontFamily: tokens.type.fontBody,
    fontSize: tokens.type.textBody,
    lineHeight: tokens.type.lineBody
  },
  panel: {
    marginTop: tokens.space.space6,
    padding: tokens.space.space6,
    background: tokens.color.surfaceMuted,
    border: '1px solid ' + tokens.color.border
  },
  title: {
    margin: 0,
    fontSize: tokens.type.textTitle
  },
  muted: {
    color: tokens.color.textMuted
  },
  button: {
    marginTop: tokens.space.space4,
    padding: tokens.space.space3 + 'px ' + tokens.space.space4 + 'px',
    border: 0,
    background: tokens.color.accent,
    color: tokens.color.surface,
    cursor: 'pointer'
  }
};

export default function App(props) {
  return (
    <section style={styles.shell}>
      <h1 style={styles.title}>React Redux Saga</h1>
      <p style={styles.muted}>Node 12.8 compatible starter with actions, reducers, and Saga middleware.</p>
      <div style={styles.panel} aria-live="polite">
        <strong>Status</strong>
        <p>{props.message}</p>
        {props.error ? <p>{props.error}</p> : null}
        <button type="button" style={styles.button} onClick={props.onFetchGreeting}>
          Run saga action
        </button>
      </div>
    </section>
  );
}

App.propTypes = {
  error: PropTypes.string,
  message: PropTypes.string.isRequired,
  onFetchGreeting: PropTypes.func.isRequired
};

App.defaultProps = {
  error: null
};
