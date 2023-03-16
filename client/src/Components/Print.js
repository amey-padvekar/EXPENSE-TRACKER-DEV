const Print = () =>{     
    //console.log('print');  
    let printContents = document.getElementById('analysis').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
   document.body.innerHTML = originalContents; 
  }

export default Print;