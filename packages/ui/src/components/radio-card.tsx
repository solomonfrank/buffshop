"use client";

import classNames from "classnames";
import { useState } from "react";

export type CardItem = {
  title: string;
  description: string;
  startIcon?: React.ReactElement;
};

type RenderitemProps<T> = {
  item: T;
  isSelected: boolean;
  handleClick: (idx: number) => void;
  index: number;
};
type RadioCardprops<T> = {
  items: T[];
  renderitem: (props: RenderitemProps<T>) => JSX.Element;
  className?: string;
  onChange?: (item: T) => void;
  label?: string;
  defaultActiveKey?: number;
};

export const RadioCard = <Entry extends { title?: string }>({
  items,
  renderitem,
  className,
  onChange,
  defaultActiveKey,
}: RadioCardprops<Entry>) => {
  const [selectedIndex, setSelected] = useState(defaultActiveKey);

  const handleClick = (idx: number) => {
    if (onChange) {
      if (items.length && items[idx]) {
        onChange(items[idx]);
      }
    }
    setSelected(idx);
  };

  return (
    <div className={classNames("flex flex-col", className)}>
      {items.map((item, idx) => {
        const isSelected = selectedIndex === idx;
        return renderitem({ item, isSelected, handleClick, index: idx });
      })}
    </div>
  );
};
