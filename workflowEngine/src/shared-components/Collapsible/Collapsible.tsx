import React, { FC, useState } from 'react';
import { CollapsibleWrapper, CollapsibleHeader, CollapsibleBody } from './Collapsible_Styled';

interface CollapsibleProps {
  open?: boolean;
  title: string;
  onOpen: () => void;
  onClose: () => void;
}

const Collapsible: FC<CollapsibleProps> = ({ open = false, title, onOpen, onClose, children }) => {
  const [isOpen, toggleOpen] = useState(open || false);

  const handleToggle = () => {
    if (isOpen) {
      toggleOpen(false);
      if (onClose) onClose();
    } else {
      toggleOpen(true);
      if (onOpen) onOpen();
    }
  };

  return (
    <CollapsibleWrapper>
      <CollapsibleHeader onClick={handleToggle} open={isOpen} title={title} aria-expanded={isOpen}>
        {title}
      </CollapsibleHeader>
      {isOpen && <CollapsibleBody>{children}</CollapsibleBody>}
    </CollapsibleWrapper>
  );
};

export default Collapsible;
