import React from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import TextInput from '../text-input/text-input';

export default class CopyTextInput extends React.PureComponent {
  activateCoin() {
    const coinEl = this.copyCoin;
    coinEl.classList.remove('rising');
    coinEl.classList.add('begin');
    coinEl.offsetHeight;  // eslint-disable-line
    coinEl.classList.add('rising');
  }

  render() {
    const { children } = this.props;

    return (
      <div className="copy-text__container">
        <div className="copy-text__input">
          <TextInput value={children} disabled />
        </div>
        <div className="copy-text__copy-link">
          <div
            id="copy-coin"
            className="copy-coin"
            ref={(c) => { this.copyCoin = c; }}
          >Copied!
          </div>
          <CopyToClipboard
            onCopy={this.activateCoin.bind(this)}
            text={children}
          >
            <span className="copy-text__copy">
              Copy link
            </span>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}

CopyTextInput.propTypes = {
  children: PropTypes.string.isRequired,
};
