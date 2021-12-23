function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/list",
        success: function (data) {
            let content = '    <tr>\n' +
                '        <td>#</td>\n' +
                '        <td>Thành phố</td>\n' +
                '        <td>Quốc gia</td>\n' +
                '        <td>Edit</td>\n' +
                '        <td>Delete</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getCity(data[i]);
            }
            document.getElementById('cityList').innerHTML = content;
        }
    });
}

function getCity(city) {
    return `<tr>`+
        `<td >${city.id}</td>
         <td><button type="button" value="${city.id}" onclick="showInfo(this)">${city.name}</button></td>
         <td>${city.nation.name}</td>`+
        `<td><button type="button" value="${city.id}" onclick="showEdit(this)">Edit</button></td>`+
        `<td><button type="button" value="${city.id}" onclick="showDelete(this)">Delete</button></td>`+
        `</tr>`;
}

function addNewCity() {
    let name = $('#name').val();
    let area = $('#area').val();
    let population = $('#population').val();
    let gdp = $('#gdp').val();
    let description = $('#description').val();
    let nation =$('#nation').val();
    let newCity = {
        name: name,
        area: area,
        population: population,
        gdp: gdp,
        description: description,
        nation: {id: nation}
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCity),
        url: "http://localhost:8080/cities/create",
        success: successHandler
    });
    event.preventDefault();
}
listNation('nation');
function listNation(a){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/nations/list",
        success:function (data){
            let content;
            for (let i = 0; i < data.length; i++) {
                content +=getNation(data[i])
            }
            document.getElementById(a).innerHTML=content;
        }
    })
}

function getNation(nation){
    return `<option value="${nation.id}">${nation.name}</option> `
};

function showEdit(a){
    let id = a.getAttribute("value");
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/cities/update"+id,
        success:function (city){
            $('#idEdit').val(city.id);
            $('#nameEdit').val(city.name);
            $('#areaEdit').val(city.area);
            $('#populationEdit').val(city.population);
            $('#gdpEdit').val(city.gdp);
            $('#descriptionEdit').val(city.description);
        }
    })
    event.preventDefault();
}

function updateCity() {
    let id = $('#idEdit').val();
    let name = $('#nameEdit').val();
    let area = $('#areaEdit').val();
    let population = $('#populationEdit').val();
    let gdp = $('#gdpEdit').val();
    let description = $('#descriptionEdit').val();
    let nation = $('#nationEdit').val();
    let city = {
        id: id,
        name: name,
        area: area,
        population: population,
        gdp:gdp,
        description:description,
        nation: {id: nation}
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/cities/update",
        data: JSON.stringify(city),
        success: successHandler
    })
    event.preventDefault();
}

function showInfo(a){
    let id = a.getAttribute("value");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/find/" + id,
        success: function (city) {
            $('#nameinfo').val(city.name);
            $('#areainfo').val(city.area);
            $('#populationinfo').val(city.population);
            $('#gdpinfo').val(city.gdp);
            $('#descriptioninfo').val(city.description);
            $('#nationinfo').val(city.nation.name);
        }
    })
    event.preventDefault();
}

function showDelete(a){
    let id = a.getAttribute("value");
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/find/" + id,
        success: function (city) {
            $('#cityDelete').val(city.name);
            $('#idDelete').val(city.id);
        }
    })
    event.preventDefault();
}

function deleteCity(){
    let id = $('#idDelete').val();
    $.ajax({
        type:"DELETE",
        url:"http://localhost:8080/cities/delete/"+id,
        success:successHandler
    })
    event.preventDefault();

}