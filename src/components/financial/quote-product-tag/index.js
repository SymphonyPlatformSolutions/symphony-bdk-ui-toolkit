import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import {
  BaseQuoteTag, SideInfo, MainInfo, IconImage, IconButton, getCloseIcon,
} from './theme';

const loadingIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHJ4PSI1IiBzdHJva2U9InVybCgjcGFpbnQwX2FuZ3VsYXIpIiBzdHJva2Utd2lkdGg9IjIiLz48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InBhaW50MF9hbmd1bGFyIiBjeD0iMCIgY3k9IjAiIHI9IjEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDYgNikgcm90YXRlKDkwKSBzY2FsZSg2KSI+PHN0b3Agc3RvcC1jb2xvcj0iIzQ1OUFGNyIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDU5QUY3Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PC9zdmc+';
const errorIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuODEyNSA2QzExLjgxMjUgOS4yMTA4NyA5LjIwOTkzIDExLjgxMjUgNiAxMS44MTI1QzIuNzkwMDcgMTEuODEyNSAwLjE4NzUgOS4yMTA4NyAwLjE4NzUgNkMwLjE4NzUgMi43OTEwMSAyLjc5MDA3IDAuMTg3NSA2IDAuMTg3NUM5LjIwOTkzIDAuMTg3NSAxMS44MTI1IDIuNzkxMDEgMTEuODEyNSA2Wk02IDcuMTcxODhDNS40MDQ1NyA3LjE3MTg4IDQuOTIxODggNy42NTQ1NyA0LjkyMTg4IDguMjVDNC45MjE4OCA4Ljg0NTQzIDUuNDA0NTcgOS4zMjgxMiA2IDkuMzI4MTJDNi41OTU0MyA5LjMyODEyIDcuMDc4MTIgOC44NDU0MyA3LjA3ODEyIDguMjVDNy4wNzgxMiA3LjY1NDU3IDYuNTk1NDMgNy4xNzE4OCA2IDcuMTcxODhaTTQuOTc2NDEgMy4yOTY1OEw1LjE1MDI3IDYuNDg0MDhDNS4xNTg0MSA2LjYzMzIzIDUuMjgxNzMgNi43NSA1LjQzMTEgNi43NUg2LjU2ODlDNi43MTgyNyA2Ljc1IDYuODQxNTkgNi42MzMyMyA2Ljg0OTczIDYuNDg0MDhMNy4wMjM1OSAzLjI5NjU4QzcuMDMyMzggMy4xMzU0NyA2LjkwNDEgMyA2Ljc0Mjc2IDNINS4yNTcyMkM1LjA5NTg3IDMgNC45Njc2MiAzLjEzNTQ3IDQuOTc2NDEgMy4yOTY1OFoiIGZpbGw9IiNGRjQ4NDAiLz48L3N2Zz4=';
const successIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxMiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTEuODEyNSA2QzExLjgxMjUgOS4yMTAxNiA5LjIxMDE2IDExLjgxMjUgNiAxMS44MTI1QzIuNzg5ODQgMTEuODEyNSAwLjE4NzUgOS4yMTAxNiAwLjE4NzUgNkMwLjE4NzUgMi43ODk4NCAyLjc4OTg0IDAuMTg3NSA2IDAuMTg3NUM5LjIxMDE2IDAuMTg3NSAxMS44MTI1IDIuNzg5ODQgMTEuODEyNSA2Wk01LjMyNzY3IDkuMDc3NjdMOS42NDAxNyA0Ljc2NTE3QzkuNzg2NjEgNC42MTg3MyA5Ljc4NjYxIDQuMzgxMjkgOS42NDAxNyA0LjIzNDg1TDkuMTA5ODUgMy43MDQ1M0M4Ljk2MzQxIDMuNTU4MDcgOC43MjU5NyAzLjU1ODA3IDguNTc5NTEgMy43MDQ1M0w1LjA2MjUgNy4yMjE1MkwzLjQyMDQ5IDUuNTc5NTFDMy4yNzQwNSA1LjQzMzA3IDMuMDM2NjEgNS40MzMwNyAyLjg5MDE1IDUuNTc5NTFMMi4zNTk4MyA2LjEwOTgzQzIuMjEzMzkgNi4yNTYyNyAyLjIxMzM5IDYuNDkzNzEgMi4zNTk4MyA2LjY0MDE1TDQuNzk3MzMgOS4wNzc2NUM0Ljk0Mzc5IDkuMjI0MTEgNS4xODEyMSA5LjIyNDExIDUuMzI3NjcgOS4wNzc2N1oiIGZpbGw9IiMwMEE1MDAiLz48L3N2Zz4=';

const QuoteProductTag = (props) => {
  const {
    mainInfo, sideInfo, tagState, onClose, ...rest
  } = props;

  const renderIcon = () => {
    switch (tagState) {
      case 'active':
        return (
          <IconButton
            onClick={onClose}
          >
            <img src={getCloseIcon(props)} alt="icon" />
          </IconButton>
        );
      case 'loading':
        return (
          <IconImage src={loadingIcon} alt="icon" />
        );
      case 'error':
        return (
          <IconImage src={errorIcon} alt="icon" />
        );
      case 'success':
        return (
          <IconImage src={successIcon} alt="icon" />
        );
      case 'default':
      case 'disabled':
      case 'removed':
      case 'added':
      default:
        return null;
    }
  };

  return (
    <BaseQuoteTag horizontal type="flat" align="center" tagState={tagState} {...rest}>
      {sideInfo
        && <SideInfo tagState={tagState}>{sideInfo.toUpperCase()}</SideInfo>}
      <MainInfo tagState={tagState}>{mainInfo.toUpperCase()}</MainInfo>
      {renderIcon()}
    </BaseQuoteTag>
  );
};

QuoteProductTag.propTypes = {
  mainInfo: PropTypes.string.isRequired,
  sideInfo: PropTypes.string,
  tagState: PropTypes.oneOf(['default', 'active', 'disabled', 'loading', 'error', 'success', 'removed', 'added']),
  onClose: PropTypes.func,
};

QuoteProductTag.defaultProps = {
  sideInfo: null,
  tagState: 'default',
  onClose: null,
};

export default withTheme(QuoteProductTag);
