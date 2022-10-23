import React from 'react'

// Export 
export const Container = (props) => {
    return (
        <div className='mx-auto max-w-5xl px-6'>
            {props.children}
        </div>
    )
}

export default Container;