async function getData(url) {
    const response = await fetch(url);
    const json = await response.json();
    let data = json.data;

    return data;
}