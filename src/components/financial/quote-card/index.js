import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import 'react-contexify/dist/ReactContexify.min.css';
import { contextMenu, Menu } from 'react-contexify';
import uuid from 'uuid';
import {
  BaseCard,
  QuoteShortContainer,
  QuoteShortCodeArea,
  ContentArea,
  MenuArea,
  IconButton,
  getMenuIcon,
  getMenuStyle,
  ContextMenuItem,
  HeaderArea,
} from './theme';
import Box from '../../layout/box';

const PORTIONS = {
  tag: 'TAG',
  header: 'HEADER',
  content: 'CONTENT',
  menu: 'MENU',
};

const QuoteCardMenu = ({ children, portion, ...props }) => (
  <div {...props}>{children}</div>
);
QuoteCardMenu.defaultProps = {
  portion: PORTIONS.menu,
};
const QuoteCardContent = ({ children, portion, ...props }) => (
  <div {...props}>{children}</div>
);
QuoteCardContent.defaultProps = {
  portion: PORTIONS.content,
};
const QuoteCardHeader = ({ children, portion, ...props }) => (
  <div {...props}>{children}</div>
);
QuoteCardHeader.defaultProps = {
  portion: PORTIONS.header,
};
const QuoteCardTag = ({ children, portion, ...props }) => (
  <div {...props}>{children}</div>
);
QuoteCardTag.defaultProps = {
  portion: PORTIONS.tag,
};

const QuoteCard = props => {
  const {
    theme,
    type,
    colorIndex,
    onEdit,
    onCancel,
    useDefaultContextMenu,
    children,
    ...rest
  } = props;

  const [menuId] = useState(uuid.v1());

  const renderContextMenu = () => (
    <Menu animation="fade" id={menuId} {...getMenuStyle(theme)}>
      <ContextMenuItem type="primary" onClick={onEdit}>
        Edit
      </ContextMenuItem>
      <ContextMenuItem type="warn" onClick={onCancel}>
        Cancel RFQ
      </ContextMenuItem>
    </Menu>
  );

  const openContextMenu = e => {
    const rtlEvent = {
      x: e.x - 180,
      y: e.y,
      clientX: e.clientX - 180,
      clientY: e.clientY,
      stopPropagation: () => {
        e.stopPropagation();
      },
    };
    contextMenu.show({ id: menuId, event: rtlEvent });
  };

  let TagPortion = null;
  let HeaderPortion = null;
  let contentPortion = [];
  let MenuPortion = null;
  if (children) {
    TagPortion = children.find(el => el.props.portion === PORTIONS.tag);
    HeaderPortion = children.find(el => el.props.portion === PORTIONS.header);
    contentPortion = children.filter(
      el => el.props.portion === PORTIONS.content,
    );
    MenuPortion = children.find(el => el.props.portion === PORTIONS.menu);
  }

  return (
    <BaseCard {...rest} type={type} hasMenu={MenuPortion}>
      <QuoteShortContainer>
        <QuoteShortCodeArea colorIndex={colorIndex} type={type}>
          {TagPortion}
        </QuoteShortCodeArea>
      </QuoteShortContainer>
      {HeaderPortion && <HeaderArea>{HeaderPortion}</HeaderArea>}
      <ContentArea>
        <Box vertical space={16}>
          {contentPortion.map(el => el)}
        </Box>
      </ContentArea>
      {(MenuPortion || useDefaultContextMenu) && (
        <MenuArea hasContent={useDefaultContextMenu || !!MenuPortion}>
          {useDefaultContextMenu ? (
            <React.Fragment>
              <IconButton onClick={openContextMenu}>
                <img src={getMenuIcon(props)} alt="menu-icon" />
              </IconButton>
              {renderContextMenu()}
            </React.Fragment>
          ) : (
            MenuPortion
          )}
        </MenuArea>
      )}
    </BaseCard>
  );
};

QuoteCard.propTypes = {
  theme: PropTypes.object.isRequired,
  colorIndex: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['regular', 'small']),
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node.isRequired,
};

QuoteCard.defaultProps = {
  type: 'regular',
  onEdit: null,
  onCancel: null,
};

QuoteCard.QuoteCardTag = QuoteCardTag;
QuoteCard.QuoteCardMenu = QuoteCardMenu;
QuoteCard.QuoteCardHeader = QuoteCardHeader;
QuoteCard.QuoteCardContent = QuoteCardContent;
export default withTheme(QuoteCard);
