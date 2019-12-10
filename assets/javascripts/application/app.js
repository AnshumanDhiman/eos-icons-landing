$(document).on('ready', function () {
  let showCodeSnippet = false // eslint-disable-line no-unused-vars
  let iconName, iconSize, iconDemo, iconClass, value, copy

  function changeValueIcons () {
    $('.tags').text('')

    const iconTags = $(`.eos-icon-${iconName}`).data('tags')
    copy = $('#copy3')
    value = `<i class="eos-icons"> ${iconName}</i>`
    copy.val(value)

    /* Only render the tags if exists */
    if (iconTags !== undefined) {
      $('.tags').html(iconTags.split(',').map(ele => `<span class='badge badge-secondary'> ${ele} </span>`))
    }
  }

  function changeValueAnimated () {
    copy = $('#copy4')
    value = `<i class="eos-icons eos-icon- ${iconName}></i>`
    copy.val(value)
  }

  $('#copy1, #copy2').on('click', function () {
    copy.select()
    document.execCommand('copy')
  })

  const currentLink = window.location.pathname.split('/')
  const currentPage = currentLink[currentLink.length - 1]
  const page = {
    '': 0,
    'index.html': 0,
    'cheatsheet.html': 1,
    'icons-picker.html': 2,
    'docs.html': 3
  }
  const navLink = $('.current')
  navLink.removeClass('active')
  navLink[page[currentPage]].classList.add('active')

  // hide code snippet by default
  $('.how-to-use').css('visibility', 'hidden')
  $('.how-to-use-animated').css('visibility', 'hidden')

  $('#icons').on('click', function (e) {
    e = e || window.event
    iconName = e.target.getAttribute('data-name') || e.target.parentNode.getAttribute('data-name')
    $('#eos-icon-name').html(iconName)
    if (iconName) {
      showCodeSnippet = true
      changeValueIcons()
      $('.how-to-use').css('visibility', 'visible')
      $('.how-to-use-animated').css('visibility', 'hidden')
    }
  })

  $('#extended-icons').on('click', function (e) {
    e = e || window.event
    iconName = e.target.getAttribute('data-name') || e.target.parentNode.getAttribute('data-name')
    $('#eos-icon-name').html(iconName)

    if (iconName) {
      showCodeSnippet = true
      changeValueIcons()
      $('.how-to-use').css('visibility', 'visible')
      $('.how-to-use-animated').css('visibility', 'hidden')
    }
  })

  $('#icons-animated').on('click', function (e) {
    e = e || window.event
    iconName = e.target.getAttribute('data-name') || e.target.parentNode.getAttribute('data-name')

    if (iconName) {
      showCodeSnippet = true
      changeValueAnimated()
      iconDemo = `<pre><code>&lt;i class=&quoteos-icons eos-icon-${iconName}"> &lt;/i&gt; </code></pre>`
      $('.how-to-use-animated').css('visibility', 'visible')
    }
    $('#animatedIconDemo').html(iconDemo)
  })

  $('#close-code-snippet').on('click', function (e) {
    showCodeSnippet = false
    iconName = ''
    $('.how-to-use').css('visibility', 'hidden')
    $('.how-to-use-animated').css('visibility', 'hidden')
  })

  $('#close-code-snippet-animated').on('click', function (e) {
    showCodeSnippet = false
    iconName = ''
    $('.how-to-use').css('visibility', 'hidden')
    $('.how-to-use-animated').css('visibility', 'hidden')
  })

  const buttonsSizes = $('.change-size')
  for (let i = 0; i < buttonsSizes.length; i++) {
    buttonsSizes[i].onclick = function (e) {
      e = e || window.event
      iconSize = e.target.getAttribute('data-size')
      iconClass = `md-${iconSize}`
      for (i = 0; i < document.getElementsByClassName('eos-icons').length; i++) {
        document.getElementsByClassName('eos-icons')[i].style.fontSize = `${iconSize}px`
        document.getElementById('eos-icon-installing').className = `eos-icons eos-icon-installing${iconClass}`
      }
    }
  }
})
