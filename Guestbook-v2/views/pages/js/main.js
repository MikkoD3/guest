//main.js

var idname = "guestnumber";
var Nvalue = $('button').attr('data-value');
function myFunction(id) {


    fetch('guests', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'guestnumber': ''+id+''
      })
    })
    .then(res => {
      if (res.ok) return res.json();
    }).
    then(data => {
      console.log(data);
      window.location.reload();
    });
};
