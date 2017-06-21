import React, { Component, PropTypes } from 'react';


class CategoryField extends Component {
  state = this.props.label === 'All' ? { isChecked: true } : { isChecked: false }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
    handleCheckboxChange(label);
  }

  render() {
    
    const { label } = this.props;
    const { isChecked } = this.state;
    

    return (
        <div className={this.props.type} >
          <form>
            <input
                id={label[0]}
                type={this.props.type}
                value={label}
                checked={isChecked}
                onChange={(e) => this.toggleCheckboxChange(e)}
                />
            <label htmlFor={label[0]}>
             {label}
            </label>
          </form>
        </div>
    )
  }
}

CategoryField.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default CategoryField;