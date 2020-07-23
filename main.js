/*Descrizione:
Creiamo un calendario dinamico con le festività.
Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
Milestone 1
Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
Milestone 2
Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
Attenzione!
Ogni volta che cambio mese dovrò:
Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
Controllare quanti giorni ha il mese scelto formando così una lista
Chiedere all'api quali sono le festività per il mese scelto
Evidenziare le festività nella lista
Consigli e domande del giorno:
Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;) */

function time(){
  var targetmesi =$('#mese');
  var months = moment.months();
  for (var i = 0; i < months.length; i++) {
    var month= months[i];
    var newmonth = $('<option value="'+ (i) +'">'+ month +'</option>');
    targetmesi.append(newmonth);
  }
}


function stampaMese(){

  $('#btn').click(function(){
  var mese = parseInt($('#mese').val());
  var currentMonth = moment('2018-'+ (mese+1) , 'YYYY-M');
  var nDayForMount = currentMonth.daysInMonth();
  var template = $('#template').html();
  var compiled = Handlebars.compile(template);
  var target = $('.container ul');
  target.html('');
  for (var i = 1; i <= nDayForMount; i++) {
    var datecomplete = moment({ 'year' : 2018 , 'month' : mese , 'day' : i});
    var day = moment({'year' : 2018 ,'month' : mese , 'day' : i});
    var dayHtml = compiled({
      'day': datecomplete.format('DD-MM-YYYY'),
      'datecomplete': datecomplete.format('YYYY-MM-DD')
    });
    target.append(dayHtml);
  }
  $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data:{
          'year':2018,
          'month': mese
        },
        success: function(data) {
          var success = data['success'];
          var arr = data['response'];

            for (var i = 0; i < arr.length; i++) {
              var datearray = arr[i].date ;
              $('li[data-datecomplete="'+ datearray +'"]').addClass('festa');
              $('li[data-datecomplete="'+ datearray +'"]').append('  '+arr[i].name);
            }
        },
        error: function(err) {
            console.log('err', err);
        }
    });
});
}


function init() {
time()
stampaMese()
}

$(document).ready(init);
