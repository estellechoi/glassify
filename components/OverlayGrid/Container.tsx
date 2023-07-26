import { Children, isValidElement, useCallback, type ReactNode, useMemo, useState } from 'react';
import Item from './Item';
import Button from '@/components/Button';

const getItems = (children: ReactNode) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === Item);
};

type ContainerProps = { children: ReactNode; xUnitPx: number; isExpandable?: boolean; className?: string };

const Container = ({ children, xUnitPx, isExpandable = false, className = '' }: ContainerProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const items = useMemo(() => getItems(children), [children]);
  const getItemStyle = useCallback(
    (index: number) => {
      const left = isExpanded ? 'auto' : `${xUnitPx * index}px`;
      const right = isExpanded ? `${xUnitPx * (items.length - 1 - index)}px` : 'auto';
      const zIndex = isExpanded ? index : items.length - 1 - index;

      return {
        left,
        right,
        zIndex,
      };
    },
    [items.length, xUnitPx, isExpanded]
  );

  const hoverTranslateClassName = `Transition_500 transition-transform ${
    isExpanded ? 'hover:-translate-x-2' : 'hover:translate-x-2'
  }`;

  const leftShadowOpacityClassName = `Transition_500 transition-all ${isExpanded ? 'opacity-100' : 'opacity-0'}`;

  return (
    <ul className={`Component relative w-full ${className}`}>
      {items.map((child, index) => (
        <li
          key={index}
          className={`${index > 0 ? 'absolute top-0' : 'relative'} w-fit Elevation_2 ${hoverTranslateClassName}`}
          style={getItemStyle(index)}
        >
          {child}
        </li>
      ))}

      <span
        aria-hidden
        className={`absolute -inset-y-0.5 -left-1 z-[11] w-24 bg-primary_left_to_right ${leftShadowOpacityClassName}`}
      ></span>

      <span aria-hidden className={`absolute -inset-y-0.5 -right-1 z-[11] w-24 bg-primary_right_to_left`}></span>

      {isExpandable && (
        <Button
          aria-hidden
          color="primary_inverted"
          type="outline"
          size="sm"
          iconType={isExpanded ? 'chevron_left' : 'chevron_right'}
          label="View more"
          labelHidden
          className="absolute inset-y-0 right-0 z-[11]"
          onClick={onToggleExpand}
        />
      )}
    </ul>
  );
};

export default Container;
