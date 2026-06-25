export const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    children: [
      { name: 'All Services', href: '/services' },
      { name: 'Windows', href: '/services?category=windows' },
      { name: 'Optimization', href: '/services?category=optimization' },
      { name: 'Customization', href: '/services?category=customization' },
      { name: 'Developer', href: '/services?category=developer' },
      { name: 'Linux', href: '/services?category=linux' },
      { name: 'Gaming', href: '/services?category=gaming' },
      { name: 'Pricing', href: '/services#pricing' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const cta = {
  text: 'Get Started',
  href: '/contact',
};

export const logo = {
  text: 'Project NOVA',
};
