import React, { useReducer, useEffect, useState } from 'react'
import { iconsReducer, eosIconsState } from '../utils/EosIcons.store'

/* Components */
import Icon from '../components/IconDisplay'
import Tabs from '../components/Tabs'
import Toogle from '../components/Toggle'
import SearchIcon from '../components/SearchIcon'
import CustomizeIconsPanel from '../components/CustomizeIconsPanel'
import AnimatedIcons from './AnimatedIcons'
import HowTo from '../components/HowToPanel'

const IconsSet = props => {

  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch({ type: 'TOGGLE_SEARCH', search: search })
  }, [search])

  const [state, dispatch] = useReducer(iconsReducer, eosIconsState)

  const selectIcon = icon => {
    setShowPanel(true)
    setIconSelected(icon)
    return dispatch({
      type: state.customize ? 'ADD_MULTIPLE_ICONS' : '',
      selection: icon.name
    })
  }

  /* Toggle customizable functionality */
  const toggleCustomize = () => {
    props.action()
    return dispatch({ type: 'TOGGLE_CUSTOMIZE' })
  }

  // show HowTo panel
  const [iconSelected, setIconSelected] = useState('')
  const [showPanel, setShowPanel] = useState(false)

  const closeHowTo = () => {
    setShowPanel(false)
    setIconSelected('')
  }

  // Mark icon as active
  const isActive = (current) => {
    if (state.customize) {
      return state.multipleIcons.indexOf(current) < 0 ? false : true
    }
    else {
      return current === iconSelected.name ? true : false
    }
  }

  const selectAll = () => {
    return dispatch({ type: 'ADD_ALL_ICONS' })
  }

  const deselectAll = () => {
    return dispatch({ type: 'REMOVE_ALL_ICONS' })
  }

  return (
    <>
      <div className='toolbar'>
        <Toogle name='Icon picker' onClick={toggleCustomize} />
        <SearchIcon onChange={setSearch} />
      </div>
      <Tabs>
        <div label='Regular Icons'>
          <div className='icons-list'>
            {state.icons.map((ele, index) => {

              return <Icon size={36} active={isActive(ele.name)} key={index} name={ele.name} action={() => selectIcon(ele)} />
            }
            )}
          </div>
          {!state.customize ? (
            <div className='how-to-use-block'>
              <HowTo show={showPanel} iconName={iconSelected.name} iconTags={iconSelected.tags} type='static' close={closeHowTo} />
            </div>
          ) : (
              <div className='how-to-use-block'>
                <CustomizeIconsPanel selectAll={selectAll} deselectAll={deselectAll} />
              </div>
            )}
        </div>
        <div label='Animated Icons'>
          <div className='icons-list'>
            <AnimatedIcons />
          </div>
        </div>
      </Tabs>
    </>
  )
}

export default IconsSet