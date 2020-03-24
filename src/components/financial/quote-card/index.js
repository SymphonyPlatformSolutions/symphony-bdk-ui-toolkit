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

export const QuoteCardMenu = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const QuoteCardContent = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const QuoteCardHeader = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);
export const QuoteCardTag = ({ children, ...props }) => (
  <div {...props}>{children}</div>
);

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
    TagPortion = children.find(el => el.type.displayName === 'QuoteCardTag');
    HeaderPortion = children.find(el => el.type.displayName === 'QuoteCardHeader');
    contentPortion = children.filter(
      el => el.type.displayName === 'QuoteCardContent',
    );
    MenuPortion = children.find(el => el.type.displayName === 'QuoteCardMenu');
  }

  return (
    <BaseCard {...rest} type={type} hasMenu={MenuPortion}>
      <QuoteShortContainer>
        <QuoteShortCodeArea colorIndex={colorIndex} type={type}>
          {TagPortion}
        </QuoteShortCodeArea>
      </QuoteShortContainer>
      { HeaderPortion && (
          <HeaderArea>
            {HeaderPortion}
          </HeaderArea>)
      }
      <ContentArea>
        <Box vertical space={16}>
          {contentPortion.map(el => el)}
        </Box>
      </ContentArea>
      {MenuPortion && (<MenuArea hasContent={useDefaultContextMenu || !!MenuPortion}>
        {useDefaultContextMenu ? (
          <>
            <IconButton onClick={openContextMenu}>
              <img src={getMenuIcon(props)} alt="menu-icon" />
            </IconButton>
            {renderContextMenu()}
          </>
        ) : (
          MenuPortion
        )}
      </MenuArea>)}
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

export default withTheme(QuoteCard);
