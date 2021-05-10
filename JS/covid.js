$(document).ready(function () {
    var data;
    var url = "https://api.covid19india.org/data.json"
    $.getJSON(url, function (data) {
        console.log(123, data);

        var total_confirmed, total_active, total_recovered, total_deaths

        var state = []
        var confirmed = [];
        var confirmedCaseLebel = [];
        var recovered = []
        var deaths = []
        var statewise = []

        $.each(data.statewise, (id, obj) => {
            // console.log(15, obj)
            state.push(obj.state); //pushing the state object into array
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            deaths.push(obj.deaths);
            confirmedCaseLebel.push(obj.lastupdatedtime)

        })
        console.log(11, deaths)
        //removing first element of an array i.e 0th number element is TOTAL
        console.log(state);
        state.shift()
        confirmed.shift()
        recovered.shift()
        deaths.shift()

        //getting data from api through object
        total_confirmed = data.statewise[0].confirmed
        total_active = data.statewise[0].active
        total_recovered = data.statewise[0].recovered
        total_deaths = data.statewise[0].deaths
        statewise = data.statewise;
        //Passing to the HTML using ID of the <p> tag
        $("#confirmed").append(total_confirmed);
        $("#active").append(total_active);
        $("#recovered").append(total_recovered);
        $("#deaths").append(total_deaths);
        var table = document.querySelector('#tabel1');
        var html = "";

        html += ` <table id="casesid" border=1 ">
        <thead>
        <tr>
           <th>STATES</th>
          <th>CONFIRMED</th>
          <th>RECOVERED</th>
          <th>DEATHS</th>
        </tr>
        </thead><tbody>`
        

        for (var i = 0; i < statewise.length; i++) {
            // console.log(state[i]);
            html +=
                `<tr>
              <td>${statewise[i].state}</td>
              <td>${statewise[i].confirmed}</td>
              <td>${statewise[i].recovered}</td>
              <td>${statewise[i].deaths}</td>
                </tr>`
        }




        html += '</tbody></table>'

        table.innerHTML = html;

        var ctx = document.getElementById('myGraph')

        var myChart = new Chart(ctx, {
           type: 'line',
           data: {
               labels: state,
               datasets: 
               [
                   {
                   label: 'Confirmed Cases',
                   data:confirmed,
                   backgroundColor: '#fcf75e81',
                   borderColor: 'black',
                   borderWidth: 1,
                    minBarLength:100
                   },
                   {
                       label: 'Recovered Cases',
                       data:recovered,
                       backgroundColor: '#32cd327a',
                       borderColor: 'black',
                       borderWidth: 1,
                        minBarLength:100
                   },
                   {
                       label: 'Death Cases',
                       data:deaths,
                       backgroundColor: '#ff0000',
                       borderColor: 'black',
                       borderWidth: 1,
                        minBarLength:100
                   }
               ]
           },
           options: {
               scales: {
                   y: {
                       beginAtZero: true
                   }
               }
           }
       });


        })

      

})

function mySearch() {
    console.log("hii")
    // debugger
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("casesid");
    li = ul.getElementsByTagName("tr");
    console.log("hii",ul,li,filter,input)

    for (i = 1; i < li.length; i++) {
        console.log(1,li[i])
        a = li[i].getElementsByTagName("td")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
