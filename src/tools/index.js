export default function Timer(time){ 
    if(time instanceof Date){
        this.time = time;
    }else if( typeof(time) === 'number'){
        this.time = new Date(time);
    }else if( typeof(time) === 'string'){
        this.time = time;
    }else{
        return console.error("time的数据类型传入有误,expect:number(length==13)、Date");
    };


    this.format = function(pattern = 'yyyy-mm-dd',padEndText = ''){
        const yy = this.time.getFullYear();
        let MM = this.time.getMonth()+1;    
        let dd = this.time.getDate();      
        let hh = this.time.getHours();      
        let mm = this.time.getMinutes();   
        let ss = this.time.getSeconds();
        MM = MM < 10 ? '0' + MM : MM;
        dd = dd < 10 ? '0' + dd : dd;
        hh = hh < 10 ? '0' + hh : hh;
        mm = mm < 10 ? '0' + mm : mm;
        ss = ss < 10 ? '0' + ss : ss;

        if(pattern==='yyyy-mm-dd'&&padEndText !== ''){ 
            return `${yy}-${MM}-${dd} ${padEndText}`;
        }else if(pattern==='yyyy-mm-dd'){ 
            return `${yy}-${MM}-${dd}`;
        }else if(pattern==='yyyy-mm-dd hh:mm:ss'){
            return `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
        };
    }
    
    this.reverseFormat = function(){
        let time;
        if(this.time<=10){
            time =  new Date(`${this.time} 00:00:00`);
        }else{
            time =  new Date(`${this.time}`);
        }; 
        return time;
    }
}