const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (base, state) => ({
    ...base,
    // none of react-select's styles are passed to <Control />
    width: 600,
  }),
  // menuList: (base) => ({
  //   ...base,
  //   // kill the white space on first and last option
  //   padding: 0,
  //   minHeight: '300px',
  // }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = 'opacity 300ms'

    return { ...provided, opacity, transition }
  },
}

export default customStyles
