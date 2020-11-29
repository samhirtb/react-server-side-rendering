import React, {useState} from 'react'
const {Provider, Consumer} =  React.createContext();

export const DataContextProvider = ({renderData, children}) => {
    const [data, setData] = useState(renderData);


    return <Provider value={{data, setData}}>{children}</Provider>
}

/* Using the HOC re-usability pattern */
export const DataContextConsumer = 
    C => props => 
        <Consumer>
            {({data, setData}) => {
                const renderData = data; 
                if(data !== undefined)
                    setData(undefined); 
                    
                return <C data={renderData} {...props} />
            }}
        </Consumer>