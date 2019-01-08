export const setNavStyle='setNavStyle';
export const setLoadingShow='setLoadingShow';
export const setDictLocal='setDictLocal';
export const setCompere='setCompere';
export const setAttends='setAttends';
export const setDepartments='setDepartments';
export const setFindMeetingUpDate='setFindMeetingUpDate';


export const setNavStyleAction=()=>({
    type:setNavStyle
  }
);
export const setLoadingShowAction=(status)=>({
    type:setLoadingShow,
    status
  }
);
export const setDictLocalAction=(data)=>({
    type:setDictLocal,
    data
  }
);
export const setCompereAction=(data)=>({
    type:setCompere,
    data
  }
);
export const setAttendsAction=(data)=>({
    type:setAttends,
    data
  }
);
export const setDepartmentsAction=(data)=>({
    type:setDepartments,
    data
  }
);
export const setFindMeetingUpDateAction=(data)=>({
    type:setFindMeetingUpDate,
    data
  }
);