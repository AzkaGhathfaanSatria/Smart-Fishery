import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/riwayat', label: 'Riwayat Data' },
  { to: '/pengaturan', label: 'Pengaturan' },
]

export default function NavBar() {
  return (
    <nav className="nav-bar">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
