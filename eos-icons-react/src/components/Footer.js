import React from 'react'
import Link from './Link'
/* Footer links */
const footerLinks = [
  {
    name: 'Join us on Slack',
    href: 'https://slack.eosdesignsystem.com/'
  },
  {
    name: 'Repository',
    href: 'https://gitlab.com/SUSE-UIUX/eos-icons'
  },
  {
    name: 'Report a issue',
    href: 'https://gitlab.com/SUSE-UIUX/eos-icons/issues'
  },
  {
    name: 'EOS on Twitter',
    href: 'https://twitter.com/eosdesignsystem'
  },
  {
    name: 'Cookie policy',
    href: 'https://eos-icons.eosdesignsystem.com/cookies-policy.html'
  }
]

const Footer = () => {
  return (
    <footer>
      {footerLinks.map((ele, index) => <Link key={index} {...ele} external />)}
    </footer>
  )
}

export default Footer
