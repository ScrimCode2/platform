import styles from "./sidebar.module.css"
import MenuLink from './menuLink/menuLink'

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard"
            },
            {
                title: "Users",
                path: "/dashboard/users"
            },
            {
                title: "Products",
                path: "/dashboard/products"
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: ""
            },
            {
                title: "Reports",
                path: ""
            },
            {
                title: "Team",
                path: ""
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: ""
            },
            {
                title: "Help",
                path: ""
            },
            {
                title: "Logout",
                path: ""
            },
        ],
    },
]

const Sidebar = () => {
    return (
      <div className={styles.container}>
        <ul>
        {menuItems.map((category) => (
            <li key={category.title}>
                <span className={styles.cat}>{category.title}</span>
                {category.list.map((item) => (
                    <MenuLink item={item} key={item.title}/>
                ))}
            </li>
        ))}
        </ul>
      </div>
    )
  }
  
export default Sidebar