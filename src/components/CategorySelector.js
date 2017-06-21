import React from 'react'
import CategoryField from './CategoryField'
import categories from '../categories'
import Filter from './Filter'



const CategorySelector = (props) => {

  const categoryFields = categories.map(
    (category, i) => {

      return (
        <div className="col s6" key={i}>
          <div className="checkbox" >
            <CategoryField 
              handleChange={props.handleChange}
              handleCheckboxChange={props.handleChange}
              label={category}
              type='checkbox'
              key={i}
              /> 
          
          </div>
        </div>
      )
    }
  )


  return (
        <div className="col s6 pinned">
        <div id='category-selector' className="col s6 card">  
        <h4 id='filter-title'>Filter By: </h4>
                { categoryFields }
            <Filter filter={props.filter} onChange={ props.onChange }/>
        </div>
        </div>
      
  )
}

export default CategorySelector