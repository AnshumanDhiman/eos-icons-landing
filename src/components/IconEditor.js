import React, { useState, useEffect } from 'react'
import { SketchPicker } from 'react-color'
import Button from './Button'
import axios from 'axios'
import loading from '../assets/images/loading-white.svg'

const IconEditor = (props) => {
  const apiBaseUrl = 'https://eos-icons-picker-api.herokuapp.com/'

  const { isActive, show, iconNames } = props
  const [currentPosition, setCurrentPosition] = useState(0)
  const [exportAs, setExportAs] = useState('svg')
  const [exportSize, setExportSize] = useState('512')
  const [color, setColor] = useState('#000000')
  const [rotateAngle, setRotateAngle] = useState(0)
  const [horizontalFlip, setHorizontalFlip] = useState(false)
  const [verticalFlip, setVerticalFlip] = useState(false)
  const [generating, setGenerate] = useState(false)
  const exportSizes = [
    '18',
    '24',
    '32',
    '48',
    '64',
    '128',
    '256',
    '512',
    '1024'
  ]
  const changeColor = (color) => {
    setColor(color.hex)
  }

  const rotateIcon = (angle) => {
    angle += rotateAngle
    setRotateAngle(angle)
  }

  const changeExportType = () => {
    setExportAs(document.getElementsByClassName('export-type')[0].value)
  }
  const changeExportSize = () => {
    setExportSize(document.getElementsByClassName('export-size')[0].value)
  }
  const flipIconHorizontal = (e) => {
    e.preventDefault()
    setHorizontalFlip(!horizontalFlip)
  }

  const flipIconVertical = (e) => {
    e.preventDefault()
    setVerticalFlip(!verticalFlip)
  }

  const changePosition = (action) => {
    if (currentPosition === iconNames.length - 1 && action === 1)
      setCurrentPosition(0)
    else if (currentPosition === 0 && action === -1)
      setCurrentPosition(iconNames.length - 1)
    else setCurrentPosition(currentPosition + action)
  }
  useEffect(() => {
    document.getElementsByClassName('icon-preview')[0].style.color = color
    document
      .getElementsByClassName('icon-preview')[0]
      .getElementsByTagName('i')[0].style.transform = `scaleX(${
      horizontalFlip ? -1 : 1
    }) scaleY(${verticalFlip ? -1 : 1}) rotate(${rotateAngle}deg)`
  }, [rotateAngle, color, horizontalFlip, verticalFlip])

  const postDataToApi = async (params) => {
    const { url, payload } = params

    const response = await axios.post(url, payload)
    return response.data
  }
  const downloadCustomizedIcon = (props) => {
    const { timestamp } = props
    const downloadEndPoints = `${apiBaseUrl}download?ts=${timestamp}`
    if (iconNames.length === 1) {
      return window.open(
        `${apiBaseUrl}icon-download?ts=${timestamp}&type=${exportAs}&iconName=${iconNames[0]}`,
        '_blank'
      )
    }
    return window.open(downloadEndPoints, '_blank')
  }
  const generateCustomizedIcon = (e) => {
    if (!generating) {
      e.preventDefault()
      setGenerate(true)
      postDataToApi({
        url: `${apiBaseUrl}icon-customization`,
        payload: {
          icons: iconNames,
          exportAs: exportAs,
          exportSize: exportSize,
          customizationConfig: {
            colorCode: color,
            rotateAngle: rotateAngle,
            flip: { horizontal: horizontalFlip, vertical: verticalFlip }
          }
        }
      }).then((res) => {
        setGenerate(false)
        downloadCustomizedIcon({ timestamp: res })
      })
    }
  }

  return isActive ? (
    <div className='icon-editor'>
      <div className='icon-editor-card'>
        <div className='close' onClick={show} />
        <h2>Customize Icon</h2>
        <div className='flex flex-row icon-editor-content'>
          <div>
            <p>Color Picker</p>
            <SketchPicker
              className='color-picker'
              color={color}
              onChangeComplete={changeColor}
            />
            <div className='transform-div'>
              <p>Transform</p>
              <div>
                <p>Rotate</p>
                <button onClick={() => rotateIcon(-90)}>
                  <i className='eos-icons'>rotate_left</i>
                </button>
                <button onClick={() => rotateIcon(90)}>
                  <i className='eos-icons'>rotate_right</i>
                </button>
              </div>
              <div>
                <p>Flip</p>
                <button onClick={flipIconHorizontal}>
                  <i className='eos-icons'>flip</i>
                </button>
                <button onClick={flipIconVertical}>
                  <i className='eos-icons rotate-flip-icon'>flip</i>
                </button>
              </div>
            </div>
          </div>
          <div className='icon-div'>
            <p>
              Icon Preview{' '}
              {iconNames.length > 1
                ? `: ${currentPosition + 1} of ${iconNames.length}`
                : ''}
            </p>
            <div className='icon-preview-box'>
              {iconNames.length > 1 ? (
                <div onClick={() => changePosition(-1)}>
                  <i className='eos-icons nxt-icon-btn'>keyboard_arrow_left</i>
                </div>
              ) : (
                ''
              )}
              <div className='icon-preview'>
                <i className='eos-icons'>{iconNames[currentPosition]}</i>
              </div>
              {iconNames.length > 1 ? (
                <div onClick={() => changePosition(1)}>
                  <i className='eos-icons nxt-icon-btn'>keyboard_arrow_right</i>
                </div>
              ) : (
                ''
              )}
            </div>
            <p>Select Image Format</p>
            <div className='dropdown fill-dropdown'>
              <select className='export-type' onChange={changeExportType}>
                <option value='svg'>SVG</option>
                <option value='png'>PNG</option>
              </select>
            </div>
            {exportAs === 'png' ? (
              <div>
                <p>Select Size</p>
                <div className='dropdown fill-dropdown'>
                  <select
                    defaultValue={exportSize}
                    className='export-size'
                    onChange={changeExportSize}
                  >
                    {exportSizes.map((size, key) => (
                      <option key={key} value={`${size}`}>
                        {`${size}`} x {`${size}`} px
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              ''
            )}

            <div className='export-btn'>
              <Button type='button' onClick={generateCustomizedIcon}>
                {!generating ? (
                  <span>
                    <i className='eos-icons eos-18'>file_download</i> Export as{' '}
                    {exportAs.toUpperCase()}
                  </span>
                ) : (
                  <span>
                    Exporting Icon{' '}
                    <img
                      className='btn-loading-icon'
                      src={loading}
                      alt='loading-icon'
                    />
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

export default IconEditor