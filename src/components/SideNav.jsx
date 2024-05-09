import React from 'react'
import AdminLogo from '../../public/adminlte/dist/img/user2-160x160.jpg'

function SideNav() {

    return (
        <div>

            <aside className="main-sidebar sidebar-dark-primary elevation-4">

                <div className="sidebar">

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={AdminLogo} className="img-circle elevation-2" alt="User Image" />
                        </div>
                        <div className="info">
                            <a className="d-block">Admin</a>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item menu-open">
                                <a href="/admin/home" className="nav-link active">
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>                             

                        </ul>
                    </nav>
                </div>

            </aside>

        </div>
    )
}

export default SideNav
