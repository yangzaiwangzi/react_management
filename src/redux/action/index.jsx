export const setNavStyle='setNavStyle'
export const setLoadingShow='setLoadingShow'

export const setNavStyleAction=()=>({
    type:setNavStyle
  }
)
export const setLoadingShowAction=(status)=>({
    type:setLoadingShow,
    status
  }
)