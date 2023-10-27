const output = document.getElementById("output");
var url = "https://api.hadith.gading.dev/books"
const coverbook = ['dawud.jpg',
    'ahmad.png',
    'bukhari.jpg',
    'darimi.jpeg',
    'majah.jpg',
    'malik.jpg',
    'muslim.jpg',
    'nasa.jpg',
    'Tirmidzi.jpg'];

function getListhadist() {
    axios
        .get(url)
        .then(function (res) {
            var hadts = res.data.data
                .map((h, index) => {
                    return `
                    
                        <div class="card-hadist ">
                        <img src="${coverbook[index]}"  alt="Cover Book" />
                            <h2>${h.name}</h2>
                            <p>jumlah hadits: <b>${h.available}</b></p>
                           
                            <a class="btn btn-secondary w-100" href="./hadits/${h.id}.html">klik disini</a>
                        </div>`;
                })
                .join("");

            output.innerHTML = hadts;
            // console.log(hadts);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// untuk isi hadits
const outputhadits = document.getElementById("output-hadits")
// untuk hapus html
var currentURL = window.location.href;
var filename = currentURL.split('/').pop();
var fieldextention = filename.replace(/\.html$/, '');

function gethaditsbyid() {
    axios.get(`${url}/${fieldextention}?range=1-300`).then(function (res) {
        var gethadits = res.data.data.hadiths.map((hadits) => {
            return `
        <div class="arab p-5 ">
        <h2 class="judul text-center fs-3">Hadits no:${hadits.number}</h2>
        <p class="fs-3 text-end">${hadits.arab}<p>
        <h3 class="text-center">Artinya</h3>
        <p class="text-center">${hadits.id}</p></div>`
                ;
        }).join("")

        outputhadits.innerHTML = gethadits;
    });
}

// function btnsearch(){
//     const search=document.getElementById("search-hadits").value;
//     const outputsearch=document.getElementById("output-search");

//     axios.get(`${url}/${fieldextention}/${search}`).then(function(res){
//         var getsearch= res.data.data.contents;
//     //    outputsearch.innerHTML
//     outputsearch.innerHTML=
//     ` <div class="arab2 p-5"><h2 class="judul text-center fs-3">Hadits no:${getsearch.number}</h2>
//     <p class="fs-3 text-end">${getsearch.arab}</p>
//     <p class="text-center">${getsearch.id}</p> </div>`
//     });
// }


function btnsearch() {
    const search = document.getElementById("search-hadits").value
    const judulpencarian = document.getElementById("judul-pencarian")
    const hasilpencarian = document.getElementById("output-search")

    axios.get(`${url}/${fieldextention}?range=1-300`).then(function (get) {
        var getsearch = get.data.data.hadiths.filter((fill) => {
            return fill.id.toLowerCase().includes(search.toLowerCase());
        });
       if(search.length >0){
judulpencarian.innerHTML=`Pencarian hadits tentang: <b>${search}</b>`

        hasilpencarian.innerHTML = getsearch.map((hasil) => {
            return `
    <div class="arab p-5 my-5 ">
    <h2 class="judul text-center fs-3">Hadits no:${hasil.number}</h2>
    <p class="fs-3 text-end">${hasil.arab}<p>
    <h3 class="text-center">Artinya</h3>
    <p class="text-center">${hasil.id}</p></div>
    `
        }).join("")
    }else if(search==""){
        judulpencarian.innerHTML="";
        hasilpencarian.innerHTML=`<h3 class="error">Kosong!!</h3>`; 
    }
    });
    
}



var tombol_atas = document.getElementById("btntop")
tombol_atas.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"

    })
})
$(tombol_atas).hide()
$(window).scroll(function () {
    if ($(this).scrollTop() > 343453454300) {
        $(tombol_atas).show().fadeIn(500)
    } else {
        $(tombol_atas).hide().fadeOut
    }
})
