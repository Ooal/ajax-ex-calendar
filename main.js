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

function stampaMese(month, currentMonth){
  var nDayForMount = currentMonth.daysInMonth();
  var template = $("#template").html();
  var compiled = Handlebars.compile(template);
  var target = $('.container div#' + month);

  for (var i = 1; i <= nDayForMount; i++) {
    var datecomplete = moment( { 'year' :currentMonth.year(), 'month' :currentMonth.month(), 'day' :i} );
    var dayHTML = compiled({
      "day": i,
      "datecomplete": datecomplete.format("YYYY-MM-DD")
    });
    target.append(dayHTML);
  }
}
function stampaFeste(month, currentMonth){
  var year = currentMonth.year();
  var month = currentMonth.month();
  $.ajax({url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: {
      "year": year,
      "month": month
    },
    success: function (data) {
    var arr = data["response"];
    for (var i = 0; i < arr.length; i++) {
      var datearray = arr[i].date ;
      $('h2[data-datecomplete="'+ datearray +'"]').addClass('festa');
      $('h2[data-datecomplete="'+ datearray +'"]').append('  ('+arr[i].name+')');
    }
  },
    error: function(err) {
      console.log('err', err);
    }
  });
}
function next(){
  var month = $("div.active");
  var h2 = $("h2.active");
  if(month.next().length != 0){
    var nextMonth = month.next();
    nextMonth.removeClass("none");
    nextMonth.addClass("active");
    month.removeClass("active");
    month.addClass("none");
    var nexth2 = h2.next();
    nexth2.removeClass("none");
    nexth2.addClass("active");
    h2.removeClass("active");
    h2.addClass("none");
      }
}
function prev(){
  var month = $("div.active");
  var h2 = $("h2.active");
  if(month.prev().length != 0){
    var prevMonth = month.prev();
    prevMonth.removeClass("none");
    prevMonth.addClass("active");
    month.removeClass("active");
    month.addClass("none");
    var prevh2 = h2.prev();
    prevh2.removeClass("none");
    prevh2.addClass("active");
    h2.removeClass("active");
    h2.addClass("none");
      }
}


function init() {
 var year =2018;
 var month = 0;

 for (var i = 1; i <=12 ; i++) {
  month = i;
  var currentMonth = moment(year + "-" + month + "-01");
  stampaMese(month, currentMonth);
  stampaFeste(month, currentMonth);
 }
 $('.fa-angle-right').click(next);
 $('.fa-angle-left').click(prev);
}

$(document).ready(init);
