import MobileNav from '@/components/shared/mobileNav'
import Sidebar from '@/components/shared/sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='root'>
            <div className='root'>
                <div className='root-container'>
                    <div className='root-wrapper'>
                        <MobileNav/>
                        <Sidebar/>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Layout