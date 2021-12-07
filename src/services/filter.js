import axios from 'axios';
async function allFashion(pages) {
    let x = await axios.get(`https://rocky-gorge-10796.herokuapp.com/api/allFashion`,pages);
    return x.data.data;
}

async function filter(name,species,min,max){
    let data = []
    await axios({
        method : "POST",
        url : "https://rocky-gorge-10796.herokuapp.com/api/filterFashion",
        data: {
            name: name,
            species: species,
            min: min,
            max: max
        }
    }).then(res => {
        console.log(res);
        data = res.data;
    }).catch(err =>{
        console.log(err);
    });
    console.log(data);
    return data.data;
}

async function recommend(header){
    let data = []
    await axios({
        method : "GET",
        url : "https://rocky-gorge-10796.herokuapp.com/api/recommended",
        headers: header,
    }).then(res => {
        console.log(res);
        data = res.data.success;
    }).catch(err =>{
        console.log(err);
    });
    console.log(data);
    return data.data;
}
export let items = {
    allFashion,
    filter,
    recommend,
};
