'use client';

import Select, { StylesConfig, components, DropdownIndicatorProps } from 'react-select';

interface Option {
  value: string;
  label: string;
  menuLabel?: string;
}

interface SelectProps {
  id?: string;
  value: string;
  placeholder: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  formatOptionLabel?: (option: Option, meta: { context: 'menu' | 'value' }) => React.ReactNode;
  isDisabled?: boolean;
}

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="16"
        height="16"
        className={menuIsOpen ? 'icon iconOpen' : 'icon'}
      >
        <use href="/sprite.svg#icon-chevron-down" />
      </svg>
    </components.DropdownIndicator>
  );
};

export default function CustomSelect({
  id,
  value,
  placeholder,
  options,
  onChange,
  className = '',
  formatOptionLabel,
  isDisabled,
}: SelectProps) {
  const selectedOption = options.find((o) => o.value === value) || null;

  const handleChange = (option: Option | null) => {
    onChange(option ? option.value : '');
  };

  const customStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
      ...base,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: 44,
      padding: '0 16px',
      border: 'none',
      borderRadius: 12,
      backgroundColor: 'var(--white)',
      boxShadow: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: 'var(--main)',
      },
    }),
    valueContainer: (base) => ({
      ...base,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      color: 'var(--main)',
      padding: 0,
    }),
    singleValue: (base) => ({
      ...base,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      color: 'var(--main)',
    }),
    placeholder: (base) => ({
      ...base,
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      color: 'var(--main)',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,     
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 500ms ease',
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      color: 'var(--dark)',
    }),
    menu: (base) => ({
      ...base,
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: 0,
      zIndex: 20,
      width: '100%',
      borderRadius: 12,
      backgroundColor: 'var(--white)',
      border: '1px solid var(--white)',
      boxShadow: '0 4px 36px rgba(0,0,0,0.02)',
      }),
        menuList: (base) => ({
      ...base,
      maxHeight: 272,
      overflowY: 'auto',
      padding: '14px 8px 14px 0',
      '&::-webkit-scrollbar': {
       backgroundColor: 'transparent'
     },
     '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--light-blue)',
    borderRadius: '10px',
    width: '8px',
   },
   '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'var(--dark-blue)',
   },
    }),
    option: (base, state) => ({
      ...base,
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.25,
      padding: '0 14px 8px 18px',
      background: 'transparent',
      color: state.isSelected
        ? 'var(--main)'
        : state.isFocused
        ? 'var(--main)'
        : 'var(--gray)',
    }),
  };

  return (
    <Select
      instanceId={id}
      className={className}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      value={selectedOption}
      onChange={handleChange}
      isSearchable={false}
      isClearable={true}
      isDisabled={isDisabled}
      components={{ DropdownIndicator }}
      formatOptionLabel={formatOptionLabel}
    />
  );
}