export function dateFormat(timeDate,Hour){

    function add0(m){return m<10?'0'+m:m }
    var time = new Date(timeDate);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if(Hour){
      return add0(h)+':'+add0(mm)+':'+add0(s); 
    }else{
      return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
    }
  }