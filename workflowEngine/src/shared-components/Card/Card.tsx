import React, { FC } from 'react';
import Card from './Card_Styled';

interface CardProps {
  height?: string | undefined;
  fullHeight?: boolean;
}

/**
 * The Card component represents the a simple panel wrapper with curved borders.
 * It will be mainly used in the left, middle, and right panels.
 *
 * @param children - Allows developers to wrap the component with other components
 * @param height - Allows developers to adjust the height of the card
 */
const CardComponent: FC<CardProps> = ({ children, height, ...rest }) => (
  <Card height={height} {...rest}>
    {children}
  </Card>
);

const defaultProps = {
  children: null,
  height: 'auto',
};

Card.defaultProps = defaultProps;

export default CardComponent;
