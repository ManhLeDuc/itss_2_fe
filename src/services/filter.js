import axios from 'axios';
async function allFashion(pages) {
    let x = await axios.get(`https://rocky-gorge-10796.herokuapp.com/api/allFashion`, pages);
    return x.data.data;
}

async function filter(name, species, min, max, page = 1) {
    let data = []
    await axios({
        method: "POST",
        url: `https://rocky-gorge-10796.herokuapp.com/api/filterFashion?page=${page}`,
        data: {
            name: name,
            species: species,
            min: min,
            max: max
        }
    }).then(res => {
        console.log(res);
        data = res.data;
    }).catch(err => {
        console.log(err);
    });
    console.log(data);
    return data;
}

async function recommend(header) {
    try {
        let data = await axios({
            method: "GET",
            url: "https://rocky-gorge-10796.herokuapp.com/api/recommended",
            headers: header,
        })
        if(data.data.success){
            return data.data.success.data
        }
        else {
            return [];
        }
    }
    catch (err) {
        return [];
    }
}
export let items = {
    allFashion,
    filter,
    recommend,
};
