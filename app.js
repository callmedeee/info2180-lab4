document.addEventListener("DOMContentLoaded", loadDOM)
function loadDOM(){ 
    console.log("Website has Loaded!")
    displaySearch()
}

function displaySearch(){
    document.getElementById('button').onclick = function() {
        let uri = "http://localhost/info2180-lab4/superheroes.php";
            
            let h = new Headers();
            h.append('Accept', 'application/php');
            var input = document.getElementById("text").value;
            let formData = new FormData();
            formData.append('heroname', Sanitizer(input));    
            let req = new Request(uri, {
                method: 'POST',
                headers: h,
                mode: 'cors',
                body: formData
            });
            
            fetch(req)
            .then( (response)=>{
                if(response.ok){
                    return response.text();
                }else{
                    throw new Error('ERROR!');
                }
            })
            .then( (Data) =>{
                console.log(Data)
                    document.getElementById('result').innerHTML= Data;
            })
            .catch( (err) =>{
                console.log('ERROR:', err.message);
            });
       
    };
}
function Sanitizer(str) {
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, " ");
    return str.trim();
}