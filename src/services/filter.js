import axios from 'axios';
async function allFashion(pages) {
    let x = await axios.get(`https://rocky-gorge-10796.herokuapp.com/api/allFashion`,pages);
    return x.data.data;
}

async function filter(input,choice){
    const keys = choice
    let data = []
    await axios({
        method : "POST",
        url : "https://rocky-gorge-10796.herokuapp.com/api/filterFashion",
        data: {
            [keys] : input,
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
export let items = {
    allFashion,
    filter,
};
