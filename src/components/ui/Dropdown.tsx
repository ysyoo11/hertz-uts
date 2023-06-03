import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { useMemo } from 'react';

export type DropdownItem = {
  label: string;
  onClick: () => void;
  current?: boolean;
};

interface Props {
  dropdownButton: JSX.Element;
  dropdownItems: DropdownItem[];
  menuClassName?: string;
  buttonClassName?: string;
  className?: string;
  disabledElemArr?: string[];
  label?: string;
}

export default function Dropdown({
  label,
  dropdownButton,
  dropdownItems,
  buttonClassName,
  menuClassName,
  className,
  disabledElemArr = [],
}: Props) {
  const parsedDropdownItems = useMemo(
    () => dropdownItems.filter((item) => !disabledElemArr.includes(item.label)),
    [dropdownItems, disabledElemArr]
  );

  return (
    <Menu as='div' className={clsx('relative', className)}>
      {label && <label>{label}</label>}
      <Menu.Button
        className={clsx(
          'mt-1 inline-flex justify-center rounded-xl border border-gray-500 py-3 px-4 font-medium shadow-sm hover:bg-gray-100 focus:outline-none',
          buttonClassName
        )}
      >
        {dropdownButton}
      </Menu.Button>

      <Menu.Items
        className={clsx(
          'absolute right-1 z-10 mt-2 w-full origin-top-right overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black focus:outline-none',
          menuClassName
        )}
      >
        {parsedDropdownItems.map((item, idx) => (
          <Menu.Item key={`dropdown-item-${idx}`}>
            {({ active }) => (
              <button
                onClick={item.onClick}
                className={clsx(
                  'block overflow-hidden line-clamp-1',
                  active || item.current
                    ? 'bg-hertz text-white'
                    : 'text-theme-700-light dark:text-theme-700-dark',
                  'w-full px-4 py-2 text-left text-sm'
                )}
              >
                {item.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
