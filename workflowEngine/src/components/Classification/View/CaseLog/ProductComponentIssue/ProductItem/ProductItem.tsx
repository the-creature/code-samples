import React, { FC, KeyboardEvent, useEffect } from 'react';
import { ProductItem } from './ProductItem_Styled';

interface ProductItemProps {
  /** Determines the view state of the button */
  active: string | boolean;
  /** Allows the parent component to trigger certain actions */
  onClick: (e?: MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  /** The image src data for rendering the image inside the button */
  image: string;
  /** The text label displayed underneath the image */
  name: string;
  id?: string;
  tabIndex: number;
}

/**
 * The ProductItem component is used to display the
 * product list as a button with an image and label
 */
const ProductItemComponent: FC<ProductItemProps> = ({
  active,
  onClick,
  onKeyDown,
  image,
  name,
  id,
  tabIndex,
}) => {
  /**
   * Reference to the product button
   * @type {React.RefObject<any>}
   */
  const productButton = React.createRef<HTMLButtonElement>();

  /**
   * Triggers the focus state for accessibility requirements
   */
  const handleButtonClick = () => {
    onClick();
    if (productButton && productButton.current !== null) {
      productButton.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    onKeyDown(e);
  };

  useEffect(() => {
    if (active && productButton && productButton.current !== null) {
      productButton.current.focus();
    }
  }, [active]);

  return (
    <ProductItem
      aria-label={name}
      aria-checked={active ? true : false}
      tabIndex={tabIndex}
      id={id}
      active={active}
      onClick={handleButtonClick}
      onKeyDown={handleKeyDown}
      ref={productButton}
      role="radio"
      className="product"
    >
      <img src={image} aria-hidden="true" />
      <br />
      {name}
    </ProductItem>
  );
};

export default ProductItemComponent;
