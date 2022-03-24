(function readyJS(win,doc){
  if(doc.querySelectorAll('.delete')){
    for(let i = 0;i < doc.querySelectorAll('.delete').length; i++){
      doc.querySelectorAll('.delete')[i].addEventListener('click', function(event){
        if(confirm('Deseja mesmo apagar o usuario?')){
          return true;
        }else{
          event.preventDefault();
        }
      })
    }
  }
}
)(window,document);

document.getElementById('voltar-select').addEventListener('click', () => {
  location.href="/";
});

document.getElementById('voltar-insert').addEventListener('click', () => {
  location.href="/";
});

document.getElementById('voltar-update').addEventListener('click', () => {
  location.href="/select";
});
